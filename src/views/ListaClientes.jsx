import { useClientes } from "../hook/useClientes.js";
import FormularioCliente from "../components/FormularioCliente.jsx";
import Buscador from "../components/Buscador.jsx";
import TablaClientes from "../components/TablaClientes.jsx";
import { Container, Typography, Box, CircularProgress, Alert, Snackbar } from "@mui/material";
import '../css/listaClientes.css';

const ListaClientes = () => {
  const {
    busqueda, setBusqueda,
    cargando, error,
    notificacion, setNotificacion,
    clientesFiltrados,
    manejarAgregarCliente, manejarEliminar
  } = useClientes();

  return (
    <Container maxWidth="lg" className="lista-contenedor-principal">
      
      {/* 1. Buscador */}
      <Buscador 
        busqueda={busqueda} 
        setBusqueda={setBusqueda} 
        deshabilitado={cargando || error !== null} 
      />

      {/* 2. Formulario */}
      <Box className="lista-seccion-formulario" sx={{ mb: 4 }}>
        <FormularioCliente onAgregarCliente={manejarAgregarCliente} />
      </Box>

      <Typography variant="h4" className="lista-titulo-separador">Clientes Actuales</Typography>

      {/* Control de Carga y Errores */}
      {cargando && <Box className="lista-cargando"><CircularProgress size={60} /></Box>}
      {error && !cargando && <Alert severity="error" className="lista-alerta">{error}</Alert>}

      {/* 3. Tabla de Resultados */}
      {!cargando && !error && (
        <TablaClientes 
          clientesFiltrados={clientesFiltrados} 
          manejarEliminar={manejarEliminar} 
        />
      )}
      
      <Snackbar open={notificacion.open} autoHideDuration={5000} onClose={() => setNotificacion({ ...notificacion, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setNotificacion({ ...notificacion, open: false })} severity={notificacion.severity} sx={{ width: '100%' }}>
          {notificacion.mensaje}
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default ListaClientes;