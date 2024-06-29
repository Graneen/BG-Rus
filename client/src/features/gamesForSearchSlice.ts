import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../services/axiosConfig/axiosConfig";
// import { RootState } from "../redux/store";


export type GameCard = {
    id: number,
    title: string,
    genre: string,
    theme: string,
    year: string,
    difficulty: string,
    minPlayers: number,
    maxPlayers: number,
}

export interface GamesListState {
    list: GameCard[] | [],
    loading: boolean,
    error: null | string,
}

const initialState: GamesListState = {
    list: [],
    loading: false,
    error: null,
}

export const getGames = createAsyncThunk("gamesList/getGames", async(_, {rejectWithValue}) => {
    try {
        const gamesList = await $api.get("http://localhost:3000/search_game");
        
        return gamesList.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const gamesListSlice = createSlice({
    name: "gamesList",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGames.pending, (state => {
                state.loading = true,
                state.error = null
            }))
            .addCase(getGames.fulfilled, ((state, action) => {
                state.loading = false,
                state.error = null,
                state.list = action.payload
            }))
            .addCase(getGames.rejected, ((state, action) => {
                state.loading = false,
                state.error = action.payload as string
            }))
    },
})

export default gamesListSlice.reducer;

export const selectAllGames = (state: { gamesForSearch: GamesListState }) => state.gamesForSearch;