import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Chip,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import BlockIcon from '@mui/icons-material/Block';

const CategoryManager = ({ 
  categories, 
  setCategories, 
  excludedCategories, 
  setExcludedCategories 
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
      setOpenDialog(false);
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setCategories(categories.filter(cat => cat !== categoryToDelete));
    // También remover de categorías excluidas si está ahí
    setExcludedCategories(prev => prev.filter(cat => cat !== categoryToDelete));
  };

  const handleToggleExcluded = (category) => {
    if (excludedCategories.includes(category)) {
      setExcludedCategories(prev => prev.filter(cat => cat !== category));
    } else {
      setExcludedCategories(prev => [...prev, category]);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <CategoryIcon sx={{ fontSize: 24, mr: 1 }} />
        <Typography variant="h6" component="h2">
          Gestión de Categorías
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
        onClick={() => setOpenDialog(true)}
        sx={{ mb: 2 }}
        size="small"
      >
        Agregar Categoría
      </Button>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {categories.map((category, index) => (
          <Chip
            key={index}
            label={category}
            color={excludedCategories.includes(category) ? "secondary" : "primary"}
            variant="outlined"
            onDelete={() => handleDeleteCategory(category)}
            deleteIcon={<DeleteIcon />}
            size="small"
            onClick={() => handleToggleExcluded(category)}
            icon={excludedCategories.includes(category) ? <BlockIcon /> : undefined}
            sx={{ 
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: excludedCategories.includes(category) ? 'secondary.light' : 'primary.light',
                color: 'white'
              }
            }}
          />
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        💡 Haz clic en una categoría para excluirla del total (como compras futuras)
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {excludedCategories.map((category) => (
          <Chip
            key={category}
            label={`${category} (excluida)`}
            color="secondary"
            size="small"
            icon={<BlockIcon />}
            onClick={() => handleToggleExcluded(category)}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Agregar Nueva Categoría</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre de la Categoría"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddCategory();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleAddCategory} variant="contained" color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CategoryManager; 