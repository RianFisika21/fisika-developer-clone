// Auto-generated module #23
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js Lengkap & Post-Processing (Bloom) -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>CT-Scan &amp; Proyeksi Radon 3D</h3>\r\n\r\n    <div class="input-group">\r\n      <label>Tegangan Tabung (kVp) <span id="val-kvp" class="value-display">120 kVp</span></label>\r\n      <input type="range" id="kvp-slider" min="80" max="140" step="5" value="120">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Kecepatan Rotasi Gantry <span id="val-speed" class="value-display">0.60 rot/s</span></label>\r\n      <input type="range" id="speed-slider" min="0.10" max="1.80" step="0.10" value="0.60">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Kernel Filter FBP</label>\r\n      <select id="filter-select" style="width: 100%; padding: 8px; background: #0a0f18; color: #00f3ff; border: 1px solid rgba(0, 243, 255, 0.4); border-radius: 5px; font-family: \'Rajdhani\', sans-serif; font-weight: bold; font-size: 13px; cursor: pointer;">\r\n        <option value="ramlak">🔬 Ram-Lak (Tajam / Tulang)</option>\r\n        <option value="shepp">🧠 Shepp-Logan (Standar Otak)</option>\r\n        <option value="hamming">💧 Hamming (Halus / Rendah Derau)</option>\r\n      </select>\r\n    </div>\r\n\r\n    <div style="background: rgba(0, 243, 255, 0.08); border-left: 3px solid #00f3ff; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>TRANSFORMASI RADON &amp; FBP:</strong><br>\r\n        Setiap titik padat dalam objek membentuk kurva sinusoidal pada <b>Sinogram p(s,θ)</b>, lalu diproyeksikan balik dengan filter ramp untuk memulihkan nilai <b>Hounsfield Unit (HU)</b>.\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="ct-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.35); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n\r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-camera" style="background: rgba(0, 243, 255, 0.22); border: 1px solid #00f3ff; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🎥 AUTO-ROTATE: OFF\r\n      </button>\r\n      <button id="btn-tumor" style="background: rgba(255, 0, 85, 0.25); border: 1px solid #ff0055; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🎯 LESI TUMOR: AKTIF\r\n      </button>\r\n      <button id="btn-reset" style="background: rgba(0, 255, 170, 0.2); border: 1px solid #00ffaa; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🔄 ULANGI PINDAI\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Dosimetri & Rekonstruksi -->\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.78); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.5);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00f3ff; letter-spacing: 1px;">SUDUT GANTRY (θ) &amp; PROGRES PROYEKSI</div>\r\n      <div id="hud-angle" style="font-family: \'Orbitron\', monospace; font-size: 14px; color: #00ffaa; font-weight: bold; margin-bottom: 4px;">θ: 0.0° | Proyeksi: 0 / 90</div>\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #ffdd00; letter-spacing: 1px;">DOSIS RADIASI (CTDIvol) &amp; ATENUASI</div>\r\n      <div id="hud-dose" style="font-family: \'Orbitron\', monospace; font-size: 13px; color: #fff;">CTDIvol: 18.4 mGy | Lesi: +420 HU</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {
//<![CDATA[

    const container = document.getElementById('ct-canvas-container');
    const wrapper = document.getElementById('vis-panel-wrapper');

    // 1. SCENE & KAMERA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x03050a);
    scene.fog = new THREE.FogExp2(0x03050a, 0.005);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(16, 18, 56);

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(8, 0, 0);

    // 2. POST-PROCESSING (BLOOM)
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.35, 0.45, 0.8);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 3. PENCAHAYAAN RUANG CT-SCAN
    scene.add(new THREE.AmbientLight(0x223344));
    const keyLight = new THREE.DirectionalLight(0xaaddff, 1.1);
    keyLight.position.set(20, 35, 30);
    scene.add(keyLight);

    const tubeGlow = new THREE.PointLight(0x00f3ff, 2.2, 45);
    scene.add(tubeGlow);

    // 4. STRUKTUR GANTRY CT-SCAN & PHANTOM ANATOMI
    const scannerGroup = new THREE.Group();
    scannerGroup.position.set(-8, 0, 0);
    scene.add(scannerGroup);

    // Cincin Luar Statis Gantry (Bore Ring)
    const boreRadius = 15.5;
    const outerRingGeo = new THREE.TorusGeometry(boreRadius, 1.35, 16, 64);
    const outerRingMat = new THREE.MeshStandardMaterial({
        color: 0x1c2838,
        emissive: 0x051424,
        metalness: 0.85,
        roughness: 0.25
    });
    scannerGroup.add(new THREE.Mesh(outerRingGeo, outerRingMat));

    const trimRingGeo = new THREE.TorusGeometry(boreRadius - 1.35, 0.14, 8, 64);
    const trimRingMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.55 });
    const trimFront = new THREE.Mesh(trimRingGeo, trimRingMat);
    trimFront.position.z = 0.9;
    const trimBack = new THREE.Mesh(trimRingGeo, trimRingMat);
    trimBack.position.z = -0.9;
    scannerGroup.add(trimFront);
    scannerGroup.add(trimBack);

    // Meja Pasien Transparan (Patient Couch)
    const couchGeo = new THREE.BoxGeometry(10.5, 0.45, 26);
    const couchMat = new THREE.MeshStandardMaterial({
        color: 0x223344,
        transparent: true,
        opacity: 0.45,
        metalness: 0.6,
        roughness: 0.3
    });
    const couchMesh = new THREE.Mesh(couchGeo, couchMat);
    couchMesh.position.set(0, -6.8, 0);
    scannerGroup.add(couchMesh);

    // Phantom Kepala Shepp-Logan 3D di Pusat Isocenter
    const phantomGroup = new THREE.Group();
    scannerGroup.add(phantomGroup);

    // Kranium Luar (Tulang Tengkorak)
    const skullGeo = new THREE.CylinderGeometry(5.6, 5.6, 4.2, 40, 1, true);
    skullGeo.rotateX(Math.PI / 2);
    skullGeo.scale(0.86, 1.0, 1.0);
    const skullMat = new THREE.MeshBasicMaterial({
        color: 0x00f3ff,
        wireframe: true,
        transparent: true,
        opacity: 0.22
    });
    phantomGroup.add(new THREE.Mesh(skullGeo, skullMat));

    // Parenkim Otak (Jaringan Lunak)
    const brainGeo = new THREE.CylinderGeometry(5.1, 5.1, 3.8, 36);
    brainGeo.rotateX(Math.PI / 2);
    brainGeo.scale(0.86, 1.0, 1.0);
    const brainMat = new THREE.MeshStandardMaterial({
        color: 0x16425b,
        emissive: 0x061e2e,
        transparent: true,
        opacity: 0.35,
        roughness: 0.4
    });
    phantomGroup.add(new THREE.Mesh(brainGeo, brainMat));

    // Dua Ventrikel Serebral (Rongga Cairan CSF)
    const ventGeo = new THREE.CylinderGeometry(0.85, 0.85, 3.9, 20);
    ventGeo.rotateX(Math.PI / 2);
    ventGeo.scale(0.75, 1.45, 1.0);
    const ventMat = new THREE.MeshBasicMaterial({ color: 0x00ffaa, transparent: true, opacity: 0.25 });
    const ventLeft = new THREE.Mesh(ventGeo, ventMat);
    ventLeft.position.set(-1.35, 0.2, 0);
    const ventRight = new THREE.Mesh(ventGeo, ventMat);
    ventRight.position.set(1.35, 0.2, 0);
    phantomGroup.add(ventLeft);
    phantomGroup.add(ventRight);

    // Lesi / Tumor Berdensitas Tinggi (Kalsifikasi / Kontras Iodin)
    const tumorGeo = new THREE.SphereGeometry(0.95, 24, 24);
    const tumorMat = new THREE.MeshStandardMaterial({
        color: 0xff0055,
        emissive: 0x990033,
        roughness: 0.2
    });
    const tumorMesh = new THREE.Mesh(tumorGeo, tumorMat);
    tumorMesh.position.set(1.9, -1.65, 0);
    phantomGroup.add(tumorMesh);

    // 5. CARRIAGE BERPUTAR: TABUNG SINAR-X & BUSUR 64 DETEKTOR
    const rotatingCarriage = new THREE.Group();
    scannerGroup.add(rotatingCarriage);

    const sourceR = 13.0;
    const detRadius = 13.0;
    const numBins = 64;

    // Tabung Sinar-X (X-Ray Tube Housing) di (0, +sourceR, 0)
    const tubeHousing = new THREE.Mesh(
        new THREE.BoxGeometry(2.6, 1.8, 2.4),
        new THREE.MeshStandardMaterial({ color: 0x3b4d63, emissive: 0x002b49, metalness: 0.9, roughness: 0.2 })
    );
    tubeHousing.position.set(0, sourceR, 0);
    rotatingCarriage.add(tubeHousing);

    const focalSpot = new THREE.Mesh(
        new THREE.SphereGeometry(0.42, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    focalSpot.position.set(0, sourceR - 0.95, 0);
    rotatingCarriage.add(focalSpot);

    // Busur 64 Elemen Detektor Sintilasi di sisi berlawanan
    const detectorMeshes = [];
    const detCellGeo = new THREE.BoxGeometry(0.24, 0.55, 1.6);
    const detSpanAngle = 0.92; // radian

    for (let m = 0; m < numBins; m++) {
        const u = (m / (numBins - 1)) - 0.5; // -0.5 .. +0.5
        const alpha = u * detSpanAngle;
        const dx = detRadius * Math.sin(alpha);
        const dy = -detRadius * Math.cos(alpha);

        const dMat = new THREE.MeshBasicMaterial({ color: 0x00ffaa });
        const dMesh = new THREE.Mesh(detCellGeo, dMat);
        dMesh.position.set(dx, dy, 0);
        dMesh.rotation.z = alpha;
        rotatingCarriage.add(dMesh);
        detectorMeshes.push(dMesh);
    }

    // Berkas Kipas Sinar-X (64 Fan-Beam Rays)
    const beamPos = new Float32Array(numBins * 2 * 3);
    const beamColors = new Float32Array(numBins * 2 * 3);
    const beamGeo = new THREE.BufferGeometry();
    beamGeo.setAttribute('position', new THREE.BufferAttribute(beamPos, 3));
    beamGeo.setAttribute('color', new THREE.BufferAttribute(beamColors, 3));
    const beamMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.72,
        blending: THREE.AdditiveBlending
    });
    const fanBeamLines = new THREE.LineSegments(beamGeo, beamMat);
    rotatingCarriage.add(fanBeamLines);

    // 6. LAYAR HOLOGRAM 3D: SINOGRAM RADON & REKONSTRUKSI CITRA CT
    const gridN = 64;
    const numAngles = 90;

    // A. Canvas Sinogram (90 sudut x 64 kanal detektor)
    const sinoCanvas = document.createElement('canvas');
    sinoCanvas.width = numAngles;
    sinoCanvas.height = numBins;
    const sinoCtx = sinoCanvas.getContext('2d');
    sinoCtx.fillStyle = '#040914';
    sinoCtx.fillRect(0, 0, numAngles, numBins);
    const sinoTex = new THREE.CanvasTexture(sinoCanvas);
    sinoTex.magFilter = THREE.NearestFilter;

    // B. Canvas Rekonstruksi FBP (64 x 64 piksel)
    const reconCanvas = document.createElement('canvas');
    reconCanvas.width = gridN;
    reconCanvas.height = gridN;
    const reconCtx = reconCanvas.getContext('2d');
    reconCtx.fillStyle = '#040914';
    reconCtx.fillRect(0, 0, gridN, gridN);
    const reconTex = new THREE.CanvasTexture(reconCanvas);
    reconTex.magFilter = THREE.LinearFilter;

    function createHoloBoard(title, subtitle, texture, posY) {
        const boardGroup = new THREE.Group();
        boardGroup.position.set(22.5, posY, 0);

        const screenMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(13.5, 11.5),
            new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
        );
        boardGroup.add(screenMesh);

        const frameEdges = new THREE.LineSegments(
            new THREE.EdgesGeometry(new THREE.PlaneGeometry(13.8, 11.8)),
            new THREE.LineBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.85 })
        );
        boardGroup.add(frameEdges);

        // Label header kanvas kecil
        const hdrCanvas = document.createElement('canvas');
        hdrCanvas.width = 512;
        hdrCanvas.height = 64;
        const hCtx = hdrCanvas.getContext('2d');
        hCtx.fillStyle = '#061324';
        hCtx.fillRect(0, 0, 512, 64);
        hCtx.font = 'bold 24px monospace';
        hCtx.fillStyle = '#00f3ff';
        hCtx.fillText(title, 14, 28);
        hCtx.font = '18px monospace';
        hCtx.fillStyle = '#00ffaa';
        hCtx.fillText(subtitle, 14, 54);

        const hdrTex = new THREE.CanvasTexture(hdrCanvas);
        const hdrMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(13.8, 1.75),
            new THREE.MeshBasicMaterial({ map: hdrTex, side: THREE.DoubleSide })
        );
        hdrMesh.position.y = 6.9;
        boardGroup.add(hdrMesh);

        scene.add(boardGroup);
        return boardGroup;
    }

    createHoloBoard("SINOGRAM RADON p(s, θ)", "Sumbu X: Sudut θ (0°–180°) | Y: Kanal s", sinoTex, 7.6);
    createHoloBoard("REKONSTRUKSI FBP (HU)", "Filtered Back-Projection Irisan Aksial", reconTex, -7.8);

    // 7. MODEL MATEMATIKA PHANTOM & ALGORITMA FILTERED BACK-PROJECTION
    const phantomGrid = new Float32Array(gridN * gridN);
    const reconAccum = new Float32Array(gridN * gridN);
    const projDone = new Uint8Array(numAngles);
    const kernel = new Float32Array(numBins * 2 - 1);

    let hasTumor = true;
    let completedCount = 0;

    function buildPhantomData() {
        for (let j = 0; j < gridN; j++) {
            const y = ((j + 0.5) / gridN) * 2.0 - 1.0; // -1 .. +1
            for (let i = 0; i < gridN; i++) {
                const x = ((i + 0.5) / gridN) * 2.0 - 1.0;

                // Elips luar tengkorak (a=0.72, b=0.84)
                const rSkull = (x * x) / (0.72 * 0.72) + (y * y) / (0.84 * 0.84);
                // Elips dalam jaringan otak (a=0.63, b=0.75)
                const rBrain = (x * x) / (0.63 * 0.63) + (y * y) / (0.75 * 0.75);

                let mu = 0.0;
                if (rSkull <= 1.0) {
                    if (rBrain > 1.0) {
                        mu = 1.0; // Tulang tengkorak padat (+1000 HU)
                    } else {
                        mu = 0.28; // Parenkim otak (+35 HU)

                        // Dua ventrikel cairan CSF (-5 HU -> mu lebih rendah)
                        const v1 = ((x + 0.22) * (x + 0.22)) / (0.10 * 0.10) + ((y + 0.04) * (y + 0.04)) / (0.22 * 0.22);
                        const v2 = ((x - 0.22) * (x - 0.22)) / (0.10 * 0.10) + ((y + 0.04) * (y + 0.04)) / (0.22 * 0.22);
                        if (v1 <= 1.0 || v2 <= 1.0) {
                            mu = 0.08;
                        }

                        // Lesi tumor dengan penyangatan kontras (+420 HU)
                        if (hasTumor) {
                            const dxT = x - 0.30;
                            const dyT = y - 0.26;
                            if (dxT * dxT + dyT * dyT <= 0.14 * 0.14) {
                                mu = 0.78;
                            }
                        }
                    }
                }
                phantomGrid[j * gridN + i] = mu;
            }
        }
    }

    function buildFilterKernel(filterType) {
        const center = numBins - 1;
        for (let k = 0; k < kernel.length; k++) {
            const n = k - center;
            let h = 0.0;
            if (n === 0) {
                h = 0.25;
            } else if (Math.abs(n) % 2 === 1) {
                h = -1.0 / (Math.PI * Math.PI * n * n);
            }

            // Modulasi jendela frekuensi
            const normFreq = Math.min(1.0, Math.abs(n) / (numBins * 0.5));
            if (filterType === 'shepp') {
                const w = normFreq === 0 ? 1.0 : Math.sin(0.5 * Math.PI * normFreq) / (0.5 * Math.PI * normFreq);
                h *= w;
            } else if (filterType === 'hamming') {
                const w = 0.54 + 0.46 * Math.cos(Math.PI * normFreq);
                h *= w;
            }
            kernel[k] = h;
        }
    }

    function resetScan() {
        buildPhantomData();
        buildFilterKernel(document.getElementById('filter-select').value);
        reconAccum.fill(0.0);
        projDone.fill(0);
        completedCount = 0;

        sinoCtx.fillStyle = '#040914';
        sinoCtx.fillRect(0, 0, numAngles, numBins);
        sinoTex.needsUpdate = true;

        reconCtx.fillStyle = '#040914';
        reconCtx.fillRect(0, 0, gridN, gridN);
        reconTex.needsUpdate = true;
    }

    const rawProj = new Float32Array(numBins);
    const filteredProj = new Float32Array(numBins);

    function computeRadonAtAngle(theta) {
        const kvp = parseInt(document.getElementById('kvp-slider').value);
        // kVp rendah meningkatkan koefisien atenuasi fotolistrik, tetapi menaikkan derau kuantum
        const contrastScale = Math.pow(120.0 / kvp, 0.45);
        const noiseAmp = 0.018 * Math.pow(120.0 / kvp, 1.6);

        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);
        const ds = 2.0 / gridN;
        const steps = 72;
        const dt = 2.2 / steps;

        for (let m = 0; m < numBins; m++) {
            const s = (m - (numBins - 1) * 0.5) * ds;
            let integral = 0.0;

            for (let st = 0; st < steps; st++) {
                const t = -1.1 + (st + 0.5) * dt;
                const x = s * cosT - t * sinT;
                const y = s * sinT + t * cosT;

                const gi = Math.floor((x + 1.0) * 0.5 * gridN);
                const gj = Math.floor((y + 1.0) * 0.5 * gridN);
                if (gi >= 0 && gi < gridN && gj >= 0 && gj < gridN) {
                    integral += phantomGrid[gj * gridN + gi] * dt;
                }
            }

            const noisyVal = Math.max(0.0, integral * contrastScale + (Math.random() - 0.5) * noiseAmp);
            rawProj[m] = noisyVal;
        }
        return rawProj;
    }

    function processProjectionIndex(kIdx) {
        if (projDone[kIdx]) return;
        projDone[kIdx] = 1;
        completedCount++;

        const theta = (kIdx / numAngles) * Math.PI;
        const proj = computeRadonAtAngle(theta);

        // 1. Gambar satu kolom pada Sinogram Canvas
        const imgCol = sinoCtx.createImageData(1, numBins);
        for (let m = 0; m < numBins; m++) {
            const norm = Math.min(1.0, proj[m] / 0.85);
            const p4 = m * 4;
            imgCol.data[p4] = Math.floor(norm * 40 + Math.pow(norm, 2.2) * 215);
            imgCol.data[p4 + 1] = Math.floor(norm * 235);
            imgCol.data[p4 + 2] = Math.floor(35 + norm * 220);
            imgCol.data[p4 + 3] = 255;
        }
        sinoCtx.putImageData(imgCol, kIdx, 0);
        sinoTex.needsUpdate = true;

        // 2. Konvolusi 1D dengan Kernel Ramp (Filtered Back-Projection)
        const center = numBins - 1;
        for (let m = 0; m < numBins; m++) {
            let sum = 0.0;
            for (let j = 0; j < numBins; j++) {
                sum += proj[j] * kernel[m - j + center];
            }
            filteredProj[m] = sum;
        }

        // 3. Proyeksi Balik ke Matriks Citra CT
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);
        const invDs = gridN * 0.5;
        const halfBins = (numBins - 1) * 0.5;

        for (let j = 0; j < gridN; j++) {
            const y = ((j + 0.5) / gridN) * 2.0 - 1.0;
            for (let i = 0; i < gridN; i++) {
                const x = ((i + 0.5) / gridN) * 2.0 - 1.0;
                const s = x * cosT + y * sinT;
                const binFloat = s * invDs + halfBins;
                const b0 = Math.floor(binFloat);
                if (b0 >= 0 && b0 < numBins - 1) {
                    const frac = binFloat - b0;
                    const val = filteredProj[b0] * (1.0 - frac) + filteredProj[b0 + 1] * frac;
                    reconAccum[j * gridN + i] += val;
                }
            }
        }

        // 4. Render Ulang Kanvas Citra Rekonstruksi
        const reconImg = reconCtx.createImageData(gridN, gridN);
        const normScale = (Math.PI / completedCount) * 8.2;
        for (let idx = 0; idx < gridN * gridN; idx++) {
            const v = Math.max(0.0, Math.min(1.0, reconAccum[idx] * normScale));
            const p4 = idx * 4;
            reconImg.data[p4] = Math.floor(v * 235);
            reconImg.data[p4 + 1] = Math.floor(Math.min(255, v * 255 + (v > 0.15 && v < 0.5 ? 22 : 0)));
            reconImg.data[p4 + 2] = Math.floor(Math.min(255, v * 255 + (v > 0.1 ? 35 : 0)));
            reconImg.data[p4 + 3] = 255;
        }
        reconCtx.putImageData(reconImg, 0, 0);
        reconTex.needsUpdate = true;
    }

    // 8. EVENT LISTENER UI & KONTROL
    const kvpSlider = document.getElementById('kvp-slider');
    const speedSlider = document.getElementById('speed-slider');
    const filterSelect = document.getElementById('filter-select');
    const hudAngle = document.getElementById('hud-angle');
    const hudDose = document.getElementById('hud-dose');

    function updateDosimetryHUD(angleDeg) {
        const kvp = parseInt(kvpSlider.value);
        // CTDIvol sebanding dengan kuadrat tegangan tabung (kVp^2.1)
        const ctdi = 18.4 * Math.pow(kvp / 120.0, 2.1);
        const lesionStr = hasTumor ? "Lesi: +420 HU" : "Lesi: Tidak Ada";
        hudAngle.innerText = `θ: ${angleDeg.toFixed(1)}° | Proyeksi: ${completedCount} / ${numAngles}`;
        hudDose.innerText = `CTDIvol: ${ctdi.toFixed(1)} mGy | ${lesionStr}`;
    }

    kvpSlider.addEventListener('input', () => {
        document.getElementById('val-kvp').innerText = kvpSlider.value + " kVp";
        resetScan();
    });

    speedSlider.addEventListener('input', () => {
        document.getElementById('val-speed').innerText = parseFloat(speedSlider.value).toFixed(2) + " rot/s";
    });

    filterSelect.addEventListener('change', resetScan);

    const btnTumor = document.getElementById('btn-tumor');
    btnTumor.addEventListener('click', () => {
        hasTumor = !hasTumor;
        tumorMesh.visible = hasTumor;
        btnTumor.innerHTML = hasTumor ? '🎯 LESI TUMOR: AKTIF' : '🎯 LESI TUMOR: NONAKTIF';
        btnTumor.style.background = hasTumor ? 'rgba(255, 0, 85, 0.25)' : 'rgba(255, 0, 85, 0.08)';
        resetScan();
    });

    document.getElementById('btn-reset').addEventListener('click', resetScan);

    let isAutoRotate = false;
    controls.autoRotate = false;
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

    resetScan();

    // 9. ANIMATION LOOP
    const clock = new THREE.Clock();
    let gantryAngle = 0.0;
    const colHighTrans = new THREE.Color(0x00f3ff);
    const colLowTrans = new THREE.Color(0xff0055);
    const tmpRayCol = new THREE.Color();

    function animate() {
        requestAnimationFrame(animate);
        const dt = Math.min(clock.getDelta(), 0.05);
        const rotPerSec = parseFloat(speedSlider.value);

        const prevAngle = gantryAngle;
        gantryAngle = (gantryAngle + rotPerSec * Math.PI * 2.0 * dt) % (Math.PI * 2.0);
        rotatingCarriage.rotation.z = -gantryAngle;

        // Perbarui posisi lampu tabung sinar-X
        tubeGlow.position.set(
            scannerGroup.position.x + sourceR * Math.sin(gantryAngle),
            sourceR * Math.cos(gantryAngle),
            0
        );

        // Proses sudut proyeksi yang dilewati gantry pada frame ini
        const stepsToCheck = 4;
        for (let s = 1; s <= stepsToCheck; s++) {
            const interpAngle = (prevAngle + ((gantryAngle - prevAngle + Math.PI * 2.0) % (Math.PI * 2.0)) * (s / stepsToCheck)) % Math.PI;
            const kIdx = Math.floor((interpAngle / Math.PI) * numAngles) % numAngles;
            processProjectionIndex(kIdx);
        }

        // Hitung atenuasi sinar-X aktual untuk memvisualisasikan kipas sinar & nyala detektor
        const liveProj = computeRadonAtAngle(gantryAngle % Math.PI);
        const srcX = 0;
        const srcY = sourceR - 0.95;

        for (let m = 0; m < numBins; m++) {
            const dMesh = detectorMeshes[m];
            // Hukum Beer-Lambert: I / I0 = exp(-integral mu ds)
            const transmission = Math.exp(-liveProj[m] * 2.35);
            tmpRayCol.lerpColors(colLowTrans, colHighTrans, transmission);

            dMesh.material.color.copy(tmpRayCol);
            dMesh.scale.y = 0.45 + transmission * 0.95;

            const idx6 = m * 6;
            beamPos[idx6] = srcX;
            beamPos[idx6 + 1] = srcY;
            beamPos[idx6 + 2] = 0;
            beamPos[idx6 + 3] = dMesh.position.x;
            beamPos[idx6 + 4] = dMesh.position.y;
            beamPos[idx6 + 5] = 0;

            beamColors[idx6] = 0.85;
            beamColors[idx6 + 1] = 0.98;
            beamColors[idx6 + 2] = 1.0;
            beamColors[idx6 + 3] = tmpRayCol.r;
            beamColors[idx6 + 4] = tmpRayCol.g;
            beamColors[idx6 + 5] = tmpRayCol.b;
        }
        beamGeo.attributes.position.needsUpdate = true;
        beamGeo.attributes.color.needsUpdate = true;

        updateDosimetryHUD(gantryAngle * (180.0 / Math.PI));

        controls.update();
        composer.render();
    }
    animate();

//]]>
  } catch (err) { console.error('Module script error:', err); }
})();