// Auto-generated module #08
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js, OrbitControls, dan Post-Processing (Bloom) -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <!-- Panel Kontrol -->\r\n  <div class="control-panel">\r\n    <h3>Termodinamika Material 3D</h3>\r\n    \r\n    <div class="input-group">\r\n      <label>Suhu Sistem (T) <span id="val-t" class="value-display">0 K</span></label>\r\n      <input type="range" id="t-slider" min="0" max="1000" step="5" value="0">\r\n    </div>\r\n    \r\n    <div style="background: rgba(0, 243, 255, 0.05); border-left: 3px solid #00f3ff; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c; font-family: \'Rajdhani\', sans-serif;">\r\n        <strong>HUKUM TERMODINAMIKA:</strong><br>\r\n        T &lt; 500K : Solid (Kisi Kristal)<br>\r\n        T = 500K : Titik Lebur (Bonds Break)<br>\r\n        T &gt; 800K : Ekspansi Gas (Zero-G)\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Panel Visualisasi 3D -->\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="lattice-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 243, 255, 0.2); box-shadow: 0 5px 25px rgba(0,0,0,0.6);"></div>\r\n    \r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        [ ] FULLSCREEN\r\n      </button>\r\n      <button id="btn-camera" style="background: rgba(255, 221, 0, 0.2); border: 1px solid #ffdd00; color: #fff; padding: 6px 12px; border-radius: 4px; font-family: \'Orbitron\', sans-serif; font-size: 11px; cursor: pointer; transition: 0.3s; font-weight: bold; backdrop-filter: blur(4px);">\r\n        🎥 AUTO-ROTATE\r\n      </button>\r\n    </div>\r\n\r\n    <!-- HUD State Materi -->\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.7); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(0, 243, 255, 0.4);">\r\n      <div style="font-family: \'Orbitron\', sans-serif; font-size: 10px; color: #00f3ff; letter-spacing: 1px;">FASE MATERI AKTIF</div>\r\n      <div id="hud-state" style="font-family: \'Orbitron\', monospace; font-size: 16px; color: #00ffaa; font-weight: bold;">SOLID (KRISTAL KAKU)</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {

    // 1. SCENE, KAMERA, & RENDERER
    const container = document.getElementById('lattice-canvas-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(60, 40, 90); 

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // 2. POST-PROCESSING (BLOOM) UNTUK EFEK NEON/PANAS
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.5, 0.4, 0.85);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 3. WADAH / CHAMBER KACA TRANSPARAN
    const boxSize = 60; // Batas area simulasi (-30 hingga 30)
    const boxGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    const boxMat = new THREE.MeshBasicMaterial({ color: 0x334455, wireframe: true, transparent: true, opacity: 0.15 });
    const chamber = new THREE.Mesh(boxGeo, boxMat);
    scene.add(chamber);

    // 4. MEMBANGUN STRUKTUR ATOM (INSTANCED MESH)
    const gridSize = 4; // 4x4x4 = 64 Atom
    const spacing = 10;
    const offset = (gridSize - 1) * spacing / 2;
    
    const atomGeo = new THREE.SphereGeometry(1.5, 16, 16);
    const atomMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const atomMesh = new THREE.InstancedMesh(atomGeo, atomMat, Math.pow(gridSize, 3));
    scene.add(atomMesh);

    // Array Fisika per Atom
    const atoms = [];
    const dummy = new THREE.Object3D();
    
    let idx = 0;
    for(let x=0; x<gridSize; x++) {
        for(let y=0; y<gridSize; y++) {
            for(let z=0; z<gridSize; z++) {
                let posX = x*spacing - offset;
                let posY = y*spacing - offset; // Centered at 0
                let posZ = z*spacing - offset;
                
                atoms.push({
                    id: idx,
                    basePos: new THREE.Vector3(posX, posY, posZ),
                    pos: new THREE.Vector3(posX, posY, posZ),
                    vel: new THREE.Vector3(0, 0, 0)
                });
                
                dummy.position.set(posX, posY, posZ);
                dummy.updateMatrix();
                atomMesh.setMatrixAt(idx, dummy.matrix);
                idx++;
            }
        }
    }

    // 5. MEMBANGUN IKATAN MOLEKUL (BONDS)
    const bondsPairs = [];
    // Deteksi molekul yang saling bersebelahan
    for(let i=0; i<atoms.length; i++) {
        for(let j=i+1; j<atoms.length; j++) {
            let dist = atoms[i].basePos.distanceTo(atoms[j].basePos);
            if (Math.abs(dist - spacing) < 0.1) {
                bondsPairs.push([i, j]);
            }
        }
    }

    // BufferGeometry untuk menggambar garis antar atom secara dinamis
    const bondGeo = new THREE.BufferGeometry();
    const bondPositions = new Float32Array(bondsPairs.length * 6); // 2 titik * 3 (x,y,z)
    bondGeo.setAttribute('position', new THREE.BufferAttribute(bondPositions, 3));
    
    const bondMat = new THREE.LineBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.8 });
    const bondLines = new THREE.LineSegments(bondGeo, bondMat);
    scene.add(bondLines);

    // 6. LOGIKA UI & FISIKA JAVASCRIPT
    const tSlider = document.getElementById('t-slider');
    const hudState = document.getElementById('hud-state');
    
    const colorCold = new THREE.Color(0x00f3ff); // Cyan (Solid)
    const colorHot = new THREE.Color(0xff0055);  // Red/Pink (Gas)
    const colorDummy = new THREE.Color();

    let isAutoRotate = true;
    const btnCamera = document.getElementById('btn-camera');
    btnCamera.addEventListener('click', () => {
        isAutoRotate = !isAutoRotate;
        controls.autoRotate = isAutoRotate;
        btnCamera.innerHTML = isAutoRotate ? '🎥 AUTO-ROTATE: ON' : '🎥 AUTO-ROTATE: OFF';
        btnCamera.style.background = isAutoRotate ? 'rgba(255, 221, 0, 0.4)' : 'rgba(255, 221, 0, 0.2)';
    });
    controls.autoRotate = isAutoRotate;
    controls.autoRotateSpeed = 0.5;

    const visWrapper = document.getElementById('vis-panel-wrapper');
    const btnFullscreen = document.getElementById('btn-fullscreen');
    btnFullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) visWrapper.requestFullscreen?.() || visWrapper.webkitRequestFullscreen?.();
        else document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    });

    document.addEventListener('fullscreenchange', () => {
        const isFs = document.fullscreenElement;
        btnFullscreen.innerHTML = isFs ? '✖ EXIT' : '[ ] FULLSCREEN';
        container.style.height = isFs ? '100vh' : '450px';
        container.style.borderRadius = isFs ? '0' : '10px';
        container.style.border = isFs ? 'none' : '1px solid rgba(0, 243, 255, 0.2)';
        setTimeout(() => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
            composer.setSize(container.clientWidth, container.clientHeight);
        }, 100);
    });

    // 7. ANIMATION LOOP (MESIN FISIKA TERMODINAMIKA)
    function animate() {
        requestAnimationFrame(animate);
        
        const T = parseFloat(tSlider.value);
        const T_melt = 500;
        const T_boil = 800;
        const isSolid = T < T_melt;

        document.getElementById('val-t').innerText = T + " K";

        // Update HUD State
        if (T === 0) { hudState.innerText = "SOLID (KRISTAL KAKU)"; hudState.style.color = "#00ffaa"; }
        else if (T < T_melt) { hudState.innerText = "SOLID (EKSITASI TERMAL)"; hudState.style.color = "#ffdd00"; }
        else if (T < T_boil) { hudState.innerText = "LIQUID (FLUIDA CAIR)"; hudState.style.color = "#ff8800"; }
        else { hudState.innerText = "GAS (EKSPANSI PLASMA)"; hudState.style.color = "#ff0055"; }

        // Parameter Fisika Berdasarkan Suhu
        // Konstanta Pegas (K): Mengikat atom ke base position. Hancur saat T >= 500
        let k = isSolid ? 0.3 * ((T_melt - T) / T_melt) : 0; 
        
        // Gravitasi: Tidak ada di kristal (ditahan pegas). Ada di cair. Hilang di gas (>800).
        let gravity = isSolid ? 0 : (T < T_boil ? -0.2 : 0); 
        
        // Faktor Agitasi Termal (Gerak Brown)
        let thermalFactor = (T / 1000.0) * 0.4;
        if (!isSolid) thermalFactor *= 1.5; // Cair/Gas bergerak lebih liar

        // Redaman (Damping): Cairan lebih kental dari gas
        let damping = isSolid ? 0.85 : (T < T_boil ? 0.95 : 0.99);

        // Update Warna Atom berdasarkan Suhu
        colorDummy.copy(colorCold).lerp(colorHot, T / 1000.0);
        const boxLimit = (boxSize / 2) - 1.5; // Batas tumbukan dinding ruang

        // KALKULASI GAYA UNTUK SETIAP ATOM
        for(let i=0; i<atoms.length; i++) {
            let a = atoms[i];

            // 1. Gaya Pemulih Pegas (Hanya bekerja saat Solid)
            let fx = (a.basePos.x - a.pos.x) * k;
            let fy = (a.basePos.y - a.pos.y) * k;
            let fz = (a.basePos.z - a.pos.z) * k;

            // 2. Gerak Brown Acak (Panas)
            fx += (Math.random() - 0.5) * thermalFactor;
            fy += (Math.random() - 0.5) * thermalFactor;
            fz += (Math.random() - 0.5) * thermalFactor;

            // 3. Gravitasi
            fy += gravity;

            // Akselerasi -> Kecepatan
            a.vel.x += fx; a.vel.y += fy; a.vel.z += fz;
            
            // Gesekan / Viskositas
            a.vel.multiplyScalar(damping);

            // Kecepatan -> Posisi
            a.pos.add(a.vel);

            // 4. Deteksi Tumbukan dengan Dinding Kaca (Bouncing)
            if (a.pos.x < -boxLimit) { a.pos.x = -boxLimit; a.vel.x *= -0.8; }
            if (a.pos.x > boxLimit) { a.pos.x = boxLimit; a.vel.x *= -0.8; }
            if (a.pos.y < -boxLimit) { a.pos.y = -boxLimit; a.vel.y *= -0.5; } // Lantai meredam pantulan lebih kuat
            if (a.pos.y > boxLimit) { a.pos.y = boxLimit; a.vel.y *= -0.8; }
            if (a.pos.z < -boxLimit) { a.pos.z = -boxLimit; a.vel.z *= -0.8; }
            if (a.pos.z > boxLimit) { a.pos.z = boxLimit; a.vel.z *= -0.8; }

            // Apply to InstancedMesh
            dummy.position.copy(a.pos);
            dummy.updateMatrix();
            atomMesh.setMatrixAt(i, dummy.matrix);
            atomMesh.setColorAt(i, colorDummy);
        }
        
        atomMesh.instanceMatrix.needsUpdate = true;
        if (atomMesh.instanceColor) atomMesh.instanceColor.needsUpdate = true;

        // KALKULASI GARIS IKATAN MOLEKUL (BONDS)
        // Ikatan perlahan pudar saat suhu mendekati titik lebur
        let bondOpacity = isSolid ? Math.pow((T_melt - T) / T_melt, 0.5) : 0;
        bondMat.opacity = bondOpacity;
        
        if (bondOpacity > 0) {
            let pArray = bondLines.geometry.attributes.position.array;
            let pIdx = 0;
            for(let b=0; b<bondsPairs.length; b++) {
                let a1 = atoms[bondsPairs[b][0]].pos;
                let a2 = atoms[bondsPairs[b][1]].pos;
                
                pArray[pIdx++] = a1.x; pArray[pIdx++] = a1.y; pArray[pIdx++] = a1.z;
                pArray[pIdx++] = a2.x; pArray[pIdx++] = a2.y; pArray[pIdx++] = a2.z;
            }
            bondLines.geometry.attributes.position.needsUpdate = true;
        }

        controls.update(); 
        composer.render(); 
    }
    animate();

  } catch (err) { console.error('Module script error:', err); }
})();