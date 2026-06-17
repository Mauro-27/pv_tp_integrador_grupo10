import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext.jsx';

export const useAdmin = () => {
  const context = useContext(AdminContext);
  
  if (context === undefined) {
    throw new Error('useAdmin debe ser usado dentro de un ProveedorAdmin');
  }
  
  return context;
};