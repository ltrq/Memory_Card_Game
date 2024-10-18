import React, { useState, useEffect } from 'react';
import './Card.css';

function Card({ pokedexIndex }) {
  const [data, setData] = useState(null);

  // Fetch Pokémon data when the component mounts or when pokedexIndex changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokedexIndex}/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [pokedexIndex]);

  // Destructure data for easier access
  const pokemonName = data?.name;
  const pokemonSprite = data?.sprites?.front_default;

  return (
    <div className="card-front">
      <img src={pokemonSprite} alt={pokemonName} style={{ width: '75%', height: 'auto' }} />
    </div>
  );
}

export default Card;
