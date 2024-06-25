import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import gameSessionReducer from "../features/gameSessionSlice";
import gameCardReducer from '../features/gameCardSlice';
import inFavoritesReducer from '../features/addToFavoritesSlice';
import gameCampReducer from '../features/gameCardSlice';
import localizationReducer from '../features/localizationSlice'

const store = configureStore({
  reducer: {
    gameSession: gameSessionReducer,
    getGameCard: gameCardReducer,
    takeFavorites: inFavoritesReducer,
    gameCamp: gameCampReducer,
    localization: localizationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
export const useAppDispatch = () => useDispatch<AppDispatch>();

