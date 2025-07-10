# Guía de Configuración - Task Manager

Esta guía te ayudará a configurar el proyecto Task Manager paso a paso, incluyendo la configuración de Google OAuth2 y el despliegue.

## 📋 Tabla de Contenidos

1. [Configuración Local](#configuración-local)
2. [Configuración de Google OAuth2](#configuración-de-google-oauth2)
3. [Variables de Entorno](#variables-de-entorno)
4. [Base de Datos](#base-de-datos)
5. [Despliegue](#despliegue)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 Configuración Local

### 1. Clonar y preparar el proyecto
```bash
git clone https://github.com/tu-usuario/TaskManager.git
cd TaskManager
```

### 2. Instalar dependencias
```bash
cd server
npm install
```

### 3. Configurar MongoDB

#### Opción A: MongoDB Local
1. Descargar e instalar [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
2. Iniciar el servicio:

**Windows:**
```bash
net start MongoDB
```

**macOS:**
```bash
brew services start mongodb/brew/mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### Opción B: MongoDB Atlas (Cloud)
1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crear un cluster gratuito
3. Configurar acceso de red (0.0.0.0/0 para desarrollo)
4. Crear usuario de base de datos
5. Obtener la cadena de conexión

---

## 🔐 Configuración de Google OAuth2

### 1. Crear proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google+ (Google People API)

### 2. Configurar OAuth2

1. Ve a **APIs & Services > Credentials**
2. Haz clic en **Create Credentials > OAuth 2.0 Client IDs**
3. Configura la pantalla de consentimiento OAuth:
   - **Application type**: Web application
   - **Name**: Task Manager
   - **Authorized JavaScript origins**: 
     ```
     http://localhost:3000
     ```
   - **Authorized redirect URIs**:
     ```
     http://localhost:3000/auth/google/callback
     ```

### 3. Obtener credenciales

1. Copia el **Client ID** y **Client Secret**
2. Guárdalos para el archivo `.env`

---

## 📝 Variables de Entorno

### 1. Crear archivo .env

En la carpeta `server`, crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

### 2. Configurar variables

Edita el archivo `.env` con tus valores:

```env
# Configuración del servidor
PORT=3000

# JWT Configuration - Usar un secret fuerte de al menos 32 caracteres
JWT_SECRET=mi_jwt_secret_super_seguro_de_al_menos_32_caracteres_aqui
JWT_EXPIRES=1h

# Google OAuth2 Configuration
GOOGLE_CLIENT_ID=tu_google_client_id_aqui.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu_google_client_secret_aqui

# MongoDB Configuration
# Para MongoDB local:
MONGODB_URI=mongodb://127.0.0.1:27017/Task_Manager

# Para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/Task_Manager

# Entorno
NODE_ENV=development
```

### 3. Generar JWT Secret

Para generar un JWT secret seguro:

**Node.js:**
```javascript
console.log(require('crypto').randomBytes(64).toString('hex'));
```

**Online:**
```bash
openssl rand -hex 64
```

---

## 🗄️ Base de Datos

### Estructura de la Base de Datos

El proyecto crea automáticamente las siguientes colecciones:

#### Users Collection
```javascript
{
  _id: ObjectId,
  id: String (UUID),
  name: String,
  email: String (único),
  password: String (hasheado),
  __v: Number
}
```

#### Data Collection (Tareas)
```javascript
{
  _id: ObjectId,
  email: String,
  task: String,
  status: String ("true" | "false"),
  createdAt: Date,
  __v: Number
}
```

### Inicialización

La base de datos se inicializa automáticamente al iniciar el servidor. No se requiere configuración manual adicional.

---

## 🚀 Despliegue

### Desarrollo Local

```bash
# Iniciar en modo desarrollo (con nodemon)
npm run dev

# Iniciar en modo producción
npm start
```

### Despliegue en Producción

#### Heroku

1. **Preparar el proyecto:**
```bash
# Crear Procfile en la raíz del proyecto
echo "web: node server/index.js" > Procfile
```

2. **Configurar variables de entorno en Heroku:**
```bash
heroku config:set JWT_SECRET=tu_jwt_secret
heroku config:set GOOGLE_CLIENT_ID=tu_google_client_id
heroku config:set GOOGLE_CLIENT_SECRET=tu_google_client_secret
heroku config:set MONGODB_URI=tu_mongodb_atlas_uri
heroku config:set NODE_ENV=production
```

3. **Actualizar URLs de OAuth2:**
   - Authorized JavaScript origins: `https://tu-app.herokuapp.com`
   - Authorized redirect URIs: `https://tu-app.herokuapp.com/auth/google/callback`

#### Netlify + MongoDB Atlas

Para el frontend estático en Netlify y backend en otro servicio:

1. **Frontend:** Subir carpeta `public/login` a Netlify
2. **Backend:** Desplegar en Heroku, Railway, o DigitalOcean
3. **Actualizar URLs** en el frontend para apuntar al backend desplegado

---

## 🔧 Troubleshooting

### Problemas Comunes

#### 1. Error de conexión a MongoDB
```
Error en la conexión a la base de datos
```

**Solución:**
- Verificar que MongoDB esté ejecutándose
- Comprobar la URI de conexión en `.env`
- Para Atlas, verificar configuración de red y credenciales

#### 2. Error de OAuth2
```
Error: redirect_uri_mismatch
```

**Solución:**
- Verificar que las URLs en Google Cloud Console coincidan exactamente
- No usar `localhost` en producción
- Incluir protocolo (http/https) en las URLs

#### 3. Error de JWT
```
Token inválido o expirado
```

**Solución:**
- Verificar que `JWT_SECRET` sea el mismo en todas las instancias
- Comprobar que el secret tenga al menos 32 caracteres
- Limpiar cookies del navegador

#### 4. CORS Error
```
Access to fetch blocked by CORS policy
```

**Solución:**
- Verificar configuración de CORS en `server/index.js`
- En producción, configurar origins específicos
- Comprobar que las URLs coincidan

### Logs y Debugging

#### Habilitar logs detallados:
```bash
# En desarrollo
DEBUG=* npm run dev

# Morgan está configurado para logs de requests
```

#### Verificar estado del servidor:
```bash
# Verificar puerto
netstat -an | grep 3000

# Verificar MongoDB
mongo --eval "db.stats()"
```

### Scripts útiles

#### Resetear base de datos:
```javascript
// En MongoDB shell
use Task_Manager
db.users.drop()
db.data.drop()
```

#### Verificar JWT:
```javascript
// En Node.js
const jwt = require('jsonwebtoken');
const token = 'tu_token_aqui';
console.log(jwt.verify(token, process.env.JWT_SECRET));
```

---

## 📞 Soporte

Si encuentras problemas adicionales:

1. Revisa los logs del servidor
2. Verifica las variables de entorno
3. Comprueba la configuración de OAuth2
4. Consulta la [documentación de la API](./API.md)
5. Abre un [issue en GitHub](https://github.com/tu-usuario/TaskManager/issues)

---

## ✅ Checklist de Configuración

- [ ] Node.js instalado (v14+)
- [ ] MongoDB configurado y ejecutándose
- [ ] Dependencias instaladas (`npm install`)
- [ ] Archivo `.env` creado y configurado
- [ ] Google OAuth2 configurado
- [ ] JWT secret generado (32+ caracteres)
- [ ] URLs de OAuth2 configuradas correctamente
- [ ] Servidor iniciado sin errores
- [ ] Aplicación accesible en `http://localhost:3000/inicio`
- [ ] Login/registro funcionando
- [ ] Gestión de tareas operativa
- [ ] OAuth2 con Google funcionando 