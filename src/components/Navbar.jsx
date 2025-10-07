// src/components/Navbar.jsx

import "../styles/navbar.css"; 
import logo from "../assets/logo.png";

// O Navbar agora recebe o usuário atual (currentUser) e a função de logout
export default function Navbar({ currentUser, setContent, handleLogout }) {
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => setContent("Home")}>
        <img src={logo} alt="Logo" />
      </div>
      
      <ul className="menu">
        <li onClick={() => setContent("Home")}>Home</li>
        <li onClick={() => setContent("UsersList")}>Outros Players</li>
        <li onClick={() => setContent("Play")}>Play</li>
        
        {/* Lógica condicional: muda o link dependendo do estado de login */}
        {currentUser ? (
          <li onClick={handleLogout}>Sair</li>
        ) : (
          <li onClick={() => setContent("Auth")}>Entrar / Cadastrar</li>
        )}
      </ul>

      {/* Mostra o nome do usuário se ele estiver logado */}
      {currentUser && (
        <div className="user-info">
          Olá, {currentUser.name}!
        </div>
      )}
    </nav>
  );
}