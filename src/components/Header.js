import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Chip,
  Tooltip,
  Badge
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useAuthStore from '../store/authStore';
import AuthModal from './AuthModal';
import SyncDataModal from './SyncDataModal';

/**
 * Header de la aplicación con autenticación y sincronización
 */
const Header = ({ onSyncComplete }) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const { 
    isAuthenticated, 
    currentUser, 
    logout, 
    hasLocalData, 
    checkLocalData,
    getLocalData,
    lastSync 
  } = useAuthStore();

  useEffect(() => {
    // Verificar si hay datos locales al cargar
    checkLocalData();
  }, [checkLocalData]);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      setAnchorEl(document.currentTarget);
    } else {
      setAuthModalOpen(true);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const handleSyncClick = () => {
    const localData = getLocalData();
    if (localData && localData.length > 0) {
      setSyncModalOpen(true);
    }
    handleMenuClose();
  };

  const handleSyncComplete = () => {
    if (onSyncComplete) {
      onSyncComplete();
    }
  };

  const formatLastSync = (lastSync) => {
    if (!lastSync) return 'Nunca';
    
    const date = new Date(lastSync);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Hace ${diffInDays} días`;
    
    return date.toLocaleDateString('es-CL');
  };

  return (
    <>
      <AppBar 
        position="static" 
        elevation={1}
        sx={{ 
          backgroundColor: 'white', 
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'grey.200'
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <ShoppingCartIcon sx={{ fontSize: 32, mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold' }}>
              VC Compra
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Indicador de sincronización */}
            {isAuthenticated && (
              <Tooltip title={`Última sincronización: ${formatLastSync(lastSync)}`}>
                <Chip
                  icon={<CloudSyncIcon />}
                  label="Sincronizado"
                  size="small"
                  color={lastSync ? "success" : "default"}
                  variant="outlined"
                />
              </Tooltip>
            )}

            {/* Indicador de datos locales */}
            {hasLocalData && !isAuthenticated && (
              <Tooltip title="Tienes datos locales sin sincronizar">
                <Chip
                  label="Datos Locales"
                  size="small"
                  color="warning"
                  variant="outlined"
                />
              </Tooltip>
            )}

            {/* Botón de autenticación */}
            <Button
              onClick={handleAuthClick}
              variant={isAuthenticated ? "outlined" : "contained"}
              startIcon={isAuthenticated ? <PersonIcon /> : <LoginIcon />}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'medium'
              }}
            >
              {isAuthenticated ? currentUser?.username : 'Iniciar Sesión'}
            </Button>

            {/* Avatar del usuario autenticado */}
            {isAuthenticated && (
              <IconButton
                onClick={handleAuthClick}
                sx={{ ml: 1 }}
              >
                <Badge
                  badgeContent={hasLocalData ? 1 : 0}
                  color="warning"
                  overlap="circular"
                >
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32,
                      bgcolor: 'primary.main',
                      fontSize: '0.875rem'
                    }}
                  >
                    {currentUser?.username?.charAt(0).toUpperCase()}
                  </Avatar>
                </Badge>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Menú del usuario */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            borderRadius: 2
          }
        }}
      >
        <MenuItem disabled>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="subtitle2" fontWeight="medium">
              {currentUser?.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {currentUser?.email}
            </Typography>
          </Box>
        </MenuItem>
        
        {hasLocalData && (
          <MenuItem onClick={handleSyncClick}>
            <CloudSyncIcon sx={{ mr: 2, fontSize: 20 }} />
            Sincronizar Datos
          </MenuItem>
        )}
        
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
          Cerrar Sesión
        </MenuItem>
      </Menu>

      {/* Modal de autenticación */}
      <AuthModal 
        open={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />

      {/* Modal de sincronización */}
      <SyncDataModal
        open={syncModalOpen}
        onClose={() => setSyncModalOpen(false)}
        localData={getLocalData()}
        onSyncComplete={handleSyncComplete}
      />
    </>
  );
};

export default Header; 