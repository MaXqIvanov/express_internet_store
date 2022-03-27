import { createSlice } from "@reduxjs/toolkit";


const oneProdSlice = createSlice({
    name: "oneProd",
    initialState: {
      index: 1,
    },
    reducers: {
        changeStateProods(state, action){
            state.index = Number(action.payload)
           
        },
    }
})

export default oneProdSlice.reducer
export const {
    changeStateProods,

} = oneProdSlice.actions