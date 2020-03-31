import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import './styles.css';
import PokemonCard from '../Pokemons/components/PokemonCard';

export default function Team() {
  const [pokemonsIndex, setPokemonsIndex] = useState([]);
  const [teamPokemon, setTeamPokemon] = useState([]);

  useEffect(() => {
    let pokemonTeam = localStorage.getItem('pokemonTeam') ?
      localStorage.getItem('pokemonTeam').split(',') :
      [];

    setPokemonsIndex(pokemonTeam);

  }, [teamPokemon]);

  return (
    <>
      <Header />
      <div className="pokemons-container">
        <ul>
          {pokemonsIndex.map(index => <PokemonCard
            teamPokemon={pokemonTeam => setTeamPokemon(pokemonTeam)}
            action="free"
            index={index}
            key={index}
          />)}
        </ul>
      </div>
    </>
  );
}