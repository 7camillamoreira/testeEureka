import React, { useState, useEffect } from "react";
import './App.css';
import Imagem from "./rickandmorty.png"

export default function App() {
  const [personagens, setPersonagens] = useState([])
  const [favoritos, setFavoritos] = useState([])

  useEffect(() => {
    async function fechData() {
      const response = await fetch('https://rickandmortyapi.com/api/character')
      const data = await response.json();
      setPersonagens(data.results);
    }
    fechData()
  }, []);

  useEffect(() => {
    setFavoritos(personagens.filter((personagem) => personagem.favorite))
  }, [personagens])

  function handleFavorite(id) {
    const newPersonagens = personagens.map(personagem => {
      return personagem.id === id ? { ...personagem, favorite: true } : personagem    
    })
    setPersonagens(newPersonagens);
  }

  function handleRemoveFavorite(id) {
    const newPersonagens = personagens.map(personagem => {
      return personagem.id === id ? { ...personagem, favorite: false } : personagem    
    })
    setPersonagens(newPersonagens);
  }

  return (
    <>
      <img src={Imagem} width="100%" height="auto" alt="imagem de capa do Rick and Morty"/>
      <div className="divisoria">
        <ul>
          {personagens.map(personagem => (
            <li key={personagem.id}>
              <img src={personagem.image} alt="foto de um personagem da sereie Rick and Morty"/>
              <h3>{personagem.name}</h3>
              <button onClick={() => handleFavorite(personagem.id)}>{personagem.favorite ? "Favorito":"favoritar"}</button>
            </li>
          ))}
        </ul>
        <ul>
          {favoritos.map(favorito => (
            <li key={favorito.id + 'favorito'}>
              <img src={favorito.image} />
              <h3>{favorito.name}</h3>
              <button onClick={() => handleRemoveFavorite(favorito.id)}>Remover</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
