import "../styles/feedback.css";
import FeedbackCard from "./FeedbackCard";


import user1 from "../assets/user1.svg";
import user2 from "../assets/user2.svg";
import user3 from "../assets/user3.svg";
import user4 from "../assets/user4.svg";

const feedbacks = [
  { img: user1, text: "Adorei testar minha velocidade de clique! Me senti preparado e focado antes de começar minhas partidas." },
  { img: user2, text: "O teste é super divertido e realmente ajuda a aquecer meus reflexos. Percebi que minhas reações melhoraram!" },
  { img: user3, text: "Excelente ferramenta! Rápido e fácil de usar, já senti a diferença na precisão do meu clique durante os jogos." },
  { img: user4, text: "Gostei muito do teste! Agora consigo medir meu desempenho e treinar para melhorar meus tempos de resposta." }
];

export default function Feedback() {
  return (
    <section className="feedback">
      <h2>Community Feedback</h2>
      <div className="feedback-list">
        {feedbacks.map((f, i) => (
          <FeedbackCard key={i} img={f.img} text={f.text} />
        ))}
      </div>
    </section>
  );
}