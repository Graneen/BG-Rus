import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameSessionState {
  date: string;
  gameName: string;
  maxPlayers: number;
  venue: string;
}

const initialState: GameSessionState = {
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
    resetGameSession: (state) => {
      return initialState;
    },
    updateGameSession: (state, action: PayloadAction<Partial<GameSessionState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setGameSessionDetails, resetGameSession, updateGameSession } = gameSessionSlice.actions;
export default gameSessionSlice.reducer;