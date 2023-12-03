import { configureStore } from '@reduxjs/toolkit';
import { carsReducer } from './carsSlice';
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const carPersistConfig = {
    key: 'favoritesCar',
    storage,
    whitelist: ['favorites'],
};

export const store = configureStore({
    reducer: {
        cars: persistReducer(carPersistConfig, carsReducer),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);