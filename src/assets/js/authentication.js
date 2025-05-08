import { enrollWithFaceIO, authenticateWithFaceIO } from '../../modules/faceio-auth.js';

// Simulación de base de datos de usuarios
const USER_KEY = 'nasa-explorer-users';
const CURRENT_USER_KEY = 'nasa-explorer-current-user';

function getUsers() {
    return JSON.parse(localStorage.getItem(USER_KEY)) || [];
}

function saveUsers(users) {
    localStorage.setItem(USER_KEY, JSON.stringify(users));
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

export function setCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export async function registerUser(userData) {
    // Paso 1: Registro facial
    const faceIOResult = await enrollWithFaceIO(userData);
    if (!faceIOResult.success) {
        return faceIOResult;
    }

    // Paso 2: Guardar usuario localmente
    const users = getUsers();
    const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        faceId: faceIOResult.data.facialId,
        joinedDate: new Date().toISOString(),
        lastLogin: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser);

    return {
        success: true,
        user: newUser
    };
}

export async function loginUser() {
    // Paso 1: Autenticación facial
    const faceIOResult = await authenticateWithFaceIO();
    if (!faceIOResult.success) {
        return faceIOResult;
    }

    // Paso 2: Buscar usuario
    const users = getUsers();
    const user = users.find(u => u.faceId === faceIOResult.data.facialId);

    if (!user) {
        return {
            success: false,
            error: "Usuario no encontrado. Por favor regístrate primero."
        };
    }

    // Actualizar último login
    user.lastLogin = new Date().toISOString();
    saveUsers(users);
    setCurrentUser(user);

    return {
        success: true,
        user
    };
}

export function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
}