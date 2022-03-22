import { createSlice } from "@reduxjs/toolkit";
import { checkPrime } from "crypto";


const prodSlice = createSlice({
    name: "prod",
    initialState: {
        prods: [] as any[],
        check: 0,
        loading: true,
        zaglPrice: true,
    },
    reducers: {
        addProd(state, action){
            state.prods.push(action.payload)
        },
        changeCheck(state, action){
            if(state.check >= 0){
                state.check = state.check + action.payload
            }
            else state.check = 0
           
        },
        changeLoading(state,action){
            state.loading = action.payload
        },
        changezaglushka(state){
            state.zaglPrice = !state.zaglPrice
        }
    }
})

export default prodSlice.reducer
export const {
    addProd,
    changeCheck,
    changeLoading,
    changezaglushka,
} = prodSlice.actions