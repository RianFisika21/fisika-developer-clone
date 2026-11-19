/* === FISIKA DEVELOPER: EXPANSION PACK 4 (MODUL 38 - 47) === */
(function () {
  window.F3D_MODULES = window.F3D_MODULES || [];
  window.FISIKA3D_CONFIGS = window.FISIKA3D_CONFIGS || {};

  const NEW_MODULES = [
    {
      id: 38,
      slug: 'relativitas-lensa-gravitasi',
      cat: 'astro',
      catLabel: 'Astrofisika',
      title: 'Pelensaan Gravitasi 3D (Cincin Einstein)',
      desc: 'Simulasi pembelokan cahaya galaksi latar oleh kelengkungan ruang-waktu massa masif.',
      url: 'modul.html?id=38&mod=relativitas-lensa-gravitasi'
    },
    {
      id: 39,
      slug: 'terowongan-kuantum-3d',
      cat: 'kuantum',
      catLabel: 'Kuantum & Zat Padat',
      title: 'Terowongan Kuantum 3D (Quantum Tunneling)',
      desc: 'Evolusi paket gelombang probabilitas menembus penghalang potensial V₀.',
      url: 'modul.html?id=39&mod=terowongan-kuantum-3d'
    },
    {
      id: 40,
      slug: 'pandu-gelombang-te-tm',
      cat: 'elektro',
      catLabel: 'Elektromagnetika',
      title: 'Pandu Gelombang Persegi 3D (Mode TE)',
      desc: 'Perambatan vektor medan listrik E dan magnet B di atas frekuensi potong fc.',
      url: 'modul.html?id=40&mod=pandu-gelombang-te-tm'
    },
    {
      id: 41,
      slug: 'pusaran-von-karman',
      cat: 'fluida',
      catLabel: 'Plasma & Fluida',
      title: 'Jalan Pusaran Kármán 3D (Vortex Street)',
      desc: 'Instabilitas aliran fluida dan pelepasan vorteks bergantian di belakang silinder.',
      url: 'modul.html?id=41&mod=pusaran-von-karman'
    },
    {
      id: 42,
      slug: 'presesi-giroskop-3d',
      cat: 'mekanika',
      catLabel: 'Mekanika & Dinamika',
      title: 'Presesi & Nutasi Giroskop 3D',
      desc: 'Kestabilan momentum sudut L terhadap torsi gravitasi pada roda gila berputar cepat.',
      url: 'modul.html?id=42&mod=presesi-giroskop-3d'
    },
    {
      id: 43,
      slug: 'soliton-kdv-3d',
      cat: 'chaos',
      catLabel: 'Komputasi & Chaos',
      title: 'Gelombang Soliton Korteweg–de Vries (KdV)',
      desc: 'Tumbukan elastis dua gelombang soliter non-linier tanpa perubahan bentuk.',
      url: 'modul.html?id=43&mod=soliton-kdv-3d'
    },
    {
      id: 44,
      slug: 'efek-hall-kuantum',
      cat: 'kuantum',
      catLabel: 'Kuantum & Zat Padat',
      title: 'Efek Hall Klasik & Kuantum 3D',
      desc: 'Pembelokan pembawa muatan oleh medan magnet Bz dan kuantisasi konduktansi Hall.',
      url: 'modul.html?id=44&mod=efek-hall-kuantum'
    },
    {
      id: 45,
      slug: 'cakram-akresi-relativistik',
      cat: 'astro',
      catLabel: 'Astrofisika',
      title: 'Cakram Akresi Relativistik & Doppler',
      desc: 'Pergeseran biru/merah relativistik dan distorsi cahaya plasma di sekitar lubang hitam.',
      url: 'modul.html?id=45&mod=cakram-akresi-relativistik'
    },
    {
      id: 46,
      slug: 'resonansi-helmholtz-3d',
      cat: 'fluida',
      catLabel: 'Plasma & Fluida',
      title: 'Resonator Akustik Helmholtz 3D',
      desc: 'Osilasi kolom udara leher rongga dan respons tekanan akustik pada frekuensi f₀.',
      url: 'modul.html?id=46&mod=resonansi-helmholtz-3d'
    },
    {
      id: 47,
      slug: 'osilator-duffing-chaos',
      cat: 'chaos',
      catLabel: 'Komputasi & Chaos',
      title: 'Osilator Non-Linier Duffing 3D',
      desc: 'Transisi menuju strange attractor pada sistem pegas kubik potensial sumur ganda.',
      url: 'modul.html?id=47&mod=osilator-duffing-chaos'
    }
  ];

  const NEW_CONFIGS = {
    38: {
      moduleSlug: 'relativitas-lensa-gravitasi',
      paramMap: { mass: 'massa_lensa', beta: 'sudut_sumber', dls: 'rasio_jarak' },
      csvHeaders: ['Waktu (s)', 'Radius Einstein (arcsec)', 'Magnifikasi', 'Sudut Sumber (arcsec)']
    },
    39: {
      moduleSlug: 'terowongan-kuantum-3d',
      paramMap: { energy: 'energi_partikel', barrier: 'tinggi_potensial', width: 'lebar_penghalang' },
      csvHeaders: ['Waktu (s)', 'Transmisi T (%)', 'Refleksi R (%)', 'Panjang Gelombang (nm)']
    },
    40: {
      moduleSlug: 'pandu-gelombang-te-tm',
      paramMap: { freq: 'frekuensi_ghz', widthA: 'lebar_pandu_cm', modeM: 'orde_mode' },
      csvHeaders: ['Waktu (s)', 'Frekuensi Potong fc (GHz)', 'Kecepatan Fase (c)', 'Status']
    },
    41: {
      moduleSlug: 'pusaran-von-karman',
      paramMap: { flowU: 'kecepatan_aliran', diamD: 'diameter_silinder', visc: 'viskositas' },
      csvHeaders: ['Waktu (s)', 'Bilangan Reynolds', 'Bilangan Strouhal', 'Frekuensi Vorteks (Hz)']
    },
    42: {
      moduleSlug: 'presesi-giroskop-3d',
      paramMap: { spinW: 'kecepatan_sudut', tilt: 'sudut_kemiringan', massG: 'massa_roda' },
      csvHeaders: ['Waktu (s)', 'Laju Presesi (rad/s)', 'Momentum Sudut (kg.m2/s)', 'Torsi (N.m)']
    },
    43: {
      moduleSlug: 'soliton-kdv-3d',
      paramMap: { amp1: 'kecepatan_soliton_1', amp2: 'kecepatan_soliton_2', disp: 'koefisien_dispersi' },
      csvHeaders: ['Waktu (s)', 'Amplitudo A1', 'Kecepatan v1 (m/s)', 'Pergeseran Fase (m)']
    },
    44: {
      moduleSlug: 'efek-hall-kuantum',
      paramMap: { magB: 'medan_magnet_t', currI: 'arus_ma', density: 'kerapatan_pembawa' },
      csvHeaders: ['Waktu (s)', 'Tegangan Hall VH (mV)', 'Resistansi Hall (Ohm)', 'Faktor Landau']
    },
    45: {
      moduleSlug: 'cakram-akresi-relativistik',
      paramMap: { bhMass: 'massa_bh', incl: 'inklinasi_deg', spinA: 'spin_kerr' },
      csvHeaders: ['Waktu (s)', 'Radius ISCO (GM/c2)', 'Faktor Doppler Maks', 'Suhu Puncak (K)']
    },
    46: {
      moduleSlug: 'resonansi-helmholtz-3d',
      paramMap: { driveF: 'frekuensi_sumber', volV: 'volume_rongga', neckL: 'panjang_leher' },
      csvHeaders: ['Waktu (s)', 'Frekuensi Resonansi f0 (Hz)', 'Amplitudo Tekanan (Pa)', 'Faktor Q']
    },
    47: {
      moduleSlug: 'osilator-duffing-chaos',
      paramMap: { gamma: 'gaya_dorong', delta: 'redaman', omega: 'frekuensi_dorong' },
      csvHeaders: ['Waktu (s)', 'Posisi x (m)', 'Kecepatan v (m/s)', 'Energi Total (J)']
    }
  };

  // Daftarkan ke array global tanpa duplikasi
  NEW_MODULES.forEach((mod) => {
    if (!window.F3D_MODULES.some((m) => m.id === mod.id || m.slug === mod.slug)) {
      window.F3D_MODULES.push(mod);
    }
  });
  Object.assign(window.FISIKA3D_CONFIGS, NEW_CONFIGS);

  // === ENGINE 3D UNTUK MODUL 38 - 47 DI modul.html ===
  const SIM_SPECS = {
    38: {
      sliders: [
        { id: 'mass', sym: 'M', label: 'Massa Lensa (×10¹¹ M☉)', min: 1, max: 20, step: 0.5, val: 6 },
        { id: 'beta', sym: 'β', label: 'Offset Sumber β (arcsec)', min: 0, max: 2.0, step: 0.05, val: 0.25 },
        { id: 'dls', sym: 'D', label: 'Rasio Jarak D_LS / D_S', min: 0.1, max: 0.9, step: 0.05, val: 0.5 }
      ],
      build(scene, THREE) {
        const bh = new THREE.Mesh(
          new THREE.SphereGeometry(0.9, 32, 32),
          new THREE.MeshBasicMaterial({ color: 0x02040a })
        );
        const halo = new THREE.Mesh(
          new THREE.RingGeometry(0.92, 1.05, 64),
          new THREE.MeshBasicMaterial({ color: 0xff2a85, side: THREE.DoubleSide })
        );
        const source = new THREE.Mesh(
          new THREE.SphereGeometry(0.28, 24, 24),
          new THREE.MeshBasicMaterial({ color: 0xffb800 })
        );
        source.position.z = -3;

        const arcCount = 64;
        const arcGeom = new THREE.BufferGeometry();
        const arcPos = new Float32Array(arcCount * 3);
        arcGeom.setAttribute('position', new THREE.BufferAttribute(arcPos, 3));
        const ringLine = new THREE.LineLoop(
          arcGeom,
          new THREE.LineBasicMaterial({ color: 0x00f0ff })
        );

        scene.add(bh, halo, source, ringLine);
        return {
          update(t, p) {
            const thetaE = Math.sqrt(p.mass * p.dls) * 0.65;
            const rPlus = 0.5 * (p.beta + Math.sqrt(p.beta * p.beta + 4 * thetaE * thetaE));
            const mu = (thetaE * thetaE) / (Math.max(0.04, p.beta) * Math.sqrt(p.beta * p.beta + 4 * thetaE * thetaE));

            source.position.x = p.beta * 1.4;
            source.position.y = Math.sin(t * 0.6) * 0.15;

            for (let i = 0; i < arcCount; i++) {
              const ang = (i / arcCount) * Math.PI * 2;
              const pinch = 1 - Math.min(0.65, p.beta * 0.35) * Math.pow(Math.sin(ang), 2);
              const rad = rPlus * pinch * 1.35;
              arcPos[i * 3] = Math.cos(ang) * rad + p.beta * 0.35;
              arcPos[i * 3 + 1] = Math.sin(ang) * rad;
              arcPos[i * 3 + 2] = 0;
            }
            arcGeom.attributes.position.needsUpdate = true;
            halo.rotation.z = t * 0.4;

            return [
              { label: 'Radius Einstein θ_E', val: thetaE.toFixed(2) + ' "' },
              { label: 'Magnifikasi μ', val: mu.toFixed(2) + 'x', sec: true },
              { label: 'Offset Sumber β', val: p.beta.toFixed(2) + ' "' }
            ];
          }
        };
      }
    },

    39: {
      sliders: [
        { id: 'energy', sym: 'E', label: 'Energi Partikel E (eV)', min: 1, max: 12, step: 0.2, val: 5.0 },
        { id: 'barrier', sym: 'V₀', label: 'Potensial Penghalang V₀ (eV)', min: 2, max: 15, step: 0.2, val: 7.5 },
        { id: 'width', sym: 'L', label: 'Lebar Penghalang L (nm)', min: 0.2, max: 2.0, step: 0.1, val: 0.8 }
      ],
      build(scene, THREE) {
        const wall = new THREE.Mesh(
          new THREE.BoxGeometry(0.8, 2.4, 2.2),
          new THREE.MeshBasicMaterial({ color: 0xff2a85, transparent: true, opacity: 0.28, wireframe: false })
        );
        const wallEdge = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.BoxGeometry(0.8, 2.4, 2.2)),
          new THREE.LineBasicMaterial({ color: 0xff2a85 })
        );

        const N = 160;
        const geom = new THREE.BufferGeometry();
        const pos = new Float32Array(N * 3);
        geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const wave = new THREE.Line(geom, new THREE.LineBasicMaterial({ color: 0x00f0ff }));
        scene.add(wall, wallEdge, wave);

        return {
          update(t, p) {
            wall.scale.x = p.width;
            wallEdge.scale.x = p.width;
            const diff = Math.max(0.05, p.barrier - p.energy);
            const kappa = Math.sqrt(diff) * 1.4;
            const T = p.energy >= p.barrier ? 0.92 : Math.exp(-2 * kappa * p.width);
            const R = Math.max(0, 1 - T);
            const lambda = 1.226 / Math.sqrt(p.energy);

            for (let i = 0; i < N; i++) {
              const x = -5 + (i / (N - 1)) * 10;
              const halfW = 0.4 * p.width;
              let amp = 1.0;
              if (x > -halfW && x < halfW) {
                amp = Math.exp(-kappa * (x + halfW));
              } else if (x >= halfW) {
                amp = Math.sqrt(T);
              }
              pos[i * 3] = x;
              pos[i * 3 + 1] = amp * Math.sin(3.5 * x - t * 4.5);
              pos[i * 3 + 2] = amp * Math.cos(3.5 * x - t * 4.5) * 0.65;
            }
            geom.attributes.position.needsUpdate = true;

            return [
              { label: 'Transmisi (T)', val: (T * 100).toFixed(1) + ' %' },
              { label: 'Refleksi (R)', val: (R * 100).toFixed(1) + ' %', sec: true },
              { label: 'λ de Broglie', val: lambda.toFixed(2) + ' nm' }
            ];
          }
        };
      }
    },

    40: {
      sliders: [
        { id: 'freq', sym: 'f', label: 'Frekuensi Gelombang (GHz)', min: 2, max: 20, step: 0.5, val: 10 },
        { id: 'widthA', sym: 'a', label: 'Lebar Pandu a (cm)', min: 1.5, max: 6.0, step: 0.1, val: 3.0 },
        { id: 'modeM', sym: 'm', label: 'Orde Mode TE_m0', min: 1, max: 3, step: 1, val: 1 }
      ],
      build(scene, THREE) {
        const guide = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.BoxGeometry(8, 2.2, 3.2)),
          new THREE.LineBasicMaterial({ color: 0x475569 })
        );
        const N = 120;
        const eGeom = new THREE.BufferGeometry();
        const ePos = new Float32Array(N * 3);
        eGeom.setAttribute('position', new THREE.BufferAttribute(ePos, 3));
        const eLine = new THREE.Line(eGeom, new THREE.LineBasicMaterial({ color: 0x00f0ff }));

        const bGeom = new THREE.BufferGeometry();
        const bPos = new Float32Array(N * 3);
        bGeom.setAttribute('position', new THREE.BufferAttribute(bPos, 3));
        const bLine = new THREE.Line(bGeom, new THREE.LineBasicMaterial({ color: 0xff2a85 }));

        scene.add(guide, eLine, bLine);
        return {
          update(t, p) {
            const fc = (p.modeM * 30) / (2 * p.widthA); // GHz
            const propagating = p.freq > fc;
            const vp = propagating ? 1 / Math.sqrt(1 - Math.pow(fc / p.freq, 2)) : 0;

            for (let i = 0; i < N; i++) {
              const z = -4 + (i / (N - 1)) * 8;
              const decay = propagating ? 1 : Math.exp(-(z + 4) * 0.75);
              const phase = propagating ? 2.4 * z - t * 5 : -t * 2;
              ePos[i * 3] = z;
              ePos[i * 3 + 1] = decay * Math.sin(phase) * 0.95;
              ePos[i * 3 + 2] = 0;

              bPos[i * 3] = z;
              bPos[i * 3 + 1] = 0;
              bPos[i * 3 + 2] = decay * Math.sin(phase) * 1.25;
            }
            eGeom.attributes.position.needsUpdate = true;
            bGeom.attributes.position.needsUpdate = true;

            return [
              { label: 'Cut-off fc', val: fc.toFixed(2) + ' GHz' },
              { label: 'Kecepatan Fase', val: propagating ? vp.toFixed(2) + ' c' : '0.00 c', sec: true },
              { label: 'Status Mode', val: propagating ? 'PROPAGASI' : 'EVANESCENT' }
            ];
          }
        };
      }
    },

    41: {
      sliders: [
        { id: 'flowU', sym: 'U', label: 'Kecepatan Aliran U (m/s)', min: 1, max: 15, step: 0.5, val: 6 },
        { id: 'diamD', sym: 'D', label: 'Diameter Silinder D (m)', min: 0.2, max: 1.5, step: 0.1, val: 0.5 },
        { id: 'visc', sym: 'ν', label: 'Viskositas ν (×10⁻² m²/s)', min: 0.5, max: 5.0, step: 0.1, val: 1.5 }
      ],
      build(scene, THREE) {
        const cyl = new THREE.Mesh(
          new THREE.CylinderGeometry(0.45, 0.45, 2.4, 24),
          new THREE.MeshBasicMaterial({ color: 0x94a3b8, wireframe: true })
        );
        cyl.position.x = -2.8;

        const count = 160;
        const pGeom = new THREE.BufferGeometry();
        const pts = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          pts[i * 3] = -4 + Math.random() * 8.5;
          pts[i * 3 + 1] = (Math.random() - 0.5) * 3.2;
          pts[i * 3 + 2] = (Math.random() - 0.5) * 1.6;
        }
        pGeom.setAttribute('position', new THREE.BufferAttribute(pts, 3));
        const cloud = new THREE.Points(pGeom, new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.11 }));
        scene.add(cyl, cloud);

        return {
          update(t, p) {
            const Re = (p.flowU * p.diamD) / (p.visc * 0.01);
            const St = Re > 45 ? Math.max(0.12, 0.198 * (1 - 19.7 / Re)) : 0;
            const fv = (St * p.flowU) / p.diamD;
            cyl.scale.set(p.diamD * 1.6, 1, p.diamD * 1.6);

            for (let i = 0; i < count; i++) {
              let x = pts[i * 3] + p.flowU * 0.018;
              let y = pts[i * 3 + 1];
              if (x > -2.5 && Re > 45) {
                const wake = Math.sin(x * 2.2 - t * fv * 2.5) * 0.045 * Math.min(2, Re / 120);
                y += wake * (i % 2 === 0 ? 1 : -1);
              }
              if (x > 4.5) {
                x = -4.2;
                y = (Math.random() - 0.5) * 3.0;
              }
              pts[i * 3] = x;
              pts[i * 3 + 1] = y;
            }
            pGeom.attributes.position.needsUpdate = true;

            return [
              { label: 'Bilangan Reynolds', val: Re.toFixed(0) },
              { label: 'Strouhal (St)', val: St.toFixed(3), sec: true },
              { label: 'Freq. Vorteks', val: fv.toFixed(2) + ' Hz' }
            ];
          }
        };
      }
    },

    42: {
      sliders: [
        { id: 'spinW', sym: 'ω', label: 'Putaran Roda ω (rad/s)', min: 10, max: 100, step: 2, val: 45 },
        { id: 'tilt', sym: 'θ', label: 'Sudut Kemiringan (°)', min: 10, max: 60, step: 1, val: 28 },
        { id: 'massG', sym: 'm', label: 'Massa Roda Gila (kg)', min: 0.5, max: 5.0, step: 0.1, val: 1.5 }
      ],
      build(scene, THREE) {
        const pivot = new THREE.Group();
        const rod = new THREE.Mesh(
          new THREE.CylinderGeometry(0.06, 0.06, 2.6, 16),
          new THREE.MeshBasicMaterial({ color: 0xe2e8f0 })
        );
        rod.position.y = 1.3;
        const wheel = new THREE.Mesh(
          new THREE.TorusGeometry(0.95, 0.16, 16, 36),
          new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true })
        );
        wheel.rotation.x = Math.PI / 2;
        wheel.position.y = 2.1;

        const base = new THREE.Mesh(
          new THREE.ConeGeometry(0.35, 0.7, 20),
          new THREE.MeshBasicMaterial({ color: 0xff2a85 })
        );
        base.position.y = -0.35;

        pivot.add(rod, wheel);
        scene.add(base, pivot);

        return {
          update(t, p) {
            const I = 0.5 * p.massG * 0.25;
            const L = I * p.spinW;
            const tau = p.massG * 9.8 * 0.2 * Math.sin((p.tilt * Math.PI) / 180);
            const omegaP = (p.massG * 9.8 * 0.2) / Math.max(0.5, L);

            const nutation = 0.04 * Math.sin(t * p.spinW * 0.25);
            pivot.rotation.z = (p.tilt * Math.PI) / 180 + nutation;
            pivot.rotation.y = t * omegaP;
            wheel.rotation.z = t * p.spinW * 0.15;

            return [
              { label: 'Laju Presesi Ω_p', val: omegaP.toFixed(2) + ' rad/s' },
              { label: 'Momentum L', val: L.toFixed(2) + ' kg·m²/s', sec: true },
              { label: 'Torsi Gravitasi', val: tau.toFixed(2) + ' N·m' }
            ];
          }
        };
      }
    },

    43: {
      sliders: [
        { id: 'amp1', sym: 'c₁', label: 'Kecepatan Soliton 1', min: 1.5, max: 5.0, step: 0.1, val: 3.4 },
        { id: 'amp2', sym: 'c₂', label: 'Kecepatan Soliton 2', min: 0.5, max: 2.5, step: 0.1, val: 1.4 },
        { id: 'disp', sym: 'β', label: 'Koefisien Dispersi β', min: 0.5, max: 2.0, step: 0.1, val: 1.0 }
      ],
      build(scene, THREE) {
        const N = 180;
        const geom = new THREE.BufferGeometry();
        const pos = new Float32Array(N * 3);
        geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const line = new THREE.Line(geom, new THREE.LineBasicMaterial({ color: 0x00f0ff }));
        const grid = new THREE.GridHelper(10, 12, 0x1e293b, 0x0f172a);
        grid.position.y = -0.8;
        scene.add(grid, line);

        return {
          update(t, p) {
            const sech2 = (z) => {
              const c = Math.cosh(Math.max(-15, Math.min(15, z)));
              return 1 / (c * c);
            };
            const x1 = ((-2.5 + t * p.amp1 * 0.65) % 9) - 4.5;
            const x2 = ((0.8 + t * p.amp2 * 0.65) % 9) - 4.5;
            const k1 = Math.sqrt(p.amp1 / p.disp) * 0.9;
            const k2 = Math.sqrt(p.amp2 / p.disp) * 0.9;

            for (let i = 0; i < N; i++) {
              const x = -5 + (i / (N - 1)) * 10;
              const u1 = 0.55 * p.amp1 * sech2(k1 * (x - x1));
              const u2 = 0.55 * p.amp2 * sech2(k2 * (x - x2));
              pos[i * 3] = x;
              pos[i * 3 + 1] = u1 + u2 - 0.8;
              pos[i * 3 + 2] = 0;
            }
            geom.attributes.position.needsUpdate = true;

            return [
              { label: 'Amplitudo A₁', val: (0.5 * p.amp1).toFixed(2) + ' m' },
              { label: 'Kecepatan v₁', val: p.amp1.toFixed(2) + ' m/s', sec: true },
              { label: 'Pergeseran Fase', val: (0.42 / k1).toFixed(2) + ' m' }
            ];
          }
        };
      }
    },

    44: {
      sliders: [
        { id: 'magB', sym: 'B', label: 'Medan Magnet B_z (Tesla)', min: 0.2, max: 8.0, step: 0.2, val: 2.5 },
        { id: 'currI', sym: 'I', label: 'Arus Listrik I (mA)', min: 5, max: 100, step: 5, val: 40 },
        { id: 'density', sym: 'n', label: 'Kerapatan Muatan (×10²²/m³)', min: 1, max: 10, step: 0.5, val: 3.0 }
      ],
      build(scene, THREE) {
        const slab = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.BoxGeometry(6.5, 0.5, 2.8)),
          new THREE.LineBasicMaterial({ color: 0x64748b })
        );
        const count = 70;
        const geom = new THREE.BufferGeometry();
        const pts = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          pts[i * 3] = -3 + Math.random() * 6;
          pts[i * 3 + 1] = 0;
          pts[i * 3 + 2] = (Math.random() - 0.5) * 2.4;
        }
        geom.setAttribute('position', new THREE.BufferAttribute(pts, 3));
        const electrons = new THREE.Points(geom, new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.14 }));
        scene.add(slab, electrons);

        return {
          update(t, p) {
            const q = 1.6e-19;
            const d = 1e-4;
            const nVal = p.density * 1e22;
            const vH = ((p.currI * 1e-3 * p.magB) / (nVal * q * d)) * 1e3; // mV
            const rXY = vH / Math.max(1, p.currI);
            const nu = (nVal * 4.135e-15) / Math.max(0.1, p.magB);

            const drift = 0.02 + p.currI * 0.0008;
            const deflect = Math.min(1.25, p.magB * 0.16);
            for (let i = 0; i < count; i++) {
              pts[i * 3] += drift;
              pts[i * 3 + 2] += (deflect - pts[i * 3 + 2]) * 0.03;
              if (pts[i * 3] > 3.1) {
                pts[i * 3] = -3.1;
                pts[i * 3 + 2] = (Math.random() - 0.5) * 2.2;
              }
            }
            geom.attributes.position.needsUpdate = true;

            return [
              { label: 'Tegangan Hall V_H', val: vH.toFixed(2) + ' mV' },
              { label: 'Resistansi R_xy', val: rXY.toFixed(2) + ' Ω', sec: true },
              { label: 'Faktor Landau ν', val: nu.toFixed(2) }
            ];
          }
        };
      }
    },

    45: {
      sliders: [
        { id: 'bhMass', sym: 'M', label: 'Massa Lubang Hitam (M☉)', min: 5, max: 50, step: 1, val: 15 },
        { id: 'incl', sym: 'i', label: 'Inklinasi Pengamat (°)', min: 15, max: 85, step: 1, val: 68 },
        { id: 'spinA', sym: 'a*', label: 'Spin Relativistik a*', min: 0.0, max: 0.99, step: 0.01, val: 0.75 }
      ],
      build(scene, THREE) {
        const core = new THREE.Mesh(
          new THREE.SphereGeometry(0.85, 32, 32),
          new THREE.MeshBasicMaterial({ color: 0x000000 })
        );
        const diskGroup = new THREE.Group();
        const N = 450;
        const geom = new THREE.BufferGeometry();
        const pos = new Float32Array(N * 3);
        const col = new Float32Array(N * 3);
        const radii = new Float32Array(N);
        const angles = new Float32Array(N);

        for (let i = 0; i < N; i++) {
          radii[i] = 1.15 + Math.random() * 2.8;
          angles[i] = Math.random() * Math.PI * 2;
        }
        geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geom.setAttribute('color', new THREE.BufferAttribute(col, 3));
        const disk = new THREE.Points(geom, new THREE.PointsMaterial({ size: 0.09, vertexColors: true }));
        diskGroup.add(disk);
        scene.add(core, diskGroup);

        return {
          update(t, p) {
            const isco = 6 - 4.5 * p.spinA;
            const gMax = 1 + 0.65 * Math.sin((p.incl * Math.PI) / 180) * (1 + p.spinA * 0.4);
            const tempK = (1.2e7 / Math.pow(p.bhMass, 0.25)) * (1 + p.spinA * 0.5);

            diskGroup.rotation.x = ((90 - p.incl) * Math.PI) / 180;
            for (let i = 0; i < N; i++) {
              angles[i] += (0.045 / Math.pow(radii[i], 1.3)) * (1 + p.spinA * 0.3);
              const x = Math.cos(angles[i]) * radii[i];
              const z = Math.sin(angles[i]) * radii[i];
              pos[i * 3] = x;
              pos[i * 3 + 1] = z < 0 ? Math.abs(z) * 0.18 : 0; // Efek lensa belakang
              pos[i * 3 + 2] = z;

              // Doppler shift: x < 0 mendekat (biru-cyan), x > 0 menjauh (merah-oranye)
              const shift = Math.max(-1, Math.min(1, -x / 2.2));
              col[i * 3] = shift > 0 ? 0.3 : 1.0;
              col[i * 3 + 1] = shift > 0 ? 0.95 : 0.32;
              col[i * 3 + 2] = shift > 0 ? 1.0 : 0.15;
            }
            geom.attributes.position.needsUpdate = true;
            geom.attributes.color.needsUpdate = true;

            return [
              { label: 'Radius ISCO', val: isco.toFixed(2) + ' GM/c²' },
              { label: 'Doppler g_max', val: gMax.toFixed(2), sec: true },
              { label: 'Suhu Puncak', val: (tempK / 1e6).toFixed(1) + ' MK' }
            ];
          }
        };
      }
    },

    46: {
      sliders: [
        { id: 'driveF', sym: 'f', label: 'Frekuensi Sumber f (Hz)', min: 50, max: 400, step: 5, val: 185 },
        { id: 'volV', sym: 'V', label: 'Volume Rongga V (Liter)', min: 0.5, max: 5.0, step: 0.1, val: 1.5 },
        { id: 'neckL', sym: 'L', label: 'Panjang Leher L (cm)', min: 2, max: 20, step: 0.5, val: 8.0 }
      ],
      build(scene, THREE) {
        const cavity = new THREE.Mesh(
          new THREE.SphereGeometry(1.45, 28, 20),
          new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.35 })
        );
        const neck = new THREE.Mesh(
          new THREE.CylinderGeometry(0.35, 0.35, 1.3, 20, 1, true),
          new THREE.MeshBasicMaterial({ color: 0x94a3b8, wireframe: true })
        );
        neck.position.y = 1.9;
        const piston = new THREE.Mesh(
          new THREE.CylinderGeometry(0.32, 0.32, 0.25, 20),
          new THREE.MeshBasicMaterial({ color: 0xff2a85 })
        );
        scene.add(cavity, neck, piston);

        return {
          update(t, p) {
            const vSound = 343;
            const area = 0.002; // m²
            const volM3 = p.volV * 0.001;
            const lEff = p.neckL * 0.01 + 0.03;
            const f0 = (vSound / (2 * Math.PI)) * Math.sqrt(area / (volM3 * lEff));
            const Q = 14;
            const ratio = p.driveF / f0;
            const gain = 1 / Math.sqrt(Math.pow(1 - ratio * ratio, 2) + Math.pow(ratio / Q, 2));
            const deltaP = Math.min(120, gain * 4.5);

            const osc = Math.sin(t * p.driveF * 0.08) * Math.min(0.45, gain * 0.04);
            piston.position.y = 1.9 + osc;
            const pulse = 1 + osc * 0.18;
            cavity.scale.set(pulse, pulse, pulse);

            return [
              { label: 'Resonansi f₀', val: f0.toFixed(1) + ' Hz' },
              { label: 'Tekanan ΔP', val: deltaP.toFixed(1) + ' Pa', sec: true },
              { label: 'Faktor Kualitas Q', val: Q.toFixed(0) }
            ];
          }
        };
      }
    },

    47: {
      sliders: [
        { id: 'gamma', sym: 'γ', label: 'Amplitudo Dorong γ', min: 0.1, max: 0.8, step: 0.02, val: 0.38 },
        { id: 'delta', sym: 'δ', label: 'Koefisien Redaman δ', min: 0.05, max: 0.6, step: 0.02, val: 0.25 },
        { id: 'omega', sym: 'ω', label: 'Frekuensi Dorong ω', min: 0.5, max: 2.0, step: 0.05, val: 1.2 }
      ],
      build(scene, THREE) {
        const ball = new THREE.Mesh(
          new THREE.SphereGeometry(0.18, 20, 20),
          new THREE.MeshBasicMaterial({ color: 0xff2a85 })
        );
        const maxPts = 220;
        const geom = new THREE.BufferGeometry();
        const trail = new Float32Array(maxPts * 3);
        geom.setAttribute('position', new THREE.BufferAttribute(trail, 3));
        const line = new THREE.Line(geom, new THREE.LineBasicMaterial({ color: 0x00f0ff }));
        scene.add(ball, line);

        let x = 0.5, v = 0, simT = 0, count = 0;
        return {
          update(_, p) {
            const dt = 0.025;
            for (let s = 0; s < 2; s++) {
              // d²x/dt² + δ dx/dt - x + x³ = γ cos(ωt)
              const acc = x - x * x * x - p.delta * v + p.gamma * Math.cos(p.omega * simT);
              v += acc * dt;
              x += v * dt;
              simT += dt;
            }
            const z = Math.sin(p.omega * simT) * 1.4;
            ball.position.set(x * 1.6, v * 1.1, z);

            for (let i = maxPts - 1; i > 0; i--) {
              trail[i * 3] = trail[(i - 1) * 3];
              trail[i * 3 + 1] = trail[(i - 1) * 3 + 1];
              trail[i * 3 + 2] = trail[(i - 1) * 3 + 2];
            }
            trail[0] = x * 1.6;
            trail[1] = v * 1.1;
            trail[2] = z;
            count = Math.min(maxPts, count + 1);
            geom.setDrawRange(0, count);
            geom.attributes.position.needsUpdate = true;

            const energy = 0.5 * v * v - 0.5 * x * x + 0.25 * Math.pow(x, 4);
            return [
              { label: 'Posisi x(t)', val: x.toFixed(3) + ' m' },
              { label: 'Kecepatan v(t)', val: v.toFixed(3) + ' m/s', sec: true },
              { label: 'Energi Potensial', val: energy.toFixed(3) + ' J' }
            ];
          }
        };
      }
    }
  };

  // === RENDERER OTOMATIS JIKA MODUL 38 - 47 DIBUKA DI modul.html ===
  function bootNewModuleIfActive() {
    const params = new URLSearchParams(window.location.search);
    const idParam = parseInt(params.get('id'), 10);
    const modParam = params.get('mod');
    const target = NEW_MODULES.find((m) => m.id === idParam || m.slug === modParam);
    if (!target || !SIM_SPECS[target.id]) return;

    const spec = SIM_SPECS[target.id];
    const titleEl = document.querySelector('h1, .module-title, #module-title');
    if (titleEl) titleEl.textContent = target.title;

    // Bangun slider ke #controls-container
    const ctrlBox = document.getElementById('controls-container');
    const state = {};
    if (ctrlBox) {
      ctrlBox.innerHTML = spec.sliders
        .map((s) => {
          const initVal = params.has(s.id) ? parseFloat(params.get(s.id)) : s.val;
          state[s.id] = initVal;
          return `<div style="margin-bottom:12px;">
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
              <span>${s.label}</span>
              <strong id="val-${s.id}" style="color:#00f0ff; font-variant-numeric:tabular-nums;">${initVal}</strong>
            </div>
            <input type="range" id="${s.id}" name="${s.id}" data-symbol="${s.sym}"
                   min="${s.min}" max="${s.max}" step="${s.step}" value="${initVal}" style="width:100%;" />
          </div>`;
        })
        .join('');

      spec.sliders.forEach((s) => {
        const inp = document.getElementById(s.id);
        inp?.addEventListener('input', () => {
          state[s.id] = parseFloat(inp.value);
          const lbl = document.getElementById(`val-${s.id}`);
          if (lbl) lbl.textContent = inp.value;
        });
      });
    }

    // Inisialisasi Three.js Canvas
    const stage = document.getElementById('canvas-container') || document.querySelector('main');
    if (!stage || typeof window.THREE === 'undefined') return;

    stage.innerHTML = '';
    const width = stage.clientWidth || 720;
    const height = Math.min(460, Math.max(300, Math.round(width * 0.56)));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 6.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    stage.appendChild(renderer.domElement);

    const sim = spec.build(scene, THREE);
    const hudBox = document.getElementById('telemetry-container');

    window.addEventListener('resize', () => {
      const w = stage.clientWidth || 720;
      const h = Math.min(460, Math.max(300, Math.round(w * 0.56)));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    const startTime = performance.now();
    function animate(now) {
      requestAnimationFrame(animate);
      const t = (now - startTime) * 0.001;
      const metrics = sim.update(t, state);

      if (hudBox && Array.isArray(metrics)) {
        hudBox.innerHTML = metrics
          .map(
            (m) => `<div class="fu-hud-item ${m.sec ? 'is-secondary' : ''}">
              <span class="fu-hud-label">${m.label}</span>
              <span class="fu-hud-val">${m.val}</span>
            </div>`
          )
          .join('');
      }
      renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);
  }

  document.addEventListener('DOMContentLoaded', bootNewModuleIfActive);
})();
