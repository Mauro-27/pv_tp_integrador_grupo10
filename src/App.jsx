import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx'; 
import { Outlet } from 'react-router-dom';
import { Container, CssBaseline, Box } from '@mui/material';

function App() {
  return(
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
 
      <CssBaseline /> 

      <Header/>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <main>
          <Outlet /> 
        </main>
      </Container>
      
      <Footer />
      
    </Box>
  );
}

export default App;