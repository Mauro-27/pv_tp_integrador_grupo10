import { Container, Typography, Box, Card, CardContent, Grid } from '@mui/material';
import { clienteService } from '../service/clienteService.js'; 
import '../css/dashboard.css';

const Dashboard = () => {
  // Obtenemos los clientes activos desde el servicio
  const clientesActivos = clienteService.obtenerClientes();
  const totalClientesActivos = clientesActivos.length;

  return (
    <Container maxWidth="lg" className="dashboard-contenedor" sx={{ mt: 4 }}>
      
      <Grid container spacing={4}>
        
        {/* Sección de encabezado del Dashboard */}
        <Grid xs={12}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="600" color="primary">
             Dashboard
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Bienvenido al panel principal de gestión de clientes.
          </Typography>
        </Grid>

        {/* Sección de Tarjetas de Estadísticas */}
        <Grid xs={12} sm={6} md={4}>
          <Card className="dashboard-tarjeta" elevation={2}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Clientes Activos
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {totalClientesActivos}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Aquí puedes agregar más tarjetas en el futuro (ej. Clientes eliminados, Total de ventas, etc.) */}
        <Grid  xs={12} sm={6} md={4}>
          <Card className="dashboard-tarjeta" elevation={2} sx={{ height: '100%' }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Estado del sistema
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="success.main">
                En línea
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
};

export default Dashboard;