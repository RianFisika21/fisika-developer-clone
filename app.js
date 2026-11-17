(function() {
  "use strict";

  /* 0. PATCH GLOBAL WEBGL BUFFER (AGAR SCREENSHOT & LAPORAN PDF SELALU JERNIH) */
  (function() {
    if (typeof HTMLCanvasElement !== "undefined") {
      var origGetContext = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function(type, attrs) {
        if (type === "webgl" || type === "webgl2" || type === "experimental-webgl") {
          attrs = Object.assign({}, attrs || {}, { preserveDrawingBuffer: true });
        }
        return origGetContext.call(this, type, attrs);
      };
    }
  })();

  /* 1. KAMUS TUNGGAL 37 MODUL AKTUAL (GITHUB PAGES EDITION) */
  window.F3D_MODULES = [
    { id: 1,  slug: "mekanika-benda-langit-01", cat: "Astro",     catLabel: "Astro & Medan",       title: "Mekanika Benda Langit (Simulasi Orbit N-Body & Hukum Kepler)", desc: "Dinamika gravitasi N-body, lintasan elips Hukum Kepler, dan kekekalan momentum sudut orbit planet.", url: "modul.html?id=1" },
    { id: 2,  slug: "bragg-peak-02",            cat: "Radiasi",   catLabel: "Radiasi & Medis",     title: "Jejak Peta Panas Deposisi Energi (Bragg Peak)",               desc: "Visualisasi volumetrik kurva Bragg Peak dan distribusi dosis serap berkas ion/proton.", url: "modul.html?id=2" },
    { id: 3,  slug: "gaya-lorentz-03",          cat: "Radiasi",   catLabel: "Radiasi & Nuklir",    title: "Gaya Lorentz & Lintasan Heliks Partikel Bermuatan",            desc: "Trajektori heliks 3D muatan listrik dalam medan magnetik B dan medan listrik E silang beserta radius Larmor.", url: "modul.html?id=3" },
    { id: 4,  slug: "distorsi-ruang-04",        cat: "Astro",     catLabel: "Astro & Medan",       title: "Distorsi Ruang (Dynamic Grid Warping)",                       desc: "Deformasi kisi ruang-waktu 3D akibat distribusi massa dan kelengkungan medan gravitasi.", url: "modul.html?id=4" },
    { id: 5,  slug: "label-hologram-05",        cat: "Komputasi", catLabel: "Komputasi & HUD",     title: "Label Hologram 3D (In-World CSS2D / CSS3D HUD)",              desc: "Antarmuka penanda koordinat telemetri spasial 3D real-time pada objek simulasi.", url: "modul.html?id=5" },
    { id: 6,  slug: "medan-vektor-06",          cat: "Astro",     catLabel: "Medan & Gelombang",   title: "Lautan Medan Vektor (Dynamic Vector Field)",                  desc: "Visualisasi panah fluks gradien, divergensi, dan rotasi medan gaya elektromagnetik 3D.", url: "modul.html?id=6" },
    { id: 7,  slug: "sumur-potensial-07",       cat: "Kuantum",   catLabel: "Kuantum",             title: "Sumur Spasi-Waktu / Potensial Kuantum",                       desc: "Kuantisasi tingkat energi eigen dan profil sumur potensial dalam ruang 3D.", url: "modul.html?id=7" },
    { id: 8,  slug: "kisi-kristal-08",          cat: "Kuantum",   catLabel: "Zat Padat",           title: "Transisi Fase Kisi Kristal (Thermodynamic Lattice)",          desc: "Vibrasi fonon atomik, parameter keteraturan, dan pelelehan kisi kristal akibat suhu.", url: "modul.html?id=8" },
    { id: 9,  slug: "gyroscope-vr-09",          cat: "Komputasi", catLabel: "Sensor & VR",         title: "Interaksi Sensor Gyroscope / VR HP",                          desc: "Kendali orientasi kamera 3D interaktif menggunakan sensor akselerometer & giroskop ponsel.", url: "modul.html?id=9" },
    { id: 10, slug: "plasma-dbd-10",            cat: "Plasma",    catLabel: "Plasma & Fluida",     title: "Peta Topografi Plasma DBD 3D",                                desc: "Profil kerapatan mikro-lucutan Dielectric Barrier Discharge dan distribusi radikal aktif.", url: "modul.html?id=10" },
    { id: 11, slug: "mcnp-phits-11",            cat: "Radiasi",   catLabel: "Radiasi & Nuklir",    title: "Lintasan Transport Partikel MCNP/PHITS (Voxel Phantom)",       desc: "Pelacakan jejak foton, neutron, dan elektron melintasi geometri fantom medis tervokselisasi.", url: "modul.html?id=11" },
    { id: 12, slug: "pinns-loss-12",            cat: "Komputasi", catLabel: "AI & Komputasi",      title: "Physics-Informed Neural Networks (PINNs) Loss Surface",       desc: "Eksplorasi lanskap optimasi residu persamaan diferensial parsial pada jaringan saraf fisika.", url: "modul.html?id=12" },
    { id: 13, slug: "lensa-astro-13",           cat: "Astro",     catLabel: "Astro & Optik",       title: "Interaksi Lensa Astrofotografi 3D (Optik Teleskop)",           desc: "Penelusuran berkas cahaya bintang, aberasi optik, dan titik fokus sistem teleskop reflektor/refraktor.", url: "modul.html?id=13" },
    { id: 14, slug: "bokashi-termal-14",        cat: "Plasma",    catLabel: "Termal & Fluida",     title: "Dinamika Termal Dekomposisi Organik (Bokashi Core)",          desc: "Pemodelan difusi panas eksotermik dan profil gradien suhu fase termofilik komposter.", url: "modul.html?id=14" },
    { id: 15, slug: "rheology-gel-15",          cat: "Plasma",    catLabel: "Termal & Fluida",     title: "Transisi Sol-ke-Gel & Elastisitas Polimer (Rheology 3D)",      desc: "Perubahan viskoelastisitas jaringan ikat silang polimer dan modulus geser terhadap suhu.", url: "modul.html?id=15" },
    { id: 16, slug: "avalanche-pmt-16",         cat: "Radiasi",   catLabel: "Detektor Radiasi",    title: "Avalanche Elektron pada Detektor Radiasi (PMT & NaI(Tl))",      desc: "Sintilasi foton dalam kristal NaI(Tl) dan multiplikasi elektron sekunder pada dinoda PMT.", url: "modul.html?id=16" },
    { id: 17, slug: "dasbor-geospasial-17",     cat: "Komputasi", catLabel: "Geospasial HUD",      title: "Dasbor Hologram Geospasial (Disaster Telemetry)",             desc: "Visualisasi terestrial 3D parameter atmosfer, radiasi, dan telemetri kebencanaan.", url: "modul.html?id=17" },
    { id: 18, slug: "radiasi-cherenkov-18",     cat: "Radiasi",   catLabel: "Nuklir & Reaktor",    title: "Radiasi Cherenkov dalam Teras Reaktor Nuklir",                desc: "Kerucut kejut optik biru partikel beta relativistik dalam air pendingin teras reaktor.", url: "modul.html?id=18" },
    { id: 19, slug: "terowongan-kuantum-19",    cat: "Kuantum",   catLabel: "Kuantum",             title: "Efek Terowongan Kuantum 3D (Quantum Wavepacket)",             desc: "Solver TDSE Persamaan Schrödinger untuk transmisi paket gelombang melintasi penghalang potensial.", url: "modul.html?id=19" },
    { id: 20, slug: "lensa-gravitasi-20",       cat: "Astro",     catLabel: "Astrofisika",         title: "Lensa Gravitasi & Cakram Akresi Lubang Hitam",                desc: "Ray-marching geodesik Schwarzschild, Cincin Einstein, dan efek Doppler beaming relativistik.", url: "modul.html?id=20" },
    { id: 21, slug: "von-karman-21",            cat: "Plasma",    catLabel: "Dinamika Fluida",     title: "Terowongan Angin & Pusaran Von Kármán",                      desc: "Pelepasan pusaran periodik pada aliran fluida melewati silinder, bola, dan airfoil.", url: "modul.html?id=21" },
    { id: 22, slug: "reaktor-tokamak-22",       cat: "Plasma",    catLabel: "Plasma & Fusi",       title: "Reaktor Fusi Tokamak & Kurungan Magnetik",                    desc: "Kurungan magnetik heliks plasma, faktor keamanan q, dan kriteria penyalaan Lawson.", url: "modul.html?id=22" },
    { id: 23, slug: "ct-scan-radon-23",         cat: "Radiasi",   catLabel: "Fisika Medis",        title: "Rekonstruksi CT-Scan Medis & Proyeksi Radon",                 desc: "Atenuasi sinar-X Beer–Lambert, pembentukan sinogram, dan rekonstruksi Filtered Back-Projection.", url: "modul.html?id=23" },
    { id: 24, slug: "atraktor-lorenz-24",       cat: "Komputasi", catLabel: "Chaos & Dinamika",    title: "Atraktor Aneh Lorenz & Efek Kupu-Kupu",                       desc: "Integrasi RK4 dua lintasan konveksi untuk mengamati sensitivitas kondisi awal sistem chaos.", url: "modul.html?id=24" },
    { id: 25, slug: "efek-meissner-25",         cat: "Kuantum",   catLabel: "Zat Padat",           title: "Efek Meissner & Levitasi Superkonduktor",                     desc: "Levitasi magnetik YBCO di bawah suhu kritis 92 K dan penguncian tabung fluks Abrikosov.", url: "modul.html?id=25" },
    { id: 26, slug: "pelat-chladni-26",         cat: "Astro",     catLabel: "Akustik & Gelombang", title: "Resonansi Akustik Pelat Chladni 3D",                          desc: "Migrasi 5.500 butir pasir ke garis simpul gelombang berdiri disertai sintesis Web Audio.", url: "modul.html?id=26" },
    { id: 27, slug: "pandu-gelombang-27",       cat: "Astro",     catLabel: "Elektromagnetika",    title: "Pandu Gelombang Elektromagnetik & Mode Rongga (TE/TM)",       desc: "Propagasi gelombang mikro WR-90, vektor medan E & H, serta batas frekuensi potong.", url: "modul.html?id=27" },
    { id: 28, slug: "hamburan-compton-28",      cat: "Radiasi",   catLabel: "Radiasi & Nuklir",    title: "Hamburan Compton 3D & Kinematika Foton–Elektron",             desc: "Pergeseran panjang gelombang foton gamma, sudut pental elektron, dan lobus polar Klein–Nishina.", url: "modul.html?id=28" },
    { id: 29, slug: "peluruhan-radioaktif-29",  cat: "Radiasi",   catLabel: "Fisika Nuklir",       title: "Rantai Peluruhan Radioaktif 3D & Hukum Bateman",              desc: "Transmutasi stokastik kisi inti atom A → B → C (stabil) dan dinamika kesetimbangan radioaktif.", url: "modul.html?id=29" },
    { id: 30, slug: "resonansi-bloch-30",       cat: "Kuantum",   catLabel: "Komputasi Kuantum",   title: "Bola Bloch 3D & Presesi Larmor Qubit (Osilasi Rabi)",          desc: "Evolusi vektor keadaan superposisi qubit pada permukaan Bola Bloch di bawah detuning medan.", url: "modul.html?id=30" },
    { id: 31, slug: "struktur-pita-31",         cat: "Kuantum",   catLabel: "Zat Padat",           title: "Struktur Pita Energi Kristal 3D & Dispersi Tight-Binding",    desc: "Permukaan energi pita konduksi dan pita valensi dalam zona Brillouin serta eksitasi pembawa termal.", url: "modul.html?id=31" },
    { id: 32, slug: "efek-magnus-32",           cat: "Plasma",    catLabel: "Dinamika Fluida",     title: "Aerodinamika Efek Magnus & Lintasan Bola Berputar 3D",        desc: "Pembelokan lintasan proyektil berputar akibat gaya angkat Magnus dan hambatan udara kuadratik.", url: "modul.html?id=32" },
    { id: 33, slug: "konveksi-rayleigh-33",     cat: "Plasma",    catLabel: "Termal & Fluida",     title: "Sel Konveksi Rayleigh–Bénard 3D & Plume Termal",              desc: "Instabilitas termal fluida di atas bilangan Rayleigh kritis Ra > 1708 dan pembentukan sel gulungan konveksi.", url: "modul.html?id=33" },
    { id: 34, slug: "gelombang-gravitasi-34",   cat: "Astro",     catLabel: "Astrofisika",         title: "Gelombang Gravitasi Biner & Regangan Ruang-Waktu (h₊)",       desc: "Radiasi kuadrupol riak ruang-waktu dari sistem bintang kompak biner yang mengorbit.", url: "modul.html?id=34" },
    { id: 35, slug: "interferometer-michelson-35", cat: "Astro",  catLabel: "Optik & Gelombang",   title: "Interferometer Michelson 3D & Frinji Interferensi Laser",     desc: "Meja optik 3D beam-splitter dan pergeseran cincin frinji interferensi akibat mikrometer cermin.", url: "modul.html?id=35" },
    { id: 36, slug: "pendulum-ganda-36",        cat: "Komputasi", catLabel: "Chaos & Dinamika",    title: "Pendulum Ganda 3D (Double Pendulum) & Lintasan Chaos",        desc: "Integrasi persamaan gerak Lagrangian terkopel non-linear dengan jejak lintasan deterministik kacau.", url: "modul.html?id=36" },
    { id: 37, slug: "metropolis-ising-37",      cat: "Komputasi", catLabel: "Fisika Statistik",    title: "Model Ising Feromagnetik 3D & Transisi Fase Curie",           desc: "Simulasi Monte Carlo Metropolis kisi spin dipol 3D melintasi suhu kritis Curie Tc ≈ 4.51.", url: "modul.html?id=37" }
  ];

  /* 2. KAMUS KONFIGURASI TELEMETRI CSV & DEEP-LINK (ID 1 - 37) */
  window.FISIKA3D_CONFIGS = {
    1:  { moduleSlug: "mekanika-benda-langit-01", paramMap: { mass: "mass-slider", radius: "radius-slider", vel: "vel-slider", ecc: "ecc-slider" }, csvHeaders: ["Waktu_s", "Massa_M", "Radius_Gm", "Kecepatan_kms", "Periode_Hari"] },
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
    27: { moduleSlug: "pandu-gelombang-27",       paramMap: { mode: "mode-select", freq: "freq-slider", width: "width-slider" }, csvHeaders: ["Waktu_s", "Mode_Rongga", "Frekuensi_GHz", "Lebar_a_mm", "Cutoff_fc_GHz", "Panjang_Gelombang_Pandu_mm", "Kecepatan_Grup_c"] },
    28: { moduleSlug: "hamburan-compton-28",      paramMap: { energy: "energy-slider", angle: "angle-slider" }, csvHeaders: ["Waktu_s", "E0_keV", "Sudut_deg", "E_Terhambur_keV", "Ke_Elektron_keV", "Delta_Lambda_pm"] },
    29: { moduleSlug: "peluruhan-radioaktif-29",  paramMap: { t1: "t1-slider", t2: "t2-slider" }, csvHeaders: ["Waktu_s", "T1_s", "T2_s", "Populasi_NA_pct", "Populasi_NB_pct", "Aktivitas_Bq"] },
    30: { moduleSlug: "resonansi-bloch-30",       paramMap: { rabi: "rabi-slider", detuning: "detuning-slider" }, csvHeaders: ["Waktu_s", "Rabi_MHz", "Detuning_MHz", "Prob_Eksitasi_pct", "Omega_Eff_MHz", "Fase_rad"] },
    31: { moduleSlug: "struktur-pita-31",         paramMap: { gap: "gap-slider", temp: "temp-slider", hop: "hopping-slider" }, csvHeaders: ["Waktu_s", "Gap_eV", "Suhu_K", "Hopping_eV", "Material", "Pembawa_Relatif"] },
    32: { moduleSlug: "efek-magnus-32",           paramMap: { speed: "speed-slider", spin: "spin-slider", angle: "angle-slider" }, csvHeaders: ["Waktu_s", "Kecepatan_ms", "Spin_rads", "Elevasi_deg", "Defleksi_m", "Jangkauan_m"] },
    33: { moduleSlug: "konveksi-rayleigh-33",     paramMap: { dt: "dt-slider", visc: "visc-slider" }, csvHeaders: ["Waktu_s", "DeltaT_K", "Viskositas_mm2s", "Bilangan_Rayleigh", "Bilangan_Nusselt", "Rezim"] },
    34: { moduleSlug: "gelombang-gravitasi-34",   paramMap: { mass: "mass-slider", sep: "sep-slider" }, csvHeaders: ["Waktu_s", "Massa_Msun", "Separasi_km", "Frekuensi_GW_Hz", "Regangan_h"] },
    35: { moduleSlug: "interferometer-michelson-35", paramMap: { lam: "lambda-slider", dd: "mirror-slider" }, csvHeaders: ["Waktu_s", "Lambda_nm", "Pergeseran_nm", "Orde_Frinji", "Intensitas_pct"] },
    36: { moduleSlug: "pendulum-ganda-36",        paramMap: { a1: "angle1-slider", m2: "m2-slider" }, csvHeaders: ["Waktu_s", "Sudut1_deg", "Massa2_kg", "Omega2_rads", "Energi_Total_J"] },
    37: { moduleSlug: "metropolis-ising-37",      paramMap: { temp: "temp-slider", field: "field-slider" }, csvHeaders: ["Waktu_s", "Suhu_T", "Medan_h", "Magnetisasi_M", "Fase_Magnetik"] }
  };

  /* 2B. KAMUS AKADEMIK & LKM (PERSAMAAN LATEX + PROSEDUR UNTUK 37 MODUL) */
  window.F3D_ACADEMIC = {
    1:  { eq: "$$v = \\sqrt{\\frac{GM}{r}}, \\qquad T = 2\\pi\\sqrt{\\frac{r^3}{GM}}$$", note: "Kecepatan orbit sirkular berbanding terbalik dengan akar radius orbit, sementara kuadrat periode revolusi sebanding dengan pangkat tiga jarak rata-rata (Hukum III Kepler)." },
    2:  { eq: "$$-\\frac{dE}{dx} \\propto \\frac{z^2}{v^2} \\left[\\ln\\left(\\frac{2m_e v^2}{I}\\right) - \\beta^2\\right]$$", note: "Persamaan Bethe–Bloch menunjukkan bahwa laju kehilangan energi partikel bermuatan melonjak tajam tepat sebelum berhenti (puncak Bragg), menjadi dasar terapi proton presisi tinggi." },
    3:  { eq: "$$\\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B}), \\qquad r_L = \\frac{mv_\\perp}{|q|B}, \\qquad \\omega_c = \\frac{|q|B}{m}$$", note: "Komponen kecepatan tegak lurus medan magnet menghasilkan gerak melingkar berjari-jari Larmor, sementara komponen sejajar medan menghasilkan lintasan heliks." },
    4:  { eq: "$$ds^2 = -\\left(1-\\frac{2GM}{rc^2}\\right)c^2dt^2 + \\left(1-\\frac{2GM}{rc^2}\\right)^{-1}dr^2 + r^2 d\\Omega^2$$", note: "Metrik Schwarzschild menggambarkan bagaimana konsentrasi massa melengkungkan geometri ruang-waktu di sekitarnya." },
    5:  { eq: "$$\\vec{p}_{\\text{layar}} = \\mathbf{P}_{\\text{proj}} \\cdot \\mathbf{V}_{\\text{kamera}} \\cdot \\mathbf{M}_{\\text{model}} \\cdot \\vec{p}_{\\text{3D}}$$", note: "Proyeksi koordinat homogen memetakan titik ruang 3D ke bidang layar 2D untuk penandaan telemetri spasial real-time." },
    6:  { eq: "$$\\nabla \\cdot \\vec{F} = \\frac{\\partial F_x}{\\partial x} + \\frac{\\partial F_y}{\\partial y} + \\frac{\\partial F_z}{\\partial z}, \\qquad \\nabla \\times \\vec{F} = \\text{rot}\\,\\vec{F}$$", note: "Divergensi mengukur kerapatan sumber/lubang fluks medan, sedangkan curl mengukur kecenderungan rotasi lokal medan vektor." },
    7:  { eq: "$$E_n = \\frac{n^2 \\pi^2 \\hbar^2}{2mL^2}, \\qquad \\psi_n(x) = \\sqrt{\\frac{2}{L}}\\sin\\left(\\frac{n\\pi x}{L}\\right)$$", note: "Syarat batas fungsi gelombang pada dinding potensial tak-hingga menghasilkan tingkat energi diskrit terkuantisasi." },
    8:  { eq: "$$\\delta_L = \\frac{\\sqrt{\\langle u^2 \\rangle}}{a} \\gtrsim 0.10$$", note: "Kriteria pelelehan Lindemann menyatakan kisi kristal kehilangan keteraturan jarak jauhnya ketika simpangan getaran termal atom melampaui ~10% jarak antaratom." },
    9:  { eq: "$$\\mathbf{R}(\\alpha, \\beta, \\gamma) = \\mathbf{R}_z(\\alpha)\\mathbf{R}_x(\\beta)\\mathbf{R}_y(\\gamma)$$", note: "Transformasi sudut Euler orientasi giroskop memetakan rotasi fisik perangkat ke matriks rotasi kamera 3D." },
    10: { eq: "$$\\vec{J}(t) = \\varepsilon_0 \\frac{\\partial \\vec{E}}{\\partial t} + n_e e \\mu_e \\vec{E}$$", note: "Penghalang dielektrik membatasi arus konduksi sehingga terbentuk mikro-lucutan filamen berenergi tinggi tanpa busur panas." },
    11: { eq: "$$I(x) = I_0 e^{-\\mu x}, \\qquad D = \\frac{d\\bar{\\varepsilon}}{dm}$$", note: "Simulasi Monte Carlo melacak interaksi fotolistrik, hamburan Compton, dan produksi pasangan pada fantom tervokselisasi untuk menghitung dosis serap organ." },
    12: { eq: "$$\\mathcal{L}_{\\text{total}}(\\theta) = \\mathcal{L}_{\\text{data}}(\\theta) + \\lambda\\,\\mathcal{L}_{\\text{PDE}}(\\theta)$$", note: "PINNs menyematkan residu persamaan diferensial fisika langsung ke dalam fungsi kerugian jaringan saraf." },
    13: { eq: "$$\\frac{1}{f} = \\frac{1}{s_o} + \\frac{1}{s_i}, \\qquad \\theta_{\\text{Rayleigh}} = 1.22\\frac{\\lambda}{D}$$", note: "Batas difraksi teleskop ditentukan oleh panjang gelombang cahaya dan diameter bukaan objektif." },
    14: { eq: "$$\\rho c_p \\frac{\\partial T}{\\partial t} = \\nabla \\cdot (k \\nabla T) + \\dot{q}_{\\text{mikroba}}$$", note: "Persamaan difusi panas dengan suku sumber eksotermik memodelkan kenaikan suhu inti komposter selama fase termofilik." },
    15: { eq: "$$G^*(\\omega) = G'(\\omega) + iG''(\\omega), \\qquad \\tan\\delta = \\frac{G''}{G'}$$", note: "Titik gel tercapai saat modulus simpan elastis $G'$ melampaui modulus rugi viskos $G''$." },
    16: { eq: "$$G = \\delta^N, \\qquad Q_{\\text{anoda}} = N_{\\gamma} \\cdot Y_{\\text{sint}} \\cdot \\eta_{\\text{QE}} \\cdot G \\cdot e$$", note: "Setiap tingkat dinoda pada tabung pengganda foton (PMT) melipatgandakan elektron sekunder secara eksponensial." },
    17: { eq: "$$\\vec{r}(\\phi, \\lambda, h) = \\big((N+h)\\cos\\phi\\cos\\lambda,\\; (N+h)\\cos\\phi\\sin\\lambda,\\; (N(1-e^2)+h)\\sin\\phi\\big)$$", note: "Konversi koordinat geodetik WGS-84 memetakan lintang, bujur, dan ketinggian ke koordinat Kartesius 3D." },
    18: { eq: "$$\\cos\\theta_C = \\frac{1}{n\\beta}, \\qquad \\beta = \\frac{v}{c} > \\frac{1}{n}$$", note: "Radiasi Cherenkov dipancarkan membentuk kerucut cahaya biru ketika partikel bermuatan bergerak lebih cepat daripada kecepatan fase cahaya dalam medium air pendingin reaktor." },
    19: { eq: "$$i\\hbar\\frac{\\partial\\Psi}{\\partial t} = -\\frac{\\hbar^2}{2m}\\nabla^2\\Psi + V(\\vec{r})\\Psi, \\qquad T \\approx \\exp\\left(-2a\\sqrt{\\frac{2m(V_0-E)}{\\hbar^2}}\\right)$$", note: "Paket gelombang kuantum memiliki probabilitas tak-nol menembus penghalang potensial meskipun energi kinetiknya lebih kecil dari tinggi penghalang." },
    20: { eq: "$$R_s = \\frac{2GM}{c^2}, \\qquad r_{\\text{foton}} = \\frac{3}{2}R_s, \\qquad r_{\\text{ISCO}} = 3R_s$$", note: "Pembelokan geodesik cahaya di sekitar lubang hitam membentuk cincin foton dan bayangan cakrawala peristiwa." },
    21: { eq: "$$\\text{Re} = \\frac{u L}{\\nu}, \\qquad \\text{St} = \\frac{f L}{u} \\approx 0.20$$", note: "Pada bilangan Reynolds menengah, lapisan batas terlepas secara bergantian membentuk deretan pusaran Von Kármán yang periodik." },
    22: { eq: "$$q(r) = \\frac{r B_t}{R_0 B_p}, \\qquad n T \\tau_E \\ge 3 \\times 10^{21}\\;\\text{keV}\\cdot\\text{s}\\cdot\\text{m}^{-3}$$", note: "Stabilitas plasma tokamak menuntut faktor keamanan $q > 2$ di tepi plasma dan terpenuhinya kriteria penyalaan Lawson." },
    23: { eq: "$$p(s,\\theta) = \\ln\\left(\\frac{I_0}{I}\\right) = \\int_{L(s,\\theta)} \\mu(x,y)\\,dl$$", note: "Transformasi Radon mengintegrasikan koefisien atenuasi sinar-X sepanjang berkas proyeksi untuk membentuk sinogram." },
    24: { eq: "$$\\frac{dx}{dt}=\\sigma(y-x), \\quad \\frac{dy}{dt}=x(\\rho-z)-y, \\quad \\frac{dz}{dt}=xy-\\beta z$$", note: "Perbedaan kondisi awal sekecil apa pun berkembang secara eksponensial menjadi lintasan yang sama sekali berbeda dalam ruang fase." },
    25: { eq: "$$\\lambda_L(T) = \\frac{\\lambda_0}{\\sqrt{1-(T/T_c)^4}}, \\qquad \\vec{B}(x) = \\vec{B}_0 e^{-x/\\lambda_L}$$", note: "Di bawah suhu kritis $T_c$, superkonduktor menolak fluks magnetik internal hingga kedalaman penetrasi London $\\lambda_L$." },
    26: { eq: "$$\\cos\\left(\\frac{n\\pi x}{L}\\right)\\cos\\left(\\frac{m\\pi y}{L}\\right) \\pm \\cos\\left(\\frac{m\\pi x}{L}\\right)\\cos\\left(\\frac{n\\pi y}{L}\\right) = 0$$", note: "Butiran pasir bermigrasi menjauhi perut getaran dan terkumpul tepat di garis simpul gelombang berdiri dengan amplitudo nol." },
    27: { eq: "$$f_{c,mn} = \\frac{c}{2}\\sqrt{\\left(\\frac{m}{a}\\right)^2 + \\left(\\frac{n}{b}\\right)^2}, \\qquad \\lambda_g = \\frac{\\lambda_0}{\\sqrt{1-(f_c/f)^2}}$$", note: "Gelombang elektromagnetik hanya dapat merambat di dalam pandu gelombang jika frekuensi kerjanya melampaui frekuensi potong $f_c$." },
    28: { eq: "$$\\Delta\\lambda = \\lambda' - \\lambda = \\frac{h}{m_e c}(1 - \\cos\\theta), \\qquad E' = \\frac{E_0}{1 + \\frac{E_0}{m_e c^2}(1 - \\cos\\theta)}$$", note: "Hamburan elastis foton gamma oleh elektron bebas membuktikan sifat partikel cahaya yang membawa momentum $p = h/\\lambda$." },
    29: { eq: "$$N_B(t) = N_0 \\frac{\\lambda_1}{\\lambda_2 - \\lambda_1}\\left(e^{-\\lambda_1 t} - e^{-\\lambda_2 t}\\right), \\qquad \\lambda = \\frac{\\ln 2}{T_{1/2}}$$", note: "Persamaan Bateman menggambarkan pertumbuhan dan peluruhan nuklida anak dalam rantai peluruhan berantai hingga mencapai isotop stabil." },
    30: { eq: "$$|\\psi\\rangle = \\cos\\frac{\\theta}{2}|0\\rangle + e^{i\\phi}\\sin\\frac{\\theta}{2}|1\\rangle, \\qquad P(|1\\rangle) = \\frac{\\Omega_0^2}{\\Omega_0^2 + \\Delta^2}\\sin^2\\left(\\frac{\\Omega_R t}{2}\\right)$$", note: "Vektor keadaan qubit berpresesi pada permukaan Bola Bloch dengan frekuensi Rabi efektif $\\Omega_R = \\sqrt{\\Omega_0^2 + \\Delta^2}$." },
    31: { eq: "$$E(k_x, k_y) = E_0 \\pm \\left[\\frac{E_g}{2} + 2t(2 - \\cos k_x a - \\cos k_y a)\\right]$$", note: "Lebar celah pita $E_g$ menentukan apakah suatu kristal bersifat konduktor, semikonduktor, atau isolator dielektrik." },
    32: { eq: "$$\\vec{F}_M = S(\\vec{\\omega} \\times \\vec{v}), \\qquad \\vec{F}_D = -\\frac{1}{2}\\rho C_D A |\\vec{v}|\\vec{v}$$", note: "Perbedaan tekanan fluida akibat rotasi bola menghasilkan gaya angkat Magnus yang membelokkan lintasan bola secara lateral." },
    33: { eq: "$$\\text{Ra} = \\frac{g\\beta\\Delta T H^3}{\\nu\\alpha} > 1708, \\qquad \\text{Nu} \\approx 1 + 1.44\\left(1 - \\frac{\\text{Ra}_c}{\\text{Ra}}\\right)$$", note: "Ketika gradien suhu melampaui ambang kritis Rayleigh, gaya apung mengalahkan viskositas dan membentuk sel gulungan konveksi." },
    34: { eq: "$$f_{\\text{GW}} = 2 f_{\\text{orb}} = \\frac{1}{\\pi}\\sqrt{\\frac{GM}{a^3}}, \\qquad h \\propto \\frac{G^2 M_1 M_2}{c^4 a D}$$", note: "Dua benda masif yang saling mengorbit memancarkan gelombang gravitasi kuadrupol pada frekuensi dua kali lipat frekuensi orbitnya." },
    35: { eq: "$$\\Delta = 2\\Delta d = m\\lambda, \\qquad I = I_0 \\cos^2\\left(\\frac{2\\pi\\Delta d}{\\lambda}\\right)$$", note: "Pergeseran cermin sejauh setengah panjang gelombang menggeser satu frinji terang-gelap penuh pada pola interferensi." },
    36: { eq: "$$\\mathcal{L} = \\frac{1}{2}(m_1+m_2)L_1^2\\dot{\\theta}_1^2 + \\frac{1}{2}m_2 L_2^2\\dot{\\theta}_2^2 + m_2 L_1 L_2\\dot{\\theta}_1\\dot{\\theta}_2\\cos(\\theta_1-\\theta_2) - V$$", note: "Pendulum ganda merupakan sistem mekanika deterministik non-linear yang menunjukkan sensitivitas ekstrem terhadap kondisi awal." },
    37: { eq: "$$\\mathcal{H} = -J\\sum_{\\langle i,j\\rangle} s_i s_j - h\\sum_i s_i, \\qquad P_{\\text{acc}} = \\min\\left(1, e^{-\\Delta E / k_B T}\\right)$$", note: "Pada kisi kubik 3D, magnetisasi spontan menghilang melalui transisi fase orde dua di sekitar suhu kritis Curie $T_c \\approx 4.51\\,J/k_B$." }
  };

  function padNum(n) { return n < 10 ? "0" + n : "" + n; }

  /* 3. INJEKSI CSS GLOBAL & RESPONSIF ANDROID/PC */
  function injectEnhancementStyles() {
    if (document.getElementById("f3d-upgrade-styles")) return;
    var css = [
      "html, body { max-width: 100%; overflow-x: hidden; box-sizing: border-box; }",
      "*, *::before, *::after { box-sizing: inherit; }",
      ".f3d-canvas-toolbar { display:flex; flex-wrap:wrap; align-items:center; gap:6px; margin-bottom:10px; padding:8px 10px; background:rgba(8,13,24,0.9); border:1px solid rgba(0,229,255,0.22); border-radius:8px; }",
      ".f3d-tb-btn { background:rgba(15,23,42,0.9); border:1px solid rgba(0,229,255,0.32); color:#e2e8f0; padding:6px 10px; border-radius:6px; font-size:11.5px; font-weight:600; cursor:pointer; transition:all .15s ease; display:inline-flex; align-items:center; justify-content:center; gap:5px; white-space:nowrap; }",
      ".f3d-tb-btn:hover { background:rgba(0,229,255,0.2); border-color:#00e5ff; color:#fff; }",
      ".f3d-tb-btn.is-active { background:#00e5ff; color:#05070a; border-color:#00e5ff; }",
      "body.f3d-class-mode .post-article-card { max-width:100% !important; }",
      "body.f3d-class-mode .sidebar-column { display:none !important; }",
      "body.f3d-class-mode .page-shell { grid-template-columns:1fr !important; }",
      "body.f3d-class-mode [id^='hud-'] { font-size:22px !important; }",
      "body.f3d-class-mode .control-panel label, body.f3d-class-mode .value-display { font-size:15px !important; }",
      "body.f3d-embed-mode .site-header, body.f3d-embed-mode .sidebar-column, body.f3d-embed-mode .site-footer, body.f3d-embed-mode #f3d-post-nav, body.f3d-embed-mode .module-breadcrumb { display:none !important; }",
      "body.f3d-embed-mode .page-shell { padding:8px !important; max-width:100% !important; display:block !important; }",
      "body.f3d-embed-mode .post-article-card { margin:0 !important; border-radius:10px !important; }",
      ".f3d-lkm-box { margin-top:20px; background:rgba(10,16,28,0.85); border:1px solid rgba(0,229,255,0.22); border-radius:12px; overflow:hidden; }",
      ".f3d-lkm-tabs { display:flex; flex-wrap:wrap; background:rgba(5,9,18,0.9); border-bottom:1px solid rgba(0,229,255,0.18); }",
      ".f3d-lkm-tab { flex:1; min-width:120px; padding:10px 12px; background:transparent; border:none; color:#94a3b8; font-size:12px; font-weight:700; cursor:pointer; border-bottom:2px solid transparent; transition:all .15s; }",
      ".f3d-lkm-tab.is-active { color:#00e5ff; border-bottom-color:#00e5ff; background:rgba(0,229,255,0.07); }",
      ".f3d-lkm-pane { display:none; padding:16px; color:#cbd5e1; font-size:13.5px; line-height:1.65; }",
      ".f3d-lkm-pane.is-active { display:block; }",
      ".f3d-eq-card { background:#060a12; border:1px solid rgba(0,229,255,0.25); border-radius:8px; padding:12px; margin:10px 0 14px; text-align:center; overflow-x:auto; color:#fff; }",
      ".f3d-chart-box { margin-top:16px; background:#070c16; border:1px solid rgba(0,229,255,0.2); border-radius:10px; padding:12px; }",
      ".f3d-bookmark-btn { position:absolute; top:10px; right:10px; background:rgba(15,23,42,0.85); border:1px solid rgba(148,163,184,0.3); color:#94a3b8; width:28px; height:28px; border-radius:6px; cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center; z-index:4; }",
      ".f3d-bookmark-btn.is-saved { color:#fbbf24; border-color:#fbbf24; background:rgba(251,191,36,0.12); }",
      ".f3d-modal-backdrop { position:fixed; inset:0; background:rgba(2,6,14,0.82); backdrop-filter:blur(5px); z-index:9999; display:none; align-items:center; justify-content:center; padding:16px; }",
      ".f3d-modal-backdrop.is-open { display:flex; }",
      ".f3d-modal-card { background:#0b1220; border:1px solid rgba(0,229,255,0.35); border-radius:14px; max-width:540px; width:100%; padding:20px; color:#e2e8f0; box-shadow:0 20px 50px rgba(0,0,0,0.75); }",
      "@media (max-width: 820px) {",
      "  .site-header { height:auto !important; position:relative !important; }",
      "  .header-inner { flex-direction:column !important; align-items:flex-start !important; gap:10px !important; padding:10px 12px !important; height:auto !important; }",
      "  .brand-group { width:100% !important; display:flex !important; align-items:center !important; gap:10px !important; }",
      "  .brand-logo { width:34px !important; height:34px !important; font-size:14px !important; flex-shrink:0 !important; }",
      "  .brand-title { font-size:15px !important; line-height:1.2 !important; margin:0 !important; }",
      "  .brand-sub { font-size:10.5px !important; display:block !important; line-height:1.3 !important; }",
      "  .header-actions { width:100% !important; display:flex !important; flex-wrap:wrap !important; align-items:center !important; justify-content:flex-start !important; gap:6px !important; }",
      "  .header-actions .header-nav-link, .header-actions .accent-pill, #f3d-lang-btn { font-size:11px !important; padding:4px 8px !important; margin:0 !important; height:auto !important; white-space:nowrap !important; }",
      "  .page-shell { display:flex !important; flex-direction:column !important; padding:10px !important; gap:14px !important; width:100% !important; }",
      "  .main-column, .sidebar-column, .post-article-card { width:100% !important; max-width:100% !important; min-width:0 !important; padding:12px !important; }",
      "  .post-title { font-size:17px !important; line-height:1.35 !important; }",
      "  .physics-sim-wrapper { display:flex !important; flex-direction:column !important; gap:12px !important; width:100% !important; }",
      "  .control-panel, .visualization-panel { width:100% !important; max-width:100% !important; min-width:0 !important; }",
      "  [id^='canvas-3d'] { height:330px !important; width:100% !important; }",
      "  .f3d-canvas-toolbar { padding:6px !important; gap:5px !important; }",
      "  .f3d-canvas-toolbar .f3d-tb-btn { flex:1 1 calc(33.33% - 6px); font-size:10.5px !important; padding:6px 6px !important; }",
      "}"
    ].join("\n");
    var style = document.createElement("style");
    style.id = "f3d-upgrade-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* 4. LAZY LOADER THREE.JS & HEMAT GPU */
  var MAX_ACTIVE_CONTEXTS = 3;
  var activeRegistry = [];
  var libsPromise = null;
  var isTabVisible = !document.hidden;

  var EXTRA_SCRIPTS = [
    "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/EffectComposer.js",
    "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/RenderPass.js",
    "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/ShaderPass.js",
    "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/shaders/CopyShader.js",
    "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/shaders/LuminosityHighPassShader.js",
    "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/UnrealBloomPass.js"
  ];

  document.addEventListener("visibilitychange", function() { isTabVisible = !document.hidden; });

  function loadSeqSafe(urls) {
    return urls.reduce(function(p, url) {
      return p.then(function() {
        return new Promise(function(res) {
          if (document.querySelector('script[src="' + url + '"]')) { res(); return; }
          var s = document.createElement("script");
          s.src = url; s.async = false;
          s.onload = res;
          s.onerror = res;
          document.head.appendChild(s);
        });
      });
    }, Promise.resolve());
  }

  function ensureThree() {
    if (window.THREE && window.THREE.UnrealBloomPass) return Promise.resolve();
    if (!libsPromise) {
      var core = [];
      if (!window.THREE) core.push("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js");
      if (!window.THREE || !window.THREE.OrbitControls) core.push("https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js");
      libsPromise = loadSeqSafe(core.concat(EXTRA_SCRIPTS));
    }
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

  /* 5. TELEMETRI CSV & DEEP-LINK URL */
  window.Fisika3DUtils = {
    createSession: function(cfg) {
      var slug = cfg.moduleSlug || "modul-3d";
      var paramMap = cfg.paramMap || {};
      var headers = cfg.csvHeaders || ["Waktu_s", "Nilai"];
      var interval = cfg.sampleInterval || 0.25;
      var wrapper = cfg.wrapperId ? document.getElementById(cfg.wrapperId) : (cfg.containerEl ? cfg.containerEl.closest(".physics-sim-wrapper") : document.querySelector(".physics-sim-wrapper"));
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
        if (!rows.length) { alert("Belum ada data terekam. Geser slider atau jalankan simulasi beberapa detik."); return; }
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
          btnLink.textContent = "✅ Link Eksperimen Tersalin";
          setTimeout(function() { btnLink.textContent = "🔗 Salin Link Eksperimen"; }, 2000);
        };

        var btnEmbed = document.createElement("button");
        btnEmbed.type = "button";
        btnEmbed.textContent = "🧩 Salin Kode Embed Blog";
        btnEmbed.style.cssText = "width:100%;padding:7px;background:rgba(168,85,247,0.12);border:1px solid rgba(168,85,247,0.45);color:#d8b4fe;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;";
        btnEmbed.onclick = function() {
          var embedUrl = new URL(buildURL());
          embedUrl.searchParams.set("embed", "1");
          var code = '<iframe src="' + embedUrl.toString() + '" width="100%" height="580" style="border:1px solid #1e293b;border-radius:12px;" loading="lazy" allowfullscreen></iframe>';
          if (navigator.clipboard) navigator.clipboard.writeText(code);
          btnEmbed.textContent = "✅ Kode Iframe Tersalin";
          setTimeout(function() { btnEmbed.textContent = "🧩 Salin Kode Embed Blog"; }, 2200);
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
        bar.appendChild(btnLink); bar.appendChild(btnEmbed); bar.appendChild(row);
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
      }, 60);

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

  /* 6. UNIVERSAL AUTO-ENHANCER */
  function enhanceLoadedModule(modObj, mountEl) {
    var wrapper = mountEl.querySelector(".physics-sim-wrapper");
    var visPanel = mountEl.querySelector(".visualization-panel") || wrapper;
    var ctrlPanel = mountEl.querySelector(".control-panel");
    var cfg = window.FISIKA3D_CONFIGS[modObj.id] || { moduleSlug: modObj.slug, paramMap: {}, csvHeaders: ["Waktu_s", "Nilai"] };
    var acad = window.F3D_ACADEMIC[modObj.id] || { eq: "$$\\mathcal{H}\\psi = E\\psi$$", note: "Eksplorasi variasi parameter pada panel kontrol untuk mengamati respon fisis sistem secara real-time." };

    var session = null;
    if (ctrlPanel && !ctrlPanel.querySelector(".f3d-utils-bar")) {
      session = window.Fisika3DUtils.createSession({
        moduleSlug: cfg.moduleSlug,
        paramMap: cfg.paramMap,
        csvHeaders: cfg.csvHeaders,
        wrapperId: wrapper ? wrapper.id : null,
        containerEl: visPanel
      });
    }

    function readLiveSnapshot() {
      var paramsData = [];
      if (ctrlPanel) {
        ctrlPanel.querySelectorAll("input[type='range'], select").forEach(function(el) {
          if (el.id === "f3d-preset-select") return;
          var lblEl = el.closest(".input-group") ? el.closest(".input-group").querySelector("label") : null;
          var labelName = lblEl ? lblEl.childNodes[0].textContent.trim() : (el.id || "Parameter");
          var valText = el.tagName === "SELECT" ? (el.options[el.selectedIndex] ? el.options[el.selectedIndex].text : el.value) : el.value;
          paramsData.push({ id: el.id, label: labelName, value: valText, num: parseFloat(el.value) });
        });
      }
      var hudData = [];
      mountEl.querySelectorAll("[id^='hud-'], .hud-value").forEach(function(el) {
        var num = parseFloat(el.textContent.replace(/[^0-9.\-eE+]/g, ""));
        hudData.push({ id: el.id || "HUD", text: el.textContent.trim(), num: isNaN(num) ? null : num });
      });
      return { params: paramsData, huds: hudData };
    }

    function captureCanvasPNG() {
      var canvas = mountEl.querySelector("canvas");
      if (!canvas) { alert("Kanvas 3D belum siap."); return null; }
      try { return canvas.toDataURL("image/png"); } catch (e) { return null; }
    }

    function generateLabReportPDF() {
      var snap = readLiveSnapshot();
      var imgData = captureCanvasPNG();
      var studentName = prompt("Masukkan Nama Praktikan / Peneliti (opsional):", "Mahasiswa Fisika") || "Praktikan";
      var win = window.open("", "_blank");
      if (!win) { alert("Izinkan pop-up browser untuk membuat Laporan Praktikum PDF."); return; }

      var rowsHtml = snap.params.map(function(p) {
        return "<tr><td style='padding:6px 10px;border:1px solid #cbd5e1;'>" + p.label + "</td><td style='padding:6px 10px;border:1px solid #cbd5e1;font-weight:bold;'>" + p.value + "</td></tr>";
      }).join("");
      var hudHtml = snap.huds.map(function(h) {
        return "<tr><td style='padding:6px 10px;border:1px solid #cbd5e1;'>" + h.id.replace("hud-", "").toUpperCase() + "</td><td style='padding:6px 10px;border:1px solid #cbd5e1;font-weight:bold;color:#0284c7;'>" + h.text + "</td></tr>";
      }).join("");

      win.document.write(
        "<!DOCTYPE html><html><head><title>Laporan Praktikum - " + modObj.title + "</title>" +
        "<style>body{font-family:Arial,sans-serif;color:#0f172a;padding:28px;max-width:820px;margin:auto;} h1{font-size:20px;margin-bottom:4px;} .meta{color:#475569;font-size:13px;margin-bottom:18px;border-bottom:2px solid #0f172a;padding-bottom:10px;} img{width:100%;max-height:380px;object-fit:contain;background:#05070a;border-radius:8px;margin:12px 0;} table{width:100%;border-collapse:collapse;margin-top:8px;font-size:13px;} th{background:#f1f5f9;text-align:left;padding:7px 10px;border:1px solid #cbd5e1;} @media print{.no-print{display:none;}}</style></head><body>" +
        "<div class='no-print' style='margin-bottom:14px;padding:10px;background:#e0f2fe;border-radius:6px;font-size:13px;'>Klik tombol ini untuk menyimpan sebagai PDF: <button onclick='window.print()' style='padding:6px 12px;font-weight:bold;cursor:pointer;'>🖨️ Simpan / Cetak PDF</button></div>" +
        "<h1>LAPORAN EKSPERIMEN FISIKA KOMPUTASI 3D</h1>" +
        "<div class='meta'><strong>Modul #" + padNum(modObj.id) + ":</strong> " + modObj.title + "<br/><strong>Praktikan:</strong> " + studentName + " &bull; <strong>Waktu:</strong> " + new Date().toLocaleString("id-ID") + "<br/><strong>Tautan Eksperimen:</strong> " + window.location.href + "</div>" +
        "<h3>1. Visualisasi Keadaan Sistem 3D</h3>" +
        (imgData ? "<img src='" + imgData + "' alt='Snapshot 3D'/>" : "<p><em>(Snapshot kanvas tidak tersedia)</em></p>") +
        "<h3>2. Parameter Input Kontrol</h3><table><tr><th>Parameter</th><th>Nilai</th></tr>" + (rowsHtml || "<tr><td colspan='2'>Default</td></tr>") + "</table>" +
        "<h3>3. Pembacaan Telemetri & Hasil Ukur</h3><table><tr><th>Besaran Terukur</th><th>Hasil Simulasi</th></tr>" + (hudHtml || "<tr><td colspan='2'>Lihat visualisasi</td></tr>") + "</table>" +
        "<h3>4. Ringkasan Konsep Fisis</h3><p style='font-size:13.5px;line-height:1.6;'>" + acad.note + "</p>" +
        "</body></html>"
      );
      win.document.close();
    }

    if (!mountEl.querySelector(".f3d-canvas-toolbar")) {
      var tb = document.createElement("div");
      tb.className = "f3d-canvas-toolbar";
      tb.innerHTML =
        '<button type="button" class="f3d-tb-btn" id="f3d-btn-shot" title="Simpan Gambar PNG (Pintasan: P)">📸 PNG</button>' +
        '<button type="button" class="f3d-tb-btn" id="f3d-btn-class" title="Perbesar Tampilan Ruang Kelas (Pintasan: L)">🎓 Mode Kelas</button>' +
        '<button type="button" class="f3d-tb-btn" id="f3d-btn-fs" title="Layar Penuh Simulasi (Pintasan: F)">🖥️ Fullscreen</button>' +
        '<button type="button" class="f3d-tb-btn" id="f3d-btn-pdf" title="Buat Laporan Praktikum PDF">📄 Laporan PDF</button>';

      if (wrapper && wrapper.parentNode) wrapper.parentNode.insertBefore(tb, wrapper);
      else mountEl.prepend(tb);

      document.getElementById("f3d-btn-shot").onclick = function() {
        var url = captureCanvasPNG();
        if (!url) return;
        var a = document.createElement("a");
        a.href = url;
        a.download = "fisika-3d-modul-" + padNum(modObj.id) + ".png";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
      };

      var btnClass = document.getElementById("f3d-btn-class");
      btnClass.onclick = function() {
        document.body.classList.toggle("f3d-class-mode");
        btnClass.classList.toggle("is-active");
        window.dispatchEvent(new Event("resize"));
      };

      document.getElementById("f3d-btn-fs").onclick = function() {
        var target = wrapper || visPanel || mountEl;
        if (!document.fullscreenElement) {
          if (target.requestFullscreen) target.requestFullscreen();
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
        }
      };

      document.getElementById("f3d-btn-pdf").onclick = generateLabReportPDF;
    }

    if (!mountEl.querySelector(".f3d-chart-box")) {
      var chartBox = document.createElement("div");
      chartBox.className = "f3d-chart-box";
      chartBox.innerHTML =
        '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:4px;margin-bottom:8px;">' +
          '<span style="font-family:Orbitron,sans-serif;font-size:11px;color:#00e5ff;letter-spacing:0.6px;">📈 MONITOR TELEMETRI REAL-TIME</span>' +
          '<span id="f3d-live-readout" style="font-size:11px;color:#94a3b8;">Merekam parameter & HUD...</span>' +
        '</div>' +
        '<div style="height:160px;position:relative;"><canvas id="f3d-telemetry-chart"></canvas></div>';
      mountEl.appendChild(chartBox);

      var liveChart = null;
      var t0 = performance.now();
      var chartCanvas = document.getElementById("f3d-telemetry-chart");
      if (window.Chart && chartCanvas) {
        liveChart = new window.Chart(chartCanvas.getContext("2d"), {
          type: "line",
          data: {
            labels: [],
            datasets: [
              { label: "Besaran Utama (HUD 1)", data: [], borderColor: "#00e5ff", backgroundColor: "rgba(0,229,255,0.12)", borderWidth: 2, tension: 0.25, pointRadius: 0 },
              { label: "Parameter Kontrol 1", data: [], borderColor: "#f43f5e", backgroundColor: "rgba(244,63,94,0.1)", borderWidth: 1.5, borderDash: [4, 3], tension: 0.25, pointRadius: 0 }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: { legend: { labels: { color: "#cbd5e1", font: { size: 11 } } } },
            scales: {
              x: { ticks: { color: "#64748b", maxTicksLimit: 8 }, grid: { color: "rgba(148,163,184,0.08)" } },
              y: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(148,163,184,0.12)" } }
            }
          }
        });
      }

      var pollTimer = setInterval(function() {
        if (!document.body.contains(chartBox)) { clearInterval(pollTimer); return; }
        var elapsed = (performance.now() - t0) / 1000;
        var snap = readLiveSnapshot();
        var primaryHud = snap.huds.find(function(h) { return h.num !== null; });
        var primaryParam = snap.params.find(function(p) { return !isNaN(p.num); });

        if (session) {
          var rowVals = snap.params.map(function(p) { return isNaN(p.num) ? p.value : p.num; })
            .concat(snap.huds.map(function(h) { return h.num !== null ? h.num : h.text; }));
          if (rowVals.length) session.record(elapsed, rowVals);
        }

        var readout = document.getElementById("f3d-live-readout");
        if (readout && primaryHud) {
          readout.textContent = primaryHud.id.replace("hud-", "").toUpperCase() + ": " + primaryHud.text;
        }

        if (liveChart && (primaryHud || primaryParam)) {
          liveChart.data.labels.push(elapsed.toFixed(1) + "s");
          liveChart.data.datasets[0].data.push(primaryHud ? primaryHud.num : null);
          liveChart.data.datasets[1].data.push(primaryParam ? primaryParam.num : null);
          if (primaryHud) liveChart.data.datasets[0].label = primaryHud.id.replace("hud-", "").toUpperCase();
          if (primaryParam) liveChart.data.datasets[1].label = primaryParam.label;
          if (liveChart.data.labels.length > 60) {
            liveChart.data.labels.shift();
            liveChart.data.datasets[0].data.shift();
            liveChart.data.datasets[1].data.shift();
          }
          liveChart.update("none");
        }
      }, 500);
    }

    if (!mountEl.querySelector(".f3d-lkm-box")) {
      var snapInit = readLiveSnapshot();
      var sliderNames = snapInit.params.map(function(p) { return "<strong>" + p.label + "</strong>"; }).join(", ") || "parameter simulasi";
      var lkmBox = document.createElement("div");
      lkmBox.className = "f3d-lkm-box";
      lkmBox.innerHTML =
        '<div class="f3d-lkm-tabs">' +
          '<button type="button" class="f3d-lkm-tab is-active" data-pane="teori">📘 Dasar Teori</button>' +
          '<button type="button" class="f3d-lkm-tab" data-pane="prosedur">🧪 Prosedur</button>' +
          '<button type="button" class="f3d-lkm-tab" data-pane="latihan">🧮 Cek Galat</button>' +
        '</div>' +
        '<div class="f3d-lkm-pane is-active" data-pane="teori">' +
          '<p style="margin-top:0;"><strong>Formulasi Matematis Utama:</strong></p>' +
          '<div class="f3d-eq-card">' + acad.eq + '</div>' +
          '<p style="margin-bottom:0;">' + acad.note + '</p>' +
        '</div>' +
        '<div class="f3d-lkm-pane" data-pane="prosedur">' +
          '<ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:8px;">' +
            '<li>Amati keadaan awal objek 3D pada kanvas. Gunakan <em>drag</em> sentuh/mouse untuk memutar sudut pandang dan cubit/<em>scroll</em> untuk memperbesar detail.</li>' +
            '<li>Variasikan nilai ' + sliderNames + ' secara bertahap dan catat respon besaran pada HUD serta grafik telemetri di atas.</li>' +
            '<li>Klik <strong>Unduh CSV</strong> pada panel kontrol untuk mengekspor deret data numerik, atau klik <strong>Laporan PDF</strong> untuk dokumentasi praktikum.</li>' +
          '</ol>' +
        '</div>' +
        '<div class="f3d-lkm-pane" data-pane="latihan">' +
          '<p style="margin-top:0;">Hitung secara analitik nilai besaran utama pada HUD menggunakan persamaan di tab <em>Dasar Teori</em>, lalu masukkan hasilnya untuk memeriksa galat relatif terhadap simulasi:</p>' +
          '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">' +
            '<input type="number" step="any" id="f3d-calc-guess" placeholder="Masukkan hasil hitungan Anda..." style="flex:1;min-width:160px;padding:8px 12px;border-radius:6px;border:1px solid #334155;background:#060a12;color:#fff;"/>' +
            '<button type="button" id="f3d-calc-check" style="padding:8px 14px;border-radius:6px;border:1px solid #00e5ff;background:rgba(0,229,255,0.15);color:#00e5ff;font-weight:700;cursor:pointer;">Periksa Galat (%)</button>' +
          '</div>' +
          '<div id="f3d-calc-result" style="margin-top:10px;font-size:13px;"></div>' +
        '</div>';
      mountEl.appendChild(lkmBox);

      lkmBox.querySelectorAll(".f3d-lkm-tab").forEach(function(btn) {
        btn.addEventListener("click", function() {
          var target = btn.getAttribute("data-pane");
          lkmBox.querySelectorAll(".f3d-lkm-tab").forEach(function(b) { b.classList.remove("is-active"); });
          lkmBox.querySelectorAll(".f3d-lkm-pane").forEach(function(p) {
            p.classList.toggle("is-active", p.getAttribute("data-pane") === target);
          });
          btn.classList.add("is-active");
        });
      });

      document.getElementById("f3d-calc-check").onclick = function() {
        var guess = parseFloat(document.getElementById("f3d-calc-guess").value);
        var resEl = document.getElementById("f3d-calc-result");
        if (isNaN(guess)) { resEl.innerHTML = '<span style="color:#fbbf24;">Masukkan angka perhitungan terlebih dahulu.</span>'; return; }
        var snap = readLiveSnapshot();
        var ref = snap.huds.find(function(h) { return h.num !== null && h.num !== 0; }) || snap.huds.find(function(h) { return h.num !== null; });
        if (!ref) { resEl.innerHTML = '<span style="color:#94a3b8;">Modul ini tidak memiliki angka referensi HUD tunggal.</span>'; return; }
        var err = ref.num !== 0 ? Math.abs((guess - ref.num) / ref.num) * 100 : Math.abs(guess - ref.num);
        var color = err <= 2 ? "#10b981" : (err <= 10 ? "#fbbf24" : "#f87171");
        var status = err <= 2 ? "Sangat Akurat!" : (err <= 10 ? "Mendekati (periksa pembulatan konstanta)." : "Masih terpaut jauh, periksa satuan & pangkat.");
        resEl.innerHTML = '<span style="color:' + color + ';font-weight:700;">Nilai Simulasi (' + ref.text + ') &bull; Galat Relatif: ' + err.toFixed(2) + '% — ' + status + '</span>';
      };
    }

    setTimeout(function() { window.dispatchEvent(new Event("resize")); }, 150);
    setTimeout(function() { window.dispatchEvent(new Event("resize")); }, 600);
  }

  /* 7. MODAL JASA SIMULASI KUSTOM & AUTO-CONTEXT LAPOR BUG */
  function setupPortfolioAndBugReport(activeMod) {
    if (!document.getElementById("f3d-hire-modal")) {
      var modal = document.createElement("div");
      modal.className = "f3d-modal-backdrop";
      modal.id = "f3d-hire-modal";
      modal.innerHTML =
        '<div class="f3d-modal-card">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">' +
            '<span style="font-family:Orbitron,sans-serif;font-size:14px;color:#00e5ff;">💼 LAYANAN SIMULASI FISIKA KUSTOM</span>' +
            '<button type="button" id="f3d-close-hire" style="background:none;border:none;color:#94a3b8;font-size:20px;cursor:pointer;">&times;</button>' +
          '</div>' +
          '<p style="font-size:13.5px;color:#cbd5e1;line-height:1.6;margin-top:0;">Pengembangan modul simulasi interaktif 3D berbasis WebGL / Three.js &amp; pemodelan komputasi (Fisika Radiasi, Medis, Plasma, Fluida, Kuantum, dan Media Pembelajaran Kampus/Sekolah).</p>' +
          '<ul style="font-size:13px;color:#94a3b8;padding-left:18px;line-height:1.7;">' +
            '<li><strong>Paket Modul Ajar Interaktif:</strong> Simulasi 3D + Slider + Grafik Real-Time + LKM MathJax (3–5 hari kerja).</li>' +
            '<li><strong>Paket Riset &amp; Visualisasi Data:</strong> Pemodelan numerik ODE/PDE, ekspor CSV, dan rendering 3D terkalibrasi.</li>' +
            '<li><strong>Integrasi Portal / Blog:</strong> Siap disematkan ke Blogger, WordPress, Moodle, atau GitHub Pages.</li>' +
          '</ul>' +
          '<div style="display:flex;gap:8px;margin-top:16px;">' +
            '<a href="mailto:ian479872@gmail.com?subject=Konsultasi%20Pembuatan%20Simulasi%203D" style="flex:1;text-align:center;padding:9px;background:#00e5ff;color:#05070a;font-weight:700;border-radius:7px;text-decoration:none;font-size:13px;">✉️ Kirim Brief via Email</a>' +
            '<button type="button" id="f3d-close-hire-2" style="padding:9px 14px;background:#1e293b;border:1px solid #334155;color:#fff;border-radius:7px;cursor:pointer;font-size:13px;">Tutup</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(modal);

      document.getElementById("f3d-close-hire").onclick = function() { modal.classList.remove("is-open"); };
      document.getElementById("f3d-close-hire-2").onclick = function() { modal.classList.remove("is-open"); };
      modal.addEventListener("click", function(e) { if (e.target === modal) modal.classList.remove("is-open"); });
    }

    document.querySelectorAll(".btn-hire-mini").forEach(function(btn) {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        document.getElementById("f3d-hire-modal").classList.add("is-open");
      });
    });

    document.querySelectorAll('a[href*="BUG%20REPORT"]').forEach(function(link) {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        var modInfo = activeMod ? ("#" + padNum(activeMod.id) + " - " + activeMod.title) : "Halaman Katalog";
        var sliders = [];
        document.querySelectorAll(".control-panel input[type='range'], .control-panel select").forEach(function(el) {
          sliders.push((el.id || "param") + "=" + el.value);
        });
        var body = [
          "Halo Pengembang Fisika Developer,",
          "",
          "Saya menemukan kendala pada simulasi berikut:",
          "- Modul: " + modInfo,
          "- URL: " + window.location.href,
          "- Parameter Aktif: " + (sliders.join(", ") || "-"),
          "- Resolusi Layar: " + window.innerWidth + "x" + window.innerHeight,
          "",
          "Deskripsi Kendala:",
          "[Tulis detail kendala di sini]"
        ].join("\n");
        window.location.href = "mailto:ian479872@gmail.com?subject=" + encodeURIComponent("[BUG REPORT] " + modInfo) + "&body=" + encodeURIComponent(body);
      });
    });
  }

  /* 8. INISIALISASI UI, KATALOG BOOKMARK & LOADER MODUL DINAMIS */
  document.addEventListener("DOMContentLoaded", function() {
    injectEnhancementStyles();
    var list = window.F3D_MODULES;
    var params = new URLSearchParams(window.location.search);

    if (params.get("embed") === "1") {
      document.body.classList.add("f3d-embed-mode");
    }

    // Perbarui label jumlah modul statis 27 -> 37 di halaman jika masih tertulis 27
    document.querySelectorAll("a, span, div, h1, h2, p").forEach(function(el) {
      if (el.children.length === 0 && el.textContent.indexOf("37 Modul") !== -1) {
        el.textContent = el.textContent.replace(/27 Modul/g, "37 Modul");
      }
    });

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
    if (notice && localStorage.getItem("fdNoticeDismissed") !== "v37-gh") {
      notice.style.display = "block";
    }
    if (btnCloseNotice) {
      btnCloseNotice.addEventListener("click", function() {
        notice.style.display = "none";
        localStorage.setItem("fdNoticeDismissed", "v37-gh");
      });
    }

    var gridEl = document.getElementById("f3d-grid");
    var searchEl = document.getElementById("f3d-search");
    var filterBtns = document.querySelectorAll(".filter-pill[data-cat]");
    if (gridEl) {
      var MAX_DEFAULT_MODULES = 9;
      var bookmarks = [];
      try { bookmarks = JSON.parse(localStorage.getItem("f3dBookmarks") || "[]"); } catch (e) {}

      var pillWrap = filterBtns.length ? filterBtns[0].parentElement : null;
      if (pillWrap && !pillWrap.querySelector('[data-cat="SAVED"]')) {
        var savedPill = document.createElement("button");
        savedPill.type = "button";
        savedPill.className = "filter-pill";
        savedPill.setAttribute("data-cat", "SAVED");
        savedPill.textContent = "⭐ Tersimpan";
        pillWrap.appendChild(savedPill);
        filterBtns = document.querySelectorAll(".filter-pill[data-cat]");
      }

      var currentCat = params.get("cat") || "ALL";
      filterBtns.forEach(function(b) {
        if (b.getAttribute("data-cat") === currentCat) b.classList.add("is-active");
        else b.classList.remove("is-active");
      });

      var hintEl = document.getElementById("f3d-grid-hint");
      if (!hintEl) {
        hintEl = document.createElement("div");
        hintEl.id = "f3d-grid-hint";
        hintEl.style.cssText = "margin-top:16px;padding:12px 14px;background:var(--bg-elevated);border:1px dashed var(--border-subtle);border-radius:8px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;font-size:12.5px;color:var(--text-secondary);";
        gridEl.parentNode.insertBefore(hintEl, gridEl.nextSibling);
      }

      function drawCatalog() {
        var q = (searchEl ? searchEl.value : "").toLowerCase().trim();
        var isDefaultView = (currentCat === "ALL" && !q);

        var matched = list.filter(function(m) {
          var okCat = currentCat === "ALL" || (currentCat === "SAVED" ? bookmarks.indexOf(m.id) !== -1 : m.cat === currentCat);
          var okQ = !q ||
            m.title.toLowerCase().indexOf(q) !== -1 ||
            m.desc.toLowerCase().indexOf(q) !== -1 ||
            (m.catLabel && m.catLabel.toLowerCase().indexOf(q) !== -1) ||
            ("#" + m.id).indexOf(q) !== -1 ||
            ("#" + padNum(m.id)).indexOf(q) !== -1;
          return okCat && okQ;
        });

        var visibleItems = isDefaultView ? matched.slice(0, MAX_DEFAULT_MODULES) : matched;

        if (!visibleItems.length) {
          gridEl.innerHTML = '<div style="grid-column:1/-1;padding:24px;text-align:center;color:#94a3b8;background:rgba(15,23,42,0.5);border-radius:10px;">Tidak ada modul yang sesuai filter atau daftar tersimpan masih kosong.</div>';
          hintEl.style.display = "none";
          return;
        }

        gridEl.innerHTML = visibleItems.map(function(m) {
          var isSaved = bookmarks.indexOf(m.id) !== -1;
          return '<div style="position:relative;display:flex;">' +
            '<button type="button" class="f3d-bookmark-btn' + (isSaved ? ' is-saved' : '') + '" data-bm-id="' + m.id + '" title="Simpan ke Favorit">' + (isSaved ? '★' : '☆') + '</button>' +
            '<a class="module-card" href="' + m.url + '" style="flex:1;">' +
              '<div>' +
                '<div class="module-card-top" style="padding-right:32px;"><span class="module-id">#' + padNum(m.id) + '</span><span class="module-tag">' + (m.catLabel || m.cat) + '</span></div>' +
                '<div class="module-card-title">' + m.title + '</div>' +
                '<p class="module-card-desc">' + m.desc + '</p>' +
              '</div>' +
              '<div class="module-card-cta">BUKA SIMULASI &#8594;</div>' +
            '</a>' +
          '</div>';
        }).join("");

        gridEl.querySelectorAll(".f3d-bookmark-btn").forEach(function(btn) {
          btn.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            var id = parseInt(btn.getAttribute("data-bm-id"), 10);
            var pos = bookmarks.indexOf(id);
            if (pos === -1) bookmarks.push(id); else bookmarks.splice(pos, 1);
            localStorage.setItem("f3dBookmarks", JSON.stringify(bookmarks));
            drawCatalog();
          });
        });

        if (isDefaultView && matched.length > MAX_DEFAULT_MODULES) {
          var hiddenCount = matched.length - MAX_DEFAULT_MODULES;
          hintEl.style.display = "flex";
          hintEl.innerHTML =
            '<span>Menampilkan <strong>' + MAX_DEFAULT_MODULES + '</strong> dari <strong>' + matched.length + '</strong> modul. Gunakan kolom pencarian atau filter kategori untuk menjelajahi <strong>' + hiddenCount + ' modul lainnya</strong>.</span>' +
            '<button type="button" id="f3d-focus-search" style="padding:6px 12px;background:rgba(var(--accent-rgb),0.12);border:1px solid rgba(var(--accent-rgb),0.4);color:var(--accent);border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;">🔍 Cari Modul Lainnya</button>';
          var btnFocus = document.getElementById("f3d-focus-search");
          if (btnFocus && searchEl) {
            btnFocus.onclick = function() {
              searchEl.scrollIntoView({ behavior: "smooth", block: "center" });
              searchEl.focus();
            };
          }
        } else {
          hintEl.style.display = "none";
        }
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

    var featBox = document.getElementById("f3d-featured-container");
    if (featBox) {
      var featIds = [18, 20, 22, 28, 30, 34, 37];
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

    var mountEl = document.getElementById("f3d-module-mount");
    var activeModObj = null;
    if (mountEl) {
      var reqId = parseInt(params.get("id"), 10);
      var reqSlug = params.get("mod");
      var modObj = list.find(function(m) { return m.id === reqId; }) ||
                   list.find(function(m) { return m.slug === reqSlug; }) ||
                   list[0];
      activeModObj = modObj;

      document.title = "Modul #" + padNum(modObj.id) + ": " + modObj.title + " — Fisika Developer";
      var titleEl = document.getElementById("f3d-mod-title");
      var badgeEl = document.getElementById("f3d-mod-badge");
      if (titleEl) titleEl.textContent = "#" + padNum(modObj.id) + " — " + modObj.title;
      if (badgeEl) badgeEl.textContent = modObj.catLabel || modObj.cat;

      var scriptPath = "modules/modul-" + padNum(modObj.id) + ".js";
      ensureThree().then(function() {
        var modScript = document.createElement("script");
        modScript.src = scriptPath + "?v=6";
        modScript.onload = function() {
          setTimeout(function() {
            enhanceLoadedModule(modObj, mountEl);
            if (window.MathJax && window.MathJax.typesetPromise) {
              window.MathJax.typesetPromise([mountEl]).catch(function() {});
            }
          }, 80);
        };
        modScript.onerror = function() {
          mountEl.innerHTML =
            '<div style="padding:18px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:10px;">' +
              '<p style="margin:0 0 8px;color:#fbbf24;font-weight:600;">File skrip modul <code>' + scriptPath + '</code> tidak ditemukan.</p>' +
            '</div>';
        };
        document.body.appendChild(modScript);
      });

      var navEl = document.getElementById("f3d-post-nav");
      var idx = list.findIndex(function(m) { return m.id === modObj.id; });
      var prev = list[(idx - 1 + list.length) % list.length];
      var next = list[(idx + 1) % list.length];
      if (navEl) {
        navEl.innerHTML =
          '<a class="f3d-nav-card f3d-nav-prev" href="' + prev.url + '">' +
            '<span class="f3d-nav-dir">&#8592; MODUL #' + padNum(prev.id) + '</span>' +
            '<span class="f3d-nav-title">' + prev.title + '</span>' +
            '<span class="f3d-nav-cat">' + (prev.catLabel || prev.cat) + '</span>' +
          '</a>' +
          '<a class="f3d-nav-hub" href="index.html">KATALOG<br/>37 MODUL</a>' +
          '<a class="f3d-nav-card f3d-nav-next" href="' + next.url + '">' +
            '<span class="f3d-nav-dir">MODUL #' + padNum(next.id) + ' &#8594;</span>' +
            '<span class="f3d-nav-title">' + next.title + '</span>' +
            '<span class="f3d-nav-cat">' + (next.catLabel || next.cat) + '</span>' +
          '</a>';
      }

      document.addEventListener("keydown", function(e) {
        if (["INPUT", "TEXTAREA", "SELECT"].indexOf(document.activeElement.tagName) !== -1) return;
        if (e.key === "f" || e.key === "F") {
          var btnFs = document.getElementById("f3d-btn-fs");
          if (btnFs) btnFs.click();
        } else if (e.key === "p" || e.key === "P") {
          var btnShot = document.getElementById("f3d-btn-shot");
          if (btnShot) btnShot.click();
        } else if (e.key === "l" || e.key === "L") {
          var btnCls = document.getElementById("f3d-btn-class");
          if (btnCls) btnCls.click();
        } else if (e.key === "ArrowLeft" && e.altKey) {
          window.location.href = prev.url;
        } else if (e.key === "ArrowRight" && e.altKey) {
          window.location.href = next.url;
        }
      });
    }

    setupPortfolioAndBugReport(activeModObj);
  });
})();
