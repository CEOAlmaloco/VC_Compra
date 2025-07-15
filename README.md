# 🛒 VC Compra - Lista de Compras Inteligente

Una aplicación web moderna para gestión de listas de compras online con funcionalidades similares a Excel, autenticación segura y sincronización de datos.

## 🚀 Características Principales

### ✨ **Funcionalidades Core**
- 📝 **Gestión de productos** con imágenes, descripciones y enlaces
- 🏷️ **Categorías y subcategorías** organizadas jerárquicamente
- 👁️ **Sistema de visibilidad** con botones de ojo para ocultar/mostrar elementos
- 💰 **Cálculo automático de totales** con exclusión de categorías
- 🔍 **Búsqueda y filtrado** avanzado de productos
- 📊 **Interfaz tipo Excel** compacta y organizada

### 🔐 **Sistema de Autenticación**
- 👤 **Registro y login** de usuarios
- 🔒 **Encriptación AES-256** para datos sensibles
- 🎫 **JWT tokens** para sesiones seguras
- 🔑 **Hash bcrypt** para contraseñas
- ☁️ **Sincronización de datos** entre dispositivos

### 💾 **Persistencia de Datos**
- 📱 **Modo offline** con localStorage
- ☁️ **Sincronización opcional** con cuenta de usuario
- 🔄 **Migración automática** de datos locales a la nube
- 📊 **Base de datos local** compatible con GitHub Pages

## 🏗️ Arquitectura del Proyecto

```
VC_Compra/
├── src/
│   ├── components/           # Componentes React
│   │   ├── Header.js         # Header con autenticación
│   │   ├── AuthModal.js      # Modal de login/registro
│   │   ├── SyncDataModal.js  # Modal de sincronización
│   │   ├── ShoppingList.js   # Lista principal de productos
│   │   ├── ProductForm.js    # Formulario de productos
│   │   └── CategoryManager.js # Gestión de categorías
│   ├── services/             # Servicios de negocio
│   │   └── authService.js    # Servicio de autenticación
│   ├── store/                # Estado global (Zustand)
│   │   └── authStore.js      # Store de autenticación
│   ├── data/                 # Datos y utilidades
│   │   └── testData.js       # Datos de prueba
│   └── App.js                # Componente principal
├── public/                   # Archivos estáticos
├── package.json              # Dependencias y scripts
└── README.md                 # Documentación
```

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- ⚛️ **React 18** - Biblioteca de UI
- 🎨 **Material-UI (MUI)** - Componentes de diseño
- 🎯 **Zustand** - Gestión de estado global
- 📝 **React Hook Form** - Formularios
- ✅ **Yup** - Validación de esquemas
- 🔄 **React Query** - Gestión de datos

### **Seguridad**
- 🔐 **JWT** - Tokens de autenticación
- 🔒 **AES-256** - Encriptación de datos
- 🔑 **bcrypt** - Hash de contraseñas
- 🛡️ **CryptoJS** - Utilidades de criptografía

### **Testing**
- 🧪 **Jest** - Framework de testing
- 🎯 **React Testing Library** - Testing de componentes
- 🐛 **MSW** - Mock Service Worker

## 🚀 Instalación y Uso

### **Prerrequisitos**
- Node.js 16+ 
- npm o yarn

### **Instalación**
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/VC_Compra.git
cd VC_Compra

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start

# Construir para producción
npm run build

