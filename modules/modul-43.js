/**
 * modul-43.js — Modul #43: Gelombang Soliton Korteweg–de Vries
 * Kategori: Fisika Non-Linier & Gelombang
 * Rumus Utama: ∂u/∂t + 6u(∂u/∂x) + ∂³u/∂x³ = 0
 * Terintegrasi dengan Fisika3DLazyEngine & FISIKA3D_CONFIGS
 */
(function() {
  'use strict';

  window.FISIKA3D_CONFIGS = window.FISIKA3D_CONFIGS || {};
  if (!window.FISIKA3D_CONFIGS[43]) {
    window.FISIKA3D_CONFIGS[43] = {
  "id": 43,
  "slug": "gelombang-soliton-kdv-3d",
  "title": "Gelombang Soliton Korteweg–de Vries",
  "category": "Fisika Non-Linier & Gelombang",
  "formula": "∂u/∂t + 6u(∂u/∂x) + ∂³u/∂x³ = 0",
  "params": [
    {
      "key": "amp1",
      "label": "Amplitudo Soliton Cepat A₁",
      "min": 0.6,
      "max": 2.4,
      "step": 0.05,
      "default": 1.65,
      "unit": "m"
    },
    {
      "key": "amp2",
      "label": "Amplitudo Soliton Lambat A₂",
      "min": 0.2,
      "max": 1.4,
      "step": 0.05,
      "default": 0.7,
      "unit": "m"
    },
    {
      "key": "dispersion",
      "label": "Koefisien Dispersi δ",
      "min": 0.5,
      "max": 1.8,
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

  function initModule43(arg1, cameraArg, rendererArg, controlsArg, canvasArg) {

    const { scene, camera, renderer, controls, canvas } = resolveEngineArgs(arg1, cameraArg, rendererArg, controlsArg, canvasArg);
    if (!scene || typeof THREE === 'undefined') return;

    const state = bindModuleControls(43, { amp1: 1.65, amp2: 0.7, dispersion: 1.0 }, [
      { key: 'amp1', decimals: 2, unit: 'm' },
      { key: 'amp2', decimals: 2, unit: 'm' },
      { key: 'dispersion', decimals: 2, unit: '' }
    ]);

    if (camera) {
      camera.position.set(0, 4.4, 8.6);
      camera.lookAt(0, 0.3, 0);
    }

    const group = new THREE.Group();
    scene.add(group);
    group.add(new THREE.AmbientLight(0x475569, 1.5));
    const dir = new THREE.DirectionalLight(0x38bdf8, 2.2);
    dir.position.set(4, 8, 5);
    group.add(dir);

    // Kanal air dangkal 3D
    const segX = 140;
    const segZ = 18;
    const widthX = 13.0;
    const depthZ = 2.8;
    const waterGeo = new THREE.PlaneGeometry(widthX, depthZ, segX, segZ);
    waterGeo.rotateX(-Math.PI / 2);

    const count = waterGeo.attributes.position.count;
    const colors = new Float32Array(count * 3);
    waterGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const waterMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.25,
      metalness: 0.15,
      side: THREE.DoubleSide
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    group.add(waterMesh);

    const wireOverlay = new THREE.Mesh(
      waterGeo,
      new THREE.MeshBasicMaterial({ color: 0x7dd3fc, wireframe: true, transparent: true, opacity: 0.14 })
    );
    group.add(wireOverlay);

    function sech2(z) {
      const c = Math.cosh(Math.max(-18, Math.min(18, z)));
      return 1.0 / (c * c);
    }

    function update(dt, t) {
      const A1 = state.amp1;
      const A2 = state.amp2;
      const disp = state.dispersion;

      // Kecepatan soliton sebanding dengan amplitudo (c = 2A)
      const c1 = 2.0 * A1;
      const c2 = 2.0 * A2;
      const L = widthX;
      const wrap = (val) => ((((val + L / 2) % L) + L) % L) - L / 2;

      const x1 = wrap(-3.8 + c1 * t * 0.85);
      const x2 = wrap(-0.5 + c2 * t * 0.85);

      // Pergeseran fase interaksi elastik dua soliton Hirota
      const dist = Math.abs(x1 - x2);
      const interactionShift = Math.exp(-dist * dist * 1.4) * 0.35;

      const pos = waterMesh.geometry.attributes.position;
      const col = waterMesh.geometry.attributes.color;
      let maxH = 0;

      for (let i = 0; i < count; i++) {
        const vx = pos.getX(i);
        const w1 = Math.sqrt(A1 / (2 * disp));
        const w2 = Math.sqrt(A2 / (2 * disp));

        // Jarak periodik terdekat
        let dx1 = vx - x1;
        if (dx1 > L / 2) dx1 -= L;
        if (dx1 < -L / 2) dx1 += L;

        let dx2 = vx - x2;
        if (dx2 > L / 2) dx2 -= L;
        if (dx2 < -L / 2) dx2 += L;

        const u1 = A1 * sech2(w1 * dx1);
        const u2 = A2 * sech2(w2 * dx2);
        const u = u1 + u2 - interactionShift * Math.min(u1, u2);

        pos.setY(i, u);
        if (u > maxH) maxH = u;

        const norm = Math.min(1, u / 2.2);
        col.setXYZ(i, 0.08 + norm * 0.85, 0.45 + norm * 0.5, 0.85 + norm * 0.15);
      }
      pos.needsUpdate = true;
      col.needsUpdate = true;
      waterMesh.geometry.computeVertexNormals();

      if (controls && controls.update) controls.update();
      if (renderer && scene && camera) renderer.render(scene, camera);

      const phaseShift = (2 / Math.sqrt(A1)) * Math.log(Math.abs((Math.sqrt(A1) + Math.sqrt(A2)) / Math.max(0.05, Math.sqrt(A1) - Math.sqrt(A2))));
      updateModuleHUD(43, {
        c1: c1.toFixed(2) + ' m/s',
        c2: c2.toFixed(2) + ' m/s',
        peakHeight: maxH.toFixed(2) + ' m',
        phaseShift: isFinite(phaseShift) ? phaseShift.toFixed(2) + ' rad' : '—'
      }, scene);
    }

    return attachRunner(canvas, update, () => scene.remove(group));

  }

  if (window.Fisika3DLazyEngine && typeof window.Fisika3DLazyEngine.register === 'function') {
    window.Fisika3DLazyEngine.register(43, initModule43);
  } else {
    window.__FISIKA3D_PENDING_MODULES__ = window.__FISIKA3D_PENDING_MODULES__ || {};
    window.__FISIKA3D_PENDING_MODULES__[43] = initModule43;
  }
})();
