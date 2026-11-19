/**
 * modul-42.js — Modul #42: Presesi & Nutasi Giroskop 3D
 * Kategori: Mekanika Klasik
 * Rumus Utama: Ω_p = (M · g · r) / (I₃ · ω_s)
 * Terintegrasi dengan Fisika3DLazyEngine & FISIKA3D_CONFIGS
 */
(function() {
  'use strict';

  window.FISIKA3D_CONFIGS = window.FISIKA3D_CONFIGS || {};
  if (!window.FISIKA3D_CONFIGS[42]) {
    window.FISIKA3D_CONFIGS[42] = {
  "id": 42,
  "slug": "presesi-nutasi-giroskop-3d",
  "title": "Presesi & Nutasi Giroskop 3D",
  "category": "Mekanika Klasik",
  "formula": "Ω_p = (M · g · r) / (I₃ · ω_s)",
  "params": [
    {
      "key": "spin",
      "label": "Kecepatan Spin ω_s (rad/s)",
      "min": 15,
      "max": 90,
      "step": 1,
      "default": 48,
      "unit": "rad/s"
    },
    {
      "key": "tilt",
      "label": "Sudut Kemiringan θ₀ (°)",
      "min": 10,
      "max": 65,
      "step": 1,
      "default": 32,
      "unit": "°"
    },
    {
      "key": "nutation",
      "label": "Amplitudo Nutasi Δθ (°)",
      "min": 0,
      "max": 15,
      "step": 0.5,
      "default": 5.5,
      "unit": "°"
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

  function initModule42(arg1, cameraArg, rendererArg, controlsArg, canvasArg) {

    const { scene, camera, renderer, controls, canvas } = resolveEngineArgs(arg1, cameraArg, rendererArg, controlsArg, canvasArg);
    if (!scene || typeof THREE === 'undefined') return;

    const state = bindModuleControls(42, { spin: 48, tilt: 32, nutation: 5.5 }, [
      { key: 'spin', decimals: 0, unit: 'rad/s' },
      { key: 'tilt', decimals: 0, unit: '°' },
      { key: 'nutation', decimals: 1, unit: '°' }
    ]);

    if (camera) {
      camera.position.set(4.5, 4.2, 5.5);
      camera.lookAt(0, 1.4, 0);
    }

    const group = new THREE.Group();
    scene.add(group);
    group.add(new THREE.AmbientLight(0x475569, 1.6));
    const spot = new THREE.PointLight(0xfbbf24, 2.5, 20);
    spot.position.set(3, 6, 4);
    group.add(spot);

    // Alas & tiang tumpuan pivot
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(1.4, 1.6, 0.22, 32),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.3 })
    );
    const pivotPost = new THREE.Mesh(
      new THREE.ConeGeometry(0.22, 1.2, 24),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 })
    );
    pivotPost.position.y = 0.6;
    group.add(base, pivotPost);

    // Pivot group di puncak tumpuan (y = 1.2)
    const pivotGroup = new THREE.Group();
    pivotGroup.position.set(0, 1.2, 0);
    group.add(pivotGroup);

    // Poros giroskop & piringan roda gila (flywheel)
    const axle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 3.2, 16),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.85, roughness: 0.15 })
    );
    axle.position.y = 1.6;
    pivotGroup.add(axle);

    const rotorGroup = new THREE.Group();
    rotorGroup.position.y = 1.85;
    pivotGroup.add(rotorGroup);

    const flywheel = new THREE.Mesh(
      new THREE.CylinderGeometry(1.25, 1.25, 0.24, 40),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.75, roughness: 0.2 })
    );
    const stripe = new THREE.Mesh(
      new THREE.BoxGeometry(2.45, 0.26, 0.12),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    rotorGroup.add(flywheel, stripe);

    // Jejak lokus ujung poros (menunjukkan presesi + gelombang nutasi)
    const trailMax = 220;
    const trailPts = [];
    for (let i = 0; i < trailMax; i++) trailPts.push(new THREE.Vector3(0, 4.4, 0));
    const trailGeo = new THREE.BufferGeometry().setFromPoints(trailPts);
    const trailLine = new THREE.Line(
      trailGeo,
      new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 })
    );
    group.add(trailLine);

    let phi = 0;
    let psi = 0;
    let trailIdx = 0;

    function update(dt, t) {
      const M = 1.2;
      const g = 9.81;
      const r = 0.18;
      const I3 = 0.045;
      const I1 = 0.028;
      const ws = Math.max(5, state.spin);
      const omegaP = (M * g * r) / (I3 * ws); // Kecepatan sudut presesi
      const omegaN = (I3 * ws) / I1; // Frekuensi nutasi

      const theta0 = (state.tilt * Math.PI) / 180;
      const dTheta = (state.nutation * Math.PI) / 180;
      const theta = theta0 + dTheta * Math.cos(omegaN * t * 0.28);

      phi += omegaP * dt * 1.6;
      psi += ws * dt * 0.35;

      // Orientasi Euler Z-X-Y dari titik pivot
      pivotGroup.rotation.set(0, 0, 0);
      pivotGroup.rotateY(phi);
      pivotGroup.rotateZ(theta);
      rotorGroup.rotation.y = psi;

      // Rekam koordinat ujung poros (L = 3.2 di atas pivot)
      const tipLocal = new THREE.Vector3(0, 3.2, 0);
      pivotGroup.updateMatrixWorld();
      const tipWorld = tipLocal.applyMatrix4(pivotGroup.matrixWorld);

      const arr = trailLine.geometry.attributes.position.array;
      if (trailIdx === 0) {
        for (let i = 0; i < trailMax; i++) {
          arr[i * 3] = tipWorld.x;
          arr[i * 3 + 1] = tipWorld.y;
          arr[i * 3 + 2] = tipWorld.z;
        }
      } else {
        for (let i = 0; i < trailMax - 1; i++) {
          arr[i * 3] = arr[(i + 1) * 3];
          arr[i * 3 + 1] = arr[(i + 1) * 3 + 1];
          arr[i * 3 + 2] = arr[(i + 1) * 3 + 2];
        }
        arr[(trailMax - 1) * 3] = tipWorld.x;
        arr[(trailMax - 1) * 3 + 1] = tipWorld.y;
        arr[(trailMax - 1) * 3 + 2] = tipWorld.z;
      }
      trailIdx++;
      trailLine.geometry.attributes.position.needsUpdate = true;

      if (controls && controls.update) controls.update();
      if (renderer && scene && camera) renderer.render(scene, camera);

      const Lspin = I3 * ws;
      updateModuleHUD(42, {
        omegaP: omegaP.toFixed(3) + ' rad/s',
        omegaN: omegaN.toFixed(2) + ' rad/s',
        angularMom: Lspin.toFixed(3) + ' kg·m²/s',
        thetaNow: ((theta * 180) / Math.PI).toFixed(1) + '°'
      }, scene);
    }

    return attachRunner(canvas, update, () => scene.remove(group));

  }

  if (window.Fisika3DLazyEngine && typeof window.Fisika3DLazyEngine.register === 'function') {
    window.Fisika3DLazyEngine.register(42, initModule42);
  } else {
    window.__FISIKA3D_PENDING_MODULES__ = window.__FISIKA3D_PENDING_MODULES__ || {};
    window.__FISIKA3D_PENDING_MODULES__[42] = initModule42;
  }
})();
