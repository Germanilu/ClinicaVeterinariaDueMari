import {configureStore} from '@reduxjs/toolkit';
import userSlice from '../Containers/User/userSlice';
//Redux persist to store userSlice on windowReload
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import {combineReducers} from "redux";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
}

const reducer = combineReducers({
    user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export default configureStore({
    reducer: persistedReducer,
});

