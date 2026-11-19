/**
 * modul-38.js — Modul #38: Pelensaan Gravitasi 3D
 * Kategori: Astrofisika Relativistik
 * Rumus Utama: θ_E = √[(4GM / c²) · (D_LS / (D_L · D_S))]
 * Terintegrasi dengan Fisika3DLazyEngine & FISIKA3D_CONFIGS
 */
(function() {
  'use strict';

  window.FISIKA3D_CONFIGS = window.FISIKA3D_CONFIGS || {};
  if (!window.FISIKA3D_CONFIGS[38]) {
    window.FISIKA3D_CONFIGS[38] = {
  "id": 38,
  "slug": "pelensaan-gravitasi-3d",
  "title": "Pelensaan Gravitasi 3D",
  "category": "Astrofisika Relativistik",
  "formula": "θ_E = √[(4GM / c²) · (D_LS / (D_L · D_S))]",
  "params": [
    {
      "key": "mass",
      "label": "Massa Lensa (M☉×10¹²)",
      "min": 0.2,
      "max": 5.0,
      "step": 0.1,
      "default": 1.8,
      "unit": "×10¹² M☉"
    },
    {
      "key": "beta",
      "label": "Offset Sumber (β)",
      "min": 0.0,
      "max": 1.8,
      "step": 0.02,
      "default": 0.18,
      "unit": "arcsec"
    },
    {
      "key": "dRatio",
      "label": "Rasio Jarak D_LS/D_S",
      "min": 0.1,
      "max": 0.9,
      "step": 0.05,
      "default": 0.5,
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

  function initModule38(arg1, cameraArg, rendererArg, controlsArg, canvasArg) {

    const { scene, camera, renderer, controls, canvas } = resolveEngineArgs(arg1, cameraArg, rendererArg, controlsArg, canvasArg);
    if (!scene || typeof THREE === 'undefined') return;

    const state = bindModuleControls(38, { mass: 1.8, beta: 0.18, dRatio: 0.5 }, [
      { key: 'mass', decimals: 2, unit: '×10¹² M☉' },
      { key: 'beta', decimals: 2, unit: 'arcsec' },
      { key: 'dRatio', decimals: 2, unit: '' }
    ]);

    if (camera) {
      camera.position.set(0, 4.2, 9.5);
      camera.lookAt(0, 0, 0);
    }

    const group = new THREE.Group();
    scene.add(group);

    // Pencahayaan
    const ambient = new THREE.AmbientLight(0x334155, 1.4);
    const point = new THREE.PointLight(0x38bdf8, 2.5, 30);
    point.position.set(4, 6, 5);
    group.add(ambient, point);

    // Grid kelengkungan ruang-waktu (Spacetime Mesh)
    const gridGeo = new THREE.PlaneGeometry(14, 14, 48, 48);
    gridGeo.rotateX(-Math.PI / 2);
    const basePos = Float32Array.from(gridGeo.attributes.position.array);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      wireframe: true,
      transparent: true,
      opacity: 0.24
    });
    const spacetimeGrid = new THREE.Mesh(gridGeo, gridMat);
    spacetimeGrid.position.y = -2.2;
    group.add(spacetimeGrid);

    // Massa Lensa (Galaksi Elips / Lubang Hitam Supermasif)
    const lensGeo = new THREE.SphereGeometry(0.65, 32, 32);
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      emissive: 0x1e1b4b,
      roughness: 0.2,
      metalness: 0.9
    });
    const lensMesh = new THREE.Mesh(lensGeo, lensMat);
    group.add(lensMesh);

    const haloGeo = new THREE.SphereGeometry(0.92, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    group.add(haloMesh);

    // Sumber Quasar Latar Belakang
    const srcMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xfef08a })
    );
    group.add(srcMesh);

    // Cincin Einstein / Busur Citra Terlensa (Primer & Sekunder)
    const ringGeo = new THREE.TorusGeometry(1.8, 0.055, 16, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const einsteinRing = new THREE.Mesh(ringGeo, ringMat);
    group.add(einsteinRing);

    const imgPlus = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0x7dd3fc })
    );
    const imgMinus = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0xf472b6 })
    );
    group.add(imgPlus, imgMinus);

    // Berkas Geodesik Foton (16 sinar)
    const rayCount = 16;
    const rays = [];
    for (let i = 0; i < rayCount; i++) {
      const pts = [];
      for (let j = 0; j <= 32; j++) pts.push(new THREE.Vector3());
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? 0x38bdf8 : 0xa855f7,
        transparent: true,
        opacity: 0.55
      });
      const line = new THREE.Line(geo, mat);
      group.add(line);
      rays.push({ line, angle: (i / rayCount) * Math.PI * 2 });
    }

    function update(dt, t) {
      const thetaE = Math.sqrt(state.mass * state.dRatio) * 1.45; // Radius Einstein terukur
      const beta = state.beta;
      const u = beta / Math.max(thetaE, 0.05);
      const sqrtTerm = Math.sqrt(beta * beta + 4 * thetaE * thetaE);
      const thetaPlus = 0.5 * (beta + sqrtTerm);
      const thetaMinus = 0.5 * (beta - sqrtTerm);
      const magnification = (u * u + 2) / (Math.max(u, 0.04) * Math.sqrt(u * u + 4));

      // Deformasi sumur potensial ruang-waktu
      const posAttr = spacetimeGrid.geometry.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const vx = basePos[i * 3];
        const vz = basePos[i * 3 + 2];
        const r = Math.sqrt(vx * vx + vz * vz) + 0.55;
        posAttr.setY(i, - (state.mass * 1.35) / r);
      }
      posAttr.needsUpdate = true;

      // Posisi sumber & citra
      const wobble = Math.sin(t * 1.2) * 0.04;
      srcMesh.position.set(beta + wobble, 0.15, -4.5);
      imgPlus.position.set(thetaPlus, 0.08, 0.1);
      imgMinus.position.set(thetaMinus, -0.08, 0.1);
      imgPlus.scale.setScalar(Math.min(2.4, 0.8 + magnification * 0.08));
      imgMinus.scale.setScalar(Math.max(0.45, 0.9 - u * 0.25));

      // Transisi visual Cincin Einstein vs busur ganda
      einsteinRing.scale.setScalar(thetaE / 1.8);
      einsteinRing.material.opacity = Math.max(0.12, Math.exp(-u * u * 2.5) * 0.9);
      haloMesh.scale.setScalar(0.85 + state.mass * 0.12);

      // Perbarui kurva pembelokan sinar cahaya (geodesik)
      rays.forEach(({ line, angle }) => {
        const p = line.geometry.attributes.position;
        for (let j = 0; j <= 32; j++) {
          const s = j / 32; // 0 = sumber (-4.5), 1 = pengamat (+4.5)
          const z = -4.5 + s * 9.0;
          const env = Math.sin(Math.PI * s);
          const impact = thetaE * env;
          const x = (1 - s) * (beta + wobble) + Math.cos(angle) * impact;
          const y = (1 - s) * 0.15 + Math.sin(angle) * impact;
          p.setXYZ(j, x, y, z);
        }
        p.needsUpdate = true;
      });

      if (controls && controls.update) controls.update();
      if (renderer && scene && camera) renderer.render(scene, camera);

      updateModuleHUD(38, {
        thetaE: thetaE.toFixed(3) + ' arcsec',
        thetaPlus: thetaPlus.toFixed(3) + ' arcsec',
        thetaMinus: thetaMinus.toFixed(3) + ' arcsec',
        magnification: magnification.toFixed(2) + '×'
      }, scene);
    }

    return attachRunner(canvas, update, () => scene.remove(group));

  }

  if (window.Fisika3DLazyEngine && typeof window.Fisika3DLazyEngine.register === 'function') {
    window.Fisika3DLazyEngine.register(38, initModule38);
  } else {
    window.__FISIKA3D_PENDING_MODULES__ = window.__FISIKA3D_PENDING_MODULES__ || {};
    window.__FISIKA3D_PENDING_MODULES__[38] = initModule38;
  }
})();
