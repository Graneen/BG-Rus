import { combineReducers } from "redux";

import gameSessionReducer from "../../features/gameSessionSlice";

const rootReducer = combineReducers({
  gameSession: gameSessionReducer,
});

export default rootReducer;

import joinGameSessionReducer from '../../features/gameSessionSlice';
import createGameSessionReducer from '../../features/gameSessionSlice';
import getGameCardReducer from '../../features/gameCardSlice';


export const rootReducer = combineReducers({
    joinGameSession: joinGameSessionReducer,
    createGameSession: createGameSessionReducer,
    getGameCard: getGameCardReducer
})
