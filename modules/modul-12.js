// Auto-generated module #12
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js Lengkap & Post-Processing -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <div class="control-panel">\r\n    <h3>AI Gradient Descent 3D</h3>\r\n    <div class="input-group">\r\n      <label>Learning Rate <span id="val-lr" class="value-display">0.05</span></label>\r\n      <input type="range" id="lr-slider" min="0.01" max="0.2" step="0.01" value="0.05">\r\n    </div>\r\n    <div class="input-group">\r\n      <label>Momentum <span id="val-m" class="value-display">0.80</span></label>\r\n      <input type="range" id="m-slider" min="0.0" max="0.99" step="0.01" value="0.80">\r\n    </div>\r\n    <div style="background: rgba(255, 221, 0, 0.1); border-left: 3px solid #ffdd00; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c;">Tugas AI (Partikel Kuning) adalah mencapai dasar lembah terdalam. Tekan <b>🤖 TRAIN MODEL</b> untuk memulai!</p>\r\n    </div>\r\n  </div>\r\n\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="ai-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255, 221, 0, 0.3);"></div>\r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-size: 11px; cursor: pointer;">[ ] FULLSCREEN</button>\r\n      <button id="btn-train" style="background: rgba(255, 221, 0, 0.2); border: 1px solid #ffdd00; color: #fff; padding: 8px 12px; border-radius: 4px; font-size: 11px; cursor: pointer;">🤖 TRAIN MODEL</button>\r\n    </div>\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.7); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(255, 221, 0, 0.5);">\r\n      <div style="font-size: 10px; color: #ffdd00;">TRAINING EPOCH</div>\r\n      <div id="hud-epoch" style="font-size: 16px; color: #fff; font-weight: bold; margin-bottom: 5px;">0</div>\r\n      <div style="font-size: 10px; color: #00ffaa;">NILAI LOSS (KERUGIAN)</div>\r\n      <div id="hud-loss" style="font-size: 16px; color: #fff; font-weight: bold;">--</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {
//<![CDATA[

    const container = document.getElementById('ai-canvas-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 30, 45); 

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.05;
    controls.autoRotate = true; controls.autoRotateSpeed = 0.5;
    controls.maxPolarAngle = Math.PI / 2 - 0.1; 

    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.2, 0.4, 0.85);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene); composer.addPass(bloomPass);

    function getAckleyZ(x, y) {
        const sx = x * 0.15, sy = y * 0.15;
        const term1 = -20 * Math.exp(-0.2 * Math.sqrt(0.5 * (sx*sx + sy*sy)));
        const term2 = -Math.exp(0.5 * (Math.cos(2 * Math.PI * sx) + Math.cos(2 * Math.PI * sy)));
        return (term1 + term2 + Math.E + 20) * 1.5 - 5; 
    }

    const gridSize = 60, segments = 120;
    const planeGeo = new THREE.PlaneGeometry(gridSize, gridSize, segments, segments);
    planeGeo.rotateX(-Math.PI / 2);

    const vertices = planeGeo.attributes.position.array;
    const colors = [];
    const colorLow = new THREE.Color(0x00ffaa), colorMid = new THREE.Color(0x0088ff), colorHigh = new THREE.Color(0xff0055);

    for (let i = 0; i < vertices.length; i += 3) {
        let vx = vertices[i], vz = vertices[i+2];
        let vy = getAckleyZ(vx, vz);
        vertices[i+1] = vy;
        let normalizedH = Math.max(0, Math.min(1, (vy + 5) / 30));
        let c = new THREE.Color();
        if (normalizedH < 0.3) c.lerpColors(colorLow, colorMid, normalizedH / 0.3);
        else c.lerpColors(colorMid, colorHigh, (normalizedH - 0.3) / 0.7);
        colors.push(c.r, c.g, c.b);
    }
    planeGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    planeGeo.computeVertexNormals();
    scene.add(new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({ vertexColors: true, wireframe: true, transparent: true, opacity: 0.35 })));

    const agent = new THREE.Mesh(new THREE.SphereGeometry(1.2, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffdd00 }));
    scene.add(agent);
    const agentLight = new THREE.PointLight(0xffdd00, 2, 50);
    scene.add(agentLight);

    const pathGroup = new THREE.Group();
    scene.add(pathGroup);

    let isTraining = false, epoch = 0, aiPos = { x: 25, z: 25 }, aiVelocity = { x: 0, z: 0 };
    const lrSlider = document.getElementById('lr-slider'), mSlider = document.getElementById('m-slider');
    const hudEpoch = document.getElementById('hud-epoch'), hudLoss = document.getElementById('hud-loss');

    function computeGradient(x, z) {
        const h = 0.01;
        return { gx: (getAckleyZ(x + h, z) - getAckleyZ(x, z)) / h, gz: (getAckleyZ(x, z + h) - getAckleyZ(x, z)) / h };
    }

    function resetAgent() {
        aiPos = { x: (Math.random() > 0.5 ? 25 : -25), z: (Math.random() > 0.5 ? 25 : -25) };
        aiVelocity = { x: 0, z: 0 }; epoch = 0; isTraining = false;
        while(pathGroup.children.length > 0) pathGroup.remove(pathGroup.children[0]);
        agent.position.set(aiPos.x, getAckleyZ(aiPos.x, aiPos.z) + 1.2, aiPos.z);
        agentLight.position.copy(agent.position);
        hudEpoch.innerText = "0"; hudLoss.innerText = "--";
    }
    resetAgent();

    lrSlider.addEventListener('input', () => document.getElementById('val-lr').innerText = parseFloat(lrSlider.value).toFixed(2));
    mSlider.addEventListener('input', () => document.getElementById('val-m').innerText = parseFloat(mSlider.value).toFixed(2));

    const btnTrain = document.getElementById('btn-train');
    btnTrain.addEventListener('click', () => {
        if (!isTraining && epoch > 200) resetAgent();
        isTraining = !isTraining;
        btnTrain.innerHTML = isTraining ? '⏸️ JEDA' : '▶️ LANJUTKAN';
    });

    document.getElementById('btn-fullscreen').addEventListener('click', () => {
        const w = document.getElementById('vis-panel-wrapper');
        if (!document.fullscreenElement) w.requestFullscreen?.() || w.webkitRequestFullscreen?.();
        else document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    });

    document.addEventListener('fullscreenchange', () => {
        container.style.height = document.fullscreenElement ? '100vh' : '450px';
        setTimeout(() => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
            composer.setSize(container.clientWidth, container.clientHeight);
        }, 100);
    });

    function animate() {
        requestAnimationFrame(animate);
        if (isTraining && epoch < 500) {
            let lr = parseFloat(lrSlider.value), momentum = parseFloat(mSlider.value);
            let oldPos = agent.position.clone();
            let grad = computeGradient(aiPos.x, aiPos.z);
            
            aiVelocity.x = (momentum * aiVelocity.x) - (lr * grad.gx);
            aiVelocity.z = (momentum * aiVelocity.z) - (lr * grad.gz);
            aiPos.x += aiVelocity.x; aiPos.z += aiVelocity.z;
            
            if (aiPos.x > 30) aiPos.x = 30; if (aiPos.x < -30) aiPos.x = -30;
            if (aiPos.z > 30) aiPos.z = 30; if (aiPos.z < -30) aiPos.z = -30;

            agent.position.set(aiPos.x, getAckleyZ(aiPos.x, aiPos.z) + 1.2, aiPos.z);
            agentLight.position.copy(agent.position);

            pathGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([oldPos, agent.position.clone()]), new THREE.LineBasicMaterial({ color: 0xffdd00, transparent: true, opacity: 0.8 })));
            
            epoch++; hudEpoch.innerText = epoch;
            let lossValue = getAckleyZ(aiPos.x, aiPos.z) + 5; 
            hudLoss.innerText = lossValue.toFixed(4);

            if (lossValue < 0.1 && Math.abs(aiVelocity.x) < 0.01 && Math.abs(aiVelocity.z) < 0.01) {
                isTraining = false; btnTrain.innerHTML = '✅ SELESAI (RESET)';
            }
        }
        controls.update(); composer.render(); 
    }
    animate();

//]]>
  } catch (err) { console.error('Module script error:', err); }
})();