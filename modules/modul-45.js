/**
 * modul-45.js — Modul #45: Cakram Akresi Relativistik
 * Kategori: Astrofisika Relativistik
 * Rumus Utama: R_s = 2GM / c² | I_obs = g⁴ · I_emit
 * Terintegrasi dengan Fisika3DLazyEngine & FISIKA3D_CONFIGS
 */
(function() {
  'use strict';

  window.FISIKA3D_CONFIGS = window.FISIKA3D_CONFIGS || {};
  if (!window.FISIKA3D_CONFIGS[45]) {
    window.FISIKA3D_CONFIGS[45] = {
  "id": 45,
  "slug": "cakram-akresi-relativistik-3d",
  "title": "Cakram Akresi Relativistik",
  "category": "Astrofisika Relativistik",
  "formula": "R_s = 2GM / c² | I_obs = g⁴ · I_emit",
  "params": [
    {
      "key": "spinA",
      "label": "Spin Lubang Hitam (a*)",
      "min": 0.0,
      "max": 0.99,
      "step": 0.01,
      "default": 0.85,
      "unit": ""
    },
    {
      "key": "inclination",
      "label": "Inklinasi Pengamat (°)",
      "min": 10,
      "max": 85,
      "step": 1,
      "default": 72,
      "unit": "°"
    },
    {
      "key": "accretion",
      "label": "Laju Akresi (Ṁ / Ṁ_Edd)",
      "min": 0.1,
      "max": 2.0,
      "step": 0.05,
      "default": 1.0,
      "unit": ""
    }
  ]
};
  }

// Helper universal untuk kompatibilitas pemanggilan Fisika3DLazyEngine & DOM Controls
function resolveEngineArgs(arg1, cameraArg, rendererArg, controlsArg, canvasArg) {
  const isCtx = arg1 && typeof arg1 === 'object' && arg1.scene;
  const scene = isCtx ? arg1.scene : arg1;
  const camera = isCtx ? arg1.camera : cameraArg;
  const renderer = isCtx ? arg1.renderer : rendererArg;
  const controls = isCtx ? arg1.controls : controlsArg;
  const canvas = isCtx ? (arg1.canvas || renderer?.domElement) : (canvasArg || renderer?.domElement);
  return { scene, camera, renderer, controls, canvas };
}

function bindModuleControls(modId, defaults, schema) {
  const state = Object.assign({}, defaults);
  const root =
    document.querySelector(`[data-module-id="${modId}"]`) ||
    document.getElementById(`mod-${modId}`) ||
    document.getElementById(`modul-${modId}`) ||
    document.body;

  schema.forEach((ctrl) => {
    const selectors = [
      `#p${modId}-${ctrl.key}`,
      `#sim-${modId}-${ctrl.key}`,
      `[data-mod="${modId}"][data-param="${ctrl.key}"]`,
      `[name="${ctrl.key}"]`
    ];
    let el = null;
    for (const sel of selectors) {
      el = root.querySelector(sel) || document.querySelector(sel);
      if (el) break;
    }
    if (el) {
      if (el.value !== undefined && el.value !== '') {
        state[ctrl.key] = ctrl.type === 'select' ? el.value : parseFloat(el.value);
      }
      const valEl =
        root.querySelector(`#v${modId}-${ctrl.key}`) ||
        document.getElementById(`v${modId}-${ctrl.key}`) ||
        root.querySelector(`[data-val="${ctrl.key}"]`);
      const syncLabel = () => {
        if (valEl) {
          valEl.textContent =
            typeof state[ctrl.key] === 'number'
              ? state[ctrl.key].toFixed(ctrl.decimals ?? 2) + (ctrl.unit ? ' ' + ctrl.unit : '')
              : state[ctrl.key];
        }
      };
      syncLabel();
      el.addEventListener('input', () => {
        state[ctrl.key] = ctrl.type === 'select' ? el.value : parseFloat(el.value);
        syncLabel();
      });
      el.addEventListener('change', () => {
        state[ctrl.key] = ctrl.type === 'select' ? el.value : parseFloat(el.value);
        syncLabel();
      });
    }
  });

  // Sync dari URL query params jika tersedia (?m=38&mass=1.5...)
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('m') === String(modId) || params.get('mod') === String(modId)) {
      schema.forEach((ctrl) => {
        if (params.has(ctrl.key)) {
          const raw = params.get(ctrl.key);
          state[ctrl.key] = ctrl.type === 'select' ? raw : parseFloat(raw);
        }
      });
    }
  } catch (_) {}

  return state;
}

