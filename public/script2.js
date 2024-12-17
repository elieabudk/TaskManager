console.log("Hola Mundo");

function cargarTareas() {
    try {
        const arrString = localStorage.getItem("tareas");
        if (arrString) {
            const arr = JSON.parse(arrString);
            const tabla = document.getElementById("Tareas");
            tabla.innerHTML = ''; // Limpiar la tabla antes de agregar tareas

            arr.forEach((elemento, index) => {
                const nuevaFila = document.createElement("tr");

                // Celda para el checkbox
                const celdaCheck = document.createElement("td");
                const check = document.createElement("input");
                check.type = "checkbox";
                check.checked = elemento.completada;
                celdaCheck.appendChild(check);

                // Celda para el texto de la tarea
                const celdaTexto = document.createElement("td");
                const parrafo = document.createElement("p");
                parrafo.textContent = elemento.texto;
                parrafo.style.textDecoration = elemento.completada ? "line-through" : "none";
                celdaTexto.appendChild(parrafo);

                // Celda para la etiqueta de estado
                const celdaEstado = document.createElement("td");
                const label = document.createElement("span");
                label.textContent = elemento.completada ? "Completado" : "Pendiente";
                label.className = elemento.completada ? "badge bg-success" : "badge bg-danger";
                celdaEstado.appendChild(label);

                // Celda para el botón de borrar
                const celdaBoton = document.createElement("td");
                const boton = document.createElement("button");
                boton.textContent = "Borrar";
                boton.className = "borrar btn btn-danger btn-sm";
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


                check.addEventListener("input", function() {
                    elemento.completada = this.checked;
                    label.textContent = this.checked ? "Completado" : "Pendiente";
                    label.className = this.checked ? "badge bg-success" : "badge bg-danger";
                    parrafo.style.textDecoration = this.checked ? "line-through" : "none";
                    fecha.textContent = this.checked ? new Date().toLocaleString() : new Date().toLocaleString();

                    // Guardar cambios en localStorage
                    guardarTareas(arr);
                });
            });
        }
    } catch (error) {
        console.error("Error al cargar tareas:", error);
    }
}

function guardarTareas(tareas) {
    try {
        localStorage.setItem("tareas", JSON.stringify(tareas));
    } catch (error) {
        console.error("Error al guardar tareas en localStorage:", error);
    }
}

document.getElementById("Agregar").addEventListener("click", function() {
    let tareaTexto = document.getElementById("taskInput").value;
    if (tareaTexto) {
        const tabla = document.getElementById("Tareas");

        // Crear una nueva fila
        const nuevaFila = document.createElement("tr");

        // Celda para el checkbox
        const celdaCheck = document.createElement("td");
        const check = document.createElement("input");
        check.type = "checkbox";
        //check.setAttribute("checked", "checked");
        celdaCheck.appendChild(check);

        // Celda para el texto de la tarea
        const celdaTexto = document.createElement("td");
        const parrafo = document.createElement("p");
        parrafo.textContent = tareaTexto;
        celdaTexto.appendChild(parrafo);

        // Celda para la etiqueta de estado
        const celdaEstado = document.createElement("td");
        const label = document.createElement("span");
        label.textContent = "Pendiente";
        label.className = "badge bg-danger";
        celdaEstado.appendChild(label);

        // Celda para el botón de borrar
        const celdaBoton = document.createElement("td");
        const boton = document.createElement("button");
        boton.textContent = "Borrar";
        boton.className = "borrar btn btn-danger btn-sm";
        celdaBoton.appendChild(boton);

        // fecha de creacion
        const celdaFecha = document.createElement("td");
        const fecha = document.createElement("span");
        fecha.textContent = new Date().toLocaleString();
        celdaFecha.appendChild(fecha);
        

        // Agregar todas las celdas a la fila
        nuevaFila.appendChild(celdaCheck);
        nuevaFila.appendChild(celdaTexto);
        nuevaFila.appendChild(celdaEstado);
        nuevaFila.appendChild(celdaBoton);
        nuevaFila.appendChild(celdaFecha);


        // Agregar la fila a la tabla
        tabla.appendChild(nuevaFila);

        let tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
        tareasGuardadas.push({ texto: tareaTexto, completada: false, createdAt: new Date().toLocaleString() });
        guardarTareas(tareasGuardadas);

        check.addEventListener("input", function() {
            let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
            const index = tareas.findIndex(t => t.texto === tareaTexto);
            if (index !== -1) {
                tareas[index].completada = this.checked;
                label.textContent = this.checked ? "Completado" : "Pendiente";
                label.className = this.checked ? "badge bg-success" : "badge bg-danger";
                parrafo.style.textDecoration = this.checked ? "line-through" : "none";
                fecha.textContent = this.checked ? new Date().toLocaleString() : new Date().toLocaleString();
                guardarTareas(tareas);
            }
        });

        //document.getElementById("taskInput").value = "";
    } else {
        alert("Debe llenar el campo");
    }
});
// evento de click en la tabla para borrar una tarea
document.getElementById("Tareas").addEventListener('click', function(event) {
    if (event.target.classList.contains('borrar')) {
        const taskRow = event.target.closest('tr');
        const taskText = taskRow.querySelector('p').textContent.trim();

        let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        const index = tareas.findIndex(t => t.texto === taskText);

        if (index !== -1) {
            tareas.splice(index, 1);
            guardarTareas(tareas);
            taskRow.remove();
        }
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
