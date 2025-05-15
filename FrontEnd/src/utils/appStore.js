import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import persistStore from "redux-persist/es/persistStore";
import linkReducer from "./linkSlice"

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['user']
}
const rootReducer = combineReducers({
    user: userReducer,
    feed: feedReducer,
    links: linkReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const appStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(appStore);