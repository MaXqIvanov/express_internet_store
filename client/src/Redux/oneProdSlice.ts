import { createSlice } from '@reduxjs/toolkit';

const oneProdSlice = createSlice({
  name: 'oneProd',
  initialState: {
    index: 1 as number,
    oneProds: [] as any[],
  },
  reducers: {
    // eslint-disable-next-line
    changeStateProods(state:any, action:any) {
      state.index = action.payload.id;
      state.oneProds = action.payload.elem;
    },
    // eslint-disable-next-line
    stateOneProde(state:any, action:any) { 
      console.log(action);
    },
  },
});

export default oneProdSlice.reducer;
export const { changeStateProods, stateOneProde } = oneProdSlice.actions;
