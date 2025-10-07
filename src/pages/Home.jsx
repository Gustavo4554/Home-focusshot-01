// src/pages/Home.jsx

import Hero from "../components/Hero";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";

// A página agora recebe 'setContent' e passa para o Hero
export default function Home({ setContent }) {
  return (
    <div>
      <Hero setContent={setContent} />
      <Feedback />
      <Footer />
    </div>
  );
}