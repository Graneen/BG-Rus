import { configureStore } from '@reduxjs/toolkit';
import gameSessionReducer from './slice';

const store = configureStore({
  reducer: {
    gameSession: gameSessionReducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;