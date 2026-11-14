// Auto-generated Module #30 — Fisika Developer (37 Modules Edition)
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = "<div class=\"physics-sim-wrapper\">\n  <div class=\"control-panel\">\n    <h3>Bola Bloch 3D & Qubit</h3>\n    <div class=\"input-group\">\n      <label>Frekuensi Rabi (Ω₀) <span id=\"val-rabi\" class=\"value-display\">2.0 MHz</span></label>\n      <input type=\"range\" id=\"rabi-slider\" min=\"0.5\" max=\"5.0\" step=\"0.1\" value=\"2.0\">\n    </div>\n    <div class=\"input-group\">\n      <label>Detuning Medan (Δ) <span id=\"val-detuning\" class=\"value-display\">0.5 MHz</span></label>\n      <input type=\"range\" id=\"detuning-slider\" min=\"-4.0\" max=\"4.0\" step=\"0.1\" value=\"0.5\">\n    </div>\n    <div style=\"background: rgba(0, 243, 255, 0.05); border-left: 3px solid #00f3ff; padding: 10px; border-radius: 4px; margin-top: 16px;\">\n      <p style=\"margin: 0; font-size: 12px; color: #8e949c;\">\n        ⬆️ <b>Kutub Utara:</b> Basis Keadaan |0⟩<br>\n        ⬇️ <b>Kutub Selatan:</b> Basis Keadaan |1⟩<br>\n        🟡 <b>Vektor Bloch:</b> Evolusi Superposisi |ψ(t)⟩\n      </p>\n    </div>\n  </div>\n  <div class=\"visualization-panel\" style=\"position: relative;\">\n    <div id=\"canvas-3d-container\" style=\"width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.2);\"></div>\n    <div style=\"position: absolute; top: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #00f3ff;\">PROBABILITAS EKSITASI P(|1⟩)</div>\n      <div id=\"hud-prob1\" style=\"font-family: 'Orbitron', monospace; font-size: 15px; color: #fff; font-weight: bold;\">0.0 %</div>\n    </div>\n    <div style=\"position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; border: 1px dashed rgba(255, 0, 85, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #ff0055;\">FREKUENSI RABI EFEKTIF (Ωᵣ)</div>\n      <div id=\"hud-omega\" style=\"font-family: 'Orbitron', monospace; font-size: 14px; color: #fff;\">2.06 MHz</div>\n    </div>\n    <div style=\"position: absolute; bottom: 15px; right: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; text-align: right; border: 1px dashed rgba(16, 185, 129, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #10b981;\">SUDUT FASE (φ)</div>\n      <div id=\"hud-phase\" style=\"font-family: 'Orbitron', monospace; font-size: 14px; color: #fff;\">0.00 rad</div>\n    </div>\n  </div>\n</div>";

  try {
const container = document.getElementById('canvas-3d-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);

    const w = container.clientWidth || 340;
    const h = container.clientHeight || 360;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(36, 26, 44);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const R = 16;
    // Wireframe Bola Bloch
    const sphereWire = new THREE.Mesh(
      new THREE.SphereGeometry(R, 24, 18),
      new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true, transparent: true, opacity: 0.16 })
    );
    scene.add(sphereWire);

    // Lingkaran Ekuator
    const eqPts = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      eqPts.push(new THREE.Vector3(Math.cos(a) * R, 0, Math.sin(a) * R));
    }
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(eqPts), new THREE.LineBasicMaterial({ color: 0x38bdf8 })));

    // Sumbu X, Y, Z
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -R - 4, 0), new THREE.Vector3(0, R + 4, 0)]), new THREE.LineBasicMaterial({ color: 0x64748b })));
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-R - 3, 0, 0), new THREE.Vector3(R + 3, 0, 0)]), new THREE.LineBasicMaterial({ color: 0x334155 })));
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, -R - 3), new THREE.Vector3(0, 0, R + 3)]), new THREE.LineBasicMaterial({ color: 0x334155 })));

    // Penanda |0> (atas) dan |1> (bawah)
    const pole0 = new THREE.Mesh(new THREE.SphereGeometry(1.1, 16, 16), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
    pole0.position.set(0, R, 0);
    const pole1 = new THREE.Mesh(new THREE.SphereGeometry(1.1, 16, 16), new THREE.MeshBasicMaterial({ color: 0xff0055 }));
    pole1.position.set(0, -R, 0);
    scene.add(pole0, pole1);

    // Vektor keadaan Qubit
    const arrowDir = new THREE.Vector3(0, 1, 0);
    const stateArrow = new THREE.ArrowHelper(arrowDir, new THREE.Vector3(0, 0, 0), R, 0xfbbf24, 2.4, 1.4);
    scene.add(stateArrow);

    const tipSphere = new THREE.Mesh(new THREE.SphereGeometry(1.0, 16, 16), new THREE.MeshBasicMaterial({ color: 0xfbbf24 }));
    scene.add(tipSphere);

    // Jejak lintasan di permukaan bola
    const trailMax = 140;
    const trailPts = [];
    const trailGeo = new THREE.BufferGeometry();
    const trailLine = new THREE.Line(trailGeo, new THREE.LineBasicMaterial({ color: 0xff0055 }));
    scene.add(trailLine);

    const rSlider = document.getElementById('rabi-slider');
    const dSlider = document.getElementById('detuning-slider');
    const valR = document.getElementById('val-rabi');
    const valD = document.getElementById('val-detuning');
    const hudP1 = document.getElementById('hud-prob1');
    const hudOm = document.getElementById('hud-omega');
    const hudPh = document.getElementById('hud-phase');

    let t = 0;
    function animate() {
      requestAnimationFrame(animate);
      t += 0.025;

      const Om0 = parseFloat(rSlider.value);
      const delta = parseFloat(dSlider.value);
      valR.innerText = Om0.toFixed(1) + " MHz";
      valD.innerText = delta.toFixed(1) + " MHz";

      const OmR = Math.sqrt(Om0 * Om0 + delta * delta);
      // Evolusi vektor Bloch dari keadaan awal |0> (0, 1, 0) di bawah Hamiltonian H = (Om0 X + delta Z)/2
      const nx = Om0 / OmR;
      const nz = delta / OmR;
      const ang = OmR * t;
      const c = Math.cos(ang);
      const s = Math.sin(ang);

      // Rotasi Rodrigues vektor (0, 0, 1) terhadap sumbu (nx, 0, nz)
      const vx = nx * nz * (1 - c);
      const vy = -nx * s;
      const vz = c + nz * nz * (1 - c);

      // Mapping ke Three.js (Y = sumbu Z Bloch)
      const pos = new THREE.Vector3(vx * R, vz * R, vy * R);
      stateArrow.setDirection(pos.clone().normalize());
      tipSphere.position.copy(pos);

      trailPts.push(pos.clone());
      if (trailPts.length > trailMax) trailPts.shift();
      trailGeo.setFromPoints(trailPts);

      const p1 = (1 - vz) * 0.5 * 100;
      const phi = Math.atan2(vy, vx);
      hudP1.innerText = p1.toFixed(1) + " %";
      hudOm.innerText = OmR.toFixed(2) + " MHz";
      hudPh.innerText = phi.toFixed(2) + " rad";

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
    console.error("Module #30 error:", err);
    var errBox = document.createElement("div");
    errBox.style.cssText = "margin-top:10px;padding:10px;background:rgba(239,68,68,0.15);border:1px solid #ef4444;color:#fca5a5;border-radius:6px;font-size:12px;";
    errBox.textContent = "Runtime Error Modul #30: " + err.message;
    mount.appendChild(errBox);
  }
})();
