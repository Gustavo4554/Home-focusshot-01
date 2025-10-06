import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Play from "./pages/Play"; 
import Register from './pages/Register'; // Componente de Registro

export default function App() {
  const [content, setContent] = useState("Home"); // MANTIDO

  return (
    <>
      <Navbar setContent={setContent} />
      
      {/* Lógica de Renderização Condicional EXISTENTE */}
      {content === "Home" && <Home />}
      {content === "Play" && <Play />}
      
      {/* NOVO: Renderiza a página Register */}
      {content === "Register" && <Register />} 
    </>
  );
}