import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
    baseURL: 'https://65689daf9927836bd975243f.mockapi.io/api/v1/',
  });

  export const getCars = createAsyncThunk(
    'cars/getAll',
    async ({page=1, make}) => {
        try {
            const response = await instance.get(
                `car?limit=12&page=${page}${make ? `&make=${make}` : ''}`,
                );
            return response.data;
        } catch (e) {
            return console.log(e)
        }
    },
);

export const addToFavorites = createAsyncThunk(
    'cars/favorites',
    async (carId) => {
        try {
            return carId
        } catch (e) {
            return console.log(e)
        }
    },
);