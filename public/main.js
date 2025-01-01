


// creamos las peticiones a la api con fetch
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('Agregar').addEventListener('click', async () => {
        const tarea = document.getElementById('taskInput').value;
        
        try {
            const response = await fetch('http://localhost:3000/api/NuevoDato', {
                method: 'POST',
                body: JSON.stringify({ task: tarea, status: 'false'}),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.status === 401) {
                window.location.href = 'http://localhost:5501/public/login/login.html';
               
            }

            
            // Optionally handle the response data
            const data = await response.json();
            

        } catch (error) {
            console.error('Error:', error);
        }

        document.getElementById("taskInput").value = "";
    });
});
