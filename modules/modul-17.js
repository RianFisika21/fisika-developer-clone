// Auto-generated module #17
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js Lengkap, Post-Processing (Bloom), dan CSS2DRenderer -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Dasbor Hologram Geospasial</h3>\r\n    \r\n    <div class="input-group">\r\n      <label>Dataset Telemetri</label>\r\n      <select id="dataset-select" style="width: 100%; padding: 8px; background: #0a0f18; color: #00f3ff; border: 1px solid rgba(0, 243, 255, 0.4); border-radius: 5px; font-family: \'Rajdhani\', sans-serif; font-weight: bold; font-size: 13px; cursor: pointer;">\r\n        <option value="disaster">🌋 Seismik &amp; Hidrometeorologi</option>\r\n        <option value="transport">🚄 Telemetri Transportasi Lintas Jawa</option>\r\n      </select>\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Faktor Pengali Intensitas <span id="val-scale" class="value-display">1.0 x</span></label>\r\n      <input type="range" id="scale-slider" min="0.5" max="1.6" step="0.1" value="1.0">\r\n    </div>\r\n    \r\n    <div class="input-group">\r\n      <label>Kecepatan Sapuan Radar <span id="val-radar" class="value-display">2.5 Hz</span></label>\r\n      <input type="range" id="radar-slider" min="0.0" max="6.0" step="0.5" value="2.5">\r\n    </div>\r\n\r\n    <div style="background: rgba(0, 243, 255, 0.08); border-left: 3px solid #00f3ff; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>INTERAKSI SPASIAL:</strong><br>\r\n        Klik pada <b>pilar data 3D</b> mana saja di peta untuk mengunci kamera dan membuka layar HUD telemetri koordinat tersebut!\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="geo-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.3); box-shadow: 0 5px 25px rgba(0,0,0,0.6); position: relative;"></div>\r\n    \r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-camera" style="background: rgba(0, 255, 170, 0.25); border: 1px solid #00ffaa; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🎥 AUTO-ROTATE: ON\r\n      </button>\r\n      <button id="btn-reset-view" style="background: rgba(255, 0, 85, 0.2); border: 1px solid #ff0055; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🌐 RESET KAMERA\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Ringkasan Telemetri -->\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.75); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.5); z-index: 10;">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00f3ff; letter-spacing: 1px;">TITIK ANOMALI TERTINGGI</div>\r\n      <div id="hud-peak-node" style="font-family: \'Orbitron\', monospace; font-size: 14px; color: #ff0055; font-weight: bold; margin-bottom: 4px;">Gunung Merapi (94%)</div>\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00ffaa; letter-spacing: 1px;">STATUS JARINGAN SENSOR</div>\r\n      <div id="hud-network" style="font-family: \'Orbitron\', monospace; font-size: 13px; color: #fff;">8/8 NODE AKTIF (ONLINE)</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #10
  try {
//<![CDATA[

    const container = document.getElementById('geo-canvas-container');
    const wrapper = document.getElementById('vis-panel-wrapper');

    // 1. SCENE & KAMERA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030508);
    scene.fog = new THREE.FogExp2(0x030508, 0.0045);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    const defaultCamPos = new THREE.Vector3(0, 48, 72);
    const defaultTarget = new THREE.Vector3(0, 2, 0);
    camera.position.copy(defaultCamPos);

    // 2. WEBGL RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 3. CSS2D RENDERER (HOLOGRAM HUD MENGAMBANG)
    const labelRenderer = new THREE.CSS2DRenderer();
    labelRenderer.setSize(container.clientWidth, container.clientHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.left = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';
    container.appendChild(labelRenderer.domElement);

    // 4. ORBIT CONTROLS
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.target.copy(defaultTarget);

    // 5. POST-PROCESSING (BLOOM)
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.4, 0.4, 0.82);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 6. TOPOGRAFI HOLOGRAM PULAU JAWA (TERRAIN MESH + RADAR SHADER)
    function getTerrainY(x, z) {
        // Siluet elips memanjang menyerupai kontur Pulau Jawa
        const nx = x / 54.0;
        const nz = (z - x * 0.11) / 16.5;
        const distSq = nx * nx + nz * nz;
        if (distSq > 1.15) return 0.0;

        const mask = Math.max(0.0, 1.0 - Math.pow(distSq / 1.15, 2.2));
        // Punggung pegunungan vulkanik di bagian tengah pulau
        const centralSpine = Math.exp(-nz * nz * 3.8) * 3.8;
        const peakWest = 3.2 * Math.exp(-((x + 36) * (x + 36) + (z + 2) * (z + 2)) / 24.0);
        const peakCenter = 4.2 * Math.exp(-((x + 10) * (x + 10) + (z - 2.5) * (z - 2.5)) / 18.0);
        const peakEast = 3.8 * Math.exp(-((x - 22) * (x - 22) + (z - 4) * (z - 4)) / 22.0);

        return mask * (1.1 + centralSpine + peakWest + peakCenter + peakEast);
    }

    const mapW = 130, mapD = 56, segW = 104, segD = 44;
    const terrainGeo = new THREE.PlaneGeometry(mapW, mapD, segW, segD);
    terrainGeo.rotateX(-Math.PI / 2);

    const tPos = terrainGeo.attributes.position.array;
    for (let i = 0; i < tPos.length; i += 3) {
        tPos[i + 1] = getTerrainY(tPos[i], tPos[i + 2]);
    }
    terrainGeo.computeVertexNormals();

    const terrainUniforms = {
        time: { value: 0 },
        radarSpeed: { value: 2.5 },
        landColor: { value: new THREE.Color(0x00f3ff) },
        seaColor: { value: new THREE.Color(0x07192b) },
        scanColor: { value: new THREE.Color(0x00ffaa) }
    };

    const terrainMat = new THREE.ShaderMaterial({
        uniforms: terrainUniforms,
        wireframe: true,
        transparent: true,
        vertexShader: `
            varying vec3 vPos;
            void main() {
                vPos = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            uniform float radarSpeed;
            uniform vec3 landColor;
            uniform vec3 seaColor;
            uniform vec3 scanColor;
            varying vec3 vPos;
            void main() {
                float isLand = smoothstep(0.05, 0.6, vPos.y);
                vec3 baseCol = mix(seaColor, landColor, isLand);
                
                // Sapuan gelombang radar melintasi koordinat X
                float wave = sin(vPos.x * 0.14 - time * radarSpeed);
                float scanBeam = smoothstep(0.92, 1.0, wave);
                
                vec3 finalCol = mix(baseCol, scanColor, scanBeam * (0.35 + 0.65 * isLand));
                float alpha = mix(0.22, 0.78, isLand) + scanBeam * 0.25;
                
                gl_FragColor = vec4(finalCol, alpha);
            }
        `
    });

    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    scene.add(terrainMesh);

    // 7. DATABASE TELEMETRI SPASIAL
    const datasets = {
        disaster: [
            { id: "MERAPI-01", name: "Gunung Merapi (DIY)", coords: "7.54° LS, 110.44° BT", x: -10, z: 3, value: 94, metric: "PGA 0.34g | Tremor Vulkanik", status: "SIAGA TINGGI" },
            { id: "SMG-ROB-02", name: "Semarang (Pantura)", coords: "6.95° LS, 110.42° BT", x: -8, z: -7, value: 88, metric: "Curah Hujan 142 mm/j | Rob +1.4m", status: "WASPADA ROB" },
            { id: "SMR-VOL-03", name: "Gunung Semeru (Jatim)", coords: "8.10° LS, 112.92° BT", x: 22, z: 4, value: 85, metric: "Amplitudo Lahar 28 mm", status: "WASPADA" },
            { id: "BDG-SES-04", name: "Cekungan Bandung", coords: "6.91° LS, 107.61° BT", x: -37, z: -2, value: 79, metric: "Hujan 98 mm/j | Sesar Lembang", status: "WASPADA" },
            { id: "SBY-HIL-05", name: "Hilir Brantas Surabaya", coords: "7.25° LS, 112.75° BT", x: 24, z: -4, value: 71, metric: "Debit 1.240 m³/s | Angin 35 kt", status: "PANTAU" },
            { id: "SLO-DAS-06", name: "DAS Bengawan Solo", coords: "7.57° LS, 110.82° BT", x: -2, z: 2, value: 64, metric: "TMA 8.2 m | Arus Deras", status: "NORMAL SIAGA" },
            { id: "BMS-SRY-07", name: "Lereng Slamet Banyumas", coords: "7.24° LS, 109.21° BT", x: -22, z: 1, value: 52, metric: "Kelembaban Tanah 74%", status: "AMAN" },
            { id: "CRB-PES-08", name: "Pesisir Cirebon", coords: "6.73° LS, 108.55° BT", x: -28, z: -7, value: 45, metric: "Gelombang Laut Jawa 1.6 m", status: "AMAN" }
        ],
        transport: [
            { id: "HUB-YK-01", name: "St. Yogyakarta Tugu", coords: "7.78° LS, 110.36° BT", x: -10, z: 4, value: 95, metric: "58 KA/hari | Okupansi 97%", status: "BEBAN PUNCAK" },
            { id: "HUB-SB-02", name: "St. Surabaya Gubeng", coords: "7.26° LS, 112.75° BT", x: 24, z: -4, value: 92, metric: "48 KA/hari | Telemetri Rel Optimal", status: "PADAT LANCAR" },
            { id: "HUB-SM-03", name: "St. Semarang Tawang", coords: "6.96° LS, 110.42° BT", x: -8, z: -7, value: 91, metric: "42 KA/hari | Elevasi Rel +0.8m", status: "AKTIF PENUH" },
            { id: "HUB-CN-04", name: "St. Cirebon Kejaksan", coords: "6.70° LS, 108.55° BT", x: -28, z: -7, value: 89, metric: "64 KA/hari | Simpul Utara-Tengah", status: "TRAFIK TINGGI" },
            { id: "HUB-BD-05", name: "St. Bandung Hall", coords: "6.91° LS, 107.60° BT", x: -37, z: -2, value: 86, metric: "31 KA/hari | Suhu Bogie 42°C", status: "NORMAL" },
            { id: "HUB-SL-06", name: "St. Solo Balapan", coords: "7.55° LS, 110.82° BT", x: -2, z: 2, value: 82, metric: "36 KA/hari | Integrasi Bandara", status: "LANCAR" },
            { id: "HUB-PW-07", name: "St. Purwokerto", coords: "7.41° LS, 109.22° BT", x: -22, z: 1, value: 68, metric: "28 KA/hari | Lintas Selatan", status: "LANCAR" },
            { id: "TOL-TJ-08", name: "Koridor Tol Trans-Jawa", coords: "7.38° LS, 111.45° BT", x: 9, z: -2, value: 61, metric: "Kecepatan Rata-rata 84 km/jam", status: "LANCAR" }
        ]
    };

    // 8. MEMBANGUN PILAR DATA 3D & GELOMBANG DENYUT
    const pillarsGroup = new THREE.Group();
    scene.add(pillarsGroup);

    const clickableMeshes = [];
    const pillarObjects = [];

    const unitBoxGeo = new THREE.BoxGeometry(1.7, 1, 1.7);
    unitBoxGeo.translate(0, 0.5, 0); // Titik tumpu tepat di dasar (Y=0)
    const unitEdgesGeo = new THREE.EdgesGeometry(unitBoxGeo);
    const ringGeo = new THREE.RingGeometry(1.4, 1.9, 24);
    ringGeo.rotateX(-Math.PI / 2);

    function getColorByValue(val) {
        if (val >= 85) return 0xff0055; // Merah Neon (Kritis/Puncak)
        if (val >= 65) return 0xffdd00; // Kuning Emas (Menengah/Waspada)
        return 0x00ffaa;                 // Hijau Cyan (Aman/Normal)
    }

    function buildPillars(datasetKey) {
        // Bersihkan pilar lama
        while (pillarsGroup.children.length > 0) {
            pillarsGroup.remove(pillarsGroup.children[0]);
        }
        clickableMeshes.length = 0;
        pillarObjects.length = 0;

        const dataList = datasets[datasetKey];
        let maxNode = dataList[0];

        dataList.forEach((item) => {
            if (item.value > maxNode.value) maxNode = item;

            const baseY = getTerrainY(item.x, item.z);
            const hexColor = getColorByValue(item.value);

            const mat = new THREE.MeshBasicMaterial({
                color: hexColor,
                transparent: true,
                opacity: 0.72
            });
            const mesh = new THREE.Mesh(unitBoxGeo, mat);
            mesh.position.set(item.x, baseY, item.z);
            mesh.scale.set(1, 0.1, 1); // Mulai dari bawah lalu tumbuh naik
            mesh.userData = item;

            const edgeMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.65 });
            const wireframe = new THREE.LineSegments(unitEdgesGeo, edgeMat);
            mesh.add(wireframe);

            // Cincin radar dasar untuk titik prioritas tinggi
            const ringMat = new THREE.MeshBasicMaterial({
                color: hexColor,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: item.value >= 75 ? 0.7 : 0.0
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.position.set(item.x, baseY + 0.12, item.z);

            pillarsGroup.add(mesh);
            pillarsGroup.add(ring);

            clickableMeshes.push(mesh);
            pillarObjects.push({
                mesh: mesh,
                ring: ring,
                data: item,
                baseY: baseY,
                currentH: 0.1
            });
        });

        document.getElementById('hud-peak-node').innerText = `${maxNode.name} (${maxNode.value}%)`;
    }

    // 9. FLOATING HOLOGRAM HUD (CSS2D) SAAT PILAR DIKLIK
    const hudDiv = document.createElement('div');
    hudDiv.style.cssText = "background: rgba(5, 10, 18, 0.9); border: 1px solid #00f3ff; border-left: 4px solid #ff0055; border-radius: 6px; padding: 10px 14px; color: #fff; font-family: 'Rajdhani', sans-serif; min-width: 195px; box-shadow: 0 0 18px rgba(0, 243, 255, 0.35); backdrop-filter: blur(4px);";
    const floatingHud = new THREE.CSS2DObject(hudDiv);
    floatingHud.visible = false;
    scene.add(floatingHud);

    let selectedPillar = null;
    let isCameraTransitioning = false;
    let desiredCamPos = defaultCamPos.clone();
    let desiredTarget = defaultTarget.clone();

    function selectPillar(pillarObj) {
        selectedPillar = pillarObj;
        isCameraTransitioning = true;
        isAutoRotate = false;
        controls.autoRotate = false;
        btnCamera.innerHTML = '🎥 AUTO-ROTATE: OFF';
        btnCamera.style.background = 'rgba(0, 255, 170, 0.1)';

        const d = pillarObj.data;
        const hexStr = '#' + getColorByValue(d.value).toString(16).padStart(6, '0');
        hudDiv.style.borderLeftColor = hexStr;
        hudDiv.innerHTML = `
            <div style="font-family: 'Orbitron', sans-serif; font-size: 9px; color: #00f3ff; letter-spacing: 1px;">ID: ${d.id} • ${d.coords}</div>
            <div style="font-family: 'Orbitron', sans-serif; font-size: 13px; font-weight: bold; color: #fff; margin: 3px 0;">${d.name}</div>
            <div style="font-size: 12px; color: #cbd5e1; margin-bottom: 5px;">${d.metric}</div>
            <div style="display: inline-block; font-family: 'Orbitron', sans-serif; font-size: 10px; font-weight: bold; color: #05070a; background: ${hexStr}; padding: 2px 7px; border-radius: 3px;">
                INDEKS: ${d.value}% (${d.status})
            </div>
        `;
        floatingHud.visible = true;
    }

    function resetCameraView() {
        selectedPillar = null;
        floatingHud.visible = false;
        isCameraTransitioning = true;
        desiredCamPos.copy(defaultCamPos);
        desiredTarget.copy(defaultTarget);
    }

    // 10. RAYCASTER UNTUK KLIK PILAR 3D
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };

    renderer.domElement.addEventListener('pointerdown', (e) => {
        pointerDownPos.x = e.clientX;
        pointerDownPos.y = e.clientY;
        isCameraTransitioning = false; // Hentikan animasi otomatis jika user menggeser manual
    });

    renderer.domElement.addEventListener('pointerup', (e) => {
        const moveDist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
        if (moveDist > 5) return; // Abaikan jika user sedang memutar (drag) kamera

        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(clickableMeshes, false);

        if (intersects.length > 0) {
            const hitMesh = intersects[0].object;
            const found = pillarObjects.find(p => p.mesh === hitMesh);
            if (found) selectPillar(found);
        }
    });

    // 11. EVENT LISTENER UI & KONTROL
    const datasetSelect = document.getElementById('dataset-select');
    const scaleSlider = document.getElementById('scale-slider');
    const radarSlider = document.getElementById('radar-slider');
    const btnCamera = document.getElementById('btn-camera');

    datasetSelect.addEventListener('change', () => {
        resetCameraView();
        buildPillars(datasetSelect.value);
    });

    scaleSlider.addEventListener('input', () => {
        document.getElementById('val-scale').innerText = parseFloat(scaleSlider.value).toFixed(1) + " x";
    });

    radarSlider.addEventListener('input', () => {
        const spd = parseFloat(radarSlider.value);
        document.getElementById('val-radar').innerText = spd.toFixed(1) + " Hz";
        terrainUniforms.radarSpeed.value = spd;
    });

    let isAutoRotate = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

    btnCamera.addEventListener('click', () => {
        isAutoRotate = !isAutoRotate;
        controls.autoRotate = isAutoRotate;
        btnCamera.innerHTML = isAutoRotate ? '🎥 AUTO-ROTATE: ON' : '🎥 AUTO-ROTATE: OFF';
        btnCamera.style.background = isAutoRotate ? 'rgba(0, 255, 170, 0.25)' : 'rgba(0, 255, 170, 0.1)';
    });

    document.getElementById('btn-reset-view').addEventListener('click', resetCameraView);

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
            labelRenderer.setSize(container.clientWidth, container.clientHeight);
        }, 100);
    });

    // Muat dataset awal
    buildPillars('disaster');

    // 12. ANIMATION LOOP
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();
        terrainUniforms.time.value = elapsed;

        const scaleMult = parseFloat(scaleSlider.value);

        // Animasi pertumbuhan pilar & denyut radar lokal
        for (let i = 0; i < pillarObjects.length; i++) {
            const p = pillarObjects[i];
            const targetH = (p.data.value / 100.0) * 16.0 * scaleMult;
            p.currentH += (targetH - p.currentH) * 0.08;
            p.mesh.scale.y = Math.max(0.1, p.currentH);

            if (p.data.value >= 75) {
                const pulse = 1.0 + ((elapsed * 1.6 + i * 0.4) % 1.0) * 1.8;
                p.ring.scale.set(pulse, pulse, 1);
                p.ring.material.opacity = (1.0 - (pulse - 1.0) / 1.8) * 0.75;
            }
        }

        // Update posisi HUD & transisi kamera jika pilar diklik
        if (selectedPillar) {
            const topY = selectedPillar.baseY + selectedPillar.currentH + 2.2;
            floatingHud.position.set(selectedPillar.data.x, topY, selectedPillar.data.z);

            if (isCameraTransitioning) {
                desiredTarget.set(selectedPillar.data.x, selectedPillar.baseY + selectedPillar.currentH * 0.55, selectedPillar.data.z);
                desiredCamPos.set(selectedPillar.data.x + 14, topY + 12, selectedPillar.data.z + 22);
                camera.position.lerp(desiredCamPos, 0.06);
                controls.target.lerp(desiredTarget, 0.08);
                if (camera.position.distanceTo(desiredCamPos) < 0.4) isCameraTransitioning = false;
            }
        } else if (isCameraTransitioning) {
            camera.position.lerp(desiredCamPos, 0.06);
            controls.target.lerp(desiredTarget, 0.08);
            if (camera.position.distanceTo(desiredCamPos) < 0.4) isCameraTransitioning = false;
        }

        controls.update();
        composer.render();
        labelRenderer.render(scene, camera);
    }
    animate();

//]]>
  } catch (err) { console.error('Module script error:', err); }
})();