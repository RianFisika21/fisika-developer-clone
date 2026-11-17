// Auto-generated module #02
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js, OrbitControls, dan Post-Processing (Bloom) -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Deposisi Energi: Bragg Peak</h3>\r\n    \r\n    <div class="input-group">\r\n      <label>Energi Awal Proton (E₀) <span id="val-e" class="value-display">150 MeV</span></label>\r\n      <input type="range" id="e-slider" min="50" max="250" step="5" value="150">\r\n    </div>\r\n    \r\n    <div class="input-group">\r\n      <label>Densitas Medium (ρ) <span id="val-rho" class="value-display">1.0 g/cm³ (Air/Jaringan)</span></label>\r\n      <input type="range" id="rho-slider" min="0.2" max="2.0" step="0.1" value="1.0">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Sebaran Berkas (Spread) <span id="val-spread" class="value-display">2.0 mm</span></label>\r\n      <input type="range" id="spread-slider" min="0.5" max="10.0" step="0.5" value="2.0">\r\n    </div>\r\n    \r\n    <div style="background: rgba(0, 243, 255, 0.05); border-left: 3px solid #ff0055; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>HEATMAP VOXEL:</strong><br>\r\n        🟦 Biru: Deposisi Rendah (Cepat)<br>\r\n        🟥 Merah: Puncak Bragg (Berhenti)\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="bragg-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.2); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n    \r\n    <!-- Tombol UI -->\r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-fire" style="background: rgba(255, 0, 85, 0.2); border: 1px solid #ff0055; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px); box-shadow: 0 0 10px rgba(255,0,85,0.5);">\r\n        ☢️ TEMBAK BERKAS\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Kedalaman Penetrasi -->\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.7); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.4);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00f3ff; letter-spacing: 1px;">KEDALAMAN PENETRASI (Z)</div>\r\n      <div id="hud-depth" style="font-family: \'Orbitron\', monospace; font-size: 16px; color: #fff; font-weight: bold;">0.00 cm</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {

    // 1. SCENE & KAMERA
    const container = document.getElementById('bragg-canvas-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);

    // Kamera menghadap dari samping untuk melihat profil kedalaman (Z-axis)
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(150, 40, 0); 

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0, 0);

    // 2. POST-PROCESSING (BLOOM) UNTUK EFEK RADIASI
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.8, 0.6, 0.8);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 3. PENCAHAYAAN
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    // 4. LINGKUNGAN: PHANTOM JARINGAN (TISSUE BOX)
    const boxGeo = new THREE.BoxGeometry(100, 60, 60);
    const boxMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true, transparent: true, opacity: 0.15 });
    const phantomBox = new THREE.Mesh(boxGeo, boxMat);
    scene.add(phantomBox);

    // Label Kedalaman pada Box Phantom
    const gridHelper = new THREE.GridHelper(100, 10, 0x333333, 0x111111);
    gridHelper.position.y = -30;
    scene.add(gridHelper);

    // 5. SISTEM HEATMAP VOXEL (INSTANCED MESH)
    // Maksimal voxel yang bisa di-render (sangat efisien untuk GPU)
    const maxVoxels = 10000; 
    const voxelGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const voxelMat = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Warna asli dikendalikan oleh instancing
    let voxelMesh = new THREE.InstancedMesh(voxelGeo, voxelMat, maxVoxels);
    scene.add(voxelMesh);

    // Matriks dummy untuk perhitungan posisi instancing
    const dummy = new THREE.Object3D();
    const colorDummy = new THREE.Color();

    // 6. LOGIKA FISIKA DEPOSISI ENERGI (PENDEKATAN BETHE-BLOCH)
    const eSlider = document.getElementById('e-slider');
    const rhoSlider = document.getElementById('rho-slider');
    const spreadSlider = document.getElementById('spread-slider');
    const hudDepth = document.getElementById('hud-depth');

    let isFiring = false;
    let beamData = [];
    let currentVoxelCount = 0;
    let animationFrame = 0;

    function calculateBeam() {
        const E0 = parseFloat(eSlider.value);
        const rho = parseFloat(rhoSlider.value);
        const spread = parseFloat(spreadSlider.value);
        
        // Update Label
        document.getElementById('val-e').innerText = E0 + " MeV";
        let mediumName = rho < 0.5 ? " (Paru-paru)" : (rho > 1.5 ? " (Tulang)" : " (Air/Jaringan)");
        document.getElementById('val-rho').innerText = rho.toFixed(1) + " g/cm³" + mediumName;
        document.getElementById('val-spread').innerText = spread.toFixed(1) + " mm";

        // Reset Data Simulasi
        beamData = [];
        voxelMesh.count = 0; // Sembunyikan semua voxel
        currentVoxelCount = 0;
        animationFrame = 0;
        
        const numParticles = 80; // Jumlah partikel per tembakan
        let maxZ_penetration = -50;

        for (let i = 0; i < numParticles; i++) {
            let E = E0 * (1 + (Math.random() - 0.5) * 0.05); // Variasi energi awal (Energy spread)
            let z = -50; // Masuk dari sisi kiri phantom box (X direpresentasikan sbg Z di hitungan ini agar menembus lebar box)
            
            // Variasi titik tembak (Lateral spread)
            let x = (Math.random() - 0.5) * spread * 2;
            let y = (Math.random() - 0.5) * spread * 2;
            
            let dx = (Math.random() - 0.5) * 0.01;
            let dy = (Math.random() - 0.5) * 0.01;

            const dz = 0.5; // Step iterasi (resolusi spasial voxel)
            const C = 80; // Konstanta empiris penghenti

            let track = [];

            while (E > 0 && z < 50) {
                // Simplified Stopping Power: dE/dz sebanding dengan 1/E (pendekatan klasik)
                // Ditambah eksponensial kecil agar bentuk Bragg Peak lebih dramatis di ujung
                let dE = (rho * C) / Math.pow(E, 0.8) * dz; 
                
                if (dE > E) dE = E; // Energi habis
                E -= dE;

                // Multiple Coulomb Scattering: Partikel makin menyebar saat energinya turun
                let scatterFactor = (E0 / (E + 1)) * 0.02 * rho;
                x += dx + (Math.random() - 0.5) * scatterFactor;
                y += dy + (Math.random() - 0.5) * scatterFactor;
                z += dz;

                track.push({
                    pos: new THREE.Vector3(z, y, x), // Mapping sumbu Z fisis ke sumbu X kanvas
                    dE: dE,
                    E_rem: E
                });

                if (z > maxZ_penetration) maxZ_penetration = z;
            }
            beamData.push(track);
        }

        // Hitung persentase kedalaman (Range 0 - 100 cm di dalam phantom)
        let depth_cm = maxZ_penetration + 50; 
        hudDepth.innerText = depth_cm.toFixed(1) + " cm";
    }

    [eSlider, rhoSlider, spreadSlider].forEach(s => s.addEventListener('input', calculateBeam));
    calculateBeam();

    // 7. TOMBOL & INTERAKSI
    const btnFire = document.getElementById('btn-fire');
    btnFire.addEventListener('click', () => {
        calculateBeam();
        isFiring = true;
        btnFire.style.background = 'rgba(255, 255, 255, 0.8)';
        btnFire.style.color = '#000';
        setTimeout(() => {
            btnFire.style.background = 'rgba(255, 0, 85, 0.2)';
            btnFire.style.color = '#fff';
        }, 200);
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

    // 8. ANIMATION LOOP (MERENDER VOXEL HEATMAP)
    function animate() {
        requestAnimationFrame(animate);
        
        if (isFiring) {
            let voxelsAddedThisFrame = 0;
            const speedMultiplier = 2; // Berapa langkah yang digambar per frame
            
            for(let step = 0; step < speedMultiplier; step++) {
                let stillFlying = false;

                for (let i = 0; i < beamData.length; i++) {
                    let track = beamData[i];
                    
                    if (animationFrame < track.length) {
                        stillFlying = true;
                        let point = track[animationFrame];
                        
                        // Batas aman array instanced mesh
                        if (currentVoxelCount < maxVoxels) {
                            dummy.position.copy(point.pos);
                            
                            // Skala voxel membesar saat Bragg Peak (dE tinggi)
                            let scale = 0.5 + (point.dE * 0.15);
                            dummy.scale.set(scale, scale, scale);
                            dummy.updateMatrix();
                            voxelMesh.setMatrixAt(currentVoxelCount, dummy.matrix);

                            // Pemetaan Warna Heatmap (Berdasarkan Deposisi dE)
                            // Hue: 0.6 (Biru) -> 0.0 (Merah). 
                            // dE rendah = hue tinggi (biru), dE tinggi = hue rendah (merah)
                            let hue = Math.max(0, 0.6 - (point.dE * 0.05));
                            let lightness = 0.4 + (point.dE * 0.03); // Makin tinggi dE, makin terang menyala
                            colorDummy.setHSL(hue, 1.0, Math.min(lightness, 0.7));
                            
                            voxelMesh.setColorAt(currentVoxelCount, colorDummy);
                            currentVoxelCount++;
                        }
                    }
                }
                
                animationFrame++;
                if (!stillFlying) {
                    isFiring = false; // Semua partikel sudah berhenti
                    break;
                }
            }
            
            // Beritahu GPU bahwa data matrix dan warna telah diperbarui
            voxelMesh.instanceMatrix.needsUpdate = true;
            if (voxelMesh.instanceColor) voxelMesh.instanceColor.needsUpdate = true;
            voxelMesh.count = currentVoxelCount;
        }

        controls.update(); 
        composer.render(); 
    }
    animate();

  } catch (err) { console.error('Module script error:', err); }
})();