const https = require('https');

// Configuración para crear el repositorio
const postData = JSON.stringify({
  name: 'VC_Compra',
  description: 'Aplicación web para gestión de listas de compras online con autenticación y sincronización',
  homepage: 'https://CEOAlmaloco.github.io/VC_Compra',
  private: false,
  has_issues: true,
  has_wiki: true,
  has_downloads: true,
  auto_init: false
});

const options = {
  hostname: 'api.github.com',
  port: 443,
  path: '/user/repos',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'User-Agent': 'VC-Compra-App'
  }
};

console.log('🚀 Creando repositorio en GitHub...');
console.log('📝 Nombre: VC_Compra');
console.log('👤 Usuario: CEOAlmaloco');
console.log('🌐 URL: https://CEOAlmaloco.github.io/VC_Compra');

const req = https.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 201) {
      console.log('✅ Repositorio creado exitosamente!');
      console.log('📋 Próximos pasos:');
      console.log('1. Ejecuta: git push -u origin main');
      console.log('2. Ejecuta: npm run deploy');
      console.log('3. Ve a Settings > Pages en GitHub');
      console.log('4. Selecciona rama gh-pages');
    } else {
      console.log('❌ Error creando repositorio:');
      console.log('Status:', res.statusCode);
      console.log('Response:', data);
      console.log('\n💡 Asegúrate de:');
      console.log('- Tener permisos para crear repositorios');
      console.log('- El repositorio no exista ya');
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Error de conexión:', e.message);
});

req.write(postData);
req.end(); 