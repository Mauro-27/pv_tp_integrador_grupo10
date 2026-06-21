import { Typography, Link, Box } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import '../css/footer.css';

const Footer = () => {
  return (
    <footer className="footer-contenedor">
      <div className="footer-contenido">
        
        {/* Sección 1: Identidad del Grupo */}
        <div className="footer-seccion-marca">
          <Typography variant="h6" className="footer-titulo-grupo">
            Programación Visual
          </Typography>
          <Typography variant="subtitle1" className="footer-subtitulo">
            Grupo 10
          </Typography>
          <Typography variant="body2" className="footer-descripcion">
            Panel de control de clientes desarrollado como Trabajo Práctico Final integrando React, Material-UI y consumo de APIs.
          </Typography>
        </div>

        {/* Sección 2: Redes y Contacto */}
        <div className="footer-seccion-contacto">
          <Typography variant="subtitle2" className="footer-titulo-contacto">
            CONTACTO Y SOPORTE
          </Typography>
          
          <div className="footer-enlaces">
            <Link href="#" underline="hover" className="footer-enlace-item">
              <EmailIcon fontSize="small" /> soporte@grupo10.com
            </Link>
            <Link href="#" underline="hover" className="footer-enlace-item">
              <PhoneIcon fontSize="small" /> +54 388 123 4567
            </Link>
            <Link href="#" underline="hover" className="footer-enlace-item">
              <FacebookIcon fontSize="small" /> /Grupo10Visual
            </Link>
            <Link href="#" underline="hover" className="footer-enlace-item">
              <InstagramIcon fontSize="small" /> @Grupo10.Dev
            </Link>
          </div>
        </div>

      </div>

      {/* Sección 3: Copyright */}
      <div className="footer-derechos">
        <Typography variant="body2">
          © {new Date().getFullYear()} Programación Visual - Grupo 10. Todos los derechos reservados.
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;