import { combineReducers } from "redux";
import joinGameSessionReducer from '../../features/gameSessionSlice';
import createGameSessionReducer from '../../features/gameSessionSlice';


export const rootReducer = combineReducers({
    joinGameSession: joinGameSessionReducer,
    createGameSession: createGameSessionReducer,
})
