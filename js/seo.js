// js/seo.js
const MODULE_META = {
  'gerak-parabola': {
    title: 'Simulasi 3D Gerak Parabola — Fisika Developer',
    desc: 'Pelajari gerak parabola dengan simulasi 3D interaktif. Atur kecepatan awal, sudut elevasi, dan lihat lintasan proyektil secara real-time.'
  },
  'hukum-newton': {
    title: 'Simulasi 3D Hukum Newton — Fisika Developer',
    desc: 'Eksplorasi Hukum Newton I, II, III dengan simulasi 3D interaktif. Visualisasikan gaya, massa, dan percepatan.'
  },
  // ... tambahkan untuk 37 modul
};

export function updateMeta(moduleId) {
  const meta = MODULE_META[moduleId];
  if (!meta) return;

  document.title = meta.title;
  
  setMeta('name', 'description', meta.desc);
  setMeta('property', 'og:title', meta.title);
  setMeta('property', 'og:description', meta.desc);
  setMeta('property', 'og:url', `https://rianfisika21.github.io/fisika-developer/#${moduleId}`);
  setMeta('name', 'twitter:title', meta.title);
  setMeta('name', 'twitter:description', meta.desc);
  
  // Canonical
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = `https://rianfisika21.github.io/fisika-developer/#${moduleId}`;
}

function setMeta(attr, value, content) {
  let el = document.querySelector(`meta[${attr}="${value}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.content = content;
}
