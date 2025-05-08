export function showModal(modalId) {
const modal = document.getElementById(modalId);
if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}
}

export function closeModal(modalId) {
const modal = document.getElementById(modalId);
if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}
}

// Configurar cierre de modales
document.addEventListener('DOMContentLoaded', () => {
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    if (modal) {
        closeModal(modal.id);
    }
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
    closeModal(e.target.id);
    }
});
});