(function() {
  "use strict";

  /* 1. KAMUS TUNGGAL 27 MODUL AKTUAL (GITHUB PAGES EDITION) */
  window.F3D_MODULES = [
    { id: 1,  slug: "mekanika-benda-langit-01", cat: "Astro",     catLabel: "Astro & Medan",      title: "Mekanika Benda Langit (Simulasi Orbit N-Body & Hukum Kepler)", desc: "Dinamika gravitasi N-body, lintasan elips Hukum Kepler, dan kekekalan momentum sudut orbit planet.", url: "modul.html?id=1" },
    { id: 2,  slug: "bragg-peak-02",            cat: "Radiasi",   catLabel: "Radiasi & Medis",    title: "Jejak Peta Panas Deposisi Energi (Bragg Peak)",               desc: "Visualisasi volumetrik kurva Bragg Peak dan distribusi dosis serap berkas ion/proton.", url: "modul.html?id=2" },
    { id: 3,  slug: "gaya-lorentz-03",          cat: "Radiasi",   catLabel: "Radiasi & Nuklir",   title: "Gaya Lorentz & Lintasan Heliks Partikel Bermuatan",            desc: "Trajektori heliks 3D muatan listrik dalam medan magnetik B dan medan listrik E silang beserta radius Larmor.", url: "modul.html?id=3" },
    { id: 4,  slug: "distorsi-ruang-04",        cat: "Astro",     catLabel: "Astro & Medan",      title: "Distorsi Ruang (Dynamic Grid Warping)",                       desc: "Deformasi kisi ruang-waktu 3D akibat distribusi massa dan kelengkungan medan gravitasi.", url: "modul.html?id=4" },
    { id: 5,  slug: "label-hologram-05",        cat: "Komputasi", catLabel: "Komputasi & HUD",    title: "Label Hologram 3D (In-World CSS2D / CSS3D HUD)",              desc: "Antarmuka penanda koordinat telemetri spasial 3D real-time pada objek simulasi.", url: "modul.html?id=5" },
    { id: 6,  slug: "medan-vektor-06",          cat: "Astro",     catLabel: "Medan & Gelombang",  title: "Lautan Medan Vektor (Dynamic Vector Field)",                  desc: "Visualisasi panah fluks gradien, divergensi, dan rotasi medan gaya elektromagnetik 3D.", url: "modul.html?id=6" },
    { id: 7,  slug: "sumur-potensial-07",       cat: "Kuantum",   catLabel: "Kuantum",            title: "Sumur Spasi-Waktu / Potensial Kuantum",                       desc: "Kuantisasi tingkat energi eigen dan profil sumur potensial dalam ruang 3D.", url: "modul.html?id=7" },
    { id: 8,  slug: "kisi-kristal-08",          cat: "Kuantum",   catLabel: "Zat Padat",          title: "Transisi Fase Kisi Kristal (Thermodynamic Lattice)",          desc: "Vibrasi fonon atomik, parameter keteraturan, dan pelelehan kisi kristal akibat suhu.", url: "modul.html?id=8" },
    { id: 9,  slug: "gyroscope-vr-09",          cat: "Komputasi", catLabel: "Sensor & VR",        title: "Interaksi Sensor Gyroscope / VR HP",                          desc: "Kendali orientasi kamera 3D interaktif menggunakan sensor akselerometer & giroskop ponsel.", url: "modul.html?id=9" },
    { id: 10, slug: "plasma-dbd-10",            cat: "Plasma",    catLabel: "Plasma & Fluida",    title: "Peta Topografi Plasma DBD 3D",                                desc: "Profil kerapatan mikro-lucutan Dielectric Barrier Discharge dan distribusi radikal aktif.", url: "modul.html?id=10" },
    { id: 11, slug: "mcnp-phits-11",            cat: "Radiasi",   catLabel: "Radiasi & Nuklir",   title: "Lintasan Transport Partikel MCNP/PHITS (Voxel Phantom)",       desc: "Pelacakan jejak foton, neutron, dan elektron melintasi geometri fantom medis tervokselisasi.", url: "modul.html?id=11" },
    { id: 12, slug: "pinns-loss-12",            cat: "Komputasi", catLabel: "AI & Komputasi",     title: "Physics-Informed Neural Networks (PINNs) Loss Surface",       desc: "Eksplorasi lanskap optimasi residu persamaan diferensial parsial pada jaringan saraf fisika.", url: "modul.html?id=12" },
    { id: 13, slug: "lensa-astro-13",           cat: "Astro",     catLabel: "Astro & Optik",      title: "Interaksi Lensa Astrofotografi 3D (Optik Teleskop)",           desc: "Penelusuran berkas cahaya bintang, aberasi optik, dan titik fokus sistem teleskop reflektor/refraktor.", url: "modul.html?id=13" },
    { id: 14, slug: "bokashi-termal-14",        cat: "Plasma",    catLabel: "Termal & Fluida",    title: "Dinamika Termal Dekomposisi Organik (Bokashi Core)",          desc: "Pemodelan difusi panas eksotermik dan profil gradien suhu fase termofilik komposter.", url: "modul.html?id=14" },
    { id: 15, slug: "rheology-gel-15",          cat: "Plasma",    catLabel: "Termal & Fluida",    title: "Transisi Sol-ke-Gel & Elastisitas Polimer (Rheology 3D)",      desc: "Perubahan viskoelastisitas jaringan ikat silang polimer dan modulus geser terhadap suhu.", url: "modul.html?id=15" },
    { id: 16, slug: "avalanche-pmt-16",         cat: "Radiasi",   catLabel: "Detektor Radiasi",   title: "Avalanche Elektron pada Detektor Radiasi (PMT & NaI(Tl))",      desc: "Sintilasi foton dalam kristal NaI(Tl) dan multiplikasi elektron sekunder pada dinoda PMT.", url: "modul.html?id=16" },
    { id: 17, slug: "dasbor-geospasial-17",     cat: "Komputasi", catLabel: "Geospasial HUD",     title: "Dasbor Hologram Geospasial (Disaster Telemetry)",             desc: "Visualisasi terestrial 3D parameter atmosfer, radiasi, dan telemetri kebencanaan.", url: "modul.html?id=17" },
    { id: 18, slug: "radiasi-cherenkov-18",     cat: "Radiasi",   catLabel: "Nuklir & Reaktor",   title: "Radiasi Cherenkov dalam Teras Reaktor Nuklir",                desc: "Kerucut kejut optik biru partikel beta relativistik dalam air pendingin teras reaktor.", url: "modul.html?id=18" },
    { id: 19, slug: "terowongan-kuantum-19",    cat: "Kuantum",   catLabel: "Kuantum",            title: "Efek Terowongan Kuantum 3D (Quantum Wavepacket)",             desc: "Solver TDSE Persamaan Schrödinger untuk transmisi paket gelombang melintasi penghalang potensial.", url: "modul.html?id=19" },
    { id: 20, slug: "lensa-gravitasi-20",       cat: "Astro",     catLabel: "Astrofisika",        title: "Lensa Gravitasi & Cakram Akresi Lubang Hitam",                desc: "Ray-marching geodesik Schwarzschild, Cincin Einstein, dan efek Doppler beaming relativistik.", url: "modul.html?id=20" },
    { id: 21, slug: "von-karman-21",            cat: "Plasma",    catLabel: "Dinamika Fluida",    title: "Terowongan Angin & Pusaran Von Kármán",                      desc: "Pelepasan pusaran periodik pada aliran fluida melewati silinder, bola, dan airfoil.", url: "modul.html?id=21" },
    { id: 22, slug: "reaktor-tokamak-22",       cat: "Plasma",    catLabel: "Plasma & Fusi",      title: "Reaktor Fusi Tokamak & Kurungan Magnetik",                    desc: "Kurungan magnetik heliks plasma, faktor keamanan q, dan kriteria penyalaan Lawson.", url: "modul.html?id=22" },
    { id: 23, slug: "ct-scan-radon-23",         cat: "Radiasi",   catLabel: "Fisika Medis",       title: "Rekonstruksi CT-Scan Medis & Proyeksi Radon",                 desc: "Atenuasi sinar-X Beer–Lambert, pembentukan sinogram, dan rekonstruksi Filtered Back-Projection.", url: "modul.html?id=23" },
    { id: 24, slug: "atraktor-lorenz-24",       cat: "Komputasi", catLabel: "Chaos & Dinamika",   title: "Atraktor Aneh Lorenz & Efek Kupu-Kupu",                       desc: "Integrasi RK4 dua lintasan konveksi untuk mengamati sensitivitas kondisi awal sistem chaos.", url: "modul.html?id=24" },
    { id: 25, slug: "efek-meissner-25",         cat: "Kuantum",   catLabel: "Zat Padat",          title: "Efek Meissner & Levitasi Superkonduktor",                     desc: "Levitasi magnetik YBCO di bawah suhu kritis 92 K dan penguncian tabung fluks Abrikosov.", url: "modul.html?id=25" },
    { id: 26, slug: "pelat-chladni-26",         cat: "Astro",     catLabel: "Akustik & Gelombang",title: "Resonansi Akustik Pelat Chladni 3D",                          desc: "Migrasi 5.500 butir pasir ke garis simpul gelombang berdiri disertai sintesis Web Audio.", url: "modul.html?id=26" },
    { id: 27, slug: "pandu-gelombang-27",       cat: "Astro",     catLabel: "Elektromagnetika",   title: "Pandu Gelombang Elektromagnetik & Mode Rongga (TE/TM)",       desc: "Propagasi gelombang mikro WR-90, vektor medan E & H, serta batas frekuensi potong.", url: "modul.html?id=27" }
  ];

  /* 2. KAMUS KONFIGURASI TELEMETRI CSV & DEEP-LINK (ID 1 - 27) */
  window.FISIKA3D_CONFIGS = {
    1:  { moduleSlug: "mekanika-benda-langit-01", paramMap: { mass: "mass-slider", vel: "vel-slider", ecc: "ecc-slider" }, csvHeaders: ["Waktu_s", "Jarak_Orbit_AU", "Kecepatan_kms", "Energi_Total", "Periode_Kepler_thn"] },
    2:  { moduleSlug: "bragg-peak-02",            paramMap: { energy: "energy-slider", ion: "ion-select", depth: "depth-slider" }, csvHeaders: ["Waktu_s", "Kedalaman_cm", "Dosis_Relatif_pct", "LET_keV_um", "Posisi_Bragg_cm"] },
    3:  { moduleSlug: "gaya-lorentz-03",          paramMap: { bfield: "bfield-slider", efield: "efield-slider", charge: "charge-select" }, csvHeaders: ["Waktu_s", "Medan_B_T", "Medan_E_Vm", "Radius_Larmor_cm", "Frekuensi_Siklotron_MHz"] },
    4:  { moduleSlug: "distorsi-ruang-04",        paramMap: { mass: "mass-slider", spin: "spin-slider", grid: "grid-slider" }, csvHeaders: ["Waktu_s", "Massa_Relatif", "Potensial_Gravitasi", "Kelengkungan_R", "Deviasi_Grid"] },
    5:  { moduleSlug: "label-hologram-05",        paramMap: { scale: "scale-slider", mode: "mode-select" }, csvHeaders: ["Waktu_s", "Koordinat_X", "Koordinat_Y", "Koordinat_Z", "Jarak_Kamera"] },
    6:  { moduleSlug: "medan-vektor-06",          paramMap: { field: "field-select", amp: "amp-slider", freq: "freq-slider" }, csvHeaders: ["Waktu_s", "Medan_X", "Medan_Y", "Medan_Z", "Magnitudo_Total"] },
    7:  { moduleSlug: "sumur-potensial-07",       paramMap: { n1: "n1-slider", n2: "n2-slider", width: "width-slider" }, csvHeaders: ["Waktu_s", "Tingkat_n1", "Tingkat_n2", "Energi_E1_eV", "Energi_E2_eV", "Ekspektasi_X_nm"] },
    8:  { moduleSlug: "kisi-kristal-08",          paramMap: { temp: "temp-slider", lattice: "lattice-select" }, csvHeaders: ["Waktu_s", "Suhu_K", "Amplitudo_Termal_A", "Parameter_Lindemann", "Fase_Kristal"] },
    9:  { moduleSlug: "gyroscope-vr-09",          paramMap: { sens: "sens-slider", fov: "fov-slider" }, csvHeaders: ["Waktu_s", "Alpha_deg", "Beta_deg", "Gamma_deg", "FOV_deg"] },
    10: { moduleSlug: "plasma-dbd-10",            paramMap: { volt: "volt-slider", freq: "freq-slider", gap: "gap-slider" }, csvHeaders: ["Waktu_s", "Tegangan_kV", "Frekuensi_kHz", "Kerapatan_Elektron", "Fluks_Ozon"] },
    11: { moduleSlug: "mcnp-phits-11",            paramMap: { src: "src-select", nps: "nps-slider", shield: "shield-slider" }, csvHeaders: ["Waktu_s", "Sumber_Radiasi", "Fluks_Primer", "Dosis_Organ_mSv", "Transmisi_Perisai_pct"] },
    12: { moduleSlug: "pinns-loss-12",            paramMap: { lr: "lr-slider", lambda: "lambda-slider" }, csvHeaders: ["Waktu_s", "Epoch", "Loss_Data", "Loss_PDE_Fisika", "Total_Loss"] },
    13: { moduleSlug: "lensa-astro-13",           paramMap: { focal: "focal-slider", aperture: "aperture-slider", wave: "wave-slider" }, csvHeaders: ["Waktu_s", "Panjang_Fokus_mm", "F_Ratio", "Resolusi_Arcsec", "Aberasi_Sferis"] },
    14: { moduleSlug: "bokashi-termal-14",        paramMap: { moisture: "moisture-slider", cn: "cn-slider", ambient: "ambient-slider" }, csvHeaders: ["Waktu_s", "Suhu_Inti_C", "Suhu_Dinding_C", "Laju_Kalor_W", "Fase_Dekomposisi"] },
    15: { moduleSlug: "rheology-gel-15",          paramMap: { temp: "temp-slider", conc: "conc-slider", shear: "shear-slider" }, csvHeaders: ["Waktu_s", "Suhu_C", "Modulus_Simpan_G1_Pa", "Modulus_Rugi_G2_Pa", "Viskositas_Pas"] },
    16: { moduleSlug: "avalanche-pmt-16",         paramMap: { hv: "hv-slider", energy: "energy-slider", stages: "stages-slider" }, csvHeaders: ["Waktu_s", "Tegangan_HV_V", "Energi_Gamma_keV", "Faktor_Gain", "Pulsa_Anoda_mV"] },
    17: { moduleSlug: "dasbor-geospasial-17",     paramMap: { layer: "layer-select", alt: "alt-slider" }, csvHeaders: ["Waktu_s", "Lintang", "Bujur", "Indeks_Anomali", "Intensitas_Sinyal"] },
    18: { moduleSlug: "radiasi-cherenkov-18",     paramMap: { n: "medium-select", beta: "beta-slider", rod: "rod-slider" }, csvHeaders: ["Waktu_s", "Indeks_Bias_n", "Beta_vc", "Sudut_Cherenkov_deg", "Yield_Foton_pct", "Insersi_Batang_pct"] },
    19: { moduleSlug: "terowongan-kuantum-19",    paramMap: { ratio: "ratio-slider", a: "width-slider", k0: "k0-slider" }, csvHeaders: ["Waktu_s", "Rasio_V0_E", "Tebal_nm", "Momentum_k0", "Transmisi_T_pct", "Refleksi_R_pct"] },
    20: { moduleSlug: "lensa-gravitasi-20",       paramMap: { rs: "mass-slider", spin: "spin-slider", disk: "disk-slider" }, csvHeaders: ["Waktu_s", "Radius_Schwarzschild_AU", "Rotasi_c", "Radius_Cakram_Rs", "Radius_Foton_AU", "Radius_ISCO_AU"] },
    21: { moduleSlug: "von-karman-21",            paramMap: { shape: "shape-select", u: "speed-slider", visc: "visc-slider" }, csvHeaders: ["Waktu_s", "Benda_Uji", "Kecepatan_ms", "Viskositas_cm2s", "Bilangan_Reynolds", "Frekuensi_Vortex_Hz", "Strouhal"] },
    22: { moduleSlug: "reaktor-tokamak-22",       paramMap: { bt: "bt-slider", ip: "ip-slider", temp: "temp-slider" }, csvHeaders: ["Waktu_s", "Medan_Toroidal_T", "Arus_Plasma_MA", "Suhu_Juta_K", "Faktor_Keamanan_q", "Produk_Lawson_1e21", "Gain_Fusi_Q"] },
    23: { moduleSlug: "ct-scan-radon-23",         paramMap: { kvp: "kvp-slider", speed: "speed-slider", filter: "filter-select" }, csvHeaders: ["Waktu_s", "Tegangan_kVp", "Rotasi_rots", "Kernel_Filter", "Sudut_Gantry_deg", "Proyeksi_Selesai", "CTDIvol_mGy"] },
    24: { moduleSlug: "atraktor-lorenz-24",       paramMap: { rho: "rho-slider", sigma: "sigma-slider", delta: "delta-slider" }, csvHeaders: ["Waktu_s", "Rayleigh_rho", "Prandtl_sigma", "xA", "yA", "zA", "Jarak_Fase_dR"] },
    25: { moduleSlug: "efek-meissner-25",         paramMap: { mode: "mode-select", temp: "temp-slider", b0: "mag-slider" }, csvHeaders: ["Waktu_s", "Rezim_Superkonduktor", "Suhu_K", "Medan_Rel_T", "Kedalaman_London_nm", "Celah_Levitasi_cm"] },
    26: { moduleSlug: "pelat-chladni-26",         paramMap: { n: "n-slider", m: "m-slider", sym: "sym-select", amp: "amp-slider" }, csvHeaders: ["Waktu_s", "Mode_n", "Mode_m", "Simetri", "Amplitudo_mm", "Frekuensi_Eigen_Hz", "Terkunci_Simpul_pct"] },
    27: { moduleSlug: "pandu-gelombang-27",       paramMap: { mode: "mode-select", freq: "freq-slider", width: "width-slider" }, csvHeaders: ["Waktu_s", "Mode_Rongga", "Frekuensi_GHz", "Lebar_a_mm", "Cutoff_fc_GHz", "Panjang_Gelombang_Pandu_mm", "Kecepatan_Grup_c"] }
  };

  function padNum(n) { return n < 10 ? "0" + n : "" + n; }

  /* 3. LAZY LOADER THREE.JS & HEMAT GPU */
  var MAX_ACTIVE_CONTEXTS = 3;
  var activeRegistry = [];
  var libsPromise = null;
  var isTabVisible = !document.hidden;

  var THREE_SCRIPTS = [
    "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",
    "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js",
    "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/EffectComposer.js",
    "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/RenderPass.js",
    "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/ShaderPass.js",
    "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/shaders/CopyShader.js",
    "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/shaders/LuminosityHighPassShader.js",
    "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/UnrealBloomPass.js"
  ];

  document.addEventListener("visibilitychange", function() { isTabVisible = !document.hidden; });

  function loadSeq(urls) {
    return urls.reduce(function(p, url) {
      return p.then(function() {
        return new Promise(function(res, rej) {
          if (document.querySelector('script[src="' + url + '"]')) { res(); return; }
          var s = document.createElement("script");
          s.src = url; s.async = false; s.onload = res; s.onerror = rej;
          document.head.appendChild(s);
        });
      });
    }, Promise.resolve());
  }

  function ensureThree() {
    if (window.THREE && window.THREE.UnrealBloomPass) return Promise.resolve();
    if (!libsPromise) libsPromise = loadSeq(THREE_SCRIPTS);
    return libsPromise;
  }

  function bootSim(entry) {
    if (entry.booted || entry.booting) return;
    entry.booting = true;
    entry.lastActive = Date.now();

    var booted = activeRegistry.filter(function(x) { return x.booted && x !== entry; });
    if (booted.length >= MAX_ACTIVE_CONTEXTS) {
      booted.sort(function(a, b) { return a.lastActive - b.lastActive; });
      var victim = booted[0];
      if (victim && victim.instance && typeof victim.instance.dispose === "function") {
        victim.instance.dispose();
        victim.booted = false;
        victim.instance = null;
      }
    }

    ensureThree().then(function() {
      entry.container.innerHTML = "";
      entry.instance = entry.initFn(entry.container, function() { return entry.visible && isTabVisible; });
      entry.booted = true;
      entry.booting = false;
    }).catch(function() { entry.booting = false; });
  }

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      var reg = activeRegistry.find(function(x) { return x.container === e.target; });
      if (!reg) return;
      reg.visible = e.isIntersecting;
      if (e.isIntersecting) {
        reg.lastActive = Date.now();
        if (!reg.booted) bootSim(reg);
      }
    });
  }, { rootMargin: "200px 0px", threshold: 0.05 });

  window.Fisika3DLazyEngine = {
    register: function(id, initFn) {
      var el = typeof id === "string" ? document.getElementById(id) : id;
      if (!el) return;
      el.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#080b12;color:#00e5ff;font-family:Orbitron,sans-serif;font-size:12px;">Memuat Kanvas 3D...</div>';
      var entry = { container: el, initFn: initFn, booted: false, booting: false, visible: false, lastActive: 0, instance: null };
      activeRegistry.push(entry);
      obs.observe(el);
    }
  };

  /* 4. TELEMETRI CSV & DEEP-LINK URL */
  window.Fisika3DUtils = {
    createSession: function(cfg) {
      var slug = cfg.moduleSlug || "modul-3d";
      var paramMap = cfg.paramMap || {};
      var headers = cfg.csvHeaders || ["Waktu_s", "Nilai"];
      var interval = cfg.sampleInterval || 0.1;
      var wrapper = cfg.wrapperId ? document.getElementById(cfg.wrapperId) : (cfg.containerEl ? cfg.containerEl.closest(".physics-sim-wrapper") : null);
      var panel = wrapper ? wrapper.querySelector(".control-panel") : null;
      var rows = [], recording = true, lastT = -999, timer = null;

      function buildURL() {
        var u = new URL(window.location.href);
        u.searchParams.set("mod", slug);
        Object.keys(paramMap).forEach(function(k) {
          var el = document.getElementById(paramMap[k]);
          if (el) u.searchParams.set(k, el.value);
        });
        return u.toString();
      }

      Object.keys(paramMap).forEach(function(k) {
        var el = document.getElementById(paramMap[k]);
        if (el) {
          el.addEventListener("input", function() {
            clearTimeout(timer);
            timer = setTimeout(function() { try { window.history.replaceState(null, "", buildURL()); } catch (e) {} }, 200);
          });
        }
      });

      function exportCSV() {
        if (!rows.length) { alert("Belum ada data terekam."); return; }
        var lines = [headers.join(",")].concat(rows.map(function(r) {
          return r.map(function(c) { return typeof c === "number" ? (Number.isInteger(c) ? c : c.toFixed(5)) : '"' + String(c).replace(/"/g, '""') + '"'; }).join(",");
        }));
        var blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8;" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "fisika-" + slug + ".csv";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
      }

      var btnRec = null;
      if (panel && !panel.querySelector(".f3d-utils-bar")) {
        var bar = document.createElement("div");
        bar.className = "f3d-utils-bar";
        bar.style.cssText = "margin-top:14px;padding-top:12px;border-top:1px solid #1e293b;display:flex;flex-direction:column;gap:6px;";
        var btnLink = document.createElement("button");
        btnLink.type = "button";
        btnLink.textContent = "🔗 Salin Link Eksperimen";
        btnLink.style.cssText = "width:100%;padding:7px;background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.4);color:#00e5ff;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;";
        btnLink.onclick = function() {
          if (navigator.clipboard) navigator.clipboard.writeText(buildURL());
          btnLink.textContent = "✅ Link Tersalin";
          setTimeout(function() { btnLink.textContent = "🔗 Salin Link Eksperimen"; }, 2000);
        };

        var row = document.createElement("div");
        row.style.cssText = "display:flex;gap:6px;";
        btnRec = document.createElement("button");
        btnRec.type = "button";
        btnRec.textContent = "⏺ Log: ON (0)";
        btnRec.style.cssText = "flex:1;padding:7px;background:#1e293b;border:1px solid #334155;color:#fff;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;";
        btnRec.onclick = function() {
          recording = !recording;
          btnRec.textContent = (recording ? "⏺ Log: ON (" : "⏸ Pause (") + rows.length + ")";
        };

        var btnCsv = document.createElement("button");
        btnCsv.type = "button";
        btnCsv.textContent = "📥 Unduh CSV";
        btnCsv.style.cssText = "flex:1;padding:7px;background:rgba(16,185,129,0.15);border:1px solid #10b981;color:#10b981;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;";
        btnCsv.onclick = exportCSV;

        row.appendChild(btnRec); row.appendChild(btnCsv);
        bar.appendChild(btnLink); bar.appendChild(row);
        panel.appendChild(bar);
      }

      setTimeout(function() {
        var p = new URLSearchParams(window.location.search);
        if (p.get("mod") && p.get("mod") !== slug) return;
        Object.keys(paramMap).forEach(function(k) {
          if (p.has(k)) {
            var el = document.getElementById(paramMap[k]);
            if (el) { el.value = p.get(k); el.dispatchEvent(new Event("input", { bubbles: true })); }
          }
        });
      }, 40);

      return {
        record: function(t, vals) {
          if (!recording || t - lastT < interval) return;
          lastT = t;
          if (rows.length >= 2000) rows.shift();
          rows.push([t].concat(vals));
          if (btnRec) btnRec.textContent = "⏺ Log: ON (" + rows.length + ")";
        },
        clearData: function() { rows.length = 0; lastT = -999; },
        exportCSV: exportCSV
      };
    }
  };

  /* 5. INISIALISASI UI & LOADER MODUL DINAMIS */
  document.addEventListener("DOMContentLoaded", function() {
    var list = window.F3D_MODULES;
    var params = new URLSearchParams(window.location.search);

    var picker = document.getElementById("theme-color-picker");
    var btnReset = document.getElementById("btn-reset-theme");
    if (picker) {
      var saved = localStorage.getItem("customThemeColor");
      if (saved) picker.value = saved;
      picker.addEventListener("input", function(e) {
        var hex = e.target.value;
        var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
        document.documentElement.style.setProperty("--accent", hex);
        document.documentElement.style.setProperty("--accent-rgb", r + ", " + g + ", " + b);
        localStorage.setItem("customThemeColor", hex);
      });
    }
    if (btnReset) {
      btnReset.addEventListener("click", function() {
        if (picker) picker.value = "#00e5ff";
        document.documentElement.style.setProperty("--accent", "#00e5ff");
        document.documentElement.style.setProperty("--accent-rgb", "0, 229, 255");
        localStorage.removeItem("customThemeColor");
      });
    }

    var notice = document.getElementById("system-announcement");
    var btnCloseNotice = document.getElementById("btn-close-announcement");
    if (notice && localStorage.getItem("fdNoticeDismissed") !== "v23-gh") {
      notice.style.display = "block";
    }
    if (btnCloseNotice) {
      btnCloseNotice.addEventListener("click", function() {
        notice.style.display = "none";
        localStorage.setItem("fdNoticeDismissed", "v23-gh");
      });
    }

    // Render Katalog 27 Modul di index.html
    var gridEl = document.getElementById("f3d-grid");
    var searchEl = document.getElementById("f3d-search");
    var filterBtns = document.querySelectorAll(".filter-pill[data-cat]");
    if (gridEl) {
      var currentCat = params.get("cat") || "ALL";
      filterBtns.forEach(function(b) {
        if (b.getAttribute("data-cat") === currentCat) b.classList.add("is-active");
        else b.classList.remove("is-active");
      });

      function drawCatalog() {
        var q = (searchEl ? searchEl.value : "").toLowerCase().trim();
        var items = list.filter(function(m) {
          var okCat = currentCat === "ALL" || m.cat === currentCat;
          var okQ = !q || m.title.toLowerCase().indexOf(q) !== -1 || m.desc.toLowerCase().indexOf(q) !== -1 || ("#" + m.id).indexOf(q) !== -1;
          return okCat && okQ;
        });
        gridEl.innerHTML = items.map(function(m) {
          return '<a class="module-card" href="' + m.url + '">' +
            '<div>' +
              '<div class="module-card-top"><span class="module-id">#' + padNum(m.id) + '</span><span class="module-tag">' + (m.catLabel || m.cat) + '</span></div>' +
              '<div class="module-card-title">' + m.title + '</div>' +
              '<p class="module-card-desc">' + m.desc + '</p>' +
            '</div>' +
            '<div class="module-card-cta">BUKA SIMULASI &#8594;</div>' +
          '</a>';
        }).join("");
      }
      filterBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
          currentCat = btn.getAttribute("data-cat");
          filterBtns.forEach(function(b) { b.classList.remove("is-active"); });
          btn.classList.add("is-active");
          drawCatalog();
        });
      });
      if (searchEl) searchEl.addEventListener("input", drawCatalog);
      drawCatalog();
    }

    // Sidebar: 5 Modul Unggulan & Tombol Acak
    var featBox = document.getElementById("f3d-featured-container");
    if (featBox) {
      var featIds = [18, 20, 22, 23, 26];
      featBox.innerHTML = featIds.map(function(id) {
        var m = list.find(function(x) { return x.id === id; });
        if (!m) return "";
        return '<a class="featured-item" href="' + m.url + '">' +
          '<span class="featured-num">#' + padNum(m.id) + '</span>' +
          '<div class="featured-meta"><span class="featured-title">' + m.title + '</span><span class="featured-cat">' + (m.catLabel || m.cat) + '</span></div>' +
        '</a>';
      }).join("");
    }

    var btnRand = document.getElementById("f3d-btn-random");
    var randMsg = document.getElementById("f3d-rand-msg");
    if (btnRand) {
      btnRand.addEventListener("click", function() {
        var curId = parseInt(params.get("id"), 10);
        var pool = list.filter(function(m) { return m.id !== curId; });
        var pick = pool[Math.floor(Math.random() * pool.length)];
        if (randMsg) randMsg.textContent = "Membuka #" + padNum(pick.id) + ": " + pick.title + "...";
        setTimeout(function() { window.location.href = pick.url; }, 220);
      });
    }

    // Halaman modul.html: Muat Modul Dinamis dari folder modules/modul-XX.js
    var mountEl = document.getElementById("f3d-module-mount");
    if (mountEl) {
      var reqId = parseInt(params.get("id"), 10);
      var reqSlug = params.get("mod");
      var modObj = list.find(function(m) { return m.id === reqId; }) ||
                   list.find(function(m) { return m.slug === reqSlug; }) ||
                   list[0];

      document.title = "Modul #" + padNum(modObj.id) + ": " + modObj.title + " — Fisika Developer";
      var titleEl = document.getElementById("f3d-mod-title");
      var badgeEl = document.getElementById("f3d-mod-badge");
      if (titleEl) titleEl.textContent = "#" + padNum(modObj.id) + " — " + modObj.title;
      if (badgeEl) badgeEl.textContent = modObj.catLabel || modObj.cat;

      var scriptPath = "modules/modul-" + padNum(modObj.id) + ".js";
      var modScript = document.createElement("script");
      modScript.src = scriptPath;
      modScript.onload = function() {
        if (document.querySelector(".post-body canvas") && !window.Chart) {
          var cs = document.createElement("script");
          cs.src = "https://cdn.jsdelivr.net/npm/chart.js";
          cs.async = true;
          document.head.appendChild(cs);
        }
        if (window.MathJax && window.MathJax.typesetPromise) {
          window.MathJax.typesetPromise([mountEl]).catch(function() {});
        }
      };
      modScript.onerror = function() {
        mountEl.innerHTML =
          '<div style="padding:18px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:10px;">' +
            '<p style="margin:0 0 8px;color:#fbbf24;font-weight:600;">File skrip modul <code>' + scriptPath + '</code> belum diunggah ke repositori.</p>' +
            '<p style="margin:0;font-size:13.5px;color:var(--text-secondary);">Jalankan <code>python convert_modul.py</code> pada folder hasil ekstrak <code>Modul.rar</code> lalu push folder <code>modules/</code> ke GitHub.</p>' +
          '</div>';
      };
      document.body.appendChild(modScript);

      // Navigasi Prev / Katalog 27 Modul / Next
      var navEl = document.getElementById("f3d-post-nav");
      if (navEl) {
        var idx = list.findIndex(function(m) { return m.id === modObj.id; });
        var prev = list[(idx - 1 + list.length) % list.length];
        var next = list[(idx + 1) % list.length];
        navEl.innerHTML =
          '<a class="f3d-nav-card f3d-nav-prev" href="' + prev.url + '">' +
            '<span class="f3d-nav-dir">&#8592; MODUL #' + padNum(prev.id) + '</span>' +
            '<span class="f3d-nav-title">' + prev.title + '</span>' +
            '<span class="f3d-nav-cat">' + (prev.catLabel || prev.cat) + '</span>' +
          '</a>' +
          '<a class="f3d-nav-hub" href="index.html">KATALOG<br/>27 MODUL</a>' +
          '<a class="f3d-nav-card f3d-nav-next" href="' + next.url + '">' +
            '<span class="f3d-nav-dir">MODUL #' + padNum(next.id) + ' &#8594;</span>' +
            '<span class="f3d-nav-title">' + next.title + '</span>' +
            '<span class="f3d-nav-cat">' + (next.catLabel || next.cat) + '</span>' +
          '</a>';
      }
    }
  });
})();
