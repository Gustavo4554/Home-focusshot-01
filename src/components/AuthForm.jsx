// src/components/AuthForm.jsx
import { useState, useEffect } from "react";
import "../styles/AuthForm.css";

export default function AuthForm({ initialMode = "login" }) {
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const user = users.find(
        (u) => u.email === form.email && u.password === form.password
      );
      if (user) {
        alert(`Bem-vindo(a), ${user.name}!`);
      } else {
        alert("Email ou senha incorretos.");
      }
    } else {
      const exists = users.some((u) => u.email === form.email);
      if (exists) {
        alert("Email já cadastrado!");
      } else {
        const newUser = { ...form };
        setUsers([...users, newUser]);
        alert("Cadastro realizado com sucesso!");
        setIsLogin(true);
      }
    }

    setForm({ email: "", password: "", name: "" });
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? "Login" : "Cadastro"}</h1>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? "Entrar" : "Cadastrar"}</button>
      </form>
      <p>
        {isLogin ? "Não tem conta?" : "Já tem conta?"}{" "}
        <span className="toggle" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Cadastre-se" : "Faça login"}
        </span>
      </p>
    </div>
  );
}
