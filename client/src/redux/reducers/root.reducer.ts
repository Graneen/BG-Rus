import { combineReducers } from "redux";
<<<<<<< HEAD
import gameSessionReducer from "../../features/gameSessionSlice";

const rootReducer = combineReducers({
  gameSession: gameSessionReducer,
});

export default rootReducer;
=======
import joinGameSessionReducer from '../../features/gameSessionSlice';
import createGameSessionReducer from '../../features/gameSessionSlice';


export const rootReducer = combineReducers({
    joinGameSession: joinGameSessionReducer,
    createGameSession: createGameSessionReducer,
})
>>>>>>> d38be113ea96e45ed387231a88bca53dfd7431ef
