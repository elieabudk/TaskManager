# API Documentation - Task Manager

## Base URL
```
http://localhost:3000
```

## Autenticación

La API utiliza JWT (JSON Web Tokens) almacenados en cookies HTTPOnly para la autenticación. Todas las rutas protegidas requieren un token válido.

### Headers requeridos
```
Content-Type: application/json
```

### Cookies
```
token: <jwt_token>
```

---

## Endpoints de Autenticación

### POST /api/registro
Registra un nuevo usuario en el sistema.

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com", 
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "Usuario registrado exitosamente"
}
```

**Errores:**
- `400` - Email ya existe
- `400` - Datos de entrada inválidos

---

### POST /api/login
Inicia sesión de un usuario existente.

**Body:**
```json
{
  "email": "juan@ejemplo.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Inicio de sesión exitoso."
}
```

**Errores:**
- `404` - Usuario no encontrado
- `401` - Credenciales inválidas
- `400` - Email inválido

---

### POST /api/cerrar_sesion
Cierra la sesión del usuario actual (limpia la cookie).

**Response (200):**
```json
{
  "message": "Sesión cerrada exitosamente"
}
```

---

### GET /auth/google
Inicia el flujo de autenticación con Google OAuth2.

**Response:** Redirección a Google

---

### GET /auth/google/callback
Callback de Google OAuth2 (manejo interno).

**Response:** Redirección a `/task`

---

## Endpoints de Tareas

### POST /api/agregar_tarea
🔒 **Requiere autenticación**

Crea una nueva tarea para el usuario autenticado.

**Body:**
```json
{
  "task": "Completar documentación del proyecto"
}
```

**Response (201):**
```json
{
  "_id": "64a1b2c3d4e5f6789012345",
  "email": "juan@ejemplo.com",
  "task": "Completar documentación del proyecto",
  "status": "false",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Errores:**
- `401` - Token inválido o expirado
- `500` - Error al crear la tarea

---

### POST /api/cargar_tareas
🔒 **Requiere autenticación**

Obtiene todas las tareas del usuario autenticado.

**Response (200):**
```json
[
  {
    "_id": "64a1b2c3d4e5f6789012345",
    "email": "juan@ejemplo.com",
    "task": "Completar documentación del proyecto",
    "status": "false",
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  {
    "_id": "64a1b2c3d4e5f6789012346",
    "email": "juan@ejemplo.com", 
    "task": "Revisar código",
    "status": "true",
    "createdAt": "2024-01-15T09:15:00.000Z"
  }
]
```

**Errores:**
- `401` - Token inválido o expirado
- `500` - Error al cargar las tareas

---

### DELETE /api/eliminar_tarea/:id
🔒 **Requiere autenticación**

Elimina una tarea específica por su ID.

**Parámetros:**
- `id` - ID de la tarea a eliminar

**Response (200):**
```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

**Errores:**
- `401` - Token inválido o expirado
- `404` - Tarea no encontrada

---

### PUT /api/NuevoDato/:id
🔒 **Requiere autenticación**

Actualiza el estado de una tarea (completada/pendiente).

**Parámetros:**
- `id` - ID de la tarea a actualizar

**Body:**
```json
{
  "status": "true"
}
```

**Response (200):**
```json
{
  "acknowledged": true,
  "modifiedCount": 1,
  "upsertedId": null,
  "upsertedCount": 0,
  "matchedCount": 1
}
```

**Errores:**
- `401` - Token inválido o expirado
- `404` - Tarea no encontrada

---

### DELETE /api/resetear_tareas
🔒 **Requiere autenticación**

Elimina todas las tareas del usuario autenticado.

**Response (200):**
```json
{
  "acknowledged": true,
  "deletedCount": 5
}
```

**Errores:**
- `401` - Token inválido o expirado

---

## Páginas Web

### GET /inicio
Página de login y registro.

**Response:** HTML page

---

### GET /task
🔒 **Requiere autenticación**

Panel principal de gestión de tareas.

**Response:** HTML page

**Errores:**
- `302` - Redirección a `/inicio` si no está autenticado

---

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | Operación exitosa |
| 201 | Recurso creado exitosamente |
| 302 | Redirección |
| 400 | Datos de entrada inválidos |
| 401 | No autorizado / Token inválido |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

---

## Ejemplos de Uso

### Flujo completo con cURL

1. **Registrar usuario:**
```bash
curl -X POST http://localhost:3000/api/registro \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Pérez","email":"juan@ejemplo.com","password":"password123"}'
```

2. **Iniciar sesión:**
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"juan@ejemplo.com","password":"password123"}'
```

3. **Agregar tarea:**
```bash
curl -X POST http://localhost:3000/api/agregar_tarea \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"task":"Mi nueva tarea"}'
```

4. **Cargar tareas:**
```bash
curl -X POST http://localhost:3000/api/cargar_tareas \
  -H "Content-Type: application/json" \
  -b cookies.txt
```

---

## Modelos de Datos

### Usuario (User)
```javascript
{
  id: String (UUID),
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed)
}
```

### Tarea (Data)
```javascript
{
  _id: ObjectId,
  email: String (required),
  task: String (required),
  status: String (default: "false"),
  createdAt: Date (default: Date.now)
}
``` 