import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import '../styles/forms.css'; // Reutilizando o estilo dos formulários

// Estilos básicos para a lista
const listStyles = {
  color: 'white',
  padding: '40px',
  textAlign: 'center'
};

const userCardStyles = {
  backgroundColor: '#16213e',
  border: '1px solid #00aaff',
  borderRadius: '8px',
  padding: '15px',
  margin: '10px auto',
  maxWidth: '400px',
  textAlign: 'left'
};

export default function UsersListPage() {
  // A mesma mágica: usamos o hook para ler os usuários salvos!
  const [users] = useLocalStorage('users', []);

  return (
    <div style={listStyles}>
      <h2>Usuários Cadastrados</h2>
      
      {users.length > 0 ? (
        <div>
          {users.map((user, index) => (
            <div key={index} style={userCardStyles}>
              <p><strong>Nome:</strong> {user.name}</p>
              <p><strong>Idade:</strong> {user.age}</p>
              <p><strong>E-mail:</strong> {user.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum usuário cadastrado ainda.</p>
      )}
    </div>
  );
}