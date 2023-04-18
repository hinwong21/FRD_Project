import { createSlice } from '@reduxjs/toolkit';

const eventSlice = createSlice({
    name: 'data',
    initialState: {
      shouldGetDataEvent: false
    },
    reducers: {
      setShouldGetDataEvent: (state, action) => {
        state.shouldGetDataEvent = action.payload;
      }
    }
  });

  export const { setShouldGetDataEvent } = eventSlice.actions;
  export default eventSlice.reducer;