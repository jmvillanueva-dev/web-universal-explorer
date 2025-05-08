    // Verificar autenticación antes de cargar el dashboard
    document.addEventListener('DOMContentLoaded', function() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userName = localStorage.getItem('userName');
        
        if (!isLoggedIn) {
            window.location.replace("../../index.html?msg=login");
            return;
        }
        
        // Mostrar el nombre del usuario si está disponible
        if (userName) {
            const userNameElement = document.getElementById('user-name');
            if (userNameElement) {
                userNameElement.textContent = userName;
            }
        }
        
        // Configurar el botón de logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userUUID');
                localStorage.removeItem('userName');
                window.location.href = '../../index.html';
            });
        }
    });