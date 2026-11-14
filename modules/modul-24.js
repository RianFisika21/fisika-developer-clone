// Auto-generated module #24
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js Lengkap & Post-Processing (Bloom) -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Atraktor Aneh Lorenz 3D</h3>\r\n\r\n    <div class="input-group">\r\n      <label>Bilangan Rayleigh (ρ) <span id="val-rho" class="value-display">28.0</span></label>\r\n      <input type="range" id="rho-slider" min="10.0" max="45.0" step="0.5" value="28.0">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Bilangan Prandtl (σ) <span id="val-sigma" class="value-display">10.0</span></label>\r\n      <input type="range" id="sigma-slider" min="4.0" max="18.0" step="0.5" value="10.0">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Perturbasi Awal (Δx₀) <span id="val-delta" class="value-display">10⁻⁴ (0.0001)</span></label>\r\n      <input type="range" id="delta-slider" min="-5" max="-1" step="1" value="-4">\r\n    </div>\r\n\r\n    <div style="background: rgba(0, 243, 255, 0.08); border-left: 3px solid #00f3ff; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>SENSITIVITAS KONDISI AWAL:</strong><br>\r\n        Lintasan <b>Cyan</b> dan <b>Magenta</b> dimulai hampir berimpitan (selisih Δx₀). Perhatikan bagaimana garis penghubung kuning merenggang drastis saat keduanya terpisah ke sayap berlawanan!\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="lorenz-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.35); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n\r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-camera" style="background: rgba(0, 243, 255, 0.22); border: 1px solid #00f3ff; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🎥 AUTO-ROTATE: ON\r\n      </button>\r\n      <button id="btn-reset" style="background: rgba(255, 0, 128, 0.25); border: 1px solid #ff007f; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🦋 UJI EFEK KUPU-KUPU\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Ruang Fase & Divergensi Lyapunov -->\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.78); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.5);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00f3ff; letter-spacing: 1px;">JARAK FASE ||Δr(t)|| &amp; STATUS CHAOS</div>\r\n      <div id="hud-div" style="font-family: \'Orbitron\', monospace; font-size: 14px; color: #00ffaa; font-weight: bold; margin-bottom: 4px;">||Δr||: 0.0001 — TERKORELASI</div>\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #ffdd00; letter-spacing: 1px;">REZIM KONVEKSI &amp; AMBANG KRITIS (ρc)</div>\r\n      <div id="hud-regime" style="font-family: \'Orbitron\', monospace; font-size: 13px; color: #fff;">Strange Attractor (ρ &gt; 24.74) | λ₁ ≈ +0.91</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {
//<![CDATA[

    const container = document.getElementById('lorenz-canvas-container');
    const wrapper = document.getElementById('vis-panel-wrapper');

    // 1. SCENE & KAMERA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x03050a);
    scene.fog = new THREE.FogExp2(0x03050a, 0.005);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 12, 62);

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
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.45, 0.45, 0.78);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 3. KISI RUANG FASE & TITIK KESETIMBANGAN KONVEKTIF (C+ & C-)
    const floorGrid = new THREE.GridHelper(64, 24, 0x16324f, 0x091524);
    floorGrid.position.y = -21;
    scene.add(floorGrid);

    const eqGeo = new THREE.OctahedronGeometry(0.65, 0);
    const eqMat = new THREE.MeshBasicMaterial({ color: 0xffdd00, wireframe: true, transparent: true, opacity: 0.75 });
    const eqPlus = new THREE.Mesh(eqGeo, eqMat);
    const eqMinus = new THREE.Mesh(eqGeo, eqMat);
    scene.add(eqPlus);
    scene.add(eqMinus);

    // 4. GEOMETRI JEJAK LINTASAN A (CYAN) & LINTASAN B (MAGENTA)
    const trailLen = 1400;
    const beta = 8.0 / 3.0;
    const visScale = 0.75;
    const zCenter = 25.0;

    function toSceneCoords(lx, ly, lz, targetVec) {
        targetVec.set(lx * visScale, (lz - zCenter) * visScale, ly * visScale);
        return targetVec;
    }

    function createTrail(baseHex) {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(trailLen * 3);
        const colors = new Float32Array(trailLen * 3);
        const baseCol = new THREE.Color(baseHex);

        for (let i = 0; i < trailLen; i++) {
            const fade = Math.pow(i / (trailLen - 1), 1.6);
            colors[i * 3] = baseCol.r * fade;
            colors[i * 3 + 1] = baseCol.g * fade;
            colors[i * 3 + 2] = baseCol.b * fade;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const mat = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.92,
            blending: THREE.AdditiveBlending
        });
        const line = new THREE.Line(geo, mat);
        scene.add(line);

        const head = new THREE.Mesh(
            new THREE.SphereGeometry(0.48, 12, 12),
            new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        const halo = new THREE.Mesh(
            new THREE.SphereGeometry(1.05, 12, 12),
            new THREE.MeshBasicMaterial({ color: baseHex, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending })
        );
        head.add(halo);
        scene.add(head);

        return { line, positions, head };
    }

    const trailA = createTrail(0x00f3ff);
    const trailB = createTrail(0xff007f);

    // Garis penghubung jarak fase antara Partikel A dan Partikel B
    const tetherGeo = new THREE.BufferGeometry();
    const tetherPos = new Float32Array(6);
    tetherGeo.setAttribute('position', new THREE.BufferAttribute(tetherPos, 3));
    const tetherMat = new THREE.LineBasicMaterial({ color: 0xffdd00, transparent: true, opacity: 0.85 });
    const tetherLine = new THREE.Line(tetherGeo, tetherMat);
    scene.add(tetherLine);

    // 5. STATE FISIKA & INTEGRATOR RUNGE-KUTTA ORDE-4 (RK4)
    let stateA = { x: 1.0, y: 1.0, z: 1.0 };
    let stateB = { x: 1.0001, y: 1.0, z: 1.0 };
    let simTime = 0.0;

    const rhoSlider = document.getElementById('rho-slider');
    const sigmaSlider = document.getElementById('sigma-slider');
    const deltaSlider = document.getElementById('delta-slider');
    const hudDiv = document.getElementById('hud-div');
    const hudRegime = document.getElementById('hud-regime');

    function updateEquilibriaAndHUD() {
        const rho = parseFloat(rhoSlider.value);
        const sigma = parseFloat(sigmaSlider.value);
        const expVal = parseInt(deltaSlider.value);
        const delta0 = Math.pow(10, expVal);

        document.getElementById('val-rho').innerText = rho.toFixed(1);
        document.getElementById('val-sigma').innerText = sigma.toFixed(1);
        document.getElementById('val-delta').innerText = `10${expVal === -1 ? '⁻¹' : expVal === -2 ? '⁻²' : expVal === -3 ? '⁻³' : expVal === -4 ? '⁻⁴' : '⁻⁵'} (${delta0})`;

        if (rho > 1.0) {
            const cXY = Math.sqrt(beta * (rho - 1.0));
            const cZ = rho - 1.0;
            eqPlus.visible = true;
            eqMinus.visible = true;
            toSceneCoords(cXY, cXY, cZ, eqPlus.position);
            toSceneCoords(-cXY, -cXY, cZ, eqMinus.position);
        } else {
            eqPlus.visible = false;
            eqMinus.visible = false;
        }

        // Batas kritis subkritikal Hopf bifurcation Lorenz
        const rhoCrit = sigma > beta + 1.0 ? (sigma * (sigma + beta + 3.0)) / (sigma - beta - 1.0) : 24.74;
        if (rho < rhoCrit) {
            hudRegime.innerText = `Titik Tetap Stabil (ρ < ${rhoCrit.toFixed(2)}) | Non-Chaotic`;
            hudRegime.style.color = "#00f3ff";
        } else {
            const lyapEst = 0.905 * Math.sqrt(rho / 28.0) * Math.sqrt(sigma / 10.0);
            hudRegime.innerText = `Strange Attractor (ρ > ${rhoCrit.toFixed(2)}) | λ₁ ≈ +${lyapEst.toFixed(2)}`;
            hudRegime.style.color = "#ffdd00";
        }
    }

    const tmpVec = new THREE.Vector3();

    function resetTrajectories() {
        updateEquilibriaAndHUD();
        const expVal = parseInt(deltaSlider.value);
        const delta0 = Math.pow(10, expVal);

        // Mulai di dekat sayap atraktor agar efek pembelahan terlihat cepat & dramatis
        stateA = { x: -7.5, y: -7.5, z: 25.0 };
        stateB = { x: -7.5 + delta0, y: -7.5, z: 25.0 };
        simTime = 0.0;

        toSceneCoords(stateA.x, stateA.y, stateA.z, tmpVec);
        for (let i = 0; i < trailLen; i++) {
            const idx = i * 3;
            trailA.positions[idx] = tmpVec.x;
            trailA.positions[idx + 1] = tmpVec.y;
            trailA.positions[idx + 2] = tmpVec.z;
        }
        trailA.head.position.copy(tmpVec);
        trailA.line.geometry.attributes.position.needsUpdate = true;

        toSceneCoords(stateB.x, stateB.y, stateB.z, tmpVec);
        for (let i = 0; i < trailLen; i++) {
            const idx = i * 3;
            trailB.positions[idx] = tmpVec.x;
            trailB.positions[idx + 1] = tmpVec.y;
            trailB.positions[idx + 2] = tmpVec.z;
        }
        trailB.head.position.copy(tmpVec);
        trailB.line.geometry.attributes.position.needsUpdate = true;
    }

    function derivatives(s, sigma, rho) {
        return {
            dx: sigma * (s.y - s.x),
            dy: s.x * (rho - s.z) - s.y,
            dz: s.x * s.y - beta * s.z
        };
    }

    function stepRK4(s, dt, sigma, rho) {
        const k1 = derivatives(s, sigma, rho);
        const k2 = derivatives({
            x: s.x + 0.5 * dt * k1.dx,
            y: s.y + 0.5 * dt * k1.dy,
            z: s.z + 0.5 * dt * k1.dz
        }, sigma, rho);
        const k3 = derivatives({
            x: s.x + 0.5 * dt * k2.dx,
            y: s.y + 0.5 * dt * k2.dy,
            z: s.z + 0.5 * dt * k2.dz
        }, sigma, rho);
        const k4 = derivatives({
            x: s.x + dt * k3.dx,
            y: s.y + dt * k3.dy,
            z: s.z + dt * k3.dz
        }, sigma, rho);

        s.x += (dt / 6.0) * (k1.dx + 2.0 * k2.dx + 2.0 * k3.dx + k4.dx);
        s.y += (dt / 6.0) * (k1.dy + 2.0 * k2.dy + 2.0 * k3.dy + k4.dy);
        s.z += (dt / 6.0) * (k1.dz + 2.0 * k2.dz + 2.0 * k3.dz + k4.dz);
    }

    function pushTrailPoint(trailObj, x, y, z) {
        const pos = trailObj.positions;
        pos.copyWithin(0, 3);
        const last = (trailLen - 1) * 3;
        pos[last] = x;
        pos[last + 1] = y;
        pos[last + 2] = z;
    }

    // 6. EVENT LISTENER UI & KONTROL
    [rhoSlider, sigmaSlider].forEach(el => el.addEventListener('input', updateEquilibriaAndHUD));
    deltaSlider.addEventListener('input', resetTrajectories);
    document.getElementById('btn-reset').addEventListener('click', resetTrajectories);

    let isAutoRotate = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.65;

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

    resetTrajectories();

    // 7. ANIMATION LOOP
    function animate() {
        requestAnimationFrame(animate);

        const rho = parseFloat(rhoSlider.value);
        const sigma = parseFloat(sigmaSlider.value);
        const dt = 0.0045;
        const substeps = 4;

        for (let s = 0; s < substeps; s++) {
            stepRK4(stateA, dt, sigma, rho);
            stepRK4(stateB, dt, sigma, rho);
            simTime += dt;

            toSceneCoords(stateA.x, stateA.y, stateA.z, tmpVec);
            pushTrailPoint(trailA, tmpVec.x, tmpVec.y, tmpVec.z);
            trailA.head.position.copy(tmpVec);

            toSceneCoords(stateB.x, stateB.y, stateB.z, tmpVec);
            pushTrailPoint(trailB, tmpVec.x, tmpVec.y, tmpVec.z);
            trailB.head.position.copy(tmpVec);
        }

        trailA.line.geometry.attributes.position.needsUpdate = true;
        trailB.line.geometry.attributes.position.needsUpdate = true;

        // Perbarui garis penghubung fase antara kedua partikel
        tetherPos[0] = trailA.head.position.x;
        tetherPos[1] = trailA.head.position.y;
        tetherPos[2] = trailA.head.position.z;
        tetherPos[3] = trailB.head.position.x;
        tetherPos[4] = trailB.head.position.y;
        tetherPos[5] = trailB.head.position.z;
        tetherGeo.attributes.position.needsUpdate = true;

        // Hitung jarak Euclidean di ruang fase Lorenz
        const distPhase = Math.hypot(stateA.x - stateB.x, stateA.y - stateB.y, stateA.z - stateB.z);
        if (distPhase < 0.5) {
            hudDiv.innerText = `||Δr||: ${distPhase.toFixed(4)} (t=${simTime.toFixed(1)}s) — TERKORELASI`;
            hudDiv.style.color = "#00ffaa";
        } else if (distPhase < 8.0) {
            hudDiv.innerText = `||Δr||: ${distPhase.toFixed(2)} (t=${simTime.toFixed(1)}s) — BIFURKASI AKTIF`;
            hudDiv.style.color = "#ffdd00";
        } else {
            hudDiv.innerText = `||Δr||: ${distPhase.toFixed(2)} (t=${simTime.toFixed(1)}s) — DIVERGENSI CHAOS!`;
            hudDiv.style.color = "#ff007f";
        }

        eqPlus.rotation.y += 0.02;
        eqMinus.rotation.y -= 0.02;

        controls.update();
        composer.render();
    }
    animate();

//]]>
  } catch (err) { console.error('Module script error:', err); }
})();