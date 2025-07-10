# Task Manager 📋

Una aplicación web moderna para gestión de tareas con autenticación de usuarios, desarrollada con Node.js y MongoDB.

![Task Manager](public/login/task.png)

## 🚀 Características

- ✅ **Gestión completa de tareas** - Crear, editar, completar y eliminar tareas
- 🔐 **Autenticación segura** - Login/registro con JWT y OAuth2 (Google)
- 📱 **Progressive Web App (PWA)** - Instalable en dispositivos móviles y escritorio
- 👤 **Gestión de usuarios** - Registro, login y sesiones seguras
- 🎨 **Interfaz moderna** - Diseño responsivo con Bootstrap 5
- ⚡ **Tiempo real** - Actualización instantánea de estados de tareas
- 🌐 **API RESTful** - Backend estructurado con Express.js

## 🛠️ Tecnologías

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación con tokens
- **Passport.js** - Autenticación OAuth2
- **bcrypt** - Cifrado de contraseñas

### Frontend
- **HTML5/CSS3** - Estructura y estilos
- **JavaScript ES6+** - Lógica del cliente
- **Bootstrap 5** - Framework CSS
- **Service Worker** - Funcionalidad PWA

## 📋 Prerequisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v14 o superior)
- [MongoDB](https://www.mongodb.com/) (v4.4 o superior)
- [Git](https://git-scm.com/)

## ⚙️ Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/TaskManager.git
cd TaskManager
```

2. **Instalar dependencias del servidor**
```bash
cd server
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env en la carpeta server
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:
```env
JWT_SECRET=tu_jwt_secret_aqui
JWT_EXPIRES=1h
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
MONGODB_URI=mongodb://127.0.0.1:27017/Task_Manager
PORT=3000
```

4. **Iniciar MongoDB**
```bash
# En Windows
net start MongoDB

# En macOS/Linux
sudo systemctl start mongod
```

5. **Ejecutar la aplicación**
```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

6. **Abrir en el navegador**
```
http://localhost:3000/inicio
```

## 🚀 Uso

### Registro de Usuario
1. Ve a la página principal (`/inicio`)
2. Haz clic en la pestaña "Registrar"
3. Completa el formulario con tu información
4. Confirma tu contraseña
5. Haz clic en "Registrarse"

### Inicio de Sesión
1. En la página principal, usa la pestaña "Login"
2. Ingresa tu email y contraseña
3. O usa "Sign in with Google" para OAuth2
4. Serás redirigido al panel de tareas

### Gestión de Tareas
- **Agregar tarea**: Escribe en el campo de texto y haz clic en "Agregar"
- **Completar tarea**: Marca el checkbox para marcar como completada
- **Eliminar tarea**: Haz clic en el botón de eliminar (🗑️)
- **Resetear todas**: Elimina todas las tareas del usuario actual

## 📁 Estructura del Proyecto

```
TaskManager/
├── public/login/              # Frontend (Cliente)
│   ├── index2.html           # Panel principal de tareas
│   ├── login.html            # Página de login/registro
│   ├── script2.js            # Lógica de tareas
│   ├── inicio_registr_front.js  # Lógica de autenticación
│   ├── verificacion_servidor.js # Verificación de servidor
│   ├── manifest.json         # Configuración PWA
│   ├── sw.js                 # Service Worker
│   └── stilo_password.css    # Estilos personalizados
├── server/                   # Backend (Servidor)
│   ├── controllers/          # Controladores de la aplicación
│   │   ├── agregar.js       # Agregar tareas
│   │   ├── cargar_tareas.js # Cargar tareas del usuario
│   │   ├── borrar_tarea.js  # Eliminar tareas
│   │   ├── inicio_registro.js # Autenticación
│   │   ├── oauth2.js        # Configuración Google OAuth
│   │   └── userController.js # Controlador de usuarios
│   ├── models/              # Modelos de datos
│   │   ├── model_data.js    # Modelo de tareas
│   │   └── model_user.js    # Modelo de usuarios
│   ├── routes/              # Rutas de la API
│   │   └── userRoutes.js    # Rutas principales
│   ├── middlewares/         # Middlewares
│   │   └── middelwers.js    # Verificación de autenticación
│   ├── config.js            # Configuración de MongoDB
│   ├── index.js             # Servidor principal
│   └── package.json         # Dependencias del servidor
└── README.md                # Este archivo
```

## 🔌 API Endpoints

### Autenticación
- `POST /api/login` - Iniciar sesión
- `POST /api/registro` - Registrar usuario
- `GET /auth/google` - Autenticación con Google
- `POST /api/cerrar_sesion` - Cerrar sesión

### Tareas
- `POST /api/agregar_tarea` - Crear nueva tarea
- `POST /api/cargar_tareas` - Obtener tareas del usuario
- `DELETE /api/eliminar_tarea/:id` - Eliminar tarea
- `PUT /api/NuevoDato/:id` - Actualizar estado de tarea
- `DELETE /api/resetear_tareas` - Eliminar todas las tareas

### Páginas
- `GET /inicio` - Página de login/registro
- `GET /task` - Panel de tareas (requiere autenticación)

## 🔒 Seguridad

- **JWT Tokens**: Autenticación segura con tokens firmados
- **Cookies HttpOnly**: Almacenamiento seguro de tokens
- **bcrypt**: Cifrado de contraseñas con salt
- **Middleware de autenticación**: Protección de rutas sensibles
- **Validación de entrada**: Sanitización de datos del usuario

## 📱 PWA Features

- **Instalable**: Puede instalarse como app nativa
- **Offline capable**: Service Worker para funcionalidad offline
- **Responsive**: Funciona en todos los dispositivos
- **App-like**: Experiencia similar a aplicación nativa

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Elie Abud**
- GitHub: [elieabudk](https://github.com/elieabudk)
- Email: tu-email@ejemplo.com

## 🐛 Reportar Bugs

Si encuentras algún bug, por favor abre un [issue](https://github.com/tu-usuario/TaskManager/issues) con:
- Descripción del problema
- Pasos para reproducir
- Comportamiento esperado
- Screenshots (si aplica)

## ⭐ Agradecimientos

- Bootstrap por el framework CSS
- MongoDB por la base de datos
- Express.js por el framework web
- Google por OAuth2

---

⭐ **¡Si te gusta este proyecto, dale una estrella!** ⭐ 