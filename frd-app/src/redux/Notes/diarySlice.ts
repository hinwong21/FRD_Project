import { createSlice } from '@reduxjs/toolkit';

const diarySlice = createSlice({
    name: 'data',
    initialState: {
      shouldGetDataDiary: false
    },
    reducers: {
      setShouldGetDataDiary: (state, action) => {
        state.shouldGetDataDiary = action.payload;
      }
    }
  });

  export const { setShouldGetDataDiary } = diarySlice.actions;
  export default diarySlice.reducer;