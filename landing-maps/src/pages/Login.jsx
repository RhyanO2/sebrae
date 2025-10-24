import { useState } from "react";
import Footer from "../components/Footer/Footer.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@teste.com" && senha === "123456") {
      setMensagem("✅ Login bem-sucedido!");
    } else {
      setMensagem("❌ Credenciais inválidas. Use admin@teste.com / 123456");
    }
  };

  return (
    <>
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit">Entrar</button>

          {mensagem && <p>{mensagem}</p>}
        </form>
      </div>
      <Footer />
    </>
  );
}
