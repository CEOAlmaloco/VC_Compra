import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '../services/authService';

/**
 * Store de autenticación usando Zustand
 * Maneja el estado global de autenticación y sincronización de datos
 */
const useAuthStore = create(
  persist(
    (set, get) => ({
      // Estado de autenticación
      isAuthenticated: false,
      currentUser: null,
      token: null,
      isLoading: false,
      error: null,

      // Estado de sincronización
      hasLocalData: false,
      lastSync: null,

      /**
       * Inicializa el store desde el servicio de autenticación
       */
      initialize: () => {
        const isAuthenticated = authService.isUserAuthenticated();
        const currentUser = authService.getCurrentUser();
        const token = authService.getToken();

        set({
          isAuthenticated,
          currentUser,
          token,
          hasLocalData: !!localStorage.getItem('shoppingList')
        });
      },

      /**
       * Registra un nuevo usuario
       */
      register: async (username, email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          const result = await authService.register(username, email, password);
          
          set({
            isAuthenticated: true,
            currentUser: result.user,
            token: result.token,
            isLoading: false
          });

          return result;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error.message 
          });
          throw error;
        }
      },

      /**
       * Inicia sesión de usuario
       */
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          const result = await authService.login(email, password);
          
          set({
            isAuthenticated: true,
            currentUser: result.user,
            token: result.token,
            isLoading: false
          });

          return result;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error.message 
          });
          throw error;
        }
      },

      /**
       * Cierra sesión
       */
      logout: () => {
        authService.logout();
        set({
          isAuthenticated: false,
          currentUser: null,
          token: null,
          error: null,
          lastSync: null
        });
      },

      /**
       * Sincroniza datos locales con la cuenta del usuario
       */
      syncLocalData: async (localData) => {
        if (!get().isAuthenticated) {
          throw new Error('Usuario no autenticado');
        }

        set({ isLoading: true, error: null });
        
        try {
          await authService.syncLocalData(localData);
          
          set({
            hasLocalData: false,
            lastSync: new Date().toISOString(),
            isLoading: false
          });

          // Limpiar datos locales después de sincronizar
          localStorage.removeItem('shoppingList');
          
          return true;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error.message 
          });
          throw error;
        }
      },

      /**
       * Carga datos del usuario desde la base de datos
       */
      loadUserData: () => {
        if (!get().isAuthenticated) {
          throw new Error('Usuario no autenticado');
        }

        try {
          const userData = authService.loadUserData();
          return userData;
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },

      /**
       * Guarda datos del usuario en la base de datos
       */
      saveUserData: async (data) => {
        if (!get().isAuthenticated) {
          throw new Error('Usuario no autenticado');
        }

        set({ isLoading: true, error: null });
        
        try {
          await authService.saveUserData(data);
          
          set({
            lastSync: new Date().toISOString(),
            isLoading: false
          });

          return true;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error.message 
          });
          throw error;
        }
      },

      /**
       * Limpia errores
       */
      clearError: () => {
        set({ error: null });
      },

      /**
       * Verifica si hay datos locales para sincronizar
       */
      checkLocalData: () => {
        const hasLocalData = !!localStorage.getItem('shoppingList');
        set({ hasLocalData });
        return hasLocalData;
      },

      /**
       * Obtiene datos locales
       */
      getLocalData: () => {
        try {
          const localData = localStorage.getItem('shoppingList');
          return localData ? JSON.parse(localData) : [];
        } catch (error) {
          console.error('Error obteniendo datos locales:', error);
          return [];
        }
      }
    }),
    {
      name: 'vc-compra-auth-store',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
        token: state.token,
        lastSync: state.lastSync
      })
    }
  )
);

export default useAuthStore; 