# Ejecutar tests
npm test
```

### **Uso de la Aplicación**

#### **1. Modo Sin Autenticación**
- ✅ Puedes usar la aplicación inmediatamente
- 📝 Agregar productos y categorías
- 💾 Los datos se guardan en localStorage
- 🔄 Funciona completamente offline

#### **2. Crear Cuenta (Opcional)**
- 👆 Clic en "Iniciar Sesión" (esquina superior derecha)
- 📝 Seleccionar pestaña "Crear Cuenta"
- ✍️ Completar formulario de registro
- 🔐 Los datos se encriptan automáticamente

#### **3. Sincronizar Datos**
- ☁️ Al iniciar sesión, se detectan datos locales
- 🔄 Opción de subir datos locales a la nube
- 📥 Opción de descargar datos de la nube
- ⚠️ Advertencias sobre pérdida de datos

#### **4. Gestión de Productos**
- ➕ Botón "Agregar Producto" para nuevos items
- 🏷️ Asignar categorías y subcategorías
- 💰 Establecer precios en pesos chilenos (CLP)
- 🔗 Agregar enlaces de compra
- 🖼️ Incluir imágenes de productos

#### **5. Organización y Visibilidad**
- 👁️ Botones de ojo para ocultar elementos
- 📁 Categorías y subcategorías desplegables
- 🔍 Búsqueda por nombre o descripción
- 🏷️ Filtrado por categorías
- 💰 Exclusión de categorías del total

## 🔧 Configuración Avanzada

### **Variables de Entorno**
```bash
# Crear archivo .env.local
REACT_APP_JWT_SECRET=tu-clave-secreta-jwt
REACT_APP_AES_KEY=tu-clave-aes-256-bit
```

### **Personalización del Tema**
```javascript
// src/App.js
const theme = createTheme({
  palette: {
    primary: { main: '#2196F3' },
    secondary: { main: '#FF9800' },
  },
  // Personalizar más...
});
```

### **Configuración de Base de Datos**
La aplicación usa localStorage como base de datos local. Para implementar una base de datos real:

1. **Firebase Firestore**
2. **Supabase**
3. **MongoDB Atlas**
4. **PostgreSQL con Railway**

## 🧪 Testing

### **Ejecutar Tests**
```bash
# Tests en modo watch
npm test

# Tests con coverage
npm run test:coverage

# Tests en CI
npm run test:ci
```

### **Estructura de Tests**
```
src/
├── services/__tests__/
│   └── authService.test.js    # Tests del servicio de auth
├── components/__tests__/
│   ├── AuthModal.test.js      # Tests del modal de auth
│   └── ShoppingList.test.js   # Tests de la lista
└── __mocks__/
    └── localStorage.js        # Mock de localStorage
```

## 🔒 Seguridad

### **Encriptación de Datos**
- 🔐 **AES-256** para datos del usuario
- 🔑 **bcrypt** para contraseñas (12 salt rounds)
- 🎫 **JWT** con expiración de 7 días
- 🛡️ **Validación** de esquemas con Yup

### **Almacenamiento Seguro**
- 📱 **localStorage** para datos locales
- 🔒 **Encriptación** automática de datos sensibles
- 🗑️ **Limpieza** automática al cerrar sesión
- ⚠️ **Advertencias** sobre pérdida de datos

## 📱 Compatibilidad

### **Navegadores Soportados**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### **Dispositivos**
- 💻 **Desktop** - Interfaz completa
- 📱 **Tablet** - Responsive design
- 📱 **Mobile** - Optimizado para touch

## 🚀 Despliegue

### **GitHub Pages**
```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# Agregar scripts al package.json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}

# Desplegar
npm run deploy
```

### **Netlify**
```bash
# Construir y desplegar
npm run build
# Subir carpeta build a Netlify
```

### **Vercel**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

## 🤝 Contribución

### **Flujo de Desarrollo**
1. 🍴 Fork del repositorio
2. 🌿 Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. 💾 Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. 📤 Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. 🔄 Crear Pull Request

### **Estándares de Código**
- 📝 **ESLint** para linting
- 💅 **Prettier** para formateo
- 🧪 **Tests** obligatorios para nuevas funcionalidades
- 📚 **Documentación** en JSDoc

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

### **Problemas Comunes**

#### **Error de Dependencias**
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

#### **Error de localStorage**
```bash
# Verificar que el navegador soporte localStorage
# Probar en modo incógnito
# Limpiar datos del navegador
```

#### **Error de Encriptación**
```bash
# Verificar que las claves estén configuradas
# Revisar la consola del navegador
# Verificar que CryptoJS esté instalado
```

### **Contacto**
- 📧 **Email**: tu-email@ejemplo.com
- 🐛 **Issues**: GitHub Issues
- 💬 **Discusiones**: GitHub Discussions

## 🎯 Roadmap

### **Próximas Funcionalidades**
- 📊 **Estadísticas** de compras
- 📅 **Recordatorios** y notificaciones
- 🤝 **Compartir** listas entre usuarios
- 📱 **App móvil** nativa
- 🔗 **Integración** con APIs de supermercados
- 🤖 **IA** para sugerencias de productos

### **Mejoras Técnicas**
- ⚡ **PWA** (Progressive Web App)
- 🔄 **Sincronización** en tiempo real
- 📊 **Analytics** de uso
- 🌐 **Internacionalización** (i18n)
- 🎨 **Temas** personalizables

---

**¡Disfruta organizando tus compras de manera inteligente! 🛒✨** 