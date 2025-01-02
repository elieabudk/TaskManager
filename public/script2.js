console.log("Hola Mundo");

async function  cargarTareas () {
    try {
        const response = await fetch('http://localhost:3000/api/cargar_tareas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
           
        });
       
        const arr = await response.json(); // Cambiar a response.json()
        if (arr) {
            const tabla = document.getElementById("Tareas");
            tabla.innerHTML = ''; // Limpiar la tabla antes de agregar tareas

            arr.forEach((elemento, index) => {
                const nuevaFila = document.createElement("tr");

                // Celda para el checkbox
                const celdaCheck = document.createElement("td");
                const check = document.createElement("input");
                check.type = "checkbox";
                check.checked = elemento.status === "true";
                celdaCheck.appendChild(check);

                // Celda para el texto de la tarea
                const celdaTexto = document.createElement("td");
                const parrafo = document.createElement("p");
                parrafo.textContent = elemento.task;
                parrafo.style.textDecoration = elemento.completada ? "line-through" : "none";
                celdaTexto.appendChild(parrafo);

                // Celda para la etiqueta de estado
                const celdaEstado = document.createElement("td");
                const label = document.createElement("span");
                label.textContent = elemento.status ? "Pendiente2" : "Completado";
                label.className = elemento.status ?  "badge bg-danger": "badge bg-success";
                celdaEstado.appendChild(label);

                // Celda para el botón de borrar
                const celdaBoton = document.createElement("td");
                const boton = document.createElement("button");
                boton.textContent = "Borrar";
                boton.className = "borrar btn btn-danger btn-sm";
                boton.id = elemento._id;
                celdaBoton.appendChild(boton);

                // fecha de creacion
                const celdaFecha = document.createElement("td");
                const fecha = document.createElement("span");
                fecha.textContent = elemento.createdAt;
                celdaFecha.appendChild(fecha);

                // Agregar todas las celdas a la fila
                nuevaFila.appendChild(celdaCheck);
                nuevaFila.appendChild(celdaTexto);
                nuevaFila.appendChild(celdaEstado);
                nuevaFila.appendChild(celdaBoton);
                nuevaFila.appendChild(celdaFecha);

                // Agregar la fila a la tabla
                tabla.appendChild(nuevaFila);


                check.addEventListener("input", async function() {

                    
                    elemento.completada = this.checked;
                    label.textContent = this.checked ? "Completado3" : "Pendiente3";
                    label.className = this.checked ? "badge bg-success" : "badge bg-danger";
                    parrafo.style.textDecoration = this.checked ? "line-through" : "none";
                    fecha.textContent = this.checked ? new Date().toLocaleString() : new Date().toLocaleString();

                    const id = boton.id;
                    try {
                        const response = await fetch(`http://localhost:3000/api/NuevoDato/${id}`, {
                            method: 'PUT',
                            headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ status: this.checked }),
                        credentials: 'include'
                    });
                    const arr = await response.json();
                    
                    } catch (error) {
                        console.error("Error al cambiar estado:", error);
                    }

                  
                });
            });
        }
    } catch (error) {
        console.error("Error al cargar tareas:", error);
    }
}


document.getElementById("Agregar").addEventListener("click", async function() {
    let tareaTexto = document.getElementById("taskInput").value;
    try {
        const response = await fetch('http://localhost:3000/api/agregar_tarea', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: tareaTexto }),
        credentials: 'include'
    });
    const arr = await response.json();
    
     cargarTareas();
    } catch (error) {
        console.error("Error al agregar tarea:", error);
    }
    
});

// evento de click en la tabla para borrar una tarea
document.getElementById("Tareas").addEventListener('click', async function(event) {
    if (event.target.classList.contains('borrar')) {
        const taskRow = event.target.closest('tr');
        const taskText = taskRow.querySelector('p').textContent.trim();

        const id = taskRow.querySelector('button').id;

        let response = await fetch(`http://localhost:3000/api/borrar_tarea/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const arr = await response.json(); // Cambiar a response.json()
        cargarTareas();
        //const index = arr.findIndex(t => t.task === taskText);

       // if (index !== -1) {
            //tareas.splice(index, 1);
            //guardarTareas(tareas);
            //taskRow.remove();
       // }
    }
});

document.getElementById("Resetear").addEventListener("click", function() {
    document.getElementById("Tareas").innerHTML = "";
    localStorage.removeItem("tareas");
});

document.addEventListener('DOMContentLoaded', cargarTareas);

document.getElementById("taskInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evitar el comportamiento por defecto del Enter
        document.getElementById("Agregar").click(); // Simular el clic en el botón "Agregar"
    }
});
