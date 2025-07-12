// verificamos el token enviando petición al servidor (enfoque seguro)
export const verificacion_token = async () => {
  console.log('Iniciando verificación de token...');
  
  try {
    // Hacer petición al servidor - el navegador envía automáticamente la cookie httpOnly
    console.log('Verificando token con servidor...');
    const response = await fetch('/api/verify-token', {
      method: 'GET',
      credentials: 'include' // Importante: incluir cookies
    });
    
    console.log('Respuesta del servidor:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Datos de respuesta:', data);
      
      if (data.valid) {
        // Token válido, redirigir a task
        console.log('Token válido, redirigiendo a /task');
        window.location.href = '/task';
        return true;
      }
    } else {
      // Token inválido o no existe
      console.log('Token inválido o no existe');
      return false;
    }
    
    console.log('No hay token válido');
    return false;
  } catch (error) {
    console.log('Error validating token with server:', error);
    return false;
  }
}

// Función auxiliar para verificar token sin redirigir (enfoque seguro)
export const verificar_token_sin_redirigir = async () => {
  try {
    const response = await fetch('/api/verify-token', {
      method: 'GET',
      credentials: 'include' // Importante: incluir cookies
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.valid;
    } else {
      return false;
    }
  } catch (error) {
    console.log('Error validating token with server:', error);
    return false;
  }
}


// tomar los datos del login y registro 

function showModal(message) {
  const modalMessage = document.getElementById('modalMessage');
  modalMessage.textContent = message;
  const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));
  messageModal.show();
}


document.addEventListener('DOMContentLoaded', async function () {

  console.log("DOM cargado - iniciando verificación de token");
  
  // Verificar si el usuario ya está logueado
  const isLoggedIn = await verificacion_token();
  console.log("Resultado de verificación:", isLoggedIn);
  
  if (isLoggedIn) {
    // Si está logueado, la función verificacion_token ya redirige automáticamente
    console.log("Usuario logueado, debería redirigir automáticamente");
    return;
  }
  
  console.log("Usuario no logueado, mostrando formulario de login");
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('Password').value.trim();


    // Simple client-side validation
    if (!validateEmail(email) || !validatePassword(password)) {
      showModal('Invalid input. Please check your email and password.');
      return;
    }

    try {
      const response = await fetch(`/api/login`, {
        method: 'POST', credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "email": email, "password": password })
      });



      const data = await response.json();

      if (response.ok) {
        window.location.href = "/task";
      } else {
        showModal(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      showModal('An error occurred. Please try again.');
    }
  });

  // validar las contraseñas - movido dentro del DOMContentLoaded
  const passwordInput = document.getElementById("registerPassword");
  const confirmPasswordInput = document.getElementById("registerConfirmPassword");
  const statusDots = document.querySelectorAll(".status-dot");

  function validatePasswords() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const registerButton = document.querySelector('#registerForm button[type="submit"]');

    if (password === confirmPassword && password !== "") {
      statusDots.forEach(dot => {
        dot.classList.remove("error");
        dot.classList.add("success");
      });
      registerButton.disabled = false;
    } else {
      statusDots.forEach(dot => {
        dot.classList.remove("success");
        dot.classList.add("error");
      });
      registerButton.disabled = true;
    }
  }

  passwordInput.addEventListener("input", validatePasswords);
  confirmPasswordInput.addEventListener("input", validatePasswords);

  // funcion para registrar nuevo usuario 
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();

    // Simple client-side validation
    if (!validateEmail(email) || !validatePassword(password) || !validateName(name)) {
      showModal('Invalid input. Please check your details.');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        showModal(data.message);
      } else {
        showModal(data.message);
      }

      // si la respuesta en 201
      if (response.status === 201) {
        document.getElementById('registerName').value = '';
        document.getElementById('registerEmail').value = '';
        document.getElementById('registerPassword').value = '';
        document.getElementById('registerConfirmPassword').value = '';

        async function modalMessage() {
          showModal(data.message);
          setTimeout(() => {
            window.location.href = '/inicio';
          }, 2000); // Espera 2 segundos antes de redirigir
        }

        modalMessage();
      }
    } catch (error) {
      console.error('Error:', error);
      showModal('An error occurred. Please try again.');
    }
  });

  // funcion para iniciar sesion con google
  document.getElementById('googleButton').addEventListener('click', () => {
    window.location.href = '/auth/google';
  });

}); // Cierre del DOMContentLoaded

// Function to validate email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Function to validate password (example: at least 6 characters)
function validatePassword(password) {
  return password.length >= 3;
}

// Function to validate name (example: not empty)
function validateName(name) {
  return name.length > 0;
}










