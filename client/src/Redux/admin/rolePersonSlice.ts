import { createSlice } from "@reduxjs/toolkit";


const rolePersonSlice = createSlice({
    name: "role",
    initialState: {
        role: "USER"
    },
    reducers: {
        changeRolePerson(state, action){
            state.role = action.payload
        },

    }
})

export default rolePersonSlice.reducer
export const {
    changeRolePerson

} = rolePersonSlice.actions