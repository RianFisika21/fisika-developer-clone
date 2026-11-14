// Auto-generated Module #33 — Fisika Developer (37 Modules Edition)
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = "<div class=\"physics-sim-wrapper\">\n  <div class=\"control-panel\">\n    <h3>Konveksi Rayleigh–Bénard 3D</h3>\n    <div class=\"input-group\">\n      <label>Selisih Suhu Pelat (ΔT) <span id=\"val-dt\" class=\"value-display\">45 K</span></label>\n      <input type=\"range\" id=\"dt-slider\" min=\"5\" max=\"80\" step=\"1\" value=\"45\">\n    </div>\n    <div class=\"input-group\">\n      <label>Viskositas Kinematik (ν) <span id=\"val-visc\" class=\"value-display\">1.5 mm²/s</span></label>\n      <input type=\"range\" id=\"visc-slider\" min=\"0.5\" max=\"5.0\" step=\"0.1\" value=\"1.5\">\n    </div>\n    <div style=\"background: rgba(0, 243, 255, 0.05); border-left: 3px solid #00f3ff; padding: 10px; border-radius: 4px; margin-top: 16px;\">\n      <p style=\"margin: 0; font-size: 12px; color: #8e949c;\">\n        🔴 <b>Pelat Bawah:</b> Sumber Panas (T + ΔT)<br>\n        🔵 <b>Pelat Atas:</b> Pendingin (T₀)<br>\n        ⚡ <b>Ambang Kritis:</b> Ra &gt; 1708 memicu sel gulungan konveksi.\n      </p>\n    </div>\n  </div>\n  <div class=\"visualization-panel\" style=\"position: relative;\">\n    <div id=\"canvas-3d-container\" style=\"width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.2);\"></div>\n    <div style=\"position: absolute; top: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #00f3ff;\">BILANGAN RAYLEIGH (Ra)</div>\n      <div id=\"hud-ra\" style=\"font-family: 'Orbitron', monospace; font-size: 15px; color: #fff; font-weight: bold;\">4500</div>\n    </div>\n    <div style=\"position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; border: 1px dashed rgba(255, 0, 85, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #ff0055;\">BILANGAN NUSSELT (Nu)</div>\n      <div id=\"hud-nu\" style=\"font-family: 'Orbitron', monospace; font-size: 14px; color: #fff;\">1.89</div>\n    </div>\n    <div style=\"position: absolute; bottom: 15px; right: 20px; pointer-events: none; background: rgba(0,0,0,0.68); padding: 8px 12px; border-radius: 6px; text-align: right; border: 1px dashed rgba(16, 185, 129, 0.35);\">\n      <div style=\"font-family: 'Orbitron', sans-serif; font-size: 10px; color: #10b981;\">REZIM PERPINDAHAN KALOR</div>\n      <div id=\"hud-state\" style=\"font-family: 'Orbitron', monospace; font-size: 13px; color: #fff;\">Konveksi Aktif</div>\n    </div>\n  </div>\n</div>";

  try {
const container = document.getElementById('canvas-3d-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);

    const w = container.clientWidth || 340;
    const h = container.clientHeight || 360;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(0, 22, 62);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const W = 44, H = 18, D = 22;
    const botPlate = new THREE.Mesh(new THREE.BoxGeometry(W, 0.8, D), new THREE.MeshBasicMaterial({ color: 0xff0055, transparent: true, opacity: 0.45 }));
    botPlate.position.y = -H / 2 - 0.5;
    const topPlate = new THREE.Mesh(new THREE.BoxGeometry(W, 0.8, D), new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.35 }));
    topPlate.position.y = H / 2 + 0.5;
    scene.add(botPlate, topPlate);

    const N = 450;
    const positions = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      positions[i * 3] = (Math.random() - 0.5) * W;
      positions[i * 3 + 1] = (Math.random() - 0.5) * H;
      positions[i * 3 + 2] = (Math.random() - 0.5) * D;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.95, vertexColors: true });
    scene.add(new THREE.Points(pGeo, pMat));

    const dtSlider = document.getElementById('dt-slider');
    const vSlider = document.getElementById('visc-slider');
    const valDt = document.getElementById('val-dt');
    const valV = document.getElementById('val-visc');
    const hudRa = document.getElementById('hud-ra');
    const hudNu = document.getElementById('hud-nu');
    const hudSt = document.getElementById('hud-state');

    function animate() {
      requestAnimationFrame(animate);
      const dT = parseFloat(dtSlider.value);
      const visc = parseFloat(vSlider.value);
      valDt.innerText = dT.toFixed(0) + " K";
      valV.innerText = visc.toFixed(1) + " mm²/s";

      const Ra = (dT / visc) * 180;
      const active = Ra > 1708;
      const Nu = active ? 1 + 1.44 * (1 - 1708 / Ra) : 1.0;
      const rollAmp = active ? Math.min(0.45, Math.sqrt((Ra - 1708) / 8000) * 0.35) : 0.0;

      hudRa.innerText = Math.round(Ra).toString();
      hudNu.innerText = Nu.toFixed(2);
      hudSt.innerText = active ? "Sel Konveksi (Ra > Rac)" : "Konduksi Murni";

      const k = (3 * Math.PI) / W;
      for (let i = 0; i < N; i++) {
        let x = positions[i * 3];
        let y = positions[i * 3 + 1];
        let z = positions[i * 3 + 2];

        const yn = (y + H / 2) / H; // 0 (bawah panas) -> 1 (atas dingin)
        if (active) {
          const vx = -rollAmp * Math.cos(k * x) * Math.cos(Math.PI * yn);
          const vy = rollAmp * 0.7 * Math.sin(k * x) * Math.sin(Math.PI * yn);
          x += vx;
          y += vy;
        }
        x += (Math.random() - 0.5) * 0.08;
        y += (Math.random() - 0.5) * 0.08;

        if (x > W / 2) x = -W / 2;
        if (x < -W / 2) x = W / 2;
        if (y > H / 2) y = H / 2 - 0.2;
        if (y < -H / 2) y = -H / 2 + 0.2;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const hotness = 1 - ((y + H / 2) / H);
        colors[i * 3] = hotness;
        colors[i * 3 + 1] = 0.25 + (1 - hotness) * 0.65;
        colors[i * 3 + 2] = 1 - hotness * 0.65;
      }
      pGeo.attributes.position.needsUpdate = true;
      pGeo.attributes.color.needsUpdate = true;

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
    console.error("Module #33 error:", err);
    var errBox = document.createElement("div");
    errBox.style.cssText = "margin-top:10px;padding:10px;background:rgba(239,68,68,0.15);border:1px solid #ef4444;color:#fca5a5;border-radius:6px;font-size:12px;";
    errBox.textContent = "Runtime Error Modul #33: " + err.message;
    mount.appendChild(errBox);
  }
})();
