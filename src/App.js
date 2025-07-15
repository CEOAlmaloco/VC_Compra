import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import ShoppingList from './components/ShoppingList';
import CategoryManager from './components/CategoryManager';
import Header from './components/Header';
import useAuthStore from './store/authStore';
import { getTestData } from './data/testData';

// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#FF9800',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  const [categories, setCategories] = useState([]);
  const [excludedCategories, setExcludedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [forceTestData, setForceTestData] = useState(false);
  
  const { 
    isAuthenticated, 
    initialize: initializeAuth,
    loadUserData,
    saveUserData,
    checkLocalData,
    hasLocalData
  } = useAuthStore();

  // Inicializar autenticación
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Cargar datos iniciales
  useEffect(() => {
    loadInitialData();
  }, [isAuthenticated]);

  const loadInitialData = async () => {
    try {
      let dataToLoad = [];

      if (isAuthenticated) {
        // Usuario autenticado: cargar datos de la cuenta
        try {
          const userData = loadUserData();
          if (userData && userData.length > 0) {
            dataToLoad = userData;
          } else {
            // Si no hay datos en la cuenta, verificar datos locales
            const localData = localStorage.getItem('shoppingList');
            if (localData) {
              dataToLoad = JSON.parse(localData);
            }
          }
        } catch (error) {
          console.error('Error cargando datos del usuario:', error);
          // Fallback a datos locales
          const localData = localStorage.getItem('shoppingList');
          if (localData) {
            dataToLoad = JSON.parse(localData);
          }
        }
      } else {
        // Usuario no autenticado: cargar datos locales
        const localData = localStorage.getItem('shoppingList');
        if (localData) {
          dataToLoad = JSON.parse(localData);
        }
      }

      // Si no hay datos y forceTestData está activado, cargar datos de prueba
      if (dataToLoad.length === 0 && forceTestData) {
        dataToLoad = getTestData();
        localStorage.setItem('shoppingList', JSON.stringify(dataToLoad));
      }

      setProducts(dataToLoad);
      
      // Extraer categorías únicas
      const uniqueCategories = [...new Set(dataToLoad.map(product => product.category))];
      setCategories(uniqueCategories);
      
    } catch (error) {
      console.error('Error cargando datos iniciales:', error);
    }
  };

  const handleAddProduct = (product) => {
    const newProducts = [...products, { ...product, id: Date.now() }];
    setProducts(newProducts);
    
    // Guardar en localStorage
    localStorage.setItem('shoppingList', JSON.stringify(newProducts));
    
    // Si el usuario está autenticado, guardar también en la cuenta
    if (isAuthenticated) {
      saveUserData(newProducts).catch(error => {
        console.error('Error guardando datos en la cuenta:', error);
      });
    }
    
    // Actualizar categorías
    if (!categories.includes(product.category)) {
      setCategories([...categories, product.category]);
    }
  };

  const handleDeleteProduct = (productId) => {
    const newProducts = products.filter(product => product.id !== productId);
    setProducts(newProducts);
    
    // Guardar en localStorage
    localStorage.setItem('shoppingList', JSON.stringify(newProducts));
    
    // Si el usuario está autenticado, guardar también en la cuenta
    if (isAuthenticated) {
      saveUserData(newProducts).catch(error => {
        console.error('Error guardando datos en la cuenta:', error);
      });
    }
  };

  const handleSyncComplete = () => {
    // Recargar datos después de la sincronización
    loadInitialData();
    checkLocalData();
  };

  const handleToggleTestData = () => {
    setForceTestData(!forceTestData);
    if (!forceTestData) {
      const testData = getTestData();
      setProducts(testData);
      localStorage.setItem('shoppingList', JSON.stringify(testData));
      
      // Extraer categorías únicas
      const uniqueCategories = [...new Set(testData.map(product => product.category))];
      setCategories(uniqueCategories);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Header onSyncComplete={handleSyncComplete} />
        
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <CategoryManager
              categories={categories}
              excludedCategories={excludedCategories}
              onExcludedCategoriesChange={setExcludedCategories}
            />
            
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <button
                onClick={handleToggleTestData}
                style={{
                  padding: '8px 16px',
                  backgroundColor: forceTestData ? '#ff9800' : '#e0e0e0',
                  color: forceTestData ? 'white' : '#666',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                {forceTestData ? 'Datos de Prueba ON' : 'Datos de Prueba OFF'}
              </button>
            </Box>
          </Box>

          <ShoppingList
            categories={categories}
            excludedCategories={excludedCategories}
            products={products}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;