import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  Divider
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import useAuthStore from '../store/authStore';

// Esquemas de validación mejorados
const loginSchema = yup.object({
  email: yup
    .string()
    .email('Email inválido')
    .required('Email es requerido')
    .trim(),
  password: yup
    .string()
    .min(6, 'Mínimo 6 caracteres')
    .required('Contraseña es requerida')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    )
});

const registerSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .max(20, 'Máximo 20 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/, 'Solo letras, números y guiones bajos')
    .required('Usuario es requerido')
    .trim(),
  email: yup
    .string()
    .email('Email inválido')
    .required('Email es requerido')
    .trim(),
  password: yup
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .required('Contraseña es requerida')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirmar contraseña es requerida')
});

/**
 * Modal de autenticación con pestañas para login y registro
 */
const AuthModal = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  
  const { 
    login, 
    register, 
    isLoading, 
    error, 
    clearError 
  } = useAuthStore();

  // Formularios
  const loginForm = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const registerForm = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onChange'
  });

  // Resetear formularios cuando se abre el modal
  useEffect(() => {
    if (open) {
      loginForm.reset();
      registerForm.reset();
      clearError();
      setShowPassword(false);
      setShowConfirmPassword(false);
      setLoginAttempts(0);
      setIsBlocked(false);
    }
  }, [open, loginForm, registerForm, clearError]);

  // Bloquear después de 5 intentos fallidos
  useEffect(() => {
    if (loginAttempts >= 5) {
      setIsBlocked(true);
      setTimeout(() => {
        setIsBlocked(false);
        setLoginAttempts(0);
      }, 300000); // 5 minutos
    }
  }, [loginAttempts]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    clearError();
    loginForm.reset();
    registerForm.reset();
    setLoginAttempts(0);
    setIsBlocked(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleClose = () => {
    clearError();
    loginForm.reset();
    registerForm.reset();
    setActiveTab(0);
    setLoginAttempts(0);
    setIsBlocked(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  const onSubmitLogin = async (data) => {
    if (isBlocked) {
      return;
    }

    try {
      await login(data.email.trim(), data.password);
      handleClose();
      setLoginAttempts(0);
    } catch (error) {
      setLoginAttempts(prev => prev + 1);
      console.error('Error en login:', error);
    }
  };

  const onSubmitRegister = async (data) => {
    try {
      await register(data.username.trim(), data.email.trim(), data.password);
      handleClose();
    } catch (error) {
      console.error('Error en registro:', error);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, color: 'grey', label: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    const colors = ['red', 'orange', 'yellow', 'lightgreen', 'green'];
    const labels = ['Muy débil', 'Débil', 'Media', 'Fuerte', 'Muy fuerte'];
    
    return {
      strength: Math.min(strength, 4),
      color: colors[strength - 1] || 'grey',
      label: labels[strength - 1] || ''
    };
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LockIcon color="primary" />
            <Typography variant="h6" component="h2">
              {activeTab === 0 ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </Typography>
          </Box>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          sx={{ mb: 3 }}
          variant="fullWidth"
        >
          <Tab label="Iniciar Sesión" />
          <Tab label="Crear Cuenta" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {isBlocked && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Demasiados intentos fallidos. Intenta de nuevo en 5 minutos.
          </Alert>
        )}

        {activeTab === 0 ? (
          // Formulario de Login
          <Box component="form" onSubmit={loginForm.handleSubmit(onSubmitLogin)}>
            <Controller
              name="email"
              control={loginForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  disabled={isLoading || isBlocked}
                  autoComplete="email"
                  autoFocus
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />

            <Controller
              name="password"
              control={loginForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  disabled={isLoading || isBlocked}
                  autoComplete="current-password"
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          disabled={isLoading || isBlocked}
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />

            <DialogActions sx={{ px: 0, pt: 2 }}>
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth
                disabled={isLoading || isBlocked}
                startIcon={isLoading ? <CircularProgress size={20} /> : <PersonIcon />}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </DialogActions>
          </Box>
        ) : (
          // Formulario de Registro
          <Box component="form" onSubmit={registerForm.handleSubmit(onSubmitRegister)}>
            <Controller
              name="username"
              control={registerForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Nombre de usuario"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message || 'Ingresa tu nombre de usuario'}
                  disabled={isLoading}
                  autoComplete="username"
                  autoFocus
                  value={field.value ?? ''}
                  onChange={(e) => {
                    console.log('Username onChange:', e.target.value);
                    field.onChange(e);
                  }}
                  onBlur={field.onBlur}
                  onFocus={(e) => {
                    console.log('Username onFocus');
                    e.target.select();
                  }}
                  sx={{
                    '& .MuiInputBase-input': {
                      color: '#000000 !important',
                      backgroundColor: '#ffffff !important',
                      caretColor: '#1976d2 !important'
                    },
                    '& .MuiInputLabel-root': {
                      color: '#666666 !important'
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#cccccc !important'
                      },
                      '&:hover fieldset': {
                        borderColor: '#1976d2 !important'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1976d2 !important'
                      }
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#666666 !important'
                    }
                  }}
                />
              )}
            />

            <Controller
              name="email"
              control={registerForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message || 'Ingresa tu email'}
                  disabled={isLoading}
                  autoComplete="email"
                  value={field.value ?? ''}
                  onChange={(e) => {
                    console.log('Email onChange:', e.target.value);
                    field.onChange(e);
                  }}
                  onBlur={field.onBlur}
                  onFocus={(e) => {
                    console.log('Email onFocus');
                  }}
                  sx={{
                    '& .MuiInputBase-input': {
                      color: '#000000 !important',
                      backgroundColor: '#ffffff !important',
                      caretColor: '#1976d2 !important'
                    },
                    '& .MuiInputLabel-root': {
                      color: '#666666 !important'
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#cccccc !important'
                      },
                      '&:hover fieldset': {
                        borderColor: '#1976d2 !important'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1976d2 !important'
                      }
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#666666 !important'
                    }
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={registerForm.control}
              render={({ field, fieldState }) => {
                const passwordStrength = getPasswordStrength(field.value);
                return (
                  <TextField
                    {...field}
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error?.message || 
                      (field.value && `Fortaleza: ${passwordStrength.label}`)
                    }
                    disabled={isLoading}
                    autoComplete="new-password"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            disabled={isLoading}
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={{
                      '& .MuiFormHelperText-root': {
                        color: passwordStrength.color
                      }
                    }}
                  />
                );
              }}
            />

            <Controller
              name="confirmPassword"
              control={registerForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Confirmar contraseña"
                  type={showConfirmPassword ? 'text' : 'password'}
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  disabled={isLoading}
                  autoComplete="new-password"
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          disabled={isLoading}
                        >
                          {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />

            <DialogActions sx={{ px: 0, pt: 2 }}>
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : <PersonIcon />}
              >
                {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Button>
            </DialogActions>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal; 