// Auto-generated Module #31 — Fisika Developer (37 Modules Edition)
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = "<div class=\"physics-sim-wrapper\">\n  <div class=\"control-panel\">\n    <h3>Struktur Pita Energi 3D</h3>\n    <div class=\"input-group\">\n      <label>Celah Pita Energi (Eg) <span id=\"val-gap\" class=\"value-display\">1.10 eV</span></label>\n      <input type=\"range\" id=\"gap-slider\" min=\"0.0\" max=\"3.5\" step=\"0.1\" value=\"1.1\">\n    </div>\n    <div class=\"input-group\">\n      <label>Suhu Kristal (T) <span id=\"val-temp\" class=\"value-display\">300 K</span></label>\n      <input type=\"range\" id=\"temp-slider\" min=\"10\" max=\"1200\" step=\"10\" value=\"300\">\n    </div>\n    <div class=\"input-group\">\n      <label>Integral Hopping (t) <span id=\"val-hop\" class=\"value-display\">0.80 eV</span></label>\n      <input type=\"range\" id=\"hopping-slider\" min=\"0.2\" max=\"1.5\" step=\"0.05\" value=\"0.8\">\n    </div>\n  </div>\n  <div class=\"visualization-panel\" style=\"position: relative;\">\n    <div id=\"canvas-3d-container\" style=\"width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.2);\"></div>\n    <div style=\"position: absolute; top: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #00f3ff;\">KLASIFIKASI MATERIAL</div>\n      <div id=\"hud-regime\" style=\"font-family: 'Orbitron', monospace; font-size: 14px; color: #fff; font-weight: bold;\">Semikonduktor</div>\n    </div>\n    <div style=\"position: absolute; bottom: 15px; right: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; text-align: right; border: 1px dashed rgba(255, 0, 85, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #ff0055;\">EKSITASI TERMAL nᵢ (RELATIF)</div>\n      <div id=\"hud-carrier\" style=\"font-family: 'Orbitron', monospace; font-size: 14px; color: #fff;\">1.45e-10</div>\n    </div>\n  </div>\n</div>";

  try {
const container = document.getElementById('canvas-3d-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);

    const w = container.clientWidth || 340;
    const h = container.clientHeight || 360;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(38, 28, 44);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const seg = 28;
    const size = 26;
    const cbGeo = new THREE.PlaneGeometry(size, size, seg, seg);
    cbGeo.rotateX(-Math.PI / 2);
    const cbMesh = new THREE.Mesh(cbGeo, new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true }));
    scene.add(cbMesh);

    const vbGeo = new THREE.PlaneGeometry(size, size, seg, seg);
    vbGeo.rotateX(-Math.PI / 2);
    const vbMesh = new THREE.Mesh(vbGeo, new THREE.MeshBasicMaterial({ color: 0xff0055, wireframe: true }));
    scene.add(vbMesh);

    // Bidang Tingkat Fermi E_F = 0
    const fermiPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(size + 2, size + 2),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24, side: THREE.DoubleSide, transparent: true, opacity: 0.16 })
    );
    fermiPlane.rotation.x = Math.PI / 2;
    scene.add(fermiPlane);

    // Partikel elektron tereksitasi di pita konduksi
    const electrons = [];
    const eGeo = new THREE.SphereGeometry(0.45, 10, 10);
    for (let i = 0; i < 60; i++) {
      const m = new THREE.Mesh(eGeo, new THREE.MeshBasicMaterial({ color: 0x10b981 }));
      scene.add(m);
      electrons.push({ mesh: m, kx: (Math.random() - 0.5) * 2, kz: (Math.random() - 0.5) * 2, phase: Math.random() * 6.28 });
    }

    const gapSlider = document.getElementById('gap-slider');
    const tempSlider = document.getElementById('temp-slider');
    const hopSlider = document.getElementById('hopping-slider');
    const valGap = document.getElementById('val-gap');
    const valTemp = document.getElementById('val-temp');
    const valHop = document.getElementById('val-hop');
    const hudRegime = document.getElementById('hud-regime');
    const hudCarrier = document.getElementById('hud-carrier');

    function updateBands() {
      const Eg = parseFloat(gapSlider.value);
      const T = parseFloat(tempSlider.value);
      const tHop = parseFloat(hopSlider.value);

      valGap.innerText = Eg.toFixed(2) + " eV";
      valTemp.innerText = T.toFixed(0) + " K";
      valHop.innerText = tHop.toFixed(2) + " eV";

      hudRegime.innerText = Eg === 0 ? "Konduktor (Logam)" : (Eg <= 2.2 ? "Semikonduktor" : "Isolator Dielektrik");
      const kBT = 8.617e-5 * T;
      const ni = Math.exp(-Eg / (2 * kBT));
      hudCarrier.innerText = ni.toExponential(2);

      const cbPos = cbGeo.attributes.position;
      const vbPos = vbGeo.attributes.position;
      const scaleY = 4.5;

      for (let i = 0; i < cbPos.count; i++) {
        const x = cbPos.getX(i);
        const z = cbPos.getZ(i);
        const kx = (x / (size / 2)) * Math.PI;
        const kz = (z / (size / 2)) * Math.PI;
        const disp = 2 * tHop * (2 - Math.cos(kx) - Math.cos(kz));
        cbPos.setY(i, (Eg / 2 + disp) * scaleY);
        vbPos.setY(i, (-Eg / 2 - disp) * scaleY);
      }
      cbPos.needsUpdate = true;
      vbPos.needsUpdate = true;

      const activeCount = Math.max(2, Math.min(60, Math.round(60 * Math.pow(ni, 0.12))));
      electrons.forEach((e, idx) => {
        e.mesh.visible = idx < activeCount;
      });
    }

    gapSlider.addEventListener('input', updateBands);
    tempSlider.addEventListener('input', updateBands);
    hopSlider.addEventListener('input', updateBands);
    updateBands();

    let time = 0;
    function animate() {
      requestAnimationFrame(animate);
      time += 0.03;
      const Eg = parseFloat(gapSlider.value);
      const tHop = parseFloat(hopSlider.value);
      electrons.forEach((e, idx) => {
        if (!e.mesh.visible) return;
        const kx = Math.sin(time + e.phase + idx) * 1.3;
        const kz = Math.cos(time * 0.8 + e.phase) * 1.3;
        const disp = 2 * tHop * (2 - Math.cos(kx) - Math.cos(kz));
        e.mesh.position.set((kx / Math.PI) * (size / 2), (Eg / 2 + disp) * 4.5 + 0.5, (kz / Math.PI) * (size / 2));
      });
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      const nw = container.clientWidth || 320;
      const nh = container.clientHeight || 330;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
  } catch (err) {
    console.error("Module #31 error:", err);
    var errBox = document.createElement("div");
    errBox.style.cssText = "margin-top:10px;padding:10px;background:rgba(239,68,68,0.15);border:1px solid #ef4444;color:#fca5a5;border-radius:6px;font-size:12px;";
    errBox.textContent = "Runtime Error Modul #31: " + err.message;
    mount.appendChild(errBox);
  }
})();
