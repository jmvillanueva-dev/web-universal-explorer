import { loginUser, registerUser, getCurrentUser, logout } from './src/assets/js/authentication.js';

// Configurar eventos para los botones
document.getElementById('faceio-register').addEventListener('click', async () => {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    
    if (!name || !email) {
        alert('Por favor completa nombre y email');
        return;
    }

    try {
        const result = await registerUser({ name, email });
        if (result.success) {
            alert('Registro exitoso!');
            window.location.href = 'index.html';
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        alert('Error en el registro: ' + error.message);
    }
});

document.getElementById('faceio-login').addEventListener('click', async () => {
    try {
        const result = await loginUser();
        if (result.success) {
            window.location.href = './src/pages/dashboard.html';
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        alert('Error en el login: ' + error.message);
    }
});


document.getElementById("year").textContent = new Date().getFullYear();
