import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../services/api';
import './styles.css';
import PokemonCard from './components/PokemonCard';

export default function Pokemons() {
  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState('');
  const [count, setCount] = useState('');

  useEffect(() => {
    loadPokemons();
  }, []);

  async function loadPokemons(offset = 0) {
    const response = await api.get(`pokemon?offset=${offset}&limit=20`);
    setResults(response.data.results);
    setOffset(offset);
    setCount(response.data.count);
  }

  function prevPage() {
    if (offset === 0) return;

    const offsetNumber = offset - 20;

    loadPokemons(offsetNumber);
  }

  function nextPage() {
    if (offset === count) return;

    const offsetNumber = offset + 20;

    loadPokemons(offsetNumber);
  }

  return (
    <>
      <Header />
      <div className="pokemons-container">
        <ul>
          {results.map(result => (
            <PokemonCard
              index={result.url.split('/')[6]}
              key={result.name}
            />
          ))}
        </ul>
        <div className="actions">
          <button disabled={offset === 0} onClick={prevPage}>Previous</button>
          <button disabled={offset === count} onClick={nextPage}>Next</button>
        </div>
      </div>
    </>
  );
}