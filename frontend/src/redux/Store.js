import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AutSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these paths/actions for non-serializable values
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
                ignoredPaths: ["register"], // Add if applicable
            },
        }),
});

export const persistor = persistStore(store);
