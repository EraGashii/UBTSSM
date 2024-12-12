import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AutSlice";
import storage from 'redux-persist/lib/storage'
import { persistReducer,persistStore } from "redux-persist";


const persistConfq = {
    key: "root",
    storage
}

const persistedReducer = persistReducer(persistConfq, authReducer)

export const store = configureStore({
    reducer:{
        auth:persistedReducer
    }
})

export const persistor = persistStore(store)