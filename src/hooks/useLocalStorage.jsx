// src/hooks/useLocalStorage.jsx

import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  // 1. O estado é inicializado da mesma forma de antes
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // 2. Criamos uma nova versão da função 'setValue'
  const setValue = (value) => {
    try {
      // Permite que o novo valor seja uma função (padrão do React)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // 3. Atualiza o estado do React
      setStoredValue(valueToStore);
      
      // 4. Salva o novo valor diretamente no localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));

    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}