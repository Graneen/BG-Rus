import { combineReducers } from "redux";

import gameSessionReducer from "../../features/gameSessionSlice";
import getGameCardReducer from '../../features/gameCardSlice';
import gameCampReducer from '../../features/gameCardSlice'

const rootReducer = combineReducers({
  gameSession: gameSessionReducer,
  getGameCard: getGameCardReducer,
  gameCamp: gameCampReducer,
});

export default rootReducer;
