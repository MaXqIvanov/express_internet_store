import { createSlice } from "@reduxjs/toolkit";


const oneProdSlice = createSlice({
    name: "oneProd",
    initialState: {
      index: 1 as number,
      oneProds: [] as any[],
    },
    reducers: {
        changeStateProods(state, action){

            state.index = action.payload.id
            state.oneProds = action.payload.elem
        },
        stateOneProde(state, action){
            
        },
    }
})

export default oneProdSlice.reducer
export const {
    changeStateProods,
    stateOneProde,

} = oneProdSlice.actions