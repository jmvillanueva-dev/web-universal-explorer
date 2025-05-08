import  loadHeader from '../../modules/header.js';
import  loadFooter from '../../modules/footer.js';
import { fetchRandomAPOD, fetchAPODByDate, fetchTodaysAPOD } from '../../assets/js/nasa-api.js';
import { showModal, closeModal } from '../../assets/js/ui.js';
import { getUserData, logout } from '../../assets/js/authentication.js';

// Variables globales
let currentPage = 1;
let currentFilter = 'all';
let currentSearch = '';
let mediaItems = [];

// Elementos del DOM
const elements = {
  gallery: document.getElementById('gallery'),
  randomPhotosBtn: document.getElementById('random-photos-btn'),
  todayPhotoBtn: document.getElementById('today-photo-btn'),
  datePicker: document.getElementById('datePicker'),
  prevPageBtn: document.getElementById('prev-page'),
  nextPageBtn: document.getElementById('next-page'),
  pageIndicator: document.getElementById('page-indicator'),
  loadingSpinner: document.getElementById('loading-spinner'),
  logoutBtn: document.getElementById('logout-btn'),
  usernameDisplay: document.getElementById('username-display'),
  userAvatar: document.getElementById('user-avatar'),
  lastLogin: document.getElementById('last-login'),
  filterButtons: document.querySelectorAll('.filter-btn'),
  searchInput: document.getElementById('search-input'),
  searchBtn: document.querySelector('.btn-search')
};

// Inicialización
document.addEventListener('DOMContentLoaded', async () => {

  // Verificar si el usuario está autenticado
  if (!getUserData()) {
    window.location.href = '../../index.html';
    return;
  }

  // Cargar header y footer
  await loadHeader();
  await loadFooter();
  
  // Cargar datos del usuario
  loadUserData();
  
  // Configurar fecha máxima (hoy) en el date picker
  const today = new Date().toISOString().split('T')[0];
  elements.datePicker.max = today;
  
  // Event listeners
  setupEventListeners();
  
  // Cargar contenido inicial
  loadInitialContent();
});

function loadUserData() {
  const user = getUserData();
  if (user) {
    elements.usernameDisplay.textContent = `Bienvenido, ${user.name || 'Explorador'}`;
    elements.userAvatar.src = user.avatar || 'https://via.placeholder.com/80';
    elements.lastLogin.textContent = formatLastLogin(user.lastLogin);
  }
}

function formatLastLogin(timestamp) {
  if (!timestamp) return 'Hoy';
  
  const now = new Date();
  const lastLogin = new Date(timestamp);
  const diffDays = Math.floor((now - lastLogin) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Hoy';
  if (diffDays === 1) return 'Ayer';
  return `Hace ${diffDays} días`;
}

function setupEventListeners() {
  // Botones de galería
  elements.randomPhotosBtn.addEventListener('click', loadRandomPhotos);
  elements.todayPhotoBtn.addEventListener('click', loadTodaysPhoto);
  elements.datePicker.addEventListener('change', loadPhotoByDate);
  
  // Paginación
  elements.prevPageBtn.addEventListener('click', () => changePage(-1));
  elements.nextPageBtn.addEventListener('click', () => changePage(1));
  
  // Filtros
  elements.filterButtons.forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });
  
  // Búsqueda
  elements.searchBtn.addEventListener('click', applySearch);
  elements.searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') applySearch();
  });
  
  // Logout
  elements.logoutBtn.addEventListener('click', logoutUser);
}

async function loadInitialContent() {
  showLoading();
  try {
    mediaItems = await fetchRandomAPOD(6);
    renderGallery();
  } catch (error) {
    showError('Error al cargar las imágenes. Por favor, intenta nuevamente.');
  } finally {
    hideLoading();
  }
}

async function loadRandomPhotos() {
  showLoading();
  try {
    mediaItems = await fetchRandomAPOD(12);
    currentPage = 1;
    renderGallery();
  } catch (error) {
    showError('Error al cargar las imágenes aleatorias.');
  } finally {
    hideLoading();
  }
}

async function loadTodaysPhoto() {
  showLoading();
  try {
    const todayPhoto = await fetchTodaysAPOD();
    mediaItems = [todayPhoto];
    currentPage = 1;
    renderGallery();
  } catch (error) {
    showError('Error al cargar la foto del día.');
  } finally {
    hideLoading();
  }
}

