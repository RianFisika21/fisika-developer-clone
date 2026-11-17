// Auto-generated module #13
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js Lengkap & Post-Processing -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <div class="control-panel">\r\n    <h3>Optika Teleskop Astrofotografi</h3>\r\n    <div class="input-group">\r\n      <label>Fokus (Posisi Sensor) <span id="val-sensor" class="value-display">20.0 cm</span></label>\r\n      <input type="range" id="sensor-slider" min="-10.0" max="50.0" step="0.5" value="20.0">\r\n    </div>\r\n    <div class="input-group">\r\n      <label>Apertur (Bukaan) <span id="val-aperture" class="value-display">15 mm</span></label>\r\n      <input type="range" id="aperture-slider" min="2.0" max="15.0" step="1.0" value="15.0">\r\n    </div>\r\n    <div class="input-group">\r\n      <label>Indeks Bias Lensa (IOR) <span id="val-ior" class="value-display">1.50</span></label>\r\n      <input type="range" id="ior-slider" min="1.1" max="2.0" step="0.05" value="1.50">\r\n    </div>\r\n    <div style="background: rgba(0, 243, 255, 0.05); border-left: 3px solid #00f3ff; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c;">Sesuaikan posisi sensor kamera untuk menangkap titik api (fokus) cahaya bintang dari lensa.</p>\r\n    </div>\r\n  </div>\r\n\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="optics-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.2);"></div>\r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-size: 11px; cursor: pointer;">[ ] FULLSCREEN</button>\r\n      <button id="btn-camera" style="background: rgba(255, 221, 0, 0.2); border: 1px solid #ffdd00; color: #fff; padding: 6px 12px; border-radius: 4px; font-size: 11px; cursor: pointer;">🎥 AUTO-ROTATE</button>\r\n    </div>\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.7); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.4);">\r\n      <div style="font-size: 10px; color: #ff0055;">DIAMETER BOKEH SENSOR</div>\r\n      <div id="hud-bokeh" style="font-size: 16px; color: #fff; font-weight: bold; margin-bottom: 5px;">0.00 mm</div>\r\n      <div style="font-size: 10px; color: #00ffaa;">STATUS FOKUS CITRA</div>\r\n      <div id="hud-status" style="font-size: 16px; color: #fff; font-weight: bold;">FOKUS SEMPURNA</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {
//<![CDATA[

    const container = document.getElementById('optics-canvas-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020305);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(40, 40, 80); 

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.05;

    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 2.0, 0.5, 0.6);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene); composer.addPass(bloomPass);

    scene.add(new THREE.AmbientLight(0x222222));
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(-50, 20, 20); scene.add(pointLight);

    const lensGeo = new THREE.SphereGeometry(16, 32, 32);
    lensGeo.applyMatrix4(new THREE.Matrix4().makeScale(0.15, 1, 1)); 
    const lens = new THREE.Mesh(lensGeo, new THREE.MeshPhysicalMaterial({ color: 0xe0ffff, transmission: 0.9, opacity: 1, ior: 1.5, side: THREE.DoubleSide }));
    lens.position.x = -20; scene.add(lens);
    
    const ringGeo = new THREE.TorusGeometry(16.5, 0.5, 16, 64);
    ringGeo.rotateY(Math.PI / 2);
    const lensRing = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0x556677 }));
    lensRing.position.x = -20; scene.add(lensRing);

    const sensorGroup = new THREE.Group(); scene.add(sensorGroup);
    const sensorGeo = new THREE.PlaneGeometry(32, 32); sensorGeo.rotateY(-Math.PI / 2);
    sensorGroup.add(new THREE.Mesh(sensorGeo, new THREE.MeshBasicMaterial({ color: 0x111111, side: THREE.DoubleSide, transparent: true, opacity: 0.8 })));
    sensorGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(sensorGeo), new THREE.LineBasicMaterial({ color: 0x8899aa })));

    const bokehGeo = new THREE.CircleGeometry(1, 32); bokehGeo.rotateY(-Math.PI / 2);
    const bokehMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, blending: THREE.AdditiveBlending });
    const bokehImage = new THREE.Mesh(bokehGeo, bokehMat);
    bokehImage.position.x = -0.1; sensorGroup.add(bokehImage);

    const grid = new THREE.GridHelper(100, 20, 0x334455, 0x112233); grid.position.y = -20; scene.add(grid);

    const numRays = 72, raysGeo = new THREE.BufferGeometry();
    const raysPos = new Float32Array(numRays * 9); 
    raysGeo.setAttribute('position', new THREE.BufferAttribute(raysPos, 3));
    const raysMat = new THREE.LineBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.6 });
    const raysLines = new THREE.Line(raysGeo, raysMat); scene.add(raysLines);

    const sSlider = document.getElementById('sensor-slider'), aSlider = document.getElementById('aperture-slider'), iSlider = document.getElementById('ior-slider');
    function updateOptics() {
        const sX = parseFloat(sSlider.value), a = parseFloat(aSlider.value), ior = parseFloat(iSlider.value);
        document.getElementById('val-sensor').innerText = sX.toFixed(1) + " cm";
        document.getElementById('val-aperture').innerText = a.toFixed(1) + " mm";
        document.getElementById('val-ior').innerText = ior.toFixed(2);
        
        sensorGroup.position.x = sX;
        const f = (40.0 * 0.5) / (ior - 1.0); 
        const d = sX - (-20); const t = d / f;
        const bRadius = Math.abs(a * (1 - t));
        
        if (bRadius > 0.01) {
            bokehImage.scale.set(bRadius, bRadius, 1); bokehImage.visible = true;
            bokehMat.opacity = Math.max(0.1, 1.0 - (bRadius / 15.0));
        } else bokehImage.visible = false;

        document.getElementById('hud-bokeh').innerText = (bRadius * 2).toFixed(2) + " mm";
        const hStat = document.getElementById('hud-status');
        if (bRadius < 0.5) { hStat.innerText = "FOKUS SEMPURNA"; hStat.style.color = "#00ffaa"; bokehMat.color.setHex(0x00ffaa); raysMat.color.setHex(0x00ffaa); }
        else if (d < f) { hStat.innerText = "FRONT FOCUS"; hStat.style.color = "#ff0055"; bokehMat.color.setHex(0xff0055); raysMat.color.setHex(0x00f3ff); }
        else { hStat.innerText = "BACK FOCUS"; hStat.style.color = "#ffdd00"; bokehMat.color.setHex(0xffdd00); raysMat.color.setHex(0x00f3ff); }

        let pIdx = 0;
        for (let i = 0; i < numRays; i++) {
            const ang = (i / numRays) * Math.PI * 2, sY = Math.cos(ang) * a, sZ = Math.sin(ang) * a;
            raysPos[pIdx++] = -60; raysPos[pIdx++] = sY; raysPos[pIdx++] = sZ;
            raysPos[pIdx++] = -20; raysPos[pIdx++] = sY; raysPos[pIdx++] = sZ;
            raysPos[pIdx++] = sX; raysPos[pIdx++] = sY * (1 - t); raysPos[pIdx++] = sZ * (1 - t);
        }
        raysGeo.attributes.position.needsUpdate = true;
    }
    [sSlider, aSlider, iSlider].forEach(s => s.addEventListener('input', updateOptics)); updateOptics();

    let isAuto = true;
    document.getElementById('btn-camera').addEventListener('click', function() {
        isAuto = !isAuto; controls.autoRotate = isAuto;
        this.innerHTML = isAuto ? '🎥 AUTO-ROTATE: ON' : '🎥 AUTO-ROTATE: OFF';
    }); controls.autoRotate = isAuto; controls.autoRotateSpeed = 0.5;

    document.getElementById('btn-fullscreen').addEventListener('click', () => {
        const w = document.getElementById('vis-panel-wrapper');
        if (!document.fullscreenElement) w.requestFullscreen?.() || w.webkitRequestFullscreen?.();
        else document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    });
    document.addEventListener('fullscreenchange', () => {
        container.style.height = document.fullscreenElement ? '100vh' : '450px';
        setTimeout(() => { camera.aspect = container.clientWidth / container.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(container.clientWidth, container.clientHeight); composer.setSize(container.clientWidth, container.clientHeight); }, 100);
    });

    function animate() { requestAnimationFrame(animate); controls.update(); composer.render(); }
    animate();

//]]>
  } catch (err) { console.error('Module script error:', err); }
})();