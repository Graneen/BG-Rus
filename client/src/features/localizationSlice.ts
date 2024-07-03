import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Order {
  id: number;
  userId: number | null;
  gameTitle: string;
  description: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  userId: number;
  comment: string;
}

interface User {
  id: number;
  name: string;
}

interface LocalizationState {
  allOrders: Order[];
  gameTitle: string;
  translationNeed: string;
  comment: string;
}

export const fetchOrders = createAsyncThunk('localization/fetchOrders', async () => {
  const response = await axios.get<Order[]>(`${import.meta.env.VITE_REACT_APP_URL}/localization-orders`);
  return response.data;
});

export const addOrder = createAsyncThunk('localization/addOrder', async ({ userId, gameTitle, description }: { userId: User | null; gameTitle: string; description: string }) => {
  const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/localization-orders`, { userId: userId?.id, gameTitle, description });
  return response.data;
});

export const addComment = createAsyncThunk('localization/addComment', async ({ orderId, userId, comment }: { orderId: number; userId: number; comment: string }) => {
  const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/localization-orders/${orderId}/comments`, { userId, comment });
  return response.data; 
});

const localizationSlice = createSlice({
  name: 'localization',
  initialState: {
    allOrders: [],
    gameTitle: '',
    translationNeed: '',
    comment: '',
  } as LocalizationState,
  reducers: {
    setGameTitle: (state, action: PayloadAction<string>) => {
      state.gameTitle = action.payload;
    },
    setTranslationNeed: (state, action: PayloadAction<string>) => {
      state.translationNeed = action.payload;
    },
    setComment: (state, action: PayloadAction<string>) => {
      state.comment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload;
      })
      .addCase(addOrder.fulfilled, (state) => {
        state.gameTitle = '';
        state.translationNeed = '';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comment = ''; 
        state.allOrders = state.allOrders.map((order) => {
          if (order.id === action.payload.id) {
            return action.payload;
          }
          return order;
        });
      });
  },
});

export const { setGameTitle, setTranslationNeed, setComment } = localizationSlice.actions;
export default localizationSlice.reducer;