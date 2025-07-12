// verificamos el token de la cookie en el navegador y lo validamos con el servidor
export const verificacion_token = async () => {
  try {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (cookieValue) {
      const token = cookieValue.split('=')[1];
      if (token && token !== 'undefined' && token !== 'null') {
        // Verificar con el servidor si el token es válido
        try {
          const response = await fetch('/task', {
            method: 'GET',
            credentials: 'include'
          });
          
          if (response.ok) {
            // Token válido, redirigir a task
            window.location.href = '/task';
            return true;
          } else {
            // Token inválido, limpiar cookie
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            return false;
          }
        } catch (error) {
          console.log('Error validating token with server:', error);
          return false;
        }
      }
    }
    return false;
  } catch (error) {
    console.log('No token found in cookies');
    return false;
  }
}

// Función auxiliar para verificar token sin redirigir
export const verificar_token_sin_redirigir = async () => {
  try {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (cookieValue) {
      const token = cookieValue.split('=')[1];
      if (token && token !== 'undefined' && token !== 'null') {
        try {
          const response = await fetch('/task', {
            method: 'GET',
            credentials: 'include'
          });
          
          if (response.ok) {
            return true;
          } else {
            // Token inválido, limpiar cookie
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            return false;
          }
        } catch (error) {
          console.log('Error validating token with server:', error);
          return false;
        }
      }
    }
    return false;
  } catch (error) {
    console.log('No token found in cookies');
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

  // Verificar si el usuario ya está logueado
  const isLoggedIn = await verificacion_token();
  if (isLoggedIn) {
    // Si está logueado, la función verificacion_token ya redirige automáticamente
    return;
  }
  
  console.log("DOM cargado");
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
});

// validar las contraseñas

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
      // redirigir a la pagina de login




    }
  } catch (error) {
    console.error('Error:', error);
    showModal('An error occurred. Please try again.');
  }
});

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


// funcion para iniciar sesion con google

document.getElementById('googleButton').addEventListener('click', () => {
  window.location.href = '/auth/google';
});










