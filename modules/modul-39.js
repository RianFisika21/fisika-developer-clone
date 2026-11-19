/**
 * modul-39.js — Modul #39: Terowongan Kuantum 3D
 * Kategori: Mekanika Kuantum
 * Rumus Utama: T = [1 + (V₀² sinh²(κa)) / (4E(V₀ - E))]⁻¹
 * Terintegrasi dengan Fisika3DLazyEngine & FISIKA3D_CONFIGS
 */
(function() {
  'use strict';

  window.FISIKA3D_CONFIGS = window.FISIKA3D_CONFIGS || {};
  if (!window.FISIKA3D_CONFIGS[39]) {
    window.FISIKA3D_CONFIGS[39] = {
  "id": 39,
  "slug": "terowongan-kuantum-3d",
  "title": "Terowongan Kuantum 3D",
  "category": "Mekanika Kuantum",
  "formula": "T = [1 + (V₀² sinh²(κa)) / (4E(V₀ - E))]⁻¹",
  "params": [
    {
      "key": "energy",
      "label": "Energi Partikel E (eV)",
      "min": 0.5,
      "max": 9.5,
      "step": 0.1,
      "default": 4.2,
      "unit": "eV"
    },
    {
      "key": "barrierV",
      "label": "Tinggi Penghalang V₀ (eV)",
      "min": 2.0,
      "max": 10.0,
      "step": 0.1,
      "default": 6.0,
      "unit": "eV"
    },
    {
      "key": "width",
      "label": "Lebar Penghalang a (nm)",
      "min": 0.2,
      "max": 2.0,
      "step": 0.05,
      "default": 0.75,
      "unit": "nm"
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

  function initModule39(arg1, cameraArg, rendererArg, controlsArg, canvasArg) {

    const { scene, camera, renderer, controls, canvas } = resolveEngineArgs(arg1, cameraArg, rendererArg, controlsArg, canvasArg);
    if (!scene || typeof THREE === 'undefined') return;

    const state = bindModuleControls(39, { energy: 4.2, barrierV: 6.0, width: 0.75 }, [
      { key: 'energy', decimals: 2, unit: 'eV' },
      { key: 'barrierV', decimals: 2, unit: 'eV' },
      { key: 'width', decimals: 2, unit: 'nm' }
    ]);

    if (camera) {
      camera.position.set(0, 3.8, 9.2);
      camera.lookAt(0, 0, 0);
    }

    const group = new THREE.Group();
    scene.add(group);
    group.add(new THREE.AmbientLight(0x475569, 1.5));
    const dirLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight.position.set(5, 8, 6);
    group.add(dirLight);

    // Penghalang Potensial 3D
    const barrierMat = new THREE.MeshPhysicalMaterial({
      color: 0xf43f5e,
      transparent: true,
      opacity: 0.34,
      roughness: 0.15,
      metalness: 0.1
    });
    const barrierMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 3.2, 3.2), barrierMat);
    group.add(barrierMesh);

    // Sumbu dasar & garis energi
    const axisMesh = new THREE.Mesh(
      new THREE.BoxGeometry(12, 0.04, 3.2),
      new THREE.MeshBasicMaterial({ color: 0x1e293b })
    );
    axisMesh.position.y = -1.2;
    group.add(axisMesh);

    // Gelombang Kuantum Re(ψ), Im(ψ) dan Densitas Probabilitas |ψ|²
    const N = 180;
    const probPts = [];
    const phasePts = [];
    for (let i = 0; i < N; i++) {
      probPts.push(new THREE.Vector3());
      phasePts.push(new THREE.Vector3());
    }
    const probLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(probPts),
      new THREE.LineBasicMaterial({ color: 0x38bdf8 })
    );
    const phaseLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(phasePts),
      new THREE.LineBasicMaterial({ color: 0xa855f7 })
    );
    group.add(probLine, phaseLine);

    // Partikel foton/elektron kuasi-klasik untuk intuisi transmisi
    const waveBeads = [];
    for (let i = 0; i < 40; i++) {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0x22d3ee })
      );
      group.add(m);
      waveBeads.push(m);
    }

    function update(dt, t) {
      const E = Math.max(0.2, state.energy);
      const V0 = Math.max(0.5, state.barrierV);
      const a = state.width;

      // Hitung Koefisien Transmisi T & Refleksi R eksak
      let T = 1.0;
      let kappa = 0;
      if (E < V0) {
        kappa = Math.sqrt(2.0 * (V0 - E)) * 2.4;
        const sh = Math.sinh(kappa * a);
        T = 1.0 / (1.0 + (V0 * V0 * sh * sh) / (4.0 * E * (V0 - E)));
      } else if (E > V0) {
        const k2 = Math.sqrt(2.0 * (E - V0)) * 2.4;
        const sn = Math.sin(k2 * a);
        T = 1.0 / (1.0 + (V0 * V0 * sn * sn) / (4.0 * E * (E - V0)));
      }
      const R = Math.max(0, 1.0 - T);

      barrierMesh.scale.set(a * 1.6, V0 * 0.35, 1);
      barrierMesh.position.y = -1.2 + (V0 * 0.35) * 0.5;

      const k1 = Math.sqrt(2.0 * E) * 2.4;
      const omega = E * 1.8;
      const halfW = a * 0.8;
      const pAttr = probLine.geometry.attributes.position;
      const hAttr = phaseLine.geometry.attributes.position;

      for (let i = 0; i < N; i++) {
        const x = -5.8 + (i / (N - 1)) * 11.6;
        let re = 0;
        let im = 0;

        if (x < -halfW) {
          // Gelombang datang + terpantul
          const rAmp = Math.sqrt(R);
          re = Math.cos(k1 * x - omega * t) + rAmp * Math.cos(-k1 * x - omega * t + 0.6);
          im = Math.sin(k1 * x - omega * t) + rAmp * Math.sin(-k1 * x - omega * t + 0.6);
        } else if (x <= halfW) {
          // Peluruhan evanescent di dalam penghalang
          const uNorm = (x + halfW) / Math.max(2 * halfW, 0.01);
          const decay = E < V0 ? Math.exp(-kappa * a * uNorm) : 1.0;
          re = decay * Math.cos(-omega * t);
          im = decay * Math.sin(-omega * t);
        } else {
          // Gelombang tertransmisi
          const tAmp = Math.sqrt(T);
          re = tAmp * Math.cos(k1 * x - omega * t);
          im = tAmp * Math.sin(k1 * x - omega * t);
        }

        const prob = (re * re + im * im) * 0.55;
        pAttr.setXYZ(i, x, -1.2 + prob, 0);
        hAttr.setXYZ(i, x, -0.2 + re * 0.65, im * 0.65);
      }
      pAttr.needsUpdate = true;
      hAttr.needsUpdate = true;

      waveBeads.forEach((bead, idx) => {
        const x = -5.5 + (idx / (waveBeads.length - 1)) * 11.0;
        const amp = x < -halfW ? 0.65 : (x <= halfW ? 0.35 : Math.max(0.12, Math.sqrt(T) * 0.65));
        const phi = k1 * x - omega * t;
        bead.position.set(x, -0.2 + Math.cos(phi) * amp, Math.sin(phi) * amp);
        bead.scale.setScalar(x > halfW ? Math.max(0.45, Math.sqrt(T)) : 0.9);
      });

      if (controls && controls.update) controls.update();
      if (renderer && scene && camera) renderer.render(scene, camera);

      updateModuleHUD(39, {
        transmission: (T * 100).toFixed(2) + ' %',
        reflection: (R * 100).toFixed(2) + ' %',
        kappa: kappa.toFixed(3) + ' nm⁻¹',
        regime: E < V0 ? 'Quantum Tunneling (E < V₀)' : 'Over-Barrier Scattering (E ≥ V₀)'
      }, scene);
    }

    return attachRunner(canvas, update, () => scene.remove(group));

  }

  if (window.Fisika3DLazyEngine && typeof window.Fisika3DLazyEngine.register === 'function') {
    window.Fisika3DLazyEngine.register(39, initModule39);
  } else {
    window.__FISIKA3D_PENDING_MODULES__ = window.__FISIKA3D_PENDING_MODULES__ || {};
    window.__FISIKA3D_PENDING_MODULES__[39] = initModule39;
  }
})();
