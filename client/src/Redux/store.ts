import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rolePersonSlice from "./admin/rolePersonSlice";
import anyAtributesSlice from "./anyAtributesSlice";
import oneProdSlice from "./oneProdSlice";
import orderSlice from "./orderSlice";
import prodSlice from "./prodSlice";
import toolkitSlice from "./toolkitSlice";
import errorsSlice from "./errorSlice";

const rootReducer = combineReducers({
    toolkit: toolkitSlice,
    prod: prodSlice,
    order: orderSlice,
    oneProd: oneProdSlice,
    anyAtributes: anyAtributesSlice,
    role: rolePersonSlice,
    errors: errorsSlice,
})

export const store = configureStore({
    reducer: rootReducer
})