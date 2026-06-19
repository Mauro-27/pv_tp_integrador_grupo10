import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from '../hook/useAdmin.js'; 

const RutasProtegidas = () => {
  const { adminActivo } = useAdmin();

  if (!adminActivo) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RutasProtegidas;

