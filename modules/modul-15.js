// Auto-generated module #15
(function() {
  var mount = document.getElementById("f3d-module-mount");
  if (!mount) return;
  mount.innerHTML = '<!-- Pustaka Three.js Lengkap & Post-Processing -->\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class="physics-sim-wrapper">\r\n  <div class="control-panel">\r\n    <h3>Reologi Polimer 3D (Sol-Gel)</h3>\r\n    <div class="input-group">\r\n      <label>Suhu Sistem (T) <span id="val-t" class="value-display">80 °C</span></label>\r\n      <input type="range" id="t-slider" min="0" max="100" step="1" value="80">\r\n    </div>\r\n    <div class="input-group">\r\n      <label>Konsentrasi Cross-linker <span id="val-c" class="value-display">Tinggi</span></label>\r\n      <input type="range" id="c-slider" min="0.1" max="1.0" step="0.1" value="0.8">\r\n    </div>\r\n    <div style="background: rgba(0, 255, 170, 0.1); border-left: 3px solid #00ffaa; padding: 10px; border-radius: 4px; margin-top: 15px;">\r\n      <p style="margin: 0; font-size: 12px; color: #8e949c;">\r\n        Turunkan suhu untuk mengaktifkan ikatan silang (<i>Cross-linking</i>).<br>\r\n        <b>INTERAKSI MOUSE:</b> Klik dan tarik (<i>drag</i>) partikel polimer untuk menguji elastisitas jaring secara fisik!\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <div class="visualization-panel" id="vis-panel-wrapper" style="position: relative; background: #05070a;">\r\n    <div id="rheology-canvas-container" style="width: 100%; height: 450px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 255, 170, 0.3);"></div>\r\n    <div style="position: absolute; top: 15px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 100;">\r\n      <button id="btn-fullscreen" style="background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; padding: 6px 12px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">[ ] FULLSCREEN</button>\r\n      <button id="btn-camera" style="background: rgba(255, 0, 85, 0.2); border: 1px solid #ff0055; color: #fff; padding: 6px 12px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">🎥 AUTO-ROTATE: OFF</button>\r\n    </div>\r\n    <div style="position: absolute; bottom: 15px; left: 20px; pointer-events: none; background: rgba(0,0,0,0.7); padding: 10px 15px; border-radius: 6px; border: 1px dashed rgba(0, 255, 170, 0.5);">\r\n      <div style="font-size: 10px; color: #00ffaa;">FASE REOLOGI MATERIAL</div>\r\n      <div id="hud-state" style="font-size: 16px; color: #ff8800; font-weight: bold; margin-bottom: 5px;">SOL (CAIRAN KENTAL)</div>\r\n      <div style="font-size: 10px; color: #00f3ff;">JUMLAH IKATAN SILANG (CROSS-LINKS)</div>\r\n      <div id="hud-bonds" style="font-size: 16px; color: #fff; font-weight: bold;">0 Ikatan</div>\r\n    </div>\r\n  </div>\r\n</div>';
  // Inline script #9
  try {
//<![CDATA[

    const container = document.getElementById('rheology-canvas-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020305);

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 20, 60); 

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.05;

    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.2, 0.4, 0.85);
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene); composer.addPass(bloomPass);

    // Wadah Cairan
    const boxGeo = new THREE.BoxGeometry(40, 40, 40);
    const boxMat = new THREE.MeshBasicMaterial({ color: 0x223344, wireframe: true, transparent: true, opacity: 0.2 });
    scene.add(new THREE.Mesh(boxGeo, boxMat));

    // MESIN FISIKA POLIMER (Nodes & Springs)
    const numChains = 15;
    const nodesPerChain = 12;
    const totalNodes = numChains * nodesPerChain;
    
    const nodes = [];
    const primaryBonds = []; // Ikatan utama (kovalen) polimer
    const crossLinks = [];   // Ikatan silang (curing) antar rantai

    // Inisiasi Node
    for(let i=0; i<numChains; i++) {
        let startX = (Math.random() - 0.5) * 20;
        let startY = (Math.random() - 0.5) * 20;
        let startZ = (Math.random() - 0.5) * 20;
        
        for(let j=0; j<nodesPerChain; j++) {
            nodes.push({
                id: i * nodesPerChain + j,
                chainId: i,
                pos: new THREE.Vector3(startX + j*2, startY + (Math.random()-0.5)*2, startZ + (Math.random()-0.5)*2),
                vel: new THREE.Vector3(0,0,0),
                force: new THREE.Vector3(0,0,0),
                mass: 1.0
            });
            
            // Buat ikatan rantai utama (Kuat dan permanen)
            if(j > 0) {
                primaryBonds.push({
                    a: i * nodesPerChain + j - 1,
                    b: i * nodesPerChain + j,
                    restLength: 2.0,
                    k: 1.5 // Kekakuan tinggi
                });
            }
        }
    }

    // Visualisasi Node (InstancedMesh)
    const nodeGeo = new THREE.SphereGeometry(0.8, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const nodeMesh = new THREE.InstancedMesh(nodeGeo, nodeMat, totalNodes);
    scene.add(nodeMesh);

    // Visualisasi Garis (Bonds)
    const maxLines = totalNodes * 3; 
    const lineGeo = new THREE.BufferGeometry();
    const linePos = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    
    const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.8 });
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineSegments);

    const colorPrimary = new THREE.Color(0xffffff); // Putih (Rantai Utama)
    const colorCross = new THREE.Color(0x00f3ff);   // Cyan (Ikatan Silang Gel)
    const dummy = new THREE.Object3D();
    const colorDummy = new THREE.Color();

    // INTERAKSI MOUSE (RAYCASTER DRAG)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let draggedNode = null;
    let dragPlane = new THREE.Plane();
    let dragIntersection = new THREE.Vector3();
    let isDragging = false;

    // Deteksi sentuhan/klik untuk menarik polimer
    container.addEventListener('pointerdown', (event) => {
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        
        let closestDist = Infinity;
        let closestNode = null;

        // Cari node terdekat dengan sinar raycaster (O(N) manual sangat cepat untuk <1000 nodes)
        for(let i=0; i<totalNodes; i++) {
            let n = nodes[i];
            let dist = raycaster.ray.distanceSqToPoint(n.pos);
            if(dist < 4.0 && dist < closestDist) { // Radius interaksi
                closestDist = dist;
                closestNode = n;
            }
        }

        if(closestNode) {
            draggedNode = closestNode;
            isDragging = true;
            controls.enabled = false; // Matikan rotasi kamera saat narik
            // Buat bidang maya tegak lurus kamera di posisi node untuk dasar seretan
            dragPlane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(new THREE.Vector3()), draggedNode.pos);
        }
    });

    container.addEventListener('pointermove', (event) => {
        if(!isDragging || !draggedNode) return;
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(dragPlane, dragIntersection);
    });

    container.addEventListener('pointerup', () => {
        isDragging = false;
        draggedNode = null;
        controls.enabled = true;
    });

    container.addEventListener('pointerleave', () => {
        isDragging = false; draggedNode = null; controls.enabled = true;
    });


    // LOGIKA UI & PARAMETER FISIKA
    const tSlider = document.getElementById('t-slider');
    const cSlider = document.getElementById('c-slider');
    const hudState = document.getElementById('hud-state');
    const hudBonds = document.getElementById('hud-bonds');

    tSlider.addEventListener('input', () => { document.getElementById('val-t').innerText = tSlider.value + " °C"; });
    cSlider.addEventListener('input', () => { 
        let v = parseFloat(cSlider.value);
        document.getElementById('val-c').innerText = v < 0.4 ? "Rendah" : (v > 0.7 ? "Tinggi" : "Sedang");
    });

    // Tombol UI
    let isAuto = false;
    document.getElementById('btn-camera').addEventListener('click', function() {
        isAuto = !isAuto; controls.autoRotate = isAuto;
        this.innerHTML = isAuto ? '🎥 AUTO-ROTATE: ON' : '🎥 AUTO-ROTATE: OFF';
        this.style.background = isAuto ? 'rgba(255, 0, 85, 0.4)' : 'rgba(255, 0, 85, 0.2)';
    }); controls.autoRotateSpeed = 1.0;

    document.getElementById('btn-fullscreen').addEventListener('click', () => {
        const w = document.getElementById('vis-panel-wrapper');
        if (!document.fullscreenElement) w.requestFullscreen?.() || w.webkitRequestFullscreen?.();
        else document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    });

    document.addEventListener('fullscreenchange', () => {
        container.style.height = document.fullscreenElement ? '100vh' : '450px';
        setTimeout(() => { camera.aspect = container.clientWidth / container.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(container.clientWidth, container.clientHeight); composer.setSize(container.clientWidth, container.clientHeight); }, 100);
    });

    // MESIN INTEGRASI VERLET (UPDATE LOOP)
    function animate() {
        requestAnimationFrame(animate);
        
        let temp = parseFloat(tSlider.value);
        let crosslinkerDensity = parseFloat(cSlider.value);
        
        // Parameter Reologi berdasarkan Suhu
        // Sol (Cair) > 50 C, Gel (Padat) < 50 C
        let isSol = temp > 50;
        let thermalJitter = temp * 0.005; // Gerak Brown (Panas)
        let damping = isSol ? 0.92 : 0.80; // Sol = lebih cair (kurang redaman), Gel = kaku (redaman tinggi)

        if(isSol) {
            hudState.innerText = "SOL (CAIRAN KENTAL)"; hudState.style.color = "#ff8800";
        } else {
            hudState.innerText = "GEL (ELASTOMER PADAT)"; hudState.style.color = "#00ffaa";
        }

        // 1. Reset Gaya & Terapkan Termal / Drag
        for(let i=0; i<totalNodes; i++) {
            nodes[i].force.set(0,0,0);
            
            // Gerak Brown
            nodes[i].force.add(new THREE.Vector3(
                (Math.random() - 0.5) * thermalJitter,
                (Math.random() - 0.5) * thermalJitter,
                (Math.random() - 0.5) * thermalJitter
            ));

            // Gaya Tarik Mouse (Tarik Node Interaktif)
            if(isDragging && draggedNode && draggedNode.id === i) {
                let pullForce = new THREE.Vector3().subVectors(dragIntersection, nodes[i].pos).multiplyScalar(0.5); // Kekuatan tarik
                nodes[i].force.add(pullForce);
            }
        }

        // 2. Evaluasi Gaya Pegas (Hukum Hooke) - Rantai Utama
        for(let i=0; i<primaryBonds.length; i++) {
            let b = primaryBonds[i];
            let nA = nodes[b.a], nB = nodes[b.b];
            let dir = new THREE.Vector3().subVectors(nB.pos, nA.pos);
            let dist = dir.length();
            let forceMag = (dist - b.restLength) * b.k;
            
            dir.normalize().multiplyScalar(forceMag);
            nA.force.add(dir);
            nB.force.sub(dir);
        }

        // 3. Dinamika Pembentukan & Pemutusan Ikatan Silang (Sol-Gel Transition)
        // Di fase Sol, ikatan silang hancur karena panas. Di fase Gel, mereka terbentuk.
        for(let i=crossLinks.length-1; i>=0; i--) {
            let b = crossLinks[i];
            let nA = nodes[b.a], nB = nodes[b.b];
            let dir = new THREE.Vector3().subVectors(nB.pos, nA.pos);
            let dist = dir.length();

            // Putus jika ditarik terlalu keras (Elastisitas berlebih) atau jika suhu memanas
            if(dist > 5.0 || Math.random() < (temp / 200.0)) {
                crossLinks.splice(i, 1);
                continue;
            }

            // Gaya pemulih ikatan silang
            let forceMag = (dist - b.restLength) * b.k;
            dir.normalize().multiplyScalar(forceMag);
            nA.force.add(dir);
            nB.force.sub(dir);
        }

        // Pembentukan Ikatan Silang Baru (Hanya jika suhu rendah / Gel)
        if(temp < 70) {
            // Pencarian probabilistik berpasangan
            for(let k=0; k<10; k++) {
                let idxA = Math.floor(Math.random() * totalNodes);
                let idxB = Math.floor(Math.random() * totalNodes);
                if(idxA !== idxB && nodes[idxA].chainId !== nodes[idxB].chainId) {
                    let dist = nodes[idxA].pos.distanceTo(nodes[idxB].pos);
                    // Formasi terjadi jika jarak dekat, suhu dingin, dan konsentrasi cukup
                    if(dist < 3.5 && crossLinks.length < (200 * crosslinkerDensity) && Math.random() > (temp/100)) {
                        crossLinks.push({ a: idxA, b: idxB, restLength: dist, k: 0.8 });
                    }
                }
            }
        }

        hudBonds.innerText = crossLinks.length + " Ikatan Silang";

        // 4. Integrasi Posisi (Euler Murni)
        const boxLimit = 19;
        let cIdx = 0;
        let lineIdx = 0;

        for(let i=0; i<totalNodes; i++) {
            let n = nodes[i];
            n.vel.add(n.force).multiplyScalar(damping);
            n.pos.add(n.vel);

            // Batas Kotak (Bouncing)
            if(n.pos.x > boxLimit) { n.pos.x = boxLimit; n.vel.x *= -0.5; }
            if(n.pos.x < -boxLimit) { n.pos.x = -boxLimit; n.vel.x *= -0.5; }
            if(n.pos.y > boxLimit) { n.pos.y = boxLimit; n.vel.y *= -0.5; }
            if(n.pos.y < -boxLimit) { n.pos.y = -boxLimit; n.vel.y *= -0.5; }
            if(n.pos.z > boxLimit) { n.pos.z = boxLimit; n.vel.z *= -0.5; }
            if(n.pos.z < -boxLimit) { n.pos.z = -boxLimit; n.vel.z *= -0.5; }

            // Warna Node (Lebih merah saat Sol/Panas, Lebih Biru saat Gel/Dingin)
            if(isDragging && draggedNode && draggedNode.id === i) {
                colorDummy.setHex(0xffffff); // Node yang ditarik menyala putih
            } else {
                colorDummy.setHSL((100 - temp) / 150, 1.0, 0.5); // Merah(100) -> Cyan(0)
            }
            
            dummy.position.copy(n.pos);
            dummy.updateMatrix();
            nodeMesh.setMatrixAt(i, dummy.matrix);
            nodeMesh.setColorAt(i, colorDummy);
        }
        nodeMesh.instanceMatrix.needsUpdate = true;
        nodeMesh.instanceColor.needsUpdate = true;

        // 5. Merender Garis (Bonds) ke Geometry
        // Rantai Utama
        for(let i=0; i<primaryBonds.length; i++) {
            let nA = nodes[primaryBonds[i].a].pos, nB = nodes[primaryBonds[i].b].pos;
            linePos[lineIdx*6] = nA.x; linePos[lineIdx*6+1] = nA.y; linePos[lineIdx*6+2] = nA.z;
            linePos[lineIdx*6+3] = nB.x; linePos[lineIdx*6+4] = nB.y; linePos[lineIdx*6+5] = nB.z;
            
            lineColors[lineIdx*6] = colorPrimary.r; lineColors[lineIdx*6+1] = colorPrimary.g; lineColors[lineIdx*6+2] = colorPrimary.b;
            lineColors[lineIdx*6+3] = colorPrimary.r; lineColors[lineIdx*6+4] = colorPrimary.g; lineColors[lineIdx*6+5] = colorPrimary.b;
            lineIdx++;
        }

        // Ikatan Silang
        for(let i=0; i<crossLinks.length; i++) {
            let nA = nodes[crossLinks[i].a].pos, nB = nodes[crossLinks[i].b].pos;
            linePos[lineIdx*6] = nA.x; linePos[lineIdx*6+1] = nA.y; linePos[lineIdx*6+2] = nA.z;
            linePos[lineIdx*6+3] = nB.x; linePos[lineIdx*6+4] = nB.y; linePos[lineIdx*6+5] = nB.z;
            
            // Warna Cyan terang dan sedikit kemerahan jika mau putus (tension tinggi)
            let dist = nA.distanceTo(nB);
            let tension = Math.min(1.0, dist / 5.0);
            
            lineColors[lineIdx*6] = colorCross.r + tension; lineColors[lineIdx*6+1] = colorCross.g - tension; lineColors[lineIdx*6+2] = colorCross.b;
            lineColors[lineIdx*6+3] = colorCross.r + tension; lineColors[lineIdx*6+4] = colorCross.g - tension; lineColors[lineIdx*6+5] = colorCross.b;
            lineIdx++;
        }

        // Sembunyikan sisa buffer garis yang tidak terpakai
        for(let i=lineIdx; i<maxLines; i++) {
            linePos[i*6] = 0; linePos[i*6+1] = 0; linePos[i*6+2] = 0;
            linePos[i*6+3] = 0; linePos[i*6+4] = 0; linePos[i*6+5] = 0;
        }

        lineGeo.attributes.position.needsUpdate = true;
        lineGeo.attributes.color.needsUpdate = true;

        controls.update(); 
        composer.render(); 
    }
    animate();

//]]>
  } catch (err) { console.error('Module script error:', err); }
})();