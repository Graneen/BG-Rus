import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../redux/store";

export interface data {
    id: string;
    user_id: number;
    toggler: boolean;
}
export interface statusFav {
    game_id: number;
    toggler: boolean;
}

export interface favoritesState {
    statusFav: statusFav,
}
const initialState : favoritesState  = {
    statusFav: {
        game_id: 0,
        toggler: false
    },
}
export const takeFavorite = createAsyncThunk("cards/takeFavorite", async(data, {rejectWithValue})=> { 
    
    try {
        const inFavorite = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/favorite`, data);
        console.log(inFavorite.data)
        return inFavorite.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});
export const takeFavorites = createAsyncThunk("cards/takeFavorites", async(data, {rejectWithValue})=> { 
    
    try {
        const inFavorites = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/favorites/add`, data);
        return inFavorites.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const takeFavoritesSlice = createSlice ({
    name: 'inFavorites',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(takeFavorites.fulfilled, ((state, action) => {
            state.statusFav = action.payload
        }))
        .addCase(takeFavorite.fulfilled, ((state, action) => {
            state.statusFav = action.payload
        }))
    }
})

export default takeFavoritesSlice.reducer

export const selectFavoritesCard = (state: RootState) => state.takeFavorites

export const getFavoriteStatus = (state: RootState) => state.takeFavorite
