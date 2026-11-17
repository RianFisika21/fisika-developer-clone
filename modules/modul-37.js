// Auto-generated Module #37 — Fisika Developer (37 Modules Edition)
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = "<div class=\"physics-sim-wrapper\">\n  <div class=\"control-panel\">\n    <h3>Model Ising 3D (Monte Carlo)</h3>\n    <div class=\"input-group\">\n      <label>Suhu Termal (T / J) <span id=\"val-temp\" class=\"value-display\">2.50</span></label>\n      <input type=\"range\" id=\"temp-slider\" min=\"0.5\" max=\"7.5\" step=\"0.1\" value=\"2.5\">\n    </div>\n    <div class=\"input-group\">\n      <label>Medan Magnet Luar (h) <span id=\"val-field\" class=\"value-display\">0.00</span></label>\n      <input type=\"range\" id=\"field-slider\" min=\"-1.5\" max=\"1.5\" step=\"0.1\" value=\"0.0\">\n    </div>\n    <div style=\"background: rgba(0, 243, 255, 0.05); border-left: 3px solid #00f3ff; padding: 10px; border-radius: 4px; margin-top: 16px;\">\n      <p style=\"margin: 0; font-size: 12px; color: #8e949c;\">\n        ⬆️ <b>Cyan:</b> Spin Up (+1)<br>\n        ⬇️ <b>Magenta:</b> Spin Down (-1)<br>\n        🌡️ <b>Titik Kritis Curie:</b> Tc ≈ 4.51\n      </p>\n    </div>\n  </div>\n  <div class=\"visualization-panel\" style=\"position: relative;\">\n    <div id=\"canvas-3d-container\" style=\"width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.2);\"></div>\n    <div style=\"position: absolute; top: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #00f3ff;\">MAGNETISASI SPONTAN |M|</div>\n      <div id=\"hud-mag\" style=\"font-family: 'Orbitron', monospace; font-size: 15px; color: #fff; font-weight: bold;\">0.94</div>\n    </div>\n    <div style=\"position: absolute; bottom: 15px; right: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; text-align: right; border: 1px dashed rgba(255, 0, 85, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #ff0055;\">FASE MAGNETIK KISI</div>\n      <div id=\"hud-phase\" style=\"font-family: 'Orbitron', monospace; font-size: 13px; color: #fff;\">Feromagnetik (T &lt; Tc)</div>\n    </div>\n  </div>\n</div>";

  try {
const container = document.getElementById('canvas-3d-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);

    const w = container.clientWidth || 340;
    const h = container.clientHeight || 360;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(26, 22, 30);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const L = 7; // 7x7x7 = 343 spin momen dipol
    const N = L * L * L;
    const spins = new Int8Array(N).fill(1);
    const meshes = [];
    const coneGeo = new THREE.ConeGeometry(0.48, 1.5, 8);
    const group = new THREE.Group();
    scene.add(group);

    for (let x = 0; x < L; x++) {
      for (let y = 0; y < L; y++) {
        for (let z = 0; z < L; z++) {
          const idx = x * L * L + y * L + z;
          const mat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
          const m = new THREE.Mesh(coneGeo, mat);
          m.position.set((x - (L - 1) / 2) * 2.5, (y - (L - 1) / 2) * 2.5, (z - (L - 1) / 2) * 2.5);
          group.add(m);
          meshes[idx] = m;
        }
      }
    }

    const tSlider = document.getElementById('temp-slider');
    const hSlider = document.getElementById('field-slider');
    const valT = document.getElementById('val-temp');
    const valH = document.getElementById('val-field');
    const hudMag = document.getElementById('hud-mag');
    const hudPh = document.getElementById('hud-phase');

    function metropolisSweep(T, hExt) {
      for (let step = 0; step < N; step++) {
        const x = Math.floor(Math.random() * L);
        const y = Math.floor(Math.random() * L);
        const z = Math.floor(Math.random() * L);
        const idx = x * L * L + y * L + z;
        const s = spins[idx];

        const xp = ((x + 1) % L) * L * L + y * L + z;
        const xm = ((x - 1 + L) % L) * L * L + y * L + z;
        const yp = x * L * L + ((y + 1) % L) * L + z;
        const ym = x * L * L + ((y - 1 + L) % L) * L + z;
        const zp = x * L * L + y * L + ((z + 1) % L);
        const zm = x * L * L + y * L + ((z - 1 + L) % L);

        const nbSum = spins[xp] + spins[xm] + spins[yp] + spins[ym] + spins[zp] + spins[zm];
        const dE = 2 * s * (nbSum + hExt);
        if (dE <= 0 || Math.random() < Math.exp(-dE / T)) {
          spins[idx] = -s;
        }
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      const T = parseFloat(tSlider.value);
      const hExt = parseFloat(hSlider.value);
      valT.innerText = T.toFixed(2);
      valH.innerText = hExt.toFixed(2);

      metropolisSweep(T, hExt);

      let sumS = 0;
      for (let i = 0; i < N; i++) {
        const s = spins[i];
        sumS += s;
        const m = meshes[i];
        if (s === 1) {
          m.rotation.x = 0;
          m.material.color.setHex(0x00f3ff);
        } else {
          m.rotation.x = Math.PI;
          m.material.color.setHex(0xff0055);
        }
      }

      const mag = Math.abs(sumS) / N;
      hudMag.innerText = mag.toFixed(2);
      hudPh.innerText = T < 4.51 ? "Feromagnetik (T < Tc)" : "Paramagnetik (T > Tc)";

      group.rotation.y += 0.004;
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
    console.error("Module #37 error:", err);
    var errBox = document.createElement("div");
    errBox.style.cssText = "margin-top:10px;padding:10px;background:rgba(239,68,68,0.15);border:1px solid #ef4444;color:#fca5a5;border-radius:6px;font-size:12px;";
    errBox.textContent = "Runtime Error Modul #37: " + err.message;
    mount.appendChild(errBox);
  }
})();
