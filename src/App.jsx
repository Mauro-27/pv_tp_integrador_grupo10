import { useState } from 'react'
import Dashboard from './views/Dashboard'
import ListaClientes from './views/ListaCliente'


function App() {

    return(
      <main>
        <Dashboard />
        <ListaClientes />
      </main>
    )
}

export default App
