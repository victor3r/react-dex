import React from 'react';
import { Link } from 'react-router-dom';

import pokedexImg from '../../assets/logo.svg';

import "./styles.css";

const Header = () => (
  <header className="header-container">
    <Link to="/">
      <img src={pokedexImg} alt="ReáctDex" />
      <span>ReáctDex</span>
    </Link>
  </header>
);

export default Header;