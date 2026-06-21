import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Button, CircularProgress, Alert, Box } from '@mui/material';
import { useAdmin } from '../hook/useAdmin';
import apiService from '../service/apiService'; 

const DetalleCliente = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { adminActivo } = useAdmin(); 
  const [cliente, setCliente] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        setCargando(true);
        const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`);
        if (!respuesta.ok) throw new Error('No se puede acceder al detalle del cliente en este momento.');
        const datos = await respuesta.json();
        setCliente(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerCliente();
  }, [id]);

  const manejarEliminar = async () => {
    try {
      await fetch(`https://fakestoreapi.com/users/${id}`, { method: 'DELETE' });

      const clientesGuardados = localStorage.getItem('api_clientes_data');
      if (clientesGuardados) {
        const clientesLocales = JSON.parse(clientesGuardados);
        
        const nuevaLista = clientesLocales.filter(cliente => cliente.id !== Number(id));
        
        localStorage.setItem('api_clientes_data', JSON.stringify(nuevaLista));
      }

      alert('Cliente eliminado de la Base de Datos exitosamente.');
      navigate('/app/clientes'); 
    } catch (error) {
      alert('Error al intentar eliminar el cliente.');
    }
  };

  if (cargando) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Container sx={{ mt: 2 }}><Alert severity="error">{error}</Alert></Container>;
  if (!cliente) return null;

  const { name, email, phone, address, username, password } = cliente;
  const { firstname, lastname } = name;
  const { street, number, city, zipcode } = address;

  return (
    <Container maxWidth="md">
      <Button variant="outlined" onClick={() => navigate('/app/clientes')} sx={{ mb: 2 }}>
        Volver a la Tabla
      </Button>
      
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ textTransform: 'capitalize' }}>
            Cliente: {firstname} {lastname}
          </Typography>
          
          <Typography variant="h6" color="primary">Contacto</Typography>
          <Typography variant="body1"><strong>Email:</strong> {email}</Typography>
          <Typography variant="body1"><strong>Teléfono:</strong> {phone}</Typography>
          
          <Box sx={{ mt: 3, mb: 3 }}>
            <Typography variant="h6" color="primary">Dirección Completa</Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}><strong>Calle:</strong> {street} N° {number}</Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}><strong>Ciudad:</strong> {city}</Typography>
            <Typography variant="body2"><strong>Código Postal:</strong> {zipcode}</Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" color="primary">Credenciales de Sistema</Typography>
            <Typography variant="body2"><strong>Usuario:</strong> {username}</Typography>
            <Typography variant="body2"><strong>Contraseña:</strong> {password}</Typography>
          </Box>

          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {adminActivo?.sector === 'Gerencia' ? (
              <Button 
                variant="contained" 
                color="error" 
                fullWidth
                onClick={manejarEliminar}
              >
                Eliminar Cliente de la Base de Datos
              </Button>
            ) : (
              <Alert severity="info" variant="outlined">
                Modo de Solo Lectura: Como miembro de <strong>{adminActivo?.sector || 'Soporte'}</strong>, solo puedes visualizar los datos.
              </Alert>
            )}
          </Box>

        </CardContent>
      </Card>
    </Container>
  );
};

export default DetalleCliente;