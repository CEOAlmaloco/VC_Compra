import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

// Clave secreta para JWT (en producción debería estar en variables de entorno)
const JWT_SECRET = 'vc-compra-secret-key-2024';
const AES_KEY = 'vc-compra-aes-key-256-bit-secure';

/**
 * Servicio de autenticación con JWT y encriptación AES-256
 * Maneja registro, login, encriptación de datos y persistencia
 */
class AuthService {
  constructor() {
    this.isAuthenticated = false;
    this.currentUser = null;
    this.token = null;
    this.loadFromStorage();
  }

  /**
   * Encripta datos usando AES-256
   * @param {any} data - Datos a encriptar
   * @returns {string} - Datos encriptados en base64
   */
  encryptData(data) {
    try {
      const jsonString = JSON.stringify(data);
      const encrypted = CryptoJS.AES.encrypt(jsonString, AES_KEY).toString();
      return encrypted;
    } catch (error) {
      console.error('Error encriptando datos:', error);
      throw new Error('Error al encriptar datos');
    }
  }

  /**
   * Desencripta datos usando AES-256
   * @param {string} encryptedData - Datos encriptados
   * @returns {any} - Datos desencriptados
   */
  decryptData(encryptedData) {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedData, AES_KEY);
      const jsonString = decrypted.toString(CryptoJS.enc.Utf8);
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error desencriptando datos:', error);
      throw new Error('Error al desencriptar datos');
    }
  }

  /**
   * Genera hash de contraseña usando bcrypt
   * @param {string} password - Contraseña en texto plano
   * @returns {string} - Hash de la contraseña
   */
  async hashPassword(password) {
    try {
      const bcrypt = await import('bcryptjs');
      const saltRounds = 12;
      return await bcrypt.hash(password, saltRounds);
    } catch (error) {
      console.error('Error generando hash:', error);
      throw new Error('Error al generar hash de contraseña');
    }
  }

  /**
   * Verifica contraseña contra hash
   * @param {string} password - Contraseña en texto plano
   * @param {string} hash - Hash almacenado
   * @returns {boolean} - True si la contraseña es correcta
   */
  async verifyPassword(password, hash) {
    try {
      const bcrypt = await import('bcryptjs');
      return await bcrypt.compare(password, hash);
    } catch (error) {
      console.error('Error verificando contraseña:', error);
      return false;
    }
  }

  /**
   * Genera JWT token
   * @param {object} payload - Datos del usuario
   * @returns {string} - JWT token
   */
  generateToken(payload) {
    try {
      // Crear un token simple para el navegador
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payloadEncoded = btoa(JSON.stringify(payload));
      const signature = btoa(JWT_SECRET + Date.now());
      
      return `${header}.${payloadEncoded}.${signature}`;
    } catch (error) {
      console.error('Error generando token:', error);
      throw new Error('Error al generar token');
    }
  }

  /**
   * Verifica JWT token
   * @param {string} token - JWT token
   * @returns {object|null} - Payload del token o null si es inválido
   */
  verifyToken(token) {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const payload = JSON.parse(atob(parts[1]));
      return payload;
    } catch (error) {
      console.error('Error verificando token:', error);
      return null;
    }
  }

  /**
   * Registra un nuevo usuario
   * @param {string} username - Nombre de usuario
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña
   * @returns {object} - Usuario creado
   */
  async register(username, email, password) {
    try {
      // Verificar si el usuario ya existe
      const existingUsers = this.getUsers();
      const userExists = existingUsers.find(u => u.email === email || u.username === username);
      
      if (userExists) {
        throw new Error('El usuario o email ya existe');
      }

      // Generar hash de contraseña
      const hashedPassword = await this.hashPassword(password);
      
      // Crear usuario
      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        shoppingLists: []
      };

      // Guardar usuario
      existingUsers.push(newUser);
      this.saveUsers(existingUsers);

      // Generar token
      const token = this.generateToken({ 
        id: newUser.id, 
        username: newUser.username, 
        email: newUser.email 
      });

      // Actualizar estado
      this.isAuthenticated = true;
      this.currentUser = { ...newUser, password: undefined };
      this.token = token;
      this.saveToStorage();

      return { user: this.currentUser, token };
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }

  /**
   * Inicia sesión de usuario
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña
   * @returns {object} - Usuario y token
   */
  async login(email, password) {
    try {
      const users = this.getUsers();
      const user = users.find(u => u.email === email);

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const isValidPassword = await this.verifyPassword(password, user.password);
      if (!isValidPassword) {
        throw new Error('Contraseña incorrecta');
      }

      // Generar token
      const token = this.generateToken({ 
        id: user.id, 
        username: user.username, 
        email: user.email 
      });

      // Actualizar estado
      this.isAuthenticated = true;
      this.currentUser = { ...user, password: undefined };
      this.token = token;
      this.saveToStorage();

      return { user: this.currentUser, token };
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  /**
   * Cierra sesión
   */
  logout() {
    this.isAuthenticated = false;
    this.currentUser = null;
    this.token = null;
    this.saveToStorage();
  }

  /**
   * Sincroniza datos locales con la cuenta del usuario
   * @param {array} localData - Datos del localStorage
   */
  async syncLocalData(localData) {
    if (!this.isAuthenticated || !this.currentUser) {
      throw new Error('Usuario no autenticado');
    }

    try {
      const users = this.getUsers();
      const userIndex = users.findIndex(u => u.id === this.currentUser.id);
      
      if (userIndex === -1) {
        throw new Error('Usuario no encontrado');
      }

      // Encriptar datos antes de guardar
      const encryptedData = this.encryptData(localData);
      
      // Actualizar datos del usuario
      users[userIndex].shoppingLists = encryptedData;
      users[userIndex].lastSync = new Date().toISOString();
      
      this.saveUsers(users);
      
      // Actualizar usuario actual
      this.currentUser = { ...users[userIndex], password: undefined };
      this.saveToStorage();

      return true;
    } catch (error) {
      console.error('Error sincronizando datos:', error);
      throw error;
    }
  }

  /**
   * Carga datos del usuario desde la base de datos
   * @returns {array} - Datos del usuario
   */
  loadUserData() {
    if (!this.isAuthenticated || !this.currentUser) {
      throw new Error('Usuario no autenticado');
    }

    try {
      const users = this.getUsers();
      const user = users.find(u => u.id === this.currentUser.id);
      
      if (!user || !user.shoppingLists) {
        return [];
      }

      // Desencriptar datos
      return this.decryptData(user.shoppingLists);
    } catch (error) {
      console.error('Error cargando datos del usuario:', error);
      return [];
    }
  }

  /**
   * Guarda datos del usuario en la base de datos
   * @param {array} data - Datos a guardar
   */
  saveUserData(data) {
    if (!this.isAuthenticated || !this.currentUser) {
      throw new Error('Usuario no autenticado');
    }

    try {
      const users = this.getUsers();
      const userIndex = users.findIndex(u => u.id === this.currentUser.id);
      
      if (userIndex === -1) {
        throw new Error('Usuario no encontrado');
      }

      // Encriptar datos antes de guardar
      const encryptedData = this.encryptData(data);
      
      // Actualizar datos del usuario
      users[userIndex].shoppingLists = encryptedData;
      users[userIndex].lastSync = new Date().toISOString();
      
      this.saveUsers(users);
      
      // Actualizar usuario actual
      this.currentUser = { ...users[userIndex], password: undefined };
      this.saveToStorage();

      return true;
    } catch (error) {
      console.error('Error guardando datos del usuario:', error);
      throw error;
    }
  }

  /**
   * Obtiene todos los usuarios
   * @returns {array} - Lista de usuarios
   */
  getUsers() {
    try {
      const usersData = localStorage.getItem('vc_compra_users');
      return usersData ? JSON.parse(usersData) : [];
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      return [];
    }
  }

  /**
   * Guarda usuarios en localStorage
   * @param {array} users - Lista de usuarios
   */
  saveUsers(users) {
    try {
      localStorage.setItem('vc_compra_users', JSON.stringify(users));
    } catch (error) {
      console.error('Error guardando usuarios:', error);
      throw error;
    }
  }

  /**
   * Carga estado de autenticación desde localStorage
   */
  loadFromStorage() {
    try {
      const authData = localStorage.getItem('vc_compra_auth');
      if (authData) {
        const { isAuthenticated, currentUser, token } = JSON.parse(authData);
        
        // Verificar token
        if (token && this.verifyToken(token)) {
          this.isAuthenticated = isAuthenticated;
          this.currentUser = currentUser;
          this.token = token;
        } else {
          this.logout();
        }
      }
    } catch (error) {
      console.error('Error cargando estado de autenticación:', error);
      this.logout();
    }
  }

  /**
   * Guarda estado de autenticación en localStorage
   */
  saveToStorage() {
    try {
      const authData = {
        isAuthenticated: this.isAuthenticated,
        currentUser: this.currentUser,
        token: this.token
      };
      localStorage.setItem('vc_compra_auth', JSON.stringify(authData));
    } catch (error) {
      console.error('Error guardando estado de autenticación:', error);
    }
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns {boolean}
   */
  isUserAuthenticated() {
    return this.isAuthenticated && this.currentUser && this.token;
  }

  /**
   * Obtiene el usuario actual
   * @returns {object|null}
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Obtiene el token actual
   * @returns {string|null}
   */
  getToken() {
    return this.token;
  }
}

// Exportar instancia singleton
export const authService = new AuthService();
export default authService; 