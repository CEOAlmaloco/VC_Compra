# 🚀 Guía de Despliegue a GitHub Pages

## 📋 Prerrequisitos

1. **Cuenta de GitHub** activa
2. **Node.js** instalado (versión 16 o superior)
3. **Git** instalado y configurado
4. **Proyecto** funcionando localmente

## 🔧 Pasos para el Despliegue

### **Paso 1: Crear Repositorio en GitHub**

1. Ve a [GitHub.com](https://github.com)
2. Clic en **"New repository"**
3. Nombre: `VC_Compra`
4. Descripción: `Aplicación web para gestión de listas de compras online`
5. **NO** marques "Add a README file" (ya tenemos uno)
6. Clic en **"Create repository"**

### **Paso 2: Configurar el Proyecto Local**

```bash
# 1. Inicializar Git (si no está hecho)
git init

# 2. Agregar todos los archivos
git add .

# 3. Hacer commit inicial
git commit -m "Initial commit: VC Compra app"

# 4. Agregar el remote de GitHub (REEMPLAZA TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/VC_Compra.git

# 5. Subir al repositorio
git branch -M main
git push -u origin main
```

### **Paso 3: Actualizar Configuración**

**IMPORTANTE:** Edita el archivo `package.json` y cambia la línea:

```json
"homepage": "https://tu-usuario.github.io/VC_Compra"
```

Por tu nombre de usuario real:

```json
"homepage": "https://TU-USUARIO-REAL.github.io/VC_Compra"
```

### **Paso 4: Instalar Dependencias de Despliegue**

```bash
# Instalar gh-pages (ya está instalado)
npm install --save-dev gh-pages
```

### **Paso 5: Construir y Desplegar**

```bash
# Construir la aplicación
npm run build

# Desplegar a GitHub Pages
npm run deploy
```

### **Paso 6: Configurar GitHub Pages**

1. Ve a tu repositorio en GitHub
2. Clic en **"Settings"**
3. Scroll hacia abajo hasta **"Pages"**
4. En **"Source"**, selecciona **"Deploy from a branch"**
5. En **"Branch"**, selecciona **"gh-pages"** y **"/ (root)"**
6. Clic en **"Save"**

## 🔍 Verificar el Despliegue

### **URL de la Aplicación**
Tu aplicación estará disponible en:
```
https://TU-USUARIO.github.io/VC_Compra
```

### **Tiempo de Espera**
- ⏰ **5-10 minutos** para el primer despliegue
- ⚡ **1-2 minutos** para actualizaciones posteriores

### **Verificar Estado**
1. Ve a la pestaña **"Actions"** en tu repositorio
2. Verifica que el workflow de GitHub Pages esté completado
3. Clic en el enlace de la URL para probar la aplicación

## 🛠️ Solución de Problemas

### **Error: "gh-pages branch not found"**
```bash
# Forzar la creación de la rama gh-pages
npm run deploy -- --force
```

### **Error: "Build failed"**
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

### **Error: "Permission denied"**
```bash
# Verificar configuración de Git
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

### **Error: "Homepage not found"**
- Verifica que la URL en `package.json` sea correcta
- Asegúrate de que el repositorio sea público
- Verifica que GitHub Pages esté habilitado en Settings

## 🔄 Actualizaciones Futuras

Para actualizar la aplicación después de cambios:

```bash
# 1. Hacer cambios en el código
# 2. Commit y push
git add .
git commit -m "Descripción de los cambios"
git push origin main

# 3. Desplegar
npm run deploy
```

## 📱 Configuración Adicional

### **Dominio Personalizado**
Si quieres usar un dominio personalizado:

1. Ve a **Settings > Pages**
2. En **"Custom domain"**, ingresa tu dominio
3. Crea un archivo `CNAME` en la carpeta `public/` con tu dominio
4. Despliega nuevamente: `npm run deploy`

### **HTTPS Forzado**
GitHub Pages proporciona HTTPS automáticamente. No necesitas configuración adicional.

## 🎯 Checklist de Despliegue

- [ ] Repositorio creado en GitHub
- [ ] Git inicializado y configurado
- [ ] Remote origin agregado
- [ ] Homepage actualizada en package.json
- [ ] gh-pages instalado
- [ ] Aplicación construida exitosamente
- [ ] Despliegue ejecutado
- [ ] GitHub Pages habilitado en Settings
- [ ] Aplicación accesible en la URL

## 🆘 Soporte

Si tienes problemas:

1. **Revisa la consola** del navegador para errores
2. **Verifica los logs** de GitHub Actions
3. **Consulta la documentación** de GitHub Pages
4. **Abre un issue** en el repositorio

---

**¡Tu aplicación estará disponible en GitHub Pages! 🚀** 