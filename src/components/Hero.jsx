import "../styles/hero.css";
import mascot from "../assets/mascot.png"; 

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">

        <h1><h1>
  Test your click<br />
  speed with<br />
  FocusShot
</h1>
</h1>
        <p>
            FocusShot is the perfect place to sharpen<br />
  your aim, boost your reflexes, and push your<br />
  limits
        </p>
        <button className="cta">Get Started</button>
        <p className="users">50 000+ Users</p>
      </div>
      <div className="hero-img">
        <img src={mascot} alt="Mascot" />
      </div>
    </section>
  );
}
