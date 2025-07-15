import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Accordion, AccordionSummary, AccordionDetails, Typography, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [backupData, setBackupData] = useState([]); // Para restaurar datos reales
  
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
      setBackupData(dataToLoad); // Guardar backup para restaurar
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
    localStorage.setItem('shoppingList', JSON.stringify(newProducts));
    if (isAuthenticated) {
      saveUserData(newProducts).catch(error => {
        console.error('Error guardando datos en la cuenta:', error);
      });
    }
    if (!categories.includes(product.category)) {
      setCategories([...categories, product.category]);
    }
  };

  const handleDeleteProduct = (productId) => {
    const newProducts = products.filter(product => product.id !== productId);
    setProducts(newProducts);
    localStorage.setItem('shoppingList', JSON.stringify(newProducts));
    if (isAuthenticated) {
      saveUserData(newProducts).catch(error => {
        console.error('Error guardando datos en la cuenta:', error);
      });
    }
  };

  const handleSyncComplete = () => {
    loadInitialData();
    checkLocalData();
  };

  // Toggle real para datos de prueba ON/OFF
  const handleToggleTestData = () => {
    if (!forceTestData) {
      // Activar datos de prueba
      setBackupData(products); // Guardar backup de los datos reales
      const testData = getTestData();
      setProducts(testData);
      localStorage.setItem('shoppingList', JSON.stringify(testData));
      setCategories([...new Set(testData.map(product => product.category))]);
      setForceTestData(true);
    } else {
      // Restaurar datos reales/locales
      setProducts(backupData);
      localStorage.setItem('shoppingList', JSON.stringify(backupData));
      setCategories([...new Set(backupData.map(product => product.category))]);
      setForceTestData(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Header onSyncComplete={handleSyncComplete} />
        <Box sx={{ p: 3 }}>
          {/* Lista de productos primero */}
          <ShoppingList
            categories={categories}
            excludedCategories={excludedCategories}
            products={products}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
          />

          {/* Gestión de categorías y test data abajo */}
          <Box sx={{ mt: 4, maxWidth: 900, mx: 'auto' }}>
            {/* Gestión de categorías compacta */}
            <Accordion
              expanded={showCategoryManager}
              onChange={() => setShowCategoryManager(!showCategoryManager)}
              sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Gestión de Categorías
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CategoryManager
                  categories={categories}
                  excludedCategories={excludedCategories}
                  onExcludedCategoriesChange={setExcludedCategories}
                />
              </AccordionDetails>
            </Accordion>

            {/* Botón de test data toggle */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
              <button
                onClick={handleToggleTestData}
                style={{
                  padding: '8px 16px',
                  backgroundColor: forceTestData ? '#ff9800' : '#e0e0e0',
                  color: forceTestData ? 'white' : '#666',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  minWidth: 120
                }}
              >
                {forceTestData ? 'Datos de Prueba ON' : 'Datos de Prueba OFF'}
              </button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;