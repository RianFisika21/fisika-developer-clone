// Auto-generated module #22
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js Lengkap & Post-Processing (Bloom) -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Reaktor Fusi Tokamak 3D</h3>\r\n\r\n    <div class="input-group">\r\n      <label>Medan Toroidal (Bφ) <span id="val-bt" class="value-display">5.3 Tesla</span></label>\r\n      <input type="range" id="bt-slider" min="2.0" max="12.0" step="0.1" value="5.3">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Arus Plasma Poloidal (Ip) <span id="val-ip" class="value-display">10.0 MA</span></label>\r\n      <input type="range" id="ip-slider" min="2.0" max="18.0" step="0.5" value="10.0">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Suhu Pemanasan Plasma (T) <span id="val-temp" class="value-display">150 Juta K</span></label>\r\n      <input type="range" id="temp-slider" min="20" max="220" step="5" value="150">\r\n    </div>\r\n\r\n    <div style="background: rgba(255, 0, 128, 0.1); border-left: 3px solid #ff007f; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>STABILITAS KURUNGAN (q &gt; 2):</strong><br>\r\n        Superposisi <b>Bφ</b> dan <b>Bθ</b> memilin garis magnetik secara heliks. Jika <b>Ip</b> terlalu besar sehingga <b>q &lt; 2</b>, ketidakstabilan <i>kink</i> akan memicu disrupsi plasma!\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="tokamak-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255, 0, 128, 0.35); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n\r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-camera" style="background: rgba(0, 243, 255, 0.22); border: 1px solid #00f3ff; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🎥 AUTO-ROTATE: ON\r\n      </button>\r\n      <button id="btn-nbi" style="background: rgba(255, 0, 128, 0.25); border: 1px solid #ff007f; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        ⚡ INJEKSI NBI / RESET\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Telemetri Kurungan Magnetik -->\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.78); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(255, 0, 128, 0.5);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #ff007f; letter-spacing: 1px;">FAKTOR KEAMANAN (q₉₅) &amp; STABILITAS</div>\r\n      <div id="hud-q" style="font-family: \'Orbitron\', monospace; font-size: 14px; color: #00ffaa; font-weight: bold; margin-bottom: 4px;">q = 2.65 — H-MODE STABIL</div>\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00f3ff; letter-spacing: 1px;">KRITERIA LAWSON &amp; GAIN FUSI (Q)</div>\r\n      <div id="hud-lawson" style="font-family: \'Orbitron\', monospace; font-size: 13px; color: #fff;">nTτ: 3.18×10²¹ keV·s/m³ | Gain Q: 10.6</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {
//<![CDATA[

    const container = document.getElementById('tokamak-canvas-container');
    const wrapper = document.getElementById('vis-panel-wrapper');

    // 1. SCENE & KAMERA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030409);
    scene.fog = new THREE.FogExp2(0x030409, 0.0055);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(34, 28, 44);

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0, 0);

    // 2. POST-PROCESSING (BLOOM PLASMA FUSI)
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.6, 0.5, 0.78);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 3. PENCAHAYAAN REAKTOR
    scene.add(new THREE.AmbientLight(0x1b263b));
    const plasmaLight = new THREE.PointLight(0xff2a85, 3.5, 80);
    plasmaLight.position.set(0, 0, 0);
    scene.add(plasmaLight);

    const rimLight = new THREE.DirectionalLight(0x66ccff, 0.9);
    rimLight.position.set(25, 40, 20);
    scene.add(rimLight);

    // 4. GEOMETRI STRUKTUR TOKAMAK
    const reactorGroup = new THREE.Group();
    scene.add(reactorGroup);

    const R0 = 17.5; // Radius mayor torus
    const rMinor = 5.8; // Radius minor plasma

    // A. Solenoid Pusat (Central Solenoid)
    const solenoidGeo = new THREE.CylinderGeometry(3.4, 3.4, 24, 28);
    const solenoidMat = new THREE.MeshStandardMaterial({
        color: 0x28384c,
        emissive: 0x051b33,
        metalness: 0.85,
        roughness: 0.25
    });
    const solenoid = new THREE.Mesh(solenoidGeo, solenoidMat);
    reactorGroup.add(solenoid);

    // Cincin induksi pada solenoid pusat
    const csRingGeo = new THREE.TorusGeometry(3.55, 0.16, 10, 32);
    csRingGeo.rotateX(Math.PI / 2);
    const csRingMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.55 });
    for (let y = -10; y <= 10; y += 2.5) {
        const ring = new THREE.Mesh(csRingGeo, csRingMat);
        ring.position.y = y;
        reactorGroup.add(ring);
    }

    // B. Kumparan Medan Poloidal (Poloidal Field Coils - Cincin Horizontal Luar)
    const pfRadii = [
        { r: 25.5, y: 7.5 },
        { r: 25.5, y: -7.5 },
        { r: 21.0, y: 11.2 },
        { r: 21.0, y: -11.2 }
    ];
    const pfMat = new THREE.MeshStandardMaterial({
        color: 0x1f364d,
        emissive: 0x003355,
        metalness: 0.8,
        roughness: 0.3
    });
    pfRadii.forEach(cfg => {
        const pfGeo = new THREE.TorusGeometry(cfg.r, 0.38, 12, 64);
        pfGeo.rotateX(Math.PI / 2);
        const pfMesh = new THREE.Mesh(pfGeo, pfMat);
        pfMesh.position.y = cfg.y;
        reactorGroup.add(pfMesh);
    });

    // C. 16 Kumparan Medan Toroidal Berbentuk-D (D-Shaped TF Coils)
    const dShape = new THREE.Shape();
    const dPoints = 40;
    for (let i = 0; i <= dPoints; i++) {
        const t = (i / dPoints) * Math.PI * 2;
        // Kurva D-shape Princeton menggunakan fungsi Bessel/sinusoidal
        const rx = 17.2 + 8.6 * Math.cos(t - 0.32 * Math.sin(t));
        const ry = 11.2 * Math.sin(t);
        if (i === 0) dShape.moveTo(rx, ry);
        else dShape.lineTo(rx, ry);
    }
    const tfCurvePts = dShape.getPoints(48).map(p => new THREE.Vector3(p.x, p.y, 0));
    const tfCurve = new THREE.CatmullRomCurve3(tfCurvePts, true);
    const tfTubeGeo = new THREE.TubeGeometry(tfCurve, 56, 0.34, 8, true);
    const tfMat = new THREE.MeshStandardMaterial({
        color: 0x3b526b,
        emissive: 0x072642,
        metalness: 0.85,
        roughness: 0.25,
        transparent: true,
        opacity: 0.72
    });

    const numTFCoils = 16;
    for (let k = 0; k < numTFCoils; k++) {
        const coil = new THREE.Mesh(tfTubeGeo, tfMat);
        coil.rotation.y = (k / numTFCoils) * Math.PI * 2;
        reactorGroup.add(coil);
    }

    // D. Dinding Vakum Transparan (First Wall Cage)
    const vesselGeo = new THREE.TorusGeometry(R0, rMinor + 1.1, 20, 48);
    vesselGeo.rotateX(Math.PI / 2);
    const vesselMat = new THREE.MeshBasicMaterial({
        color: 0x1b4965,
        wireframe: true,
        transparent: true,
        opacity: 0.14
    });
    reactorGroup.add(new THREE.Mesh(vesselGeo, vesselMat));

    // 5. INTI PLASMA TOROIDAL DENGAN SHADER TURBULENSI & KINK INSTABILITY
    const plasmaGeo = new THREE.TorusGeometry(R0, rMinor * 0.78, 36, 96);
    plasmaGeo.rotateX(Math.PI / 2);

    const plasmaUniforms = {
        time: { value: 0.0 },
        tempNorm: { value: 0.65 },
        kinkAmp: { value: 0.0 },
        twistRate: { value: 2.5 }
    };

    const plasmaMat = new THREE.ShaderMaterial({
        uniforms: plasmaUniforms,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        vertexShader: `
            uniform float time;
            uniform float kinkAmp;
            varying vec3 vNormal;
            varying vec3 vViewDir;
            varying vec3 vPos;
            void main() {
                vec3 p = position;
                float phi = atan(p.z, p.x);
                // Mode instabilitas kink (m=2, n=1) saat faktor keamanan q < 2
                float kink = kinkAmp * sin(2.0 * phi - time * 7.5);
                p.y += kink;
                p.x += cos(phi) * kink * 0.65;
                p.z += sin(phi) * kink * 0.65;

                vec4 worldPos = modelMatrix * vec4(p, 1.0);
                vPos = p;
                vNormal = normalize(normalMatrix * normal);
                vViewDir = normalize(cameraPosition - worldPos.xyz);
                gl_Position = projectionMatrix * viewMatrix * worldPos;
            }
        `,
        fragmentShader: `
            uniform float time;
            uniform float tempNorm;
            uniform float twistRate;
            varying vec3 vNormal;
            varying vec3 vViewDir;
            varying vec3 vPos;
            void main() {
                float phi = atan(vPos.z, vPos.x);
                float rDist = length(vPos.xz) - 17.5;
                float theta = atan(vPos.y, rDist);

                // Pita heliks plasma mengikuti garis medan magnet
                float helix1 = sin(3.0 * theta - twistRate * phi - time * 4.5);
                float helix2 = cos(5.0 * theta - (twistRate + 1.0) * phi + time * 3.2);
                float ripple = 0.65 + 0.35 * (0.6 * helix1 + 0.4 * helix2);

                // Fresnel edge glow
                float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewDir))), 1.6);

                // Gradasi suhu plasma: Oranye-Merah (rendah) -> Magenta-Violet (H-mode) -> Putih-Biru Fusi (150+ Juta K)
                vec3 colCool = vec3(1.0, 0.25, 0.05);
                vec3 colMid = vec3(1.0, 0.05, 0.55);
                vec3 colHot = vec3(0.75, 0.90, 1.0);

                vec3 baseCol = mix(colCool, colMid, smoothstep(0.0, 0.55, tempNorm));
                baseCol = mix(baseCol, colHot, smoothstep(0.55, 1.0, tempNorm));

                float alpha = clamp((0.28 + 0.52 * fresnel) * ripple, 0.12, 0.85);
                gl_FragColor = vec4(baseCol * (1.1 + 0.5 * tempNorm), alpha);
            }
        `
    });

    const plasmaMesh = new THREE.Mesh(plasmaGeo, plasmaMat);
    scene.add(plasmaMesh);

    // 6. GARIS MEDAN MAGNET HELIKS DINAMIS (HELICAL MAGNETIC FIELD LINES)
    const numFieldLines = 6;
    const segmentsPerLine = 260;
    const fieldLineObjects = [];

    for (let f = 0; f < numFieldLines; f++) {
        const fGeo = new THREE.BufferGeometry();
        const fPos = new Float32Array((segmentsPerLine + 1) * 3);
        fGeo.setAttribute('position', new THREE.BufferAttribute(fPos, 3));
        const fMat = new THREE.LineBasicMaterial({
            color: f % 2 === 0 ? 0x00f3ff : 0x00ffaa,
            transparent: true,
            opacity: 0.78
        });
        const fLine = new THREE.Line(fGeo, fMat);
        scene.add(fLine);
        fieldLineObjects.push({ line: fLine, positions: fPos, offset: (f / numFieldLines) * Math.PI * 2 });
    }

    // 7. 1.200 PARTIKEL ION PLASMA (DEUTERIUM, TRITIUM & PARTIKEL ALFA)
    const numParticles = 1200;
    const partGeo = new THREE.BufferGeometry();
    const partPos = new Float32Array(numParticles * 3);
    const partColors = new Float32Array(numParticles * 3);

    const pPhi = new Float32Array(numParticles);
    const pTheta = new Float32Array(numParticles);
    const pRad = new Float32Array(numParticles);
    const pSpeed = new Float32Array(numParticles);
    const pScatter = new Float32Array(numParticles);

    const colIon = new THREE.Color(0xff2a85);
    const colAlpha = new THREE.Color(0x00f3ff);
    const colGold = new THREE.Color(0xffdd00);

    for (let i = 0; i < numParticles; i++) {
        pPhi[i] = Math.random() * Math.PI * 2;
        pTheta[i] = Math.random() * Math.PI * 2;
        pRad[i] = 0.8 + Math.random() * (rMinor * 0.88);
        pSpeed[i] = 0.85 + Math.random() * 0.65;
        pScatter[i] = 0.0;

        const c = i % 5 === 0 ? colAlpha : (i % 3 === 0 ? colGold : colIon);
        partColors[i * 3] = c.r;
        partColors[i * 3 + 1] = c.g;
        partColors[i * 3 + 2] = c.b;
    }

    partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
    partGeo.setAttribute('color', new THREE.BufferAttribute(partColors, 3));

    const partMat = new THREE.PointsMaterial({
        size: 0.42,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(partGeo, partMat);
    scene.add(particleSystem);

    // 8. KONTROL UI & KALKULASI FISIKA TOKAMAK
    const btSlider = document.getElementById('bt-slider');
    const ipSlider = document.getElementById('ip-slider');
    const tempSlider = document.getElementById('temp-slider');
    const hudQ = document.getElementById('hud-q');
    const hudLawson = document.getElementById('hud-lawson');

    let safetyFactorQ = 2.65;
    let isDisrupted = false;
    let nbiBoost = 0.0;

    function updateTokamakPhysics() {
        const Bt = parseFloat(btSlider.value); // Tesla
        const Ip = parseFloat(ipSlider.value); // MA
        const T_MK = parseInt(tempSlider.value); // Juta Kelvin

        document.getElementById('val-bt').innerText = Bt.toFixed(1) + " Tesla";
        document.getElementById('val-ip').innerText = Ip.toFixed(1) + " MA";
        document.getElementById('val-temp').innerText = T_MK + " Juta K";

        // Kalkulasi faktor keamanan tepi q95 (geometri skala ITER: R=6.2m, a=2.0m, elongasi kappa=1.7)
        const Btheta = 0.1 * Ip;
        safetyFactorQ = (2.0 / 6.2) * (Bt / Btheta) * 1.55;

        // Perbarui laju pilinan garis medan magnetik (1 / q)
        const twist = Math.min(4.5, Math.max(0.25, 1.0 / safetyFactorQ));
        plasmaUniforms.twistRate.value = twist * 3.0;

        // Konversi suhu ke keV (1 keV ~ 11.6 Juta K) & Kriteria Lawson n*T*tau_E
        const T_keV = (T_MK + nbiBoost) / 11.6;
        const density = Math.min(1.5, 0.35 + 0.08 * Ip); // 10^20 m^-3
        const tauE = 0.38 * Math.pow(Ip / 10.0, 0.85) * Math.pow(Bt / 5.3, 0.3); // detik
        const tripleProduct = density * T_keV * tauE; // dalam satuan 10^21 keV*s/m^3

        // Faktor penguatan fusi Q (puncak reaktivitas D-T sekitar 13-18 keV / ~150-200 Juta K)
        const reactivity = Math.exp(-Math.pow((T_keV - 15.0) / 11.0, 2));
        const fusionGainQ = Math.max(0.0, tripleProduct * reactivity * 3.4);

        const tempNorm = Math.min(1.0, Math.max(0.0, (T_MK + nbiBoost - 20) / 200));
        plasmaUniforms.tempNorm.value = tempNorm;

        if (safetyFactorQ < 1.65) {
            isDisrupted = true;
            plasmaUniforms.kinkAmp.value = 1.65;
            hudQ.innerText = `q = ${safetyFactorQ.toFixed(2)} — DISRUPSI PLASMA (q < 2)!`;
            hudQ.style.color = "#ff0055";
            hudLawson.innerText = "KURUNGAN HILANG! Turunkan Ip atau Naikkan Bφ";
            plasmaLight.color.setHex(0xff0033);
        } else if (safetyFactorQ < 2.0) {
            isDisrupted = false;
            plasmaUniforms.kinkAmp.value = (2.0 - safetyFactorQ) * 2.4;
            hudQ.innerText = `q = ${safetyFactorQ.toFixed(2)} — PERINGATAN INSTABILITAS KINK`;
            hudQ.style.color = "#ffdd00";
            hudLawson.innerText = `nTτ: ${tripleProduct.toFixed(2)}×10²¹ keV·s/m³ | Gain Q: ${fusionGainQ.toFixed(1)}`;
            plasmaLight.color.setHex(0xff8800);
        } else {
            isDisrupted = false;
            plasmaUniforms.kinkAmp.value = 0.0;
            const regimeLabel = fusionGainQ >= 10.0 ? "IGNITION / Q ≥ 10" : "H-MODE STABIL";
            hudQ.innerText = `q = ${safetyFactorQ.toFixed(2)} — ${regimeLabel}`;
            hudQ.style.color = "#00ffaa";
            hudLawson.innerText = `nTτ: ${tripleProduct.toFixed(2)}×10²¹ keV·s/m³ | Gain Q: ${fusionGainQ.toFixed(1)}`;
            plasmaLight.color.setHex(tempNorm > 0.65 ? 0xaa66ff : 0xff2a85);
        }
    }

    [btSlider, ipSlider, tempSlider].forEach(el => el.addEventListener('input', updateTokamakPhysics));
    updateTokamakPhysics();

    // 9. TOMBOL INJEKSI NBI, AUTO-ROTATE & FULLSCREEN
    document.getElementById('btn-nbi').addEventListener('click', () => {
        if (safetyFactorQ < 1.65) {
            // Kembalikan arus plasma ke titik aman dan injeksikan pemanasan NBI
            ipSlider.value = "9.5";
        }
        nbiBoost = 45.0;
        for (let i = 0; i < numParticles; i++) {
            pScatter[i] = 0.0;
        }
        updateTokamakPhysics();
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

    // 10. ANIMATION LOOP
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const dt = Math.min(clock.getDelta(), 0.04);
        const elapsed = clock.getElapsedTime();
        plasmaUniforms.time.value = elapsed;

        if (nbiBoost > 0.1) {
            nbiBoost *= 0.985;
            if (nbiBoost <= 0.1) nbiBoost = 0.0;
            updateTokamakPhysics();
        }

        const Bt = parseFloat(btSlider.value);
        const invQ = 1.0 / Math.max(0.4, safetyFactorQ);

        // A. Perbarui Geometri Garis Medan Magnet Heliks (3 putaran toroidal)
        const totalTurns = 3.0 * Math.PI * 2.0;
        const rField = rMinor * 0.94;
        for (let f = 0; f < numFieldLines; f++) {
            const obj = fieldLineObjects[f];
            const posArr = obj.positions;
            for (let s = 0; s <= segmentsPerLine; s++) {
                const phi = (s / segmentsPerLine) * totalTurns + elapsed * 0.35;
                const theta = obj.offset + phi * invQ;
                const rCurr = R0 + rField * Math.cos(theta);
                const idx = s * 3;
                posArr[idx] = rCurr * Math.cos(phi);
                posArr[idx + 1] = rField * Math.sin(theta);
                posArr[idx + 2] = rCurr * Math.sin(phi);
            }
            obj.line.geometry.attributes.position.needsUpdate = true;
            obj.line.visible = !isDisrupted;
        }

        // B. Perbarui Lintasan 1.200 Ion Plasma & Partikel Alfa
        const torSpeed = (1.6 + Bt * 0.25);
        for (let i = 0; i < numParticles; i++) {
            pPhi[i] += torSpeed * pSpeed[i] * dt;
            pTheta[i] += torSpeed * pSpeed[i] * invQ * dt;

            if (isDisrupted) {
                pScatter[i] = Math.min(2.6, pScatter[i] + dt * 2.2);
            } else {
                pScatter[i] = Math.max(0.0, pScatter[i] - dt * 3.0);
            }

            const kinkOffset = plasmaUniforms.kinkAmp.value * Math.sin(2.0 * pPhi[i] - elapsed * 7.5);
            const rLocal = pRad[i] + pScatter[i];
            const rMajorEff = R0 + rLocal * Math.cos(pTheta[i]) + kinkOffset * 0.5;

            const idx3 = i * 3;
            partPos[idx3] = rMajorEff * Math.cos(pPhi[i]);
            partPos[idx3 + 1] = rLocal * Math.sin(pTheta[i]) + kinkOffset;
            partPos[idx3 + 2] = rMajorEff * Math.sin(pPhi[i]);
        }
        partGeo.attributes.position.needsUpdate = true;

        controls.update();
        composer.render();
    }
    animate();

//]]>
  } catch (err) { console.error('Module script error:', err); }
})();