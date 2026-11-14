// Auto-generated module #25
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js Lengkap & Post-Processing (Bloom) -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Levitasi Superkonduktor 3D</h3>\r\n\r\n    <div class="input-group">\r\n      <label>Rezim Superkonduktor</label>\r\n      <select id="mode-select" style="width: 100%; padding: 8px; background: #0a0f18; color: #00f3ff; border: 1px solid rgba(0, 243, 255, 0.4); border-radius: 5px; font-family: \'Rajdhani\', sans-serif; font-weight: bold; font-size: 13px; cursor: pointer;">\r\n        <option value="type2">🧲 Tipe-II: Quantum Flux Pinning (YBCO)</option>\r\n        <option value="type1">🛡️ Tipe-I: Efek Meissner Murni (Ideal)</option>\r\n      </select>\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Suhu Kriogenik (T) <span id="val-temp" class="value-display">77 K (LN₂)</span></label>\r\n      <input type="range" id="temp-slider" min="40" max="115" step="1" value="77">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Kuat Medan Magnet Rel (B₀) <span id="val-mag" class="value-display">0.85 Tesla</span></label>\r\n      <input type="range" id="mag-slider" min="0.25" max="1.50" step="0.05" value="0.85">\r\n    </div>\r\n\r\n    <div style="background: rgba(0, 243, 255, 0.08); border-left: 3px solid #00f3ff; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>SUHU KRITIS YBCO (Tc = 92 K):</strong><br>\r\n        Di bawah <b>92 K</b>, arus superkonduktor menolak fluks magnetik. Pada <b>Tipe-II</b>, tabung fluks emas mengunci cakram layaknya pegas kuantum tak terlihat!\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="meissner-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.35); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n\r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-camera" style="background: rgba(0, 243, 255, 0.22); border: 1px solid #00f3ff; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🎥 AUTO-ROTATE: ON\r\n      </button>\r\n      <button id="btn-nudge" style="background: rgba(255, 221, 0, 0.22); border: 1px solid #ffdd00; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        ⚡ DORONG / UJI PINNING\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Parameter Kriogenik & Kuantum -->\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.78); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.5);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00f3ff; letter-spacing: 1px;">FASE MATERIAL &amp; KEDALAMAN LONDON (λL)</div>\r\n      <div id="hud-phase" style="font-family: \'Orbitron\', monospace; font-size: 14px; color: #00ffaa; font-weight: bold; margin-bottom: 4px;">SUPERKONDUKTOR (T &lt; 92 K) | λL: 211 nm</div>\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #ffdd00; letter-spacing: 1px;">CELAH LEVITASI &amp; KUANTUM FLUKS (Φ₀)</div>\r\n      <div id="hud-flux" style="font-family: \'Orbitron\', monospace; font-size: 13px; color: #fff;">z: 2.68 cm | Pusaran Abrikosov: 9 × Φ₀</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {
//<![CDATA[

    const container = document.getElementById('meissner-canvas-container');
    const wrapper = document.getElementById('vis-panel-wrapper');

    // 1. SCENE & KAMERA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x03050a);
    scene.fog = new THREE.FogExp2(0x03050a, 0.006);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(26, 18, 34);

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, -1, 0);

    // 2. POST-PROCESSING (BLOOM)
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.35, 0.45, 0.82);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 3. PENCAHAYAAN LABORATORIUM KRIOGENIK
    scene.add(new THREE.AmbientLight(0x223344));
    const keyLight = new THREE.DirectionalLight(0xbbeeff, 1.25);
    keyLight.position.set(20, 35, 25);
    scene.add(keyLight);

    const cryoLight = new THREE.PointLight(0x00f3ff, 2.2, 45);
    scene.add(cryoLight);

    // 4. LANTAI KISI & REL MAGNET PERMANEN HALBACH (N-S-N)
    const floorY = -6.2;
    const grid = new THREE.GridHelper(64, 24, 0x16324f, 0x091524);
    grid.position.y = floorY;
    scene.add(grid);

    const trackGroup = new THREE.Group();
    scene.add(trackGroup);

    const trackRadius = 15.5;
    const trackBaseY = -4.8;
    const trackTopY = trackBaseY + 0.55;

    // Dudukan dasar rel
    const baseRingGeo = new THREE.RingGeometry(trackRadius - 3.6, trackRadius + 3.6, 72);
    baseRingGeo.rotateX(-Math.PI / 2);
    const baseRingMat = new THREE.MeshStandardMaterial({
        color: 0x162231,
        metalness: 0.85,
        roughness: 0.3,
        side: THREE.DoubleSide
    });
    const baseRing = new THREE.Mesh(baseRingGeo, baseRingMat);
    baseRing.position.y = trackBaseY - 0.52;
    trackGroup.add(baseRing);

    // Tiga jalur magnet konsentris: Dalam (Utara), Tengah (Selatan), Luar (Utara)
    const railConfigs = [
        { r: trackRadius - 2.35, w: 0.95, col: 0xff0055, glow: 0x55001c }, // Kutub Utara (N)
        { r: trackRadius,        w: 1.35, col: 0x0088ff, glow: 0x002b55 }, // Kutub Selatan (S)
        { r: trackRadius + 2.35, w: 0.95, col: 0xff0055, glow: 0x55001c }  // Kutub Utara (N)
    ];

    railConfigs.forEach(cfg => {
        const railGeo = new THREE.TorusGeometry(cfg.r, cfg.w * 0.45, 12, 84);
        railGeo.rotateX(Math.PI / 2);
        railGeo.scale(1, 0.7, 1);
        const railMat = new THREE.MeshStandardMaterial({
            color: 0x4b5d73,
            emissive: cfg.glow,
            metalness: 0.9,
            roughness: 0.2
        });
        const railMesh = new THREE.Mesh(railGeo, railMat);
        railMesh.position.y = trackBaseY;
        trackGroup.add(railMesh);

        // Garis indikator polaritas magnet di puncak rel
        const stripGeo = new THREE.TorusGeometry(cfg.r, 0.08, 6, 84);
        stripGeo.rotateX(Math.PI / 2);
        const stripMat = new THREE.MeshBasicMaterial({ color: cfg.col, transparent: true, opacity: 0.85 });
        const stripMesh = new THREE.Mesh(stripGeo, stripMat);
        stripMesh.position.y = trackBaseY + 0.34;
        trackGroup.add(stripMesh);
    });

    // 5. CAKRAM SUPERKONDUKTOR KERAMIK YBCO
    const puckRadius = 3.1;
    const puckHeight = 1.35;
    const puckGroup = new THREE.Group();
    scene.add(puckGroup);

    const puckMat = new THREE.MeshStandardMaterial({
        color: 0x1f2937,
        emissive: 0x041e30,
        metalness: 0.55,
        roughness: 0.35
    });
    const puckMesh = new THREE.Mesh(new THREE.CylinderGeometry(puckRadius, puckRadius, puckHeight, 40), puckMat);
    puckGroup.add(puckMesh);

    // Lapisan embun beku kriogenik di permukaan atas cakram
    const frostGeo = new THREE.CylinderGeometry(puckRadius * 0.94, puckRadius * 0.94, 0.08, 36);
    const frostMat = new THREE.MeshStandardMaterial({
        color: 0xdbeafe,
        emissive: 0x0a2e46,
        roughness: 0.65,
        transparent: true,
        opacity: 0.85
    });
    const frostCap = new THREE.Mesh(frostGeo, frostMat);
    frostCap.position.y = puckHeight * 0.5 + 0.02;
    puckGroup.add(frostCap);

    // Cincin arus superkonduktor tepi (Meissner Screening Supercurrent)
    const superRingGeo = new THREE.TorusGeometry(puckRadius + 0.06, 0.09, 10, 48);
    superRingGeo.rotateX(Math.PI / 2);
    const superRingMat = new THREE.MeshBasicMaterial({
        color: 0x00f3ff,
        transparent: true,
        opacity: 0.9
    });
    const superRing = new THREE.Mesh(superRingGeo, superRingMat);
    superRing.position.y = -puckHeight * 0.25;
    puckGroup.add(superRing);

    // 6. KABUT UAP NITROGEN CAIR (LN2 CRYOGENIC MIST)
    function createMistTexture() {
        const c = document.createElement('canvas');
        c.width = 32;
        c.height = 32;
        const ctx = c.getContext('2d');
        const grad = ctx.createRadialGradient(16, 16, 1, 16, 16, 15);
        grad.addColorStop(0, 'rgba(210, 242, 255, 0.85)');
        grad.addColorStop(0.5, 'rgba(130, 210, 255, 0.32)');
        grad.addColorStop(1, 'rgba(0, 180, 255, 0.0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
        return new THREE.CanvasTexture(c);
    }

    const numMist = 200;
    const mistPos = new Float32Array(numMist * 3);
    const mistVel = new Float32Array(numMist * 3);
    const mistLife = new Float32Array(numMist);

    for (let i = 0; i < numMist; i++) {
        mistLife[i] = Math.random();
    }

    const mistGeo = new THREE.BufferGeometry();
    mistGeo.setAttribute('position', new THREE.BufferAttribute(mistPos, 3));
    const mistMat = new THREE.PointsMaterial({
        size: 1.45,
        map: createMistTexture(),
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });
    const mistPoints = new THREE.Points(mistGeo, mistMat);
    scene.add(mistPoints);

    // 7. GARIS MEDAN MAGNET 3D & TABUNG FLUKS TERKUANTISASI (ABRIKOSOV VORTICES)
    // Susunan 24 garis medan magnet lokal di sekitar cakram (membentuk lengkung dari rel N ke rel S)
    const fieldSpecs = [];
    const sliceOffsets = [-2.2, -1.1, 0.0, 1.1, 2.2]; // variasi sepanjang lintasan tangensial rel
    const radialPairs = [
        { rStart: trackRadius - 2.35, rEnd: trackRadius,        isCore: false },
        { rStart: trackRadius - 1.45, rEnd: trackRadius - 0.15, isCore: true  },
        { rStart: trackRadius + 1.45, rEnd: trackRadius + 0.15, isCore: true  },
        { rStart: trackRadius + 2.35, rEnd: trackRadius,        isCore: false }
    ];

    sliceOffsets.forEach(sOff => {
        radialPairs.forEach(rp => {
            fieldSpecs.push({
                sOff: sOff,
                rStart: rp.rStart,
                rEnd: rp.rEnd,
                isPinnedCandidate: rp.isCore && Math.abs(sOff) <= 1.15
            });
        });
    });

    const lineSegs = 26;
    const fieldLines = fieldSpecs.map(spec => {
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array((lineSegs + 1) * 3);
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const mat = new THREE.LineBasicMaterial({
            color: spec.isPinnedCandidate ? 0xffdd00 : 0x00f3ff,
            transparent: true,
            opacity: 0.78,
            blending: THREE.AdditiveBlending
        });
        const line = new THREE.Line(geo, mat);
        scene.add(line);
        return { spec, geo, pos, mat, line };
    });

    // 8. STATE FISIKA & KONTROL UI
    const modeSelect = document.getElementById('mode-select');
    const tempSlider = document.getElementById('temp-slider');
    const magSlider = document.getElementById('mag-slider');
    const hudPhase = document.getElementById('hud-phase');
    const hudFlux = document.getElementById('hud-flux');

    const Tc = 92.0; // Suhu kritis YBCO (Kelvin)
    const lambda0 = 150.0; // nm

    // Koordinat dinamis cakram
    let puckTheta = 0.45;
    let omegaTheta = 0.35; // kecepatan sudut mengelilingi rel
    let radialOffset = 0.0;
    let radialVel = 0.0;
    let puckY = trackTopY + puckHeight * 0.5 + 2.4;
    let velY = 0.0;
    let tiltX = 0.0;
    let tiltZ = 0.0;
    let tiltVelX = 0.0;
    let tiltVelZ = 0.0;

    let orderParam = 0.5;
    let targetHoverGap = 2.4;

    function updateCryoPhysics() {
        const mode = modeSelect.value;
        const T = parseInt(tempSlider.value);
        const B0 = parseFloat(magSlider.value);

        const tempNote = T === 77 ? " (LN₂)" : (T < 92 ? " (Kriogenik)" : " (Normal)");
        document.getElementById('val-temp').innerText = `${T} K${tempNote}`;
        document.getElementById('val-mag').innerText = `${B0.toFixed(2)} Tesla`;

        if (T < Tc) {
            // Parameter orde superkonduktor: psi_s = 1 - (T/Tc)^4
            orderParam = Math.max(0.02, 1.0 - Math.pow(T / Tc, 4));
            const lambdaL = lambda0 / Math.sqrt(orderParam);
            targetHoverGap = 3.1 * Math.pow(B0, 0.72) * Math.pow(orderParam, 0.42);

            const hoverCm = targetHoverGap * 1.15;
            const vortexCount = mode === 'type2' ? Math.max(2, Math.round(B0 * 14 * (1.0 - 0.35 * orderParam))) : 0;

            hudPhase.innerText = `SUPERKONDUKTOR (T < 92 K) | λL: ${Math.round(lambdaL)} nm`;
            hudPhase.style.color = "#00ffaa";

            if (mode === 'type2') {
                hudFlux.innerText = `z: ${hoverCm.toFixed(2)} cm | Pusaran Abrikosov: ${vortexCount} × Φ₀`;
                superRingMat.color.setHex(0x00f3ff);
            } else {
                hudFlux.innerText = `z: ${hoverCm.toFixed(2)} cm | Diamagnetik Sempurna (B = 0)`;
                superRingMat.color.setHex(0x00ffaa);
            }

            superRingMat.opacity = Math.min(0.95, 0.35 + orderParam * B0 * 0.55);
            frostMat.opacity = Math.min(0.9, (Tc - T) / 25.0);
        } else {
            orderParam = 0.0;
            targetHoverGap = 0.0;

            hudPhase.innerText = `FASE NORMAL RESISTIF (T ≥ 92 K) | λL: ∞`;
            hudPhase.style.color = "#ff0055";
            hudFlux.innerText = `z: 0.00 cm | Efek Meissner Hilang (Jatuh)`;

            superRingMat.opacity = 0.0;
            frostMat.opacity = 0.0;
        }
    }

    [modeSelect, tempSlider, magSlider].forEach(el => el.addEventListener('input', updateCryoPhysics));
    updateCryoPhysics();

    // 9. TOMBOL DORONG / UJI PINNING, AUTO-ROTATE & FULLSCREEN
    document.getElementById('btn-nudge').addEventListener('click', () => {
        const mode = modeSelect.value;
        const T = parseInt(tempSlider.value);
        if (T >= Tc) {
            // Dinginkan otomatis ke 77 K jika user menekan uji pinning saat masih panas
            tempSlider.value = "77";
            updateCryoPhysics();
        }
        velY += 4.2;
        radialVel += (Math.random() > 0.5 ? 1 : -1) * (mode === 'type2' ? 3.8 : 5.5);
        tiltVelX += (Math.random() - 0.5) * 4.5;
        tiltVelZ += (Math.random() - 0.5) * 4.5;
        omegaTheta = (omegaTheta >= 0 ? 1 : -1) * (mode === 'type2' ? 0.85 : 1.35);
    });

    let isAutoRotate = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.55;

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

    // 10. ANIMATION LOOP & SIMULASI MEKANIKA KUANTUM LEVITASI
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const dt = Math.min(clock.getDelta(), 0.04);

        const mode = modeSelect.value;
        const T = parseInt(tempSlider.value);
        const B0 = parseFloat(magSlider.value);
        const isSuper = T < Tc;

        const minY = trackTopY + puckHeight * 0.5;
        const eqY = minY + targetHoverGap;

        if (isSuper) {
            // Gaya pemulih pegas magnetik vertikal (Meissner repulsion)
            const kY = 34.0 * B0 * orderParam;
            const cY = 5.2;
            const accY = -kY * (puckY - eqY) - cY * velY;
            velY += accY * dt;
            puckY += velY * dt;
            if (puckY < minY) {
                puckY = minY;
                velY = Math.max(0, -velY * 0.3);
            }

            // Kekakuan radial & sudut: Tipe-II (Flux Pinning) jauh lebih kaku dan mengunci orientasi
            const kR = mode === 'type2' ? 38.0 * B0 * orderParam : 10.0 * B0 * orderParam;
            const cR = mode === 'type2' ? 5.8 : 2.2;
            const accR = -kR * radialOffset - cR * radialVel;
            radialVel += accR * dt;
            radialOffset += radialVel * dt;

            const kTilt = mode === 'type2' ? 42.0 : 12.0;
            const cTilt = mode === 'type2' ? 6.5 : 1.8;
            tiltVelX += (-kTilt * tiltX - cTilt * tiltVelX) * dt;
            tiltVelZ += (-kTilt * tiltZ - cTilt * tiltVelZ) * dt;
            tiltX += tiltVelX * dt;
            tiltZ += tiltVelZ * dt;

            // Luncuran tanpa gesekan di sepanjang rel magnetik melingkar
            const targetOmega = mode === 'type2' ? 0.28 : 0.52;
            omegaTheta += (targetOmega - omegaTheta) * 0.4 * dt;
            puckTheta += omegaTheta * dt;
        } else {
            // Fase normal: gravitasi menarik cakram jatuh ke rel dan gesekan menghentikan gerak
            if (puckY > minY) {
                velY -= 24.0 * dt;
                puckY += velY * dt;
                if (puckY <= minY) {
                    puckY = minY;
                    velY = 0;
                }
            }
            radialOffset *= 0.92;
            tiltX *= 0.85;
            tiltZ *= 0.85;
            omegaTheta *= 0.90;
            puckTheta += omegaTheta * dt;
        }

        const currR = trackRadius + radialOffset;
        const px = currR * Math.cos(puckTheta);
        const pz = currR * Math.sin(puckTheta);

        puckGroup.position.set(px, puckY, pz);
        puckGroup.rotation.set(tiltX, -puckTheta, tiltZ);

        cryoLight.position.set(px, puckY + 1.5, pz);
        cryoLight.intensity = isSuper ? (1.4 + orderParam * B0 * 1.8) : 0.2;

        // Perbarui Kabut Uap Nitrogen Cair (LN2)
        const mistActive = T < 96;
        mistPoints.visible = mistActive;
        if (mistActive) {
            const pArr = mistGeo.attributes.position.array;
            for (let i = 0; i < numMist; i++) {
                mistLife[i] += dt * 0.65;
                const i3 = i * 3;
                if (mistLife[i] >= 1.0) {
                    mistLife[i] = 0.0;
                    const ang = Math.random() * Math.PI * 2;
                    const rad = Math.random() * (puckRadius + 0.4);
                    pArr[i3] = px + rad * Math.cos(ang);
                    pArr[i3 + 1] = puckY + (Math.random() - 0.3) * puckHeight;
                    pArr[i3 + 2] = pz + rad * Math.sin(ang);

                    mistVel[i3] = (Math.random() - 0.5) * 1.4 + Math.cos(ang) * 0.9;
                    mistVel[i3 + 1] = -1.2 - Math.random() * 1.1; // Uap dingin tenggelam ke bawah
                    mistVel[i3 + 2] = (Math.random() - 0.5) * 1.4 + Math.sin(ang) * 0.9;
                } else {
                    pArr[i3] += mistVel[i3] * dt;
                    pArr[i3 + 1] += mistVel[i3 + 1] * dt;
                    pArr[i3 + 2] += mistVel[i3 + 2] * dt;
                    if (pArr[i3 + 1] < floorY + 0.2) {
                        pArr[i3 + 1] = floorY + 0.2;
                        mistVel[i3] *= 1.02;
                        mistVel[i3 + 2] *= 1.02;
                    }
                }
            }
            mistGeo.attributes.position.needsUpdate = true;
            mistMat.opacity = Math.min(0.62, ((96 - T) / 25.0) * 0.55);
        }

        // Perbarui Geometri 3D Garis Medan Magnet & Tabung Fluks Terkuantisasi
        const cosT = Math.cos(puckTheta);
        const sinT = Math.sin(puckTheta);
        const tangX = -sinT;
        const tangZ = cosT;

        const archHeight = 3.2 + B0 * 2.1;
        const repelRadius = puckRadius + 0.55;

        for (let f = 0; f < fieldLines.length; f++) {
            const item = fieldLines[f];
            const spec = item.spec;
            const posArr = item.pos;

            const isPinnedTube = isSuper && mode === 'type2' && spec.isPinnedCandidate;

            if (isPinnedTube) {
                item.mat.color.setHex(0xffdd00);
                item.mat.opacity = 0.92;
            } else {
                item.mat.color.setHex(0x00f3ff);
                item.mat.opacity = 0.42 + B0 * 0.28;
            }

            for (let s = 0; s <= lineSegs; s++) {
                const u = s / lineSegs; // 0 .. 1 dari rel N ke rel S
                const rBase = spec.rStart + (spec.rEnd - spec.rStart) * u;
                const yBase = trackTopY + Math.sin(u * Math.PI) * archHeight;

                let wx = rBase * cosT + spec.sOff * tangX;
                let wy = yBase;
                let wz = rBase * sinT + spec.sOff * tangZ;

                if (isSuper) {
                    if (isPinnedTube) {
                        // Garis fluks terkuantisasi menembus dan mengunci pusat cakram (Abrikosov Vortex)
                        const pinWeight = Math.exp(-Math.pow((wy - puckY) / 2.2, 2));
                        const targetPinX = px + (spec.rStart > trackRadius ? 0.85 : -0.85) * cosT + spec.sOff * 0.65 * tangX;
                        const targetPinZ = pz + (spec.rStart > trackRadius ? 0.85 : -0.85) * sinT + spec.sOff * 0.65 * tangZ;

                        wx += (targetPinX - wx) * pinWeight * 0.88;
                        wz += (targetPinZ - wz) * pinWeight * 0.88;
                    } else {
                        // Efek Meissner: membelokkan garis fluks menjauhi volume interior cakram
                        const dx = wx - px;
                        const dy = wy - puckY;
                        const dz = wz - pz;
                        const horizDist = Math.hypot(dx, dz) + 0.001;
                        const vertMask = Math.exp(-Math.pow(dy / (puckHeight * 1.45), 2));

                        if (horizDist < repelRadius && vertMask > 0.05) {
                            const pushOut = (repelRadius - horizDist) * vertMask * orderParam;
                            wx += (dx / horizDist) * pushOut;
                            wz += (dz / horizDist) * pushOut;
                            wy += (dy >= 0 ? 0.45 : -0.35) * pushOut;
                        }
                    }
                }

                const idx = s * 3;
                posArr[idx] = wx;
                posArr[idx + 1] = wy;
                posArr[idx + 2] = wz;
            }
            item.geo.attributes.position.needsUpdate = true;
        }

        controls.update();
        composer.render();
    }
    animate();

//]]>
  } catch (err) { console.error('Module script error:', err); }
})();