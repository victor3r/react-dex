import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprite } from './Sprite';
import api from '../../../services/api';
import catchImg from '../../../assets/catch.svg';
import freeImg from '../../../assets/free.svg';

import '../styles.css';

export default function PokemonCard({ index, action, teamPokemon }) {
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState();
  const [buttonText, setButtonText] = useState('');
  const [actionImg, setActionImg] = useState('');

  useEffect(() => {
    setImageUrl(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`);
    getName();
    if (action === 'free') {
      setButtonText('Free');
      setActionImg(freeImg);
    }
    else {
      setButtonText('Catch');
      setActionImg(catchImg);
    }
  }, [index, action]);

  async function getName() {
    const response = await api.get(`pokemon/${index}`);
    setName(response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1));
  }

  function catchPokemon() {
    let pokemonTeam = localStorage.getItem('pokemonTeam') ?
      localStorage.getItem('pokemonTeam').split(',') :
      [];

    let teamSize = pokemonTeam.length;

    if (teamSize === 6) {
      alert('Full team!');
      return;
    }

    pokemonTeam.push(index);

    localStorage.setItem('pokemonTeam', pokemonTeam.toString());
  }

  function freePokemon() {
    let pokemonTeam = localStorage.getItem('pokemonTeam').split(',');

    pokemonTeam.splice(pokemonTeam.indexOf(index), 1);

    localStorage.setItem('pokemonTeam', pokemonTeam.toString());

    teamPokemon(pokemonTeam);
  }

  return (
    <li >
      <div className="card-header">
        <span>{index}</span>
        <button
          onClick={action === 'free' ? freePokemon : catchPokemon}
          className="action-button"
        >
          {buttonText}
          <img src={actionImg} alt={action} />
        </button>
      </div>
      <Link to={`/detail/${index}`} >
        <Sprite src={imageUrl} alt={name} />
        <span>{name}</span>
      </Link>
    </li>
  );
}