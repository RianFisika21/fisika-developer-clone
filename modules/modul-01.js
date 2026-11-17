// Auto-generated module #01
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js dan OrbitControls (Untuk interaksi kamera 3D) -->\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Mekanika Orbit 3D (Lite)</h3>\r\n    \r\n    <div class="input-group">\r\n      <label>Massa Bintang (M) <span id="val-mass" class="value-display">1.0 M☉</span></label>\r\n      <input type="range" id="mass-slider" min="0.5" max="5.0" step="0.1" value="1.0">\r\n    </div>\r\n    \r\n    <div class="input-group">\r\n      <label>Radius Orbit (r) <span id="val-radius" class="value-display">50 Gm</span></label>\r\n      <input type="range" id="radius-slider" min="30" max="150" step="1" value="50">\r\n    </div>\r\n    \r\n    <div style="background: rgba(0, 243, 255, 0.05); border-left: 3px solid #00f3ff; padding: 10px; border-radius: 4px; margin-top: 20px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>KONTROL 3D KANVAS:</strong><br>\r\n        👆 <b>Drag:</b> Putar Kamera<br>\r\n        🔍 <b>Scroll:</b> Zoom In/Out\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" style="position: relative;">\r\n    <div id="canvas-3d-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.2); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n    \r\n    <!-- HUD Overlay -->\r\n    <div style="position: absolute; top: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.6); padding: 8px 12px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.3);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00f3ff; letter-spacing: 1px;">KECEPATAN ORBIT (v)</div>\r\n      <div id="hud-velocity" style="font-family: \'Orbitron\', monospace; font-size: 16px; color: #fff; font-weight: bold; text-shadow: 0 0 10px #00f3ff;">0.00 km/s</div>\r\n    </div>\r\n\r\n    <!-- HUD Parameter Periode -->\r\n    <div style="position: absolute; bottom: 15px; right: 20px; pointer-events: none; background: rgba(0,0,0,0.6); padding: 8px 12px; border-radius: 6px; text-align: right; border: 1px dashed rgba(255, 0, 85, 0.3);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #ff0055; letter-spacing: 1px;">PERIODE REVOLUSI (T)</div>\r\n      <div id="hud-period" style="font-family: \'Orbitron\', monospace; font-size: 14px; color: #fff; text-shadow: 0 0 10px #ff0055;">0.0 Hari</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #3
  try {

    // 1. INISIALISASI SCENE 3D
    const container = document.getElementById('canvas-3d-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);

    // 2. SETUP KAMERA
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 80, 120);

    // 3. SETUP RENDERER (OPTIMASI: Antialias mati, batas rasio piksel)
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 4. KONTROL KAMERA
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 300;
    controls.minDistance = 20;

    // 5. PENCAHAYAAN
    const ambientLight = new THREE.AmbientLight(0x444444); // Diterangkan sedikit untuk kompensasi Lambert
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00f3ff, 1.5, 300); 
    scene.add(pointLight);

    // 6. BINTANG UTAMA (OPTIMASI: Segmen 16x16)
    const starGeo = new THREE.SphereGeometry(10, 16, 16);
    const starMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true });
    const star = new THREE.Mesh(starGeo, starMat);
    scene.add(star);

    // 7. PLANET (OPTIMASI: Segmen 16x16, LambertMaterial lebih ringan dari StandardMaterial)
    const planetGeo = new THREE.SphereGeometry(3, 16, 16);
    const planetMat = new THREE.MeshLambertMaterial({ color: 0xff0055 });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    scene.add(planet);

    // 8. JALUR ORBIT (OPTIMASI: Penambahan dispose() untuk mencegah kebocoran memori RAM)
    let orbitPath;
    function drawOrbit(radius) {
        if(orbitPath) {
            scene.remove(orbitPath);
            orbitPath.geometry.dispose(); // Bebaskan VRAM
            orbitPath.material.dispose();
        }
        const pathGeo = new THREE.BufferGeometry();
        const points = [];
        // Cukup 48 titik untuk lingkaran utuh (sebelumnya 64)
        for(let i = 0; i <= 48; i++) {
            const angle = (i / 48) * Math.PI * 2;
            points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
        }
        pathGeo.setFromPoints(points);
        const pathMat = new THREE.LineDashedMaterial({ color: 0x8e949c, dashSize: 2, gapSize: 1 });
        orbitPath = new THREE.Line(pathGeo, pathMat);
        orbitPath.computeLineDistances();
        scene.add(orbitPath);
    }

    // PARTIKEL BINTANG JAUH (OPTIMASI: Kurangi dari 500 ke 200 partikel)
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({color: 0xffffff, size: 0.5});
    const starsVertices = [];
    for(let i = 0; i < 200; i++) {
        starsVertices.push(
            THREE.MathUtils.randFloatSpread(400),
            THREE.MathUtils.randFloatSpread(400),
            THREE.MathUtils.randFloatSpread(400)
        );
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // 9. LOGIKA FISIKA
    const massSlider = document.getElementById('mass-slider');
    const radiusSlider = document.getElementById('radius-slider');
    const valMass = document.getElementById('val-mass');
    const valRadius = document.getElementById('val-radius');
    const hudVelocity = document.getElementById('hud-velocity');
    const hudPeriod = document.getElementById('hud-period');

    const G = 6.674e-11; 
    let currentAngle = 0;

    function updatePhysics() {
        const M_sun = parseFloat(massSlider.value);
        const R = parseFloat(radiusSlider.value);
        
        valMass.innerText = M_sun.toFixed(1) + " M☉";
        valRadius.innerText = R.toFixed(0) + " Gm";

        const M_kg = M_sun * 1.989e30;
        const R_m = R * 1e9;
        const v_ms = Math.sqrt((G * M_kg) / R_m);
        const v_kms = v_ms / 1000;
        const T_sec = (2 * Math.PI * R_m) / v_ms;
        const T_days = T_sec / 86400;

        hudVelocity.innerText = v_kms.toFixed(2) + " km/s";
        hudPeriod.innerText = T_days.toFixed(1) + " Hari";
        drawOrbit(R);
        return v_kms * 0.0005; 
    }

    drawOrbit(parseFloat(radiusSlider.value));

    // 10. ANIMATION LOOP
    function animate() {
        requestAnimationFrame(animate);
        const angularVelocity = updatePhysics();
        currentAngle += angularVelocity;
        const R = parseFloat(radiusSlider.value);
        planet.position.x = Math.cos(currentAngle) * R;
        planet.position.z = Math.sin(currentAngle) * R;
        
        star.rotation.y += 0.005;
        planet.rotation.y += 0.02;

        controls.update(); 
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

  } catch (err) { console.error('Module script error:', err); }
})();