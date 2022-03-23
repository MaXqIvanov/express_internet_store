import { combineReducers, configureStore } from "@reduxjs/toolkit";
import orderSlice from "./orderSlice";
import prodSlice from "./prodSlice";
import toolkitSlice from "./toolkitSlice";

const rootReducer = combineReducers({
    toolkit: toolkitSlice,
    prod: prodSlice,
    order: orderSlice,
})

export const store = configureStore({
    reducer: rootReducer
})