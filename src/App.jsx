//import { useState } from 'react' comentado por el momento evitar error
import { AdminProvider } from './context/AdminContext'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import ListaClientes from './views/ListaCliente'


function App() {

    return(
    <AdminProvider>
      <main>
        <Login />
        <Dashboard />
        <ListaClientes />
      </main>
    </AdminProvider>
  )
}

export default App
