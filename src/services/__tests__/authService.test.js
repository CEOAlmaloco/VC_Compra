import authService from '../authService';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('AuthService', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
    
    // Reset auth service state
    authService.isAuthenticated = false;
    authService.currentUser = null;
    authService.token = null;
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      localStorageMock.getItem.mockReturnValue('[]');
      
      const result = await authService.register('testuser', 'test@example.com', 'password123');
      
      expect(result.user).toBeDefined();
      expect(result.user.username).toBe('testuser');
      expect(result.user.email).toBe('test@example.com');
      expect(result.token).toBeDefined();
      expect(authService.isAuthenticated).toBe(true);
    });

    it('should throw error if user already exists', async () => {
      const existingUsers = [{
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword'
      }];
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingUsers));
      
      await expect(
        authService.register('testuser', 'test@example.com', 'password123')
      ).rejects.toThrow('El usuario o email ya existe');
    });
  });

  describe('login', () => {
    it('should login successfully with correct credentials', async () => {
      const hashedPassword = await authService.hashPassword('password123');
      const users = [{
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        password: hashedPassword
      }];
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(users));
      
      const result = await authService.login('test@example.com', 'password123');
      
      expect(result.user).toBeDefined();
      expect(result.user.username).toBe('testuser');
      expect(result.token).toBeDefined();
      expect(authService.isAuthenticated).toBe(true);
    });

    it('should throw error with incorrect password', async () => {
      const hashedPassword = await authService.hashPassword('password123');
      const users = [{
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        password: hashedPassword
      }];
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(users));
      
      await expect(
        authService.login('test@example.com', 'wrongpassword')
      ).rejects.toThrow('Contraseña incorrecta');
    });

    it('should throw error if user not found', async () => {
      localStorageMock.getItem.mockReturnValue('[]');
      
      await expect(
        authService.login('nonexistent@example.com', 'password123')
      ).rejects.toThrow('Usuario no encontrado');
    });
  });

  describe('encryption', () => {
    it('should encrypt and decrypt data correctly', () => {
      const testData = { test: 'data', number: 123 };
      
      const encrypted = authService.encryptData(testData);
      const decrypted = authService.decryptData(encrypted);
      
      expect(decrypted).toEqual(testData);
    });

    it('should throw error when decrypting invalid data', () => {
      expect(() => {
        authService.decryptData('invalid-data');
      }).toThrow('Error al desencriptar datos');
    });
  });

  describe('token management', () => {
    it('should generate and verify valid tokens', () => {
      const payload = { id: '1', username: 'testuser' };
      
      const token = authService.generateToken(payload);
      const verified = authService.verifyToken(token);
      
      expect(verified).toBeDefined();
      expect(verified.id).toBe('1');
      expect(verified.username).toBe('testuser');
    });

    it('should return null for invalid tokens', () => {
      const result = authService.verifyToken('invalid-token');
      expect(result).toBeNull();
    });
  });

  describe('logout', () => {
    it('should clear authentication state', () => {
      authService.isAuthenticated = true;
      authService.currentUser = { id: '1', username: 'test' };
      authService.token = 'test-token';
      
      authService.logout();
      
      expect(authService.isAuthenticated).toBe(false);
      expect(authService.currentUser).toBeNull();
      expect(authService.token).toBeNull();
    });
  });

  describe('data synchronization', () => {
    it('should sync local data to user account', async () => {
      authService.isAuthenticated = true;
      authService.currentUser = { id: '1', username: 'testuser' };
      
      const localData = [{ id: 1, name: 'Product 1' }];
      const users = [{
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword'
      }];
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(users));
      
      const result = await authService.syncLocalData(localData);
      
      expect(result).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it('should load user data correctly', () => {
      authService.isAuthenticated = true;
      authService.currentUser = { id: '1', username: 'testuser' };
      
      const testData = [{ id: 1, name: 'Product 1' }];
      const encryptedData = authService.encryptData(testData);
      const users = [{
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
        shoppingLists: encryptedData
      }];
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(users));
      
      const result = authService.loadUserData();
      
      expect(result).toEqual(testData);
    });
  });
}); 