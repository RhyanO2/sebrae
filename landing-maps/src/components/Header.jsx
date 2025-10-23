import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  const linkStyle = (path) => (pathname === path ? "#248232" : "#053a0d");
  return (
    <header>
      <nav>
        <div>
          <h1>Ecopurriff Map</h1>
        </div>

        <div>
          <Link to="/" className={linkStyle("/")}>
            Início
          </Link>
          <Link to="/sobre" className={linkStyle("/sobre")}>
            Sobre Nós
          </Link>
          <Link to="/login" className={linkStyle("/login")}>
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
