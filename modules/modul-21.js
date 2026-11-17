// Auto-generated module #21
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js Lengkap & Post-Processing (Bloom) -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Terowongan Angin Von Kármán</h3>\r\n\r\n    <div class="input-group">\r\n      <label>Geometri Benda Uji</label>\r\n      <select id="shape-select" style="width: 100%; padding: 8px; background: #0a0f18; color: #00f3ff; border: 1px solid rgba(0, 243, 255, 0.4); border-radius: 5px; font-family: \'Rajdhani\', sans-serif; font-weight: bold; font-size: 13px; cursor: pointer;">\r\n        <option value="cylinder">🛢️ Silinder Melintang (Klasik)</option>\r\n        <option value="sphere">🔮 Bola Aerodinamis 3D</option>\r\n        <option value="airfoil">✈️ Sayap Airfoil NACA-0015</option>\r\n      </select>\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Kecepatan Aliran (U∞) <span id="val-speed" class="value-display">10.0 m/s</span></label>\r\n      <input type="range" id="speed-slider" min="2.0" max="24.0" step="0.5" value="10.0">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Viskositas Kinematik (ν) <span id="val-visc" class="value-display">0.25 cm²/s</span></label>\r\n      <input type="range" id="visc-slider" min="0.02" max="0.55" step="0.01" value="0.25">\r\n    </div>\r\n\r\n    <div style="background: rgba(0, 243, 255, 0.08); border-left: 3px solid #00f3ff; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>BILANGAN REYNOLDS (Re = U·D / ν):</strong><br>\r\n        Saat <b>Re</b> melewati ambang kritis, lapisan batas terlepas dan membentuk jalan pusaran <b>Magenta</b> (searah jarum jam) &amp; <b>Emas</b> (berlawanan).\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="wind-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.35); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n\r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-camera" style="background: rgba(0, 243, 255, 0.22); border: 1px solid #00f3ff; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🎥 AUTO-ROTATE: ON\r\n      </button>\r\n      <button id="btn-dye" style="background: rgba(255, 0, 85, 0.25); border: 1px solid #ff0055; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        💨 INJEKSI ASAP UJI\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Aerodinamika -->\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.78); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.5);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00f3ff; letter-spacing: 1px;">BILANGAN REYNOLDS &amp; REZIM ALIRAN</div>\r\n      <div id="hud-re" style="font-family: \'Orbitron\', monospace; font-size: 14px; color: #00ffaa; font-weight: bold; margin-bottom: 4px;">Re: 200 — KÁRMÁN VORTEX STREET</div>\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #ffdd00; letter-spacing: 1px;">FREKUENSI PUSARAN &amp; BILANGAN STROUHAL</div>\r\n      <div id="hud-st" style="font-family: \'Orbitron\', monospace; font-size: 13px; color: #fff;">f: 37.8 Hz | St: 0.189</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {
//<![CDATA[

    const container = document.getElementById('wind-canvas-container');
    const wrapper = document.getElementById('vis-panel-wrapper');

    // 1. SCENE & KAMERA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x03050a);
    scene.fog = new THREE.FogExp2(0x03050a, 0.0055);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(4, 24, 58);

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(6, 0, 0);

    // 2. POST-PROCESSING (BLOOM)
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.35, 0.45, 0.8);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 3. PENCAHAYAAN TEROWONGAN ANGIN
    scene.add(new THREE.AmbientLight(0x223344));
    const dirLight = new THREE.DirectionalLight(0xaaddff, 1.2);
    dirLight.position.set(-15, 30, 25);
    scene.add(dirLight);

    const backLight = new THREE.PointLight(0xff0055, 1.2, 70);
    backLight.position.set(18, 0, 0);
    scene.add(backLight);

    // 4. STRUKTUR RUANG UJI TEROWONGAN ANGIN (WIND TUNNEL DUCT)
    const tunnelLen = 82;
    const tunnelH = 28;
    const tunnelD = 22;
    const xStart = -36;
    const xEnd = xStart + tunnelLen;
    const obsX = -15;

    const ductGeo = new THREE.BoxGeometry(tunnelLen, tunnelH, tunnelD);
    const ductEdges = new THREE.LineSegments(
        new THREE.EdgesGeometry(ductGeo),
        new THREE.LineBasicMaterial({ color: 0x1b3b5a, transparent: true, opacity: 0.55 })
    );
    ductEdges.position.set(xStart + tunnelLen * 0.5, 0, 0);
    scene.add(ductEdges);

    const floorGrid = new THREE.GridHelper(tunnelLen, 28, 0x00f3ff, 0x0b1c2e);
    floorGrid.scale.z = tunnelD / tunnelLen;
    floorGrid.position.set(xStart + tunnelLen * 0.5, -tunnelH * 0.5, 0);
    scene.add(floorGrid);

    // 5. GEOMETRI OBJEK UJI (SILINDER, BOLA, AIRFOIL NACA)
    const obstacleGroup = new THREE.Group();
    obstacleGroup.position.set(obsX, 0, 0);
    scene.add(obstacleGroup);

    const obsMat = new THREE.MeshStandardMaterial({
        color: 0x3b4d63,
        emissive: 0x071a2c,
        metalness: 0.85,
        roughness: 0.22
    });

    // A. Silinder
    const cylGeo = new THREE.CylinderGeometry(2.3, 2.3, tunnelD - 1.0, 32);
    cylGeo.rotateX(Math.PI / 2);
    const cylMesh = new THREE.Mesh(cylGeo, obsMat);
    obstacleGroup.add(cylMesh);

    // B. Bola + Tiang Penyangga (Sting)
    const sphereGroup = new THREE.Group();
    const sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(2.7, 32, 24), obsMat);
    const stingGeo = new THREE.CylinderGeometry(0.28, 0.35, 13, 12);
    stingGeo.rotateX(Math.PI / 2);
    const stingMesh = new THREE.Mesh(stingGeo, obsMat);
    stingMesh.position.z = -6.5;
    sphereGroup.add(sphereMesh);
    sphereGroup.add(stingMesh);
    sphereGroup.visible = false;
    obstacleGroup.add(sphereGroup);

    // C. Sayap Airfoil NACA-0015
    const foilShape = new THREE.Shape();
    const chord = 7.2;
    const thick = 0.22;
    const foilPts = 36;
    foilShape.moveTo(-chord * 0.35, 0);
    for (let i = 1; i <= foilPts; i++) {
        const s = i / foilPts;
        const yt = 5.0 * thick * chord * (0.2969 * Math.sqrt(s) - 0.1260 * s - 0.3516 * s * s + 0.2843 * s * s * s - 0.1015 * s * s * s * s);
        foilShape.lineTo(-chord * 0.35 + s * chord, yt);
    }
    for (let i = foilPts - 1; i >= 0; i--) {
        const s = i / foilPts;
        const yt = 5.0 * thick * chord * (0.2969 * Math.sqrt(s) - 0.1260 * s - 0.3516 * s * s + 0.2843 * s * s * s - 0.1015 * s * s * s * s);
        foilShape.lineTo(-chord * 0.35 + s * chord, -yt);
    }
    const foilGeo = new THREE.ExtrudeGeometry(foilShape, { depth: tunnelD - 1.0, bevelEnabled: false });
    foilGeo.translate(0, 0, -(tunnelD - 1.0) * 0.5);
    const foilMesh = new THREE.Mesh(foilGeo, obsMat);
    foilMesh.rotation.z = -0.09; // Sudut serang 5 derajat
    foilMesh.visible = false;
    obstacleGroup.add(foilMesh);

    // 6. SISTEM 1.600 JEJAK FLUIDA (VELOCITY STREAKLINES)
    const numParticles = 1600;
    const pPos = new Float32Array(numParticles * 3);
    const linePos = new Float32Array(numParticles * 2 * 3);
    const lineColors = new Float32Array(numParticles * 2 * 3);

    const streakGeo = new THREE.BufferGeometry();
    streakGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    streakGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    const streakMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.88 });
    const streakMesh = new THREE.LineSegments(streakGeo, streakMat);
    scene.add(streakMesh);

    function resetParticle(idx, atInlet) {
        const i3 = idx * 3;
        pPos[i3] = atInlet ? (xStart + Math.random() * 2.5) : (xStart + Math.random() * tunnelLen);
        // Konsentrasikan sebagian partikel di dekat bidang tengah Y agar pusaran terlihat jelas
        const focus = Math.random() < 0.65 ? 0.52 : 1.0;
        pPos[i3 + 1] = (Math.random() - 0.5) * (tunnelH - 2.0) * focus;
        pPos[i3 + 2] = (Math.random() - 0.5) * (tunnelD - 2.0);
    }

    for (let i = 0; i < numParticles; i++) {
        resetParticle(i, false);
    }

    // 7. PARAMETER FISIKA AERODINAMIKA & UI
    const shapeSelect = document.getElementById('shape-select');
    const speedSlider = document.getElementById('speed-slider');
    const viscSlider = document.getElementById('visc-slider');
    const hudRe = document.getElementById('hud-re');
    const hudSt = document.getElementById('hud-st');

    let currentShape = 'cylinder';
    let reNumber = 200;
    let stNumber = 0.189;
    let shedFreqHz = 37.8;

    function updateAeroParams() {
        currentShape = shapeSelect.value;
        const U = parseFloat(speedSlider.value); // m/s
        const nuCm = parseFloat(viscSlider.value); // cm^2/s

        document.getElementById('val-speed').innerText = U.toFixed(1) + " m/s";
        document.getElementById('val-visc').innerText = nuCm.toFixed(2) + " cm²/s";

        cylMesh.visible = currentShape === 'cylinder';
        sphereGroup.visible = currentShape === 'sphere';
        foilMesh.visible = currentShape === 'airfoil';

        // Diameter karakteristik D = 5.0 cm = 0.05 m; nu = nuCm * 1e-4 m^2/s
        const dMeters = 0.05;
        const nuMeters = nuCm * 0.0001;
        reNumber = (U * dMeters) / nuMeters;

        const reCrit = currentShape === 'cylinder' ? 47.0 : (currentShape === 'sphere' ? 130.0 : 280.0);
        const stBase = currentShape === 'cylinder' ? 0.21 : (currentShape === 'sphere' ? 0.19 : 0.24);

        if (reNumber < reCrit) {
            stNumber = 0.0;
            shedFreqHz = 0.0;
            hudRe.innerText = `Re: ${Math.round(reNumber)} — ALIRAN LAMINER STABIL`;
            hudRe.style.color = "#00f3ff";
            hudSt.innerText = "f: 0.0 Hz | Tidak Ada Pelepasan Pusaran";
        } else {
            stNumber = stBase * Math.max(0.55, 1.0 - 19.7 / Math.max(reNumber, 30.0));
            shedFreqHz = (stNumber * U) / dMeters;
            if (reNumber < 1200) {
                hudRe.innerText = `Re: ${Math.round(reNumber)} — KÁRMÁN VORTEX STREET`;
                hudRe.style.color = "#00ffaa";
            } else {
                hudRe.innerText = `Re: ${Math.round(reNumber)} — WAKE PUSARAN TURBULEN`;
                hudRe.style.color = "#ffdd00";
            }
            hudSt.innerText = `f: ${shedFreqHz.toFixed(1)} Hz | St: ${stNumber.toFixed(3)}`;
        }
    }

    [shapeSelect, speedSlider, viscSlider].forEach(el => el.addEventListener('input', updateAeroParams));
    updateAeroParams();

    // 8. TOMBOL INJEKSI ASAP UJI, AUTO-ROTATE & FULLSCREEN
    document.getElementById('btn-dye').addEventListener('click', () => {
        // Konsentrasikan 600 partikel tepat di hulu objek uji untuk mengamati gulungan pusaran
        for (let i = 0; i < 600; i++) {
            const i3 = i * 3;
            pPos[i3] = obsX - 4.0 - Math.random() * 14.0;
            pPos[i3 + 1] = (Math.random() - 0.5) * 6.5;
            pPos[i3 + 2] = (Math.random() - 0.5) * (tunnelD - 4.0);
        }
    });

    let isAutoRotate = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.45;

    const btnCamera = document.getElementById('btn-camera');
    btnCamera.addEventListener('click', () => {
        isAutoRotate = !isAutoRotate;
        controls.autoRotate = isAutoRotate;
        btnCamera.innerHTML = isAutoRotate ? '🎥 AUTO-ROTATE: ON' : '🎥 AUTO-ROTATE: OFF';
        btnCamera.style.background = isAutoRotate ? 'rgba(0, 243, 255, 0.22)' : 'rgba(0, 243, 255, 0.08)';
    });

    document.getElementById('btn-fullscreen').addEventListener('click', () => {
        if (!document.fullscreenElement) wrapper.requestFullscreen?.() || wrapper.webkitRequestFullscreen?.();
        else document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    });

    document.addEventListener('fullscreenchange', () => {
        const isFs = document.fullscreenElement;
        document.getElementById('btn-fullscreen').innerHTML = isFs ? '✖ EXIT' : '[ ] FULLSCREEN';
        container.style.height = isFs ? '100vh' : '450px';
        setTimeout(() => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
            composer.setSize(container.clientWidth, container.clientHeight);
        }, 100);
    });

    // 9. SOLVER MEDAN KECEPATAN & ANIMATION LOOP
    const clock = new THREE.Clock();
    const colLaminar = new THREE.Color(0x00f3ff);
    const colFast = new THREE.Color(0x00ffaa);
    const colVortexCW = new THREE.Color(0xff0055);
    const colVortexCCW = new THREE.Color(0xffaa00);
    const tmpCol = new THREE.Color();

    function animate() {
        requestAnimationFrame(animate);
        const dt = Math.min(clock.getDelta(), 0.04);
        const elapsed = clock.getElapsedTime();

        const U = parseFloat(speedSlider.value);
        const uSim = 6.0 + (U / 24.0) * 18.0;

        const rEff = currentShape === 'cylinder' ? 2.35 : (currentShape === 'sphere' ? 2.75 : 1.45);
        const reCrit = currentShape === 'cylinder' ? 47.0 : (currentShape === 'sphere' ? 130.0 : 280.0);
        const shedStrength = reNumber > reCrit ? Math.tanh((reNumber - reCrit) / 40.0) : 0.0;

        // Frekuensi pelepasan pusaran visual agar gerakan pusaran terbaca jelas oleh mata
        const visFreq = (0.38 + (U / 24.0) * 1.15) * (currentShape === 'airfoil' ? 1.25 : 1.0);
        const uConvect = uSim * 0.78;
        const halfWave = (uConvect / visFreq) * 0.5;
        const phase = (elapsed * visFreq) % 1.0;

        const gammaBase = uSim * (currentShape === 'airfoil' ? 3.2 : 5.4) * shedStrength;
        const rowOffsetY = currentShape === 'airfoil' ? 0.95 : 1.45;
        const turbJitter = reNumber > 1200 ? Math.min(2.2, (reNumber - 1200) / 2500.0) : 0.0;

        for (let i = 0; i < numParticles; i++) {
            const i3 = i * 3;
            let x = pPos[i3];
            let y = pPos[i3 + 1];
            let z = pPos[i3 + 2];

            const dx = x - obsX;
            let u = uSim;
            let v = 0.0;
            let w = 0.0;
            let swirlMetric = 0.0;

            // A. Aliran Potensial di sekitar Benda Uji
            if (currentShape === 'sphere') {
                const r3dSq = dx * dx + y * y + z * z + 0.01;
                const r3d = Math.sqrt(r3dSq);
                if (r3d < rEff) {
                    const push = (rEff + 0.08) / r3d;
                    x = obsX + dx * push;
                    y *= push;
                    z *= push;
                } else {
                    const factor = Math.pow(rEff, 3) / (2.0 * r3dSq * r3dSq * r3d);
                    u += uSim * factor * (y * y + z * z - 2.0 * dx * dx);
                    v += -3.0 * uSim * factor * dx * y;
                    w += -3.0 * uSim * factor * dx * z;
                }
            } else {
                const effDx = currentShape === 'airfoil' ? dx * 0.65 : dx;
                const r2dSq = effDx * effDx + y * y + 0.01;
                const r2d = Math.sqrt(r2dSq);
                if (r2d < rEff) {
                    const push = (rEff + 0.08) / r2d;
                    x = obsX + (effDx * push) / (currentShape === 'airfoil' ? 0.65 : 1.0);
                    y *= push;
                } else {
                    const rEffSq = rEff * rEff;
                    const r4 = r2dSq * r2dSq;
                    u += -uSim * rEffSq * ((effDx * effDx - y * y) / r4);
                    v += -uSim * rEffSq * ((2.0 * effDx * y) / r4);
                    if (currentShape === 'airfoil' && dx > -2.5 && dx < 14.0) {
                        v -= 0.14 * uSim * Math.exp(-Math.abs(dx - 2.0) * 0.15) * Math.exp(-y * y * 0.08);
                    }
                }
            }

            // B. Defisit Kecepatan Wake & Deretan Pusaran Von Kármán di Hilir
            if (dx > 0.2) {
                const wakeWidth = 2.2 + dx * 0.055;
                const deficit = 0.34 * uSim * Math.exp(-(y * y) / (2.0 * wakeWidth * wakeWidth)) * Math.exp(-dx / 42.0) * (1.0 - Math.exp(-dx / 2.2));
                u -= deficit;

                if (shedStrength > 0.01) {
                    // Sedikit pergeseran fase spanwise (Z) pada Re tinggi atau bentuk bola
                    const zPhaseShift = currentShape === 'sphere' ? Math.sin(z * 0.35) * 0.35 : (turbJitter * Math.sin(z * 0.28) * 0.22);

                    for (let m = 0; m < 12; m++) {
                        const xVort = obsX + 1.6 + (m + phase + zPhaseShift) * halfWave;
                        const distFromObs = xVort - obsX;
                        if (distFromObs < 0.5 || xVort > xEnd + 5.0) continue;

                        const sign = (m % 2 === 0) ? 1.0 : -1.0;
                        const yVort = sign * rowOffsetY * (1.0 + distFromObs * 0.008);

                        const dvx = x - xVort;
                        const dvy = y - yVort;
                        const rvSq = dvx * dvx + dvy * dvy;

                        if (rvSq < 95.0) {
                            const rc = 1.45 + distFromObs * 0.032;
                            const rcSq = rc * rc;
                            const gamma = -sign * gammaBase * Math.min(1.0, distFromObs / 3.2) * Math.exp(-distFromObs / 68.0);
                            const gauss = 1.0 - Math.exp(-rvSq / rcSq);
                            const factor = (gamma / (rvSq + 0.18)) * gauss;

                            u += -factor * dvy;
                            v += factor * dvx;

                            if (currentShape === 'sphere') {
                                w += factor * dvy * Math.sin(z * 0.4) * 0.45;
                            }

                            const coreWeight = Math.exp(-rvSq / (rcSq * 1.4));
                            swirlMetric += -sign * coreWeight;
                        }
                    }
                }

                if (turbJitter > 0.01 && Math.abs(y) < 6.0) {
                    v += (Math.random() - 0.5) * turbJitter * uSim * 0.25;
                    w += (Math.random() - 0.5) * turbJitter * uSim * 0.25;
                }
            }

            // C. Integrasi Posisi Partikel
            x += u * dt;
            y += v * dt;
            z += w * dt;

            // Batas dinding terowongan angin
            const yLimit = tunnelH * 0.5 - 0.6;
            const zLimit = tunnelD * 0.5 - 0.6;
            if (y > yLimit) y = yLimit;
            if (y < -yLimit) y = -yLimit;
            if (z > zLimit) z = zLimit;
            if (z < -zLimit) z = -zLimit;

            if (x > xEnd || x < xStart - 1.0) {
                resetParticle(i, true);
                x = pPos[i3];
                y = pPos[i3 + 1];
                z = pPos[i3 + 2];
            } else {
                pPos[i3] = x;
                pPos[i3 + 1] = y;
                pPos[i3 + 2] = z;
            }

            // D. Render Garis Streakline & Pewarnaan Vortisitas
            const speedMag = Math.sqrt(u * u + v * v + w * w) + 0.001;
            const streakLen = Math.min(2.4, 0.45 + speedMag * 0.065);
            const invMag = streakLen / speedMag;

            const idx6 = i * 6;
            linePos[idx6] = x - u * invMag;
            linePos[idx6 + 1] = y - v * invMag;
            linePos[idx6 + 2] = z - w * invMag;
            linePos[idx6 + 3] = x;
            linePos[idx6 + 4] = y;
            linePos[idx6 + 5] = z;

            if (swirlMetric > 0.18) {
                tmpCol.lerpColors(colLaminar, colVortexCCW, Math.min(1.0, swirlMetric * 1.15));
            } else if (swirlMetric < -0.18) {
                tmpCol.lerpColors(colLaminar, colVortexCW, Math.min(1.0, -swirlMetric * 1.15));
            } else {
                const speedBoost = Math.max(0.0, Math.min(1.0, (speedMag - uSim) / (uSim * 0.45)));
                tmpCol.lerpColors(colLaminar, colFast, speedBoost);
            }

            // Ekor garis lebih redup daripada kepala garis untuk kesan arah aliran
            lineColors[idx6] = tmpCol.r * 0.25;
            lineColors[idx6 + 1] = tmpCol.g * 0.25;
            lineColors[idx6 + 2] = tmpCol.b * 0.25;
            lineColors[idx6 + 3] = tmpCol.r;
            lineColors[idx6 + 4] = tmpCol.g;
            lineColors[idx6 + 5] = tmpCol.b;
        }

        streakGeo.attributes.position.needsUpdate = true;
        streakGeo.attributes.color.needsUpdate = true;

        controls.update();
        composer.render();
    }
    animate();

//]]>
  } catch (err) { console.error('Module script error:', err); }
})();