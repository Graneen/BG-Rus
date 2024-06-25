import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../redux/store";

export interface data {
    id: string;
    user_id: number;
}


export interface favoritesState {
    statusFav: boolean,
    loading: boolean,
    error: null | string
}
const initialState : favoritesState  = {
    statusFav: false,
    loading: false,
    error: null
}

export const takeFavorites = createAsyncThunk("cards/takeFavorites", async(data, {rejectWithValue})=> { 
    
    try {
        const inFavorites = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/favorites/add`, data);
        console.log(inFavorites.data)
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
        .addCase(takeFavorites.pending, (state => {
            state.loading = true,
            state.error = null
        }))
        .addCase(takeFavorites.fulfilled, ((state, action) => {
            state.loading = false,
            state.error = null,
            state.statusFav = action.payload
        }))
        .addCase(takeFavorites.rejected, ((state, action) => {
            state.error = action.payload as string,
            state.loading = false
        }))
    }
})

export default takeFavoritesSlice.reducer

export const selectFavoritesCard = (state: RootState) => state.takeFavorites

export const selectFavoritesError = (state: RootState) => state.takeFavorites.error

export const selectFavoritesLoading = (state: RootState) => state.takeFavorites.loading