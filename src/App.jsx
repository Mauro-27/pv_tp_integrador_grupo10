//import { useState } from 'react' comentado por el momento evitar error
//import { AdminProvider } from './context/AdminContext'
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

function App() {

    return(
      <div>
        <Header/>
        <Container maxWidth="lg" sx={{minHeight: '80vh', mt: 4, mb: 4}}>
          <main>
            <Outlet /> 
          </main>
        </Container>

        <Footer />
      </div>
  )
}

export default App
