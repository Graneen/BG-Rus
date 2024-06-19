// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
// import { joinGameSession, createGameSession } from '../../redux/slice'; 

// const GameMeet: React.FC = () => {
//   const [sessionId, setSessionId] = useState('');
//   const [playerName, setPlayerName] = useState('');
//   const [sessionName, setSessionName] = useState('');
//   const [maxPlayers, setMaxPlayers] = useState(0);

//   const gameSession = useSelector((state: RootState) => state.gameSession);
//   const dispatch = useDispatch();

//   const handleJoinSession = () => {
//     dispatch(joinGameSession({ sessionId, playerName })); 
//   };

//   const handleCreateSession = () => {
//     dispatch(createGameSession({ sessionName, maxPlayers })); 
//   };

//   return (
//     <div>
//       <h2>Join Game Session</h2>
//       <form onSubmit={handleJoinSession}>
//         <input type="text" value={sessionId} onChange={(e) => setSessionId(e.target.value)} />
//         <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
//         <button type="submit">Join</button>
//       </form>
//       <h2>Create Game Session</h2>
//       <form onSubmit={handleCreateSession}>
//         <input type="text" value={sessionName} onChange={(e) => setSessionName(e.target.value)} />
//         <input type="number" value={maxPlayers} onChange={(e) => setMaxPlayers(parseInt(e.target.value))} />
//         <button type="submit">Create</button>
//       </form>
//     </div>
//   );
// };

// export default GameMeet;