import React, { useState } from "react";
import { useEffect } from "react";

export default function App() {
  const [personagens, setPersonagens] = useState([])

  useEffect(async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character')
    const data = await response.json();

    setPersonagens(data.results);
  }, []);

  // useEffect(() => {
  //   const filtered = personagens.filter(personagem => personagem.favorite);

  //   setPersonagens(data);
  // }, [];

  function handleFavorite(id) {
    const newPersonagens = personagens.map(personagem => {
      return personagem.id === id ? { ...personagem, favorite: !personagem.favorite } : personagem    
    })
    setPersonagens(newPersonagens);
  }

  return (
    <ul>
      {personagens.map(personagem => (
        <li key={personagem.id}>
          <img src={personagem.image} />
          <h3>{personagem.name}</h3>
          {personagem.favorite && <span>favorito</span>}
          <button onClick={() => handleFavorite(personagem.id)}>favoritar</button>
        </li>
      ))}
    </ul>
    );
}
