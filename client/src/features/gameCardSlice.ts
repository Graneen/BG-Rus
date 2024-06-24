import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../../src/redux/store";

export interface data {
    id: string;
    user_id: number;
}

export interface estimationGame {
    id: number;
    user_id: number;
    game_id: number;
    value: number;
}

export interface feedBack {
    createdAt: string;
    description: string;
    game_id: number;
    id: number;
    updatedAt: string;
    user_id: number;
}

export interface GameCard {
    id: number;
    poster: string;
    image1: string;
    image2: string;
    video: string;
    title: string;
    genre: string;
    theme: string;
    year: string;
    author: string;
    description: string;
    difficulty: string;
    players: string;
    minPlayers: number;
    maxPlayers: number;
    time: string;
}

export interface boardGame {
    boardGame: GameCard;
    estimationGame: estimationGame[];
    feedBackGame: feedBack[];
}

export interface boardGameState {
    list: boardGame,
    loading: boolean,
    error: null | string
}
const initialState : boardGameState  = {
    list: {
        boardGame: {
            id: 0,
            poster: "",
            image1: "",
            image2: "",
            video: "",
            title: "",
            genre: "",
            theme: "",
            year: "",
            author: "",
            description: "",
            difficulty: "",
            players: "",
            minPlayers: 0,
            maxPlayers: 0,
            time: ""
        },
        estimationGame: [],
        feedBackGame: []
    },
    loading: false,
    error: null
}


export const getGameCard = createAsyncThunk("cards/getGameCard", async(payload: string, {rejectWithValue})=> { 
    
    try {
        const card = await axios(`${import.meta.env.VITE_REACT_APP_API_URL}/boardgame/${payload}`);
        return card.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});
export const takeFavorites = createAsyncThunk("cards/takeFavorites", async(data, {rejectWithValue})=> { 
    
    try {
        const card = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/favorites/add`, data);
        console.log(card.data)
        return card.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const gameCardSlice = createSlice ({
    name: 'gameCard',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(getGameCard.pending, (state => {
            state.loading = true,
            state.error = null
        }))
        .addCase(getGameCard.fulfilled, ((state, action) => {
            state.loading = false,
            state.error = null,
            state.list = action.payload
        }))
        .addCase(getGameCard.rejected, ((state, action) => {
            state.error = action.payload as string,
            state.loading = false
        }))
        .addCase(takeFavorites.pending, (state => {
            state.loading = true,
            state.error = null
        }))
        .addCase(takeFavorites.fulfilled, ((state, action) => {
            state.loading = false,
            state.error = null,
            state.list = action.payload
        }))
        .addCase(takeFavorites.rejected, ((state, action) => {
            state.error = action.payload as string,
            state.loading = false
        }))
    }
})

export default gameCardSlice.reducer

export const selectGameCard = (state: RootState) => state.getGameCard

export const selectGameCardError = (state: RootState) => state.getGameCard.error

export const selectGameCardLoading = (state: RootState) => state.getGameCard.loading