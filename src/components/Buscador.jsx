import { Box, Typography, TextField } from "@mui/material";

const Buscador = ({ busqueda, setBusqueda, deshabilitado }) => {
  return (
    <Box className="lista-seccion-buscador">
      <Typography variant="h5" gutterBottom color="primary">
        Buscador de Clientes
      </Typography> 
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Filtrar por apellido o ciudad..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)} 
        disabled={deshabilitado}
      />
    </Box>
  );
};

export default Buscador;