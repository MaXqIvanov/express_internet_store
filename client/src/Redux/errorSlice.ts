import { createSlice } from "@reduxjs/toolkit";


const errorsSlice = createSlice({
    name: "errors",
    initialState: {
      errors: "" as string,
    },
    reducers: {
        changeErrors(state, action){

            state.errors = action.payload

        },
     
    }
})

export default errorsSlice.reducer
export const {
    changeErrors,

} = errorsSlice.actions