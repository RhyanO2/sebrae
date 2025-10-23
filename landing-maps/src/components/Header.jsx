import { Link, useLocation } from "react-router-dom";
import einsteinLogo from "../assets/images/einstein-logo.png";

export default function Header() {
  const { pathname } = useLocation();

  const linkStyle = (path) =>
    `px-3 py-2 rounded-md font-medium ${
      pathname === path
        ? "bg-green-600 text-white"
        : "text-green-700 hover:bg-green-100 transition"
    }`;

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-[9999]">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          
          <h1 className="text-2xl font-bold">Ecopurriff Map</h1>
        </div>

        <div className="flex space-x-3">
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
