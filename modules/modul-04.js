// Auto-generated module #04
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js, OrbitControls, dan Post-Processing (Bloom) -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Topologi Ruang-Waktu 3D</h3>\r\n    \r\n    <div class="input-group">\r\n      <label>Massa Partikel / Muatan (m) <span id="val-mass" class="value-display">5.0 M</span></label>\r\n      <input type="range" id="mass-slider" min="1.0" max="15.0" step="0.5" value="5.0">\r\n    </div>\r\n    \r\n    <div class="input-group">\r\n      <label>Kecepatan Orbit (v) <span id="val-v" class="value-display">1.0 x</span></label>\r\n      <input type="range" id="v-slider" min="0.0" max="3.0" step="0.1" value="1.0">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Elastisitas Ruang (σ) <span id="val-tension" class="value-display">Medium</span></label>\r\n      <input type="range" id="tension-slider" min="20.0" max="150.0" step="10" value="70.0">\r\n    </div>\r\n    \r\n    <div style="background: rgba(0, 243, 255, 0.05); border-left: 3px solid #ff0055; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>GPU SHADER AKTIF:</strong><br>\r\n        Medan grid ditarik menggunakan fungsi Gaussian secara matematis. Warna mendeteksi kedalaman sumur gravitasi/medan.\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="warp-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.2); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n    \r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-camera" style="background: rgba(255, 0, 85, 0.2); border: 1px solid #ff0055; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🎥 AUTO-ROTATE\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Parameter -->\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.7); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.4);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00f3ff; letter-spacing: 1px;">KEDALAMAN DISTORSI (ΔZ)</div>\r\n      <div id="hud-depth" style="font-family: \'Orbitron\', monospace; font-size: 16px; color: #ff0055; font-weight: bold;">0.00 Unit</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {

    // 1. SCENE & KAMERA
    const container = document.getElementById('warp-canvas-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 60, 120); 

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Cegah kamera tembus ke bawah lantai

    // 2. POST-PROCESSING (BLOOM)
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.5, 0.4, 0.85);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 3. PENCAHAYAAN
    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xff0055, 2, 200);
    scene.add(pointLight);

    // 4. OBJEK PARTIKEL (Bintang/Massa)
    const particleGeo = new THREE.SphereGeometry(3, 32, 32);
    const particleMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });
    const particle = new THREE.Mesh(particleGeo, particleMat);
    scene.add(particle);

    // Jejak Cahaya (Trail)
    const trailPoints = [];
    const trailGeo = new THREE.BufferGeometry();
    const trailMat = new THREE.LineBasicMaterial({ color: 0xff3388, transparent: true, opacity: 0.8 });
    const trail = new THREE.Line(trailGeo, trailMat);
    scene.add(trail);

    // 5. FABRIC OF SPACE (DYNAMIC GRID DENGAN SHADER GPU)
    const gridSize = 200;
    const gridSegments = 100; // 10.000 titik untuk distorsi halus
    const gridGeo = new THREE.PlaneGeometry(gridSize, gridSize, gridSegments, gridSegments);
    gridGeo.rotateX(-Math.PI / 2);

    const gridUniforms = {
        time: { value: 0 },
        particlePos: { value: new THREE.Vector3(0, 0, 0) },
        mass: { value: 5.0 },
        tension: { value: 70.0 },
        baseColor: { value: new THREE.Color(0x00f3ff) },
        coreColor: { value: new THREE.Color(0xff0055) } // Berubah merah di dasar sumur
    };

    const gridMat = new THREE.ShaderMaterial({
        uniforms: gridUniforms,
        transparent: true,
        wireframe: true,
        vertexShader: `
            uniform float time;
            uniform vec3 particlePos;
            uniform float mass;
            uniform float tension;
            varying vec3 vPos;
            
            void main() {
                vec3 pos = position;
                // Hitung jarak titik ruang ke partikel (bidang X-Z)
                float dist = distance(pos.xz, particlePos.xz);
                
                // Gaussian Well Formula: Membengkokkan ruang ke bawah
                // depth = -mass * konstanta * e^(-dist^2 / spread)
                float depth = -mass * 4.0 * exp(-(dist * dist) / (tension * 10.0));
                
                // Tambahan riak kuantum minor
                float ripple = sin(dist * 0.5 - time * 3.0) * 0.5;
                
                pos.y += depth + (ripple * exp(-dist * 0.02)); 
                vPos = pos;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 baseColor;
            uniform vec3 coreColor;
            varying vec3 vPos;
            
            void main() {
                // Transisi warna: Cyan di tempat datar, Merah Neon di bagian dalam (Y negatif)
                float depthRatio = clamp(abs(vPos.y) / 25.0, 0.0, 1.0);
                vec3 mixedColor = mix(baseColor, coreColor, depthRatio);
                
                // Efek memudar di batas ujung alam semesta
                float distFromCenter = length(vPos.xz);
                float alpha = 1.0 - smoothstep(60.0, 100.0, distFromCenter);
                
                gl_FragColor = vec4(mixedColor, alpha * (0.3 + depthRatio * 0.7)); 
            }
        `
    });

    const spaceFabric = new THREE.Mesh(gridGeo, gridMat);
    scene.add(spaceFabric);

    // 6. LOGIKA UI & PARAMETER FISIKA
    const massSlider = document.getElementById('mass-slider');
    const vSlider = document.getElementById('v-slider');
    const tensionSlider = document.getElementById('tension-slider');
    const hudDepth = document.getElementById('hud-depth');

    function updateParams() {
        const m = parseFloat(massSlider.value);
        const v = parseFloat(vSlider.value);
        const t = parseFloat(tensionSlider.value);
        
        document.getElementById('val-mass').innerText = m.toFixed(1) + " M";
        document.getElementById('val-v').innerText = v.toFixed(1) + " x";
        
        let tLabel = t < 50 ? "Kaku" : (t > 100 ? "Elastis" : "Medium");
        document.getElementById('val-tension').innerText = tLabel;

        gridUniforms.mass.value = m;
        gridUniforms.tension.value = t;

        // Hitung kedalaman maksimal teoritis di titik pusat (dist = 0)
        let maxDepth = m * 4.0;
        hudDepth.innerText = maxDepth.toFixed(2) + " Unit";
    }

    [massSlider, vSlider, tensionSlider].forEach(s => s.addEventListener('input', updateParams));
    updateParams();

    // Logika Tombol
    let isAutoRotate = true;
    const btnCamera = document.getElementById('btn-camera');
    btnCamera.addEventListener('click', () => {
        isAutoRotate = !isAutoRotate;
        controls.autoRotate = isAutoRotate;
        btnCamera.innerHTML = isAutoRotate ? '🎥 AUTO-ROTATE: ON' : '🎥 AUTO-ROTATE: OFF';
        btnCamera.style.background = isAutoRotate ? 'rgba(255, 0, 85, 0.4)' : 'rgba(255, 0, 85, 0.2)';
    });
    controls.autoRotate = isAutoRotate;
    controls.autoRotateSpeed = 1.0;

    const visWrapper = document.getElementById('vis-panel-wrapper');
    const btnFullscreen = document.getElementById('btn-fullscreen');
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

    // 7. ANIMATION LOOP (LINTASAN LISSAJOUS)
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        const v = parseFloat(vSlider.value);
        
        gridUniforms.time.value = elapsedTime;

        // Gerak partikel membentuk pola angka 8 (Lissajous curve)
        const orbitSpeed = elapsedTime * v * 0.5;
        const radiusX = 40;
        const radiusZ = 20;
        
        const px = Math.sin(orbitSpeed) * radiusX;
        const pz = Math.sin(orbitSpeed * 2) * radiusZ;
        
        // Elevasi Y mengikuti kedalaman grid (agar partikel menempel di dasar sumur)
        // Mengekstrak ulang fungsi eksponensial di JS untuk partikel
        const dist = Math.sqrt(px*px + pz*pz) * 0; // Jarak dari partikel ke partikel adalah 0
        const py = -(parseFloat(massSlider.value) * 4.0) + 3; // +3 agar titik tengah bola di atas permukaan
        
        particle.position.set(px, py, pz);
        pointLight.position.copy(particle.position);

        // Update Uniform GPU Shader
        gridUniforms.particlePos.value.copy(particle.position);

        // Trail Update
        if (v > 0) {
            trailPoints.push(particle.position.clone());
            if (trailPoints.length > 80) trailPoints.shift();
            trailGeo.setFromPoints(trailPoints);
        }

        controls.update(); 
        composer.render(); 
    }
    animate();

  } catch (err) { console.error('Module script error:', err); }
})();