// Auto-generated Module #28 — Fisika Developer (37 Modules Edition)
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = "<div class=\"physics-sim-wrapper\">\n  <div class=\"control-panel\">\n    <h3>Hamburan Compton 3D</h3>\n    <div class=\"input-group\">\n      <label>Energi Foton Datang (E₀) <span id=\"val-energy\" class=\"value-display\">511 keV</span></label>\n      <input type=\"range\" id=\"energy-slider\" min=\"50\" max=\"2000\" step=\"10\" value=\"511\">\n    </div>\n    <div class=\"input-group\">\n      <label>Sudut Hambur Foton (θ) <span id=\"val-angle\" class=\"value-display\">60°</span></label>\n      <input type=\"range\" id=\"angle-slider\" min=\"10\" max=\"180\" step=\"1\" value=\"60\">\n    </div>\n    <div style=\"background: rgba(0, 243, 255, 0.05); border-left: 3px solid #00f3ff; padding: 10px; border-radius: 4px; margin-top: 16px;\">\n      <p style=\"margin: 0; font-size: 12px; color: #8e949c;\">\n        <strong>LEGENDA PARTIKEL:</strong><br>\n        🔵 <b>Cyan:</b> Foton Gamma Datang (E₀)<br>\n        🟡 <b>Emas/Merah:</b> Foton Terhambur (E')<br>\n        🩷 <b>Magenta:</b> Elektron Terpental (Kₑ)\n      </p>\n    </div>\n  </div>\n  <div class=\"visualization-panel\" style=\"position: relative;\">\n    <div id=\"canvas-3d-container\" style=\"width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.2);\"></div>\n    <div style=\"position: absolute; top: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #00f3ff;\">ENERGI FOTON TERHAMBUR (E')</div>\n      <div id=\"hud-ep\" style=\"font-family: 'Orbitron', monospace; font-size: 15px; color: #fff; font-weight: bold;\">340.7 keV</div>\n    </div>\n    <div style=\"position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; border: 1px dashed rgba(255, 0, 85, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #ff0055;\">ENERGI KINETIK ELEKTRON (Kₑ)</div>\n      <div id=\"hud-ke\" style=\"font-family: 'Orbitron', monospace; font-size: 14px; color: #fff;\">170.3 keV</div>\n    </div>\n    <div style=\"position: absolute; bottom: 15px; right: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; text-align: right; border: 1px dashed rgba(16, 185, 129, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #10b981;\">PERGESERAN Δλ</div>\n      <div id=\"hud-dlambda\" style=\"font-family: 'Orbitron', monospace; font-size: 14px; color: #fff;\">1.21 pm</div>\n    </div>\n  </div>\n</div>";

  try {
const container = document.getElementById('canvas-3d-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);

    const w = container.clientWidth || 340;
    const h = container.clientHeight || 360;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(0, 48, 88);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const grid = new THREE.GridHelper(100, 20, 0x1e293b, 0x0f172a);
    scene.add(grid);

    // Elektron target di pusat tumbukan
    const targetElectron = new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xff0055 })
    );
    scene.add(targetElectron);

    const halo = new THREE.Mesh(
      new THREE.RingGeometry(3.2, 4.0, 32),
      new THREE.MeshBasicMaterial({ color: 0x00f3ff, side: THREE.DoubleSide, transparent: true, opacity: 0.45 })
    );
    halo.rotation.x = Math.PI / 2;
    scene.add(halo);

    // Garis lintasan foton datang (-X ke 0)
    const incMat = new THREE.LineBasicMaterial({ color: 0x00f3ff });
    const incGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-42, 0, 0), new THREE.Vector3(0, 0, 0)]);
    scene.add(new THREE.Line(incGeo, incMat));

    // Garis dinamis foton terhambur & elektron terpental
    const scatGeo = new THREE.BufferGeometry();
    const scatMat = new THREE.LineBasicMaterial({ color: 0xfbbf24 });
    const scatLine = new THREE.Line(scatGeo, scatMat);
    scene.add(scatLine);

    const recGeo = new THREE.BufferGeometry();
    const recMat = new THREE.LineBasicMaterial({ color: 0xff0055 });
    const recLine = new THREE.Line(recGeo, recMat);
    scene.add(recLine);

    // Lobus distribusi Klein-Nishina 3D
    const lobeGeo = new THREE.BufferGeometry();
    const lobeMat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.4 });
    const lobeLine = new THREE.LineLoop(lobeGeo, lobeMat);
    scene.add(lobeLine);

    // Paket gelombang bergerak
    const incPhoton = new THREE.Mesh(new THREE.SphereGeometry(1.3, 16, 16), new THREE.MeshBasicMaterial({ color: 0x00f3ff }));
    const scatPhoton = new THREE.Mesh(new THREE.SphereGeometry(1.2, 16, 16), new THREE.MeshBasicMaterial({ color: 0xfbbf24 }));
    const recElectron = new THREE.Mesh(new THREE.SphereGeometry(1.4, 16, 16), new THREE.MeshBasicMaterial({ color: 0xff0055 }));
    scene.add(incPhoton, scatPhoton, recElectron);

    const eSlider = document.getElementById('energy-slider');
    const aSlider = document.getElementById('angle-slider');
    const valE = document.getElementById('val-energy');
    const valA = document.getElementById('val-angle');
    const hudEp = document.getElementById('hud-ep');
    const hudKe = document.getElementById('hud-ke');
    const hudDl = document.getElementById('hud-dlambda');

    let scatDir = new THREE.Vector3(1, 0, 0);
    let recDir = new THREE.Vector3(1, 0, 0);

    function updateCompton() {
      const E0 = parseFloat(eSlider.value);
      const thetaDeg = parseFloat(aSlider.value);
      const theta = thetaDeg * Math.PI / 180;
      valE.innerText = E0.toFixed(0) + " keV";
      valA.innerText = thetaDeg.toFixed(0) + "°";

      const alpha = E0 / 511.0;
      const Ep = E0 / (1 + alpha * (1 - Math.cos(theta)));
      const Ke = E0 - Ep;
      const dLambda = 2.4263 * (1 - Math.cos(theta)); // pm

      // Sudut pental elektron phi
      const phi = thetaDeg === 180 ? 0 : Math.atan(1 / ((1 + alpha) * Math.tan(theta / 2)));

      hudEp.innerText = Ep.toFixed(1) + " keV";
      hudKe.innerText = Ke.toFixed(1) + " keV";
      hudDl.innerText = dLambda.toFixed(2) + " pm";

      scatDir.set(Math.cos(theta), 0, -Math.sin(theta)).normalize();
      recDir.set(Math.cos(phi), 0, Math.sin(phi)).normalize();

      scatGeo.setFromPoints([new THREE.Vector3(0, 0, 0), scatDir.clone().multiplyScalar(42)]);
      recGeo.setFromPoints([new THREE.Vector3(0, 0, 0), recDir.clone().multiplyScalar(36)]);

      // Geser warna foton terhambur sesuai rasio energi E'/E0
      const ratio = Ep / E0;
      scatMat.color.setHSL(0.14 * ratio, 1.0, 0.55);
      scatPhoton.material.color.setHSL(0.14 * ratio, 1.0, 0.55);

      // Update kurva polar Klein-Nishina
      const pts = [];
      for (let i = 0; i < 72; i++) {
        const ang = (i / 72) * Math.PI * 2;
        const P = 1 / (1 + alpha * (1 - Math.cos(ang)));
        const dsig = 0.5 * P * P * (P + 1 / P - Math.sin(ang) * Math.sin(ang));
        const r = 10 + dsig * 24;
        pts.push(new THREE.Vector3(Math.cos(ang) * r, 0, Math.sin(ang) * r));
      }
      lobeGeo.setFromPoints(pts);
    }

    eSlider.addEventListener('input', updateCompton);
    aSlider.addEventListener('input', updateCompton);
    updateCompton();

    let phase = 0;
    function animate() {
      requestAnimationFrame(animate);
      phase = (phase + 0.018) % 2.0;
      if (phase < 1.0) {
        incPhoton.visible = true;
        scatPhoton.visible = false;
        recElectron.visible = false;
        incPhoton.position.set(-42 * (1 - phase), Math.sin(phase * 28) * 1.1, 0);
        targetElectron.scale.setScalar(1.0);
      } else {
        const t2 = phase - 1.0;
        incPhoton.visible = false;
        scatPhoton.visible = true;
        recElectron.visible = true;
        scatPhoton.position.copy(scatDir).multiplyScalar(42 * t2);
        recElectron.position.copy(recDir).multiplyScalar(36 * t2);
        targetElectron.scale.setScalar(1.0 + 0.35 * Math.exp(-t2 * 6));
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
    console.error("Module #28 error:", err);
    var errBox = document.createElement("div");
    errBox.style.cssText = "margin-top:10px;padding:10px;background:rgba(239,68,68,0.15);border:1px solid #ef4444;color:#fca5a5;border-radius:6px;font-size:12px;";
    errBox.textContent = "Runtime Error Modul #28: " + err.message;
    mount.appendChild(errBox);
  }
})();
