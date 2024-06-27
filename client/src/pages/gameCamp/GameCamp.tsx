import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../app/App';
import { GameCampType } from '../../types/types';
import axios, { AxiosError } from 'axios';
import './GameCamp.css'

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
  <div className="game-camp-container mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-8 lg:px-8">
    {loading ? (
      <div>Loading...</div>
    ) : error ? (
      <div>Error: {error}</div>
    ) : (
      gameCamps.map((gameCamp) => (
        <div key={gameCamp.id} className="game-camp-card lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="lg:col-span-2 lg:row-span-1">
            <img src={gameCamp.image1} alt={gameCamp.title} className="rounded-lg shadow-lg w-full h-full" />
          </div>
          <div className="lg:col-span-1 lg:row-span-2 flex flex-col justify-between">
            <img src={gameCamp.image2} alt={gameCamp.title} className="rounded-lg shadow-lg mb-4" />
            <img src={gameCamp.image3} alt={gameCamp.title} className="rounded-lg shadow-lg" />
          </div>
          <div className="lg:col-span-1 lg:row-span-1">
            <img src={gameCamp.image4} alt={gameCamp.title} className="rounded-lg shadow-lg" />
          </div>
          <div className="lg:col-span-1 mt-4 bg-yellow-100 shadow-md border border-yellow-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">{gameCamp.title}</h3>
          <p className="text-gray-600 mb-2">{gameCamp.location}</p>
          <p className="text-gray-600 mb-2">{gameCamp.date}</p>
          <p className="text-gray-800 mb-4">{gameCamp.description}</p>
          <p className="text-gray-800 mb-2">Games Headliners: {gameCamp.gamesHeadliners}</p>
          <button className="mt-4 bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded border border-yellow-500" onClick={() => handleApply(gameCamp.id)}>Подать заявку</button>
        </div>
        </div>
      ))
    )}
  </div>
);
};

export default GameCamp;