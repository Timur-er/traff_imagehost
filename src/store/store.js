import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Your combined reducers
import {thunk} from 'redux-thunk'; // If you're using thunks for async actions

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    // The Redux DevTools Extension is enabled by default when using configureStore(),
    // so you don't need to explicitly call it.
});

export default store;