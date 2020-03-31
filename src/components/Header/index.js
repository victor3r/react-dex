import React from 'react';
import { Link } from 'react-router-dom';

import pokedexImg from '../../assets/pokedex.svg';
import pokeballImg from '../../assets/team.svg';

import "./styles.css";

const Header = () => (
  <header className="header-container">
    <Link to="/">
      <img src={pokedexImg} alt="ReáctDex" />
      <span>ReáctDex</span>
    </Link>
    <Link to="/team">
      <span>My team</span>
      <img src={pokeballImg} alt="Pokeball" className="pokeballImg" />
    </Link>
  </header>
);

export default Header;