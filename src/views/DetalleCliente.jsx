import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Button, CircularProgress, Alert, Box } from '@mui/material';
import { useAdmin } from '../hook/useAdmin';

const DetalleCliente = () => {
  const { id } = useParams(); // caputa url del id cliente 
  const navigate = useNavigate();
  const { adminActivo } = useAdmin(); // validacion para soporte o gernecia
  
  const [cliente, setCliente] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        setCargando(true);
        const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`);
        if (!respuesta.ok) throw new Error('No se puede acceder al detalle del cliente');
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

  if (cargando) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Container sx={{ mt: 2 }}><Alert severity="error">{error}</Alert></Container>;

  return (
    <Container maxWidth="md">
      <Button variant="outlined" onClick={() => navigate('/app/clientes')} sx={{ mb: 2 }}>
        Volver a la Tabla
      </Button>
      
      {cliente && (
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Cliente: {cliente.name?.firstname} {cliente.name?.lastname}
            </Typography>
            {/* datos de contacto */}
            <Typography variant="h6" color="primary">Contacto</Typography>
            <Typography variant="body1"><strong>Email:</strong> {cliente.email}</Typography>
            <Typography variant="body1"><strong>Teléfono:</strong> {cliente.phone}</Typography>
            
            {/* titulos con datos del cliente */}
            <Box sx={{ mt: 3, mb: 3 }}>
              <Typography variant="h6" color="primary">Dirección</Typography>
              <Typography variant="body2"><strong>Calle:</strong> {cliente.address?.street} N° {cliente.address?.number}</Typography>
              <Typography variant="body2"><strong>Ciudad:</strong> {cliente.address?.city}</Typography>
              <Typography variant="body2"><strong>Código Postal:</strong> {cliente.address?.zipcode}</Typography>
            </Box>
            {/* informacion de user del cliente en el sistema */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" color="primary">Credenciales de Sistema</Typography>
              <Typography variant="body2"><strong>Usuario:</strong> {cliente.username}</Typography>
              <Typography variant="body2"><strong>Contraseña:</strong> {cliente.password}</Typography>
            </Box>

            {/* validacion de permisos para tipo de user gerencia o soporte */}
            {adminActivo?.sector === 'Gerencia' ? (
              <Alert severity="info" variant="outlined">
                Como administrador de <strong>Gerencia</strong>, tenes permiso de gestionar este perfil desde los controles globales.
              </Alert>
            ) : (
              <Alert severity="warning" variant="outlined">
                El tipo de sector: (<strong>{adminActivo?.sector || 'Soporte'}</strong>) no tiene permisos para modificar o eliminar registros.
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default DetalleCliente;