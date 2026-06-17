import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { Outlet, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { useAdmin } from './hook/useAdmin.js';

function App() {

    const { adminActivo } = useAdmin();

    if (!adminActivo) {
      return <Navigate to="/" replace />;
    }

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
