import { createSlice } from "@reduxjs/toolkit";



const prodSlice = createSlice({
    name: "prod",
    initialState: {
        prods: [] as any[],
        check: 0 as number,
        loading: true as boolean,
        zaglPrice: true as boolean,
    },
    reducers: {
        addProd(state, action){
            state.prods.splice(0,2)  
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
        },
        changeRaiting(state,action){
            let elem:any
            elem = state.prods[0].filter((elems:any)=>
            elems.id == action.payload.id
            )
            let indexNew:any = state.prods[0].map((elem2:any, index:any)=>{
                
                if (elem[0].id == elem2.id){
                    return index
                } 
            }).filter((elem:any)=> elem !== undefined)
           
            let number:any = indexNew[0]
            let newElem = {...elem[0], raiting: action.payload.raiting}
            state.prods[0][number] = newElem
            
        }
      
    }
})

export default prodSlice.reducer
export const {
    addProd,
    changeCheck,
    changeLoading,
    changezaglushka,
   changeRaiting,

} = prodSlice.actions