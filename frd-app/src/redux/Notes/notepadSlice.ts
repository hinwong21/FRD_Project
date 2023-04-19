import { createSlice } from '@reduxjs/toolkit';

const notepadSlice = createSlice({
    name: 'data',
    initialState: {
        selectedSegment: "todo"
    },
    reducers: {
        setSelectedSegment: (state, action) => {
        state.selectedSegment = action.payload;
      }
    }
  });

  export const { setSelectedSegment } = notepadSlice.actions;
  export default notepadSlice.reducer;