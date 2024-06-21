import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';
import axios from 'axios';
import { GameCampType } from '../types/types';

interface GameCampState {
  gameCamps: GameCampType[];
  loading: boolean;
  error: string | null;
}

const initialState: GameCampState = {
  gameCamps: [],
  loading: false,
  error: null,
};

export const fetchGameCamps = createAsyncThunk(
  'gameCamp/fetchGameCamps',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/api/gameCamps');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const gameCampSlice = createSlice({
  name: 'gameCamp',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameCamps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGameCamps.fulfilled, (state, action) => {
        state.loading = false;
        state.gameCamps = action.payload;
      })
      .addCase(fetchGameCamps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setGameCamps, setLoading, setError } = gameCampSlice.actions;
export default gameCampSlice.reducer;