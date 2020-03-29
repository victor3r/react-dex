import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprite } from './Sprite';

import '../styles.css';

export default function PokemonCard({ name, index }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    setImageUrl(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`);
  }, [index]);

  return (
    <li >
      <Link to={`detail/${index}`} >
        <div className="card-header">
          <span>{index}</span>
        </div>
        <Sprite src={imageUrl} alt={name} />
        <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
      </Link>
    </li>
  );
}