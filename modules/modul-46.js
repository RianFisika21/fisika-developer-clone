/**
 * modul-46.js — Modul #46: Resonator Akustik Helmholtz 3D
 * Kategori: Akustik & Gelombang
 * Rumus Utama: f₀ = (c / 2π) √[S / (V · L_eff)]
 * Terintegrasi dengan Fisika3DLazyEngine & FISIKA3D_CONFIGS
 */
(function() {
  'use strict';

  window.FISIKA3D_CONFIGS = window.FISIKA3D_CONFIGS || {};
  if (!window.FISIKA3D_CONFIGS[46]) {
    window.FISIKA3D_CONFIGS[46] = {
  "id": 46,
  "slug": "resonator-akustik-helmholtz-3d",
  "title": "Resonator Akustik Helmholtz 3D",
  "category": "Akustik & Gelombang",
  "formula": "f₀ = (c / 2π) √[S / (V · L_eff)]",
  "params": [
    {
      "key": "driveFreq",
      "label": "Frekuensi Eksitasi f (Hz)",
      "min": 60,
      "max": 450,
      "step": 2,
      "default": 195,
      "unit": "Hz"
    },
    {
      "key": "volumeL",
      "label": "Volume Rongga V (Liter)",
      "min": 0.5,
      "max": 5.0,
      "step": 0.1,
      "default": 1.8,
      "unit": "L"
    },
    {
      "key": "neckLen",
      "label": "Panjang Leher L (cm)",
      "min": 2.0,
      "max": 15.0,
      "step": 0.5,
      "default": 6.5,
      "unit": "cm"
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

  function initModule46(arg1, cameraArg, rendererArg, controlsArg, canvasArg) {

    const { scene, camera, renderer, controls, canvas } = resolveEngineArgs(arg1, cameraArg, rendererArg, controlsArg, canvasArg);
    if (!scene || typeof THREE === 'undefined') return;

    const state = bindModuleControls(46, { driveFreq: 195, volumeL: 1.8, neckLen: 6.5 }, [
      { key: 'driveFreq', decimals: 0, unit: 'Hz' },
      { key: 'volumeL', decimals: 1, unit: 'L' },
      { key: 'neckLen', decimals: 1, unit: 'cm' }
    ]);

    if (camera) {
      camera.position.set(0, 3.2, 7.8);
      camera.lookAt(0, 0, 0);
    }

    const group = new THREE.Group();
    scene.add(group);
    group.add(new THREE.AmbientLight(0x475569, 1.5));
    const pLight = new THREE.PointLight(0x38bdf8, 2.2, 20);
    pLight.position.set(4, 5, 5);
    group.add(pLight);

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.24,
      roughness: 0.1,
      side: THREE.DoubleSide
    });

    // Rongga sferis Helmholtz & leher silinder
    const cavityMesh = new THREE.Mesh(new THREE.SphereGeometry(1.7, 36, 36), glassMat);
    cavityMesh.position.set(-1.1, 0, 0);
    group.add(cavityMesh);

    const neckMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.45, 1.6, 28, 1, true),
      glassMat
    );
    neckMesh.rotation.z = Math.PI / 2;
    neckMesh.position.set(1.2, 0, 0);
    group.add(neckMesh);

    // Inti tekanan akustik di dalam rongga
    const pressureCore = new THREE.Mesh(
      new THREE.SphereGeometry(1.35, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending
      })
    );
    pressureCore.position.copy(cavityMesh.position);
    group.add(pressureCore);

    // Partikel "piston" udara di leher resonator
    const slugParticles = [];
    for (let i = 0; i < 45; i++) {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
      );
      const r = Math.sqrt(Math.random()) * 0.36;
      const th = Math.random() * Math.PI * 2;
      const baseX = 0.55 + Math.random() * 1.3;
      group.add(m);
      slugParticles.push({ mesh: m, baseX, y: Math.cos(th) * r, z: Math.sin(th) * r });
    }

    function update(dt, t) {
      const cSound = 343.0; // m/s
      const V = state.volumeL * 1e-3; // m³
      const rNeck = 0.022; // 2.2 cm radius
      const S = Math.PI * rNeck * rNeck;
      const L = state.neckLen * 1e-2;
      const Leff = L + 1.7 * rNeck;

      const f0 = (cSound / (2 * Math.PI)) * Math.sqrt(S / (V * Leff));
      const f = state.driveFreq;
      const Q = 14.0;
      const ratio = f / f0;
      const gain = 1.0 / Math.sqrt((1 - ratio * ratio) ** 2 + (ratio / Q) ** 2);

      const cavScale = 0.78 + Math.pow(state.volumeL / 1.8, 0.33) * 0.42;
      const neckScale = state.neckLen / 6.5;
      cavityMesh.scale.setScalar(cavScale);
      neckMesh.scale.set(1, neckScale, 1);
      neckMesh.position.x = -1.1 + 1.7 * cavScale + 0.75 * neckScale;

      const omegaVisual = 4.0 + (f / 100.0) * 5.0;
      const osc = Math.sin(omegaVisual * t);
      const ampNorm = Math.min(1.0, gain / Q);

      // Denyut tekanan rongga
      pressureCore.position.copy(cavityMesh.position);
      pressureCore.scale.setScalar(cavScale * (0.72 + ampNorm * 0.24 * osc));
      pressureCore.material.color.setHex(osc >= 0 ? 0xf43f5e : 0x38bdf8);
      pressureCore.material.opacity = 0.2 + ampNorm * 0.45;

      // Osilasi massa udara di dalam leher
      const dispX = ampNorm * 0.45 * Math.cos(omegaVisual * t);
      slugParticles.forEach((p) => {
        p.mesh.position.set(neckMesh.position.x + (p.baseX - 1.2) * neckScale + dispX, p.y, p.z);
      });

      if (controls && controls.update) controls.update();
      if (renderer && scene && camera) renderer.render(scene, camera);

      updateModuleHUD(46, {
        f0: f0.toFixed(1) + ' Hz',
        driveFreq: f.toFixed(0) + ' Hz',
        gain: gain.toFixed(2) + '×',
        status: Math.abs(f - f0) < 12 ? 'Resonance Peak!' : (f < f0 ? 'Stiffness-Controlled' : 'Mass-Controlled')
      }, scene);
    }

    return attachRunner(canvas, update, () => scene.remove(group));

  }

  if (window.Fisika3DLazyEngine && typeof window.Fisika3DLazyEngine.register === 'function') {
    window.Fisika3DLazyEngine.register(46, initModule46);
  } else {
    window.__FISIKA3D_PENDING_MODULES__ = window.__FISIKA3D_PENDING_MODULES__ || {};
    window.__FISIKA3D_PENDING_MODULES__[46] = initModule46;
  }
})();
