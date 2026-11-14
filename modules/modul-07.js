// Auto-generated module #07
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js, OrbitControls, dan Post-Processing (Bloom) -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Sumur Spasi-Waktu 3D</h3>\r\n    \r\n    <div class="input-group">\r\n      <label>Massa Inti Pusat (M) <span id="val-mass" class="value-display">5.0 M☉</span></label>\r\n      <input type="range" id="mass-slider" min="1.0" max="10.0" step="0.5" value="5.0">\r\n    </div>\r\n    \r\n    <div class="input-group">\r\n      <label>Jarak Orbit (r) <span id="val-r" class="value-display">30 Unit</span></label>\r\n      <input type="range" id="r-slider" min="15" max="60" step="1" value="30">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Kecepatan Sudut (ω) <span id="val-w" class="value-display">1.5 rad/s</span></label>\r\n      <input type="range" id="w-slider" min="0.5" max="5.0" step="0.1" value="1.5">\r\n    </div>\r\n    \r\n    <div style="background: rgba(138, 43, 226, 0.1); border-left: 3px solid #8a2be2; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>TEORI RELATIVITAS UMUM:</strong><br>\r\n        Massa (M) membengkokkan ruang-waktu. Partikel (planet) bergerak lurus, namun mengikuti lengkungan ruang tersebut (geodesik).\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="well-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(138, 43, 226, 0.3); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n    \r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-camera" style="background: rgba(138, 43, 226, 0.2); border: 1px solid #8a2be2; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🎥 AUTO-ROTATE\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Parameter Relativitas -->\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.7); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(138, 43, 226, 0.5);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #8a2be2; letter-spacing: 1px;">KEDALAMAN SUMUR (ΔZ)</div>\r\n      <div id="hud-depth" style="font-family: \'Orbitron\', monospace; font-size: 16px; color: #fff; font-weight: bold; margin-bottom: 5px;">0.00 Unit</div>\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00ffaa; letter-spacing: 1px;">POTENSIAL (U) DI ORBIT</div>\r\n      <div id="hud-potential" style="font-family: \'Orbitron\', monospace; font-size: 16px; color: #fff; font-weight: bold;">0.00 Unit</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {

    // 1. SCENE & KAMERA
    const container = document.getElementById('well-canvas-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a); // Hitam Kosmos

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    // Kamera ditarik agak tinggi agar lengkungan corong terlihat jelas
    camera.position.set(0, 70, 140); 

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.1; // Jangan sampai tembus ke bawah kain ruang-waktu

    // 2. POST-PROCESSING (BLOOM EFEK)
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.8, 0.5, 0.8);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 3. PENCAHAYAAN
    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);
    
    // Cahaya dari dasar sumur (Inti Bintang/Nukleus)
    const centerLight = new THREE.PointLight(0xff0055, 3, 200);
    scene.add(centerLight);
    
    // Cahaya dari planet yang mengorbit
    const planetLight = new THREE.PointLight(0x00ffaa, 1.5, 100);
    scene.add(planetLight);

    // 4. OBJEK FISIKA (INTI & PLANET)
    // Inti Supermasif di dasar sumur
    const coreGeo = new THREE.SphereGeometry(4, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Planet/Elektron yang mengorbit
    const planetGeo = new THREE.SphereGeometry(2, 16, 16);
    const planetMat = new THREE.MeshBasicMaterial({ color: 0x00ffaa });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    scene.add(planet);

    // Jejak Orbit Planet
    const trailPoints = [];
    const trailGeo = new THREE.BufferGeometry();
    const trailMat = new THREE.LineBasicMaterial({ color: 0x00ffaa, transparent: true, opacity: 0.6 });
    const trail = new THREE.Line(trailGeo, trailMat);
    scene.add(trail);

    // 5. FABRIC OF SPACE-TIME (GPU SHADER)
    const gridSize = 200;
    const gridSegments = 100; // 10.000 Vertices
    const gridGeo = new THREE.PlaneGeometry(gridSize, gridSize, gridSegments, gridSegments);
    gridGeo.rotateX(-Math.PI / 2); // Rebahkan jadi lantai

    const gridUniforms = {
        mass: { value: 5.0 },
        // Konstanta untuk kelengkungan (Lorentzian Curve)
        curvature: { value: 80.0 }, 
        baseColor: { value: new THREE.Color(0x00f3ff) }, // Cyan (Ruang Datar)
        deepColor: { value: new THREE.Color(0x8a2be2) }, // Ungu (Distorsi Menengah)
        coreColor: { value: new THREE.Color(0xff0055) }  // Merah (Dasar Sumur)
    };

    const gridMat = new THREE.ShaderMaterial({
        uniforms: gridUniforms,
        transparent: true,
        wireframe: true,
        vertexShader: `
            uniform float mass;
            uniform float curvature;
            varying vec3 vPos;
            
            void main() {
                vec3 pos = position;
                // Jarak titik dari pusat (0,0,0)
                float dist = length(pos.xz);
                
                // Lorentzian Gravity Well Formula: kedalaman berbanding terbalik dengan jarak kuadrat
                // Mencegah nilai tak terhingga (infinity) di pusat dengan menambahkan konstanta (curvature)
                float depth = -(mass * 1000.0) / (dist * dist + curvature);
                
                pos.y = depth;
                vPos = pos;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 baseColor;
            uniform vec3 deepColor;
            uniform vec3 coreColor;
            varying vec3 vPos;
            
            void main() {
                // Memetakan warna berdasarkan kedalaman Y
                // Y=0 -> Datar (Cyan), Y=-30 -> Ungu, Y=-100 -> Merah
                float depthAbs = abs(vPos.y);
                
                vec3 color = baseColor;
                if(depthAbs < 30.0) {
                    color = mix(baseColor, deepColor, depthAbs / 30.0);
                } else {
                    color = mix(deepColor, coreColor, clamp((depthAbs - 30.0) / 70.0, 0.0, 1.0));
                }
                
                // Efek fade-out di ujung jaring semesta
                float dist = length(vPos.xz);
                float alpha = 1.0 - smoothstep(60.0, 100.0, dist);
                
                gl_FragColor = vec4(color, alpha * 0.5); 
            }
        `
    });

    const spaceFabric = new THREE.Mesh(gridGeo, gridMat);
    // Geser sedikit ke atas agar batas Y=0 sejajar dengan sumbu tengah
    spaceFabric.position.y = 5; 
    scene.add(spaceFabric);

    // 6. LOGIKA UI & FISIKA JAVASCRIPT
    const massSlider = document.getElementById('mass-slider');
    const rSlider = document.getElementById('r-slider');
    const wSlider = document.getElementById('w-slider');
    const hudDepth = document.getElementById('hud-depth');
    const hudPotential = document.getElementById('hud-potential');

    // Fungsi cermin dari Shader GPU untuk menghitung Y secara matematis di CPU
    function calculateDepthAtRadius(mass, radius) {
        const curvature = 80.0;
        return -(mass * 1000.0) / (radius * radius + curvature);
    }

    function updateParams() {
        const M = parseFloat(massSlider.value);
        const r = parseFloat(rSlider.value);
        const w = parseFloat(wSlider.value);
        
        document.getElementById('val-mass').innerText = M.toFixed(1) + " M☉";
        document.getElementById('val-r').innerText = r.toFixed(0) + " Unit";
        document.getElementById('val-w').innerText = w.toFixed(1) + " rad/s";

        gridUniforms.mass.value = M;

        // Hitung kedalaman absolut di pusat (r=0)
        let maxDepth = calculateDepthAtRadius(M, 0);
        hudDepth.innerText = Math.abs(maxDepth).toFixed(1) + " Unit";
        
        // Hitung energi potensial (kedalaman Y) pada posisi orbit r
        let potential = calculateDepthAtRadius(M, r);
        hudPotential.innerText = Math.abs(potential).toFixed(2) + " Unit";

        // Letakkan inti supermasif tepat di dasar sumur + sedikit offset radius bola
        core.position.set(0, maxDepth + spaceFabric.position.y + 1, 0);
        centerLight.position.copy(core.position);
        
        // Bersihkan ekor komet saat slider jarak diubah agar tidak ada garis melintang
        trailPoints.length = 0;
        trailGeo.setFromPoints(trailPoints);
    }

    [massSlider, rSlider, wSlider].forEach(s => s.addEventListener('input', updateParams));
    updateParams();

    // Logika Tombol Kamera
    let isAutoRotate = true;
    const btnCamera = document.getElementById('btn-camera');
    btnCamera.addEventListener('click', () => {
        isAutoRotate = !isAutoRotate;
        controls.autoRotate = isAutoRotate;
        btnCamera.innerHTML = isAutoRotate ? '🎥 AUTO-ROTATE: ON' : '🎥 AUTO-ROTATE: OFF';
        btnCamera.style.background = isAutoRotate ? 'rgba(138, 43, 226, 0.4)' : 'rgba(138, 43, 226, 0.2)';
    });
    controls.autoRotate = isAutoRotate;
    controls.autoRotateSpeed = 0.8; // Putaran pelan sinematik

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
        container.style.border = isFs ? 'none' : '1px solid rgba(138, 43, 226, 0.3)';
        setTimeout(() => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
            composer.setSize(container.clientWidth, container.clientHeight);
        }, 100);
    });

    // 7. ANIMATION LOOP
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        
        const r = parseFloat(rSlider.value);
        const w = parseFloat(wSlider.value);
        const M = parseFloat(massSlider.value);

        // Gerak Melingkar Beraturan (GMB) untuk partikel yang mengorbit
        const angle = elapsedTime * w;
        const px = Math.cos(angle) * r;
        const pz = Math.sin(angle) * r;
        
        // Elevasi Y (Ketinggian planet) dikalkulasi secara presisi 
        // agar ia selalu menempel pada kemiringan corong kain ruang-waktu
        const py = calculateDepthAtRadius(M, r) + spaceFabric.position.y + 1;
        
        planet.position.set(px, py, pz);
        planetLight.position.copy(planet.position);

        // Trail / Ekor Planet
        trailPoints.push(planet.position.clone());
        if (trailPoints.length > 80) trailPoints.shift(); // Batasi panjang ekor
        trailGeo.setFromPoints(trailPoints);

        // Kamera Auto Rotate
        controls.update(); 
        composer.render(); 
    }
    animate();

  } catch (err) { console.error('Module script error:', err); }
})();