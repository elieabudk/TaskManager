// tomar los datos del login y registro 

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM cargado");
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('Password').value;
      console.log("datos leidos");
  
      try {
          const response = await fetch(`http://localhost:3000/users/login`, {
              method: 'POST',
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
          alert('Error de conexión con el servidor');
      }
  });
});
       


const passwordInput = document.getElementById("registerPassword");
const confirmPasswordInput = document.getElementById("registerConfirmPassword");
const statusDots = document.querySelectorAll(".status-dot");

function validatePasswords() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (password === confirmPassword && password !== "") {
    statusDots.forEach(dot => {
      dot.classList.remove("error");
      dot.classList.add("success");
      
    });
  } else {
    statusDots.forEach(dot => {
      dot.classList.remove("success");
      dot.classList.add("error");
    });
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
    
});




   








