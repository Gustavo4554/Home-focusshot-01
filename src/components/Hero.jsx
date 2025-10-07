// src/components/Hero.jsx

import "../styles/hero.css";
import mascot from "../assets/mascot.png"; 

// O componente agora recebe 'setContent' como propriedade
export default function Hero({ setContent }) {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>
          Test your click<br />
          speed with<br />
          FocusShot
        </h1>
        <p>
          FocusShot is the perfect place to sharpen<br />
          your aim, boost your reflexes, and push your<br />
          limits
        </p>

        {/* TAREFA 3: Adicionados novos botões */}
        <div className="hero-buttons">
            <button className="cta-primary" onClick={() => setContent("Play")}>
              Jogar Agora
            </button>
            <button className="cta-secondary" onClick={() => setContent("Auth")}>
              Entrar ou Cadastrar
            </button>
        </div>

      </div>
      <div className="hero-img">
        <img src={mascot} alt="Mascot" />
      </div>
    </section>
  );
}