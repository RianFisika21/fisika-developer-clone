// Auto-generated module #11
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js, OrbitControls, dan Post-Processing (Bloom) -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Dosimetri Monte Carlo 3D</h3>\r\n    \r\n    <div class="input-group">\r\n      <label>Energi Partikel (E) <span id="val-e" class="value-display">2.0 MeV</span></label>\r\n      <input type="range" id="e-slider" min="0.5" max="5.0" step="0.1" value="2.0">\r\n    </div>\r\n    \r\n    <div class="input-group">\r\n      <label>Densitas Voxel (ρ) <span id="val-rho" class="value-display">1.0 g/cm³</span></label>\r\n      <input type="range" id="rho-slider" min="0.2" max="3.0" step="0.1" value="1.0">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Tampang Lintang Hamburan (σ) <span id="val-scatter" class="value-display">Medium</span></label>\r\n      <input type="range" id="scatter-slider" min="1" max="10" step="1" value="5">\r\n    </div>\r\n    \r\n    <div style="background: rgba(0, 243, 255, 0.05); border-left: 3px solid #00f3ff; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>MCNP/PHITS ENGINE:</strong><br>\r\n        Menghitung <i>Random Walk</i> dan Deposisi Energi. Voxel gelap = Dosis Nol. Voxel Merah = Dosis Maksimal.\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="phantom-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.2); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n    \r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-slice" style="background: rgba(255, 221, 0, 0.2); border: 1px solid #ffdd00; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🔪 POTONGAN MELINTANG\r\n      </button>\r\n      <button id="btn-run" style="background: rgba(255, 0, 85, 0.2); border: 1px solid #ff0055; color: #fff; padding: 8px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px); box-shadow: 0 0 10px rgba(255,0,85,0.4);">\r\n        ☢️ RUN TALLY\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Parameter -->\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.7); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.4);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00f3ff; letter-spacing: 1px;">TOTAL DOSIS TERSERAP</div>\r\n      <div id="hud-dose" style="font-family: \'Orbitron\', monospace; font-size: 16px; color: #fff; font-weight: bold; margin-bottom: 5px;">0.00 MeV</div>\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #ff0055; letter-spacing: 1px;">PARTIKEL LOLOS (ESCAPE)</div>\r\n      <div id="hud-escape" style="font-family: \'Orbitron\', monospace; font-size: 16px; color: #fff; font-weight: bold;">0 / 0</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {

    // 1. SCENE & KAMERA
    const container = document.getElementById('phantom-canvas-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020205);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(60, 40, 70); 

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0, 0);

    // 2. POST-PROCESSING (BLOOM) UNTUK GLOW DOSIMETRI
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.5, 0.3, 0.6);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 3. WIREFRAME BOUNDING BOX (GEOMETRI DETEKTOR/TISSUE)
    const phantomSize = 40;
    const boxGeo = new THREE.BoxGeometry(phantomSize, phantomSize, phantomSize);
    const boxMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true, transparent: true, opacity: 0.15 });
    const phantomMesh = new THREE.Mesh(boxGeo, boxMat);
    scene.add(phantomMesh);

    // 4. MEMBANGUN VOXEL GRID (INSTANCED MESH)
    const gridSize = 12; // 12x12x12 = 1728 Voxels (Sangat ringan untuk GPU)
    const voxelSize = phantomSize / gridSize; // Ukuran tiap kubus kecil
    const halfSize = phantomSize / 2;
    
    // Geometry Voxel sedikit lebih kecil dari selnya agar terlihat seperti grid
    const vGeo = new THREE.BoxGeometry(voxelSize * 0.8, voxelSize * 0.8, voxelSize * 0.8);
    
    // Additive Blending membuat voxel yang dosisnya 0 (Hitam) menjadi tembus pandang/hilang
    const vMat = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    
    const maxVoxels = Math.pow(gridSize, 3);
    const voxelMesh = new THREE.InstancedMesh(vGeo, vMat, maxVoxels);
    scene.add(voxelMesh);

    // Tata letak awal matriks voxel
    const dummy = new THREE.Object3D();
    const colorDummy = new THREE.Color();
    const voxelData = new Array(maxVoxels).fill(0); // Array penyimpan dosis

    function getVoxelIndex(x, y, z) {
        let i = Math.floor((x + halfSize) / voxelSize);
        let j = Math.floor((y + halfSize) / voxelSize);
        let k = Math.floor((z + halfSize) / voxelSize);
        if (i < 0 || i >= gridSize || j < 0 || j >= gridSize || k < 0 || k >= gridSize) return -1;
        return i + (j * gridSize) + (k * gridSize * gridSize);
    }

    function initVoxels() {
        let idx = 0;
        for(let k=0; k<gridSize; k++) {
            for(let j=0; j<gridSize; j++) {
                for(let i=0; i<gridSize; i++) {
                    let px = (i * voxelSize) - halfSize + (voxelSize/2);
                    let py = (j * voxelSize) - halfSize + (voxelSize/2);
                    let pz = (k * voxelSize) - halfSize + (voxelSize/2);
                    
                    dummy.position.set(px, py, pz);
                    dummy.updateMatrix();
                    voxelMesh.setMatrixAt(idx, dummy.matrix);
                    
                    // Awal: Hitam pekat (Tidak terlihat karena Additive Blending)
                    voxelMesh.setColorAt(idx, colorDummy.setHex(0x000000));
                    idx++;
                }
            }
        }
        voxelMesh.instanceMatrix.needsUpdate = true;
        voxelMesh.instanceColor.needsUpdate = true;
    }
    initVoxels();

    // 5. JEJAK PARTIKEL (TRACKS)
    const tracksGroup = new THREE.Group();
    scene.add(tracksGroup);
    let particleTracksData = []; // Data untuk animasi jejak

    // 6. LOGIKA FISIKA MONTE CARLO (MCNP/PHITS SIMPLIFIED)
    const eSlider = document.getElementById('e-slider');
    const rhoSlider = document.getElementById('rho-slider');
    const scatterSlider = document.getElementById('scatter-slider');
    const hudDose = document.getElementById('hud-dose');
    const hudEscape = document.getElementById('hud-escape');
    
    const numParticles = 60; // Jumlah histori (NPS)

    function runMonteCarloTally() {
        const E0 = parseFloat(eSlider.value);
        const rho = parseFloat(rhoSlider.value);
        const scatterCrossSection = parseFloat(scatterSlider.value);
        
        // Reset Visuals
        voxelData.fill(0);
        while(tracksGroup.children.length > 0){
            let child = tracksGroup.children[0];
            tracksGroup.remove(child);
            child.geometry.dispose();
            child.material.dispose();
        }
        particleTracksData = [];

        let totalDose = 0;
        let escapedParticles = 0;
        let maxDoseInVoxel = 0;

        // Simulasi N Partikel
        for(let n=0; n<numParticles; n++) {
            let E = E0;
            // Posisi Tembak: Dari bidang X-Y, menembak ke arah Z negatif (masuk ke phantom)
            let pos = new THREE.Vector3(
                (Math.random() - 0.5) * 15, // Sebaran berkas di sumbu X
                (Math.random() - 0.5) * 15, // Sebaran berkas di sumbu Y
                halfSize // Mulai dari tepi terluar Z
            );
            
            // Vektor Arah Awal (U, V, W dalam MCNP)
            let dir = new THREE.Vector3(
                (Math.random() - 0.5) * 0.1, 
                (Math.random() - 0.5) * 0.1, 
                -1.0
            ).normalize();

            let trackPoints = [pos.clone()];
            const stepSize = 1.0; // Panjang langkah (Mean Free Path aproksimasi)

            while(E > 0.05) { // Cut-off energy
                // 1. Move Particle
                pos.add(dir.clone().multiplyScalar(stepSize));
                trackPoints.push(pos.clone());

                // Cek apakah keluar dari phantom (Escape)
                if (pos.x < -halfSize || pos.x > halfSize || pos.y < -halfSize || pos.y > halfSize || pos.z < -halfSize || pos.z > halfSize) {
                    escapedParticles++;
                    break; 
                }

                // 2. Hamburan (Scattering)
                // Semakin rendah energi, sudut hamburan makin liar (Compton/Photoelectric)
                let scatterAngle = (scatterCrossSection * rho) / (E * 10);
                dir.x += (Math.random() - 0.5) * scatterAngle;
                dir.y += (Math.random() - 0.5) * scatterAngle;
                dir.z += (Math.random() - 0.5) * scatterAngle;
                dir.normalize();

                // 3. Deposisi Energi (Stopping Power aproksimasi)
                // dE/dx naik saat energi turun (Bragg Peak effect)
                let dE = (rho * 0.1) + (rho * 0.1) / E;
                if (dE > E) dE = E;
                E -= dE;
                totalDose += dE;

                // 4. Catat Dosis di Voxel
                let vIdx = getVoxelIndex(pos.x, pos.y, pos.z);
                if(vIdx !== -1) {
                    voxelData[vIdx] += dE;
                    if (voxelData[vIdx] > maxDoseInVoxel) maxDoseInVoxel = voxelData[vIdx];
                }
            }

            // Simpan track untuk dirender
            const tGeo = new THREE.BufferGeometry().setFromPoints(trackPoints);
            const tMat = new THREE.LineBasicMaterial({ color: 0x8888ff, transparent: true, opacity: 0.3 });
            const tLine = new THREE.Line(tGeo, tMat);
            tracksGroup.add(tLine);
            particleTracksData.push(trackPoints);
        }

        // UPDATE WARNA VOXEL (HEATMAP DOSIMETRI)
        let colorIdx = 0;
        for(let k=0; k<gridSize; k++) {
            for(let j=0; j<gridSize; j++) {
                for(let i=0; i<gridSize; i++) {
                    let dose = voxelData[colorIdx];
                    
                    if (dose > 0) {
                        // Normalisasi dosis 0.0 - 1.0 terhadap max dose
                        let normDose = dose / maxDoseInVoxel;
                        
                        // Color Mapping: Cyan (Rendah) -> Hijau -> Kuning -> Merah (Tinggi)
                        let hue = 0.5 - (normDose * 0.5); // 0.5 = Cyan, 0.0 = Merah
                        let lightness = 0.1 + (normDose * 0.6); // Makin tinggi dosis makin menyala
                        colorDummy.setHSL(hue, 1.0, lightness);
                    } else {
                        colorDummy.setHex(0x000000); // Gelap gulita
                    }
                    
                    voxelMesh.setColorAt(colorIdx, colorDummy);
                    colorIdx++;
                }
            }
        }
        voxelMesh.instanceColor.needsUpdate = true;

        // Update HUD
        hudDose.innerText = totalDose.toFixed(1) + " MeV";
        hudEscape.innerText = escapedParticles + " / " + numParticles;
    }

    // 7. EVENT LISTENER UI
    function updateLabels() {
        document.getElementById('val-e').innerText = parseFloat(eSlider.value).toFixed(1) + " MeV";
        document.getElementById('val-rho').innerText = parseFloat(rhoSlider.value).toFixed(1) + " g/cm³";
        
        let sc = parseInt(scatterSlider.value);
        document.getElementById('val-scatter').innerText = sc < 4 ? "Rendah (Air)" : (sc > 7 ? "Tinggi (Pb/Timbal)" : "Medium");
    }
    
    [eSlider, rhoSlider, scatterSlider].forEach(s => s.addEventListener('input', updateLabels));
    updateLabels();

    document.getElementById('btn-run').addEventListener('click', runMonteCarloTally);

    // Fitur Potongan Melintang (Slicing) - Untuk melihat bagian dalam Voxel
    let isSliced = false;
    const btnSlice = document.getElementById('btn-slice');
    btnSlice.addEventListener('click', () => {
        isSliced = !isSliced;
        btnSlice.style.background = isSliced ? 'rgba(255, 221, 0, 0.5)' : 'rgba(255, 221, 0, 0.2)';
        btnSlice.innerHTML = isSliced ? '🔪 KEMBALIKAN UTUH' : '🔪 POTONGAN MELINTANG';
        
        let idx = 0;
        for(let k=0; k<gridSize; k++) {
            for(let j=0; j<gridSize; j++) {
                for(let i=0; i<gridSize; i++) {
                    // Jika di-slice, sembunyikan setengah bagian (sumbu X positif)
                    if (isSliced && i >= gridSize/2) {
                        dummy.scale.set(0,0,0);
                    } else {
                        dummy.scale.set(1,1,1);
                    }
                    
                    let px = (i * voxelSize) - halfSize + (voxelSize/2);
                    let py = (j * voxelSize) - halfSize + (voxelSize/2);
                    let pz = (k * voxelSize) - halfSize + (voxelSize/2);
                    dummy.position.set(px, py, pz);
                    dummy.updateMatrix();
                    voxelMesh.setMatrixAt(idx, dummy.matrix);
                    idx++;
                }
            }
        }
        voxelMesh.instanceMatrix.needsUpdate = true;
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
        container.style.border = isFs ? 'none' : '1px solid rgba(0, 243, 255, 0.2)';
        setTimeout(() => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
            composer.setSize(container.clientWidth, container.clientHeight);
        }, 100);
    });

    // Inisialisasi awal agar kanvas tidak kosong
    runMonteCarloTally();

    // 8. ANIMATION LOOP
    function animate() {
        requestAnimationFrame(animate);
        
        // Memutar kotak phantom secara perlahan untuk presentasi visual
        phantomMesh.rotation.y += 0.002;
        tracksGroup.rotation.y = phantomMesh.rotation.y; // Track mengikuti putaran
        
        // Memutar seluruh Voxel Grid (agak rumit karena InstancedMesh, 
        // tapi kita bisa membungkusnya atau memutar koordinat kameranya.
        // Di sini kita putar posisinya dengan merotasi container dummy jika diperlukan, 
        // namun untuk efisiensi, OrbitControls (drag mouse) adalah cara utama menginspeksi.
        
        controls.update(); 
        composer.render(); 
    }
    animate();

  } catch (err) { console.error('Module script error:', err); }
})();