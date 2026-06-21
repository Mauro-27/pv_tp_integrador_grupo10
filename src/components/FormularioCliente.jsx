import { useState } from 'react';
import { Box, TextField, Button, Grid, Typography, CircularProgress, InputAdornment } from '@mui/material';
import { useValidarForm } from '../hook/useValidarForm.js';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const FormularioCliente = ({ onAgregarCliente }) => {
  const { 
    formData, 
    validaciones, 
    formularioValido, 
    handleChange, 
    resetForm 
  } = useValidarForm({
    nombre: '', apellido: '', mail: '', cel: '', ciudad: ''
  });

  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    
    const nuevoCliente = {
      email: formData.mail,
      username: formData.nombre.toLowerCase() + formData.apellido.toLowerCase(),
      password: 'password_generico',
      name: {
        firstname: formData.nombre,
        lastname: formData.apellido
      },
      address: {
        city: formData.ciudad,
        street: 'Calle Principal',
        number: 123,
        zipcode: '1000',
        geolocation: { lat: '0', long: '0' }
      },
      phone: formData.cel
    };

    await onAgregarCliente(nuevoCliente);
    resetForm(); 
    setEnviando(false);
  };

  // Función actualizada a la sintaxis moderna (slotProps)
  const obtenerIcono = (esValido) => ({
    input: {
      endAdornment: (
        <InputAdornment position="end">
          {esValido ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
        </InputAdornment>
      )
    }
  });

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom color="primary">Alta de Nuevo Cliente</Typography>
      
      {/* Ya no usamos la palabra "item" adentro de los Grids */}
      <Grid container spacing={2}>
        
        <Grid xs={12} sm={6}>
          <TextField 
            required fullWidth label="Nombre" name="nombre" 
            value={formData.nombre} onChange={handleChange} disabled={enviando}
            slotProps={obtenerIcono(validaciones.nombre)}
          />
        </Grid>
        
        <Grid xs={12} sm={6}>
          <TextField 
            required fullWidth label="Apellido" name="apellido" 
            value={formData.apellido} onChange={handleChange} disabled={enviando}
            slotProps={obtenerIcono(validaciones.apellido)}
          />
        </Grid>
        
        <Grid xs={12} sm={6}>
          <TextField 
            required fullWidth type="email" label="Email" name="mail" 
            value={formData.mail} onChange={handleChange} disabled={enviando}
            slotProps={obtenerIcono(validaciones.mail)}
          />
        </Grid>
        
        <Grid xs={12} sm={6}>
          <TextField 
            required fullWidth label="Teléfono" name="cel" 
            value={formData.cel} onChange={handleChange} disabled={enviando}
            placeholder="Ej: 3881456315"
            slotProps={obtenerIcono(validaciones.cel)}
          />
        </Grid>
        
        <Grid xs={12}>
          <TextField 
            required fullWidth label="Ciudad" name="ciudad" 
            value={formData.ciudad} onChange={handleChange} disabled={enviando}
            slotProps={obtenerIcono(validaciones.ciudad)}
          />
        </Grid>
        
        <Grid xs={12}>
          <Button 
            type="submit" variant="contained" color="success" fullWidth 
            disabled={enviando || !formularioValido}
          >
            {enviando ? <CircularProgress size={24} color="inherit" /> : 'Registrar Cliente'}
          </Button>
        </Grid>
        
      </Grid>
    </Box>
  );
};

export default FormularioCliente;