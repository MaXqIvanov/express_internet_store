import { createSlice } from '@reduxjs/toolkit';

const errorsSlice = createSlice({
  name: 'errors',
  initialState: {
    errors: '' as string,
  },
  reducers: {
    changeErrors(state: any, action: any) {
      state.errors = action.payload;
    },
  },
});

export default errorsSlice.reducer;
export const { changeErrors } = errorsSlice.actions;
