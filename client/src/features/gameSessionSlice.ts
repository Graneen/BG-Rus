import { createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";

export interface GameSessionState {
  date: string;
  gameName: string;
  maxPlayers: number;
  venue: string;
}

export const initialState: GameSessionState = {
  date: "",
  gameName: "",
  maxPlayers: 0,
  venue: "",
};

const gameSessionSlice = createSlice({
  name: "gameSession",
  initialState,
  reducers: {
    setGameSessionDetails: (state, action: PayloadAction<GameSessionState>) => {
      return { ...state, ...action.payload };
    },
    resetGameSession: (state: Draft<GameSessionState>) => {
      state.date = "";
      state.gameName = "";
      state.maxPlayers = 0;
      state.venue = "";
    },
    updateGameSession: (state: Draft<GameSessionState>, action: PayloadAction<Partial<GameSessionState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setGameSessionDetails, resetGameSession, updateGameSession } = gameSessionSlice.actions;
export default gameSessionSlice.reducer;

