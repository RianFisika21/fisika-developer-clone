// Auto-generated Module #34 — Fisika Developer (37 Modules Edition)
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = "<div class=\"physics-sim-wrapper\">\n  <div class=\"control-panel\">\n    <h3>Gelombang Gravitasi Biner</h3>\n    <div class=\"input-group\">\n      <label>Massa Sistem Biner (M) <span id=\"val-mass\" class=\"value-display\">30 M☉</span></label>\n      <input type=\"range\" id=\"mass-slider\" min=\"10\" max=\"65\" step=\"1\" value=\"30\">\n    </div>\n    <div class=\"input-group\">\n      <label>Separasi Orbit (a) <span id=\"val-sep\" class=\"value-display\">450 km</span></label>\n      <input type=\"range\" id=\"sep-slider\" min=\"200\" max=\"900\" step=\"10\" value=\"450\">\n    </div>\n    <div style=\"background: rgba(0, 243, 255, 0.05); border-left: 3px solid #00f3ff; padding: 10px; border-radius: 4px; margin-top: 16px;\">\n      <p style=\"margin: 0; font-size: 12px; color: #8e949c;\">\n        🌀 <b>Riak Kisi:</b> Polarisasi Kuadrupol h₊<br>\n        📡 <b>Frekuensi GW:</b> f_GW = 2 × f_orbit\n      </p>\n    </div>\n  </div>\n  <div class=\"visualization-panel\" style=\"position: relative;\">\n    <div id=\"canvas-3d-container\" style=\"width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.2);\"></div>\n    <div style=\"position: absolute; top: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #00f3ff;\">FREKUENSI GELOMBANG (f_GW)</div>\n      <div id=\"hud-fgw\" style=\"font-family: 'Orbitron', monospace; font-size: 15px; color: #fff; font-weight: bold;\">92.4 Hz</div>\n    </div>\n    <div style=\"position: absolute; bottom: 15px; right: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; text-align: right; border: 1px dashed rgba(255, 0, 85, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #ff0055;\">REGANGAN RUANG-WAKTU (h)</div>\n      <div id=\"hud-strain\" style=\"font-family: 'Orbitron', monospace; font-size: 14px; color: #fff;\">1.84e-21</div>\n    </div>\n  </div>\n</div>";

  try {
const container = document.getElementById('canvas-3d-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);

    const w = container.clientWidth || 340;
    const h = container.clientHeight || 360;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(0, 48, 66);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const gridGeo = new THREE.PlaneGeometry(88, 88, 44, 44);
    gridGeo.rotateX(-Math.PI / 2);
    const gridMesh = new THREE.Mesh(gridGeo, new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true, transparent: true, opacity: 0.35 }));
    scene.add(gridMesh);

    const bh1 = new THREE.Mesh(new THREE.SphereGeometry(2.4, 20, 20), new THREE.MeshBasicMaterial({ color: 0xff0055 }));
    const bh2 = new THREE.Mesh(new THREE.SphereGeometry(2.4, 20, 20), new THREE.MeshBasicMaterial({ color: 0xfbbf24 }));
    scene.add(bh1, bh2);

    const mSlider = document.getElementById('mass-slider');
    const sSlider = document.getElementById('sep-slider');
    const valM = document.getElementById('val-mass');
    const valS = document.getElementById('val-sep');
    const hudF = document.getElementById('hud-fgw');
    const hudH = document.getElementById('hud-strain');

    let phase = 0;
    function animate() {
      requestAnimationFrame(animate);
      const M = parseFloat(mSlider.value);
      const sep = parseFloat(sSlider.value);
      valM.innerText = M.toFixed(0) + " M☉";
      valS.innerText = sep.toFixed(0) + " km";

      // Hukum Kepler III untuk frekuensi gelombang gravitasi f_GW = 2 f_orb
      const fOrb = Math.sqrt(6.674e-11 * M * 1.989e30 / Math.pow(sep * 1000, 3)) / (2 * Math.PI);
      const fGW = 2 * fOrb;
      const strain = (M / 30) * (450 / sep) * 1.85e-21;

      hudF.innerText = fGW.toFixed(1) + " Hz";
      hudH.innerText = strain.toExponential(2);

      const omegaVis = 0.04 + (fGW / 400) * 0.14;
      phase += omegaVis;
      const rVis = 4 + (sep / 900) * 9;

      bh1.position.set(Math.cos(phase) * rVis, 1.5, Math.sin(phase) * rVis);
      bh2.position.set(-Math.cos(phase) * rVis, 1.5, -Math.sin(phase) * rVis);

      const pos = gridGeo.attributes.position;
      const amp = 1.2 + (M / 65) * (450 / sep) * 2.2;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const r = Math.hypot(x, z) + 0.1;
        const theta = Math.atan2(z, x);
        // Gelombang kuadrupol m=2 merambat keluar
        const wave = Math.cos(2 * theta - 2 * phase + r * 0.35) * Math.exp(-r * 0.025) * amp;
        const well = -4.5 * (M / 35) / (1 + r * 0.25);
        pos.setY(i, wave + well);
      }
      pos.needsUpdate = true;

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
    console.error("Module #34 error:", err);
    var errBox = document.createElement("div");
    errBox.style.cssText = "margin-top:10px;padding:10px;background:rgba(239,68,68,0.15);border:1px solid #ef4444;color:#fca5a5;border-radius:6px;font-size:12px;";
    errBox.textContent = "Runtime Error Modul #34: " + err.message;
    mount.appendChild(errBox);
  }
})();
