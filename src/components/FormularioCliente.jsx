import { useState } from 'react';
import { Box, TextField, Button, Grid, Typography, CircularProgress } from '@mui/material';

const FormularioCliente = ({ onAgregarCliente }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    mail: '',
    cel: '',
    ciudad: ''
  });
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    
    // estructura de fakestoreaPI
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
    setFormData({ nombre: '', apellido: '', mail: '', cel: '', ciudad: '' });
    setEnviando(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom color="primary">Alta de Nuevo Cliente</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField required fullWidth label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} disabled={enviando} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required fullWidth label="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} disabled={enviando} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required fullWidth type="email" label="Email" name="mail" value={formData.mail} onChange={handleChange} disabled={enviando} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required fullWidth label="Teléfono" name="cel" value={formData.cel} onChange={handleChange} disabled={enviando} />
        </Grid>
        <Grid item xs={12}>
          <TextField required fullWidth label="Ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} disabled={enviando} />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="success" fullWidth disabled={enviando}>
            {enviando ? <CircularProgress size={24} color="inherit" /> : 'Registrar Cliente'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormularioCliente;