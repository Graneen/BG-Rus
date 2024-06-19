import { PayloadAction } from '@reduxjs/toolkit';
import { GameSessionState } from './slice';

export const joinGameSessionReducer = (state: GameSessionState, action: PayloadAction<{ sessionId: string; playerName: string }>) => {
  state.sessionId = action.payload.sessionId;
  state.playerName = action.payload.playerName;
};

export const createGameSessionReducer = (state: GameSessionState, action: PayloadAction<{ sessionName: string; maxPlayers: number }>) => {
  state.sessionName = action.payload.sessionName;
  state.maxPlayers = action.payload.maxPlayers;
};