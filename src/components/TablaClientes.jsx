import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const TablaClientes = ({ clientesFiltrados, manejarEliminar, esGerente }) => {
  return (
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
                  {cliente.name?.firstname} {cliente.name?.lastname}
                </TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.phone}</TableCell>
                <TableCell className="texto-capitalizado">{cliente.address?.city}</TableCell>

                <TableCell align="center">
                  
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    Detalles
                  </Button>
                  
                  {esGerente && (
                    <Button 
                      variant="contained" 
                      color="error" 
                      size="small"
                      onClick={() => manejarEliminar(cliente.id)}
                    >
                      Eliminar
                    </Button>
                  )}

                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

      </Table>
    </TableContainer>
  );
};

export default TablaClientes;