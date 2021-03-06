import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    price: 0 as number,
  },
  reducers: {
    changeOrderPrice(state:any, action:any) {
      state.price = state.price + Number(action.payload);
      if (state.price < 0) {
        state.price = 0;
      }
    },
    rerenderOrderPrice(state:any) {
      state.price = 0;
    },
  },
});

export default orderSlice.reducer;
export const { changeOrderPrice, rerenderOrderPrice } = orderSlice.actions;
