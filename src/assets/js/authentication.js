const API_KEY = 'e6bcf6eb429a45198e7ddfad24e5a481';
const video = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('captureBtn');
const faceCaptureContainer = document.getElementById('faceCaptureContainer');
const closeModalBtn = document.getElementById('closeModal');

let currentMode = null; // 'register' o 'login'
let cameraStream = null; // Variable global para el stream de la cámara

// Iniciar webcam
async function startWebcam() {
  try {
      // Detener cualquier cámara previa
      stopWebcam();
      
      // Iniciar nueva cámara
      cameraStream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
              width: { ideal: 640 },
              height: { ideal: 480 },
              facingMode: 'user'
          } 
      });
      
      video.srcObject = cameraStream;
      faceCaptureContainer.style.display = 'block';
      
      // Manejar cuando el usuario cierra la cámara manualmente
      cameraStream.getVideoTracks()[0].onended = () => {
          stopWebcam();
      };
      
  } catch (err) {
      console.error("Error al acceder a la cámara:", err);
      alert("No se pudo acceder a la cámara. Por favor, asegúrate de haber otorgado los permisos necesarios.");
  }
}

// Función para detener completamente la cámara
function stopWebcam() {
  if (cameraStream) {
      cameraStream.getTracks().forEach(track => {
          track.stop(); // Detener cada track
      });
      cameraStream = null;
  }
  
  if (video.srcObject) {
      video.srcObject = null; // Limpiar el srcObject
  }
  
  faceCaptureContainer.style.display = 'none';
}

// Capturar imagen del video
function captureImage() {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
        const file = new File([blob], "face.jpg", { type: "image/jpeg" });

        if (currentMode === 'register') {
            registerFace(file);
        } else if (currentMode === 'login') {
            recognizeFace(file);
        }

        // Detener la cámara después de capturar
        const stream = video.srcObject;
        if (stream && stream.getTracks) {
            stream.getTracks().forEach(track => track.stop());
        }

        faceCaptureContainer.style.display = 'none';

    }, 'image/jpeg', 0.95);
}

// Registrar rostro
function registerFace(file) {
    const data = {
        name: "usuario_123",
        store: "1",
        collections: "",
        unique: "0"
    };

    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    formData.append("photos", file); // Campo fotos

    fetch("https://api.luxand.cloud/v2/person", {
        method: "POST",
        headers: {
            "token": API_KEY
        },
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.uuid) {
            alert("✅ ¡Rostro registrado! UUID: " + data.uuid);
        } else {
            alert("❌ Error al registrar: " + JSON.stringify(data));
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Hubo un problema al registrar el rostro.");
    });
}

// Reconocer rostro
function recognizeFace(file) {
    const data = {
        collections: "" 
    };

    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    formData.append("photo", file); // Imagen a comparar

    fetch("https://api.luxand.cloud/photo/search/v2", {
        method: "POST",
        headers: {
            "token": API_KEY
        },
        body: formData
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("HTTP error! status: " + res.status);
        }
        return res.json();
    })
    .then(data => {
        console.log("Respuesta de la API:", data);

        if (Array.isArray(data) && data.length > 0 && data[0].probability > 0.7) {
            const match = data[0];
            alert(`¡Bienvenido, ${match.name}! Probabilidad: ${match.probability}`);

            // Guardar datos del usuario
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("userUUID", match.uuid);
            localStorage.setItem("userName", match.name);

            // Redirigir
            window.location.href = "./src/pages/dashboard.html";
        } else {
            alert("❌ No se encontró una coincidencia clara.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Hubo un problema con la autenticación facial.");
    });
}

// Eventos de botones
document.getElementById("faceio-register").addEventListener("click", () => {
  currentMode = 'register';
  faceCaptureContainer.style.display = 'block';
  startWebcam();
});

document.getElementById("faceio-login").addEventListener("click", () => {
  currentMode = 'login';
  faceCaptureContainer.style.display = 'block';
  startWebcam();
});

// captureBtn.addEventListener("click", captureImage);
captureBtn.addEventListener("click", (e) => {
  e.preventDefault();
  captureImage();
});

// Evento para cerrar el modal
closeModalBtn.addEventListener("click", () => {
  stopWebcam();
  document.getElementById("loginModal").style.display = "none";
});

// Evento para hacer clic fuera del modal
document.getElementById("loginModal").addEventListener("click", function(e) {
  if (e.target === this) {
      stopWebcam();
      this.style.display = "none";
  }
});