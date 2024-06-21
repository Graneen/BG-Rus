import { configureStore } from "@reduxjs/toolkit";
import gameSessionReducer from "../features/gameSessionSlice";
import gameCardReducer from '../features/gameCardSlice';
import gameCampReducer from '../features/gameCardSlice';

const store = configureStore({
  reducer: {
    gameSession: gameSessionReducer,
    getGameCard: gameCardReducer,
    gameCamp: gameCampReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

