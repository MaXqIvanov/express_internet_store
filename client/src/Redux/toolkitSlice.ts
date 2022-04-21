import { createSlice } from "@reduxjs/toolkit";


const toolkitSlice = createSlice({
    name: "toolkit",
    initialState: {
        count: 0 as number,
        todos: ['g', 'v', 'w'] as any[],
    },
    reducers: {
        increment(state){
            state.count = state.count + 1 
        },
        decrement(state){
            state.count = state.count - 1
        },
        addTodo(state, action){
            state.todos.push(action.payload)
        },
        removeLastTodo(state){
            state.todos.pop()
        }
    }
})

export default toolkitSlice.reducer
export const {
    increment,
    decrement,
    addTodo,
    removeLastTodo
} = toolkitSlice.actions