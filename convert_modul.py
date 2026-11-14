#!/usr/bin/env python3
"""
Konverter otomatis 27 file .txt hasil ekstrak Modul.rar
menjadi modules/modul-01.js s.d. modules/modul-27.js untuk GitHub Pages.
"""
import os
import re
import json

INPUT_DIR = "Modul"
OUTPUT_DIR = "modules"

def main():
    if not os.path.isdir(INPUT_DIR):
        print(f"Folder '{INPUT_DIR}/' tidak ditemukan. Ekstrak Modul.rar di direktori yang sama terlebih dahulu.")
        return

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    files = sorted(os.listdir(INPUT_DIR))
    count = 0

    for fname in files:
        if not fname.lower().endswith(".txt"):
            continue
        m = re.search(r"modul\s+(\d+)", fname, re.IGNORECASE)
        if not m:
            continue
        mod_id = int(m.group(1))
        fpath = os.path.join(INPUT_DIR, fname)
        with open(fpath, "r", encoding="utf-8", errors="replace") as f:
            raw = f.read()

        # Pisahkan tag <script> agar tetap dieksekusi setelah innerHTML dipasang
        scripts = re.findall(r"<script[^>]*>([\s\S]*?)</script>", raw, flags=re.IGNORECASE)
        html_clean = re.sub(r"<script[^>]*>[\s\S]*?</script>", "", raw, flags=re.IGNORECASE).strip()

        out_name = f"modul-{mod_id:02d}.js"
        out_path = os.path.join(OUTPUT_DIR, out_name)

        js_lines = [
            f"// Auto-generated from {fname}",
            "(function() {",
            '  var mount = document.getElementById("f3d-module-mount");',
            "  if (!mount) return;",
            f"  mount.innerHTML = {json.dumps(html_clean)};"
        ]
        for idx, sc in enumerate(scripts, 1):
            sc_clean = sc.strip()
            if sc_clean:
                js_lines.append(f"  // Inline script #{idx}")
                js_lines.append("  try {")
                js_lines.append(sc_clean)
                js_lines.append("  } catch (err) { console.error('Module script error:', err); }")
        js_lines.append("})();")

        with open(out_path, "w", encoding="utf-8") as out_f:
            out_f.write("\n".join(js_lines) + "\n")
        count += 1
        print(f"[OK] {fname} -> {out_path}")

    print(f"\nSelesai! {count} modul berhasil dikonversi ke folder '{OUTPUT_DIR}/'.")

if __name__ == "__main__":
    main()
