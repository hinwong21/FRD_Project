import { createSlice } from '@reduxjs/toolkit';

const notesAlertMsgSlice = createSlice({
    name: 'data',
    initialState: {
      errMsg: "Error happened!"
    },
    reducers: {
      setNotesAlertMsg: (state, action) => {
        state.errMsg = action.payload;
      }
    }
  });

  export const { setNotesAlertMsg } = notesAlertMsgSlice.actions;
  export default notesAlertMsgSlice.reducer;