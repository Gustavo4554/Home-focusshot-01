import "../styles/navbar.css";
import logo from "../assets/logo.png";

export default function Navbar({ setContent }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="menu">
        <li onClick={() => setContent("Home")}>Home</li>
        <li onClick={() => setContent("Ranking")}>Ranking</li>
        <li onClick={() => setContent("Play")}>Play</li>
      </ul>
      <div className="actions">
        <button
          className="login"
          
          onClick={() => setContent("Register")}
        >
          Login
        </button>
        <button
          className="get-started"
         
          onClick={() => setContent("Register")}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}