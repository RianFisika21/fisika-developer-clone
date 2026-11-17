// js/accessibility.js
export function setupAccessibility() {
  // Focus trap untuk overlay
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.loading-overlay.active, .modal.active')
        .forEach(el => el.classList.remove('active'));
    }
  });

  // Skip link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Lewati ke konten utama';
  document.body.prepend(skipLink);

  // Beri aria-label pada kanvas 3D
  document.querySelectorAll('canvas').forEach(canvas => {
    if (!canvas.getAttribute('aria-label')) {
      canvas.setAttribute('aria-label', 'Laboratorium simulasi fisika interaktif');
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('tabindex', '0');
    }
  });

  // Kontrol slider/button — pastikan focusable & punya label
  document.querySelectorAll('input[type="range"]').forEach(slider => {
    if (!slider.getAttribute('aria-label')) {
      slider.setAttribute('aria-label', slider.id || 'Kontrol simulasi');
    }
    // Panah kiri/kanan untuk step
    slider.addEventListener('keydown', e => {
      const step = parseFloat(slider.step) || 1;
      if (e.key === 'ArrowRight') { slider.value = +slider.value + step; slider.dispatchEvent(new Event('input')); }
      if (e.key === 'ArrowLeft')  { slider.value = +slider.value - step; slider.dispatchEvent(new Event('input')); }
    });
  });
}
