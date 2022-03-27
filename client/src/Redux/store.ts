import { combineReducers, configureStore } from "@reduxjs/toolkit";
import oneProdSlice from "./oneProdSlice";
import orderSlice from "./orderSlice";
import prodSlice from "./prodSlice";
import toolkitSlice from "./toolkitSlice";

const rootReducer = combineReducers({
    toolkit: toolkitSlice,
    prod: prodSlice,
    order: orderSlice,
    oneProd: oneProdSlice,
})

export const store = configureStore({
    reducer: rootReducer
})