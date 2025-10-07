/*
 * =================================================================
 * Trabalho Prático 2 – Mini Aplicativo em React (N2 - Front-end II)
 * =================================================================
 * * Título do Aplicativo: FocusShot
 * * Descrição: 
 * Mini aplicativo para teste de agilidade de cliques com cadastro
 * de usuários, persistência de dados via localStorage e ranking
 * de pontuações com gatinhos fofos de tema.
 * * --- Integrantes do Grupo ---
 * * Nome: Camila Pereira
 * E-mail: kacamilapereira@gmail.com
 * * Nome: Gustavo Costa
 * E-mail: gustavo455467@gmail.com
 * * Funções Executadas:
 * O desenvolvimento do projeto foi realizado em colaboração,
 * com ambos os integrantes participando de todas as etapas,
 * desde a estruturação e componentização até a estilização
 * e implementação das lógicas de estado e persistência.
 * * =================================================================
 */

import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage"; // Importa nosso hook
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Play from "./pages/Play"; 
import AuthPage from './pages/AuthPage';
import UsersListPage from './pages/UsersListPage';

export default function App() {
  const [content, setContent] = useState("Home");
  // 1. App agora controla o estado do usuário logado
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);

  // 2. Função de Logout
  const handleLogout = () => {
    setCurrentUser(null); // Limpa o usuário do localStorage
    setContent("Home"); // Redireciona para a Home
  };

  return (
    <>
      {/* Passamos o usuário atual e a função de logout para o Navbar */}
      <Navbar 
        currentUser={currentUser} 
        setContent={setContent} 
        handleLogout={handleLogout} 
      />
      
      {content === "Home" && <Home setContent={setContent} />}
      
      {/* 3. LÓGICA DE PÁGINA PROTEGIDA APLICADA AQUI */}
      {content === "Play" && (
        currentUser ? <Play currentUser={currentUser} /> : <AuthPage setContent={setContent} setCurrentUser={setCurrentUser} />
      )}
      
      {content === "Auth" && <AuthPage setContent={setContent} setCurrentUser={setCurrentUser} />}
      
      {content === "UsersList" && <UsersListPage />} 
    </>
  );
}