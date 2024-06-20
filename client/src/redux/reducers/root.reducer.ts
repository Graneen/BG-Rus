import { combineReducers } from "redux";
import gameSessionReducer from "../../features/gameSessionSlice";

const rootReducer = combineReducers({
  gameSession: gameSessionReducer,
});

export default rootReducer;