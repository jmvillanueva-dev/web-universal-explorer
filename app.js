// Manejo ingreso no autorizado a dashboard
const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get('msg');

if (message === 'login') {
    alert("Debes iniciar sesión para acceder al panel.");
}

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
