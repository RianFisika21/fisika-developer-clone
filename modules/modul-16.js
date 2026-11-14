// Auto-generated module #16
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js Lengkap & Post-Processing -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Detektor Sintilasi PMT 3D</h3>\r\n    \r\n    <div class="input-group">\r\n      <label>Energi Gamma Masuk (E) <span id="val-e" class="value-display">662 keV (Cs-137)</span></label>\r\n      <input type="range" id="e-slider" min="100" max="1500" step="10" value="662">\r\n    </div>\r\n    \r\n    <div class="input-group">\r\n      <label>Tegangan PMT (High Voltage) <span id="val-hv" class="value-display">1000 V</span></label>\r\n      <input type="range" id="hv-slider" min="500" max="1500" step="50" value="1000">\r\n    </div>\r\n\r\n    <div style="background: rgba(0, 243, 255, 0.1); border-left: 3px solid #00f3ff; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>EFEK AVALANCHE:</strong><br>\r\n        Tegangan PMT mempercepat elektron. Setiap tabrakan pada Dynode menggandakan jumlah elektron secara eksponensial.\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="pmt-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.3); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n    \r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; transition: 0.3s;">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-fire" style="background: rgba(255, 0, 85, 0.2); border: 1px solid #ff0055; color: #fff; padding: 10px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 12px; cursor: pointer; font-weight: bold; transition: 0.3s; box-shadow: 0 0 10px rgba(255,0,85,0.4);">\r\n        ☢️ TEMBAK GAMMA\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Osiloskop Sinyal -->\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.7); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.5);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00ffaa; letter-spacing: 1px;">SINYAL KELUARAN ANODA</div>\r\n      <div id="hud-signal" style="font-family: \'Orbitron\', monospace; font-size: 20px; color: #fff; font-weight: bold; margin-bottom: 5px; text-shadow: 0 0 8px #00ffaa;">0.0 mV</div>\r\n      \r\n      <!-- Mini Osiloskop Bar -->\r\n      <div style="width: 150px; height: 10px; background: #112; border: 1px solid #334; border-radius: 5px; overflow: hidden; margin-top: 5px;">\r\n        <div id="signal-bar" style="width: 0%; height: 100%; background: #00ffaa; transition: width 0.1s ease-out;"></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {
//<![CDATA[

    const container = document.getElementById('pmt-canvas-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020305);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 30, 80); 

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.05;
    controls.target.set(10, 0, 0);

    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.8, 0.4, 0.85);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene); composer.addPass(bloomPass);

    scene.add(new THREE.AmbientLight(0x222222));
    const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
    pointLight.position.set(0, 20, 20); scene.add(pointLight);

    // ==========================================
    // 1. MEMBANGUN GEOMETRI DETEKTOR & PMT
    // ==========================================
    const detectorGroup = new THREE.Group();
    scene.add(detectorGroup);

    // A. Kristal NaI(Tl) - Tempat Sintilasi
    const crystalGeo = new THREE.CylinderGeometry(8, 8, 15, 32);
    crystalGeo.rotateZ(Math.PI / 2); // Rebahkan sejajar sumbu X
    const crystalMat = new THREE.MeshPhysicalMaterial({ 
        color: 0x22aaff, transparent: true, opacity: 0.25, 
        metalness: 0.1, roughness: 0.1, transmission: 0.9, side: THREE.DoubleSide
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    crystal.position.x = -25;
    detectorGroup.add(crystal);

    // B. Fotokatoda (Lapisan pengubah cahaya -> elektron)
    const cathodeGeo = new THREE.CylinderGeometry(8, 8, 0.5, 32);
    cathodeGeo.rotateZ(Math.PI / 2);
    const cathodeMat = new THREE.MeshStandardMaterial({ color: 0xffaa00, metalness: 0.8, roughness: 0.4 });
    const cathode = new THREE.Mesh(cathodeGeo, cathodeMat);
    cathode.position.x = -17.25;
    detectorGroup.add(cathode);

    // C. Susunan Dynode (Pelat zig-zag)
    const dynodes = [];
    const numDynodes = 8;
    const dynodeGeo = new THREE.CylinderGeometry(4, 4, 10, 16, 1, false, 0, Math.PI); // Setengah tabung melengkung
    const dynodeMat = new THREE.MeshStandardMaterial({ color: 0x8899aa, metalness: 1.0, roughness: 0.2, side: THREE.DoubleSide });
    
    // Posisi target setiap dynode
    const dynodePositions = [];

    for (let i = 0; i < numDynodes; i++) {
        let dynMesh = new THREE.Mesh(dynodeGeo, dynodeMat);
        let px = -12 + (i * 6);
        let py = (i % 2 === 0) ? 4 : -4; // Zig-zag atas bawah
        
        dynMesh.position.set(px, py, 0);
        // Putar agar lengkungannya menangkap elektron dari dynode sebelumnya
        dynMesh.rotation.x = Math.PI / 2;
        dynMesh.rotation.z = (i % 2 === 0) ? -Math.PI/6 : Math.PI + Math.PI/6;
        
        detectorGroup.add(dynMesh);
        dynodes.push(dynMesh);
        
        // Simpan titik tumbukan tengah (fokus) untuk target partikel
        dynodePositions.push(new THREE.Vector3(px, py, 0));
    }

    // D. Anoda (Pengumpul elektron terakhir)
    const anodeGeo = new THREE.BoxGeometry(2, 10, 10);
    const anodeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9 });
    const anode = new THREE.Mesh(anodeGeo, anodeMat);
    let anodeX = -12 + (numDynodes * 6);
    anode.position.set(anodeX, 0, 0);
    detectorGroup.add(anode);
    dynodePositions.push(new THREE.Vector3(anodeX, 0, 0)); // Tambahkan anoda sebagai target terakhir

    // Cangkang Tabung Vakum Kaca
    const tubeGeo = new THREE.CylinderGeometry(8.5, 8.5, (numDynodes * 6) + 10, 32);
    tubeGeo.rotateZ(Math.PI / 2);
    const tubeMat = new THREE.MeshBasicMaterial({ color: 0x445566, transparent: true, opacity: 0.1, wireframe: true });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    tube.position.x = -12 + ((numDynodes * 6) / 2) - 3;
    detectorGroup.add(tube);


    // ==========================================
    // 2. SISTEM PARTIKEL (GAMMA, SINTILASI, ELEKTRON)
    // ==========================================
    
    // Partikel Sinar Gamma (Satu titik hijau/putih)
    const gammaMesh = new THREE.Mesh(new THREE.SphereGeometry(0.8, 8, 8), new THREE.MeshBasicMaterial({ color: 0x00ffaa }));
    gammaMesh.visible = false;
    scene.add(gammaMesh);

    const gammaTrail = new THREE.Group();
    scene.add(gammaTrail);

    // Cahaya Sintilasi (Kedipan Biru di dalam kristal)
    const scintLight = new THREE.PointLight(0x0088ff, 0, 30);
    scintLight.position.set(-25, 0, 0);
    scene.add(scintLight);

    // Badai Elektron (InstancedMesh untuk performa)
    const maxElectrons = 3000;
    const electronGeo = new THREE.SphereGeometry(0.3, 4, 4);
    const electronMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
    const electronMesh = new THREE.InstancedMesh(electronGeo, electronMat, maxElectrons);
    electronMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(electronMesh);

    let activeElectrons = [];
    let dummy = new THREE.Object3D();

    // ==========================================
    // 3. LOGIKA STATE MACHINE & UI
    // ==========================================
    const eSlider = document.getElementById('e-slider');
    const hvSlider = document.getElementById('hv-slider');
    const hudSignal = document.getElementById('hud-signal');
    const signalBar = document.getElementById('signal-bar');
    
    let animState = 0; // 0: Idle, 1: Gamma masuk, 2: Scintillation & Avalanche
    let gammaPos = -50;
    let avalancheTimer = 0;
    
    eSlider.addEventListener('input', () => {
        let E = parseInt(eSlider.value);
        let iso = E < 200 ? "(Tc-99m)" : (E < 800 ? "(Cs-137)" : "(Co-60)");
        document.getElementById('val-e').innerText = `${E} keV ${iso}`;
    });

    hvSlider.addEventListener('input', () => {
        document.getElementById('val-hv').innerText = hvSlider.value + " V";
    });

    document.getElementById('btn-fire').addEventListener('click', () => {
        if (animState === 0) {
            // Mulai Tembakan
            animState = 1;
            gammaPos = -60;
            gammaMesh.visible = true;
            gammaMesh.position.set(gammaPos, 0, 0);
            
            // Bersihkan jejak lama
            while(gammaTrail.children.length > 0) gammaTrail.remove(gammaTrail.children[0]);
            
            // Matikan sinyal
            hudSignal.innerText = "0.0 mV";
            signalBar.style.width = "0%";
            signalBar.style.background = "#00ffaa";
        }
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

    // ==========================================
    // 4. ANIMATION LOOP
    // ==========================================
    
    // Fungsi bantuan untuk menembakkan sekelompok elektron dari titik A ke titik target B
    function spawnElectrons(count, startPos, targetIdx, speed) {
        for(let i=0; i<count; i++) {
            if (activeElectrons.length < maxElectrons) {
                activeElectrons.push({
                    pos: startPos.clone().add(new THREE.Vector3((Math.random()-0.5), (Math.random()-0.5), (Math.random()-0.5))),
                    targetIdx: targetIdx,
                    speed: speed * (0.8 + Math.random() * 0.4), // Sedikit variasi kecepatan
                    active: true
                });
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        
        let E = parseInt(eSlider.value);
        let HV = parseInt(hvSlider.value);

        // STATE 1: Sinar Gamma Meluncur
        if (animState === 1) {
            gammaPos += 2.0; // Kecepatan gamma
            gammaMesh.position.x = gammaPos;
            
            // Bikin ekor hijau
            let dot = new THREE.Mesh(new THREE.SphereGeometry(0.3, 4, 4), new THREE.MeshBasicMaterial({ color: 0x00ffaa, transparent: true, opacity: 0.5 }));
            dot.position.copy(gammaMesh.position);
            gammaTrail.add(dot);
            
            // Jika menabrak kristal (X = -25)
            if (gammaPos >= -25) {
                animState = 2;
                gammaMesh.visible = false;
                
                // Sintilasi (Kedipan Biru) - Intensitas tergantung Energi Gamma
                scintLight.intensity = (E / 1500) * 8.0;
                
                // Spawn foto-elektron pertama di fotokatoda
                // Jumlah awal berbanding lurus dengan energi
                let initialPhotoElectrons = Math.floor(E / 50) + 1; 
                let eSpeed = (HV / 1500) * 1.5; // Kecepatan lari elektron berbanding lurus dengan HV
                spawnElectrons(initialPhotoElectrons, cathode.position, 0, eSpeed);
            }
        }

        // STATE 2: Scintillation Fading & Avalanche
        if (animState === 2) {
            // Meredupkan lampu sintilasi perlahan
            if (scintLight.intensity > 0) scintLight.intensity -= 0.2;
            
            // Proses pergerakan elektron
            let electronsReachedAnode = 0;
            let currentMultFactor = (HV / 1000) * 2.5; // Faktor penggandaan (gain) tiap dynode
            
            for (let i = activeElectrons.length - 1; i >= 0; i--) {
                let p = activeElectrons[i];
                if (!p.active) continue;
                
                let targetPos = dynodePositions[p.targetIdx];
                let dir = new THREE.Vector3().subVectors(targetPos, p.pos);
                let dist = dir.length();
                
                // Bergerak menuju target
                dir.normalize().multiplyScalar(p.speed);
                p.pos.add(dir);
                
                // Jika sudah menabrak target dynode/anoda
                if (dist < p.speed) {
                    p.active = false;
                    
                    // Jika menabrak Dynode (bukan Anoda terakhir)
                    if (p.targetIdx < dynodePositions.length - 1) {
                        // GANDAKAN ELEKTRON! (Spawn elektron baru menuju dynode berikutnya)
                        // Jumlah spawn tergantung voltase (gain)
                        spawnElectrons(currentMultFactor, p.pos, p.targetIdx + 1, p.speed);
                    } else {
                        // Menabrak ANODA (Terbaca sebagai sinyal)
                        electronsReachedAnode++;
                    }
                    
                    // Hapus elektron lama dari memori (array)
                    activeElectrons.splice(i, 1);
                }
            }

            // Jika ada elektron yang nabrak anoda di frame ini, spike sinyal
            if (electronsReachedAnode > 0) {
                // Konversi fiktif elektron ke mV sinyal
                let signal_mV = electronsReachedAnode * 12.5; 
                hudSignal.innerText = signal_mV.toFixed(1) + " mV";
                
                // Update Bar Grafis
                let barPercent = Math.min(100, (signal_mV / 1000) * 100);
                signalBar.style.width = barPercent + "%";
                
                // Efek visual overload (Warna bar jadi merah muda kalau sinyal terlalu besar)
                if(barPercent > 80) {
                    signalBar.style.background = "#ff0055";
                    hudSignal.style.color = "#ff0055";
                    hudSignal.style.textShadow = "0 0 10px #ff0055";
                } else {
                    signalBar.style.background = "#00ffaa";
                    hudSignal.style.color = "#fff";
                    hudSignal.style.textShadow = "0 0 10px #00ffaa";
                }
            } else if (activeElectrons.length === 0 && scintLight.intensity <= 0) {
                // Semua elektron habis dan lampu redup = Idle
                animState = 0;
            }
        }

        // Render partikel elektron ke layar via InstancedMesh
        electronMesh.count = activeElectrons.length;
        for (let i = 0; i < activeElectrons.length; i++) {
            dummy.position.copy(activeElectrons[i].pos);
            dummy.updateMatrix();
            electronMesh.setMatrixAt(i, dummy.matrix);
        }
        electronMesh.instanceMatrix.needsUpdate = true;

        controls.update(); 
        composer.render(); 
    }
    animate();

//]]>
  } catch (err) { console.error('Module script error:', err); }
})();