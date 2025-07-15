import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Alert,
  Box
} from '@mui/material';

const ProductForm = ({ open, handleClose, categories, onSave }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '1',
    category: '',
    subcategory: '',
    description: '',
    imageUrl: '',
    links: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!product.name.trim()) {
      newErrors.name = 'El nombre del producto es requerido';
    }
    if (!product.price || parseFloat(product.price) <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }
    if (!product.quantity || parseFloat(product.quantity) <= 0) {
      newErrors.quantity = 'La cantidad debe ser mayor a 0';
    }
    if (!product.category) {
      newErrors.category = 'Debe seleccionar una categoría';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(product);
      handleClose();
      setProduct({
        name: '',
        price: '',
        quantity: '1',
        category: '',
        subcategory: '',
        description: '',
        imageUrl: '',
        links: ''
      });
      setErrors({});
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Agregar Producto
      </DialogTitle>
      <DialogContent>
        {Object.keys(errors).length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Por favor, corrija los errores en el formulario
          </Alert>
        )}
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Nombre del Producto"
          fullWidth
          value={product.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          margin="dense"
          name="price"
          label="Precio (CLP)"
          type="number"
          fullWidth
          value={product.price}
          onChange={handleChange}
          error={!!errors.price}
          helperText={errors.price}
          inputProps={{ min: 0, step: 1 }}
        />
        <TextField
          margin="dense"
          name="quantity"
          label="Cantidad"
          type="number"
          fullWidth
          value={product.quantity}
          onChange={handleChange}
          error={!!errors.quantity}
          helperText={errors.quantity}
          inputProps={{ min: 1, step: 1 }}
        />
        <FormControl fullWidth margin="dense" error={!!errors.category}>
          <InputLabel>Categoría</InputLabel>
          <Select
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
          {errors.category && (
            <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5 }}>
              {errors.category}
            </Box>
          )}
        </FormControl>
        
        <TextField
          margin="dense"
          name="subcategory"
          label="Subcategoría (opcional)"
          fullWidth
          value={product.subcategory}
          onChange={handleChange}
          placeholder="Ej: Granos, Móviles, Muebles..."
        />
        <TextField
          margin="dense"
          name="description"
          label="Descripción"
          fullWidth
          multiline
          rows={3}
          value={product.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="imageUrl"
          label="URL de la Imagen"
          fullWidth
          value={product.imageUrl}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="links"
          label="Enlaces Relacionados"
          fullWidth
          multiline
          rows={2}
          value={product.links}
          onChange={handleChange}
          helperText="Separa múltiples enlaces con comas"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;