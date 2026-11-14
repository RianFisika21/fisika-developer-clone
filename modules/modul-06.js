// Auto-generated module #06
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js, OrbitControls, dan Post-Processing (Bloom) -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Medan Vektor Elektromagnetik</h3>\r\n    \r\n    <div class="input-group">\r\n      <label>Muatan Partikel (q) <span id="val-q" class="value-display">+5.0 μC</span></label>\r\n      <input type="range" id="q-slider" min="-10.0" max="10.0" step="0.5" value="5.0">\r\n    </div>\r\n    \r\n    <div class="input-group">\r\n      <label>Kecepatan Partikel (v) <span id="val-v" class="value-display">1.0 x</span></label>\r\n      <input type="range" id="v-slider" min="0.0" max="3.0" step="0.1" value="1.0">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Ketinggian Ruang (Sumbu Y) <span id="val-layer" class="value-display">Multi-Layer 3D</span></label>\r\n      <input type="range" id="layer-slider" min="1" max="3" step="1" value="3">\r\n    </div>\r\n    \r\n    <div style="background: rgba(0, 243, 255, 0.05); border-left: 3px solid #00ffaa; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>HUKUM COULOMB:</strong><br>\r\n        Besaran & arah vektor (panah) mematuhi Inverse Square Law (1/r²). Ubah muatan (q) ke negatif untuk membalik arah medan!\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="vector-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.2); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n    \r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-camera" style="background: rgba(255, 0, 85, 0.2); border: 1px solid #ff0055; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🎥 AUTO-ROTATE\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Parameter -->\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.7); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.4);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00ffaa; letter-spacing: 1px;">KUAT MEDAN MAKS (E)</div>\r\n      <div id="hud-e" style="font-family: \'Orbitron\', monospace; font-size: 16px; color: #fff; font-weight: bold;">0.00 V/m</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {

    // 1. SCENE & KAMERA
    const container = document.getElementById('vector-canvas-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 70, 120); 

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // 2. POST-PROCESSING (BLOOM EFEK RADIASI/MEDAN)
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.5, 0.4, 0.8);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 3. PENCAHAYAAN
    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 2, 200);
    scene.add(pointLight);

    // 4. OBJEK PARTIKEL (Bermuatan Listrik)
    const particleGeo = new THREE.SphereGeometry(3, 32, 32);
    const particleMat = new THREE.MeshBasicMaterial({ color: 0x00ffaa }); // Default Positif
    const particle = new THREE.Mesh(particleGeo, particleMat);
    scene.add(particle);

    // 5. MEMBANGUN LAUTAN VEKTOR (INSTANCED MESH)
    // Menggunakan ConeGeometry (Kerucut) yang dipanjangkan untuk mensimulasikan bentuk panah vektor
    const arrowGeo = new THREE.ConeGeometry(0.6, 4, 4); // 4 sisi agar low-poly dan ringan
    arrowGeo.translate(0, 2, 0); // Pindahkan origin ke pangkal kerucut agar rotasinya dari belakang
    arrowGeo.rotateX(Math.PI / 2); // Putar agar menghadap sumbu Z default
    
    const arrowMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    // Konfigurasi Grid Ruang
    const gridX = 25;
    const gridZ = 25;
    const gridY = 3; // 3 Lapis ruang (Atas, Tengah, Bawah)
    const spacing = 6;
    const totalVectors = gridX * gridY * gridZ;
    
    const vectorField = new THREE.InstancedMesh(arrowGeo, arrowMat, totalVectors);
    scene.add(vectorField);

    // Array menyimpan posisi asli setiap pangkal panah di ruang hampa
    const vectorPositions = [];
    let idx = 0;
    
    // Matriks dummy untuk perhitungan per-frame
    const dummy = new THREE.Object3D();
    const colorDummy = new THREE.Color();
    const upVector = new THREE.Vector3(0, 0, 1); // Arah referensi default setelah di-rotateX

    // Inisialisasi posisi kisi-kisi vektor
    for (let y = 0; y < gridY; y++) {
        for (let x = 0; x < gridX; x++) {
            for (let z = 0; z < gridZ; z++) {
                let posX = (x - gridX/2) * spacing;
                let posY = (y - gridY/2) * spacing * 3; // Jarak antar layer vertikal diperlebar
                let posZ = (z - gridZ/2) * spacing;
                
                vectorPositions.push(new THREE.Vector3(posX, posY, posZ));
                
                dummy.position.set(posX, posY, posZ);
                dummy.updateMatrix();
                vectorField.setMatrixAt(idx, dummy.matrix);
                idx++;
            }
        }
    }

    // 6. LOGIKA UI & PARAMETER FISIKA
    const qSlider = document.getElementById('q-slider');
    const vSlider = document.getElementById('v-slider');
    const layerSlider = document.getElementById('layer-slider');
    const hudE = document.getElementById('hud-e');

    function updateParams() {
        const q = parseFloat(qSlider.value);
        const v = parseFloat(vSlider.value);
        
        let qText = (q > 0 ? "+" : "") + q.toFixed(1) + " μC";
        document.getElementById('val-q').innerText = qText;
        document.getElementById('val-v').innerText = v.toFixed(1) + " x";
        
        // Ganti warna partikel berdasarkan muatan: Positif = Cyan/Hijau, Negatif = Pink/Merah
        if (q > 0) {
            particle.material.color.setHex(0x00f3ff);
            pointLight.color.setHex(0x00f3ff);
        } else if (q < 0) {
            particle.material.color.setHex(0xff0055);
            pointLight.color.setHex(0xff0055);
        } else {
            particle.material.color.setHex(0x555555); // Netral
            pointLight.color.setHex(0x000000);
        }
    }

    [qSlider, vSlider, layerSlider].forEach(s => s.addEventListener('input', updateParams));
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
    controls.autoRotateSpeed = 0.5;

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

    // 7. ANIMATION LOOP & UPDATE MEDAN VEKTOR
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        
        const q = parseFloat(qSlider.value);
        const v = parseFloat(vSlider.value);
        const activeLayers = parseInt(layerSlider.value);
        
        // Modifikasi Label UI Layer
        document.getElementById('val-layer').innerText = activeLayers === 1 ? "1 Lapis (Bidang X-Z)" : activeLayers + " Lapis 3D";

        // Gerak partikel melingkar
        const orbitSpeed = elapsedTime * v * 0.8;
        particle.position.x = Math.cos(orbitSpeed) * 35;
        particle.position.z = Math.sin(orbitSpeed * 1.5) * 25; 
        particle.position.y = Math.sin(orbitSpeed * 0.5) * 15; // Bergerak naik turun
        
        pointLight.position.copy(particle.position);

        let maxFieldStrength = 0;

        // KALKULASI DINAMIS SETIAP VEKTOR DI LAUTAN MEDAN
        for (let i = 0; i < totalVectors; i++) {
            let basePos = vectorPositions[i];
            
            // Logika Visibilitas Layer
            let currentLayer = Math.floor(i / (gridX * gridZ));
            // Menyembunyikan panah jika layer dinonaktifkan (Scale = 0)
            if (currentLayer >= activeLayers) {
                dummy.scale.set(0, 0, 0);
                dummy.updateMatrix();
                vectorField.setMatrixAt(i, dummy.matrix);
                continue; 
            }

            // Hitung Vektor Jarak (r)
            let dir = new THREE.Vector3().subVectors(basePos, particle.position);
            let distSq = dir.lengthSq(); 
            
            if (distSq < 1.0) distSq = 1.0; // Mencegah nilai infinity jika partikel menabrak titik

            // Hitung Kuat Medan E = k * |q| / r^2
            let E = Math.abs(q) * 800 / distSq;
            if (E > maxFieldStrength) maxFieldStrength = E;

            dir.normalize(); // Mengubah menjadi unit vektor r-hat

            // Hukum Coulomb: Arah berbalik (menuju partikel) jika muatan (q) negatif
            if (q < 0) {
                dir.negate();
            } else if (q === 0) {
                E = 0; // Medan hilang jika netral
            }

            // Atur Ukuran (Scale) Panah Berdasarkan Kekuatan Medan
            let arrowScale = Math.min(E, 2.5); // Batasi ukuran maksimal agar tidak tembus pandang berlebihan
            
            dummy.position.copy(basePos);
            dummy.scale.set(arrowScale, arrowScale, arrowScale);

            // Quaternion untuk memutar pangkal panah ke arah r-hat
            if (E > 0.01) {
                dummy.quaternion.setFromUnitVectors(upVector, dir);
            }
            
            dummy.updateMatrix();
            vectorField.setMatrixAt(i, dummy.matrix);

            // COLOR MAPPING (Heatmap Berdasarkan Kuat Medan)
            // Biru Tua/Gelap = Medan Lemah, Merah/Putih Nyala = Medan Kuat
            if (q > 0) {
                // Skema warna Positif: Biru Laut -> Cyan -> Kuning Putih
                let hue = Math.max(0.1, 0.6 - (E * 0.4));
                let lightness = Math.min(0.8, 0.1 + (E * 0.4));
                colorDummy.setHSL(hue, 1.0, lightness);
            } else {
                // Skema warna Negatif: Ungu Gelap -> Pink -> Merah Neon
                let hue = Math.min(0.9, 0.7 + (E * 0.3));
                let lightness = Math.min(0.8, 0.1 + (E * 0.4));
                colorDummy.setHSL(hue, 1.0, lightness);
            }
            vectorField.setColorAt(i, colorDummy);
        }

        hudE.innerText = maxFieldStrength.toFixed(2) + " N/C";

        // Minta GPU untuk memperbarui seluruh panah secara serentak
        vectorField.instanceMatrix.needsUpdate = true;
        vectorField.instanceColor.needsUpdate = true;

        controls.update(); 
        composer.render(); 
    }
    animate();

  } catch (err) { console.error('Module script error:', err); }
})();