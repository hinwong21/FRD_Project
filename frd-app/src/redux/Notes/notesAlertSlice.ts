import { createSlice } from '@reduxjs/toolkit';

const notesAlertSlice = createSlice({
    name: 'data',
    initialState: {
      errMsgShow: false,
    },
    reducers: {
      setNotesAlertShow: (state, action) => {
        state.errMsgShow = action.payload;
      }
    }
  });

  export const { setNotesAlertShow } = notesAlertSlice.actions;
  export default notesAlertSlice.reducer;