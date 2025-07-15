/**
 * Datos de usuario de prueba para verificar persistencia
 */

export const testUser = {
  username: 'usuario_prueba',
  email: 'prueba@test.com',
  password: 'Test123!@#'
};

export const testUserCredentials = {
  login: {
    email: 'prueba@test.com',
    password: 'Test123!@#'
  },
  register: {
    username: 'usuario_prueba',
    email: 'prueba@test.com',
    password: 'Test123!@#',
    confirmPassword: 'Test123!@#'
  }
};

/**
 * Función para crear usuario de prueba en localStorage
 */
export const createTestUser = () => {
  try {
    // Obtener usuarios existentes - usar la misma clave que authService
    const existingUsers = JSON.parse(localStorage.getItem('vc_compra_users') || '[]');
    
    // Verificar si el usuario de prueba ya existe
    const userExists = existingUsers.find(u => u.email === testUser.email);
    
    if (!userExists) {
      // Crear hash simple para la contraseña (en producción usar bcrypt)
      const hashedPassword = btoa(testUser.password); // Base64 simple para demo
      
      const newUser = {
        id: Date.now().toString(),
        username: testUser.username,
        email: testUser.email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        shoppingLists: []
      };
      
      // Agregar usuario
      existingUsers.push(newUser);
      localStorage.setItem('vc_compra_users', JSON.stringify(existingUsers));
      
      console.log('✅ Usuario de prueba creado:', testUser);
      return true;
    } else {
      console.log('ℹ️ Usuario de prueba ya existe');
      return false;
    }
  } catch (error) {
    console.error('❌ Error creando usuario de prueba:', error);
    return false;
  }
};

/**
 * Función para verificar si el usuario de prueba existe
 */
export const checkTestUser = () => {
  try {
    const existingUsers = JSON.parse(localStorage.getItem('vc_compra_users') || '[]');
    const userExists = existingUsers.find(u => u.email === testUser.email);
    return !!userExists;
  } catch (error) {
    console.error('Error verificando usuario de prueba:', error);
    return false;
  }
};

/**
 * Función para eliminar usuario de prueba
 */
export const removeTestUser = () => {
  try {
    const existingUsers = JSON.parse(localStorage.getItem('vc_compra_users') || '[]');
    const filteredUsers = existingUsers.filter(u => u.email !== testUser.email);
    localStorage.setItem('vc_compra_users', JSON.stringify(filteredUsers));
    console.log('🗑️ Usuario de prueba eliminado');
    return true;
  } catch (error) {
    console.error('Error eliminando usuario de prueba:', error);
    return false;
  }
}; 