// Auto-generated Module #32 — Fisika Developer (37 Modules Edition)
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = "<div class=\"physics-sim-wrapper\">\n  <div class=\"control-panel\">\n    <h3>Efek Magnus & Bola Berputar</h3>\n    <div class=\"input-group\">\n      <label>Kecepatan Awal (v₀) <span id=\"val-speed\" class=\"value-display\">30 m/s</span></label>\n      <input type=\"range\" id=\"speed-slider\" min=\"15\" max=\"45\" step=\"1\" value=\"30\">\n    </div>\n    <div class=\"input-group\">\n      <label>Kecepatan Spin (ω) <span id=\"val-spin\" class=\"value-display\">45 rad/s</span></label>\n      <input type=\"range\" id=\"spin-slider\" min=\"-80\" max=\"80\" step=\"5\" value=\"45\">\n    </div>\n    <div class=\"input-group\">\n      <label>Sudut Elevasi (θ₀) <span id=\"val-angle\" class=\"value-display\">16°</span></label>\n      <input type=\"range\" id=\"angle-slider\" min=\"6\" max=\"32\" step=\"1\" value=\"16\">\n    </div>\n  </div>\n  <div class=\"visualization-panel\" style=\"position: relative;\">\n    <div id=\"canvas-3d-container\" style=\"width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.2);\"></div>\n    <div style=\"position: absolute; top: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #00f3ff;\">DEFLEKSI LATERAL MAGNUS</div>\n      <div id=\"hud-deflect\" style=\"font-family: 'Orbitron', monospace; font-size: 15px; color: #fff; font-weight: bold;\">0.00 m</div>\n    </div>\n    <div style=\"position: absolute; bottom: 15px; right: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; text-align: right; border: 1px dashed rgba(255, 0, 85, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #ff0055;\">JARAK JANGKAUAN (X)</div>\n      <div id=\"hud-range\" style=\"font-family: 'Orbitron', monospace; font-size: 14px; color: #fff;\">0.0 m</div>\n    </div>\n  </div>\n</div>";

  try {
const container = document.getElementById('canvas-3d-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);

    const w = container.clientWidth || 340;
    const h = container.clientHeight || 360;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(-22, 18, 42);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(20, 4, 0);
    controls.enableDamping = true;

    const field = new THREE.GridHelper(90, 18, 0x10b981, 0x0f172a);
    field.position.set(25, 0, 0);
    scene.add(field);

    const ball = new THREE.Mesh(
      new THREE.SphereGeometry(1.1, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24, wireframe: true })
    );
    scene.add(ball);

    const trajGeo = new THREE.BufferGeometry();
    const trajLine = new THREE.Line(trajGeo, new THREE.LineBasicMaterial({ color: 0x00f3ff }));
    scene.add(trajLine);

    const refGeo = new THREE.BufferGeometry();
    const refLine = new THREE.Line(refGeo, new THREE.LineBasicMaterial({ color: 0x475569 }));
    scene.add(refLine);

    const sSlider = document.getElementById('speed-slider');
    const wSlider = document.getElementById('spin-slider');
    const aSlider = document.getElementById('angle-slider');
    const valS = document.getElementById('val-speed');
    const valW = document.getElementById('val-spin');
    const valA = document.getElementById('val-angle');
    const hudDef = document.getElementById('hud-deflect');
    const hudRng = document.getElementById('hud-range');

    let pathPts = [];
    function computeTrajectory() {
      const v0 = parseFloat(sSlider.value);
      const omega = parseFloat(wSlider.value);
      const deg = parseFloat(aSlider.value);
      valS.innerText = v0.toFixed(0) + " m/s";
      valW.innerText = omega.toFixed(0) + " rad/s";
      valA.innerText = deg.toFixed(0) + "°";

      const th = deg * Math.PI / 180;
      const dt = 0.02;
      const mass = 0.43; // kg
      const cD = 0.0055;
      const cM = 0.00038;

      let x = 0, y = 0.5, z = 0;
      let vx = v0 * Math.cos(th), vy = v0 * Math.sin(th), vz = 0;
      pathPts = [new THREE.Vector3(x, y, z)];

      let rx = 0, ry = 0.5, rvx = vx, rvy = vy;
      const refPts = [new THREE.Vector3(rx, ry, 0)];

      for (let step = 0; step < 300 && y >= 0; step++) {
        const vMag = Math.hypot(vx, vy, vz);
        const ax = (-cD * vMag * vx - cM * omega * vz) / mass;
        const ay = -9.81 + (-cD * vMag * vy) / mass;
        const az = (-cD * vMag * vz + cM * omega * vx) / mass;
        vx += ax * dt; vy += ay * dt; vz += az * dt;
        x += vx * dt; y += vy * dt; z += vz * dt;
        pathPts.push(new THREE.Vector3(x, Math.max(0, y), z));

        if (ry >= 0) {
          const rvMag = Math.hypot(rvx, rvy);
          rvx += (-cD * rvMag * rvx / mass) * dt;
          rvy += (-9.81 - cD * rvMag * rvy / mass) * dt;
          rx += rvx * dt; ry += rvy * dt;
          refPts.push(new THREE.Vector3(rx, Math.max(0, ry), 0));
        }
      }

      trajGeo.setFromPoints(pathPts);
      refGeo.setFromPoints(refPts);
      const last = pathPts[pathPts.length - 1];
      hudDef.innerText = last.z.toFixed(2) + " m";
      hudRng.innerText = last.x.toFixed(1) + " m";
    }

    sSlider.addEventListener('input', computeTrajectory);
    wSlider.addEventListener('input', computeTrajectory);
    aSlider.addEventListener('input', computeTrajectory);
    computeTrajectory();

    let idx = 0;
    function animate() {
      requestAnimationFrame(animate);
      if (pathPts.length > 1) {
        idx = (idx + 0.6) % pathPts.length;
        const p = pathPts[Math.floor(idx)];
        ball.position.copy(p);
        ball.rotation.y += parseFloat(wSlider.value) * 0.008;
      }
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
    console.error("Module #32 error:", err);
    var errBox = document.createElement("div");
    errBox.style.cssText = "margin-top:10px;padding:10px;background:rgba(239,68,68,0.15);border:1px solid #ef4444;color:#fca5a5;border-radius:6px;font-size:12px;";
    errBox.textContent = "Runtime Error Modul #32: " + err.message;
    mount.appendChild(errBox);
  }
})();
