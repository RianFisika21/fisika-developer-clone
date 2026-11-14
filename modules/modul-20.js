// Auto-generated module #20
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js Lengkap & Post-Processing (Bloom) -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Lensa Gravitasi Lubang Hitam</h3>\r\n\r\n    <div class="input-group">\r\n      <label>Massa Singularitas (Rₛ) <span id="val-mass" class="value-display">2.40 AU</span></label>\r\n      <input type="range" id="mass-slider" min="1.20" max="3.80" step="0.10" value="2.40">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Rotasi &amp; Doppler Beaming <span id="val-spin" class="value-display">1.00 × c</span></label>\r\n      <input type="range" id="spin-slider" min="0.00" max="1.60" step="0.10" value="1.00">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n      <label>Radius Cakram Akresi <span id="val-disk" class="value-display">6.5 × Rₛ</span></label>\r\n      <input type="range" id="disk-slider" min="4.5" max="9.5" step="0.5" value="6.5">\r\n    </div>\r\n\r\n    <div style="background: rgba(255, 136, 0, 0.1); border-left: 3px solid #ff8800; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>GEODESIK RELATIVISTIK:</strong><br>\r\n        Foton dibelokkan oleh percepatan efektif <b>a = -1.5 Rₛ (L² / r⁵) r</b>. Aktifkan <b>KISI RUANG</b> untuk melihat distorsi Cincin Einstein secara langsung!\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="blackhole-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255, 136, 0, 0.35); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n\r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-grid" style="background: rgba(0, 243, 255, 0.22); border: 1px solid #00f3ff; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🌐 KISI RUANG: ON\r\n      </button>\r\n      <button id="btn-einstein" style="background: rgba(255, 136, 0, 0.25); border: 1px solid #ff8800; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; font-weight: bold; backdrop-filter: blur(4px);">\r\n        💫 SUDUT EINSTEIN RING\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD Parameter Schwarzschild -->\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.78); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(255, 136, 0, 0.5);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #ff8800; letter-spacing: 1px;">RADIUS FOTON &amp; BAYANGAN KRITIS</div>\r\n      <div id="hud-shadow" style="font-family: \'Orbitron\', monospace; font-size: 15px; color: #ffdd00; font-weight: bold; margin-bottom: 4px;">R_ph: 3.60 AU | b_crit: 6.24 AU</div>\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00f3ff; letter-spacing: 1px;">ORBIT STABIL TERDALAM (ISCO)</div>\r\n      <div id="hud-isco" style="font-family: \'Orbitron\', monospace; font-size: 13px; color: #fff;">R_ISCO: 7.20 AU (3.0 × Rₛ)</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {
//<![CDATA[

    const container = document.getElementById('blackhole-canvas-container');
    const wrapper = document.getElementById('vis-panel-wrapper');

    // 1. SCENE & KAMERA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020306);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 7.2, 34.0);

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 12.0;
    controls.maxDistance = 85.0;
    controls.target.set(0, 0, 0);

    // 2. POST-PROCESSING (BLOOM RELATIVISTIK)
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.35, 0.45, 0.78);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 3. SHADER RAY-MARCHING GEODESIK SCHWARZSCHILD
    const bhUniforms = {
        time: { value: 0.0 },
        rs: { value: 2.40 },
        rotSpeed: { value: 1.00 },
        diskScale: { value: 6.50 },
        showGrid: { value: 1.0 }
    };

    const bhMat = new THREE.ShaderMaterial({
        uniforms: bhUniforms,
        side: THREE.BackSide,
        depthWrite: false,
        vertexShader: `
            varying vec3 vWorldPos;
            void main() {
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vWorldPos = worldPosition.xyz;
                gl_Position = projectionMatrix * viewMatrix * worldPosition;
            }
        `,
        fragmentShader: `
            uniform float time;
            uniform float rs;
            uniform float rotSpeed;
            uniform float diskScale;
            uniform float showGrid;
            varying vec3 vWorldPos;

            vec3 sampleBackground(vec3 dir) {
                vec3 d = normalize(dir);
                
                // Pita galaksi samar
                float band = exp(-abs(d.y * 2.4 + d.x * 0.75) * 3.8);
                vec3 col = vec3(0.008, 0.015, 0.032) + vec3(0.025, 0.065, 0.13) * band;

                // Bintang latar belakang prosedural
                vec3 pStar = d * 135.0;
                vec3 cell = floor(pStar);
                vec3 f = fract(pStar) - 0.5;
                float h = fract(sin(dot(cell, vec3(127.1, 311.7, 74.7))) * 43758.5453);
                if (h > 0.962) {
                    float dist = length(f);
                    float star = smoothstep(0.36, 0.02, dist) * ((h - 0.962) / 0.038);
                    vec3 tint = mix(vec3(0.65, 0.85, 1.0), vec3(1.0, 0.92, 0.75), fract(h * 19.7));
                    col += tint * star * 1.9;
                }

                // Kisi koordinat langit untuk memperjelas efek Cincin Einstein
                if (showGrid > 0.5) {
                    float lon = atan(d.z, d.x);
                    float lat = asin(clamp(d.y, -1.0, 1.0));
                    float gLon = smoothstep(0.972, 1.0, cos(lon * 18.0));
                    float gLat = smoothstep(0.972, 1.0, cos(lat * 18.0));
                    float grid = max(gLon, gLat);
                    col += vec3(0.0, 0.85, 1.0) * grid * 0.42;
                }

                return col;
            }

            void main() {
                vec3 ro = cameraPosition;
                vec3 rd = normalize(vWorldPos - cameraPosition);

                vec3 pos = ro;
                vec3 vel = rd;
                vec3 accumColor = vec3(0.0);
                float accumAlpha = 0.0;
                bool captured = false;

                float rIn = rs * 2.55;
                float rOut = rs * diskScale;

                for (int i = 0; i < 110; i++) {
                    float r = length(pos);
                    if (r <= rs) {
                        captured = true;
                        break;
                    }
                    if (r > 130.0) {
                        break;
                    }

                    // Langkah adaptif: lebih rapat di dekat lubang hitam & bidang cakram
                    float stepSize = clamp(r * 0.15, 0.09, 2.2);
                    if (abs(pos.y) < 1.6) {
                        stepSize = min(stepSize, max(0.075, abs(pos.y) * 0.65));
                    }

                    // Percepatan geodesik foton Schwarzschild: a = -1.5 * rs * |r x v|^2 / r^5 * r
                    vec3 L = cross(pos, vel);
                    float L2 = dot(L, L);
                    float r2 = r * r;
                    float r5 = r2 * r2 * r;
                    vec3 accel = (-1.5 * rs * L2 / r5) * pos;

                    vec3 prevPos = pos;
                    vel = normalize(vel + accel * stepSize);
                    pos += vel * stepSize;

                    // Deteksi perpotongan sinar dengan bidang cakram akresi (y = 0)
                    if (prevPos.y * pos.y <= 0.0) {
                        float denom = abs(prevPos.y) + abs(pos.y) + 0.00001;
                        float tCross = abs(prevPos.y) / denom;
                        vec3 hitPos = mix(prevPos, pos, tCross);
                        float hitR = length(hitPos.xz);

                        if (hitR > rIn && hitR < rOut) {
                            float u = (hitR - rIn) / (rOut - rIn);
                            float angle = atan(hitPos.z, hitPos.x);
                            float omega = rotSpeed * 11.0 / pow(hitR / rs, 1.25);

                            // Pola spiral & cincin plasma turbulen
                            float s1 = sin(angle * 3.0 + hitR * 1.45 - time * omega);
                            float s2 = cos(angle * 7.0 - hitR * 2.50 - time * omega * 1.3);
                            float rings = sin(hitR * 3.4 - time * 1.4) * 0.5 + 0.5;
                            float turb = clamp((0.58 + 0.24 * s1 + 0.18 * s2) * (0.72 + 0.48 * rings), 0.18, 1.35);

                            float edgeFade = smoothstep(0.0, 0.07, u) * (1.0 - smoothstep(0.52, 1.0, u));

                            // Relativistic Doppler Beaming (sisi mendekati pengamat lebih terang)
                            vec3 tangent = normalize(vec3(-hitPos.z, 0.0, hitPos.x));
                            float betaDisk = clamp(rotSpeed * 0.46 * sqrt(rs / hitR), 0.0, 0.65);
                            float doppler = 1.0 + betaDisk * dot(tangent, -vel);
                            float beaming = clamp(pow(doppler, 2.7), 0.35, 2.35);

                            // Gradasi suhu plasma (putih-emas panas -> oranye -> merah tua)
                            vec3 hotCol = vec3(1.0, 0.96, 0.86);
                            vec3 midCol = vec3(1.0, 0.46, 0.07);
                            vec3 outerCol = vec3(0.72, 0.09, 0.04);

                            vec3 diskCol = mix(hotCol, midCol, smoothstep(0.0, 0.42, u));
                            diskCol = mix(diskCol, outerCol, smoothstep(0.42, 1.0, u));
                            diskCol = mix(diskCol, vec3(0.72, 0.90, 1.0), clamp((beaming - 1.35) * 0.42, 0.0, 0.48));

                            float density = edgeFade * turb * 0.88;
                            vec3 emit = diskCol * density * beaming * 1.32;

                            accumColor += (1.0 - accumAlpha) * emit;
                            accumAlpha += (1.0 - accumAlpha) * clamp(density * 0.85, 0.0, 0.92);
                            if (accumAlpha > 0.97) break;
                        }
                    }
                }

                if (!captured && accumAlpha < 0.99) {
                    accumColor += (1.0 - accumAlpha) * sampleBackground(vel);
                }

                gl_FragColor = vec4(accumColor, 1.0);
            }
        `
    });

    // Bola pembungkus ray-marching besar
    const skySphere = new THREE.Mesh(new THREE.SphereGeometry(160, 32, 32), bhMat);
    scene.add(skySphere);

    // 4. KONTROL UI & PARAMETER FISIKA
    const massSlider = document.getElementById('mass-slider');
    const spinSlider = document.getElementById('spin-slider');
    const diskSlider = document.getElementById('disk-slider');
    const hudShadow = document.getElementById('hud-shadow');
    const hudIsco = document.getElementById('hud-isco');

    function updateBlackHoleParams() {
        const rs = parseFloat(massSlider.value);
        const spin = parseFloat(spinSlider.value);
        const disk = parseFloat(diskSlider.value);

        document.getElementById('val-mass').innerText = rs.toFixed(2) + " AU";
        document.getElementById('val-spin').innerText = spin.toFixed(2) + " × c";
        document.getElementById('val-disk').innerText = disk.toFixed(1) + " × Rₛ";

        bhUniforms.rs.value = rs;
        bhUniforms.rotSpeed.value = spin;
        bhUniforms.diskScale.value = disk;

        const rPhoton = 1.5 * rs;
        const bCrit = 2.598 * rs;
        const rIsco = 3.0 * rs;

        hudShadow.innerText = `R_ph: ${rPhoton.toFixed(2)} AU | b_crit: ${bCrit.toFixed(2)} AU`;
        hudIsco.innerText = `R_ISCO: ${rIsco.toFixed(2)} AU (3.0 × Rₛ)`;
    }

    [massSlider, spinSlider, diskSlider].forEach(el => el.addEventListener('input', updateBlackHoleParams));
    updateBlackHoleParams();

    // 5. TOMBOL KISI RUANG, SUDUT EINSTEIN RING & FULLSCREEN
    let gridActive = true;
    const btnGrid = document.getElementById('btn-grid');
    btnGrid.addEventListener('click', () => {
        gridActive = !gridActive;
        bhUniforms.showGrid.value = gridActive ? 1.0 : 0.0;
        btnGrid.innerHTML = gridActive ? '🌐 KISI RUANG: ON' : '🌐 KISI RUANG: OFF';
        btnGrid.style.background = gridActive ? 'rgba(0, 243, 255, 0.22)' : 'rgba(0, 243, 255, 0.08)';
    });

    let transitionCam = false;
    const targetEinsteinPos = new THREE.Vector3(0, 0.45, 36.0);

    document.getElementById('btn-einstein').addEventListener('click', () => {
        transitionCam = true;
        if (!gridActive) {
            gridActive = true;
            bhUniforms.showGrid.value = 1.0;
            btnGrid.innerHTML = '🌐 KISI RUANG: ON';
            btnGrid.style.background = 'rgba(0, 243, 255, 0.22)';
        }
    });

    renderer.domElement.addEventListener('pointerdown', () => {
        transitionCam = false;
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

    // 6. ANIMATION LOOP
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        bhUniforms.time.value = clock.getElapsedTime();

        if (transitionCam) {
            camera.position.lerp(targetEinsteinPos, 0.07);
            controls.target.lerp(new THREE.Vector3(0, 0, 0), 0.08);
            if (camera.position.distanceTo(targetEinsteinPos) < 0.15) {
                transitionCam = false;
            }
        }

        controls.update();
        composer.render();
    }
    animate();

//]]>
  } catch (err) { console.error('Module script error:', err); }
})();