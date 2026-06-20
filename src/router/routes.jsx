import { createBrowserRouter } from 'react-router-dom';
import Login from '../views/Login.jsx';
import App from '../App.jsx';
import Dashboard from '../views/Dashboard.jsx';
import ListaClientes from '../views/ListaClientes.jsx';
import RutasProtegidas from '../components/RutasProtegidas.jsx';
import ErrorPage from '../views/ErrorPage.jsx';
import DetalleCliente from '../views/DetalleCliente.jsx';
export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  
  {
    element: <RutasProtegidas />, 
    children: [
      {
        path: '/app',
        element: <App />, 
        children: [
          {
            path: '', 
            element: <Dashboard />
          },
          {
            path: 'clientes',
            element: <ListaClientes />
          },
          {
            path: 'clientes/:id',
            element: <DetalleCliente />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <ErrorPage />
  }
]);