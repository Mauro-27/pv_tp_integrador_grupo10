//import { useState } from 'react' comentado por el momento evitar error
//import { AdminProvider } from './context/AdminContext'
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';



function App() {

    return(
      <div>
        <Container maxWidth="lg" sx={{ minHeight: '80vh', mt: 4, mb: 4 }}>
          <main>
            <Outlet /> 
          </main>
        </Container>
      </div>
  )
}

export default App
