// Auto-generated module #27
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js Lengkap & Post-Processing (Bloom) -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Pandu Gelombang TE / TM 3D</h3>\r\n\r\n    <div class="input-group">\r\n      <label>Mode Propagasi Rongga</label>\r\n      <select id="mode-select" style="width: 100%; padding: 8px; background: #0a0f18; color: #00f3ff; border: 1px solid rgba(0, 243, 255, 0.4); border-radius: 5px; font-family: \'Rajdhani\', sans-serif; font-weight: bold; font-size: 13px; cursor: pointer;">\r\n        <option value="TE10">📡 TE₁₀ — Mode Dominan (Ex = 0)</option>\r\n        <option value="TE20">⚡ TE₂₀ — Harmonik Lebar Orde-2</option>\r\n        <option value="TE11">🔷 TE₁₁ — Transverse Electric 2D</option>\r\n        <option value="TM11">🧲 TM₁₁ — Transverse Magnetic (Hx = 0)</option>\r\n      </select>\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Frekuensi Sinyal RF (f) <span id="val-freq" class="value-display">10.0 GHz</span></label>\r\n      <input type="range" id="freq-slider" min="4.0" max="24.0" step="0.2" value="10.0">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Lebar Dinding Pandu (a) <span id="val-width" class="value-display">22.86 mm</span></label>\r\n      <input type="range" id="width-slider" min="16.0" max="30.0" step="0.2" value="22.86">\r\n    </div>\r\n\r\n    <div style="background: rgba(0, 243, 255, 0.08); border-left: 3px solid #00f3ff; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>SYARAT PROPAGASI (f &gt; fc):</strong><br>\r\n        Panah <b>Emas</b> = Medan Listrik <b>E</b>, Panah <b>Hijau</b> = Medan Magnet <b>H</b>. Jika frekuensi <b>f &le; fc</b>, gelombang tertahan sebagai medan <i>evanesen</i> yang meluruh eksponensial!\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="waveguide-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.35); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n\r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-camera" style="background: rgba(0, 243, 255, 0.22); border: 1px solid #00f3ff; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🎥 AUTO-ROTATE: ON\r\n      </button>\r\n      <button id="btn-vectors" style="background: rgba(255, 221, 0, 0.22); border: 1px solid #ffdd00; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🧭 VEKTOR: MEDAN E + H\r\n      </button>\r\n      <button id="btn-pulse" style="background: rgba(255, 0, 85, 0.25); border: 1px solid #ff0055; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        📶 PULSA PAKET RF\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Dispersi & Frekuensi Potong -->\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.78); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.5);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00f3ff; letter-spacing: 1px;">STATUS PROPAGASI &amp; FREKUENSI POTONG (fc)</div>\r\n      <div id="hud-status" style="font-family: \'Orbitron\', monospace; font-size: 14px; color: #00ffaa; font-weight: bold; margin-bottom: 4px;">PROPAGASI AKTIF | fc: 6.56 GHz</div>\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #ffdd00; letter-spacing: 1px;">DISPERSI PANDU (λg) &amp; KECEPATAN FASE / GRUP</div>\r\n      <div id="hud-disp" style="font-family: \'Orbitron\', monospace; font-size: 13px; color: #fff;">λg: 39.7 mm | vp: 1.32 c | vg: 0.76 c</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {
//<![CDATA[

    const container = document.getElementById('waveguide-canvas-container');
    const wrapper = document.getElementById('vis-panel-wrapper');

    // 1. SCENE & KAMERA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x03050a);
    scene.fog = new THREE.FogExp2(0x03050a, 0.0055);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(16, 20, 42);

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0, 0);

    // 2. POST-PROCESSING (BLOOM)
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.35, 0.45, 0.8);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 3. PENCAHAYAAN & KISI REFERENSI
    scene.add(new THREE.AmbientLight(0x223344));
    const keyLight = new THREE.DirectionalLight(0xaaddff, 1.15);
    keyLight.position.set(20, 35, 25);
    scene.add(keyLight);

    const feedLight = new THREE.PointLight(0x00f3ff, 2.2, 35);
    feedLight.position.set(-22, 2, 0);
    scene.add(feedLight);

    const floorGrid = new THREE.GridHelper(72, 24, 0x16324f, 0x091524);
    floorGrid.position.y = -8.5;
    scene.add(floorGrid);

    // 4. STRUKTUR LOGAM PANDU GELOMBANG PERSEGI PANJANG (WR-90 SCALED)
    const guideLen = 48.0;
    const xMin = -guideLen * 0.5; // -24
    const guideH = 6.6; // Tinggi dinding sempit b = 10.16 mm
    let guideW = 14.86; // Lebar dinding lebar a = 22.86 mm (dinamis)

    const guideStructure = new THREE.Group();
    scene.add(guideStructure);

    // Badan rongga konduktor transparan + wireframe tepi
    const ductGeo = new THREE.BoxGeometry(guideLen, guideH, 1.0);
    const ductWallMat = new THREE.MeshStandardMaterial({
        color: 0x1a2d42,
        emissive: 0x041220,
        metalness: 0.85,
        roughness: 0.25,
        transparent: true,
        opacity: 0.16,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    const ductMesh = new THREE.Mesh(ductGeo, ductWallMat);
    guideStructure.add(ductMesh);

    const ductWireMat = new THREE.LineBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.72 });
    const ductWire = new THREE.LineSegments(new THREE.EdgesGeometry(ductGeo), ductWireMat);
    guideStructure.add(ductWire);

    // Bingkai Flensa (Flange) di Ujung Input & Output + Rusuk Penguat
    const flangeMat = new THREE.MeshStandardMaterial({
        color: 0x3b4d63,
        emissive: 0x061b2e,
        metalness: 0.88,
        roughness: 0.22
    });

    function createFlange(xPos, thick) {
        const grp = new THREE.Group();
        grp.position.x = xPos;
        const barTop = new THREE.Mesh(new THREE.BoxGeometry(thick, 0.55, 1.14), flangeMat);
        barTop.position.y = guideH * 0.5 + 0.27;
        const barBot = new THREE.Mesh(new THREE.BoxGeometry(thick, 0.55, 1.14), flangeMat);
        barBot.position.y = -guideH * 0.5 - 0.27;
        const barLeft = new THREE.Mesh(new THREE.BoxGeometry(thick, guideH + 1.1, 0.55), flangeMat);
        barLeft.position.z = 0.54;
        const barRight = new THREE.Mesh(new THREE.BoxGeometry(thick, guideH + 1.1, 0.55), flangeMat);
        barRight.position.z = -0.54;
        grp.add(barTop, barBot, barLeft, barRight);
        guideStructure.add(grp);
        return grp;
    }

    const flangeIn = createFlange(xMin, 0.65);
    const flangeOut = createFlange(-xMin, 0.65);
    const ribMid = createFlange(0, 0.28);

    // Konektor Antena Eksitasi RF (Coaxial Feed Probe) di dekat port masuk
    const feedProbeGroup = new THREE.Group();
    feedProbeGroup.position.set(xMin + 2.2, guideH * 0.5, 0);
    scene.add(feedProbeGroup);

    const connectorBarrel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.65, 0.75, 2.2, 16),
        flangeMat
    );
    connectorBarrel.position.y = 1.1;
    feedProbeGroup.add(connectorBarrel);

    const probePin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.16, 0.16, guideH * 0.65, 12),
        new THREE.MeshBasicMaterial({ color: 0xffdd00 })
    );
    probePin.position.y = -guideH * 0.32;
    feedProbeGroup.add(probePin);

    // 5. SHADER BIDANG LOBUS GELOMBANG ELEKTROMAGNETIK (HORIZONTAL & VERTIKAL)
    const waveUniforms = {
        time: { value: 0.0 },
        modeM: { value: 1.0 },
        modeN: { value: 0.0 },
        isTM: { value: 0.0 },
        isPropagating: { value: 1.0 },
        betaVis: { value: 0.42 },
        alphaVis: { value: 0.0 },
        pulseActive: { value: 0.0 },
        pulseCenter: { value: 0.0 }
    };

    const lobeShaderMat = new THREE.ShaderMaterial({
        uniforms: waveUniforms,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            uniform float modeM;
            uniform float modeN;
            uniform float isTM;
            uniform float isPropagating;
            uniform float betaVis;
            uniform float alphaVis;
            uniform float pulseActive;
            uniform float pulseCenter;
            varying vec2 vUv;

            void main() {
                float pi = 3.14159265;
                float xDist = vUv.x * 48.0;
                float transCoord = vUv.y; // 0 .. 1 melintasi lebar a atau tinggi b

                // Profil spasial transversal sesuai mode (m, n)
                float spatial = 1.0;
                if (modeN < 0.5) {
                    // Mode TE_m0: variasi sinusoidal sepanjang lebar a
                    spatial = sin(modeM * pi * transCoord);
                } else {
                    // Mode TE_mn atau TM_mn
                    spatial = sin(modeM * pi * transCoord) * sin(modeN * pi * 0.36);
                }

                float waveVal = 0.0;
                if (isPropagating > 0.5) {
                    float phase = time * 5.2 - betaVis * xDist;
                    float env = 1.0;
                    if (pulseActive > 0.5) {
                        float dPulse = xDist - pulseCenter;
                        env = exp(-(dPulse * dPulse) / 28.0);
                    }
                    waveVal = spatial * sin(phase) * env;
                } else {
                    // Rezim Evanesen (f <= fc): peluruhan eksponensial tanpa perambatan fase
                    float decay = exp(-alphaVis * xDist);
                    waveVal = spatial * sin(time * 5.2) * decay;
                }

                float mag = abs(waveVal);
                vec3 posCol = isTM > 0.5 ? vec3(1.0, 0.12, 0.45) : vec3(1.0, 0.04, 0.52);
                vec3 negCol = vec3(0.0, 0.88, 1.0);
                vec3 col = waveVal >= 0.0 ? posCol : negCol;

                // Garis kontur muka gelombang halus
                float contour = smoothstep(0.88, 1.0, mag) * 0.35;
                float alpha = clamp(pow(mag, 1.25) * 0.52 + contour, 0.0, 0.72);
                gl_FragColor = vec4(col + vec3(contour * 0.4), alpha);
            }
        `
    });

    // Bidang Horizontal Tengah (y = 0)
    const horizPlaneGeo = new THREE.PlaneGeometry(guideLen, 1.0, 96, 24);
    horizPlaneGeo.rotateX(-Math.PI / 2);
    const horizLobeMesh = new THREE.Mesh(horizPlaneGeo, lobeShaderMat);
    scene.add(horizLobeMesh);

    // Bidang Vertikal Tengah (z = 0)
    const vertPlaneGeo = new THREE.PlaneGeometry(guideLen, guideH, 96, 16);
    const vertLobeMesh = new THREE.Mesh(vertPlaneGeo, lobeShaderMat);
    scene.add(vertLobeMesh);

    // 6. GRID 3D PANAH VEKTOR MEDAN LISTRIK (E) & MEDAN MAGNET (H)
    const nx = 19;
    const ny = 3;
    const nz = 5;
    const totalArrows = nx * ny * nz;

    // Setiap panah digambar menggunakan 3 segmen garis (batang + 2 sayap mata panah) = 6 titik
    function createVectorFieldSystem(hexColor) {
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(totalArrows * 6 * 3);
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const mat = new THREE.LineBasicMaterial({
            color: hexColor,
            transparent: true,
            opacity: 0.92
        });
        const lines = new THREE.LineSegments(geo, mat);
        scene.add(lines);
        return { lines, pos };
    }

    const eFieldSys = createVectorFieldSystem(0xffdd00); // Emas untuk Medan Listrik E
    const hFieldSys = createVectorFieldSystem(0x00ffaa); // Hijau Zamrud untuk Medan Magnet H

    const upRef = new THREE.Vector3(0, 1, 0);
    const altRef = new THREE.Vector3(1, 0, 0);
    const vDir = new THREE.Vector3();
    const vSide = new THREE.Vector3();
    const vBack = new THREE.Vector3();

    function writeArrow(posArr, arrowIdx, ox, oy, oz, vx, vy, vz, maxLen) {
        const base = arrowIdx * 18;
        const mag = Math.hypot(vx, vy, vz);
        if (mag < 0.04) {
            for (let k = 0; k < 18; k++) posArr[base + k] = 0;
            return;
        }

        const len = Math.min(maxLen, mag * maxLen);
        const invM = 1.0 / mag;
        vDir.set(vx * invM, vy * invM, vz * invM);

        const tipX = ox + vDir.x * len;
        const tipY = oy + vDir.y * len;
        const tipZ = oz + vDir.z * len;

        // Batang panah
        posArr[base] = ox;
        posArr[base + 1] = oy;
        posArr[base + 2] = oz;
        posArr[base + 3] = tipX;
        posArr[base + 4] = tipY;
        posArr[base + 5] = tipZ;

        // Mata panah 3D
        const ref = Math.abs(vDir.y) > 0.9 ? altRef : upRef;
        vSide.crossVectors(vDir, ref).normalize();
        const headLen = len * 0.30;
        const headRad = len * 0.14;
        vBack.set(tipX - vDir.x * headLen, tipY - vDir.y * headLen, tipZ - vDir.z * headLen);

        posArr[base + 6] = tipX;
        posArr[base + 7] = tipY;
        posArr[base + 8] = tipZ;
        posArr[base + 9] = vBack.x + vSide.x * headRad;
        posArr[base + 10] = vBack.y + vSide.y * headRad;
        posArr[base + 11] = vBack.z + vSide.z * headRad;

        posArr[base + 12] = tipX;
        posArr[base + 13] = tipY;
        posArr[base + 14] = tipZ;
        posArr[base + 15] = vBack.x - vSide.x * headRad;
        posArr[base + 16] = vBack.y - vSide.y * headRad;
        posArr[base + 17] = vBack.z - vSide.z * headRad;
    }

    // 7. KALKULASI FISIKA PANDU GELOMBANG & KONTROL UI
    const modeSelect = document.getElementById('mode-select');
    const freqSlider = document.getElementById('freq-slider');
    const widthSlider = document.getElementById('width-slider');
    const hudStatus = document.getElementById('hud-status');
    const hudDisp = document.getElementById('hud-disp');

    const cMmPerNs = 299.792458; // Kecepatan cahaya dalam mm * GHz
    const bMm = 10.16; // Tinggi dinding sempit WR-90 (mm)

    let modeM = 1;
    let modeN = 0;
    let isTM = false;
    let isPropagating = true;
    let vgRatio = 0.76;
    let pulseMode = false;
    let pulseX = 0.0;

    function updateWaveguidePhysics() {
        const modeStr = modeSelect.value;
        const fGHz = parseFloat(freqSlider.value);
        const aMm = parseFloat(widthSlider.value);

        document.getElementById('val-freq').innerText = fGHz.toFixed(1) + " GHz";
        document.getElementById('val-width').innerText = aMm.toFixed(2) + " mm";

        // Skala lebar visual 3D pandu gelombang mengikuti parameter a (mm)
        guideW = aMm * 0.65;
        ductMesh.scale.z = guideW;
        ductWire.scale.z = guideW;
        flangeIn.scale.z = guideW;
        flangeOut.scale.z = guideW;
        ribMid.scale.z = guideW;
        horizLobeMesh.scale.z = guideW;

        if (modeStr === 'TE10') { modeM = 1; modeN = 0; isTM = false; }
        else if (modeStr === 'TE20') { modeM = 2; modeN = 0; isTM = false; }
        else if (modeStr === 'TE11') { modeM = 1; modeN = 1; isTM = false; }
        else if (modeStr === 'TM11') { modeM = 1; modeN = 1; isTM = true; }

        waveUniforms.modeM.value = modeM;
        waveUniforms.modeN.value = modeN;
        waveUniforms.isTM.value = isTM ? 1.0 : 0.0;

        // Frekuensi potong fc = (c / 2) * sqrt((m/a)^2 + (n/b)^2)
        const fcGHz = (cMmPerNs * 0.5) * Math.sqrt(Math.pow(modeM / aMm, 2) + Math.pow(modeN / bMm, 2));
        const lambda0Mm = cMmPerNs / fGHz;

        if (fGHz > fcGHz) {
            isPropagating = true;
            const rootFactor = Math.sqrt(1.0 - Math.pow(fcGHz / fGHz, 2));
            const lambdaGMm = lambda0Mm / rootFactor;
            const vpRatio = 1.0 / rootFactor;
            vgRatio = rootFactor;

            waveUniforms.isPropagating.value = 1.0;
            waveUniforms.betaVis.value = Math.min(1.15, (2.0 * Math.PI / lambdaGMm) * 2.65);
            waveUniforms.alphaVis.value = 0.0;

            hudStatus.innerText = `PROPAGASI AKTIF | fc: ${fcGHz.toFixed(2)} GHz`;
            hudStatus.style.color = "#00ffaa";
            hudDisp.innerText = `λg: ${lambdaGMm.toFixed(1)} mm | vp: ${vpRatio.toFixed(2)} c | vg: ${vgRatio.toFixed(2)} c`;
            feedLight.color.setHex(0x00f3ff);
        } else {
            isPropagating = false;
            vgRatio = 0.0;
            const evanRoot = Math.sqrt(Math.max(0.001, 1.0 - Math.pow(fGHz / fcGHz, 2)));
            // Konstanta redaman evanesen alpha dalam Neper/mm -> konversi ke dB/cm
            const alphaNpPerMm = ((2.0 * Math.PI * fcGHz) / cMmPerNs) * evanRoot;
            const attenDbPerCm = alphaNpPerMm * 8.686 * 10.0;

            waveUniforms.isPropagating.value = 0.0;
            waveUniforms.alphaVis.value = 0.065 + evanRoot * 0.36;

            hudStatus.innerText = `CUTOFF EVANESEN (f ≤ fc) | fc: ${fcGHz.toFixed(2)} GHz`;
            hudStatus.style.color = "#ff0055";
            hudDisp.innerText = `Redaman Evanesen (α): ${attenDbPerCm.toFixed(1)} dB/cm | Tanpa Daya Aktif`;
            feedLight.color.setHex(0xff0055);
        }
    }

    [modeSelect, freqSlider, widthSlider].forEach(el => el.addEventListener('input', updateWaveguidePhysics));
    updateWaveguidePhysics();

    // 8. KONTROL VEKTOR MEDAN, PULSA RF, AUTO-ROTATE & FULLSCREEN
    let vecMode = 0; // 0: E + H, 1: E saja, 2: H saja
    const btnVectors = document.getElementById('btn-vectors');
    btnVectors.addEventListener('click', () => {
        vecMode = (vecMode + 1) % 3;
        eFieldSys.lines.visible = (vecMode === 0 || vecMode === 1);
        hFieldSys.lines.visible = (vecMode === 0 || vecMode === 2);
        if (vecMode === 0) btnVectors.innerHTML = '🧭 VEKTOR: MEDAN E + H';
        else if (vecMode === 1) btnVectors.innerHTML = '⚡ VEKTOR: MEDAN E SAJA';
        else btnVectors.innerHTML = '🧲 VEKTOR: MEDAN H SAJA';
    });

    const btnPulse = document.getElementById('btn-pulse');
    btnPulse.addEventListener('click', () => {
        pulseMode = !pulseMode;
        pulseX = 0.0;
        waveUniforms.pulseActive.value = pulseMode ? 1.0 : 0.0;
        btnPulse.innerHTML = pulseMode ? '📶 MODE: PULSA PAKET' : '📶 PULSA PAKET RF';
        btnPulse.style.background = pulseMode ? 'rgba(255, 0, 85, 0.42)' : 'rgba(255, 0, 85, 0.25)';
    });

    let isAutoRotate = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.48;

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

    // 9. ANIMATION LOOP & EVALUASI VEKTOR MAXWELL 3D
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const dt = Math.min(clock.getDelta(), 0.04);
        const elapsed = clock.getElapsedTime();
        waveUniforms.time.value = elapsed;

        if (pulseMode) {
            const vGroupVis = isPropagating ? (4.5 + vgRatio * 14.0) : 2.5;
            pulseX += vGroupVis * dt;
            if (pulseX > guideLen + 8.0) pulseX = -6.0;
            waveUniforms.pulseCenter.value = pulseX;
        }

        const betaV = waveUniforms.betaVis.value;
        const alphaV = waveUniforms.alphaVis.value;
        const omegaT = elapsed * 5.2;

        let idx = 0;
        for (let ix = 0; ix < nx; ix++) {
            const uX = (ix + 0.5) / nx; // 0 .. 1 sepanjang panjang pandu gelombang
            const xDist = uX * guideLen;
            const wx = xMin + xDist;

            let env = 1.0;
            if (pulseMode) {
                const dP = xDist - pulseX;
                env = Math.exp(-(dP * dP) / 28.0);
            }

            const phaseArg = isPropagating ? (omegaT - betaV * xDist) : omegaT;
            const decayArg = isPropagating ? 1.0 : Math.exp(-alphaV * xDist);
            const sinPhase = Math.sin(phaseArg) * decayArg * env;
            const cosPhase = Math.cos(phaseArg) * decayArg * env;

            for (let iy = 0; iy < ny; iy++) {
                const vY = (iy + 1) / (ny + 1); // 0.25, 0.50, 0.75 (interior dinding sempit b)
                const wy = (vY - 0.5) * guideH;

                for (let iz = 0; iz < nz; iz++) {
                    const uZ = (iz + 1) / (nz + 1); // 0.167 .. 0.833 (interior dinding lebar a)
                    const wz = (uZ - 0.5) * guideW;

                    const sinM = Math.sin(modeM * Math.PI * uZ);
                    const cosM = Math.cos(modeM * Math.PI * uZ);
                    const sinN = Math.sin(modeN * Math.PI * vY);
                    const cosN = Math.cos(modeN * Math.PI * vY);

                    let ex = 0, ey = 0, ez = 0;
                    let hx = 0, hy = 0, hz = 0;

                    if (!isTM) {
                        // Mode TE_mn (Ex = 0; komponen longitudinal adalah Hz)
                        if (modeN === 0) {
                            ey = -sinM * sinPhase;
                            hz = -sinM * sinPhase;
                            hx = cosM * cosPhase * 0.85;
                        } else {
                            ez = cosM * sinN * sinPhase * 0.85;
                            ey = -sinM * cosN * sinPhase * 0.85;
                            hz = -sinM * cosN * sinPhase * 0.85;
                            hy = -cosM * sinN * sinPhase * 0.85;
                            hx = cosM * cosN * cosPhase * 0.85;
                        }
                    } else {
                        // Mode TM_11 (Hx = 0; komponen longitudinal adalah Ex)
                        ex = sinM * sinN * cosPhase * 0.95;
                        ez = -cosM * sinN * sinPhase * 0.85;
                        ey = -sinM * cosN * sinPhase * 0.85;
                        hz = sinM * cosN * sinPhase * 0.85;
                        hy = -cosM * sinN * sinPhase * 0.85;
                    }

                    writeArrow(eFieldSys.pos, idx, wx, wy, wz, ex, ey, ez, 2.25);
                    writeArrow(hFieldSys.pos, idx, wx, wy, wz, hx, hy, hz, 2.25);
                    idx++;
                }
            }
        }

        eFieldSys.lines.geometry.attributes.position.needsUpdate = true;
        hFieldSys.lines.geometry.attributes.position.needsUpdate = true;

        controls.update();
        composer.render();
    }
    animate();

//]]>
  } catch (err) { console.error('Module script error:', err); }
  // Inline script #10
  try {
//<![CDATA[

  Fisika3DLazyEngine.register("cherenkov-canvas-container", function(container, shouldRender) {
    // 1. Inisialisasi scene, camera, renderer, controls, dan composer
    let animId = null;

    const resizeObs = new ResizeObserver(function() {
      if (!container.clientWidth || !container.clientHeight) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      composer.setSize(container.clientWidth, container.clientHeight);
    });
    resizeObs.observe(container);

    function animate() {
      animId = requestAnimationFrame(animate);
      if (!shouldRender()) return; // Hemat 100% GPU saat off-screen atau pindah tab

      controls.update();
      composer.render();
    }
    animate();

    // 2. Kembalikan fungsi dispose() untuk pembersihan memori saat konteks dilepas
    return {
      dispose: function() {
        cancelAnimationFrame(animId);
        resizeObs.disconnect();
        renderer.dispose();
        renderer.forceContextLoss();
      }
    };
  });

//]]>
  } catch (err) { console.error('Module script error:', err); }
})();