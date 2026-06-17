import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Nav from './Nav';
import { useAdmin } from '../hook/useAdmin.js';

function Header() {
  const { adminActivo, cerrarSesion } = useAdmin();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Panel de Control de Clientes
        </Typography>
        {adminActivo && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Nav />
            <Typography variant="body2">
              {adminActivo.nombre} | {adminActivo.sector}
            </Typography>
            <Button color="inherit" variant="outlined" onClick={cerrarSesion}>
              Cerrar Sesión
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;