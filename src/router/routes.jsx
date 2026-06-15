import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Login from '../views/Login.jsx'; 
import Dashboard from '../views/Dashboard.jsx';
import ListaClientes from '../views/ListaClientes.jsx';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/app',
    element: <App />,
    children: [
      { 
        index: true, 
        element: <Dashboard /> 
      },
      { 
        path: 'clientes', 
        element: <ListaClientes /> 
      }
    ]
  }
]);