import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameSessionState {
  

sessionName: string;
  maxPlayers: number;
  sessionId: string | null;
  playerName: string | null;
}

const initialState: GameSessionState = {
  sessionName: '',
  maxPlayers: 0,
  sessionId: null,
  playerName: null,
};

const gameSessionSlice = createSlice({
  name: 'gameSession',
  initialState,
  reducers: {
    joinGameSession: (state, action: PayloadAction<{ sessionId: string; playerName: string }>) => {
      state.sessionId = action.payload.sessionId;
      state.playerName = action.payload.playerName;
    },
    createGameSession: (state, action: PayloadAction<{ sessionName: string; maxPlayers: number }>) => {
      state.sessionName = action.payload.sessionName;
      state.maxPlayers = action.payload.maxPlayers;
    },
  },
});

export default gameSessionSlice.reducer;

export const { joinGameSession, createGameSession } = gameSessionSlice.actions;