// Auto-generated module #10
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js, OrbitControls, dan Post-Processing (Bloom) -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Data Topografi Plasma DBD</h3>\r\n    \r\n    <div class="input-group">\r\n      <label>Tegangan Input (V) <span id="val-v" class="value-display">15.0 kV</span></label>\r\n      <input type="range" id="v-slider" min="5.0" max="30.0" step="0.5" value="15.0">\r\n    </div>\r\n    \r\n    <div class="input-group">\r\n      <label>Frekuensi (f) <span id="val-f" class="value-display">1.0 kHz</span></label>\r\n      <input type="range" id="f-slider" min="0.1" max="5.0" step="0.1" value="1.0">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Laju Alir Gas (Q) <span id="val-q" class="value-display">2.0 L/m</span></label>\r\n      <input type="range" id="q-slider" min="0.1" max="5.0" step="0.1" value="2.0">\r\n    </div>\r\n    \r\n    <div style="background: rgba(188, 19, 254, 0.1); border-left: 3px solid #bc13fe; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>GPU SURFACE PLOT:</strong><br>\r\n        Sumbu X: Panjang Reaktor<br>\r\n        Sumbu Z: Waktu Distribusi<br>\r\n        Sumbu Y (Tinggi): Konsentrasi Plasma\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="surface-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(188, 19, 254, 0.3); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n    \r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-camera" style="background: rgba(188, 19, 254, 0.2); border: 1px solid #bc13fe; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🎥 AUTO-ROTATE\r\n      </button>\r\n      <button id="btn-wireframe" style="background: rgba(0, 255, 170, 0.2); border: 1px solid #00ffaa; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🕸️ WIREFRAME: ON\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Parameter -->\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.7); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(188, 19, 254, 0.5);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #bc13fe; letter-spacing: 1px;">PUNCAK DENSITAS OZON (C_max)</div>\r\n      <div id="hud-density" style="font-family: \'Orbitron\', monospace; font-size: 16px; color: #fff; font-weight: bold;">0.00 ppm</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {

    // 1. SCENE & KAMERA
    const container = document.getElementById('surface-canvas-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(80, 70, 100); 

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; 

    // 2. POST-PROCESSING (BLOOM EFEK PLASMA)
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.8, 0.4, 0.85);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 3. ELEMEN KOTAK DIAGRAM (BOUNDING BOX & AXIS)
    const boxGeo = new THREE.BoxGeometry(100, 40, 100);
    const boxMat = new THREE.MeshBasicMaterial({ color: 0x334455, wireframe: true, transparent: true, opacity: 0.1 });
    const boundingBox = new THREE.Mesh(boxGeo, boxMat);
    boundingBox.position.y = 20; 
    scene.add(boundingBox);

    const gridHelper = new THREE.GridHelper(100, 20, 0x00f3ff, 0x112233);
    scene.add(gridHelper);

    // 4. MEMBANGUN SURFACE PLOT (GPU SHADER)
    const segments = 150; // Resolusi plot sangat tinggi (22.500 polygon)
    const planeGeo = new THREE.PlaneGeometry(100, 100, segments, segments);
    planeGeo.rotateX(-Math.PI / 2);

    const surfaceUniforms = {
        time: { value: 0 },
        voltage: { value: 15.0 },
        frequency: { value: 1.0 },
        flowRate: { value: 2.0 },
        colorBase: { value: new THREE.Color(0x001133) },  // Biru Sangat Gelap (0 Densitas)
        colorMid: { value: new THREE.Color(0xbc13fe) },   // Ungu Plasma
        colorPeak: { value: new THREE.Color(0x00ffff) }   // Cyan Terang (Lucutan Mikro Maksimal)
    };

    const surfaceMat = new THREE.ShaderMaterial({
        uniforms: surfaceUniforms,
        transparent: true,
        wireframe: true,
        side: THREE.DoubleSide,
        vertexShader: `
            uniform float time;
            uniform float voltage;
            uniform float frequency;
            uniform float flowRate;
            varying float vHeight;
            
            void main() {
                vec3 pos = position;
                float x = pos.x;
                float z = pos.z;
                
                // KOMPUTASI PERSAMAAN GELOMBANG PLASMA EFEKTIF
                // 1. Gelombang pembawa (Makroskopis) aliran gas
                float baseWave = sin(x * 0.05 - time * flowRate) * cos(z * 0.05 + time);
                
                // 2. Eksitasi Frekuensi Tinggi (Lucutan Mikro DBD)
                // Menggunakan superposisi gelombang sinus kompleks untuk mensimulasikan noise fluktuatif
                float microDischarge = sin(x * frequency * 0.5 + time * 5.0) * sin(z * frequency * 0.5 - time * 3.0);
                float ripple = sin(sqrt(x*x + z*z) * 0.2 - time * frequency * 2.0);
                
                // 3. Ambang Batas Tegangan (Breakdown Voltage)
                // Plasma hanya memuncak di area tengah reaktor (Envelope function)
                float envelope = exp(-(x*x + z*z) / 2500.0); 
                
                // Elevasi Y (Ketinggian Plot)
                // Tegangan berlebih (V > 10) memicu eksponensial lucutan
                float activation = max(0.0, voltage - 10.0);
                
                float h = (baseWave + (microDischarge * 0.5) + (ripple * 0.25)) * (activation * 0.8) * envelope;
                
                // Tambahan random spike ekstrem untuk tegangan sangat tinggi
                float spike = pow(abs(microDischarge), 8.0) * (activation * 0.5) * envelope;
                
                pos.y = h + spike;
                vHeight = pos.y; // Kirim data ketinggian ke Fragment Shader untuk pewarnaan
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 colorBase;
            uniform vec3 colorMid;
            uniform vec3 colorPeak;
            varying float vHeight;
            
            void main() {
                // Skala normalisasi ketinggian (0 hingga ~40)
                float h = clamp(vHeight / 30.0, 0.0, 1.0);
                
                // Gradient Map: Base -> Mid (Ungu) -> Peak (Cyan)
                vec3 finalColor;
                if(h < 0.5) {
                    finalColor = mix(colorBase, colorMid, h * 2.0);
                } else {
                    finalColor = mix(colorMid, colorPeak, (h - 0.5) * 2.0);
                }
                
                // Tambahkan intensitas alpha/glow pada puncak ketinggian
                float alpha = 0.5 + (h * 0.5);
                
                gl_FragColor = vec4(finalColor, alpha);
            }
        `
    });

    const surfaceMesh = new THREE.Mesh(planeGeo, surfaceMat);
    scene.add(surfaceMesh);

    // 5. LOGIKA UI & PARAMETER FISIKA
    const vSlider = document.getElementById('v-slider');
    const fSlider = document.getElementById('f-slider');
    const qSlider = document.getElementById('q-slider');
    const hudDensity = document.getElementById('hud-density');

    function updateParams() {
        const V = parseFloat(vSlider.value);
        const f = parseFloat(fSlider.value);
        const Q = parseFloat(qSlider.value);
        
        document.getElementById('val-v').innerText = V.toFixed(1) + " kV";
        document.getElementById('val-f').innerText = f.toFixed(1) + " kHz";
        document.getElementById('val-q').innerText = Q.toFixed(1) + " L/m";

        surfaceUniforms.voltage.value = V;
        surfaceUniforms.frequency.value = f;
        surfaceUniforms.flowRate.value = Q;

        // Perkiraan empiris puncak densitas berdasarkan parameter (untuk HUD Data)
        let breakdown = Math.max(0, V - 10.0);
        let maxDensity = breakdown * f * 12.5; 
        
        if (V <= 10.0) {
            hudDensity.innerText = "0.00 ppm (Tidak Ada Breakdown)";
            hudDensity.style.color = "#8e949c";
        } else {
            hudDensity.innerText = maxDensity.toFixed(1) + " ppm";
            hudDensity.style.color = "#00ffff"; // Cyan Glow
        }
    }

    [vSlider, fSlider, qSlider].forEach(s => s.addEventListener('input', updateParams));
    updateParams();

    // Logika Tombol Kamera & Wireframe
    let isAutoRotate = true;
    const btnCamera = document.getElementById('btn-camera');
    btnCamera.addEventListener('click', () => {
        isAutoRotate = !isAutoRotate;
        controls.autoRotate = isAutoRotate;
        btnCamera.innerHTML = isAutoRotate ? '🎥 AUTO-ROTATE: ON' : '🎥 AUTO-ROTATE: OFF';
        btnCamera.style.background = isAutoRotate ? 'rgba(188, 19, 254, 0.4)' : 'rgba(188, 19, 254, 0.2)';
    });
    controls.autoRotate = isAutoRotate;
    controls.autoRotateSpeed = 1.0;

    let isWireframe = true;
    const btnWireframe = document.getElementById('btn-wireframe');
    btnWireframe.addEventListener('click', () => {
        isWireframe = !isWireframe;
        surfaceMat.wireframe = isWireframe;
        btnWireframe.innerHTML = isWireframe ? '🕸️ WIREFRAME: ON' : '🔲 SURFACE: ON';
        btnWireframe.style.background = isWireframe ? 'rgba(0, 255, 170, 0.4)' : 'rgba(0, 255, 170, 0.2)';
    });

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
        container.style.border = isFs ? 'none' : '1px solid rgba(188, 19, 254, 0.3)';
        setTimeout(() => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
            composer.setSize(container.clientWidth, container.clientHeight);
        }, 100);
    });

    // 6. ANIMATION LOOP
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        
        // Memompa waktu ke dalam Shader GPU
        surfaceUniforms.time.value = elapsedTime;

        controls.update(); 
        composer.render(); 
    }
    animate();

  } catch (err) { console.error('Module script error:', err); }
})();