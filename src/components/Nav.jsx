import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const enlaces = [
  { texto: 'Dashboard', to: '/', exact: true },
  { texto: 'Lista de Clientes', to: '/clientes', exact: false }
];

const Nav = () => {
  return (
    <Box component="nav" sx={{ display: 'flex', gap: 2 }}>
      {enlaces.map((enlace) => (
        <Button 
          key={enlace.to}
          color="inherit" 
          component={NavLink} 
          to={enlace.to}
          end={enlace.exact}
          style={({ isActive }) => ({
            borderBottom: isActive ? '2px solid white' : 'none',
            borderRadius: isActive ? '0' : '4px'
          })}
        >
          {enlace.texto}
        </Button>
      ))}
    </Box>
  );
};

export default Nav;