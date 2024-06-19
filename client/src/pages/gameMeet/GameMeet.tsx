import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { joinGameSession, createGameSession, GameSessionState } from '../../redux/slice'; 

const GameMeet: React.FC = () => {
  const [sessionId, setSessionId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(0);

  const gameSession = useSelector((state: RootState) => state.gameSession as GameSessionState);
  const dispatch = useDispatch();

  const handleJoinSession = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(joinGameSession({ sessionId, playerName, gameSession }));
    setSessionId(''); 
    setPlayerName(''); 
  };

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createGameSession({ sessionName, maxPlayers, gameSession }));
    setSessionName(''); 
    setMaxPlayers(0); 
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h2>Записаться на игровую сессию</h2>
        <form onSubmit={handleJoinSession}>
          <input type="text" value={sessionId} onChange={(e) => setSessionId(e.target.value)} placeholder="Введите ID сессии" />
          <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="Введите имя игрока" />
          <button type="submit">Записаться</button>
        </form>
      </div>
      <div>
        <h2>Создать игровую сессию</h2>
        <form onSubmit={handleCreateSession}>
          <input type="text" value={sessionName} onChange={(e) => setSessionName(e.target.value)} placeholder="Название сессии" />
          <input type="number" value={maxPlayers} onChange={(e) => setMaxPlayers(parseInt(e.target.value))} placeholder="Максимальное количество игроков" />
          <button type="submit">Создать</button>
        </form>
      </div>
    </div>
  );
};

export default GameMeet;