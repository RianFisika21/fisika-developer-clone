(function () {
  "use strict";

  var BASE = 'https://rianfisika21.github.io/fisika-developer';

  function setMeta(attr, name, content) {
    var el = document.querySelector('meta[' + attr + '="' + name + '"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.content = content;
  }

  function setCanonical(url) {
    var el = document.querySelector('link[rel="canonical"]');
    if (!el) {
      el = document.createElement('link');
      el.rel = 'canonical';
      document.head.appendChild(el);
    }
    el.href = url;
  }

  window.FisikaSEO = {
    updateForModule: function (modObj) {
      var title = 'Modul #' + String(modObj.id).padStart(2, '0') + ': ' + modObj.title + ' — Fisika Developer';
      var desc = modObj.desc + ' Simulasi 3D interaktif untuk pembelajaran fisika komputasional.';
      var url = BASE + '/modul.html?id=' + modObj.id;

      document.title = title;
      setMeta('name', 'description', desc);
      setMeta('property', 'og:title', title);
      setMeta('property', 'og:description', desc);
      setMeta('property', 'og:url', url);
      setMeta('property', 'og:type', 'website');
      setMeta('name', 'twitter:card', 'summary_large_image');
      setMeta('name', 'twitter:title', title);
      setMeta('name', 'twitter:description', desc);
      setCanonical(url);
    },

    updateForCatalog: function (count) {
      document.title = 'Fisika Developer — ' + count + ' Modul Simulasi 3D Fisika Komputasional';
      setMeta('name', 'description',
        'Laboratorium virtual fisika 3D interaktif dengan ' + count + ' modul simulasi komputasional: mekanika, kuantum, plasma, radiasi, astrofisika, dan fisika medis.');
      setCanonical(BASE + '/');
    }
  };
})();
