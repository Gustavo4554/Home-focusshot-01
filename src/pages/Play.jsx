// src/pages/Play.jsx

// O caminho correto é: '../components/NomeDoComponente'
import TesteDeClique from "../components/TesteDeClique"; // <--- Ajuste esta linha

export default function Play() {
  return (
    <div style={{ 
      color: "white", 
      textAlign: "center",  
    }}>

      <TesteDeClique /> 
    </div>
  );
}