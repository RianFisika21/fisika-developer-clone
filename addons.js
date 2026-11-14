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

    // Hanya tampilkan tombol Rekam Video jika browser mendukung captureStream & MediaRecorder
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
        "Katalog 27 Modul": "27 Modules",
        "Lapor Bug": "Report Bug",
        "BUKA SIMULASI 3D ACAK": "🎲 RANDOM 3D SIMULATION",
        "Lompat acak lintas topik fisika": "Jump randomly across physics topics",
        "Modul Unggulan": "Featured Modules",
        "Kategori Materi": "Categories",
        "Pengembang": "Developer"
      } : {
        "27 Modules": "Katalog 27 Modul",
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
