import { createSlice } from '@reduxjs/toolkit';

const memoSlice = createSlice({
    name: 'data',
    initialState: {
      shouldGetDataMemo: false
    },
    reducers: {
      setShouldGetDataMemo: (state, action) => {
        state.shouldGetDataMemo = action.payload;
      }
    }
  });

  export const { setShouldGetDataMemo } = memoSlice.actions;
  export default memoSlice.reducer;