import { combineReducers } from "redux";

import gameSessionReducer from "../../features/gameSessionSlice";
import getGameCardReducer from '../../features/gameCardSlice';
import gameCampReducer from '../../features/gameCardSlice'
import localizationReducer from "../../features/localizationSlice";


const rootReducer = combineReducers({
  gameSession: gameSessionReducer,
  getGameCard: getGameCardReducer,
  gameCamp: gameCampReducer,
  localization: localizationReducer
});

export default rootReducer;
