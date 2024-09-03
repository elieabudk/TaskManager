# Gestor de Tareas

Este es un gestor de tareas simple construido con HTML, CSS y JavaScript. Te permite agregar, completar, y eliminar tareas, además de guardar el estado de las tareas en el `localStorage` para mantenerlas entre sesiones.

## Características

- **Agregar Tareas:** Puedes agregar nuevas tareas escribiendo en el campo de texto y presionando el botón "Agregar" o la tecla "Enter".
- **Completar Tareas:** Puedes marcar una tarea como completada utilizando la casilla de verificación. El texto de la tarea se tachará y el estado se guardará en `localStorage`.
- **Eliminar Tareas:** Puedes eliminar una tarea utilizando el botón "borrar" que se encuentra al lado de cada tarea.
- **Guardar Estado:** El estado de las tareas (completadas o pendientes) se guarda en `localStorage`, por lo que persisten entre recargas de la página.
- **Restablecer Lista:** Puedes restablecer toda la lista de tareas y limpiar el `localStorage` con el botón "Resetear".

## Cómo utilizar

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/gestor-de-tareas.git
   ```


2. Navega a la carpeta del proyecto:
```bash
cd gestor-de-tareas
```
3-Abre el archivo index.html en tu navegador favorito.

4-Empieza a agregar tus tareas.

Código principal
El archivo JavaScript principal (script.js) maneja la lógica para agregar, completar, eliminar y guardar tareas. A continuación se describe brevemente cada función:

cargarTareas(): Carga las tareas desde localStorage y las muestra en la página.
guardarTareas(tareas): Guarda la lista de tareas en localStorage.
Manejo de Eventos:
click en "Agregar" para añadir una tarea nueva.
input en la casilla de verificación para completar una tarea.
click en "borrar" para eliminar una tarea específica.
click en "Resetear" para limpiar todas las tareas.
keydown en el campo de entrada para agregar tareas al presionar "Enter".
Requisitos
Un navegador web moderno que soporte JavaScript y localStorage.
Contribuciones
Las contribuciones son bienvenidas. Puedes crear un fork del proyecto, hacer tus modificaciones y enviar un pull request.
