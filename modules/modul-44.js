/**
 * modul-44.js — Modul #44: Efek Hall Klasik & Kuantum 3D
 * Kategori: Fisika Zat Padat & Kuantum
 * Rumus Utama: V_H = (I · B) / (n · q · t) | R_xy = h / (ν · e²)
 * Terintegrasi dengan Fisika3DLazyEngine & FISIKA3D_CONFIGS
 */
(function() {
  'use strict';

  window.FISIKA3D_CONFIGS = window.FISIKA3D_CONFIGS || {};
  if (!window.FISIKA3D_CONFIGS[44]) {
    window.FISIKA3D_CONFIGS[44] = {
  "id": 44,
  "slug": "efek-hall-klasik-kuantum-3d",
  "title": "Efek Hall Klasik & Kuantum 3D",
  "category": "Fisika Zat Padat & Kuantum",
  "formula": "V_H = (I · B) / (n · q · t) | R_xy = h / (ν · e²)",
  "params": [
    {
      "key": "bField",
      "label": "Medan Magnet B (Tesla)",
      "min": 0.2,
      "max": 12.0,
      "step": 0.2,
      "default": 3.5,
      "unit": "T"
    },
    {
      "key": "current",
      "label": "Arus Listrik I (mA)",
      "min": 1.0,
      "max": 20.0,
      "step": 0.5,
      "default": 8.0,
      "unit": "mA"
    },
    {
      "key": "regime",
      "label": "Mode (0=Klasik, 1=Kuantum)",
      "min": 0,
      "max": 1,
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

  function initModule44(arg1, cameraArg, rendererArg, controlsArg, canvasArg) {

    const { scene, camera, renderer, controls, canvas } = resolveEngineArgs(arg1, cameraArg, rendererArg, controlsArg, canvasArg);
    if (!scene || typeof THREE === 'undefined') return;

    const state = bindModuleControls(44, { bField: 3.5, current: 8.0, regime: 0 }, [
      { key: 'bField', decimals: 1, unit: 'T' },
      { key: 'current', decimals: 1, unit: 'mA' },
      { key: 'regime', decimals: 0, unit: '' }
    ]);

    if (camera) {
      camera.position.set(0, 5.2, 7.6);
      camera.lookAt(0, 0, 0);
    }

    const group = new THREE.Group();
    scene.add(group);
    group.add(new THREE.AmbientLight(0x475569, 1.6));

    // Pelat Semikonduktor Hall Bar 3D
    const barW = 8.4;
    const barH = 0.45;
    const barD = 3.6;
    const slab = new THREE.Mesh(
      new THREE.BoxGeometry(barW, barH, barD),
      new THREE.MeshPhysicalMaterial({
        color: 0x1e293b,
        transparent: true,
        opacity: 0.45,
        roughness: 0.2
      })
    );
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(barW, barH, barD)),
      new THREE.LineBasicMaterial({ color: 0x38bdf8 })
    );
    group.add(slab, edges);

    // Panah vektor medan magnet B vertikal
    const bArrows = [];
    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const arr = new THREE.ArrowHelper(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3(ix * 1.6, -1.3, iz * 1.1),
          2.6,
          0xa855f7,
          0.22,
          0.14
        );
        group.add(arr);
        bArrows.push(arr);
      }
    }

    // Pembawa muatan (elektron)
    const eCount = 90;
    const electrons = [];
    for (let i = 0; i < eCount; i++) {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.085, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      );
      group.add(m);
      electrons.push({
        mesh: m,
        x: (Math.random() - 0.5) * barW,
        z: (Math.random() - 0.5) * (barD - 0.4),
        phase: Math.random() * Math.PI * 2
      });
    }

    function update(dt, t) {
      const B = state.bField;
      const I_mA = state.current;
      const isQuantum = Math.round(state.regime) === 1 || B >= 7.5;

      // Konstanta fisika
      const e = 1.602e-19;
      const h = 6.626e-34;
      const n2D = 4.5e15; // kerapatan pembawa muatan 2D (m^-2)
      const vDrift = (I_mA / 10.0) * 2.4;

      // Filling factor Landau nu = n*h / (e*B)
      const nuExact = (n2D * h) / (e * Math.max(0.2, B));
      const nuPlateau = Math.max(1, Math.round(nuExact));
      const Rk = 25812.807; // Ohm
      const Rxy = isQuantum ? Rk / nuPlateau : (B / (n2D * e));
      const VHall_mV = (I_mA * 1e-3) * Rxy * 1e3;

      bArrows.forEach((arr) => {
        arr.setLength(1.6 + B * 0.14, 0.22, 0.14);
      });

      const halfW = barW / 2 - 0.2;
      const halfD = barD / 2 - 0.25;
      const deflection = Math.min(1.0, (B * I_mA) / 65.0);

      electrons.forEach((el, idx) => {
        if (isQuantum) {
          // Orbit siklotron terkuantisasi di interior + chiral edge states di tepi
          const isEdge = idx % 3 === 0;
          if (isEdge) {
            const side = idx % 2 === 0 ? 1 : -1;
            el.x += side * vDrift * 1.4 * dt;
            if (el.x > halfW) el.x = -halfW;
            if (el.x < -halfW) el.x = halfW;
            el.z = side * (halfD - 0.12) + Math.sin(t * 8 + el.phase) * 0.06;
            el.mesh.material.color.setHex(0xf43f5e);
          } else {
            const rCyc = Math.max(0.12, 0.55 / Math.sqrt(B));
            const omegaC = B * 2.2;
            const cx = ((idx * 1.37) % (barW - 1.2)) - (barW - 1.2) / 2;
            const cz = (((idx * 2.19) % (barD - 1.0)) - (barD - 1.0) / 2);
            el.x = cx + Math.cos(omegaC * t + el.phase) * rCyc;
            el.z = cz + Math.sin(omegaC * t + el.phase) * rCyc;
            el.mesh.material.color.setHex(0xc084fc);
          }
        } else {
          // Efek Hall Klasik: aliran arus X dengan pembelokan gaya Lorentz ke tepi +Z
          el.x += vDrift * dt;
          if (el.x > halfW) {
            el.x = -halfW;
            el.z = (Math.random() - 0.5) * (barD - 0.5);
          }
          const targetZ = Math.min(halfD, el.z + deflection * 0.9 * dt);
          el.z = targetZ;
          el.mesh.material.color.setHex(el.z > halfD * 0.65 ? 0xfbbf24 : 0x38bdf8);
        }
        el.mesh.position.set(el.x, 0, el.z);
      });

      if (controls && controls.update) controls.update();
      if (renderer && scene && camera) renderer.render(scene, camera);

      updateModuleHUD(44, {
        vHall: VHall_mV.toFixed(2) + ' mV',
        rHall: Rxy.toFixed(1) + ' Ω',
        landauNu: isQuantum ? `ν = ${nuPlateau} (Quantized)` : `ν ≈ ${nuExact.toFixed(2)} (Classical)`,
        mode: isQuantum ? 'Quantum Hall Plateau' : 'Classical Lorentz Hall'
      }, scene);
    }

    return attachRunner(canvas, update, () => scene.remove(group));

  }

  if (window.Fisika3DLazyEngine && typeof window.Fisika3DLazyEngine.register === 'function') {
    window.Fisika3DLazyEngine.register(44, initModule44);
  } else {
    window.__FISIKA3D_PENDING_MODULES__ = window.__FISIKA3D_PENDING_MODULES__ || {};
    window.__FISIKA3D_PENDING_MODULES__[44] = initModule44;
  }
})();
