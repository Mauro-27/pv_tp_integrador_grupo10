import { useState, useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { Container, Box, Typography, TextField, MenuItem, Select, Button, InputLabel, FormControl } from '@mui/material';

const Login = () => {
  const { login } = useContext(AdminContext);
  const [nombre, setNombre] = useState('');
  const [sector, setSector] = useState('');

  const manejarIngreso = (e) => {
    e.preventDefault();
    if (nombre && sector) {
      login(nombre, sector);
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Ingresar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;