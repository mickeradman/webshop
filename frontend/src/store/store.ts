import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartReducer from './Cart/cartSlice';
import productReducer from './Product/productSlice';
import filterReducer from './Filter/filterSlice';
import { productApi } from '../api/productApi';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter'],
};

const productsPersistConfig = {
  key: 'products',
  storage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  products: persistReducer(productsPersistConfig, productReducer),
  filter: filterReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
