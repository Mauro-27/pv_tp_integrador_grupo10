import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Nav from './Nav';

function Header() {
  const { admin, logout } = useContext(AdminContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Panel de Control de Clientes
        </Typography>
        {admin && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Nav />
            <Typography variant="body2">
              {admin.nombre} | {admin.sector}
            </Typography>
            <Button color="inherit" variant="outlined" onClick={logout}>
              Cerrar Sesión
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;