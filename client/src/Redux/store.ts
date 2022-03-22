import { combineReducers, configureStore } from "@reduxjs/toolkit";
import prodSlice from "./prodSlice";
import toolkitSlice from "./toolkitSlice";

const rootReducer = combineReducers({
    toolkit: toolkitSlice,
    prod: prodSlice
})

export const store = configureStore({
    reducer: rootReducer
})