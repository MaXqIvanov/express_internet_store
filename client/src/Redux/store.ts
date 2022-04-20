import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rolePersonSlice from "./admin/rolePersonSlice";
import anyAtributesSlice from "./anyAtributesSlice";
import oneProdSlice from "./oneProdSlice";
import orderSlice from "./orderSlice";
import prodSlice from "./prodSlice";
import toolkitSlice from "./toolkitSlice";

const rootReducer = combineReducers({
    toolkit: toolkitSlice,
    prod: prodSlice,
    order: orderSlice,
    oneProd: oneProdSlice,
    anyAtributes: anyAtributesSlice,
    role: rolePersonSlice,
})

export const store = configureStore({
    reducer: rootReducer
})