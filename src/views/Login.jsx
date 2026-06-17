import { useState } from 'react';
import { Container, Box, Typography, TextField, MenuItem, Select, Button, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../hook/useAdmin.js';
import adminService from '../service/adminService.js';

const Login = () => {

  const { guardarSesion } = useAdmin();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [sector, setSector] = useState('');
  const [error, setError] = useState(''); 

  const manejarIngreso = async (e) => {
    e.preventDefault();
    setError(''); 
    
    if (nombre && sector) {
      try {
        const data = await adminService.login(nombre, sector);
        
        guardarSesion(data);
        navigate('/app');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Acceso de Administrador
        </Typography>
        
        <Box component="form" onSubmit={manejarIngreso} sx={{ mt: 1, width: '100%' }}>
          
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nombre del Administrador"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Sector de la Empresa</InputLabel>
            <Select
              value={sector}
              label="Sector de la Empresa"
              onChange={(e) => setSector(e.target.value)}
            >
              <MenuItem value="Soporte">Soporte</MenuItem>
              <MenuItem value="Gerencia">Gerencia</MenuItem>
            </Select>
          </FormControl>

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
              {error}
            </Typography>
          )}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Ingresar
          </Button>
          
        </Box>
      </Box>
    </Container>
  );
};

export default Login;