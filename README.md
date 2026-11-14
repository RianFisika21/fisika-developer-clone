# Fisika Developer — Interactive 3D Computational Physics Lab

Repositori GitHub Pages (`https://ejenali1.github.io/fisika-developer/`) untuk 27 modul simulasi fisika komputasi interaktif berbasis Three.js WebGL, MathJax, dan telemetri CSV.

## Struktur Folder
- `index.html` — Halaman katalog utama 27 modul dengan filter bidang & pencarian cepat.
- `modul.html` — Halaman pemuat simulasi dinamis (`modul.html?id=1` .. `modul.html?id=27`).
- `style.css` — Tema Dark Lab (Aura UI) responsif.
- `app.js` — Kamus 27 modul, konfigurasi telemetri CSV, lazy-loader Three.js r128, dan navigasi Prev/Next.
- `modules/modul-01.js` .. `modules/modul-27.js` — Konten HTML & skrip simulasi masing-masing modul.
- `convert_modul.py` — Skrip Python untuk mengonversi file `.txt` hasil ekstrak `Modul.rar` ke folder `modules/`.

## Langkah Sinkronisasi ke GitHub (`EjenAli1/fisika-developer`)
1. Ekstrak seluruh isi paket ini ke folder lokal repositori `fisika-developer`.
2. Ekstrak `Modul.rar` sehingga menghasilkan folder `Modul/` berisi 27 file `.txt`.
3. Jalankan `python convert_modul.py` untuk membuat `modules/modul-01.js` s.d. `modules/modul-27.js`.
4. Commit dan push ke branch `main`:
   ```bash
   git add .
   git commit -m "Update katalog dan integrasi 27 modul simulasi 3D"
   git push origin main
   ```
