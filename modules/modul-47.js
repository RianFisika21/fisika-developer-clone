/**
 * modul-47.js — Modul #47: Osilator Non-Linier Duffing 3D
 * Kategori: Dinamika Non-Linier & Chaos
 * Rumus Utama: ẍ + δẋ + αx + βx³ = γ cos(ωt)
 * Terintegrasi dengan Fisika3DLazyEngine & FISIKA3D_CONFIGS
 */
(function() {
  'use strict';

  window.FISIKA3D_CONFIGS = window.FISIKA3D_CONFIGS || {};
  if (!window.FISIKA3D_CONFIGS[47]) {
    window.FISIKA3D_CONFIGS[47] = {
  "id": 47,
  "slug": "osilator-non-linier-duffing-3d",
  "title": "Osilator Non-Linier Duffing 3D",
  "category": "Dinamika Non-Linier & Chaos",
  "formula": "ẍ + δẋ + αx + βx³ = γ cos(ωt)",
  "params": [
    {
      "key": "gamma",
      "label": "Amplitudo Gaya Dorong γ",
      "min": 0.1,
      "max": 0.65,
      "step": 0.01,
      "default": 0.37,
      "unit": ""
    },
    {
      "key": "delta",
      "label": "Redaman δ",
      "min": 0.05,
      "max": 0.6,
      "step": 0.01,
      "default": 0.25,
      "unit": ""
    },
    {
      "key": "omega",
      "label": "Frekuensi Dorong ω (rad/s)",
      "min": 0.6,
      "max": 1.8,
      "step": 0.02,
      "default": 1.2,
      "unit": "rad/s"
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

  function initModule47(arg1, cameraArg, rendererArg, controlsArg, canvasArg) {

    const { scene, camera, renderer, controls, canvas } = resolveEngineArgs(arg1, cameraArg, rendererArg, controlsArg, canvasArg);
    if (!scene || typeof THREE === 'undefined') return;

    const state = bindModuleControls(47, { gamma: 0.37, delta: 0.25, omega: 1.2 }, [
      { key: 'gamma', decimals: 2, unit: '' },
      { key: 'delta', decimals: 2, unit: '' },
      { key: 'omega', decimals: 2, unit: 'rad/s' }
    ]);

    if (camera) {
      camera.position.set(0, 3.6, 8.2);
      camera.lookAt(0, 0.2, 0);
    }

    const group = new THREE.Group();
    scene.add(group);
    group.add(new THREE.AmbientLight(0x475569, 1.5));

    // Kurva Potensial Sumur Ganda V(x) = -0.5 x² + 0.25 x⁴ (α = -1, β = +1)
    const potPts = [];
    for (let i = 0; i <= 100; i++) {
      const x = -2.1 + (i / 100) * 4.2;
      const V = -0.5 * x * x + 0.25 * x * x * x * x;
      potPts.push(new THREE.Vector3(x * 2.2, V * 1.4 - 1.5, -1.8));
    }
    const potLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(potPts),
      new THREE.LineBasicMaterial({ color: 0x94a3b8 })
    );
    group.add(potLine);

    // Bola partikel di sumur potensial
    const massBall = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    );
    group.add(massBall);

    // Trajektori Ruang Fase 3D (x, v, sin(φ)) — Strange Attractor Duffing
    const maxHist = 420;
    const phasePts = [];
    for (let i = 0; i < maxHist; i++) phasePts.push(new THREE.Vector3());
    const phaseGeo = new THREE.BufferGeometry().setFromPoints(phasePts);
    const phaseLine = new THREE.Line(
      phaseGeo,
      new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.9 })
    );
    group.add(phaseLine);

    const headDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 18, 18),
      new THREE.MeshBasicMaterial({ color: 0xf43f5e })
    );
    group.add(headDot);

    let x = 0.5;
    let v = 0.0;
    let simT = 0;
    let initFilled = false;

    function rk4Step(dt) {
      const alpha = -1.0;
      const beta = 1.0;
      const delta = state.delta;
      const gamma = state.gamma;
      const omega = state.omega;

      const acc = (xx, vv, tt) => gamma * Math.cos(omega * tt) - delta * vv - alpha * xx - beta * xx * xx * xx;

      const k1x = v;
      const k1v = acc(x, v, simT);

      const k2x = v + 0.5 * dt * k1v;
      const k2v = acc(x + 0.5 * dt * k1x, k2x, simT + 0.5 * dt);

      const k3x = v + 0.5 * dt * k2v;
      const k3v = acc(x + 0.5 * dt * k2x, k3x, simT + 0.5 * dt);

      const k4x = v + dt * k3v;
      const k4v = acc(x + dt * k3x, k4x, simT + dt);

      x += (dt / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
      v += (dt / 6) * (k1v + 2 * k2v + 2 * k3v + k4v);
      simT += dt;
    }

    function update(dt) {
      // Sub-stepping RK4 presisi tinggi
      const subSteps = 6;
      const h = Math.min(dt, 0.033) * 2.4 / subSteps;
      for (let s = 0; s < subSteps; s++) rk4Step(h);

      const px = x * 2.2;
      const py = v * 1.45 + 0.6;
      const pz = Math.sin(state.omega * simT) * 1.3;

      const arr = phaseLine.geometry.attributes.position.array;
      if (!initFilled) {
        for (let i = 0; i < maxHist; i++) {
          arr[i * 3] = px;
          arr[i * 3 + 1] = py;
          arr[i * 3 + 2] = pz;
        }
        initFilled = true;
      } else {
        for (let i = 0; i < maxHist - 1; i++) {
          arr[i * 3] = arr[(i + 1) * 3];
          arr[i * 3 + 1] = arr[(i + 1) * 3 + 1];
          arr[i * 3 + 2] = arr[(i + 1) * 3 + 2];
        }
        arr[(maxHist - 1) * 3] = px;
        arr[(maxHist - 1) * 3 + 1] = py;
        arr[(maxHist - 1) * 3 + 2] = pz;
      }
      phaseLine.geometry.attributes.position.needsUpdate = true;
      headDot.position.set(px, py, pz);

      const Vx = -0.5 * x * x + 0.25 * x * x * x * x;
      massBall.position.set(x * 2.2, Vx * 1.4 - 1.5, -1.8);

      if (controls && controls.update) controls.update();
      if (renderer && scene && camera) renderer.render(scene, camera);

      const energy = 0.5 * v * v + Vx;
      const isChaotic = state.gamma >= 0.31 && state.delta <= 0.32;
      updateModuleHUD(47, {
        posX: x.toFixed(3) + ' m',
        velV: v.toFixed(3) + ' m/s',
        energy: energy.toFixed(3) + ' J',
        dynamics: isChaotic ? 'Strange Attractor (Chaotic)' : 'Periodic Limit Cycle'
      }, scene);
    }

    return attachRunner(canvas, update, () => scene.remove(group));

  }

  if (window.Fisika3DLazyEngine && typeof window.Fisika3DLazyEngine.register === 'function') {
    window.Fisika3DLazyEngine.register(47, initModule47);
  } else {
    window.__FISIKA3D_PENDING_MODULES__ = window.__FISIKA3D_PENDING_MODULES__ || {};
    window.__FISIKA3D_PENDING_MODULES__[47] = initModule47;
  }
})();
