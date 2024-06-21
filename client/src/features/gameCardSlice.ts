import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../../src/redux/store";

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
export interface GameCardState {
    list: GameCard,
    loading: boolean,
    error: null | string
}
const initialState : GameCardState  = {
    list: {
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
    loading: false,
    error: null
}


export const getGameCard = createAsyncThunk("cards/getGameCard", async(id, {rejectWithValue})=> { 
    
    try {
        const card = await axios(`http://localhost:3000/api/boardgame/${payload}`);
        // console.log(card.data);
        return card.data;
    } catch (error) {
        return rejectWithValue(error)
    }
})

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
       
    }
})

export default gameCardSlice.reducer

export const selectGameCard = (state: RootState) => state.getGameCard

export const selectGameCardError = (state: RootState) => state.getGameCard.error

export const selectGameCardLoading = (state: RootState) => state.getGameCard.loading