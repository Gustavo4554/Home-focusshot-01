import "../styles/navbar.css";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="menu">
        <li>Home</li>
        <li>Ranking</li>
        <li>Play</li>
      </ul>
      <div className="actions">
        <button
          className="login"
          onClick={() => window.location.href = "/login"}
        >
          Login
        </button>
        <button
          className="get-started"
          onClick={() => window.location.href = "/get-started"}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}