async function loadPhotoByDate() {
  const date = elements.datePicker.value;
  if (!date) return;
  
  showLoading();
  try {
    const photo = await fetchAPODByDate(date);
    mediaItems = [photo];
    currentPage = 1;
    renderGallery();
  } catch (error) {
    showError('No se encontró imagen para la fecha seleccionada.');
  } finally {
    hideLoading();
  }
}

function renderGallery() {
  elements.gallery.innerHTML = '';
  
  if (mediaItems.length === 0) {
    elements.gallery.innerHTML = '<p class="no-results">No se encontraron resultados.</p>';
    return;
  }
  
  // Aplicar filtros y búsqueda
  const filteredItems = applyFiltersAndSearch(mediaItems);
  
  // Paginación
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);
  
  // Renderizar tarjetas
  paginatedItems.forEach(item => {
    const card = createMediaCard(item);
    elements.gallery.appendChild(card);
  });
  
  // Actualizar controles de paginación
  updatePaginationControls(filteredItems.length, itemsPerPage);
}

function applyFiltersAndSearch(items) {
  // Filtrar por tipo
  let filtered = items;
  if (currentFilter !== 'all') {
    filtered = items.filter(item => item.media_type === currentFilter);
  }
  
  // Filtrar por búsqueda
  if (currentSearch) {
    const searchTerm = currentSearch.toLowerCase();
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(searchTerm) || 
      (item.explanation && item.explanation.toLowerCase().includes(searchTerm))
    );
  }
  
  return filtered;
}

function createMediaCard(item) {
  const card = document.createElement('div');
  card.className = 'media-card';
  
  const isVideo = item.media_type === 'video';
  const mediaContent = isVideo ? 
    `<iframe src="${item.url}" frameborder="0" allowfullscreen class="card-image"></iframe>` :
    `<img src="${item.url}" alt="${item.title}" class="card-image">`;
  
  card.innerHTML = `
    <div class="card-image-container">
      ${mediaContent}
      ${isVideo ? '<div class="video-icon"><i class="fas fa-play"></i></div>' : ''}
    </div>
    <div class="card-content">
      <h3 class="card-title">${item.title}</h3>
      <span class="card-date">${formatDate(item.date)}</span>
      <p class="card-excerpt">${item.explanation || 'Descripción no disponible.'}</p>
      <button class="btn-view-more" data-id="${item.date}">Ver detalles</button>
    </div>
  `;
  
  // Agregar evento para el modal
  card.querySelector('.btn-view-more').addEventListener('click', () => showMediaDetails(item));
  
  return card;
}

function showMediaDetails(item) {
  const isVideo = item.media_type === 'video';
  const mediaContent = isVideo ? 
    `<iframe src="${item.url}" frameborder="0" allowfullscreen class="modal-media"></iframe>` :
    `<img src="${item.hdurl || item.url}" alt="${item.title}" class="modal-media">`;
  
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
    <div class="modal-media-container">
      ${mediaContent}
    </div>
    <div class="modal-text-content">
      <h3 class="modal-title">${item.title}</h3>
      <span class="modal-date">${formatDate(item.date)}</span>
      <p class="modal-explanation">${item.explanation || 'Descripción no disponible.'}</p>
    </div>
  `;
  
  showModal('detail-modal');
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
}

function applyFilter(filter) {
  currentFilter = filter;
  currentPage = 1;
  
  // Actualizar botones activos
  elements.filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  
  renderGallery();
}

function applySearch() {
  currentSearch = elements.searchInput.value.trim();
  currentPage = 1;
  renderGallery();
}

function changePage(direction) {
  const newPage = currentPage + direction;
  if (newPage > 0) {
    currentPage = newPage;
    renderGallery();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function updatePaginationControls(totalItems, itemsPerPage) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  elements.pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;
  elements.prevPageBtn.disabled = currentPage === 1;
  elements.nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
}

function showLoading() {
  elements.loadingSpinner.style.display = 'block';
  elements.gallery.style.opacity = '0.5';
}

function hideLoading() {
  elements.loadingSpinner.style.display = 'none';
  elements.gallery.style.opacity = '1';
}

function showError(message) {
  elements.gallery.innerHTML = `<p class="error-message">${message}</p>`;
}

function logoutUser() {
  logout();
  window.location.href = '../../index.html';
}