import { createSlice } from "@reduxjs/toolkit";

// currentPage: window.location.pathname,
const anyAtributesSlice = createSlice({
    name: "anyAtributes",
    initialState: {
      currentPage: "/",
    },
    reducers: {
        changeCurrentPage(state, action){
        state.currentPage = action.payload
        },
        
    }
})

export default anyAtributesSlice.reducer
export const {
    changeCurrentPage,
    

} = anyAtributesSlice.actions