import { createSlice } from '@reduxjs/toolkit';
import { addToFavorites, getCars } from './collectionAPI';

const initialState = {
    cars:[],
    favorites: [],
    formData: {
        make:''
    }
};

const carsSlice = createSlice({
    name: 'cars',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getCars.fulfilled, (state, action) => {
                    state.cars = action.payload;
                    state.formData = action.meta.arg

                })
                .addCase(addToFavorites.fulfilled, (state, action) => {
                    state.favorites = action.payload
            })
    },
});

export const carsReducer = carsSlice.reducer;