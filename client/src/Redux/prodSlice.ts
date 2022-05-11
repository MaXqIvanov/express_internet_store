import { createSlice } from '@reduxjs/toolkit';

const prodSlice = createSlice({
  name: 'prod',
  initialState: {
    prods: [] as any[],
    check: 0 as number,
    loading: true as boolean,
    zaglPrice: true as boolean,
  },
  reducers: {
    addProd(state:any, action:any) {
      state.prods.splice(0, 2);
      state.prods.push(action.payload);
    },
    changeCheck(state:any, action:any) {
      if (state.check >= 0) {
        state.check = state.check + action.payload;
      } else state.check = 0;
    },
    changeLoading(state:any, action:any) {
      state.loading = action.payload;
    },
    changezaglushka(state:any) {
      state.zaglPrice = !state.zaglPrice;
    },
    changeRaiting(state:any, action:any) {
      let elem: any;
      elem = state.prods[0].filter((elems: any) => elems.id == action.payload.id);
      const indexNew: any = state.prods[0]
        .map((elem2: any, index: any) => {
          if (elem[0].id == elem2.id) {
            return index;
          }
        })
        .filter((elem: any) => elem !== undefined);

      const number: any = indexNew[0];
      const newElem = { ...elem[0], raiting: action.payload.raiting };
      state.prods[0][number] = newElem;
    },
  },
});

export default prodSlice.reducer;
export const { addProd, changeCheck, changeLoading, changezaglushka, changeRaiting } =
  prodSlice.actions;
