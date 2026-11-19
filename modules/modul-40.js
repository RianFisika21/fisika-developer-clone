/**
 * modul-40.js — Modul #40: Pandu Gelombang Persegi 3D
 * Kategori: Elektromagnetika
 * Rumus Utama: f_c(m,n) = (c / 2) √[(m/a)² + (n/b)²]
 * Terintegrasi dengan Fisika3DLazyEngine & FISIKA3D_CONFIGS
 */
(function() {
  'use strict';

  window.FISIKA3D_CONFIGS = window.FISIKA3D_CONFIGS || {};
  if (!window.FISIKA3D_CONFIGS[40]) {
    window.FISIKA3D_CONFIGS[40] = {
  "id": 40,
  "slug": "pandu-gelombang-persegi-3d",
  "title": "Pandu Gelombang Persegi 3D",
  "category": "Elektromagnetika",
  "formula": "f_c(m,n) = (c / 2) √[(m/a)² + (n/b)²]",
  "params": [
    {
      "key": "freq",
      "label": "Frekuensi Operasi f (GHz)",
      "min": 2.0,
      "max": 18.0,
      "step": 0.2,
      "default": 9.5,
      "unit": "GHz"
    },
    {
      "key": "modeM",
      "label": "Indeks Mode m",
      "min": 1,
      "max": 3,
      "step": 1,
      "default": 1,
      "unit": ""
    },
    {
      "key": "modeN",
      "label": "Indeks Mode n",
      "min": 0,
      "max": 2,
      "step": 1,
      "default": 0,
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

  function initModule40(arg1, cameraArg, rendererArg, controlsArg, canvasArg) {

    const { scene, camera, renderer, controls, canvas } = resolveEngineArgs(arg1, cameraArg, rendererArg, controlsArg, canvasArg);
    if (!scene || typeof THREE === 'undefined') return;

    const state = bindModuleControls(40, { freq: 9.5, modeM: 1, modeN: 0 }, [
      { key: 'freq', decimals: 1, unit: 'GHz' },
      { key: 'modeM', decimals: 0, unit: '' },
      { key: 'modeN', decimals: 0, unit: '' }
    ]);

    if (camera) {
      camera.position.set(5.6, 3.8, 7.6);
      camera.lookAt(0, 0, 0);
    }

    const group = new THREE.Group();
    scene.add(group);
    group.add(new THREE.AmbientLight(0x475569, 1.6));

    // Dinding rongga pandu gelombang WR-90 (a = 2.286 cm, b = 1.016 cm diskalakan)
    const W = 3.2;
    const H = 1.6;
    const L = 9.0;
    const wireBox = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(W, H, L)),
      new THREE.LineBasicMaterial({ color: 0x94a3b8 })
    );
    group.add(wireBox);

    const wallMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide
    });
    group.add(new THREE.Mesh(new THREE.BoxGeometry(W, H, L), wallMat));

    // Grid titik medan listrik E (biru/cyan) & medan magnet H (oranye/merah)
    const nx = 9;
    const ny = 5;
    const nz = 18;
    const eArrows = [];
    const hArrows = [];

    for (let iz = 0; iz < nz; iz++) {
      for (let ix = 1; ix < nx; ix++) {
        for (let iy = 1; iy < ny; iy++) {
          const px = -W / 2 + (ix / nx) * W;
          const py = -H / 2 + (iy / ny) * H;
          const pz = -L / 2 + (iz / (nz - 1)) * L;

          const eArrow = new THREE.ArrowHelper(
            new THREE.Vector3(0, 1, 0),
            new THREE.Vector3(px, py, pz),
            0.35,
            0x38bdf8,
            0.12,
            0.08
          );
          group.add(eArrow);
          eArrows.push({ arrow: eArrow, u: ix / nx, v: iy / ny, z: pz });

          if (iy === Math.floor(ny / 2)) {
            const hArrow = new THREE.ArrowHelper(
              new THREE.Vector3(1, 0, 0),
              new THREE.Vector3(px, 0, pz),
              0.32,
              0xf59e0b,
              0.11,
              0.07
            );
            group.add(hArrow);
            hArrows.push({ arrow: hArrow, u: ix / nx, v: 0.5, z: pz });
          }
        }
      }
    }

    function update(dt, t) {
      const m = Math.max(0, Math.round(state.modeM));
      const n = Math.max(0, Math.round(state.modeN));
      const aCm = 2.286;
      const bCm = 1.016;
      const c = 30.0; // cm * GHz
      const fc = (c / 2.0) * Math.sqrt((m / aCm) ** 2 + (n / bCm) ** 2);
      const f = state.freq;
      const propagating = f > fc;
      const beta = propagating ? (2 * Math.PI / c) * Math.sqrt(f * f - fc * fc) : 0;
      const alpha = !propagating ? (2 * Math.PI / c) * Math.sqrt(Math.max(0, fc * fc - f * f)) : 0;
      const lambdaG = propagating ? c / Math.sqrt(f * f - fc * fc) : Infinity;

      eArrows.forEach(({ arrow, u, v, z }) => {
        const zNorm = z + L / 2;
        const env = propagating ? 1.0 : Math.exp(-alpha * zNorm * 0.45);
        const phase = propagating ? (beta * z * 1.4 - f * t * 0.8) : (-f * t * 0.8);
        const ex = (m === 0 ? 1 : Math.cos(m * Math.PI * u)) * Math.sin(n * Math.PI * v) * Math.sin(phase) * env;
        const ey = Math.sin(m * Math.PI * u) * (n === 0 ? 1 : Math.cos(n * Math.PI * v)) * Math.sin(phase) * env;
        const mag = Math.hypot(ex, ey);
        if (mag > 0.03) {
          arrow.visible = true;
          arrow.setDirection(new THREE.Vector3(ex, ey, 0).normalize());
          arrow.setLength(Math.min(0.55, mag * 0.45), 0.12, 0.08);
        } else {
          arrow.visible = false;
        }
      });

      hArrows.forEach(({ arrow, u, z }) => {
        const zNorm = z + L / 2;
        const env = propagating ? 1.0 : Math.exp(-alpha * zNorm * 0.45);
        const phase = propagating ? (beta * z * 1.4 - f * t * 0.8) : (-f * t * 0.8);
        const hx = Math.sin(m * Math.PI * u) * Math.sin(phase) * env;
        const hz = Math.cos(m * Math.PI * u) * Math.cos(phase) * env * 0.7;
        const mag = Math.hypot(hx, hz);
        if (mag > 0.03) {
          arrow.visible = true;
          arrow.setDirection(new THREE.Vector3(hx, 0, hz).normalize());
          arrow.setLength(Math.min(0.5, mag * 0.4), 0.11, 0.07);
        } else {
          arrow.visible = false;
        }
      });

      if (controls && controls.update) controls.update();
      if (renderer && scene && camera) renderer.render(scene, camera);

      updateModuleHUD(40, {
        mode: `TE_${m}${n}`,
        fc: fc.toFixed(2) + ' GHz',
        lambdaG: propagating ? lambdaG.toFixed(2) + ' cm' : 'Evanescent (Cut-off)',
        status: propagating ? 'Propagating' : 'Attenuated (f < f_c)'
      }, scene);
    }

    return attachRunner(canvas, update, () => scene.remove(group));

  }

  if (window.Fisika3DLazyEngine && typeof window.Fisika3DLazyEngine.register === 'function') {
    window.Fisika3DLazyEngine.register(40, initModule40);
  } else {
    window.__FISIKA3D_PENDING_MODULES__ = window.__FISIKA3D_PENDING_MODULES__ || {};
    window.__FISIKA3D_PENDING_MODULES__[40] = initModule40;
  }
})();