function updateModuleHUD(modId, metrics, scene) {
  if (scene) {
    scene.userData = scene.userData || {};
    scene.userData.telemetry = Object.assign({ moduleId: modId, timestamp: performance.now() }, metrics);
  }
  if (window.Fisika3DTelemetry && typeof window.Fisika3DTelemetry.update === 'function') {
    window.Fisika3DTelemetry.update(modId, metrics);
  }
  Object.entries(metrics).forEach(([key, val]) => {
    const el =
      document.getElementById(`hud-${modId}-${key}`) ||
      document.querySelector(`[data-hud="${modId}-${key}"]`) ||
      document.querySelector(`[data-mod="${modId}"] [data-metric="${key}"]`);
    if (el) el.textContent = val;
  });
}

function attachRunner(canvas, updateFn, cleanupFn) {
  let externalDriven = false;
  let rafId = null;
  let last = performance.now();
  let elapsed = 0;

  const tick = (now) => {
    if (externalDriven) return;
    if (canvas && !canvas.isConnected) {
      if (cleanupFn) cleanupFn();
      return;
    }
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    elapsed += dt;
    updateFn(dt, elapsed);
    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);

  return {
    update(dt, t) {
      externalDriven = true;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      updateFn(dt || 0.016, t ?? elapsed);
    },
    dispose() {
      if (rafId) cancelAnimationFrame(rafId);
      if (cleanupFn) cleanupFn();
    }
  };
}

  function initModule45(arg1, cameraArg, rendererArg, controlsArg, canvasArg) {

    const { scene, camera, renderer, controls, canvas } = resolveEngineArgs(arg1, cameraArg, rendererArg, controlsArg, canvasArg);
    if (!scene || typeof THREE === 'undefined') return;

    const state = bindModuleControls(45, { spinA: 0.85, inclination: 72, accretion: 1.0 }, [
      { key: 'spinA', decimals: 2, unit: '' },
      { key: 'inclination', decimals: 0, unit: '°' },
      { key: 'accretion', decimals: 2, unit: '' }
    ]);

    if (camera) {
      camera.position.set(0, 2.2, 8.8);
      camera.lookAt(0, 0, 0);
    }

    const group = new THREE.Group();
    scene.add(group);

    // Horizon Peristiwa & Cincin Foton
    const horizon = new THREE.Mesh(
      new THREE.SphereGeometry(1.05, 40, 40),
      new THREE.MeshBasicMaterial({ color: 0x02040a })
    );
    const photonRing = new THREE.Mesh(
      new THREE.RingGeometry(1.08, 1.18, 64),
      new THREE.MeshBasicMaterial({
        color: 0xfde047,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      })
    );
    group.add(horizon, photonRing);

    // Cakram Akresi Utama (partikel orbit diferensial Keplerian/Kerr dengan Doppler beaming)
    const diskCount = 900;
    const diskGeo = new THREE.BufferGeometry();
    const dPos = new Float32Array(diskCount * 3);
    const dCol = new Float32Array(diskCount * 3);
    const diskMeta = [];

    for (let i = 0; i < diskCount; i++) {
      const u = Math.random();
      const rNorm = u; // 0 (ISCO) -> 1 (outer edge)
      const angle = Math.random() * Math.PI * 2;
      const thick = (Math.random() - 0.5) * 0.14 * (0.3 + rNorm);
      diskMeta.push({ rNorm, angle, thick });
    }
    diskGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
    diskGeo.setAttribute('color', new THREE.BufferAttribute(dCol, 3));
    const diskPoints = new THREE.Points(
      diskGeo,
      new THREE.PointsMaterial({
        size: 0.11,
        vertexColors: true,
        transparent: true,
        opacity: 0.92,
        blending: THREE.AdditiveBlending
      })
    );
    group.add(diskPoints);

    // Lengkungan Citra Terlensa Sekunder (Sisi belakang cakram yang dibelokkan ke atas & bawah)
    const upperArch = new THREE.Mesh(
      new THREE.TorusGeometry(1.55, 0.11, 14, 64, Math.PI),
      new THREE.MeshBasicMaterial({
        color: 0xfb923c,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending
      })
    );
    const lowerArch = new THREE.Mesh(
      new THREE.TorusGeometry(1.48, 0.09, 14, 64, Math.PI),
      new THREE.MeshBasicMaterial({
        color: 0xf97316,
        transparent: true,
        opacity: 0.42,
        blending: THREE.AdditiveBlending
      })
    );
    lowerArch.rotation.z = Math.PI;
    group.add(upperArch, lowerArch);

    // Jet Relativistik Kutub
    const jetMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.26,
      blending: THREE.AdditiveBlending
    });
    const jetTop = new THREE.Mesh(new THREE.ConeGeometry(0.32, 4.2, 24, 1, true), jetMat);
    jetTop.position.y = 2.6;
    jetTop.rotation.x = Math.PI;
    const jetBot = new THREE.Mesh(new THREE.ConeGeometry(0.32, 4.2, 24, 1, true), jetMat);
    jetBot.position.y = -2.6;
    group.add(jetTop, jetBot);

    function calcISCO(a) {
      const z1 = 1 + Math.cbrt(1 - a * a) * (Math.cbrt(1 + a) + Math.cbrt(1 - a));
      const z2 = Math.sqrt(3 * a * a + z1 * z1);
      return 3 + z2 - Math.sqrt((3 - z1) * (3 + z1 + 2 * z2));
    }

    function update(dt, t) {
      const a = Math.min(0.99, Math.max(0, state.spinA));
      const incRad = (state.inclination * Math.PI) / 180;
      const mDot = state.accretion;
      const rISCO = calcISCO(a); // dalam satuan R_g = GM/c²
      const innerR = 1.15 + (rISCO / 6.0) * 0.65;
      const outerR = 4.8;

      if (camera) {
        photonRing.lookAt(camera.position);
      }

      // Orientasi grup berdasarkan sudut inklinasi pengamat
      group.rotation.x = (Math.PI / 2 - incRad) * 0.85;
      jetTop.scale.set(0.6 + a * 0.6, 0.5 + a * mDot * 0.7, 0.6 + a * 0.6);
      jetBot.scale.copy(jetTop.scale);

      const pos = diskPoints.geometry.attributes.position.array;
      const col = diskPoints.geometry.attributes.color.array;

      for (let i = 0; i < diskCount; i++) {
        const meta = diskMeta[i];
        const r = innerR + meta.rNorm * (outerR - innerR);
        const omega = 2.6 / Math.pow(r, 1.35);
        meta.angle += omega * dt;

        const x = Math.cos(meta.angle) * r;
        const z = Math.sin(meta.angle) * r;
        const y = meta.thick;

        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;

        // Relativistic Doppler beaming: sisi kiri (-x) mendekati pengamat -> biru-putih terang
        const betaOrb = Math.min(0.65, Math.sqrt(1.1 / r));
        const cosLos = (-x / r) * Math.sin(incRad);
        const doppler = Math.sqrt(1 - betaOrb * betaOrb) / (1 - betaOrb * cosLos);
        const beaming = Math.min(2.2, Math.pow(doppler, 2.4) * (0.65 + 0.45 * mDot));
        const temp = (1 - meta.rNorm * 0.75) * beaming;

        col[i * 3] = Math.min(1.0, 0.45 + temp * 0.65);
        col[i * 3 + 1] = Math.min(1.0, 0.22 + temp * 0.52);
        col[i * 3 + 2] = Math.min(1.0, cosLos > 0 ? 0.35 + temp * 0.75 : 0.12 + temp * 0.18);
      }
      diskPoints.geometry.attributes.position.needsUpdate = true;
      diskPoints.geometry.attributes.color.needsUpdate = true;

      upperArch.visible = state.inclination > 35;
      lowerArch.visible = state.inclination > 45;
      upperArch.material.opacity = Math.min(0.75, ((state.inclination - 35) / 50) * 0.7);
      lowerArch.material.opacity = upperArch.material.opacity * 0.7;

      if (controls && controls.update) controls.update();
      if (renderer && scene && camera) renderer.render(scene, camera);

      const efficiency = (1 - Math.sqrt(1 - 2 / (3 * rISCO))) * 100;
      updateModuleHUD(45, {
        rISCO: rISCO.toFixed(2) + ' R_g',
        efficiency: efficiency.toFixed(1) + ' %',
        spin: a.toFixed(2),
        inclination: state.inclination.toFixed(0) + '°'
      }, scene);
    }

    return attachRunner(canvas, update, () => scene.remove(group));

  }

  if (window.Fisika3DLazyEngine && typeof window.Fisika3DLazyEngine.register === 'function') {
    window.Fisika3DLazyEngine.register(45, initModule45);
  } else {
    window.__FISIKA3D_PENDING_MODULES__ = window.__FISIKA3D_PENDING_MODULES__ || {};
    window.__FISIKA3D_PENDING_MODULES__[45] = initModule45;
  }
})();
