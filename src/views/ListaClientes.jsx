import { clienteService } from "../service/clienteService.js";
import { useState, useEffect, useRef } from "react";
import apiService from "../service/apiService.js";
import FormularioCliente from "../components/FormularioCliente.jsx";
{/*import RegistroActividad from "../components/RegistroActividad.jsx"; DEJO PARA EL REGISTRO ACTIVIDAD*/}
import { 
  Container, Typography, TextField, Box, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  CircularProgress, Alert, Snackbar
} from "@mui/material";
import '../css/listaClientes.css';

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [ultimaModificacion, setUltimaModificacion] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [notificacion, setNotificacion] = useState({ open: false, mensaje: '', severity: 'success' });

  const primerRender = useRef(true);

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      setError(null);
      try {
        const datosAPI = await apiService.obtenerClientesAPI();
        setClientes(datosAPI);
      } catch (err) {
        setError("Error de conexión: No se pudo cargar la información del servidor.");
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  useEffect(() => {
    if (primerRender.current) {
      primerRender.current = false;
      return;
    }
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const hora = ahora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
    
    setUltimaModificacion(`${fecha} a las ${hora} hs.`);
  }, [clientes]);

  const manejarAgregarCliente = async (nuevoCliente) => {
    try {
      const respuesta = await apiService.agregarClienteAPI(nuevoCliente);
      // FakeStoreAPI simula la subida y devuelve un ID
      setClientes([{ ...nuevoCliente, id: respuesta.id }, ...clientes]);
      setNotificacion({ open: true, mensaje: `¡Cliente creado exitosamente! ID asignado: ${respuesta.id}`, severity: 'success' });
    } catch (err) {
      setNotificacion({ open: true, mensaje: err.message, severity: 'error' });
    }
  };

  const manejarEliminar = (id) => {
    clienteService.eliminarCliente(id);
    setClientes(clienteService.obtenerClientes());
  };

  const clientesFiltrados = clientes.filter((c) => {
    const texto = busqueda.toLowerCase();
    return c.name.lastname.toLowerCase().includes(texto) || c.address.city.toLowerCase().includes(texto);
  });

  return (
    <Container maxWidth="lg" className="lista-contenedor-principal">
      
      {/* Buscador */}
      <Box className="lista-seccion-buscador">
        <Typography variant="h5" gutterBottom color="primary">
          Buscador de Clientes
        </Typography> 
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Filtrar por apellido o ciudad..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)} // Resumido en una línea
          disabled={cargando || error !== null}
        />
      </Box>

      {/* formulario */}
      <Box className="lista-seccion-formulario" sx={{ mb: 4 }}>
        <FormularioCliente onAgregarCliente={manejarAgregarCliente} />
      </Box>

      <Typography variant="h4" className="lista-titulo-separador">
        Clientes Actuales
      </Typography>

      {/* Control de Estados limpios con CSS */}
      {cargando && (
        <Box className="lista-cargando">
          <CircularProgress size={60} />
        </Box>
      )}

      {error && !cargando && (
        <Alert severity="error" className="lista-alerta">
          {error}
        </Alert>
      )}

      {!cargando && !error && (
        <TableContainer component={Paper} elevation={3} className="tabla-contenedor">
          <Table className="tabla-clientes" aria-label="tabla de clientes">
            
            <TableHead className="tabla-encabezado">
              <TableRow>
                <TableCell className="tabla-celda-head">ID</TableCell>
                <TableCell className="tabla-celda-head">Nombre Completo</TableCell>
                <TableCell className="tabla-celda-head">Email</TableCell>
                <TableCell className="tabla-celda-head">Teléfono</TableCell>
                <TableCell className="tabla-celda-head">Ciudad</TableCell>
                <TableCell className="tabla-celda-head tabla-celda-center">Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {clientesFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No se encontraron clientes con esos parámetros.
                  </TableCell>
                </TableRow>
              ) : (
                clientesFiltrados.map((cliente) => (
                  <TableRow key={cliente.id} hover>
                    <TableCell>{cliente.id}</TableCell>
                    
                    <TableCell className="texto-capitalizado">
                      {cliente.name.firstname} {cliente.name.lastname}
                    </TableCell>
                    
                    <TableCell>{cliente.email}</TableCell>
                    <TableCell>{cliente.phone}</TableCell>
                    
                    <TableCell className="texto-capitalizado">
                      {cliente.address.city}
                    </TableCell>
                    
                    <TableCell align="center">
                      <Button 
                        variant="contained" 
                        color="error" 
                        size="small"
                        onClick={() => manejarEliminar(cliente.id)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>

          </Table>
        </TableContainer>
      )}
            
      {/* Registro de Actividad  ACA EL REGISTRO DE ACTIVIDAD*/}
      {/*<RegistroActividad fechaUltimaModificacion={ultimaModificacion} />*/}
      
      <Snackbar 
        open={notificacion.open} 
        autoHideDuration={5000} 
        onClose={() => setNotificacion({ ...notificacion, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setNotificacion({ ...notificacion, open: false })} severity={notificacion.severity} sx={{ width: '100%' }}>
          {notificacion.mensaje}
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default ListaClientes;