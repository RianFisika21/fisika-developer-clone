// Auto-generated module #18
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js Lengkap & Post-Processing (Bloom) -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Radiasi Cherenkov Reaktor 3D</h3>\r\n\r\n    <div class="input-group">\r\n      <label>Medium Dielektrik (n)</label>\r\n      <select id="medium-select" style="width: 100%; padding: 8px; background: #0a0f18; color: #00f3ff; border: 1px solid rgba(0, 243, 255, 0.4); border-radius: 5px; font-family: \'Rajdhani\', sans-serif; font-weight: bold; font-size: 13px; cursor: pointer;">\r\n        <option value="1.333">💧 Air Ringan H₂O (n = 1.333)</option>\r\n        <option value="1.328">⚛️ Air Berat D₂O (n = 1.328)</option>\r\n        <option value="1.490">🔷 Akrilik / PMMA (n = 1.490)</option>\r\n        <option value="1.650">🛡️ Kaca Timbal Pb (n = 1.650)</option>\r\n      </select>\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Kecepatan Relativistik (β = v/c) <span id="val-beta" class="value-display">0.90 c</span></label>\r\n      <input type="range" id="beta-slider" min="0.50" max="0.99" step="0.01" value="0.90">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Insersi Batang Kendali (B₄C) <span id="val-rod" class="value-display">20 %</span></label>\r\n      <input type="range" id="rod-slider" min="0" max="100" step="5" value="20">\r\n    </div>\r\n\r\n    <div style="background: rgba(0, 136, 255, 0.1); border-left: 3px solid #0088ff; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>SYARAT AMBANG CHERENKOV:</strong><br>\r\n        Kerucut cahaya biru terbentuk hanya jika <b>β &gt; 1/n</b>, dengan sudut bukaan <b>cos θ = 1 / (n·β)</b>.\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="cherenkov-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 136, 255, 0.35); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n\r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-camera" style="background: rgba(0, 136, 255, 0.25); border: 1px solid #0088ff; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🎥 AUTO-ROTATE: ON\r\n      </button>\r\n      <button id="btn-pulse" style="background: rgba(0, 255, 170, 0.2); border: 1px solid #00ffaa; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        ☢️ PULSA FISI\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Parameter Cherenkov -->\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.75); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(0, 136, 255, 0.5);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00f3ff; letter-spacing: 1px;">SUDUT KERUCUT CHERENKOV (θc)</div>\r\n      <div id="hud-angle" style="font-family: \'Orbitron\', monospace; font-size: 16px; color: #00aaff; font-weight: bold; margin-bottom: 4px;">33.56°</div>\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00ffaa; letter-spacing: 1px;">AMBANG BATAS &amp; YIELD FOTON</div>\r\n      <div id="hud-yield" style="font-family: \'Orbitron\', monospace; font-size: 13px; color: #fff;">β_min: 0.750 c | Yield: 30.6%</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {
//<![CDATA[

    const container = document.getElementById('cherenkov-canvas-container');
    const wrapper = document.getElementById('vis-panel-wrapper');

    // 1. SCENE & KAMERA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x02040a);
    scene.fog = new THREE.FogExp2(0x02040a, 0.008);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(42, 28, 52);

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0, 0);

    // 2. POST-PROCESSING (BLOOM UNTUK CAHAYA BIRU CHERENKOV)
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.8, 0.5, 0.78);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 3. PENCAHAYAAN TERAS REAKTOR
    scene.add(new THREE.AmbientLight(0x112233));
    const coreGlowLight = new THREE.PointLight(0x0077ff, 3.0, 90);
    coreGlowLight.position.set(0, 0, 0);
    scene.add(coreGlowLight);

    const topLight = new THREE.DirectionalLight(0x88ccff, 0.6);
    topLight.position.set(20, 40, 20);
    scene.add(topLight);

    // 4. STRUKTUR TERAS REAKTOR & FUEL ASSEMBLY
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Tangki Kolam Pendingin (Wireframe Silinder)
    const poolRadius = 26;
    const poolHeight = 42;
    const poolGeo = new THREE.CylinderGeometry(poolRadius, poolRadius, poolHeight, 36, 1, true);
    const poolMat = new THREE.MeshBasicMaterial({ color: 0x0066cc, wireframe: true, transparent: true, opacity: 0.12 });
    coreGroup.add(new THREE.Mesh(poolGeo, poolMat));

    // Pelat Grid Atas & Bawah Teras
    const plateGeo = new THREE.CylinderGeometry(14, 14, 1.2, 24);
    const plateMat = new THREE.MeshStandardMaterial({ color: 0x2a3644, metalness: 0.8, roughness: 0.3 });
    const topPlate = new THREE.Mesh(plateGeo, plateMat);
    topPlate.position.y = 13;
    const bottomPlate = new THREE.Mesh(plateGeo, plateMat);
    bottomPlate.position.y = -13;
    coreGroup.add(topPlate);
    coreGroup.add(bottomPlate);

    // Susunan 4x4 Batang Bahan Bakar (Fuel Rods)
    const fuelRodGeo = new THREE.CylinderGeometry(0.65, 0.65, 25, 12);
    const fuelRodMat = new THREE.MeshStandardMaterial({
        color: 0x4b5d73,
        emissive: 0x002244,
        metalness: 0.85,
        roughness: 0.25
    });

    const spacing = 4.2;
    for (let ix = 0; ix < 4; ix++) {
        for (let iz = 0; iz < 4; iz++) {
            const rod = new THREE.Mesh(fuelRodGeo, fuelRodMat);
            rod.position.set((ix - 1.5) * spacing, 0, (iz - 1.5) * spacing);
            coreGroup.add(rod);
        }
    }

    // 4 Batang Kendali Penyerap Neutron (Boron Carbide)
    const controlRodsGroup = new THREE.Group();
    coreGroup.add(controlRodsGroup);

    const cRodGeo = new THREE.CylinderGeometry(0.55, 0.55, 24, 12);
    const cRodMat = new THREE.MeshStandardMaterial({
        color: 0xff2255,
        emissive: 0x330011,
        metalness: 0.7,
        roughness: 0.3
    });

    const cOffsets = [-spacing * 0.5, spacing * 0.5];
    for (let i = 0; i < cOffsets.length; i++) {
        for (let j = 0; j < cOffsets.length; j++) {
            const cRod = new THREE.Mesh(cRodGeo, cRodMat);
            cRod.position.set(cOffsets[i], 0, cOffsets[j]);
            controlRodsGroup.add(cRod);
        }
    }

    // 5. SISTEM PARTIKEL BETA & KERUCUT GELOMBANG KEJUT CHERENKOV
    // ConeGeometry dengan apex tepat di (0,0,0) mengarah ke +Y, membuka ke -Y
    const coneHeight = 7.5;
    const baseConeGeo = new THREE.ConeGeometry(1.0, coneHeight, 20, 1, true);
    baseConeGeo.translate(0, -coneHeight * 0.5, 0);

    const coneUniforms = {
        coreColor: { value: new THREE.Color(0xcceeff) },
        edgeColor: { value: new THREE.Color(0x0066ff) },
        intensity: { value: 0.75 }
    };

    const coneMat = new THREE.ShaderMaterial({
        uniforms: coneUniforms,
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
            uniform vec3 coreColor;
            uniform vec3 edgeColor;
            uniform float intensity;
            varying vec2 vUv;
            void main() {
                float axialFade = pow(vUv.y, 1.7);
                vec3 finalCol = mix(edgeColor, coreColor, pow(vUv.y, 3.2));
                gl_FragColor = vec4(finalCol, axialFade * intensity);
            }
        `
    });

    const particleGeo = new THREE.SphereGeometry(0.32, 8, 8);
    const particleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const maxParticles = 85;
    const emitters = [];
    const upAxis = new THREE.Vector3(0, 1, 0);

    function spawnEmitter(isBurst) {
        const pGroup = new THREE.Group();
        const dot = new THREE.Mesh(particleGeo, particleMat);
        const cone = new THREE.Mesh(baseConeGeo, coneMat);
        pGroup.add(dot);
        pGroup.add(cone);
        scene.add(pGroup);

        const data = {
            group: pGroup,
            cone: cone,
            pos: new THREE.Vector3(),
            dir: new THREE.Vector3(),
            life: 0,
            maxLife: 1.0
        };
        resetEmitter(data, isBurst);
        return data;
    }

    function resetEmitter(item, isBurst) {
        // Muncul dari sekitar matriks batang bahan bakar
        item.pos.set(
            (Math.random() - 0.5) * 11,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 11
        );
        item.dir.set(
            Math.random() - 0.5,
            (Math.random() - 0.5) * 0.65,
            Math.random() - 0.5
        ).normalize();

        item.life = isBurst ? 0 : Math.random();
        item.maxLife = 0.75 + Math.random() * 0.5;
        item.group.position.copy(item.pos);
        item.group.quaternion.setFromUnitVectors(upAxis, item.dir);
    }

    for (let i = 0; i < maxParticles; i++) {
        emitters.push(spawnEmitter(false));
    }

    // 6. LOGIKA FISIKA CHERENKOV & UI
    const mediumSelect = document.getElementById('medium-select');
    const betaSlider = document.getElementById('beta-slider');
    const rodSlider = document.getElementById('rod-slider');
    const hudAngle = document.getElementById('hud-angle');
    const hudYield = document.getElementById('hud-yield');

    let currentThetaRad = 0;
    let isCherenkovActive = true;
    let frankTammFactor = 0.3;
    let activeRatio = 0.8;

    function updateCherenkovPhysics() {
        const n = parseFloat(mediumSelect.value);
        const beta = parseFloat(betaSlider.value);
        const rodInsert = parseInt(rodSlider.value);

        document.getElementById('val-beta').innerText = beta.toFixed(2) + " c";
        document.getElementById('val-rod').innerText = rodInsert + " %";

        // Posisi vertikal batang kendali: 0% -> Y = 22 (di luar teras), 100% -> Y = 0 (masuk penuh)
        controlRodsGroup.position.y = (1.0 - rodInsert / 100.0) * 22.0;

        // Fluks partikel beta aktif berbanding terbalik dengan insersi batang kendali
        activeRatio = Math.max(0.05, 1.0 - (rodInsert / 100.0) * 0.92);

        const betaThreshold = 1.0 / n;
        const cosTheta = 1.0 / (n * beta);

        if (cosTheta < 1.0) {
            isCherenkovActive = true;
            currentThetaRad = Math.acos(cosTheta);
            const thetaDeg = currentThetaRad * (180.0 / Math.PI);

            // Persamaan Frank-Tamm: intensitas sebanding dengan sin^2(theta_c)
            frankTammFactor = 1.0 - (cosTheta * cosTheta);

            hudAngle.innerText = thetaDeg.toFixed(2) + "°";
            hudAngle.style.color = "#00aaff";
            hudYield.innerText = `β_min: ${betaThreshold.toFixed(3)} c | Yield: ${(frankTammFactor * 100).toFixed(1)}%`;

            coneUniforms.intensity.value = Math.min(0.95, 0.35 + frankTammFactor * 1.1);
            coreGlowLight.intensity = (1.5 + frankTammFactor * 4.5) * activeRatio;
        } else {
            isCherenkovActive = false;
            currentThetaRad = 0;
            frankTammFactor = 0;

            hudAngle.innerText = "SUB-THRESHOLD (0.00°)";
            hudAngle.style.color = "#ff0055";
            hudYield.innerText = `Syarat β > ${betaThreshold.toFixed(3)} c tidak terpenuhi`;

            coneUniforms.intensity.value = 0.0;
            coreGlowLight.intensity = 0.25;
        }
    }

    [mediumSelect, betaSlider, rodSlider].forEach(el => el.addEventListener('input', updateCherenkovPhysics));
    updateCherenkovPhysics();

    // 7. KONTROL KAMERA, PULSA FISI & FULLSCREEN
    let isAutoRotate = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.7;

    const btnCamera = document.getElementById('btn-camera');
    btnCamera.addEventListener('click', () => {
        isAutoRotate = !isAutoRotate;
        controls.autoRotate = isAutoRotate;
        btnCamera.innerHTML = isAutoRotate ? '🎥 AUTO-ROTATE: ON' : '🎥 AUTO-ROTATE: OFF';
        btnCamera.style.background = isAutoRotate ? 'rgba(0, 136, 255, 0.25)' : 'rgba(0, 136, 255, 0.1)';
    });

    document.getElementById('btn-pulse').addEventListener('click', () => {
        for (let i = 0; i < emitters.length; i++) {
            resetEmitter(emitters[i], true);
        }
        if (isCherenkovActive) {
            coreGlowLight.intensity = 7.5;
        }
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

    // 8. ANIMATION LOOP
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const dt = Math.min(clock.getDelta(), 0.05);
        const beta = parseFloat(betaSlider.value);

        const activeCount = Math.floor(maxParticles * activeRatio);
        const coneRadius = isCherenkovActive ? Math.min(9.5, coneHeight * Math.tan(currentThetaRad)) : 0.01;
        const speedVis = beta * 28.0;

        for (let i = 0; i < maxParticles; i++) {
            const item = emitters[i];
            if (i >= activeCount) {
                item.group.visible = false;
                continue;
            }

            item.group.visible = true;
            item.life += dt;

            // Gerakkan partikel maju sepanjang vektor kecepatannya
            item.pos.addScaledVector(item.dir, speedVis * dt);
            item.group.position.copy(item.pos);

            // Atur visibilitas & radius bukaan kerucut berdasarkan sudut Cherenkov
            item.cone.visible = isCherenkovActive;
            if (isCherenkovActive) {
                const lifeFade = Math.sin(Math.min(1.0, item.life / item.maxLife) * Math.PI);
                item.cone.scale.set(coneRadius * lifeFade, lifeFade, coneRadius * lifeFade);
            }

            // Reset jika keluar kolam reaktor atau habis masa lintasan
            if (item.life >= item.maxLife || item.pos.length() > poolRadius - 1.5 || Math.abs(item.pos.y) > 19) {
                resetEmitter(item, false);
            }
        }

        // Redam perlahan lonjakan cahaya pulsa fisi kembali ke tingkat tunak
        const steadyLight = isCherenkovActive ? (1.5 + frankTammFactor * 4.5) * activeRatio : 0.25;
        coreGlowLight.intensity += (steadyLight - coreGlowLight.intensity) * 0.08;

        controls.update();
        composer.render();
    }
    animate();

//]]>
  } catch (err) { console.error('Module script error:', err); }
})();