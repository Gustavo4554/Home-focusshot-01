import "../styles/feedbackCard.css";

export default function FeedbackCard({ img, text }) {
  return (
    <div className="feedback-card">
      <div className="card-top">
        <img src={img} alt="User" />
      </div>
      <div className="card-body">
        <p>{text}</p>
      </div>
    </div>
  );
}