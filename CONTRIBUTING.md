# Guía de Contribución 🤝

¡Gracias por tu interés en contribuir al Task Manager! Esta guía te ayudará a empezar.

## 📋 Tabla de Contenidos

1. [Código de Conducta](#código-de-conducta)
2. [¿Cómo contribuir?](#cómo-contribuir)
3. [Configuración del Entorno](#configuración-del-entorno)
4. [Proceso de Desarrollo](#proceso-de-desarrollo)
5. [Estándares de Código](#estándares-de-código)
6. [Reportar Bugs](#reportar-bugs)
7. [Sugerir Mejoras](#sugerir-mejoras)

## 📜 Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que respetes este código:

- **Sé respetuoso**: Trata a todos con respeto y cortesía
- **Sé inclusivo**: Bienvenido a colaboradores de todos los orígenes
- **Sé constructivo**: Proporciona feedback útil y constructivo
- **Sé profesional**: Mantén las discusiones técnicas enfocadas y profesionales

## 🚀 ¿Cómo contribuir?

### Formas de contribuir

1. **Reportar bugs** 🐛
2. **Sugerir nuevas características** ✨
3. **Mejorar documentación** 📚
4. **Escribir código** 💻
5. **Revisar Pull Requests** 👀

### Primeros pasos

1. **Fork** el repositorio
2. **Clona** tu fork localmente
3. **Crea** una rama para tu contribución
4. **Haz** tus cambios
5. **Testa** tus cambios
6. **Submite** un Pull Request

## ⚙️ Configuración del Entorno

### Requisitos previos

- Node.js v14 o superior
- MongoDB (local o Atlas)
- Git

### Configuración inicial

```bash
# 1. Clonar tu fork
git clone https://github.com/tu-usuario/TaskManager.git
cd TaskManager

# 2. Agregar el repositorio original como upstream
git remote add upstream https://github.com/elie-abud/TaskManager.git

# 3. Instalar dependencias
cd server
npm install

# 4. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# 5. Iniciar la aplicación
npm run dev
```

## 🔄 Proceso de Desarrollo

### 1. Crear una rama

```bash
# Crear una rama desde main
git checkout main
git pull upstream main
git checkout -b feature/nombre-de-tu-feature
```

### 2. Hacer cambios

- Realiza cambios pequeños y enfocados
- Escribe mensajes de commit descriptivos
- Sigue las convenciones de código

### 3. Probar cambios

```bash
# Verificar que la aplicación funciona
npm start

# Probar funcionalidades modificadas
# - Login/registro
# - CRUD de tareas
# - OAuth2 con Google
```

### 4. Actualizar tu rama

```bash
# Mantener tu rama actualizada
git fetch upstream
git rebase upstream/main
```

### 5. Enviar Pull Request

```bash
# Push a tu fork
git push origin feature/nombre-de-tu-feature

# Crear PR en GitHub
```

## 📝 Estándares de Código

### JavaScript

```javascript
// ✅ Bueno: Usar const/let en lugar de var
const userEmail = 'user@ejemplo.com';
let taskCount = 0;

// ✅ Bueno: Nombres descriptivos
const getUserTasks = async (email) => {
  // ...
};

// ✅ Bueno: Manejo de errores
try {
  const tasks = await model_data.find({ email });
  return tasks;
} catch (error) {
  console.error('Error al cargar tareas:', error);
  throw error;
}
```

### Estructura de archivos

```
server/
├── controllers/     # Lógica de negocio
├── models/         # Modelos de datos
├── routes/         # Definición de rutas
├── middlewares/    # Middlewares personalizados
└── config.js       # Configuración
```

### Convenciones de nombres

- **Archivos**: `snake_case.js`
- **Funciones**: `camelCase`
- **Constantes**: `UPPER_CASE`
- **Clases**: `PascalCase`

### Comentarios

```javascript
// ✅ Bueno: Comentarios descriptivos
// Verificar si el usuario está autenticado antes de proceder
const isAuthenticated = (req, res, next) => {
  // ...
};

// ✅ Bueno: Documentar funciones complejas
/**
 * Crea una nueva tarea para el usuario autenticado
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
exports.crearTarea = async (req, res) => {
  // ...
};
```

## 🐛 Reportar Bugs

### Antes de reportar

1. **Busca** si el bug ya fue reportado
2. **Verifica** que sea reproducible
3. **Prueba** con la última versión

### Información a incluir

```markdown
**Descripción del bug**
Una descripción clara y concisa del problema.

**Pasos para reproducir**
1. Ve a '...'
2. Haz clic en '...'
3. Desplázate hacia '...'
4. Ve el error

**Comportamiento esperado**
Descripción de lo que esperabas que pasara.

**Screenshots**
Si aplica, agrega screenshots.

**Información del entorno:**
- OS: [e.g. Windows 10]
- Navegador: [e.g. Chrome 91]
- Versión de Node.js: [e.g. 16.14.0]
```

## ✨ Sugerir Mejoras

### Ideas de mejoras

- **UI/UX**: Mejoras en la interfaz de usuario
- **Performance**: Optimizaciones de rendimiento
- **Features**: Nuevas funcionalidades
- **Seguridad**: Mejoras de seguridad
- **Documentación**: Mejoras en docs

### Template para sugerencias

```markdown
**¿Tu solicitud está relacionada con un problema?**
Descripción clara del problema.

**Describe la solución que te gustaría**
Descripción clara de lo que quieres que pase.

**Describe alternativas que has considerado**
Otras soluciones o características que has considerado.

**Contexto adicional**
Cualquier otro contexto o screenshots.
```

## 🎯 Tipos de Contribuciones

### 🔰 Para principiantes

- Corregir typos en documentación
- Mejorar comentarios en el código
- Agregar validaciones básicas
- Mejorar mensajes de error

### 🔄 Nivel intermedio

- Implementar nuevas rutas API
- Mejorar el middleware de autenticación
- Agregar nuevas funcionalidades al frontend
- Optimizar consultas a la base de datos

### 🚀 Nivel avanzado

- Implementar tests automatizados
- Configurar CI/CD
- Implementar cache con Redis
- Agregar monitoreo y logging

## 📋 Checklist de Pull Request

### Antes de enviar

- [ ] El código sigue las convenciones del proyecto
- [ ] Los tests pasan (cuando aplique)
- [ ] La documentación está actualizada
- [ ] Los commits tienen mensajes descriptivos
- [ ] No hay código comentado innecesario
- [ ] Las variables de entorno están documentadas

### Descripción del PR

```markdown
## Descripción
Breve descripción de los cambios.

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva característica
- [ ] Cambio disruptivo
- [ ] Documentación

## Cómo probar
Pasos para probar los cambios.

## Screenshots (si aplica)
```

## 🏷️ Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Nuevas características
git commit -m "feat: agregar autenticación con Google"

# Corrección de bugs
git commit -m "fix: corregir validación de email"

# Documentación
git commit -m "docs: actualizar README con instrucciones"

# Refactoring
git commit -m "refactor: reorganizar controladores"

# Tests
git commit -m "test: agregar tests para auth middleware"
```

## 📞 Obtener Ayuda

¿Necesitas ayuda? Aquí tienes opciones:

1. **[Issues](https://github.com/tu-usuario/TaskManager/issues)** - Para preguntas técnicas
2. **[Discussions](https://github.com/tu-usuario/TaskManager/discussions)** - Para discusiones generales
3. **[Email](mailto:tu-email@ejemplo.com)** - Para contacto directo

## 🙏 Reconocimientos

¡Todos los contribuidores serán reconocidos! Tu contribución aparecerá en:

- Lista de contribuidores en GitHub
- Sección de agradecimientos en el README
- Release notes cuando aplique

---

**¡Gracias por contribuir al Task Manager!** 🚀 