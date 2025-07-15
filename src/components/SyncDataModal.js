import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  Chip,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import WarningIcon from '@mui/icons-material/Warning';
import useAuthStore from '../store/authStore';

/**
 * Modal para sincronizar datos locales con la cuenta del usuario
 */
const SyncDataModal = ({ open, onClose, localData, onSyncComplete }) => {
  const [syncOption, setSyncOption] = useState('upload'); // 'upload' o 'download'
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    syncLocalData, 
    loadUserData, 
    saveUserData,
    isLoading: authLoading, 
    error, 
    clearError 
  } = useAuthStore();

  const handleClose = () => {
    clearError();
    setSyncOption('upload');
    setIsLoading(false);
    onClose();
  };

  const handleSyncLocalData = async () => {
    setIsLoading(true);
    try {
      await syncLocalData(localData);
      onSyncComplete();
      handleClose();
    } catch (error) {
      // Error ya manejado por el store
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadData = async () => {
    setIsLoading(true);
    try {
      const userData = loadUserData();
      if (userData && userData.length > 0) {
        // Guardar datos del usuario en localStorage
        localStorage.setItem('shoppingList', JSON.stringify(userData));
        onSyncComplete();
        handleClose();
      } else {
        throw new Error('No hay datos en la nube para descargar');
      }
    } catch (error) {
      console.error('Error descargando datos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMergeData = async () => {
    setIsLoading(true);
    try {
      const userData = loadUserData();
      const mergedData = [...(userData || []), ...localData];
      
      // Eliminar duplicados basados en ID
      const uniqueData = mergedData.filter((item, index, self) => 
        index === self.findIndex(t => t.id === item.id)
      );
      
      await saveUserData(uniqueData);
      localStorage.setItem('shoppingList', JSON.stringify(uniqueData));
      onSyncComplete();
      handleClose();
    } catch (error) {
      console.error('Error fusionando datos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLocalDataStats = () => {
    const categories = [...new Set(localData.map(item => item.category))];
    const totalItems = localData.length;
    const totalValue = localData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return { categories, totalItems, totalValue };
  };

  const localStats = getLocalDataStats();

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="h2">
            Sincronizar Datos
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            Tienes datos locales que no están sincronizados con tu cuenta. 
            ¿Qué quieres hacer con estos datos?
          </Typography>
        </Box>

        {/* Estadísticas de datos locales */}
        <Box sx={{ 
          p: 2, 
          bgcolor: 'grey.50', 
          borderRadius: 1, 
          mb: 3 
        }}>
          <Typography variant="subtitle2" gutterBottom>
            📊 Datos Locales
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip 
              label={`${localStats.totalItems} productos`} 
              color="primary" 
              variant="outlined" 
            />
            <Chip 
              label={`${localStats.categories.length} categorías`} 
              color="secondary" 
              variant="outlined" 
            />
            <Chip 
              label={`$${localStats.totalValue.toLocaleString('es-CL')} total`} 
              color="success" 
              variant="outlined" 
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Opciones de sincronización */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Opciones de Sincronización:
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Subir datos locales */}
            <Box sx={{ 
              p: 2, 
              border: '1px solid', 
              borderColor: syncOption === 'upload' ? 'primary.main' : 'grey.300',
              borderRadius: 1,
              cursor: 'pointer',
              bgcolor: syncOption === 'upload' ? 'primary.50' : 'white',
              '&:hover': { bgcolor: 'grey.50' }
            }}
            onClick={() => setSyncOption('upload')}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CloudUploadIcon color="primary" />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" fontWeight="medium">
                    Subir datos locales a la nube
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Guarda tus datos locales en tu cuenta para acceder desde cualquier dispositivo
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Descargar datos de la nube */}
            <Box sx={{ 
              p: 2, 
              border: '1px solid', 
              borderColor: syncOption === 'download' ? 'primary.main' : 'grey.300',
              borderRadius: 1,
              cursor: 'pointer',
              bgcolor: syncOption === 'download' ? 'primary.50' : 'white',
              '&:hover': { bgcolor: 'grey.50' }
            }}
            onClick={() => setSyncOption('download')}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CloudDownloadIcon color="primary" />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" fontWeight="medium">
                    Descargar datos de la nube
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Reemplaza los datos locales con los datos guardados en tu cuenta
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Advertencia */}
        <Alert severity="warning" icon={<WarningIcon />}>
          <Typography variant="body2">
            <strong>Importante:</strong> {syncOption === 'upload' 
              ? 'Los datos locales reemplazarán cualquier dato existente en tu cuenta.' 
              : 'Los datos locales se perderán y serán reemplazados por los datos de la nube.'
            }
          </Typography>
        </Alert>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} disabled={isLoading || authLoading}>
          Cancelar
        </Button>
        
        {syncOption === 'upload' ? (
          <Button 
            onClick={handleSyncLocalData}
            variant="contained"
            disabled={isLoading || authLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
          >
            {isLoading ? 'Subiendo...' : 'Subir a la Nube'}
          </Button>
        ) : (
          <Button 
            onClick={handleDownloadData}
            variant="contained"
            disabled={isLoading || authLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : <CloudDownloadIcon />}
          >
            {isLoading ? 'Descargando...' : 'Descargar de la Nube'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SyncDataModal; 