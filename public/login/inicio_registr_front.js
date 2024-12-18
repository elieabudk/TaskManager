// tomar los datos del login y registro 

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM cargado");
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('Password').value;
      
  
      try {
          const response = await fetch(`http://localhost:3000/api/login`, {
              method: 'POST', credentials: 'include',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ "email": email, "password": password })
          });
  
          console.log('Email:', email);
          console.log('Password:', password);
          
          const data = await response.json();
          
          if (response.ok) {
            window.location.href = '/public/index2.html';
          } else {
              alert(data.message);
          }
      } catch (error) {
          console.error('Error:', error);
          
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
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
    } catch (error) {
        console.error('Error:', error);
        
    }
});




   








