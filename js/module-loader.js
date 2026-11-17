// js/module-loader.js
const moduleCache = new Map();
const loadingOverlay = document.getElementById('module-loading');
const progressBar = document.querySelector('.loading-progress');
const loadingText = document.querySelector('.loading-text');

// Dynamic import dengan progress + error handling
export async function loadModule(moduleId) {
  if (moduleCache.has(moduleId)) return moduleCache.get(moduleId);

  showLoading(moduleId);

  try {
    // Dynamic import — hanya load saat dibutuhkan
    const module = await import(`./modules/${moduleId}.js`);
    moduleCache.set(moduleId, module);
    hideLoading();
    return module;
  } catch (error) {
    showError(moduleId, error);
    throw error;
  }
}

function showLoading(moduleId) {
  if (!loadingOverlay) return;
  loadingOverlay.classList.add('active');
  loadingText.textContent = `Memuat modul: ${moduleId}...`;
  progressBar.style.width = '0%';
  
  // Simulasi progress (bisa diganti dengan onProgress dari loader 3D)
  let progress = 0;
  const interval = setInterval(() => {
    progress = Math.min(progress + Math.random() * 15, 90);
    progressBar.style.width = `${progress}%`;
  }, 200);
  
  loadingOverlay.dataset.intervalId = interval;
}

function hideLoading() {
  if (!loadingOverlay) return;
  clearInterval(loadingOverlay.dataset.intervalId);
  progressBar.style.width = '100%';
  setTimeout(() => loadingOverlay.classList.remove('active'), 300);
}

function showError(moduleId, error) {
  clearInterval(loadingOverlay.dataset.intervalId);
  loadingText.innerHTML = `❌ Gagal memuat <strong>${moduleId}</strong><br><small>${error.message}</small>`;
  progressBar.style.background = '#ff4757';
}
