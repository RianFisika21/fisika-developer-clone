(function () {
  "use strict";

  function injectSkipLink() {
    if (document.querySelector('.fd-skip-link')) return;
    var a = document.createElement('a');
    a.href = '#main-content';
    a.className = 'fd-skip-link';
    a.textContent = 'Lewati ke konten utama';
    document.body.prepend(a);
  }

  function labelCanvases() {
    document.querySelectorAll('canvas:not([aria-label])').forEach(function (c) {
      c.setAttribute('aria-label', 'Laboratorium simulasi fisika interaktif 3D');
      c.setAttribute('role', 'img');
      c.setAttribute('tabindex', '0');
    });
  }

  function labelSliders() {
    document.querySelectorAll('input[type="range"]').forEach(function (s) {
      if (!s.getAttribute('aria-label') && s.id) {
        var lbl = document.querySelector('label[for="' + s.id + '"]');
        s.setAttribute('aria-label', lbl ? lbl.textContent.trim() : s.id);
      }
      // Pintasan keyboard: panah kiri/kanan
      s.addEventListener('keydown', function (e) {
        var step = parseFloat(s.step) || 1;
        if (e.key === 'ArrowRight') { s.value = +s.value + step; s.dispatchEvent(new Event('input', { bubbles: true })); }
        if (e.key === 'ArrowLeft') { s.value = +s.value - step; s.dispatchEvent(new Event('input', { bubbles: true })); }
      });
    });
  }

  function trapFocusInModals() {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.f3d-modal-backdrop.is-open, .fu-cmd-backdrop.is-open').forEach(function (el) {
          el.classList.remove('is-open');
        });
      }
    });
  }

  function init() {
    injectSkipLink();
    labelCanvases();
    labelSliders();
    trapFocusInModals();
    // Re-label kalau DOM berubah (modul dinamis)
    var mo = new MutationObserver(function () {
      labelCanvases();
      labelSliders();
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
