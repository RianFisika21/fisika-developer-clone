// Auto-generated module #19
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js Lengkap & Post-Processing (Bloom) -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Terowongan Kuantum 3D (TDSE)</h3>\r\n\r\n    <div class="input-group">\r\n      <label>Rasio Penghalang (V₀ / E) <span id="val-ratio" class="value-display">1.15 × E</span></label>\r\n      <input type="range" id="ratio-slider" min="0.40" max="1.80" step="0.05" value="1.15">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Ketebalan Penghalang (a) <span id="val-width" class="value-display">1.20 nm</span></label>\r\n      <input type="range" id="width-slider" min="0.50" max="3.00" step="0.10" value="1.20">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Momentum Gelombang (k₀) <span id="val-k0" class="value-display">2.40 Å⁻¹</span></label>\r\n      <input type="range" id="k0-slider" min="1.60" max="3.20" step="0.10" value="2.40">\r\n    </div>\r\n\r\n    <div style="background: rgba(0, 243, 255, 0.08); border-left: 3px solid #00f3ff; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>INTERPRETASI VISUAL 3D:</strong><br>\r\n        Pilinan 3D adalah fase kompleks <b>ψ(x,t)</b> (Y = Real, Z = Imajiner), sedangkan kurva hijau di lantai adalah rapat probabilitas <b>|ψ|²</b>.\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="quantum-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.35); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n\r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-camera" style="background: rgba(0, 243, 255, 0.22); border: 1px solid #00f3ff; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🎥 AUTO-ROTATE: ON\r\n      </button>\r\n      <button id="btn-reset" style="background: rgba(255, 0, 85, 0.25); border: 1px solid #ff0055; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        ⚛️ TEMBAK PAKET\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Probabilitas Kuantum -->\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.78); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.5);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00f3ff; letter-spacing: 1px;">REZIM ENERGI KUANTUM</div>\r\n      <div id="hud-regime" style="font-family: \'Orbitron\', monospace; font-size: 14px; color: #ff0055; font-weight: bold; margin-bottom: 4px;">TUNNELING KLASIK (E &lt; V₀)</div>\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00ffaa; letter-spacing: 1px;">PROBABILITAS TERUSAN (T) vs PANTUL (R)</div>\r\n      <div id="hud-prob" style="font-family: \'Orbitron\', monospace; font-size: 13px; color: #fff;">T: 0.0% | R: 100.0%</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {
//<![CDATA[

    const container = document.getElementById('quantum-canvas-container');
    const wrapper = document.getElementById('vis-panel-wrapper');

    // 1. SCENE & KAMERA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x03050a);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 24, 62);

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, -2, 0);

    // 2. POST-PROCESSING (BLOOM)
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.45, 0.45, 0.8);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 3. KISI REFERENSI & SUMBU PROPAGASI
    const floorY = -13;
    const grid = new THREE.GridHelper(90, 30, 0x1e3a5f, 0x0b1726);
    grid.position.y = floorY;
    scene.add(grid);

    const axisGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-45, 0, 0),
        new THREE.Vector3(45, 0, 0)
    ]);
    const axisLine = new THREE.Line(axisGeo, new THREE.LineBasicMaterial({ color: 0x334455, transparent: true, opacity: 0.6 }));
    scene.add(axisLine);

    // 4. DINDING PENGHALANG POTENSIAL V(x)
    const barrierGeo = new THREE.BoxGeometry(1, 1, 1);
    const barrierMat = new THREE.MeshBasicMaterial({
        color: 0xff0055,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
        side: THREE.DoubleSide
    });
    const barrierMesh = new THREE.Mesh(barrierGeo, barrierMat);
    scene.add(barrierMesh);

    const barrierEdgeMat = new THREE.LineBasicMaterial({ color: 0xff0055, transparent: true, opacity: 0.85 });
    const barrierEdges = new THREE.LineSegments(new THREE.EdgesGeometry(barrierGeo), barrierEdgeMat);
    barrierMesh.add(barrierEdges);

    // 5. SOLVER NUMERIK TDSE (VISSCHER STAGGERED LEAPFROG)
    const N = 360;
    const dx = 0.25;
    const xMin = -0.5 * N * dx; // -45.0
    const dt = 0.008;

    const R = new Float64Array(N);
    const I = new Float64Array(N);
    const V = new Float64Array(N);
    const damp = new Float64Array(N);

    // Lapisan peredam tepi (Absorbing Boundary) agar gelombang tidak memantul di ujung kotak
    const pad = 28;
    for (let j = 0; j < N; j++) {
        if (j < pad) {
            const t = (pad - j) / pad;
            damp[j] = 1.0 - 0.035 * t * t;
        } else if (j >= N - pad) {
            const t = (j - (N - pad - 1)) / pad;
            damp[j] = 1.0 - 0.035 * t * t;
        } else {
            damp[j] = 1.0;
        }
    }

    // 6. GEOMETRI VISUAL GELOMBANG 3D
    // A. Kurva Heliks Kompleks (X, Re(psi), Im(psi))
    const spiralGeo = new THREE.BufferGeometry();
    const spiralPos = new Float32Array(N * 3);
    const spiralColors = new Float32Array(N * 3);
    spiralGeo.setAttribute('position', new THREE.BufferAttribute(spiralPos, 3));
    spiralGeo.setAttribute('color', new THREE.BufferAttribute(spiralColors, 3));
    const spiralMat = new THREE.LineBasicMaterial({ vertexColors: true });
    const spiralLine = new THREE.Line(spiralGeo, spiralMat);
    scene.add(spiralLine);

    // B. Jari-jari Fase (Spokes) dari sumbu X ke kurva heliks
    const spokesGeo = new THREE.BufferGeometry();
    const spokesPos = new Float32Array(N * 2 * 3);
    const spokesColors = new Float32Array(N * 2 * 3);
    spokesGeo.setAttribute('position', new THREE.BufferAttribute(spokesPos, 3));
    spokesGeo.setAttribute('color', new THREE.BufferAttribute(spokesColors, 3));
    const spokesMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.45 });
    const spokesLines = new THREE.LineSegments(spokesGeo, spokesMat);
    scene.add(spokesLines);

    // C. Kurva Rapat Probabilitas |psi|^2 di Lantai
    const probGeo = new THREE.BufferGeometry();
    const probPos = new Float32Array(N * 3);
    probGeo.setAttribute('position', new THREE.BufferAttribute(probPos, 3));
    const probMat = new THREE.LineBasicMaterial({ color: 0x00ffaa });
    const probLine = new THREE.Line(probGeo, probMat);
    scene.add(probLine);

    // 7. KONTROL UI & INISIALISASI PAKET GELOMBANG
    const ratioSlider = document.getElementById('ratio-slider');
    const widthSlider = document.getElementById('width-slider');
    const k0Slider = document.getElementById('k0-slider');
    const hudRegime = document.getElementById('hud-regime');
    const hudProb = document.getElementById('hud-prob');

    let barrierHalfW = 1.2;

    function updatePotential() {
        const ratio = parseFloat(ratioSlider.value);
        const widthVal = parseFloat(widthSlider.value);
        const k0 = parseFloat(k0Slider.value);

        document.getElementById('val-ratio').innerText = ratio.toFixed(2) + " × E";
        document.getElementById('val-width').innerText = widthVal.toFixed(2) + " nm";
        document.getElementById('val-k0').innerText = k0.toFixed(2) + " Å⁻¹";

        const E0 = 0.5 * k0 * k0;
        const V0 = ratio * E0;
        barrierHalfW = widthVal * 1.1;

        for (let j = 0; j < N; j++) {
            const x = xMin + j * dx;
            V[j] = Math.abs(x) <= barrierHalfW ? V0 : 0.0;
        }

        // Perbarui tampilan kotak penghalang 3D
        const visHeight = Math.min(24, Math.max(4, ratio * 12));
        barrierMesh.scale.set(barrierHalfW * 2.0, visHeight, 20);

        if (ratio > 1.0) {
            barrierMat.color.setHex(0xff0055);
            barrierEdgeMat.color.setHex(0xff0055);
            hudRegime.innerText = "TUNNELING KLASIK (E < V₀)";
            hudRegime.style.color = "#ff0055";
        } else {
            barrierMat.color.setHex(0x00ffaa);
            barrierEdgeMat.color.setHex(0x00ffaa);
            hudRegime.innerText = "TRANSMISI DI ATAS PENGHALANG (E ≥ V₀)";
            hudRegime.style.color = "#00ffaa";
        }
    }

    function initWavepacket() {
        updatePotential();
        const k0 = parseFloat(k0Slider.value);
        const x0 = -22.0;
        const sigma = 3.2;
        const omega = 0.5 * k0 * k0;
        const halfDt = 0.5 * dt;

        let normSum = 0.0;
        for (let j = 0; j < N; j++) {
            const x = xMin + j * dx;
            const envR = Math.exp(-Math.pow(x - x0, 2) / (4.0 * sigma * sigma));
            const xHalf = x - k0 * halfDt;
            const envI = Math.exp(-Math.pow(xHalf - x0, 2) / (4.0 * sigma * sigma));

            R[j] = envR * Math.cos(k0 * (x - x0));
            I[j] = envI * Math.sin(k0 * (x - x0) - omega * halfDt);
            normSum += (R[j] * R[j] + I[j] * I[j]) * dx;
        }

        const invNorm = 1.0 / Math.sqrt(normSum);
        for (let j = 0; j < N; j++) {
            R[j] *= invNorm;
            I[j] *= invNorm;
        }
    }

    [ratioSlider, widthSlider].forEach(s => s.addEventListener('input', updatePotential));
    k0Slider.addEventListener('input', initWavepacket);
    document.getElementById('btn-reset').addEventListener('click', initWavepacket);

    // 8. KONTROL KAMERA & FULLSCREEN
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

    initWavepacket();

    // 9. STEP INTEGRASI SCHRÖDINGER & ANIMATION LOOP
    const invDx2 = 1.0 / (dx * dx);
    const tmpColor = new THREE.Color();

    function stepTDSE(substeps) {
        for (let s = 0; s < substeps; s++) {
            // Update komponen Real R(x, t + dt)
            for (let j = 1; j < N - 1; j++) {
                const lapI = (I[j + 1] - 2.0 * I[j] + I[j - 1]) * invDx2;
                R[j] = (R[j] + dt * (-0.5 * lapI + V[j] * I[j])) * damp[j];
            }
            // Update komponen Imajiner I(x, t + 1.5*dt)
            for (let j = 1; j < N - 1; j++) {
                const lapR = (R[j + 1] - 2.0 * R[j] + R[j - 1]) * invDx2;
                I[j] = (I[j] - dt * (-0.5 * lapR + V[j] * R[j])) * damp[j];
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);

        // Jalankan 18 sub-langkah numerik per frame agar perambatan gelombang halus
        stepTDSE(18);

        let probLeft = 0.0;
        let probRight = 0.0;
        const ampScale = 28.0;
        const probScale = 68.0;

        for (let j = 0; j < N; j++) {
            const x = xMin + j * dx;
            const rVal = R[j];
            const iVal = I[j];
            const prob = rVal * rVal + iVal * iVal;

            if (x < -barrierHalfW) probLeft += prob * dx;
            else if (x > barrierHalfW) probRight += prob * dx;

            const vy = rVal * ampScale;
            const vz = iVal * ampScale;

            // Update posisi spiral kompleks
            const idx3 = j * 3;
            spiralPos[idx3] = x;
            spiralPos[idx3 + 1] = vy;
            spiralPos[idx3 + 2] = vz;

            // Warna berdasarkan sudut fase kuantum arg(psi) = atan2(Im, Re)
            const phase = (Math.atan2(iVal, rVal) + Math.PI) / (2.0 * Math.PI);
            tmpColor.setHSL(0.45 + phase * 0.45, 1.0, 0.55);

            spiralColors[idx3] = tmpColor.r;
            spiralColors[idx3 + 1] = tmpColor.g;
            spiralColors[idx3 + 2] = tmpColor.b;

            // Update jari-jari fase (spokes)
            const idx6 = j * 6;
            spokesPos[idx6] = x;
            spokesPos[idx6 + 1] = 0;
            spokesPos[idx6 + 2] = 0;
            spokesPos[idx6 + 3] = x;
            spokesPos[idx6 + 4] = vy;
            spokesPos[idx6 + 5] = vz;

            spokesColors[idx6] = 0.05;
            spokesColors[idx6 + 1] = 0.15;
            spokesColors[idx6 + 2] = 0.25;
            spokesColors[idx6 + 3] = tmpColor.r;
            spokesColors[idx6 + 4] = tmpColor.g;
            spokesColors[idx6 + 5] = tmpColor.b;

            // Update kurva rapat probabilitas |psi|^2 di lantai
            probPos[idx3] = x;
            probPos[idx3 + 1] = floorY + prob * probScale;
            probPos[idx3 + 2] = 0;
        }

        spiralGeo.attributes.position.needsUpdate = true;
        spiralGeo.attributes.color.needsUpdate = true;
        spokesGeo.attributes.position.needsUpdate = true;
        spokesGeo.attributes.color.needsUpdate = true;
        probGeo.attributes.position.needsUpdate = true;

        const totalActive = probLeft + probRight;
        if (totalActive > 0.05) {
            const tPct = (probRight / totalActive) * 100.0;
            const rPct = (probLeft / totalActive) * 100.0;
            hudProb.innerText = `T: ${tPct.toFixed(1)}% | R: ${rPct.toFixed(1)}%`;
        }

        controls.update();
        composer.render();
    }
    animate();

//]]>
  } catch (err) { console.error('Module script error:', err); }
})();