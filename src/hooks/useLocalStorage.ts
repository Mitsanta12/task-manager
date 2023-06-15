import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    // Vérifie si une valeur existe déjà dans le Local Storage pour la clé donnée
    const storedValue = localStorage.getItem(key);
    // Renvoie la valeur stockée si elle existe, sinon renvoie la valeur initiale fournie
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    // Sauvegarde la valeur dans le Local Storage à chaque fois qu'elle est mise à jour
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export { useLocalStorage };
