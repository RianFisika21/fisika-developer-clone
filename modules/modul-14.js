// Auto-generated module #14
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js Lengkap, Post-Processing, dan CSS2DRenderer -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <div class="control-panel">\r\n    <h3>Dinamika Termal Komposter</h3>\r\n    <div class="input-group">\r\n      <label>Waktu Inkubasi <span id="val-day" class="value-display">Hari ke-0</span></label>\r\n      <input type="range" id="day-slider" min="0" max="30" step="1" value="0">\r\n    </div>\r\n    <div class="input-group">\r\n      <label>Bio-Aktivator (EM4) <span id="val-em4" class="value-display">5.0 %</span></label>\r\n      <input type="range" id="em4-slider" min="1.0" max="10.0" step="0.5" value="5.0">\r\n    </div>\r\n    <div class="input-group">\r\n      <label>Suhu Lingkungan <span id="val-tamb" class="value-display">28.0 °C</span></label>\r\n      <input type="range" id="tamb-slider" min="20.0" max="35.0" step="1.0" value="28.0">\r\n    </div>\r\n    <div style="background: rgba(255, 136, 0, 0.1); border-left: 3px solid #ff8800; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c;">Inti komposter menyimpan panas tertinggi (eksotermik), menciptakan gradien termal hingga ke dinding wadah.</p>\r\n    </div>\r\n  </div>\r\n\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="thermal-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255, 136, 0, 0.2); position: absolute; top: 0; left: 0;"></div>\r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-size: 11px; cursor: pointer;">[ ] FULLSCREEN</button>\r\n      <button id="btn-camera" style="background: rgba(255, 136, 0, 0.2); border: 1px solid #ff8800; color: #fff; padding: 6px 12px; border-radius: 4px; font-size: 11px; cursor: pointer;">🎥 AUTO-ROTATE</button>\r\n    </div>\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.7); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(255, 136, 0, 0.4); z-index: 10;">\r\n      <div style="font-size: 10px; color: #ff8800;">FASE MIKROBIOLOGI</div>\r\n      <div id="hud-phase" style="font-size: 16px; color: #fff; font-weight: bold;">MESOFILIK (AWAL)</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #10
  try {
//<![CDATA[

    const container = document.getElementById('thermal-canvas-container');
    const wrapper = document.getElementById('vis-panel-wrapper');
    
    const scene = new THREE.Scene(); scene.background = new THREE.Color(0x05070a);
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(40, 35, 50); 

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const labelRenderer = new THREE.CSS2DRenderer();
    labelRenderer.setSize(container.clientWidth, container.clientHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px'; labelRenderer.domElement.style.pointerEvents = 'none'; 
    wrapper.appendChild(labelRenderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.05;

    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.2, 0.4, 0.85);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene); composer.addPass(bloomPass);

    scene.add(new THREE.AmbientLight(0x444444));
    const pointLight = new THREE.PointLight(0xffffff, 1, 100); pointLight.position.set(20, 30, 20); scene.add(pointLight);

    const cRadius = 15, cHeight = 25;
    scene.add(new THREE.Mesh(new THREE.CylinderGeometry(cRadius + 0.5, cRadius + 0.5, cHeight + 1, 32, 1, true, 0, Math.PI), new THREE.MeshBasicMaterial({ color: 0x223344, side: THREE.DoubleSide, wireframe: true })));

    const coreUniforms = { tCore: { value: 28.0 }, tAmb: { value: 28.0 }, maxRadius: { value: cRadius } };
    const coreMat = new THREE.ShaderMaterial({
        uniforms: coreUniforms, transparent: true, side: THREE.DoubleSide,
        vertexShader: `varying vec3 vPos; varying vec3 vNormal; void main() { vPos = position; vNormal = normal; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `uniform float tCore; uniform float tAmb; uniform float maxRadius; varying vec3 vPos; varying vec3 vNormal;
            void main() {
                float distNorm = clamp(length(vPos.xz) / maxRadius, 0.0, 1.0);
                float localTemp = tAmb + (tCore - tAmb) * (1.0 - (distNorm * distNorm));
                vec3 finalColor;
                if(localTemp < 30.0) finalColor = mix(vec3(0.0, 0.6, 1.0), vec3(0.2, 1.0, 0.2), (localTemp - 20.0)/10.0);
                else if(localTemp < 40.0) finalColor = mix(vec3(0.2, 1.0, 0.2), vec3(1.0, 0.8, 0.0), (localTemp - 30.0)/10.0);
                else finalColor = mix(vec3(1.0, 0.8, 0.0), vec3(1.0, 0.1, 0.1), clamp((localTemp - 40.0)/20.0, 0.0, 1.0));
                float contour = 1.0; if (abs(vNormal.z) > 0.9) contour = 0.8 + 0.2 * (sin(length(vPos.xz) * 2.0) * 0.5 + 0.5);
                gl_FragColor = vec4(finalColor * contour, 0.9);
            }`
    });
    scene.add(new THREE.Mesh(new THREE.CylinderGeometry(cRadius, cRadius, cHeight, 32, 16, false, 0, Math.PI), coreMat));

    const probe = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 20), new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.8 }));
    probe.position.set(0, 5, 0); scene.add(probe);

    const lcdDiv = document.createElement('div');
    lcdDiv.style.cssText = "font-family: monospace; font-size: 16px; font-weight: bold; color: #00ffaa; background: rgba(0, 20, 10, 0.8); border: 2px solid #333; padding: 4px 8px; border-radius: 4px; text-shadow: 0 0 5px #00ffaa;";
    const lcdLabel = new THREE.CSS2DObject(lcdDiv); lcdLabel.position.set(0, 11, 0); probe.add(lcdLabel);

    const steamCount = 150, steamPos = new Float32Array(steamCount * 3), steamVel = [];
    for(let i=0; i<steamCount; i++) {
        steamPos[i*3] = (Math.random() - 0.5) * 15; steamPos[i*3+1] = (Math.random() * 5) + 12; steamPos[i*3+2] = (Math.random() - 0.5) * -15;
        steamVel.push({ y: 0.1 + Math.random() * 0.1, x: (Math.random() - 0.5) * 0.05 });
    }
    const steamGeo = new THREE.BufferGeometry(); steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));
    const steamMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.5, transparent: true, opacity: 0.0, blending: THREE.AdditiveBlending });
    const steamPoints = new THREE.Points(steamGeo, steamMat); scene.add(steamPoints);

    const dSlider = document.getElementById('day-slider'), eSlider = document.getElementById('em4-slider'), tSlider = document.getElementById('tamb-slider'), hud = document.getElementById('hud-phase');

    function calcThermal() {
        const t = parseFloat(dSlider.value), c = parseFloat(eSlider.value), Tamb = parseFloat(tSlider.value);
        document.getElementById('val-day').innerText = t === 0 ? "Awal" : `Hari ke-${t}`;
        document.getElementById('val-em4').innerText = c.toFixed(1) + " %";
        document.getElementById('val-tamb').innerText = Tamb.toFixed(1) + " °C";

        const t_peak = 15.0 - (c * 0.8), delta_max = 20.0 + (c * 1.5);
        const Tcore = Tamb + delta_max * Math.exp(-Math.pow(t - t_peak, 2) / 25.0);

        coreUniforms.tCore.value = Tcore; coreUniforms.tAmb.value = Tamb;
        lcdDiv.innerText = Tcore.toFixed(1) + " °C";
        
        if (Tcore < 35.0) { hud.innerText = t > t_peak ? "COOLING" : "MESOFILIK"; hud.style.color = "#00ffaa"; lcdDiv.style.color = "#00ffaa"; steamMat.opacity = 0.0; }
        else if (Tcore < 45.0) { hud.innerText = "WARMING"; hud.style.color = "#ffdd00"; lcdDiv.style.color = "#ffdd00"; steamMat.opacity = 0.2; }
        else { hud.innerText = "TERMOFILIK"; hud.style.color = "#ff0055"; lcdDiv.style.color = "#ff0055"; steamMat.opacity = Math.max(0.2, Math.min(0.8, (Tcore - 45.0) / 15.0)); }
    }
    [dSlider, eSlider, tSlider].forEach(s => s.addEventListener('input', calcThermal)); calcThermal();

    let isAuto = true;
    document.getElementById('btn-camera').addEventListener('click', function() {
        isAuto = !isAuto; controls.autoRotate = isAuto;
        this.innerHTML = isAuto ? '🎥 AUTO-ROTATE: ON' : '🎥 AUTO-ROTATE: OFF';
    }); controls.autoRotate = isAuto; controls.autoRotateSpeed = 1.0;

    document.getElementById('btn-fullscreen').addEventListener('click', () => {
        const w = document.getElementById('vis-panel-wrapper');
        if (!document.fullscreenElement) w.requestFullscreen?.() || w.webkitRequestFullscreen?.();
        else document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    });

    document.addEventListener('fullscreenchange', () => {
        container.style.height = document.fullscreenElement ? '100vh' : '450px';
        setTimeout(() => { camera.aspect = container.clientWidth / container.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(container.clientWidth, container.clientHeight); composer.setSize(container.clientWidth, container.clientHeight); labelRenderer.setSize(container.clientWidth, container.clientHeight); }, 100);
    });

    function animate() {
        requestAnimationFrame(animate);
        if (steamMat.opacity > 0) {
            let pos = steamPoints.geometry.attributes.position.array;
            for(let i=0; i<steamCount; i++) {
                pos[i*3] += steamVel[i].x; pos[i*3+1] += steamVel[i].y;
                if (pos[i*3+1] > 35) { pos[i*3] = (Math.random() - 0.5) * 15; pos[i*3+1] = (Math.random() * 5) + 12; }
            }
            steamPoints.geometry.attributes.position.needsUpdate = true;
        }
        controls.update(); composer.render(); labelRenderer.render(scene, camera); 
    }
    animate();

//]]>
  } catch (err) { console.error('Module script error:', err); }
})();