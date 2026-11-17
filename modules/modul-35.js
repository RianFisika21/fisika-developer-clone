// Auto-generated Module #35 — Fisika Developer (37 Modules Edition)
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = "<div class=\"physics-sim-wrapper\">\n  <div class=\"control-panel\">\n    <h3>Interferometer Michelson 3D</h3>\n    <div class=\"input-group\">\n      <label>Panjang Gelombang Laser (λ) <span id=\"val-lambda\" class=\"value-display\">532 nm</span></label>\n      <input type=\"range\" id=\"lambda-slider\" min=\"450\" max=\"680\" step=\"2\" value=\"532\">\n    </div>\n    <div class=\"input-group\">\n      <label>Pergeseran Cermin M₂ (Δd) <span id=\"val-mirror\" class=\"value-display\">266 nm</span></label>\n      <input type=\"range\" id=\"mirror-slider\" min=\"0\" max=\"2000\" step=\"10\" value=\"266\">\n    </div>\n  </div>\n  <div class=\"visualization-panel\" style=\"position: relative;\">\n    <div id=\"canvas-3d-container\" style=\"width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.2);\"></div>\n    <div style=\"position: absolute; top: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #00f3ff;\">PERGESERAN FRINJI (m = 2Δd/λ)</div>\n      <div id=\"hud-fringes\" style=\"font-family: 'Orbitron', monospace; font-size: 15px; color: #fff; font-weight: bold;\">1.00 Frinji</div>\n    </div>\n    <div style=\"position: absolute; bottom: 15px; right: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; text-align: right; border: 1px dashed rgba(16, 185, 129, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #10b981;\">INTENSITAS DETEKTOR PUSAT</div>\n      <div id=\"hud-intensity\" style=\"font-family: 'Orbitron', monospace; font-size: 14px; color: #fff;\">100.0 %</div>\n    </div>\n  </div>\n</div>";

  try {
const container = document.getElementById('canvas-3d-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);

    const w = container.clientWidth || 340;
    const h = container.clientHeight || 360;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(24, 34, 42);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const bench = new THREE.GridHelper(60, 15, 0x1e293b, 0x0f172a);
    bench.position.y = -3;
    scene.add(bench);

    // Laser source (-24, 0, 0)
    const laserBox = new THREE.Mesh(new THREE.BoxGeometry(6, 3, 3), new THREE.MeshBasicMaterial({ color: 0x334155 }));
    laserBox.position.set(-24, 0, 0);
    scene.add(laserBox);

    // Beam Splitter di (0, 0, 0) rotasi 45 deg
    const splitter = new THREE.Mesh(
      new THREE.BoxGeometry(5, 4, 0.4),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45 })
    );
    splitter.rotation.y = Math.PI / 4;
    scene.add(splitter);

    // Cermin M1 tetap di (0, 0, -20)
    const mirror1 = new THREE.Mesh(new THREE.BoxGeometry(6, 4, 0.6), new THREE.MeshBasicMaterial({ color: 0x94a3b8 }));
    mirror1.position.set(0, 0, -20);
    scene.add(mirror1);

    // Cermin M2 bergerak di (20 + offset, 0, 0)
    const mirror2 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 4, 6), new THREE.MeshBasicMaterial({ color: 0xfbbf24 }));
    mirror2.position.set(20, 0, 0);
    scene.add(mirror2);

    // Layar detektor di (0, 0, 20) + cincin frinji
    const screen = new THREE.Mesh(new THREE.BoxGeometry(10, 8, 0.5), new THREE.MeshBasicMaterial({ color: 0x0f172a }));
    screen.position.set(0, 0, 20);
    scene.add(screen);

    const rings = [];
    for (let i = 0; i < 6; i++) {
      const rMesh = new THREE.Mesh(
        new THREE.RingGeometry(0.4 + i * 0.62, 0.72 + i * 0.62, 32),
        new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide })
      );
      rMesh.position.set(0, 0, 19.7);
      scene.add(rMesh);
      rings.push(rMesh);
    }

    const beamMat = new THREE.LineBasicMaterial({ color: 0x10b981 });
    const bInc = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-21, 0, 0), new THREE.Vector3(0, 0, 0)]), beamMat);
    const bArm1 = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -20)]), beamMat);
    const bArm2Geo = new THREE.BufferGeometry();
    const bArm2 = new THREE.Line(bArm2Geo, beamMat);
    const bOut = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 19.6)]), beamMat);
    scene.add(bInc, bArm1, bArm2, bOut);

    const lSlider = document.getElementById('lambda-slider');
    const mSlider = document.getElementById('mirror-slider');
    const valL = document.getElementById('val-lambda');
    const valM = document.getElementById('val-mirror');
    const hudFr = document.getElementById('hud-fringes');
    const hudIn = document.getElementById('hud-intensity');

    function wavelengthToHex(nm) {
      if (nm < 490) return 0x3b82f6;
      if (nm < 565) return 0x10b981;
      if (nm < 600) return 0xfbbf24;
      return 0xef4444;
    }

    function updateOptics() {
      const lam = parseFloat(lSlider.value);
      const dd = parseFloat(mSlider.value);
      valL.innerText = lam.toFixed(0) + " nm";
      valM.innerText = dd.toFixed(0) + " nm";

      const hex = wavelengthToHex(lam);
      beamMat.color.setHex(hex);

      const m2X = 20 + (dd / 2000) * 5;
      mirror2.position.x = m2X;
      bArm2Geo.setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(m2X, 0, 0)]);

      const mOrder = (2 * dd) / lam;
      const dPhi = 2 * Math.PI * mOrder;
      const intensity = Math.pow(Math.cos(dPhi / 2), 2);

      hudFr.innerText = mOrder.toFixed(2) + " Frinji";
      hudIn.innerText = (intensity * 100).toFixed(1) + " %";

      rings.forEach((ring, idx) => {
        const ringI = Math.pow(Math.cos(dPhi / 2 + idx * 0.9), 2);
        ring.material.color.setHex(hex).multiplyScalar(0.2 + 0.8 * ringI);
      });
    }

    lSlider.addEventListener('input', updateOptics);
    mSlider.addEventListener('input', updateOptics);
    updateOptics();

    function animate() {
      requestAnimationFrame(animate);
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
    console.error("Module #35 error:", err);
    var errBox = document.createElement("div");
    errBox.style.cssText = "margin-top:10px;padding:10px;background:rgba(239,68,68,0.15);border:1px solid #ef4444;color:#fca5a5;border-radius:6px;font-size:12px;";
    errBox.textContent = "Runtime Error Modul #35: " + err.message;
    mount.appendChild(errBox);
  }
})();
