import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import api from '../../services/api';

import './styles.css';

export default function Detail(props) {
  const [name, setName] = useState('');
  const [pokemonIndex, setPokemonIndex] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [types, setTypes] = useState('');

  useEffect(() => {
    loadData();
  });

  async function loadData() {
    const response = await api.get(`pokemon/${props.match.params.id}`);
    setPokemonIndex(response.data.id);
    setImageUrl(response.data.sprites.front_default);
    setName(response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1));
  }

  return (
    <>
      <Header />
      <div className="detail-container">
        <div className="content">
          <div className="content-header">
            <span>{pokemonIndex}</span>
          </div>
          <div className="status-container">
            <img src={imageUrl} alt={name} />
          </div>
          <div className="profile-container">
            <span>{name}</span>
          </div>
        </div>
      </div>
    </>
  );
}