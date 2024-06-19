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

  const handleJoinSession = () => {
    dispatch(joinGameSession({ sessionId, playerName })); 
  };

  const handleCreateSession = () => {
    dispatch(createGameSession({ sessionName, maxPlayers })); 
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h2>Записаться на игровую сессию</h2>
      <form onSubmit={handleJoinSession}>
        <input type="text" value={sessionId} onChange={(e) => setSessionId(e.target.value)} />
        <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
        <button type="submit">Записаться</button>
      </form>
      <h2>Создать игровую сессию</h2>
      <form onSubmit={handleCreateSession}>
        <input type="text" value={sessionName} onChange={(e) => setSessionName(e.target.value)} />
        <input type="number" value={maxPlayers} onChange={(e) => setMaxPlayers(parseInt(e.target.value))} />
        <button type="submit">Создать</button>
      </form>
    </div>
  );
};

export default GameMeet;