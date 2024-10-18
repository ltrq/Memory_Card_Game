import './App.css';
import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Card.css';

function App() {

  const [pokemonList, setPokemonList] = useState([]);
  const [score, setScore] = useState(0);
  const [remainingPokemon, setRemainingPokemon] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const numberOfCards = 10;


  // Generate unique random Pokémon indices
  const generateRandomIndices = () => {
    const indices = new Set();
    while (indices.size < numberOfCards) {
      const newIndex = (Math.floor(Math.random() * 1025) + 1).toString();
      indices.add(newIndex);
    }
    return Array.from(indices);
  };

  // Shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };


  // Initialize Pokémon list on component mount
  useEffect(() => {
    if (!gameOver) {
      const initialIndices = generateRandomIndices();
      setPokemonList(initialIndices);
      setRemainingPokemon(initialIndices);
    }
    setIsFlipped(!gameOver);
    setTimeout(() => { setIsFlipped(gameOver) }, 650);

  }, [gameOver]);

  // Shuffle the Pokémon list
  const shufflePokemonList = () => {
    setTimeout(() => {setPokemonList((prevList) => shuffleArray([...prevList]))}, 650);
  };

  // Handle card click
  const handleCardClick = (pokedexIndex) => {
    if (gameOver || gameWon) {return;}
    // setTimeout(() => { shufflePokemonList() }, 650);
    shufflePokemonList();
    validateSelection(pokedexIndex);
    toggleFlip();
  };

  const toggleFlip = () => {
    setIsFlipped(true);
    setTimeout(() => { setIsFlipped(false) }, 650);
  };


  // Validate selected Pokémon and update score
  const validateSelection = (pokedexIndex) => {
    const indexString = pokedexIndex.toString();
    if (remainingPokemon.includes(indexString)) {
      setRemainingPokemon((prevList) => prevList.filter((index) => index !== indexString));
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore > highScore) {
          setHighScore(newScore);
        }
        if (newScore === numberOfCards) {
          setGameWon(true);
        }
        return newScore;
      });
    } else {
      setGameOver(true);
    }
  };

  // Reset the game state
  const resetGame = () => {
    toggleFlip();
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    const initialIndices = generateRandomIndices();
    setPokemonList(initialIndices);
    setRemainingPokemon(initialIndices);

  };

  return (
    <div className="App">
      <div className="background-video" style={{backgroundImage: 'url("./background-gif.gif")'}}>
        <div className="score-container">
          {!gameOver && !gameWon && <div className="score">Your score is {score}</div>}
          {!gameOver && !gameWon && <div className='highscore'>High score is {highScore}</div>}
          {gameOver && <div className="result">Game Over</div>}
          {gameWon && <div className='result'>You won!</div>}
        </div>
        <div className="card-container" style={{ display: 'flex', flexDirection: 'row' }}>
          {pokemonList.map((pokedexIndex) => (
            <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={() => handleCardClick(pokedexIndex)} >
              <div>
                <Card pokedexIndex={pokedexIndex}/>
              </div>
              <div className="card-back">
                <img src="./pokemon_card_backside.png" alt="Pokeball" style={{ width: '250px', height: '350px' }} />
              </div>
            </div>
          ))}
        </div>
        <button className="restart-button" onClick={resetGame}>Restart Game</button>
      </div>
    </div>
  );
}

export default App;
