import { Container, Typography, Box, Card, CardContent, Grid } from '@mui/material';
import { useState, useEffect } from 'react'; 
import apiService from '../service/apiService.js'; 
import '../css/dashboard.css';

const Dashboard = () => {
  const [totalClientesAPI, setTotalClientesAPI] = useState(0);

  useEffect(() => {
    const calcularClientes = async () => {
      const clientesGuardados = localStorage.getItem('api_clientes_data');
      if (clientesGuardados) {
        const clientesLocales = JSON.parse(clientesGuardados);
        setTotalClientesAPI(clientesLocales.length);
      } else {
        const clientesAPI = await apiService.obtenerClientesAPI();
        setTotalClientesAPI(clientesAPI.length);
        localStorage.setItem('api_clientes_data', JSON.stringify(clientesAPI));
      }
    };
    
    calcularClientes();
  }, []);

  return (
    <Container maxWidth="lg" className="dashboard-contenedor" sx={{ mt: 4 }}>
      
      <Grid container spacing={4}>
        
        <Grid xs={12}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="600" color="primary">
             Dashboard
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Bienvenido al panel principal de gestión de clientes.
          </Typography>
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <Card className="dashboard-tarjeta" elevation={2}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Clientes Activos
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {totalClientesAPI}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={4}>
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