// src/pages/AuthPage.jsx

import React, { useState } from 'react'; 
import { useLocalStorage } from '../hooks/useLocalStorage';
import '../styles/forms.css';

// ... (Componentes LoginForm e RegisterForm continuam EXATAMENTE IGUAIS) ...
// --- Componente de Login ---
function LoginForm({ onLoginSuccess, onNeedToRegister }) {
  const [email, setEmail] = useState('');
  const [users] = useLocalStorage('users', []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const userFound = users.find(user => user.email === email);
    if (userFound) {
      alert(`Bem-vindo(a) de volta, ${userFound.name}!`);
      onLoginSuccess(userFound);
    } else {
      alert('Usuário não encontrado.');
    }
  };
  return (
    <form className="auth-container" onSubmit={handleSubmit}>
      <h2>Focus Shot</h2>
      <p>Faça login para continuar</p>
      <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit">Entrar</button>
      <p>Não tem uma conta? <span className="toggle" onClick={onNeedToRegister}>Cadastre-se</span></p>
    </form>
  );
}
// --- Componente de Cadastro ---
function RegisterForm({ onRegisterSuccess, onHaveAccount }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState(''); 
  const [email, setEmail] = useState('');
  const [users, setUsers] = useLocalStorage('users', []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      alert('Este e-mail já foi cadastrado.');
      return;
    }
    const newUser = { name, age, email };
    setUsers([...users, newUser]);
    alert('Cadastro realizado com sucesso!');
    onRegisterSuccess();
  };
  return (
    <form className="auth-container" onSubmit={handleSubmit}>
      <h2>Criar Conta</h2>
      <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Idade" value={age} onChange={(e) => setAge(e.target.value)} required />
      <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit">Cadastrar</button>
      <p>Já tem uma conta? <span className="toggle" onClick={onHaveAccount}>Faça login</span></p>
    </form>
  );
}


// --- Componente Principal da Página ---
// Ele agora recebe setCurrentUser como prop e não define mais o seu próprio
function AuthPage({ setContent, setCurrentUser }) {
  const [showLogin, setShowLogin] = useState(true);

  // A função de login agora usa as props recebidas do App.jsx
  const handleLogin = (user) => {
    setCurrentUser(user);
    setContent('Play'); 
  };

  return (
    <div className="auth-page-wrapper">
      {showLogin ? (
        <LoginForm 
          onLoginSuccess={handleLogin} 
          onNeedToRegister={() => setShowLogin(false)} 
        />
      ) : (
        <RegisterForm 
          onRegisterSuccess={() => setShowLogin(true)}
          onHaveAccount={() => setShowLogin(true)}
        />
      )}
    </div>
  );
}

export default AuthPage;