import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import gameSessionReducer, { GameSessionState } from "../features/gameSessionSlice";
import gameCardReducer, { boardGameState } from '../features/gameCardSlice';
import localizationReducer, { LocalizationState } from '../features/localizationSlice'

const store = configureStore({
  reducer: {
    gameSession: gameSessionReducer,
    getGameCard: gameCardReducer,
    localization: localizationReducer
  },
});

export type RootState = {
  gameSession: GameSessionState;
  getGameCard: boardGameState;
  localization: LocalizationState;
};

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

