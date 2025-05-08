// Modal funcionalidades
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginBtn = document.getElementById('loginBtn');
const closeModal = document.getElementById('closeModal');
const closeRegisterModal = document.getElementById('closeRegisterModal');
const getAuthBtn = document.getElementById('getAuthBtn');


    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'flex';
    });

    getAuthBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'flex';
    });


    closeModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    closeRegisterModal.addEventListener('click', () => {
        registerModal.style.display = 'none';
    });

// Enventos para manejo del modal cambio entre Login y Register
document.getElementById("showRegister").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("loginView").style.display = "none";
    document.getElementById("registerView").style.display = "block";
    document.getElementById("modalTitle").textContent = "Crear Cuenta";
});

document.getElementById("showLogin").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("registerView").style.display = "none";
    document.getElementById("loginView").style.display = "block";
    document.getElementById("modalTitle").textContent = "Iniciar Sesión";
});
