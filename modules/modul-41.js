/**
 * modul-41.js — Modul #41: Jalan Pusaran Kármán 3D
 * Kategori: Dinamika Fluida
 * Rumus Utama: St = f_s · D / U_∞ ≈ 0.198 (1 - 19.7 / Re)
 * Terintegrasi dengan Fisika3DLazyEngine & FISIKA3D_CONFIGS
 */
(function() {
  'use strict';

  window.FISIKA3D_CONFIGS = window.FISIKA3D_CONFIGS || {};
  if (!window.FISIKA3D_CONFIGS[41]) {
    window.FISIKA3D_CONFIGS[41] = {
  "id": 41,
  "slug": "jalan-pusaran-karman-3d",
  "title": "Jalan Pusaran Kármán 3D",
  "category": "Dinamika Fluida",
  "formula": "St = f_s · D / U_∞ ≈ 0.198 (1 - 19.7 / Re)",
  "params": [
    {
      "key": "reynolds",
      "label": "Bilangan Reynolds (Re)",
      "min": 20,
      "max": 300,
      "step": 5,
      "default": 120,
      "unit": ""
    },
    {
      "key": "velocity",
      "label": "Kecepatan Aliran U_∞ (m/s)",
      "min": 0.5,
      "max": 4.0,
      "step": 0.1,
      "default": 1.8,
      "unit": "m/s"
    },
    {
      "key": "diameter",
      "label": "Diameter Silinder D (m)",
      "min": 0.4,
      "max": 1.4,
      "step": 0.05,
      "default": 0.8,
      "unit": "m"
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

  function initModule41(arg1, cameraArg, rendererArg, controlsArg, canvasArg) {

    const { scene, camera, renderer, controls, canvas } = resolveEngineArgs(arg1, cameraArg, rendererArg, controlsArg, canvasArg);
    if (!scene || typeof THREE === 'undefined') return;

    const state = bindModuleControls(41, { reynolds: 120, velocity: 1.8, diameter: 0.8 }, [
      { key: 'reynolds', decimals: 0, unit: '' },
      { key: 'velocity', decimals: 2, unit: 'm/s' },
      { key: 'diameter', decimals: 2, unit: 'm' }
    ]);

    if (camera) {
      camera.position.set(1.2, 5.2, 8.8);
      camera.lookAt(1.5, 0, 0);
    }

    const group = new THREE.Group();
    scene.add(group);
    group.add(new THREE.AmbientLight(0x475569, 1.5));
    const light = new THREE.DirectionalLight(0x38bdf8, 2.0);
    light.position.set(3, 7, 5);
    group.add(light);

    // Silinder rintangan
    const cylGeo = new THREE.CylinderGeometry(0.5, 0.5, 3.0, 32);
    const cylMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.6, roughness: 0.25 });
    const cylinder = new THREE.Mesh(cylGeo, cylMat);
    cylinder.position.set(-3.2, 0, 0);
    group.add(cylinder);

    // Tabung pusaran (Vortex tubes) bergantian atas/bawah
    const vortexCount = 10;
    const vortices = [];
    for (let i = 0; i < vortexCount; i++) {
      const sign = i % 2 === 0 ? 1 : -1;
      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(0.32, 0.04, 10, 28),
        new THREE.MeshBasicMaterial({
          color: sign > 0 ? 0x38bdf8 : 0xf43f5e,
          transparent: true,
          opacity: 0.65
        })
      );
      torus.rotation.x = Math.PI / 2;
      group.add(torus);
      vortices.push({ mesh: torus, sign, index: i });
    }

    // 260 partikel jejak aliran fluida
    const pCount = 260;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pCol = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = -6 + Math.random() * 14;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 2.6;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 3.4;
      pCol[i * 3] = 0.22;
      pCol[i * 3 + 1] = 0.74;
      pCol[i * 3 + 2] = 0.97;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ size: 0.11, vertexColors: true, transparent: true, opacity: 0.9 })
    );
    group.add(particles);

    function update(dt, t) {
      const Re = state.reynolds;
      const U = state.velocity;
      const D = state.diameter;
      const rCyl = D * 0.5;
      cylinder.scale.set(D, 1, D);

      const sheddingActive = Re > 47;
      const St = sheddingActive ? Math.max(0.08, 0.198 * (1 - 19.7 / Re)) : 0;
      const fs = (St * U) / D;
      const wakeAmp = sheddingActive ? Math.min(1.1, ((Re - 47) / 140) * D * 0.95) : 0.04;
      const uConv = U * 0.82;

      // Update posisi tabung pusaran
      vortices.forEach((v) => {
        const periodSpan = 10.5;
        const rawX = ((t * uConv * 1.4 + v.index * (periodSpan / vortexCount)) % periodSpan);
        const x = -2.6 + rawX;
        const z = v.sign * wakeAmp * 0.55 * (1 - Math.exp(-rawX * 0.6));
        v.mesh.position.set(x, 0, z);
        v.mesh.rotation.z += v.sign * dt * (2.5 + fs * 4.0);
        v.mesh.visible = sheddingActive;
        v.mesh.scale.setScalar(D * (0.85 + 0.15 * Math.sin(rawX)));
      });

      // Adveksi partikel fluida dengan superposisi pusaran Kármán
      const arr = particles.geometry.attributes.position.array;
      const col = particles.geometry.attributes.color.array;
      for (let i = 0; i < pCount; i++) {
        let x = arr[i * 3];
        let y = arr[i * 3 + 1];
        let z = arr[i * 3 + 2];

        const dx = x - (-3.2);
        const dist2 = dx * dx + z * z;
        let vx = U * 1.6;
        let vz = 0;

        // Aliran potensial membelok di sekitar silinder
        if (dist2 < (rCyl + 0.9) ** 2) {
          const r2 = Math.max(dist2, rCyl * rCyl * 1.05);
          vx += U * 1.2 * (rCyl * rCyl * (z * z - dx * dx)) / (r2 * r2);
          vz += U * 1.2 * (-2 * rCyl * rCyl * dx * z) / (r2 * r2);
        }

        // Gelombang pusaran di belakang silinder (wake)
        if (dx > 0 && sheddingActive) {
          const kWake = (2 * Math.PI * fs) / Math.max(uConv, 0.2);
          const env = Math.exp(-Math.abs(z) / (1.35 * D)) * (1 - Math.exp(-dx * 0.8));
          vz += wakeAmp * U * 1.45 * Math.cos(kWake * dx - 2 * Math.PI * fs * t) * env;
        }

        x += vx * dt;
        z += vz * dt;
        if (x > 8.0) {
          x = -6.0;
          z = (Math.random() - 0.5) * 3.4;
          y = (Math.random() - 0.5) * 2.6;
        }
        arr[i * 3] = x;
        arr[i * 3 + 1] = y;
        arr[i * 3 + 2] = z;

        // Pewarnaan berdasarkan vortisitas lokal (vz)
        const vortNorm = Math.max(-1, Math.min(1, vz / (U + 0.1)));
        col[i * 3] = vortNorm > 0 ? 0.95 : 0.22;
        col[i * 3 + 1] = 0.65 - Math.abs(vortNorm) * 0.25;
        col[i * 3 + 2] = vortNorm < 0 ? 0.98 : 0.45;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.color.needsUpdate = true;

      if (controls && controls.update) controls.update();
      if (renderer && scene && camera) renderer.render(scene, camera);

      updateModuleHUD(41, {
        reynolds: Re.toFixed(0),
        strouhal: sheddingActive ? St.toFixed(3) : '0.000 (Laminar)',
        sheddingFreq: fs.toFixed(2) + ' Hz',
        regime: Re < 47 ? 'Steady Symmetric Wake' : 'Kármán Vortex Street'
      }, scene);
    }

    return attachRunner(canvas, update, () => scene.remove(group));

  }

  if (window.Fisika3DLazyEngine && typeof window.Fisika3DLazyEngine.register === 'function') {
    window.Fisika3DLazyEngine.register(41, initModule41);
  } else {
    window.__FISIKA3D_PENDING_MODULES__ = window.__FISIKA3D_PENDING_MODULES__ || {};
    window.__FISIKA3D_PENDING_MODULES__[41] = initModule41;
  }
})();
