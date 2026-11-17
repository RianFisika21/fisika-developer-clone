// Auto-generated Module #29 — Fisika Developer (37 Modules Edition)
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = "<div class=\"physics-sim-wrapper\">\n  <div class=\"control-panel\">\n    <h3>Rantai Peluruhan Bateman 3D</h3>\n    <div class=\"input-group\">\n      <label>Waktu Paruh Induk (T₁/₂ A) <span id=\"val-t1\" class=\"value-display\">4.0 s</span></label>\n      <input type=\"range\" id=\"t1-slider\" min=\"1.0\" max=\"15.0\" step=\"0.5\" value=\"4.0\">\n    </div>\n    <div class=\"input-group\">\n      <label>Waktu Paruh Anak (T₁/₂ B) <span id=\"val-t2\" class=\"value-display\">6.0 s</span></label>\n      <input type=\"range\" id=\"t2-slider\" min=\"1.0\" max=\"15.0\" step=\"0.5\" value=\"6.0\">\n    </div>\n    <button type=\"button\" id=\"btn-reset-decay\" style=\"width:100%;padding:8px;margin-top:8px;background:rgba(0,229,255,0.15);border:1px solid #00e5ff;color:#00e5ff;border-radius:6px;font-weight:700;cursor:pointer;\">🔄 Reset Sampel Nuklir (t = 0)</button>\n    <div style=\"background: rgba(0, 243, 255, 0.05); border-left: 3px solid #00f3ff; padding: 10px; border-radius: 4px; margin-top: 14px;\">\n      <p style=\"margin: 0; font-size: 12px; color: #8e949c;\">\n        🔵 <b>Nuklida A (Induk):</b> Radioaktif Primer<br>\n        🩷 <b>Nuklida B (Anak):</b> Produk Antara<br>\n        🟢 <b>Nuklida C (Cucu):</b> Isotop Stabil\n      </p>\n    </div>\n  </div>\n  <div class=\"visualization-panel\" style=\"position: relative;\">\n    <div id=\"canvas-3d-container\" style=\"width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.2);\"></div>\n    <div style=\"position: absolute; top: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #00f3ff;\">POPULASI INDUK Nₐ(t)</div>\n      <div id=\"hud-na\" style=\"font-family: 'Orbitron', monospace; font-size: 15px; color: #fff; font-weight: bold;\">100.0 %</div>\n    </div>\n    <div style=\"position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; border: 1px dashed rgba(255, 0, 85, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #ff0055;\">POPULASI ANAK Nᵦ(t)</div>\n      <div id=\"hud-nb\" style=\"font-family: 'Orbitron', monospace; font-size: 14px; color: #fff;\">0.0 %</div>\n    </div>\n    <div style=\"position: absolute; bottom: 15px; right: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; text-align: right; border: 1px dashed rgba(16, 185, 129, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #10b981;\">AKTIVITAS TOTAL (A)</div>\n      <div id=\"hud-activity\" style=\"font-family: 'Orbitron', monospace; font-size: 14px; color: #fff;\">173.3 Bq</div>\n    </div>\n  </div>\n</div>";

  try {
const container = document.getElementById('canvas-3d-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);

    const w = container.clientWidth || 340;
    const h = container.clientHeight || 360;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(0, 42, 68);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const N_TOTAL = 256; // 16x16 kisi inti atom
    const nuclei = [];
    const geo = new THREE.SphereGeometry(0.95, 12, 12);
    const group = new THREE.Group();
    scene.add(group);

    for (let i = 0; i < N_TOTAL; i++) {
      const ix = i % 16;
      const iz = Math.floor(i / 16);
      const mat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((ix - 7.5) * 2.7, 0, (iz - 7.5) * 2.7);
      group.add(mesh);
      nuclei.push({ mesh, state: 0, order: Math.random() });
    }
    nuclei.sort((a, b) => a.order - b.order);

    // Partikel emisi radiasi ke atas
    const rays = [];
    const rayGeo = new THREE.SphereGeometry(0.45, 8, 8);
    for (let i = 0; i < 45; i++) {
      const m = new THREE.Mesh(rayGeo, new THREE.MeshBasicMaterial({ color: 0xfbbf24 }));
      m.visible = false;
      scene.add(m);
      rays.push({ mesh: m, life: 0, vy: 0.7 });
    }

    const t1Slider = document.getElementById('t1-slider');
    const t2Slider = document.getElementById('t2-slider');
    const valT1 = document.getElementById('val-t1');
    const valT2 = document.getElementById('val-t2');
    const hudNa = document.getElementById('hud-na');
    const hudNb = document.getElementById('hud-nb');
    const hudAct = document.getElementById('hud-activity');

    let simTime = 0;
    let lastTime = performance.now();

    function resetSample() {
      simTime = 0;
      nuclei.forEach(n => {
        n.state = 0;
        n.mesh.material.color.setHex(0x00f3ff);
        n.mesh.position.y = 0;
      });
    }
    document.getElementById('btn-reset-decay').addEventListener('click', resetSample);

    function spawnRay(pos, hexColor) {
      const r = rays.find(x => !x.mesh.visible);
      if (!r) return;
      r.mesh.visible = true;
      r.mesh.position.copy(pos);
      r.mesh.material.color.setHex(hexColor);
      r.life = 1.0;
    }

    function animate() {
      requestAnimationFrame(animate);
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      simTime += dt;

      const T1 = parseFloat(t1Slider.value);
      const T2 = parseFloat(t2Slider.value);
      valT1.innerText = T1.toFixed(1) + " s";
      valT2.innerText = T2.toFixed(1) + " s";

      const l1 = Math.LN2 / T1;
      const l2 = Math.LN2 / T2;
      const fA = Math.exp(-l1 * simTime);
      const fB = Math.abs(l2 - l1) < 1e-4
        ? l1 * simTime * Math.exp(-l1 * simTime)
        : (l1 / (l2 - l1)) * (Math.exp(-l1 * simTime) - Math.exp(-l2 * simTime));
      const fC = Math.max(0, 1 - fA - fB);

      const countA = Math.round(fA * N_TOTAL);
      const countB = Math.round(fB * N_TOTAL);

      for (let i = 0; i < N_TOTAL; i++) {
        const n = nuclei[i];
        const targetState = i < countA ? 0 : (i < countA + countB ? 1 : 2);
        if (n.state !== targetState) {
          n.state = targetState;
          if (targetState === 1) {
            n.mesh.material.color.setHex(0xff0055);
            spawnRay(n.mesh.position, 0x00f3ff);
          } else if (targetState === 2) {
            n.mesh.material.color.setHex(0x10b981);
            spawnRay(n.mesh.position, 0xff0055);
          }
        }
        n.mesh.position.y = n.state === 0 ? Math.sin(simTime * 6 + i) * 0.35 : (n.state === 1 ? Math.cos(simTime * 5 + i) * 0.25 : 0);
      }

      rays.forEach(r => {
        if (!r.mesh.visible) return;
        r.mesh.position.y += r.vy;
        r.life -= 0.03;
        if (r.life <= 0) r.mesh.visible = false;
      });

      const act = 1000 * (l1 * fA + l2 * fB);
      hudNa.innerText = (fA * 100).toFixed(1) + " %";
      hudNb.innerText = (fB * 100).toFixed(1) + " %";
      hudAct.innerText = act.toFixed(1) + " Bq";

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
    console.error("Module #29 error:", err);
    var errBox = document.createElement("div");
    errBox.style.cssText = "margin-top:10px;padding:10px;background:rgba(239,68,68,0.15);border:1px solid #ef4444;color:#fca5a5;border-radius:6px;font-size:12px;";
    errBox.textContent = "Runtime Error Modul #29: " + err.message;
    mount.appendChild(errBox);
  }
})();
