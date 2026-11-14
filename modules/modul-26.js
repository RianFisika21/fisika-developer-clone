// Auto-generated module #26
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js Lengkap & Post-Processing (Bloom) -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Resonansi Akustik Pelat Chladni 3D</h3>\r\n\r\n    <div class="input-group">\r\n      <label>Mode Harmonik (n) <span id="val-n" class="value-display">3</span></label>\r\n      <input type="range" id="n-slider" min="1" max="7" step="1" value="3">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Mode Harmonik (m) <span id="val-m" class="value-display">5</span></label>\r\n      <input type="range" id="m-slider" min="1" max="7" step="1" value="5">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Simetri Superposisi Mode</label>\r\n      <select id="sym-select" style="width: 100%; padding: 8px; background: #0a0f18; color: #00f3ff; border: 1px solid rgba(0, 243, 255, 0.4); border-radius: 5px; font-family: \'Rajdhani\', sans-serif; font-weight: bold; font-size: 13px; cursor: pointer;">\r\n        <option value="-1">❄️ Antisimetris (cos n·cos m − cos m·cos n)</option>\r\n        <option value="1">💠 Simetris (cos n·cos m + cos m·cos n)</option>\r\n      </select>\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Amplitudo Eksitasi Driver <span id="val-amp" class="value-display">1.20 mm</span></label>\r\n      <input type="range" id="amp-slider" min="0.30" max="2.00" step="0.10" value="1.20">\r\n    </div>\r\n\r\n    <div style="background: rgba(0, 243, 255, 0.08); border-left: 3px solid #00f3ff; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>GARIS SIMPUL CHLADNI (W = 0):</strong><br>\r\n        Butiran pasir terpental dari zona <b>Magenta</b> (antinoda bergetar) dan terkunci di sepanjang garis <b>Cyan</b> (simpul stasioner). Aktifkan <b>AUDIO RESONANSI</b> untuk mendengar frekuensi eigen pelat!\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="chladni-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.35); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n\r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-camera" style="background: rgba(0, 243, 255, 0.22); border: 1px solid #00f3ff; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🎥 AUTO-ROTATE: ON\r\n      </button>\r\n      <button id="btn-audio" style="background: rgba(0, 255, 170, 0.14); border: 1px solid #00ffaa; color: #00ffaa; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🔊 AUDIO RESONANSI: OFF\r\n      </button>\r\n      <button id="btn-scatter" style="background: rgba(255, 221, 0, 0.22); border: 1px solid #ffdd00; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🧂 TABUR ULANG PASIR\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Akustik & Cymatics -->\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.78); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.5);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00f3ff; letter-spacing: 1px;">FREKUENSI EIGEN PELAT (f_nm)</div>\r\n      <div id="hud-freq" style="font-family: \'Orbitron\', monospace; font-size: 15px; color: #00ffaa; font-weight: bold; margin-bottom: 4px;">f₃₅: 1210.4 Hz | Mode (3, 5)</div>\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #ffdd00; letter-spacing: 1px;">AKUMULASI GARIS SIMPUL (NODAL LOCK)</div>\r\n      <div id="hud-lock" style="font-family: \'Orbitron\', monospace; font-size: 13px; color: #fff;">Terkunci di Simpul: 0.0% (5.500 Butir)</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {
//<![CDATA[

    const container = document.getElementById('chladni-canvas-container');
    const wrapper = document.getElementById('vis-panel-wrapper');

    // 1. SCENE & KAMERA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x03050a);
    scene.fog = new THREE.FogExp2(0x03050a, 0.0065);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 27, 29);

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, -0.5, 0);

    // 2. POST-PROCESSING (BLOOM)
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.35, 0.45, 0.8);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 3. PENCAHAYAAN & AKTUATOR GETARAN MEKANIS (DRIVER)
    scene.add(new THREE.AmbientLight(0x223344));
    const topLight = new THREE.DirectionalLight(0xaaddff, 1.1);
    topLight.position.set(15, 35, 20);
    scene.add(topLight);

    const floorGrid = new THREE.GridHelper(64, 24, 0x16324f, 0x091524);
    floorGrid.position.y = -6.5;
    scene.add(floorGrid);

    // Tiang Penggerak Akustik di Bawah Pusat Pelat
    const driverGroup = new THREE.Group();
    scene.add(driverGroup);

    const shaftMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.65, 0.85, 5.2, 20),
        new THREE.MeshStandardMaterial({ color: 0x3b4d63, metalness: 0.88, roughness: 0.22 })
    );
    shaftMesh.position.y = -2.8;
    driverGroup.add(shaftMesh);

    const basePodMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(3.6, 4.2, 1.2, 28),
        new THREE.MeshStandardMaterial({ color: 0x182433, emissive: 0x04182b, metalness: 0.8, roughness: 0.3 })
    );
    basePodMesh.position.y = -5.8;
    driverGroup.add(basePodMesh);

    const pulseRingGeo = new THREE.TorusGeometry(3.8, 0.1, 8, 48);
    pulseRingGeo.rotateX(Math.PI / 2);
    const pulseRingMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.75 });
    const pulseRing = new THREE.Mesh(pulseRingGeo, pulseRingMat);
    pulseRing.position.y = -5.15;
    driverGroup.add(pulseRing);

    // 4. PELAT ELASTIS CHLADNI 3D DENGAN SHADER DEFORMASI GELOMBANG BERDIRI
    const plateSize = 26.0;
    const halfPlate = plateSize * 0.5;
    const plateGeo = new THREE.PlaneGeometry(plateSize, plateSize, 110, 110);
    plateGeo.rotateX(-Math.PI / 2);

    const plateUniforms = {
        modeN: { value: 3.0 },
        modeM: { value: 5.0 },
        symSign: { value: -1.0 },
        amp: { value: 1.20 },
        oscPhase: { value: 1.0 }
    };

    const plateMat = new THREE.ShaderMaterial({
        uniforms: plateUniforms,
        side: THREE.DoubleSide,
        vertexShader: `
            uniform float modeN;
            uniform float modeM;
            uniform float symSign;
            uniform float amp;
            uniform float oscPhase;
            varying float vWave;
            varying vec2 vUvCoord;
            void main() {
                vec3 p = position;
                float u = (p.x + 13.0) / 26.0;
                float v = (p.z + 13.0) / 26.0;
                vUvCoord = vec2(u, v);

                float effSym = (abs(modeN - modeM) < 0.1) ? 1.0 : symSign;
                float pi = 3.14159265;
                float w = 0.5 * (cos(modeN * pi * u) * cos(modeM * pi * v) + effSym * cos(modeM * pi * u) * cos(modeN * pi * v));
                vWave = w;

                p.y += w * amp * 1.15 * oscPhase;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
            }
        `,
        fragmentShader: `
            varying float vWave;
            varying vec2 vUvCoord;
            void main() {
                float absW = abs(vWave);

                // Garis simpul bercahaya (nodal line W = 0)
                float nodalLine = 1.0 - smoothstep(0.0, 0.055, absW);

                // Kisi halus permukaan pelat logam
                float gridU = smoothstep(0.96, 1.0, cos(vUvCoord.x * 3.14159 * 24.0));
                float gridV = smoothstep(0.96, 1.0, cos(vUvCoord.y * 3.14159 * 24.0));
                float microGrid = max(gridU, gridV) * 0.12;

                // Warna pelat: dasar logam gelap -> magenta/violet di antinoda -> garis simpul cyan
                vec3 metalBase = vec3(0.04, 0.07, 0.12);
                vec3 antiPos = vec3(0.55, 0.04, 0.32);
                vec3 antiNeg = vec3(0.06, 0.25, 0.55);
                vec3 antiCol = vWave >= 0.0 ? antiPos : antiNeg;

                vec3 col = mix(metalBase, antiCol, smoothstep(0.05, 0.85, absW) * 0.65);
                col += vec3(0.0, 0.85, 1.0) * nodalLine * 0.55;
                col += vec3(0.15, 0.35, 0.55) * microGrid;

                gl_FragColor = vec4(col, 0.94);
            }
        `
    });

    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    scene.add(plateMesh);

    // Bingkai tepi pelat
    const borderPts = [
        new THREE.Vector3(-halfPlate, 0, -halfPlate),
        new THREE.Vector3(halfPlate, 0, -halfPlate),
        new THREE.Vector3(halfPlate, 0, halfPlate),
        new THREE.Vector3(-halfPlate, 0, halfPlate),
        new THREE.Vector3(-halfPlate, 0, -halfPlate)
    ];
    const borderLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(borderPts),
        new THREE.LineBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.65 })
    );
    scene.add(borderLine);

    // 5. 5.500 BUTIR PASIR CYMATICS (THREE.POINTS)
    const numGrains = 5500;
    const gPos = new Float32Array(numGrains * 3);
    const gVel = new Float32Array(numGrains * 3);
    const gColors = new Float32Array(numGrains * 3);

    const grainGeo = new THREE.BufferGeometry();
    grainGeo.setAttribute('position', new THREE.BufferAttribute(gPos, 3));
    grainGeo.setAttribute('color', new THREE.BufferAttribute(gColors, 3));

    const grainMat = new THREE.PointsMaterial({
        size: 0.24,
        vertexColors: true,
        transparent: true,
        opacity: 0.95
    });
    const grainPoints = new THREE.Points(grainGeo, grainMat);
    scene.add(grainPoints);

    function scatterSand() {
        for (let i = 0; i < numGrains; i++) {
            const i3 = i * 3;
            gPos[i3] = (Math.random() - 0.5) * (plateSize - 0.5);
            gPos[i3 + 1] = 0.25 + Math.random() * 1.4;
            gPos[i3 + 2] = (Math.random() - 0.5) * (plateSize - 0.5);

            gVel[i3] = (Math.random() - 0.5) * 1.5;
            gVel[i3 + 1] = Math.random() * 1.2;
            gVel[i3 + 2] = (Math.random() - 0.5) * 1.5;
        }
        grainGeo.attributes.position.needsUpdate = true;
    }

    // 6. EVALUASI FUNGSI GELOMBANG CHLADNI & FREKUENSI KIRCHHOFF-LOVE
    function evalChladni(u, v, n, m, sym) {
        const effSym = (n === m) ? 1.0 : sym;
        return 0.5 * (
            Math.cos(n * Math.PI * u) * Math.cos(m * Math.PI * v) +
            effSym * Math.cos(m * Math.PI * u) * Math.cos(n * Math.PI * v)
        );
    }

    const nSlider = document.getElementById('n-slider');
    const mSlider = document.getElementById('m-slider');
    const symSelect = document.getElementById('sym-select');
    const ampSlider = document.getElementById('amp-slider');
    const hudFreq = document.getElementById('hud-freq');
    const hudLock = document.getElementById('hud-lock');

    let currentFreqHz = 1210.4;

    // 7. SINTESIS SUARA AKUSTIK (WEB AUDIO API)
    let audioCtx = null;
    let mainOsc = null;
    let subOsc = null;
    let masterGain = null;
    let audioEnabled = false;

    function initOrUpdateAudio() {
        if (!audioEnabled) return;
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContextClass();

            mainOsc = audioCtx.createOscillator();
            subOsc = audioCtx.createOscillator();
            const subGain = audioCtx.createGain();
            masterGain = audioCtx.createGain();

            mainOsc.type = 'sine';
            subOsc.type = 'triangle';
            subGain.gain.value = 0.18;
            masterGain.gain.value = 0.0001;

            mainOsc.connect(masterGain);
            subOsc.connect(subGain);
            subGain.connect(masterGain);
            masterGain.connect(audioCtx.destination);

            mainOsc.start();
            subOsc.start();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const now = audioCtx.currentTime;
        const amp = parseFloat(ampSlider.value);
        mainOsc.frequency.setTargetAtTime(currentFreqHz, now, 0.03);
        subOsc.frequency.setTargetAtTime(currentFreqHz * 2.0, now, 0.03);
        masterGain.gain.setTargetAtTime(0.035 * amp, now, 0.05);
    }

    const btnAudio = document.getElementById('btn-audio');
    btnAudio.addEventListener('click', () => {
        audioEnabled = !audioEnabled;
        if (audioEnabled) {
            btnAudio.innerHTML = '🔊 AUDIO RESONANSI: ON';
            btnAudio.style.background = 'rgba(0, 255, 170, 0.28)';
            btnAudio.style.color = '#fff';
            initOrUpdateAudio();
        } else {
            btnAudio.innerHTML = '🔊 AUDIO RESONANSI: OFF';
            btnAudio.style.background = 'rgba(0, 255, 170, 0.14)';
            btnAudio.style.color = '#00ffaa';
            if (masterGain && audioCtx) {
                masterGain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.04);
            }
        }
    });

    function updateChladniParams(giveKick) {
        const n = parseInt(nSlider.value);
        const m = parseInt(mSlider.value);
        const sym = parseFloat(symSelect.value);
        const amp = parseFloat(ampSlider.value);

        document.getElementById('val-n').innerText = n;
        document.getElementById('val-m').innerText = m;
        document.getElementById('val-amp').innerText = amp.toFixed(2) + " mm";

        plateUniforms.modeN.value = n;
        plateUniforms.modeM.value = m;
        plateUniforms.symSign.value = sym;
        plateUniforms.amp.value = amp;

        // Frekuensi eigen pelat aluminium (32 cm x 32 cm x 1.5 mm): f_nm = 35.6 * (n^2 + m^2) Hz
        currentFreqHz = 35.6 * (n * n + m * m);
        const symLabel = (n === m) ? "Grid" : (sym < 0 ? "Antisimetris" : "Simetris");
        hudFreq.innerText = `f${n}${m}: ${currentFreqHz.toFixed(1)} Hz | Mode (${n}, ${m}) ${symLabel}`;

        if (giveKick) {
            // Beri dorongan kecil pada butiran agar segera bermigrasi ke garis simpul baru
            for (let i = 0; i < numGrains; i++) {
                const i3 = i * 3;
                gVel[i3] += (Math.random() - 0.5) * 3.2;
                gVel[i3 + 1] += 0.6 + Math.random() * 1.4;
                gVel[i3 + 2] += (Math.random() - 0.5) * 3.2;
            }
        }

        initOrUpdateAudio();
    }

    [nSlider, mSlider, symSelect].forEach(el => el.addEventListener('input', () => updateChladniParams(true)));
    ampSlider.addEventListener('input', () => updateChladniParams(false));
    document.getElementById('btn-scatter').addEventListener('click', scatterSand);

    updateChladniParams(false);
    scatterSand();

    // 8. KONTROL KAMERA & FULLSCREEN
    let isAutoRotate = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

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

    // 9. ANIMATION LOOP & MIGRASI PARTIKEL KE GARIS SIMPUL
    const clock = new THREE.Clock();
    const colNodal = new THREE.Color(0xd8ffff);
    const colMid = new THREE.Color(0x00f3ff);
    const colBounce = new THREE.Color(0xff007f);
    const tmpCol = new THREE.Color();

    function animate() {
        requestAnimationFrame(animate);
        const dt = Math.min(clock.getDelta(), 0.04);
        const elapsed = clock.getElapsedTime();

        const n = parseInt(nSlider.value);
        const m = parseInt(mSlider.value);
        const sym = parseFloat(symSelect.value);
        const amp = parseFloat(ampSlider.value);

        // Osilasi visual pelat & cincin driver akustik
        const visOmega = 16.0 + Math.sqrt(currentFreqHz) * 0.45;
        const oscPhase = Math.cos(visOmega * elapsed);
        plateUniforms.oscPhase.value = oscPhase;
        pulseRing.scale.setScalar(1.0 + 0.04 * amp * oscPhase);

        let lockedCount = 0;
        const eps = 0.012;
        const invPlate = 1.0 / plateSize;
        const bound = halfPlate - 0.18;

        for (let i = 0; i < numGrains; i++) {
            const i3 = i * 3;
            let gx = gPos[i3];
            let gy = gPos[i3 + 1];
            let gz = gPos[i3 + 2];

            let vx = gVel[i3];
            let vy = gVel[i3 + 1];
            let vz = gVel[i3 + 2];

            const u = (gx + halfPlate) * invPlate;
            const v = (gz + halfPlate) * invPlate;

            const wVal = evalChladni(u, v, n, m, sym);
            const absW = Math.abs(wVal);
            const plateY = wVal * amp * 1.15 * oscPhase;

            // Gravitasi & hambatan udara
            vy -= 30.0 * dt;
            vx *= 0.965;
            vz *= 0.965;

            gx += vx * dt;
            gy += vy * dt;
            gz += vz * dt;

            // Pantulan halus di bibir tepi pelat
            if (gx < -bound) { gx = -bound; vx = Math.abs(vx) * 0.45; }
            else if (gx > bound) { gx = bound; vx = -Math.abs(vx) * 0.45; }
            if (gz < -bound) { gz = -bound; vz = Math.abs(vz) * 0.45; }
            else if (gz > bound) { gz = bound; vz = -Math.abs(vz) * 0.45; }

            // Interaksi tumbukan butir pasir dengan permukaan pelat bergetar
            const surfY = plateY + 0.08;
            if (gy <= surfY) {
                gy = surfY;
                const vibEnergy = absW * amp;

                if (vibEnergy > 0.055) {
                    // Pelontaran vertikal + difusi akustik menuruni gradien amplitudo W^2
                    vy = (0.7 + Math.random() * 1.9) * vibEnergy * 3.6;

                    const wU = evalChladni(Math.min(1.0, u + eps), v, n, m, sym);
                    const wV = evalChladni(u, Math.min(1.0, v + eps), n, m, sym);
                    const gradU = (wU * wU - wVal * wVal) / eps;
                    const gradV = (wV * wV - wVal * wVal) / eps;

                    const drift = 1.65 * amp;
                    vx += -gradU * drift + (Math.random() - 0.5) * vibEnergy * 7.5;
                    vz += -gradV * drift + (Math.random() - 0.5) * vibEnergy * 7.5;
                } else {
                    // Terkunci stabil di garis simpul (nodal line)
                    vy = 0.0;
                    vx *= 0.65;
                    vz *= 0.65;
                    lockedCount++;
                }
            }

            gPos[i3] = gx;
            gPos[i3 + 1] = gy;
            gPos[i3 + 2] = gz;

            gVel[i3] = vx;
            gVel[i3 + 1] = vy;
            gVel[i3 + 2] = vz;

            // Pewarnaan berdasarkan tingkat eksitasi lokal
            if (absW < 0.08) {
                tmpCol.copy(colNodal);
            } else if (absW < 0.35) {
                tmpCol.lerpColors(colNodal, colMid, (absW - 0.08) / 0.27);
            } else {
                tmpCol.lerpColors(colMid, colBounce, Math.min(1.0, (absW - 0.35) / 0.55));
            }

            gColors[i3] = tmpCol.r;
            gColors[i3 + 1] = tmpCol.g;
            gColors[i3 + 2] = tmpCol.b;
        }

        grainGeo.attributes.position.needsUpdate = true;
        grainGeo.attributes.color.needsUpdate = true;

        const lockPct = (lockedCount / numGrains) * 100.0;
        hudLock.innerText = `Terkunci di Simpul: ${lockPct.toFixed(1)}% (5.500 Butir)`;

        controls.update();
        composer.render();
    }
    animate();

//]]>
  } catch (err) { console.error('Module script error:', err); }
})();