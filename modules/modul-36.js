// Auto-generated Module #36 — Fisika Developer (37 Modules Edition)
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = "<div class=\"physics-sim-wrapper\">\n  <div class=\"control-panel\">\n    <h3>Pendulum Ganda Chaos 3D</h3>\n    <div class=\"input-group\">\n      <label>Sudut Awal (θ₁) <span id=\"val-angle1\" class=\"value-display\">120°</span></label>\n      <input type=\"range\" id=\"angle1-slider\" min=\"30\" max=\"170\" step=\"5\" value=\"120\">\n    </div>\n    <div class=\"input-group\">\n      <label>Massa Bandul Bawah (m₂) <span id=\"val-m2\" class=\"value-display\">1.5 kg</span></label>\n      <input type=\"range\" id=\"m2-slider\" min=\"0.5\" max=\"3.0\" step=\"0.1\" value=\"1.5\">\n    </div>\n    <button type=\"button\" id=\"btn-reset-pend\" style=\"width:100%;padding:8px;margin-top:8px;background:rgba(0,229,255,0.15);border:1px solid #00e5ff;color:#00e5ff;border-radius:6px;font-weight:700;cursor:pointer;\">🔄 Lepaskan Ulang Bandul</button>\n  </div>\n  <div class=\"visualization-panel\" style=\"position: relative;\">\n    <div id=\"canvas-3d-container\" style=\"width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.2);\"></div>\n    <div style=\"position: absolute; top: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #00f3ff;\">KECEPATAN SUDUT (ω₂)</div>\n      <div id=\"hud-omega2\" style=\"font-family: 'Orbitron', monospace; font-size: 15px; color: #fff; font-weight: bold;\">0.00 rad/s</div>\n    </div>\n    <div style=\"position: absolute; bottom: 15px; right: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; text-align: right; border: 1px dashed rgba(255, 0, 85, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #ff0055;\">ENERGI MEKANIK TOTAL</div>\n      <div id=\"hud-energy\" style=\"font-family: 'Orbitron', monospace; font-size: 14px; color: #fff;\">0.00 J</div>\n    </div>\n  </div>\n</div>";

  try {
const container = document.getElementById('canvas-3d-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);

    const w = container.clientWidth || 340;
    const h = container.clientHeight || 360;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(0, -4, 46);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, -6, 0);
    controls.enableDamping = true;

    const pivot = new THREE.Mesh(new THREE.SphereGeometry(0.8, 12, 12), new THREE.MeshBasicMaterial({ color: 0x94a3b8 }));
    scene.add(pivot);

    const rodGeo = new THREE.BufferGeometry();
    const rodLine = new THREE.Line(rodGeo, new THREE.LineBasicMaterial({ color: 0xe2e8f0 }));
    scene.add(rodLine);

    const bob1 = new THREE.Mesh(new THREE.SphereGeometry(1.2, 16, 16), new THREE.MeshBasicMaterial({ color: 0x00f3ff }));
    const bob2 = new THREE.Mesh(new THREE.SphereGeometry(1.4, 16, 16), new THREE.MeshBasicMaterial({ color: 0xff0055 }));
    scene.add(bob1, bob2);

    const trailPts = [];
    const trailGeo = new THREE.BufferGeometry();
    const trailLine = new THREE.Line(trailGeo, new THREE.LineBasicMaterial({ color: 0xff0055 }));
    scene.add(trailLine);

    const a1Slider = document.getElementById('angle1-slider');
    const m2Slider = document.getElementById('m2-slider');
    const valA1 = document.getElementById('val-angle1');
    const valM2 = document.getElementById('val-m2');
    const hudOm2 = document.getElementById('hud-omega2');
    const hudEn = document.getElementById('hud-energy');

    const L1 = 10, L2 = 10, m1 = 1.5, g = 9.81;
    let th1 = 2.1, th2 = 2.4, w1 = 0, w2 = 0;

    function resetPendulum() {
      const deg = parseFloat(a1Slider.value);
      valA1.innerText = deg.toFixed(0) + "°";
      th1 = deg * Math.PI / 180;
      th2 = th1 + 0.25;
      w1 = 0; w2 = 0;
      trailPts.length = 0;
    }

    a1Slider.addEventListener('change', resetPendulum);
    a1Slider.addEventListener('input', () => { valA1.innerText = a1Slider.value + "°"; });
    m2Slider.addEventListener('input', () => { valM2.innerText = parseFloat(m2Slider.value).toFixed(1) + " kg"; });
    document.getElementById('btn-reset-pend').addEventListener('click', resetPendulum);
    resetPendulum();

    function stepPhysics(dt) {
      const m2 = parseFloat(m2Slider.value);
      const d = th1 - th2;
      const den1 = (2 * m1 + m2 - m2 * Math.cos(2 * d)) * L1;
      const den2 = (2 * m1 + m2 - m2 * Math.cos(2 * d)) * L2;

      const a1 = (-g * (2 * m1 + m2) * Math.sin(th1) - m2 * g * Math.sin(th1 - 2 * th2) - 2 * Math.sin(d) * m2 * (w2 * w2 * L2 + w1 * w1 * L1 * Math.cos(d))) / den1;
      const a2 = (2 * Math.sin(d) * (w1 * w1 * L1 * (m1 + m2) + g * (m1 + m2) * Math.cos(th1) + w2 * w2 * L2 * m2 * Math.cos(d))) / den2;

      w1 += a1 * dt;
      w2 += a2 * dt;
      th1 += w1 * dt;
      th2 += w2 * dt;
    }

    function animate() {
      requestAnimationFrame(animate);
      for (let s = 0; s < 4; s++) stepPhysics(0.008);

      const x1 = L1 * Math.sin(th1);
      const y1 = -L1 * Math.cos(th1);
      const x2 = x1 + L2 * Math.sin(th2);
      const y2 = y1 - L2 * Math.cos(th2);

      bob1.position.set(x1, y1, 0);
      bob2.position.set(x2, y2, 0);
      rodGeo.setFromPoints([new THREE.Vector3(0, 0, 0), bob1.position, bob2.position]);

      trailPts.push(new THREE.Vector3(x2, y2, -0.2));
      if (trailPts.length > 220) trailPts.shift();
      trailGeo.setFromPoints(trailPts);

      const m2 = parseFloat(m2Slider.value);
      const T = 0.5 * m1 * (L1 * w1) ** 2 + 0.5 * m2 * ((L1 * w1) ** 2 + (L2 * w2) ** 2 + 2 * L1 * L2 * w1 * w2 * Math.cos(th1 - th2));
      const V = -(m1 + m2) * g * L1 * Math.cos(th1) - m2 * g * L2 * Math.cos(th2);
      hudOm2.innerText = w2.toFixed(2) + " rad/s";
      hudEn.innerText = ((T + V) * 0.1).toFixed(2) + " J";

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
    console.error("Module #36 error:", err);
    var errBox = document.createElement("div");
    errBox.style.cssText = "margin-top:10px;padding:10px;background:rgba(239,68,68,0.15);border:1px solid #ef4444;color:#fca5a5;border-radius:6px;font-size:12px;";
    errBox.textContent = "Runtime Error Modul #36: " + err.message;
    mount.appendChild(errBox);
  }
})();
