(function() {
  "use strict";

  var REAL_PRESETS = {
    1: [
      { name: "Merkurius – Matahari (r ≈ 58 Gm)", values: { "mass-slider": 1.0, "radius-slider": 58 } },
      { name: "Bumi – Matahari (r ≈ 150 Gm / 1 AU)", values: { "mass-slider": 1.0, "radius-slider": 150 } },
      { name: "Bintang Biner Masif (3.5 M☉, r = 90 Gm)", values: { "mass-slider": 3.5, "radius-slider": 90 } }
    ],
    2: [
      { name: "Terapi Tumor Dangkal (Proton 100 MeV)", values: { "energy-slider": 100 } },
      { name: "Terapi Jaringan Dalam (Proton 220 MeV)", values: { "energy-slider": 220 } }
    ],
    3: [
      { name: "Siklotron Medan Tinggi (B = 4.5 T)", values: { "bfield-slider": 4.5, "efield-slider": 0 } },
      { name: "Filter Kecepatan Wien (E & B Silang)", values: { "bfield-slider": 2.5, "efield-slider": 3.0 } }
    ],
    18: [
      { name: "Teras Reaktor PWR (Air Ringan n = 1.333)", values: { "medium-select": "1.333", "beta-slider": 0.88 } },
      { name: "Partikel Beta Ultra-Relativistik (β = 0.98)", values: { "beta-slider": 0.98 } }
    ],
    20: [
      { name: "Sagittarius A* (Pusat Bima Sakti)", values: { "mass-slider": 1.2, "spin-slider": 0.5 } },
      { name: "M87* (Lubang Hitam Supermasif Rotasi Cepat)", values: { "mass-slider": 2.8, "spin-slider": 0.9 } }
    ],
    22: [
      { name: "Operasi ITER Baseline (Bt = 5.3 T, Ip = 15 MA)", values: { "bt-slider": 5.3, "ip-slider": 15 } },
      { name: "Rezim Penyalaan Lawson Tinggi", values: { "bt-slider": 7.0, "ip-slider": 18, "temp-slider": 150 } }
    ],
    25: [
      { name: "YBCO dalam Nitrogen Cair (T = 77 K < Tc)", values: { "temp-slider": 77 } },
      { name: "Transisi Keadaan Normal (T = 105 K > Tc)", values: { "temp-slider": 105 } }
    ],
    26: [
      { name: "Harmonik Klasik (n = 3, m = 5)", values: { "n-slider": 3, "m-slider": 5 } },
      { name: "Pola Bintang Simetri Tinggi (n = 6, m = 8)", values: { "n-slider": 6, "m-slider": 8 } }
    ],
    28: [
      { name: "Foton Anihilasi Positron (511 keV, θ = 90°)", values: { "energy-slider": 511, "angle-slider": 90 } },
      { name: "Hambur Balik Cs-137 (662 keV, θ = 180°)", values: { "energy-slider": 662, "angle-slider": 180 } }
    ],
    30: [
      { name: "Resonansi Rabi Penuh (Δ = 0 MHz)", values: { "rabi-slider": 2.5, "detuning-slider": 0.0 } },
      { name: "Presesi Off-Resonance (Δ = 3.0 MHz)", values: { "rabi-slider": 1.5, "detuning-slider": 3.0 } }
    ],
    31: [
      { name: "Konduktor Logam (Eg = 0.0 eV)", values: { "gap-slider": 0.0, "temp-slider": 300 } },
      { name: "Silikon Kristal (Eg = 1.1 eV, T = 300 K)", values: { "gap-slider": 1.1, "temp-slider": 300 } },
      { name: "Isolator Intan / Kuarsa (Eg = 3.4 eV)", values: { "gap-slider": 3.4, "temp-slider": 300 } }
    ],
    32: [
      { name: "Tendangan Pisang Roberto Carlos (v = 38 m/s, ω = 65)", values: { "speed-slider": 38, "spin-slider": 65, "angle-slider": 14 } },
      { name: "Tendangan Lurus Tanpa Spin (ω = 0)", values: { "speed-slider": 30, "spin-slider": 0, "angle-slider": 20 } }
    ],
    34: [
      { name: "Penggabungan Bintang Neutron GW170817", values: { "mass-slider": 12, "sep-slider": 220 } },
      { name: "Lubang Hitam Biner GW150914 (60 M☉)", values: { "mass-slider": 60, "sep-slider": 350 } }
    ],
    35: [
      { name: "Laser Hijau Nd:YAG (λ = 532 nm)", values: { "lambda-slider": 532, "mirror-slider": 266 } },
      { name: "Laser Merah He-Ne (λ = 632 nm)", values: { "lambda-slider": 632, "mirror-slider": 632 } }
    ],
    37: [
      { name: "Fase Teratur Feromagnetik (T = 2.0 < Tc)", values: { "temp-slider": 2.0, "field-slider": 0.0 } },
      { name: "Titik Kritis Curie (Tc ≈ 4.51)", values: { "temp-slider": 4.5, "field-slider": 0.0 } },
      { name: "Fase Acak Paramagnetik (T = 6.8 > Tc)", values: { "temp-slider": 6.8, "field-slider": 0.0 } }
    ]
  };

  function attachLabAddons() {
    var params = new URLSearchParams(window.location.search);
    var modId = parseInt(params.get("id"), 10) || 1;
    var ctrlPanel = document.querySelector(".control-panel");
    var toolbar = document.querySelector(".f3d-canvas-toolbar");

    if (ctrlPanel && REAL_PRESETS[modId] && !document.getElementById("f3d-preset-box")) {
      var box = document.createElement("div");
      box.id = "f3d-preset-box";
      box.style.cssText = "margin-bottom:14px;padding:10px;background:rgba(0,229,255,0.06);border:1px solid rgba(0,229,255,0.28);border-radius:8px;";
      box.innerHTML =
        '<label style="display:block;font-size:11px;font-weight:700;color:#00e5ff;margin-bottom:5px;letter-spacing:0.5px;">🎯 SKENARIO FISIKA NYATA</label>' +
        '<select id="f3d-preset-select" style="width:100%;padding:6px 8px;border-radius:6px;background:#070c16;color:#fff;border:1px solid #334155;font-size:12px;">' +
          '<option value="">-- Pilih Kasus Eksperimen --</option>' +
          REAL_PRESETS[modId].map(function(p, idx) {
            return '<option value="' + idx + '">' + p.name + '</option>';
          }).join("") +
        '</select>';

      var heading = ctrlPanel.querySelector("h3");
      if (heading && heading.nextSibling) ctrlPanel.insertBefore(box, heading.nextSibling);
      else ctrlPanel.prepend(box);

      document.getElementById("f3d-preset-select").addEventListener("change", function(e) {
        var preset = REAL_PRESETS[modId][parseInt(e.target.value, 10)];
        if (!preset) return;
        Object.keys(preset.values).forEach(function(elId) {
          var inputEl = document.getElementById(elId);
          if (inputEl) {
            inputEl.value = preset.values[elId];
            inputEl.dispatchEvent(new Event("input", { bubbles: true }));
            inputEl.dispatchEvent(new Event("change", { bubbles: true }));
          }
        });
      });
    }

    var supportsRec = typeof MediaRecorder !== "undefined" &&
                      typeof HTMLCanvasElement !== "undefined" &&
                      typeof HTMLCanvasElement.prototype.captureStream === "function";

    if (toolbar && supportsRec && !document.getElementById("f3d-btn-rec-vid")) {
      var btnVid = document.createElement("button");
      btnVid.type = "button";
      btnVid.className = "f3d-tb-btn";
      btnVid.id = "f3d-btn-rec-vid";
      btnVid.textContent = "🎥 Video";
      toolbar.insertBefore(btnVid, toolbar.firstChild);

      var recorder = null;
      var chunks = [];
      btnVid.addEventListener("click", function() {
        var canvas = document.querySelector("#f3d-module-mount canvas");
        if (!canvas) return;
        if (recorder && recorder.state === "recording") {
          recorder.stop();
          return;
        }
        chunks = [];
        var stream = canvas.captureStream(30);
        var mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9") ? "video/webm;codecs=vp9" : "video/webm";
        recorder = new MediaRecorder(stream, { mimeType: mime });
        recorder.ondataavailable = function(ev) { if (ev.data && ev.data.size > 0) chunks.push(ev.data); };
        recorder.onstop = function() {
          var blob = new Blob(chunks, { type: "video/webm" });
          var a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = "simulasi-fisika-modul-" + (modId < 10 ? "0" + modId : modId) + ".webm";
          document.body.appendChild(a); a.click(); document.body.removeChild(a);
          btnVid.textContent = "🎥 Video";
          btnVid.classList.remove("is-active");
        };
        recorder.start();
        btnVid.textContent = "⏹ Stop";
        btnVid.classList.add("is-active");
      });
    }
  }

  function setupLanguageToggle() {
    var actions = document.querySelector(".header-actions");
    if (!actions || document.getElementById("f3d-lang-btn")) return;

    var lang = localStorage.getItem("f3dLang") || "ID";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.id = "f3d-lang-btn";
    btn.className = "header-nav-link";
    btn.style.cssText = "background:rgba(0,229,255,0.08);border:1px solid rgba(0,229,255,0.3);border-radius:6px;cursor:pointer;font-weight:700;";
    btn.textContent = lang === "ID" ? "🌐 EN" : "🌐 ID";
    actions.insertBefore(btn, actions.firstChild);

    function applyLang(targetLang) {
      var dict = targetLang === "EN" ? {
        "Katalog 37 Modul": "37 Modules",
        "Katalog 27 Modul": "37 Modules",
        "Lapor Bug": "Report Bug",
        "BUKA SIMULASI 3D ACAK": "🎲 RANDOM 3D SIMULATION",
        "Lompat acak lintas topik fisika": "Jump randomly across physics topics",
        "Modul Unggulan": "Featured Modules",
        "Kategori Materi": "Categories",
        "Pengembang": "Developer"
      } : {
        "37 Modules": "Katalog 37 Modul",
        "Report Bug": "Lapor Bug",
        "🎲 RANDOM 3D SIMULATION": "🎲 BUKA SIMULASI 3D ACAK",
        "Jump randomly across physics topics": "Lompat acak lintas topik fisika",
        "Featured Modules": "Modul Unggulan",
        "Categories": "Kategori Materi",
        "Developer": "Pengembang"
      };

      document.querySelectorAll("a, button, div, span").forEach(function(el) {
        if (el.children.length === 0) {
          var txt = el.textContent.trim();
          if (dict[txt]) el.textContent = dict[txt];
        }
      });
      btn.textContent = targetLang === "ID" ? "🌐 EN" : "🌐 ID";
    }

    if (lang === "EN") setTimeout(function() { applyLang("EN"); }, 150);

    btn.addEventListener("click", function() {
      lang = lang === "ID" ? "EN" : "ID";
      localStorage.setItem("f3dLang", lang);
      applyLang(lang);
    });
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker.register("./sw.js").catch(function() {});
    });
  }

  document.addEventListener("DOMContentLoaded", function() {
    setupLanguageToggle();
    var mountEl = document.getElementById("f3d-module-mount");
    if (mountEl) {
      var obs = new MutationObserver(function() { attachLabAddons(); });
      obs.observe(mountEl, { childList: true, subtree: true });
      setTimeout(attachLabAddons, 400);
    }
  });
})();
/* === GITHUB LAB UX UPGRADES (addons.js extension) === */
const FuWorkbench = (() => {
  // 1. Deep-Link Parameter Sync (?mod=nama_modul&v0=30&angle=45)
  function initUrlStateSync(containerSelector = '#controls-container') {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const url = new URL(window.location.href);
    const inputs = container.querySelectorAll('input[type="range"], select');

    // Muat parameter dari URL saat modul dibuka
    inputs.forEach((el) => {
      const key = el.id || el.name;
      if (key && url.searchParams.has(key)) {
        el.value = url.searchParams.get(key);
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }

      // Sinkronkan URL + highlight simbol rumus saat slider digeser
      el.addEventListener('input', () => {
        if (key) {
          const nextUrl = new URL(window.location.href);
          nextUrl.searchParams.set(key, el.value);
          window.history.replaceState({}, '', nextUrl.toString());
        }
        highlightFormulaSymbol(el.dataset.symbol || key);
      });
    });
  }

  function copyExperimentUrl(btnEl) {
    navigator.clipboard?.writeText(window.location.href);
    if (btnEl) {
      const prev = btnEl.textContent;
      btnEl.textContent = '✓ Link Eksperimen Disalin';
      setTimeout(() => (btnEl.textContent = prev), 1800);
    }
  }

  // 2. Live Formula Variable Highlight
  let highlightTimer = null;
  function highlightFormulaSymbol(symbol) {
    if (!symbol) return;
    document.querySelectorAll('.fu-formula-math [data-sym]').forEach((el) => {
      el.classList.toggle('is-highlighted', el.dataset.sym === symbol);
    });
    clearTimeout(highlightTimer);
    highlightTimer = setTimeout(() => {
      document.querySelectorAll('.fu-formula-math [data-sym]').forEach((el) => {
        el.classList.remove('is-highlighted');
      });
    }, 1200);
  }

  // 3. A/B Experiment Run Comparison (localStorage per modul)
  function saveRunSnapshot(moduleId, metricsObj) {
    const storageKey = `fu_runs_${moduleId || 'default'}`;
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
    existing.unshift({
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      metrics: metricsObj
    });
    localStorage.setItem(storageKey, JSON.stringify(existing.slice(0, 5))); // Simpan 5 run terakhir
    return existing.slice(0, 5);
  }

  function getRunSnapshots(moduleId) {
    return JSON.parse(localStorage.getItem(`fu_runs_${moduleId || 'default'}`) || '[]');
  }

  // 4. Keyboard Lab Shortcuts (Space: Play/Pause, R: Reset, F: Focus, S: Slow-Mo)
  function initLabShortcuts(handlers = {}) {
    document.addEventListener('keydown', (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.code === 'Space') {
        e.preventDefault();
        handlers.onTogglePlay?.();
      } else if (e.key.toLowerCase() === 'r') {
        handlers.onReset?.();
      } else if (e.key.toLowerCase() === 'f') {
        handlers.onToggleFocus?.();
      } else if (e.key.toLowerCase() === 's') {
        handlers.onToggleSlowMo?.();
      }
    });
  }

  // 5. Command Palette Search (Ctrl+K atau '/') untuk index.html
  function initCommandPalette(modules = []) {
    const backdrop = document.getElementById('fu-cmd-backdrop');
    const input = document.getElementById('fu-cmd-input');
    const list = document.getElementById('fu-cmd-list');
    if (!backdrop || !input || !list) return;

    function render(query = '') {
      const q = query.toLowerCase().trim();
      const hits = modules.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          (m.category && m.category.toLowerCase().includes(q)) ||
          (m.formula && m.formula.toLowerCase().includes(q))
      );

      list.innerHTML = hits.length
        ? hits
            .map(
              (m) => `
            <a class="fu-cmd-item" href="modul.html?mod=${encodeURIComponent(m.id)}">
              <span><strong>${m.title}</strong> <small style="color:#94a3b8;">${m.formula || ''}</small></span>
              <span style="font-size:11px; color:#00f0ff;">${m.category || 'Lab'}</span>
            </a>`
            )
            .join('')
        : `<div style="padding:12px; color:#94a3b8; font-size:13px;">Modul tidak ditemukan.</div>`;
    }

    function open() {
      backdrop.classList.add('is-open');
      input.value = '';
      render('');
      input.focus();
    }

    function close() {
      backdrop.classList.remove('is-open');
    }

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        backdrop.classList.contains('is-open') ? close() : open();
      } else if (e.key === 'Escape') {
        close();
      }
    });

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close();
    });
    input.addEventListener('input', () => render(input.value));

    return { open, close };
  }

  return {
    initUrlStateSync,
    copyExperimentUrl,
    highlightFormulaSymbol,
    saveRunSnapshot,
    getRunSnapshots,
    initLabShortcuts,
    initCommandPalette
  };
})();
