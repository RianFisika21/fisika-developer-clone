// Auto-generated module #03
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js, OrbitControls, dan Post-Processing (Bloom) -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Monte Carlo Beam 3D</h3>\r\n    \r\n    <div class="input-group">\r\n      <label>Medan Magnet (B) <span id="val-b" class="value-display">1.5 T</span></label>\r\n      <input type="range" id="b-slider" min="0.1" max="5.0" step="0.1" value="1.5">\r\n    </div>\r\n    \r\n    <div class="input-group">\r\n      <label>Kecepatan (v) <span id="val-v" class="value-display">2.0 x10⁶ m/s</span></label>\r\n      <input type="range" id="v-slider" min="0.5" max="5.0" step="0.1" value="2.0">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Sudut Tembak (θ) <span id="val-theta" class="value-display">45°</span></label>\r\n      <input type="range" id="theta-slider" min="0" max="90" step="1" value="45">\r\n    </div>\r\n    \r\n    <div style="background: rgba(0, 243, 255, 0.05); border-left: 3px solid #00f3ff; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>SIMULASI AKTIF:</strong><br>\r\n        🎯 40 Partikel (Monte Carlo Spread)<br>\r\n        ✨ Bloom Glow & Lantai Hologram\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="lorentz-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.2); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n    \r\n    <!-- Kumpulan Tombol Kontrol -->\r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-camera-mode" style="background: rgba(255, 0, 85, 0.1); border: 1px solid #ff0055; color: #ff0055; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🎥 FOLLOW: OFF\r\n      </button>\r\n      <button id="btn-vectors-mode" style="background: rgba(255, 221, 0, 0.1); border: 1px solid #ffdd00; color: #ffdd00; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        📐 VEKTOR: ON\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Indikator & Legenda Vektor -->\r\n    <div style="position: absolute; top: 15px; left: 20px; pointer-events: none; background: rgba(0, 243, 255, 0.05); padding: 8px 12px; border-radius: 4px; border: 1px dashed rgba(0, 243, 255, 0.3);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 11px; color: #fff; font-weight: bold; border-bottom: 1px solid rgba(0,243,255,0.2); margin-bottom: 5px; padding-bottom: 3px;">LEGENDA VEKTOR (PARTIKEL PUSAT)</div>\r\n      <div style="font-family: \'Rajdhani\', sans-serif; font-size: 12px; color: #00ffaa; font-weight: bold;">🟩 Kecepatan (v)</div>\r\n      <div style="font-family: \'Rajdhani\', sans-serif; font-size: 12px; color: #00f3ff; font-weight: bold;">🟦 Medan Magnet (B)</div>\r\n      <div style="font-family: \'Rajdhani\', sans-serif; font-size: 12px; color: #ffdd00; font-weight: bold;">🟨 Gaya Lorentz (F)</div>\r\n    </div>\r\n\r\n    <!-- HUD Parameter -->\r\n    <div style="position: absolute; bottom: 15px; right: 20px; pointer-events: none; background: rgba(0,0,0,0.7); padding: 10px 15px; border-radius: 6px; text-align: right; border: 1px dashed rgba(255, 0, 85, 0.4);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #ff0055; letter-spacing: 1px;">RADIUS PUSAT (R)</div>\r\n      <div id="hud-radius" style="font-family: \'Orbitron\', monospace; font-size: 14px; color: #fff; margin-bottom: 5px;">0.00 mm</div>\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00ffaa; letter-spacing: 1px;">PITCH PUSAT (p)</div>\r\n      <div id="hud-pitch" style="font-family: \'Orbitron\', monospace; font-size: 14px; color: #fff;">0.00 mm</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {

    // 1. SCENE & KAMERA
    const container = document.getElementById('lorentz-canvas-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(120, 80, 150);

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0, 0);

    // 2. POST-PROCESSING (BLOOM)
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.6, 0.5, 0.85);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 3. PENCAHAYAAN
    const ambientLight = new THREE.AmbientLight(0x444444);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 2, 150);
    scene.add(pointLight);

    // 4. LANTAI GRID HOLOGRAM BERDENYUT (PULSE GRID)
    const gridSize = 160;
    const gridDivisions = 32;
    const gridGeo = new THREE.PlaneGeometry(gridSize, gridSize, gridDivisions, gridDivisions);
    gridGeo.rotateX(-Math.PI / 2); 
    gridGeo.translate(0, -50, 0); 

    const gridUniforms = {
        time: { value: 0 },
        pulseCenter: { value: new THREE.Vector2(0, 0) },
        color: { value: new THREE.Color(0x00f3ff) }
    };

    const gridMat = new THREE.ShaderMaterial({
        uniforms: gridUniforms,
        transparent: true,
        wireframe: true,
        vertexShader: `
            uniform float time;
            uniform vec2 pulseCenter;
            varying vec3 vPosition;
            void main() {
                vPosition = position;
                vec3 pos = position;
                float dist = distance(pos.xz, pulseCenter);
                float wave = sin(dist * 0.2 - time * 5.0) * exp(-dist * 0.03); 
                pos.y += wave * 5.0; 
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 color;
            varying vec3 vPosition;
            void main() {
                float fade = 1.0 - (length(vPosition.xz) / 80.0);
                gl_FragColor = vec4(color, max(0.0, fade) * 0.6);
            }
        `
    });

    scene.add(new THREE.Mesh(gridGeo, gridMat));

    // Garis Medan Magnet Statis (B)
    const arrowMat = new THREE.LineBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.15 });
    for(let x = -60; x <= 60; x+=30) {
        for(let z = -60; z <= 60; z+=30) {
            scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, -50, z), new THREE.Vector3(x, 70, z)]), arrowMat));
        }
    }

    // 5. SISTEM MONTE CARLO BEAM SHOWER (40 Partikel)
    const numParticles = 40;
    const particles = [];
    const trailLines = [];
    const trailsArray = [];
    
    const sphereGeo = new THREE.SphereGeometry(1.2, 8, 8); 
    const matCenter = new THREE.MeshBasicMaterial({ color: 0xff0055 }); // Pink (Pusat)
    const matShower = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.8 }); // Emas/Jingga (Sebaran)
    
    const trailMatCenter = new THREE.LineBasicMaterial({ color: 0xff3388, transparent: true, opacity: 0.9 });
    const trailMatShower = new THREE.LineBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.3 });

    for(let i=0; i<numParticles; i++) {
        let p = new THREE.Mesh(sphereGeo, i === 0 ? matCenter : matShower);
        if (i === 0) p.scale.set(1.5, 1.5, 1.5); // Partikel pusat lebih besar
        scene.add(p);
        particles.push(p);

        let tLine = new THREE.Line(new THREE.BufferGeometry(), i === 0 ? trailMatCenter : trailMatShower);
        scene.add(tLine);
        trailLines.push(tLine);
        trailsArray.push([]);
    }

    // 6. INISIALISASI VEKTOR DINAMIS (ArrowHelpers - Mengikuti Partikel Pusat)
    const arrowLength = 20, arrowHead = 4, arrowWidth = 2;
    const vecV = new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(0,0,0), arrowLength, 0x00ffaa, arrowHead, arrowWidth);
    const vecB = new THREE.ArrowHelper(new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,0), arrowLength, 0x00f3ff, arrowHead, arrowWidth);
    const vecF = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), arrowLength, 0xffdd00, arrowHead, arrowWidth);
    scene.add(vecV); scene.add(vecB); scene.add(vecF);

    // 7. LOGIKA TOMBOL & UI
    let isFollowCam = false, isResettingCam = false, isVectorsVisible = true;

    const btnCamera = document.getElementById('btn-camera-mode');
    btnCamera.addEventListener('click', () => {
        isFollowCam = !isFollowCam;
        btnCamera.innerHTML = isFollowCam ? '🎥 FOLLOW: ON' : '🎥 FOLLOW: OFF';
        btnCamera.style.background = isFollowCam ? 'rgba(255, 0, 85, 0.4)' : 'rgba(255, 0, 85, 0.1)';
        isResettingCam = !isFollowCam;
    });

    const btnVectors = document.getElementById('btn-vectors-mode');
    btnVectors.addEventListener('click', () => {
        isVectorsVisible = !isVectorsVisible;
        btnVectors.innerHTML = isVectorsVisible ? '📐 VEKTOR: ON' : '📐 VEKTOR: OFF';
        btnVectors.style.background = isVectorsVisible ? 'rgba(255, 221, 0, 0.4)' : 'rgba(255, 221, 0, 0.1)';
        vecV.visible = isVectorsVisible; vecB.visible = isVectorsVisible; vecF.visible = isVectorsVisible;
    });

    const visWrapper = document.getElementById('vis-panel-wrapper'), btnFullscreen = document.getElementById('btn-fullscreen');
    btnFullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) visWrapper.requestFullscreen?.() || visWrapper.webkitRequestFullscreen?.();
        else document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    });

    document.addEventListener('fullscreenchange', () => {
        const isFs = document.fullscreenElement;
        btnFullscreen.innerHTML = isFs ? '✖ EXIT' : '[ ] FULLSCREEN';
        container.style.height = isFs ? '100vh' : '450px';
        container.style.borderRadius = isFs ? '0' : '10px';
        container.style.border = isFs ? 'none' : '1px solid rgba(0, 243, 255, 0.2)';
        setTimeout(() => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
            composer.setSize(container.clientWidth, container.clientHeight);
        }, 100);
    });

    // 8. LOGIKA FISIKA MONTE CARLO
    const bSlider = document.getElementById('b-slider'), vSlider = document.getElementById('v-slider'), thetaSlider = document.getElementById('theta-slider');
    const hudRadius = document.getElementById('hud-radius'), hudPitch = document.getElementById('hud-pitch');
    
    let trajectories = []; // Array of arrays penyimpan lintasan tiap partikel
    const m = 1.67e-27, q = 1.6e-19, visualScale = 2500; // Uniform scaling untuk vektor presisi

    function calculateTrajectoryPath(v_input, theta_input, B_input) {
        let R = 0, p = 0;
        if (B_input > 0) {
            R = (m * v_input * Math.sin(theta_input)) / (q * B_input);
            p = (v_input * Math.cos(theta_input)) * ((2 * Math.PI * m) / (q * B_input));
        }
        
        let pts = [];
        const R_vis = R * visualScale, p_vis = p * visualScale, steps = 500;
        const total_time = p_vis === 0 ? 4 * Math.PI : 120 / (p_vis / (2*Math.PI)); 

        for(let i = 0; i <= steps; i++) {
            const t = (i / steps) * total_time;
            const y = -50 + (p_vis === 0 ? 0 : (p_vis * t) / (2*Math.PI));
            if (y > 70) break;
            pts.push(new THREE.Vector3(R_vis * Math.cos(t), y, R_vis * Math.sin(t)));
        }
        return { pts: pts, R: R, p: p };
    }

    function updatePhysics() {
        const B = parseFloat(bSlider.value), v = parseFloat(vSlider.value) * 1e6, theta = parseFloat(thetaSlider.value) * (Math.PI / 180);
        document.getElementById('val-b').innerText = B.toFixed(1) + " T";
        document.getElementById('val-v').innerText = parseFloat(vSlider.value).toFixed(1) + " x10⁶ m/s";
        document.getElementById('val-theta').innerText = parseFloat(thetaSlider.value) + "°";

        trajectories = [];
        
        // Lintasan Partikel Pusat (Index 0)
        let centerCalc = calculateTrajectoryPath(v, theta, B);
        trajectories.push(centerCalc.pts);
        hudRadius.innerText = (centerCalc.R * 1000).toFixed(2) + " mm";
        hudPitch.innerText = (centerCalc.p * 1000).toFixed(2) + " mm";

        // Lintasan Partikel Hamburan (Monte Carlo)
        for(let i=1; i<numParticles; i++) {
            // Deviasi: kecepatan +/- 7.5%, sudut +/- 11 derajat
            let v_rand = v * (1 + (Math.random() - 0.5) * 0.15); 
            let t_rand = theta + (Math.random() - 0.5) * 0.2; 
            trajectories.push(calculateTrajectoryPath(v_rand, t_rand, B).pts);
        }

        // Reset semua jejak ekor
        for(let i=0; i<numParticles; i++) {
            trailsArray[i] = [];
            trailLines[i].geometry.setFromPoints([]);
        }
    }

    [bSlider, vSlider, thetaSlider].forEach(s => s.addEventListener('input', updatePhysics));
    updatePhysics();

    // 9. ANIMATION LOOP
    let timeAccumulator = 0;
    const clock = new THREE.Clock(); 
    
    function animate() {
        requestAnimationFrame(animate);
        gridUniforms.time.value = clock.getElapsedTime();

        // Validasi: pastikan partikel pusat punya jalur
        if (trajectories[0] && trajectories[0].length > 1) {
            timeAccumulator += 0.08;
            
            // Loop pergerakan SEMUA partikel
            for(let i=0; i<numParticles; i++) {
                let traj = trajectories[i];
                if (!traj || traj.length < 2) continue;

                let t_mod = timeAccumulator % (traj.length - 1);
                let index = Math.floor(t_mod);
                let nextIndex = Math.min(index + 1, traj.length - 1);
                
                particles[i].position.lerpVectors(traj[index], traj[nextIndex], t_mod - index);
                
                // Update Jejak (Trail)
                if (t_mod > 0.08) {
                    trailsArray[i].push(particles[i].position.clone());
                    if (trailsArray[i].length > (i === 0 ? 100 : 50)) trailsArray[i].shift(); // Ekor pusat lebih panjang
                    trailLines[i].geometry.setFromPoints(trailsArray[i]);
                } else {
                    trailsArray[i] = [];
                }
            }

            // Sinkronisasi lampu dan grid dengan partikel PUSAT
            pointLight.position.copy(particles[0].position); 
            gridUniforms.pulseCenter.value.set(particles[0].position.x, particles[0].position.z);

            // FIX: PERHITUNGAN VEKTOR PRESISI BERDASARKAN PARTIKEL PUSAT
            if (isVectorsVisible) {
                let centerTraj = trajectories[0];
                let t_mod = timeAccumulator % (centerTraj.length - 1);
                let idx = Math.floor(t_mod);
                let n_idx = Math.min(idx + 1, centerTraj.length - 1);

                vecV.position.copy(particles[0].position);
                vecB.position.copy(particles[0].position);
                vecF.position.copy(particles[0].position);
                
                // Vektor v: turunan geometris (arah pergerakan)
                const dirV = new THREE.Vector3().subVectors(centerTraj[n_idx], centerTraj[idx]).normalize();
                vecV.setDirection(dirV);
                
                // Vektor B: statis ke atas
                const dirB = new THREE.Vector3(0, 1, 0);
                vecB.setDirection(dirB);
                
                // Vektor F: Perkalian silang (Cross Product) dari v x B
                // Karena skala radius dan pitch sudah seragam (visualScale), vektor F 100% akurat menunjuk ke pusat.
                const dirF = new THREE.Vector3().crossVectors(dirV, dirB).normalize();
                if (dirF.lengthSq() === 0) dirF.set(1, 0, 0); 
                vecF.setDirection(dirF);
            }
        }

        // Kamera mengikuti partikel pusat
        if (isFollowCam) controls.target.lerp(particles[0].position, 0.1);
        else if (isResettingCam) {
            controls.target.lerp(new THREE.Vector3(0,0,0), 0.05);
            if (controls.target.length() < 0.5) isResettingCam = false;
        }

        controls.update(); 
        composer.render(); 
    }
    animate();

  } catch (err) { console.error('Module script error:', err); }
})();