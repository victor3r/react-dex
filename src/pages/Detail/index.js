import React, { useState, useEffect } from 'react';
import { Line } from 'rc-progress';

import Header from '../../components/Header';

import api from '../../services/api';

import './styles.css';

const TYPE_COLORS = {
  normal: '#B6B6A8',
  poison: '#A85C9F',
  psychic: '#F56AB6',
  grass: '#8CD851',
  ground: '#EBCA56',
  ice: '#96F0FB',
  fire: '#F95643',
  rock: '#CEBD72',
  dragon: '#8A80FC',
  water: '#57ADFA',
  bug: '#C2D227',
  dark: '#8E6956',
  fighting: '#A85642',
  ghost: '#7774D5',
  steel: '#C3C2DA',
  flying: '#79A1FB',
  electric: '#FDE23B',
  fairy: '#F5ADFE'
};

export default function Detail(props) {
  const [name, setName] = useState('');
  const [pokemonIndex, setPokemonIndex] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [types, setTypes] = useState([]);
  const [stats, setStats] = useState({
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    specialAttack: '',
    specialDefense: '',
  });
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [abilities, setAbilities] = useState([]);
  const [generation, setGeneration] = useState('');
  const [genderRatioMale, setGenderRatioMale] = useState('');
  const [genderRatioFemale, setGenderRatioFemale] = useState('');
  const [description, setDescription] = useState('');
  const [catchRate, setCatchRate] = useState('');
  const [habitat, setHabitat] = useState('Indeterminate');
  const [growthRate, setGrowthRate] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const response = await api.get(`pokemon/${props.match.params.id}`);
    setPokemonIndex(props.match.params.id);
    setImageUrl(response.data.sprites.front_default);
    setName(response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1));

    let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

    response.data.stats.map(stat => {
      switch (stat.stat.name) {
        case 'hp':
          hp = stat.base_stat;
          break;

        case 'attack':
          attack = stat.base_stat;
          break;

        case 'defense':
          defense = stat.base_stat;
          break;

        case 'speed':
          speed = stat.base_stat;
          break;

        case 'special-attack':
          specialAttack = stat.base_stat;
          break;

        case 'special-defense':
          specialDefense = stat.base_stat;
      }
    });

    setHeight(response.data.height * 10);
    setWeight(response.data.weight / 10);

    setTypes(response.data.types.map(type => (type.type.name)));

    if (response.data.types[1]) {
      setColor(response.data.types[1].type.name);
    }
    else {
      setColor(response.data.types[0].type.name);
    }

    setAbilities(response.data.abilities.map(
      ability => (
        ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)
      )
    ).join(', '));

    const species = await api.get(`pokemon-species/${props.match.params.id}`);
    setDescription(species.data.flavor_text_entries.find(
      flavor => (flavor.language.name === 'en')
    ).flavor_text);

    setGenderRatioFemale(species.data.gender_rate * 12.5);
    setGenderRatioMale(100 - genderRatioFemale);

    setCatchRate(((species.data.capture_rate * 100) / 255).toFixed(2));

    setGeneration(species.data.generation.name.split('-')[1].toUpperCase());

    setGrowthRate(species.data.growth_rate.name.charAt(0).toUpperCase() +
      species.data.growth_rate.name.slice(1));

    if (species.data.habitat) {
      setHabitat(species.data.habitat.name.charAt(0).toUpperCase() +
        species.data.habitat.name.slice(1));
    }

    setStats({
      hp,
      attack,
      defense,
      speed,
      specialAttack,
      specialDefense,
    });
  }

  return (
    <>
      <Header />
      <div className="detail-container">
        <div className="content">
          <div className="content-header">
            <span>{pokemonIndex}</span>
            <div className="type-container">
              {types.map(type => (
                <span
                  className="type"
                  key={type}
                  style={{ backgroundColor: `${TYPE_COLORS[type]}` }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              ))}
            </div>
          </div>
          <div className="status-container">
            <div className="status-content">
              <div className="img-container">
                <img src={imageUrl} alt={name} className="pokeImg" />
              </div>
              <div className="status-bar-container">
                <div className="name"><h2>{name}</h2></div>
                <div className="status-div">HP <Line
                  percent={stats.hp}
                  strokeWidth="3"
                  strokeColor={TYPE_COLORS[color]}
                  className="line-bar"
                  trailWidth="3"
                  strokeLinecap="butt"
                />
                </div>
                <div className="status-div">Attack <Line
                  percent={stats.attack}
                  strokeWidth="3"
                  strokeColor={TYPE_COLORS[color]}
                  className="line-bar"
                  trailWidth="3"
                  strokeLinecap="butt"
                />
                </div>
                <div className="status-div">Defense <Line
                  percent={stats.defense}
                  strokeWidth="3"
                  strokeColor={TYPE_COLORS[color]}
                  className="line-bar"
                  trailWidth="3"
                  strokeLinecap="butt"
                />
                </div>
                <div className="status-div">Speed <Line
                  percent={stats.speed}
                  strokeWidth="3"
                  strokeColor={TYPE_COLORS[color]}
                  className="line-bar"
                  trailWidth="3"
                  strokeLinecap="butt"
                />
                </div>
                <div className="status-div">Special Attack <Line
                  percent={stats.specialAttack}
                  strokeWidth="3"
                  strokeColor={TYPE_COLORS[color]}
                  className="line-bar"
                  trailWidth="3"
                  strokeLinecap="butt"
                />
                </div>
                <div className="status-div">Special Defense <Line
                  percent={stats.specialDefense}
                  strokeWidth="3"
                  strokeColor={TYPE_COLORS[color]}
                  className="line-bar"
                  trailWidth="3"
                  strokeLinecap="butt"
                />
                </div>
              </div>
            </div>
            <div className="status-footer">
              <p>{description}</p>
            </div>
          </div>
          <div className="profile-container">
            <div className="profile-header">
              <h3 className="profile-text">Profile</h3>
            </div>
            <div className="profile-content">
              <div className="profile-content-left">
                <div className="profile-stats">Height: {height} cm</div>
                <div className="profile-stats">Weight: {weight} kg</div>
                <div className="profile-stats">Catch Rate: {catchRate}%</div>
                <div className="profile-stats-bar">
                  Gender Ratio: <Line
                    percent={genderRatioFemale}
                    strokeWidth="6"
                    trailWidth="6"
                    strokeColor="#C33E5B"
                    trailColor="#1976D2"
                    className="bar-gender"
                    strokeLinecap="butt"
                  />
                </div>
              </div>
              <div className="profile-content-right">
                <div className="profile-stats">Habitat: {habitat}</div>
                <div className="profile-stats">Generation: {generation}</div>
                <div className="profile-stats">Growth Rate: {growthRate}</div>
                <div className="profile-stats">Abilities: {abilities}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}