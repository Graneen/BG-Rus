import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../app/App';
import { GameCampType } from '../../types/types';
import axios, { AxiosError } from 'axios';
import './GameCamp.css'

const GameCamp: React.FC = () => {
  const user = useContext(AuthContext); 
 

  const [gameCamps, setGameCamps] = useState<GameCampType[]>([]);
  const [userEmail, setUserEmail] = useState('');
  const [gameCampId, setGameCampId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);

  

  useEffect(() => {
    const fetchGameCamps = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/gameCamps`);
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
    setShowEmailModal(true); 
    setGameCampId(gameCampId);
  };


  
  const handleSubmitEmail = async () => {
    try {
      if (user) {
        const headers = {
          'Content-Type': 'application/json',
        };
  
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/players`, {
          userId: user.user,
          gameCampId: gameCampId,
          email: userEmail,
        }, { headers });
  
        console.log('Успешно:', response.data);
        setShowSuccessModal(true); 
        setShowEmailModal(false);
        setUserEmail(''); 
      } else {
        setShowErrorModal(true);
        setErrorMessage('UserID не найден.');
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.error('Ошибка при отправке заявки:', err.response?.data);
        setShowErrorModal(true);
        setErrorMessage(`Не удалось отправить заявку. Ошибка: ${err.response?.data.message}`);
      } else {
        console.error('Ошибка при отправке заявки:', err);
        setShowErrorModal(true);
        setErrorMessage('Не удалось отправить заявку. Попробуйте еще раз.');
      }
    }
  };

  return (
    
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="mt-5 text-3xl text-[#ffd700]">ДОБРО ПОЖАЛОВАТЬ В ИГРОКЭМП!</h2>
          <p className="text-base leading-7 text-gray-400">Игрокэмп (GameCamp) - это уникальное мероприятие или место, где участники могут погрузиться в мир увлекательных игровых событий и активностей. Обычно Игрокэмп представляет собой сборище игровых энтузиастов, участвующих в различных игровых мероприятиях, таких как турниры, квесты, конкурсы, обучающие мастер-классы и другие игровые форматы.

В Игрокэмпе участники обычно имеют возможность встретиться, знакомиться с единомышленниками, делиться игровым опытом, соревноваться, учиться новым играм и просто проводить время в веселой и дружеской обстановке.

Такие мероприятия могут быть проведены как в реальном мире (offline), так и в виртуальном пространстве (online), и их организаторы обычно стараются создать интересные и захватывающие форматы, чтобы привлечь участников и создать незабываемый опыт игрокам.

Как правило, в Игрокэмпе каждый найдет что-то интересное для себя, включая возможность попробовать новые игры, улучшить свои навыки в уже известных играх, пообщаться с единомышленниками и просто хорошо провести время в игровой атмосфере.</p>

<h2 className="mt-10 text-3xl text-[#ffd700]">ИГРОКЭМПЫ</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-4">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="bg-yellow-200 text-black p-4 mb-4 rounded">{`Error: ${error}`}</div>
          ) : (
            <>
              {gameCamps.map((gameCamp) => (
                <div key={gameCamp.id} className="bg-yellow-200 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <img src={gameCamp.image1} alt={gameCamp.title} className="rounded-lg shadow-lg w-full h-full" />
                    </div>
                    <div className="flex flex-col justify-between">
                      <img src={gameCamp.image2} alt={gameCamp.title} className="rounded-lg shadow-lg mb-4" />
                      <img src={gameCamp.image3} alt={gameCamp.title} className="rounded-lg shadow-lg" />
                    </div>
                    <div>
                      <img src={gameCamp.image4} alt={gameCamp.title} className="rounded-lg shadow-lg" />
                      <div className="bg-yellow-300 shadow-md border border-yellow-500 rounded-lg p-4 mt-4">
                        <h3 className="text-black font-semibold mb-2">{gameCamp.title}</h3>
                        <p className="text-gray-600 mb-2">{gameCamp.location}</p>
                        <p className="text-gray-600 mb-2">{gameCamp.date}</p>
                        <p className="text-gray-800 mb-4">{gameCamp.description}</p>
                        <p className="text-gray-800 mb-2">Games Headliners: {gameCamp.gamesHeadliners}</p>
                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded border border-yellow-500" onClick={() => handleApply(gameCamp.id)}>Подать заявку</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          
          {showSuccessModal && (
            <div className="modal bg-none">
              <div className="modal-content bg-yellow text-black">
                <span className="close text-black" onClick={() => setShowSuccessModal(false)}>&times;</span>
                <p>Ваша заявка на рассмотрении. После потверждения, ждите инструкции на вашу указанную почту!</p>
              </div>
            </div>
          )}
  
          {showErrorModal && (
            <div className="modal bg-black text-white">
              <div className="modal-content bg-yellow-100">
                <span className="close" onClick={() => setShowErrorModal(false)}>&times;</span>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}
  
              {showEmailModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-yellow-500 text-black p-6 rounded-lg max-w-md">
                  <div className="flex justify-end">
                    <button className="text-black" onClick={() => setShowEmailModal(false)}>&times;</button>
                  </div>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="email-input w-full border border-gray-300 rounded p-2 mt-2"
                  />
                  <button className="email-submit-btn bg-black text-white font-semibold py-2 px-4 rounded mt-4" onClick={handleSubmitEmail}>Подтвердить</button>
                </div>
              </div>
            )}
        </>
      )}
    </div>
    </div>
  );
};

export default GameCamp;