function cargarTareas() {
    try {
        const arrString = localStorage.getItem("tareas");
        if (arrString) {
            const arr = JSON.parse(arrString);
            const lista = document.getElementById("Tareas");
            lista.innerHTML = ''; // Limpiar la lista antes de agregar tareas

            arr.forEach((elemento, index) => {
                const parrafo = document.createElement("p");
                parrafo.innerHTML = elemento.texto;
                parrafo.style.textDecoration = elemento.completada ? "line-through" : "none";
                
                const check = document.createElement("input");
                check.type = "checkbox";
                check.checked = elemento.completada;

                const boton = document.createElement("button");
                boton.textContent = "borrar";
                boton.classList.add("borrar");

                const label = document.createElement("label");
                label.textContent = elemento.completada ? "Completado" : "Pendiente";
                label.style.background = elemento.completada ? "green" : "red";

                const nuevoElemento = document.createElement("li");
                nuevoElemento.classList.add("tarea"); // Asegúrate de agregar esta clase

                check.addEventListener("input", function() {
                    elemento.completada = this.checked;
                    label.textContent = this.checked ? "Completado" : "Pendiente";
                    label.style.background = this.checked ? "green" : "red";
                    parrafo.style.textDecoration = this.checked ? "line-through" : "none";

                    // Guardar cambios en localStorage
                    guardarTareas(arr);
                });

                nuevoElemento.appendChild(check);
                nuevoElemento.appendChild(parrafo);
                nuevoElemento.appendChild(label);
                nuevoElemento.appendChild(boton);

                lista.appendChild(nuevoElemento);
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
        const lista = document.getElementById("Tareas");

        const parrafo = document.createElement("p");
        parrafo.innerHTML = tareaTexto;

        const check = document.createElement("input");
        check.type = "checkbox";

        const boton = document.createElement("button");
        boton.textContent = "borrar";
        boton.classList.add("borrar");

        const label = document.createElement("label");
        label.textContent = "Pendiente";
        label.style.background = "red";

        const nuevoElemento = document.createElement("li");
        nuevoElemento.classList.add("tarea"); // Asegúrate de agregar esta clase

        nuevoElemento.appendChild(check);
        nuevoElemento.appendChild(parrafo);
        nuevoElemento.appendChild(label);
        nuevoElemento.appendChild(boton);

        lista.appendChild(nuevoElemento);

        let tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
        tareasGuardadas.push({ texto: tareaTexto, completada: false });
        guardarTareas(tareasGuardadas);

        check.addEventListener("input", function() {
            let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
            const index = tareas.findIndex(t => t.texto === tareaTexto);
            if (index !== -1) {
                tareas[index].completada = this.checked;
                label.textContent = this.checked ? "Completado" : "Pendiente";
                label.style.background = this.checked ? "green" : "red";
                parrafo.style.textDecoration = this.checked ? "line-through" : "none";
                guardarTareas(tareas);
            }
        });

        document.getElementById("taskInput").value = "";
    } else {
        alert("Debe llenar el campo");
    }
});

document.getElementById("Tareas").addEventListener('click', function(event) {
    if (event.target.classList.contains('borrar')) {
        const taskItem = event.target.closest('li');
        const taskParagraph = taskItem.querySelector('p');
        const taskText = taskParagraph.textContent.trim();

        let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        const index = tareas.findIndex(t => t.texto === taskText);

        if (index !== -1) {
            tareas.splice(index, 1);
            guardarTareas(tareas);
            taskItem.remove();
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




