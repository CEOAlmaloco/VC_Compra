import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Link, 
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ProductForm from './ProductForm';
import { getTestData } from '../data/testData';

const ShoppingList = ({ categories, excludedCategories, products, onAddProduct, onDeleteProduct }) => {
  const [openForm, setOpenForm] = useState(false);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSubcategories, setExpandedSubcategories] = useState({});
  const [hiddenItems, setHiddenItems] = useState({
    products: new Set(),
    subcategories: new Set(),
    categories: new Set()
  });

  useEffect(() => {
    calculateTotal();
  }, [products, excludedCategories, hiddenItems]);



  const calculateTotal = () => {
    const sum = products.reduce((acc, product) => {
      // Excluir productos de categorías excluidas del total
      if (excludedCategories.includes(product.category)) {
        return acc;
      }
      // Excluir productos ocultos individualmente
      if (hiddenItems.products.has(product.id)) {
        return acc;
      }
      // Excluir productos de subcategorías ocultas
      const subcategoryKey = `${product.category}-${product.subcategory || 'Sin subcategoría'}`;
      if (hiddenItems.subcategories.has(subcategoryKey)) {
        return acc;
      }
      // Excluir productos de categorías ocultas
      if (hiddenItems.categories.has(product.category)) {
        return acc;
      }
      return acc + (parseFloat(product.price) * parseFloat(product.quantity));
    }, 0);
    setTotal(sum);
  };

  const handleAddProduct = (product) => {
    onAddProduct(product);
  };

  const handleDeleteProduct = (productId) => {
    onDeleteProduct(productId);
  };

  const handleToggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleToggleSubcategory = (category, subcategory) => {
    const key = `${category}-${subcategory}`;
    setExpandedSubcategories(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleProductVisibility = (productId) => {
    setHiddenItems(prev => ({
      ...prev,
      products: new Set(prev.products.has(productId) 
        ? [...prev.products].filter(id => id !== productId)
        : [...prev.products, productId]
      )
    }));
  };

  const toggleSubcategoryVisibility = (category, subcategory) => {
    const key = `${category}-${subcategory}`;
    setHiddenItems(prev => ({
      ...prev,
      subcategories: new Set(prev.subcategories.has(key)
        ? [...prev.subcategories].filter(k => k !== key)
        : [...prev.subcategories, key]
      )
    }));
  };

  const toggleCategoryVisibility = (category) => {
    setHiddenItems(prev => ({
      ...prev,
      categories: new Set(prev.categories.has(category)
        ? [...prev.categories].filter(c => c !== category)
        : [...prev.categories, category]
      )
    }));
  };

  const isProductVisible = (product) => {
    if (hiddenItems.products.has(product.id)) return false;
    const subcategoryKey = `${product.category}-${product.subcategory || 'Sin subcategoría'}`;
    if (hiddenItems.subcategories.has(subcategoryKey)) return false;
    if (hiddenItems.categories.has(product.category)) return false;
    return true;
  };

  const isSubcategoryVisible = (category, subcategory) => {
    if (hiddenItems.categories.has(category)) return false;
    const key = `${category}-${subcategory}`;
    return !hiddenItems.subcategories.has(key);
  };

  const isCategoryVisible = (category) => {
    return !hiddenItems.categories.has(category);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Agrupar productos por categoría y subcategoría
  const productsByCategory = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = {};
    }
    if (!acc[product.category][product.subcategory || 'Sin subcategoría']) {
      acc[product.category][product.subcategory || 'Sin subcategoría'] = [];
    }
    acc[product.category][product.subcategory || 'Sin subcategoría'].push(product);
    return acc;
  }, {});

  const formatCLP = (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculateCategoryTotal = (categoryProducts) => {
    return Object.values(categoryProducts).flat().reduce((sum, product) => {
      if (excludedCategories.includes(product.category)) {
        return sum;
      }
      if (!isProductVisible(product)) {
        return sum;
      }
      return sum + (product.price * product.quantity);
    }, 0);
  };

  return (
    <Container maxWidth="xl" sx={{ p: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <ShoppingCartIcon sx={{ fontSize: 32, mr: 1 }} />
        <Typography variant="h5" component="h1">
          Lista de Compras
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
          size="medium"
        >
          Agregar Producto
        </Button>
        
        <TextField
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          size="small"
          sx={{ minWidth: 200 }}
        />
        
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Filtrar por categoría</InputLabel>
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value="">Todas las categorías</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ mb: 2 }}>
        {Object.keys(productsByCategory).map((category) => {
          const categoryProducts = productsByCategory[category];
          const categoryTotal = calculateCategoryTotal(categoryProducts);
          const isExcluded = excludedCategories.includes(category);
          const isHidden = !isCategoryVisible(category);
          
          return (
            <Accordion 
              key={category} 
              expanded={expandedCategories[category] || false}
              onChange={() => handleToggleCategory(category)}
              sx={{ 
                mb: 1,
                opacity: isHidden ? 0.3 : 1
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ 
                  backgroundColor: isExcluded ? 'secondary.light' : 'primary.light', 
                  color: 'white',
                  '&:hover': { 
                    backgroundColor: isExcluded ? 'secondary.main' : 'primary.main' 
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  {expandedCategories[category] ? <FolderOpenIcon sx={{ mr: 1 }} /> : <FolderIcon sx={{ mr: 1 }} />}
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {category} ({Object.values(categoryProducts).flat().length} productos)
                    {isExcluded && <Chip label="Excluido" size="small" color="secondary" sx={{ ml: 1 }} />}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tooltip title={isHidden ? "Mostrar categoría" : "Ocultar categoría"}>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCategoryVisibility(category);
                        }}
                        sx={{ color: 'white' }}
                      >
                        {isHidden ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </Tooltip>
                    <Typography variant="body2" sx={{ mr: 2 }}>
                      {isExcluded ? 'Excluido del total' : formatCLP(categoryTotal)}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                  {Object.keys(categoryProducts).map((subcategory) => {
                    const subcategoryProducts = categoryProducts[subcategory];
                    const subcategoryKey = `${category}-${subcategory}`;
                    const isSubHidden = !isSubcategoryVisible(category, subcategory);
                    
                    return (
                      <Accordion 
                        key={subcategoryKey}
                        expanded={expandedSubcategories[subcategoryKey] || false}
                        onChange={() => handleToggleSubcategory(category, subcategory)}
                        sx={{ 
                          mb: 1,
                          '&:before': { display: 'none' },
                          boxShadow: 'none',
                          border: '1px solid #e0e0e0',
                          opacity: isSubHidden ? 0.3 : 1
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          sx={{ 
                            backgroundColor: 'grey.50',
                            minHeight: 48,
                            '& .MuiAccordionSummary-content': {
                              margin: '8px 0'
                            }
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'medium', flexGrow: 1 }}>
                              📁 {subcategory} ({subcategoryProducts.length} productos)
                            </Typography>
                            <Tooltip title={isSubHidden ? "Mostrar subcategoría" : "Ocultar subcategoría"}>
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSubcategoryVisibility(category, subcategory);
                                }}
                              >
                                {isSubHidden ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0 }}>
                          <TableContainer component={Paper} elevation={0}>
                            <Table size="small">
                              <TableHead>
                                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                                  <TableCell sx={{ width: 80, p: 1 }}>Foto</TableCell>
                                  <TableCell sx={{ width: 200, p: 1 }}>Nombre</TableCell>
                                  <TableCell sx={{ width: 300, p: 1 }}>Descripción</TableCell>
                                  <TableCell sx={{ width: 200, p: 1 }}>Enlaces</TableCell>
                                  <TableCell sx={{ width: 100, p: 1 }}>Precio</TableCell>
                                  <TableCell sx={{ width: 80, p: 1 }}>Cant.</TableCell>
                                  <TableCell sx={{ width: 120, p: 1 }}>Total</TableCell>
                                  <TableCell sx={{ width: 120, p: 1 }}>Acciones</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {subcategoryProducts.map((product) => {
                                  const isProductHidden = hiddenItems.products.has(product.id);
                                  
                                  return (
                                    <TableRow 
                                      key={product.id} 
                                      sx={{ 
                                        '&:hover': { backgroundColor: 'grey.50' },
                                        opacity: isProductHidden ? 0.3 : 1
                                      }}
                                    >
                                      <TableCell sx={{ p: 1 }}>
                                        <Box sx={{ 
                                          width: 60, 
                                          height: 60, 
                                          borderRadius: 1,
                                          overflow: 'hidden'
                                        }}>
                                          {product.imageUrl ? (
                                            <CardMedia
                                              component="img"
                                              height="60"
                                              image={product.imageUrl}
                                              alt={product.name}
                                              sx={{ objectFit: 'cover' }}
                                            />
                                          ) : (
                                            <Box sx={{ 
                                              width: '100%', 
                                              height: '100%', 
                                              backgroundColor: 'grey.200',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center'
                                            }}>
                                              <Typography variant="caption" color="text.secondary">
                                                Sin img
                                              </Typography>
                                            </Box>
                                          )}
                                        </Box>
                                      </TableCell>
                                      <TableCell sx={{ p: 1 }}>
                                        <Typography variant="body2" fontWeight="medium">
                                          {product.name}
                                        </Typography>
                                      </TableCell>
                                      <TableCell sx={{ p: 1 }}>
                                        <Typography variant="body2" color="text.secondary">
                                          {product.description}
                                        </Typography>
                                      </TableCell>
                                      <TableCell sx={{ p: 1 }}>
                                        {product.links ? (
                                          <Box>
                                            {product.links.split(',').slice(0, 2).map((link, i) => (
                                              <Link
                                                key={i}
                                                href={link.trim()}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                variant="body2"
                                                sx={{ display: 'block', mb: 0.5, fontSize: '0.75rem' }}
                                              >
                                                Enlace {i + 1}
                                              </Link>
                                            ))}
                                          </Box>
                                        ) : (
                                          <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
                                            Sin enlaces
                                          </Typography>
                                        )}
                                      </TableCell>
                                      <TableCell sx={{ p: 1 }}>
                                        <Typography variant="body2" fontWeight="medium">
                                          {formatCLP(product.price)}
                                        </Typography>
                                      </TableCell>
                                      <TableCell sx={{ p: 1 }}>
                                        <Typography variant="body2">
                                          {product.quantity}
                                        </Typography>
                                      </TableCell>
                                      <TableCell sx={{ p: 1 }}>
                                        <Typography variant="body2" fontWeight="bold" color="primary">
                                          {formatCLP(product.price * product.quantity)}
                                        </Typography>
                                      </TableCell>
                                      <TableCell sx={{ p: 1 }}>
                                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                                          <Tooltip title={isProductHidden ? "Mostrar producto" : "Ocultar producto"}>
                                            <IconButton
                                              size="small"
                                              onClick={() => toggleProductVisibility(product.id)}
                                              color={isProductHidden ? "default" : "primary"}
                                            >
                                              {isProductHidden ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                                            </IconButton>
                                          </Tooltip>
                                          <IconButton
                                            size="small"
                                            onClick={() => handleDeleteProduct(product.id)}
                                            color="error"
                                          >
                                            <DeleteIcon fontSize="small" />
                                          </IconButton>
                                        </Box>
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>

      {filteredProducts.length === 0 && (
        <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {products.length === 0 ? 'No hay productos en tu lista de compras' : 'No se encontraron productos con los filtros aplicados'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {products.length === 0 ? '¡Agrega tu primer producto para comenzar!' : 'Intenta cambiar los filtros de búsqueda'}
          </Typography>
        </Paper>
      )}

      <Paper
        elevation={3}
        sx={{
          p: 2,
          mt: 2,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Typography variant="h5">
          Total (excluyendo categorías marcadas): {formatCLP(total)}
        </Typography>
      </Paper>

      <ProductForm
        open={openForm}
        handleClose={() => setOpenForm(false)}
        categories={categories}
        onSave={handleAddProduct}
      />
    </Container>
  );
};

export default ShoppingList;