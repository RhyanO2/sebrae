import './Footer.css';
import senaiLogo from '../../assets/images/senai-logo.png';
import sesiLogo from '../../assets/images/sesi-logo.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logos">
          <img src={sesiLogo} alt="SESI Logo" className="footer__logo" />
          <img src={senaiLogo} alt="SENAI Logo" className="footer__logo" />
        </div>
        <div className="footer__copyright">
          <p>&copy; {new Date().getFullYear()} Todos os direitos reservados para Einstein Ambiental</p>
        </div>
      </div>
    </footer>
  );
}
