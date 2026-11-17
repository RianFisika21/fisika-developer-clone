// Auto-generated module #09
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Inti Three.js & Post-Processing -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>VR Akselerator Partikel</h3>\r\n    \r\n    <div class="input-group">\r\n      <label>Kecepatan Berkas (v) <span id="val-v" class="value-display">0.8 c</span></label>\r\n      <input type="range" id="v-slider" min="0.0" max="2.0" step="0.1" value="0.8">\r\n    </div>\r\n    \r\n    <div class="input-group">\r\n      <label>Densitas Partikel (ρ) <span id="val-rho" class="value-display">Tinggi</span></label>\r\n      <input type="range" id="rho-slider" min="500" max="3000" step="100" value="2000">\r\n    </div>\r\n\r\n    <div style="background: rgba(0, 255, 170, 0.1); border-left: 3px solid #00ffaa; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>MODE VIRTUAL REALITY:</strong><br>\r\n        Buka di HP, klik tombol <b>📱 GYRO</b>, lalu putar HP Anda ke segala arah untuk melihat sekeliling ruang vakum!\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="vr-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 255, 170, 0.2); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n    \r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 8px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-gyro" style="background: rgba(0, 255, 170, 0.2); border: 1px solid #00ffaa; color: #fff; padding: 10px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 12px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px); box-shadow: 0 0 10px rgba(0,255,170,0.3);">\r\n        📱 GYRO: OFF\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Data Telemetri -->\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.7); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(0, 255, 170, 0.4);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00ffaa; letter-spacing: 1px;">TELEMETRI SENSOR (PITCH / YAW / ROLL)</div>\r\n      <div id="hud-sensor" style="font-family: \'Orbitron\', monospace; font-size: 14px; color: #fff; margin-top: 5px;">0° / 0° / 0°</div>\r\n    </div>\r\n    \r\n    <!-- Crosshair di tengah layar -->\r\n    <div style="position: absolute; top: 50%; left: 50%; width: 10px; height: 10px; border: 2px solid rgba(0, 255, 170, 0.5); border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none;"></div>\r\n  </div>\r\n</div>';
  // Inline script #7
  try {

    const container = document.getElementById('vr-canvas-container');
    
    // 1. SCENE & KAMERA (Sudut pandang lebih lebar untuk efek VR)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020205);
    scene.fog = new THREE.FogExp2(0x020205, 0.0015); // Kabut pekat di kejauhan

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 2000);
    camera.position.set(0, 0, 0); // Kamera diam di titik 0 (First Person)

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 2. POST-PROCESSING (BLOOM UNTUK EFEK CAHAYA KECEPATAN TINGGI)
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 2.0, 0.5, 0.7);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 3. MEMBANGUN LINGKUNGAN (TEROWONGAN AKSELERATOR)
    // Silinder raksasa sebagai dinding ruang vakum
    const tunnelGeo = new THREE.CylinderGeometry(40, 40, 1000, 32, 32, true);
    tunnelGeo.rotateX(Math.PI / 2); // Membujur ke arah Z
    
    const tunnelMat = new THREE.MeshBasicMaterial({ 
        color: 0x0044aa, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.15 
    });
    const tunnel = new THREE.Mesh(tunnelGeo, tunnelMat);
    scene.add(tunnel);

    // 4. MEMBANGUN PARTIKEL RADIASI (WARP STARS)
    const maxParticles = 3000;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(maxParticles * 3);
    
    // Sebar partikel di sepanjang terowongan (Z = -1000 hingga 100)
    for(let i = 0; i < maxParticles; i++) {
        particlePos[i*3] = (Math.random() - 0.5) * 70; // X spread (dalam terowongan)
        particlePos[i*3+1] = (Math.random() - 0.5) * 70; // Y spread
        particlePos[i*3+2] = (Math.random() * -1000) + 100; // Z spread (depan hingga belakang kamera)
    }
    
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    
    // Partikel menyala bergantian warna cyan dan pink
    const particleMat = new THREE.PointsMaterial({ 
        color: 0x00ffaa, 
        size: 1.2, 
        transparent: true,
        blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. KONTROL KAMERA (ORBIT VS GYROSCOPE)
    let orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.05;
    orbitControls.enableZoom = false; // Zoom dimatikan untuk menjaga ilusi VR
    orbitControls.enablePan = false;

    let gyroControls = null;
    let useGyro = false;
    const btnGyro = document.getElementById('btn-gyro');

    btnGyro.addEventListener('click', () => {
        if (!useGyro) {
            // Meminta izin sensor di browser modern (Wajib untuk iOS 13+)
            if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission().then(permissionState => {
                    if (permissionState === 'granted') {
                        aktifkanGyro();
                    } else {
                        alert("Izin sensor Gyroscope ditolak oleh browser. Buka pengaturan situs untuk mengizinkan.");
                    }
                }).catch(console.error);
            } else {
                // Untuk Android / Browser Lama yang tidak butuh fungsi requestPermission()
                aktifkanGyro();
            }
        } else {
            matikanGyro();
        }
    });

    function aktifkanGyro() {
        useGyro = true;
        orbitControls.enabled = false;
        if (!gyroControls) gyroControls = new THREE.DeviceOrientationControls(camera);
        btnGyro.innerHTML = '📱 GYRO: AKTIF';
        btnGyro.style.background = 'rgba(0, 255, 170, 0.5)';
        btnGyro.style.color = '#000';
    }

    function matikanGyro() {
        useGyro = false;
        orbitControls.enabled = true;
        if (gyroControls) gyroControls.dispose();
        gyroControls = null;
        camera.rotation.set(0,0,0); // Reset rotasi
        btnGyro.innerHTML = '📱 GYRO: OFF';
        btnGyro.style.background = 'rgba(0, 255, 170, 0.2)';
        btnGyro.style.color = '#fff';
    }

    // 6. LOGIKA UI & FULLSCREEN
    const vSlider = document.getElementById('v-slider');
    const rhoSlider = document.getElementById('rho-slider');
    const visWrapper = document.getElementById('vis-panel-wrapper');
    const btnFullscreen = document.getElementById('btn-fullscreen');
    const hudSensor = document.getElementById('hud-sensor');

    vSlider.addEventListener('input', () => {
        document.getElementById('val-v').innerText = parseFloat(vSlider.value).toFixed(1) + " c";
    });

    rhoSlider.addEventListener('input', () => {
        let rho = parseInt(rhoSlider.value);
        let label = rho < 1000 ? "Rendah" : (rho > 2000 ? "Ekstrem" : "Tinggi");
        document.getElementById('val-rho').innerText = label;
        // Mengubah jumlah partikel yang dirender secara real-time
        particles.geometry.setDrawRange(0, rho); 
    });

    btnFullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) visWrapper.requestFullscreen?.() || visWrapper.webkitRequestFullscreen?.();
        else document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    });

    document.addEventListener('fullscreenchange', () => {
        const isFs = document.fullscreenElement;
        btnFullscreen.innerHTML = isFs ? '✖ EXIT' : '[ ] FULLSCREEN';
        container.style.height = isFs ? '100vh' : '450px';
        container.style.borderRadius = isFs ? '0' : '10px';
        container.style.border = isFs ? 'none' : '1px solid rgba(0, 255, 170, 0.2)';
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
        
        // Memperbarui orientasi kamera berdasarkan mode yang aktif
        if (useGyro && gyroControls) {
            gyroControls.update();
        } else {
            orbitControls.update();
        }

        // Tampilkan Data Telemetri Sudut (Konversi Radian ke Derajat)
        let pitch = (camera.rotation.x * 180 / Math.PI).toFixed(0);
        let yaw   = (camera.rotation.y * 180 / Math.PI).toFixed(0);
        let roll  = (camera.rotation.z * 180 / Math.PI).toFixed(0);
        hudSensor.innerText = `${pitch}° / ${yaw}° / ${roll}°`;

        // Logika Fisika: Menggerakkan partikel mendekati kamera untuk efek Kecepatan Relativistik (Warp Speed)
        const speed = parseFloat(vSlider.value) * 15.0; // Faktor pengali kecepatan
        if (speed > 0) {
            const positions = particles.geometry.attributes.position.array;
            const drawRange = parseInt(rhoSlider.value);
            
            for(let i = 0; i < drawRange; i++) {
                // Majukan Z partikel
                positions[i*3 + 2] += speed;
                
                // Jika partikel lewat di belakang punggung kamera (Z > 50), lempar kembali jauh ke depan terowongan (Z = -1000)
                if (positions[i*3 + 2] > 50) {
                    positions[i*3 + 2] -= 1050; 
                    // Acak ulang posisi X dan Y agar pola tidak berulang
                    positions[i*3] = (Math.random() - 0.5) * 70;
                    positions[i*3+1] = (Math.random() - 0.5) * 70;
                }
            }
            particles.geometry.attributes.position.needsUpdate = true;
            
            // Efek perubahan warna partikel akibat efek Doppler saat kecepatan dinaikkan
            // Makin cepat (mendekati c), warna bergeser dari hijau ke merah muda/biru
            if (speed > 15) {
                particleMat.color.setHSL(0.8, 1.0, 0.6); // Pink
            } else {
                particleMat.color.setHSL(0.4, 1.0, 0.5); // Hijau/Cyan
            }
        }
        
        // Memutar kawat terowongan perlahan
        tunnel.rotation.y += 0.002;

        composer.render(); 
    }
    animate();

  } catch (err) { console.error('Module script error:', err); }
})();