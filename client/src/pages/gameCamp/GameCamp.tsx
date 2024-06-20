
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GameCampType } from '../../types/types';
import './GameCamp.css';

const GameCamp: React.FC = () => {
  const [gameCamps, setGameCamps] = useState<GameCampType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGameCamps = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/gameCamps');
        if (Array.isArray(response.data)) {
          setGameCamps(response.data);
        } else {
          setError('Invalid response format');
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };
    fetchGameCamps();
  }, []);

  return (
    <div className="game-camp-container">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        gameCamps.map((gameCamp: GameCampType) => (
          <div key={gameCamp.id} className="game-camp-card">
            <img src={gameCamp.image1} alt={gameCamp.title} />
            <h3>{gameCamp.title}</h3>
            <p>{gameCamp.location}</p>
            <p>{gameCamp.date}</p>
            <p>{gameCamp.description}</p>
            <p>Games Headliners: {gameCamp.gamesHeadliners}</p>
            <button>Подать заявку</button>
          </div>
        ))
      )}
    </div>
  );
};



export default GameCamp;