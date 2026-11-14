// Auto-generated module #05
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js, OrbitControls, Post-Processing (Bloom), dan CSS2DRenderer -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Dinamika Vektor Hologram</h3>\r\n    \r\n    <div class="input-group">\r\n      <label>Medan Magnet (B) <span id="val-b" class="value-display">1.5 T</span></label>\r\n      <input type="range" id="b-slider" min="0.1" max="5.0" step="0.1" value="1.5">\r\n    </div>\r\n    \r\n    <div class="input-group">\r\n      <label>Kecepatan (v) <span id="val-v" class="value-display">2.0 x10⁶ m/s</span></label>\r\n      <input type="range" id="v-slider" min="0.5" max="5.0" step="0.1" value="2.0">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Sudut Tembak (θ) <span id="val-theta" class="value-display">45°</span></label>\r\n      <input type="range" id="theta-slider" min="0" max="90" step="1" value="45">\r\n    </div>\r\n    \r\n    <div style="background: rgba(0, 243, 255, 0.05); border-left: 3px solid #ffdd00; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>CSS2D RENDERER AKTIF:</strong><br>\r\n        Putar kamera! Label vektor kini melayang secara fisik di dalam ruang 3D dan selalu menghadap Anda.\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <!-- Container untuk WebGL (Grafik Inti) -->\r\n    <div id="lorentz-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.2); box-shadow: 0 5px 25px rgba(0,0,0,0.6); position: absolute; top: 0; left: 0;"></div>\r\n    \r\n    <!-- Container untuk CSS2D (Label Hologram) akan di-inject via JS agar menumpuk di atas WebGL -->\r\n    \r\n    <!-- Kumpulan Tombol Kontrol -->\r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-camera-mode" style="background: rgba(255, 0, 85, 0.1); border: 1px solid #ff0055; color: #ff0055; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🎥 FOLLOW: OFF\r\n      </button>\r\n      <button id="btn-vectors-mode" style="background: rgba(255, 221, 0, 0.4); border: 1px solid #ffdd00; color: #ffdd00; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        📐 VEKTOR: ON\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Parameter Lintasan -->\r\n    <div style="position: absolute; bottom: 15px; right: 20px; pointer-events: none; background: rgba(0,0,0,0.7); padding: 10px 15px; border-radius: 6px; text-align: right; border: 1px dashed rgba(255, 0, 85, 0.4); z-index: 10;">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #ff0055; letter-spacing: 1px;">RADIUS (R)</div>\r\n      <div id="hud-radius" style="font-family: \'Orbitron\', monospace; font-size: 14px; color: #fff; margin-bottom: 5px;">0.00 mm</div>\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00ffaa; letter-spacing: 1px;">PITCH (p)</div>\r\n      <div id="hud-pitch" style="font-family: \'Orbitron\', monospace; font-size: 14px; color: #fff;">0.00 mm</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #10
  try {

    const container = document.getElementById('lorentz-canvas-container');
    const wrapper = document.getElementById('vis-panel-wrapper');
    
    // 1. SCENE & KAMERA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(80, 50, 90);

    // 2. WEBGL RENDERER (Inti Grafis 3D)
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 3. CSS2D RENDERER (Lapisan Hologram Label)
    const labelRenderer = new THREE.CSS2DRenderer();
    labelRenderer.setSize(container.clientWidth, container.clientHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none'; // WAJIB: Agar tidak memblokir OrbitControls mouse/touch
    wrapper.appendChild(labelRenderer.domElement);

    // 4. ORBIT CONTROLS (Dipasang di WebGL Renderer)
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0, 0);

    // 5. POST-PROCESSING (BLOOM)
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.5, 0.4, 0.85);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 6. PENCAHAYAAN & GRID
    scene.add(new THREE.AmbientLight(0x444444));
    const pointLight = new THREE.PointLight(0xffffff, 2, 100);
    scene.add(pointLight);

    const gridHelper = new THREE.GridHelper(120, 24, 0x00f3ff, 0x222222);
    gridHelper.position.y = -40;
    scene.add(gridHelper);

    // 7. OBJEK PARTIKEL & TRAIL
    const particle = new THREE.Mesh(new THREE.SphereGeometry(1.8, 16, 16), new THREE.MeshBasicMaterial({ color: 0xff0055 }));
    scene.add(particle);
    
    let trailPointsArray = [];
    const trailGeo = new THREE.BufferGeometry();
    const trailLine = new THREE.Line(trailGeo, new THREE.LineBasicMaterial({ color: 0xff3388, transparent: true, opacity: 0.9 }));
    scene.add(trailLine);

    // 8. VEKTOR DINAMIS & PEMBUATAN LABEL CSS2D (HOLOGRAM)
    const arrowLength = 16, arrowHead = 4, arrowWidth = 2;
    const vecV = new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(0,0,0), arrowLength, 0x00ffaa, arrowHead, arrowWidth);
    const vecB = new THREE.ArrowHelper(new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,0), arrowLength, 0x00f3ff, arrowHead, arrowWidth);
    const vecF = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), arrowLength, 0xffdd00, arrowHead, arrowWidth);
    scene.add(vecV); scene.add(vecB); scene.add(vecF);

    // Fungsi Pabrik untuk Label Hologram
    function createHologramLabel(text, color) {
        const div = document.createElement('div');
        div.className = 'hologram-label';
        // HTML murni yang dirender di ruang 3D
        div.innerHTML = `<span style="font-family: 'Orbitron', sans-serif; font-size: 13px; font-weight: bold; color: ${color}; text-shadow: 0 0 8px ${color}; background: rgba(0,0,0,0.5); padding: 2px 6px; border-radius: 4px; border: 1px solid ${color}; backdrop-filter: blur(2px);">
            ${text}
        </span>`;
        div.style.marginTop = '-1em'; // Offset agar pas di atas ujung panah
        const labelObj = new THREE.CSS2DObject(div);
        return labelObj;
    }

    const labelV = createHologramLabel('v (Kecepatan)', '#00ffaa');
    const labelB = createHologramLabel('B (Magnet)', '#00f3ff');
    const labelF = createHologramLabel('F (Lorentz)', '#ffdd00');
    
    // Memasukkan label ke dalam scene 3D
    scene.add(labelV); scene.add(labelB); scene.add(labelF);

    // 9. LOGIKA UI (FULLSCREEN, KAMERA, VEKTOR)
    let isFollowCam = false, isResettingCam = false, isVectorsVisible = true;

    document.getElementById('btn-camera-mode').addEventListener('click', function() {
        isFollowCam = !isFollowCam;
        this.innerHTML = isFollowCam ? '🎥 FOLLOW: ON' : '🎥 FOLLOW: OFF';
        this.style.background = isFollowCam ? 'rgba(255, 0, 85, 0.4)' : 'rgba(255, 0, 85, 0.1)';
        isResettingCam = !isFollowCam;
    });

    document.getElementById('btn-vectors-mode').addEventListener('click', function() {
        isVectorsVisible = !isVectorsVisible;
        this.innerHTML = isVectorsVisible ? '📐 VEKTOR: ON' : '📐 VEKTOR: OFF';
        this.style.background = isVectorsVisible ? 'rgba(255, 221, 0, 0.4)' : 'rgba(255, 221, 0, 0.1)';
        vecV.visible = isVectorsVisible; vecB.visible = isVectorsVisible; vecF.visible = isVectorsVisible;
        labelV.visible = isVectorsVisible; labelB.visible = isVectorsVisible; labelF.visible = isVectorsVisible;
    });

    const btnFullscreen = document.getElementById('btn-fullscreen');
    btnFullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) wrapper.requestFullscreen?.() || wrapper.webkitRequestFullscreen?.();
        else document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    });

    document.addEventListener('fullscreenchange', () => {
        const isFs = document.fullscreenElement;
        btnFullscreen.innerHTML = isFs ? '✖ EXIT' : '[ ] FULLSCREEN';
        container.style.height = isFs ? '100vh' : '450px';
        container.style.borderRadius = isFs ? '0' : '10px';
        container.style.border = isFs ? 'none' : '1px solid rgba(0, 243, 255, 0.2)';
        
        // CSS2D Renderer ikut menyesuaikan ukuran
        setTimeout(() => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
            composer.setSize(container.clientWidth, container.clientHeight);
            labelRenderer.setSize(container.clientWidth, container.clientHeight);
        }, 100);
    });

    // 10. LOGIKA FISIKA LINTASAN
    const bSlider = document.getElementById('b-slider'), vSlider = document.getElementById('v-slider'), thetaSlider = document.getElementById('theta-slider');
    let trajectoryPoints = [];

    function updatePhysics() {
        const B = parseFloat(bSlider.value), v = parseFloat(vSlider.value) * 1e6, theta = parseFloat(thetaSlider.value) * (Math.PI / 180);
        document.getElementById('val-b').innerText = B.toFixed(1) + " T";
        document.getElementById('val-v').innerText = parseFloat(vSlider.value).toFixed(1) + " x10⁶ m/s";
        document.getElementById('val-theta').innerText = parseFloat(thetaSlider.value) + "°";

        let R = 0, p = 0;
        if (B > 0) {
            R = (1.67e-27 * v * Math.sin(theta)) / (1.6e-19 * B);
            p = (v * Math.cos(theta)) * ((2 * Math.PI * 1.67e-27) / (1.6e-19 * B));
        }

        document.getElementById('hud-radius').innerText = (R * 1000).toFixed(2) + " mm";
        document.getElementById('hud-pitch').innerText = (p * 1000).toFixed(2) + " mm";

        scene.children.forEach(c => { if(c.isLine && c.material.opacity === 0.2) scene.remove(c); });
        
        trajectoryPoints = [];
        const R_vis = R * 2500, p_vis = p * 2000, steps = 500;
        const total_time = p_vis === 0 ? 4 * Math.PI : 100 / (p_vis / (2*Math.PI)); 

        for(let i = 0; i <= steps; i++) {
            const t = (i / steps) * total_time;
            const y = -40 + (p_vis === 0 ? 0 : (p_vis * t) / (2*Math.PI));
            if (y > 60) break;
            trajectoryPoints.push(new THREE.Vector3(R_vis * Math.cos(t), y, R_vis * Math.sin(t)));
        }

        if (trajectoryPoints.length > 1) {
            scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(trajectoryPoints), new THREE.LineBasicMaterial({ color: 0xff0055, transparent: true, opacity: 0.2 })));
        }
        trailPointsArray = []; trailGeo.setFromPoints(trailPointsArray);
    }

    [bSlider, vSlider, thetaSlider].forEach(s => s.addEventListener('input', updatePhysics));
    updatePhysics();

    // 11. ANIMATION LOOP
    let timeAccumulator = 0;
    function animate() {
        requestAnimationFrame(animate);
        
        if (trajectoryPoints.length > 1) {
            timeAccumulator += 0.08;
            const t_mod = timeAccumulator % (trajectoryPoints.length - 1);
            const index = Math.floor(t_mod);
            const nextIndex = Math.min(index + 1, trajectoryPoints.length - 1);
            
            particle.position.lerpVectors(trajectoryPoints[index], trajectoryPoints[nextIndex], t_mod - index);
            pointLight.position.copy(particle.position); 

            if (isVectorsVisible) {
                vecV.position.copy(particle.position);
                vecB.position.copy(particle.position);
                vecF.position.copy(particle.position);
                
                const dirV = new THREE.Vector3().subVectors(trajectoryPoints[nextIndex], trajectoryPoints[index]).normalize();
                const dirB = new THREE.Vector3(0, 1, 0);
                const dirF = new THREE.Vector3().crossVectors(dirV, dirB).normalize();
                if (dirF.lengthSq() === 0) dirF.set(1, 0, 0); 
                
                vecV.setDirection(dirV); vecB.setDirection(dirB); vecF.setDirection(dirF);

                // Update posisi Hologram Label agar berada pas di ujung masing-masing panah
                // Posisi Label = Posisi Partikel + (Arah Vektor * Panjang Panah) + Sedikit offset jarak (3 unit)
                labelV.position.copy(particle.position).add(dirV.multiplyScalar(arrowLength + 3));
                labelB.position.copy(particle.position).add(dirB.multiplyScalar(arrowLength + 3));
                labelF.position.copy(particle.position).add(dirF.multiplyScalar(arrowLength + 3));
            }

            if (t_mod > 0.08) {
                trailPointsArray.push(particle.position.clone());
                if (trailPointsArray.length > 100) trailPointsArray.shift();
                trailGeo.setFromPoints(trailPointsArray);
            }
        }

        if (isFollowCam) controls.target.lerp(particle.position, 0.1);
        else if (isResettingCam) {
            controls.target.lerp(new THREE.Vector3(0,0,0), 0.05);
            if (controls.target.length() < 0.5) isResettingCam = false;
        }

        controls.update(); 
        
        // PENTING: Render komposisi WebGL terlebih dahulu, baru timpa dengan layer CSS2D
        composer.render(); 
        labelRenderer.render(scene, camera); 
    }
    animate();

  } catch (err) { console.error('Module script error:', err); }
})();