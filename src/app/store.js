import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from '../features/auth/authSlice'
import brandsReducer from '../features/brands/brandSlice'
import productsReducer from "../features/products/productSlice";
import { setupListeners } from "@reduxjs/toolkit/query"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        brands: brandsReducer,
        products: productsReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})
setupListeners(store.dispatch)