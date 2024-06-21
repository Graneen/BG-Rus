import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../app/App';
import { GameCampType } from '../../types/types';
import axios, { AxiosError } from 'axios';

const GameCamp: React.FC = () => {
    const  user  = useContext(AuthContext); 
    console.log(user)

    const [gameCamps, setGameCamps] = useState<GameCampType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchGameCamps = async () => {
          try {
              setLoading(true);
              const response = await axios.get('http://localhost:3000/api/gameCamps');
              if (Array.isArray(response.data)) {
                  setGameCamps(response.data);
              } else {
                  setError('Invalid response format');
              }
              setLoading(false);
          } catch (err: unknown) {
              setLoading(false);
              if (err instanceof Error) {
                  setError(err.message);
              } else {
                  setError('An unknown error occurred');
              }
          }
      };
  
      fetchGameCamps();
  }, []);

  const handleApply = async (gameCampId: number) => {
    try {
        if (user) {
            console.log('User ID:', user);

            const headers = {
                'Content-Type': 'application/json',
            };

            const response = await axios.post('http://localhost:3000/api/players', { userId: user.user, gameCampId }, { headers });
            console.log('Успешно:', response.data);
            alert('Заявка успешно подана!');
        } else {
            alert('Ошибка: UserID не найден.');
        }
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            console.error('Ошибка при отправке заявки:', err.response?.data);
            alert(`Не удалось отправить заявку. Ошибка: ${err.response?.data.message}`);
        } else {
            console.error('Ошибка при отправке заявки:', err);
            alert('Не удалось отправить заявку. Попробуйте еще раз.');
        }
    }
};


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
            <img src={gameCamp.image2} alt={gameCamp.title} />
            <img src={gameCamp.image3} alt={gameCamp.title} />
            <img src={gameCamp.image4} alt={gameCamp.title} />
            <h3>{gameCamp.title}</h3>
            <p>{gameCamp.location}</p>
            <p>{gameCamp.date}</p>
            <p>{gameCamp.description}</p>
            <p>Games Headliners: {gameCamp.gamesHeadliners}</p>
            <button onClick={() => handleApply(gameCamp.id)}>Подать заявку</button>
          </div>
        ))
      )}
    </div>
  );
};

export default GameCamp;