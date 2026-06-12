import { clienteService } from "../service/clienteService.js";
import { useState, useEffect, useRef } from "react";
{/*import FormularioCliente from "../components/FormularioCliente.jsx";*/}
{/*import RegistroActividad from "../components/RegistroActividad.jsx";*/}
import { 
  Container, Typography, TextField, Box, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper 
} from "@mui/material";
import '../css/listaCliente.css';

const ListaClientes = () => {
  const [clientes, setClientes] = useState(clienteService.obtenerClientes());
  const [busqueda, setBusqueda] = useState("");
  const [ultimaModificacion, setUltimaModificacion] = useState("");

  const primerRender = useRef(true);

  useEffect(() => {
    if (primerRender.current) {
      primerRender.current = false;
      return;
    }

    const ahora = new Date();
    const cambiarFecha = ahora.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const cambiarHora = ahora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
    
    const horaFormateada = `${cambiarFecha} a las ${cambiarHora} hs.`;
    
    setUltimaModificacion(horaFormateada);
  }, [clientes]);

  const manejarAgregarCliente = (nuevoCliente) => {
    clienteService.agregarCliente(nuevoCliente);
    setClientes(clienteService.obtenerClientes());
  };

  const manejarBusqueda = (evento) => {
    setBusqueda(evento.target.value);
  };

  const manejarEliminar = (id) => {
    clienteService.eliminarCliente(id);
    setClientes(clienteService.obtenerClientes());
  };

  const clientesFiltrados = clientes.filter((cliente) => {
    const textoBuscado = busqueda.toLowerCase();
    const coincideApellido = cliente.Nombre.toLowerCase().includes(textoBuscado);
    const coincideCiudad = cliente.Ciudad.toLowerCase().includes(textoBuscado);
    
    return coincideApellido || coincideCiudad;
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
          onChange={manejarBusqueda}
        />
      </Box>

      {/* Formulario 
      <Box className="lista-seccion-formulario">
        <FormularioCliente onAgregarCliente={manejarAgregarCliente} />
      </Box>*/}

      {/* Lista de Clientes en Formato Tabla */}
      <Typography variant="h4" className="lista-titulo-separador">
        Clientes Actuales
      </Typography>
      
      <TableContainer component={Paper} elevation={3} className="tabla-contenedor">
        <Table sx={{ minWidth: 650 }} aria-label="tabla de clientes">
          
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
                  <TableCell>{cliente.Nombre}</TableCell>
                  <TableCell>{cliente.Email}</TableCell>
                  <TableCell>{cliente.Telefono}</TableCell>
                  <TableCell>{cliente.Ciudad}</TableCell>
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

      {/* Registro de Actividad */}
      {/*<RegistroActividad fechaUltimaModificacion={ultimaModificacion} />*/}
      
    </Container>
  );
};

export default ListaClientes;