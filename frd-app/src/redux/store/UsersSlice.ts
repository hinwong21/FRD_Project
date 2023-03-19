//TODO Just for sample
//case: Users login / logout needs to use Redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UsersState {
  data: string[];
}

const initialState: UsersState = {
  data: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  //Write functions to change the states through reducer
  reducers: {
    //add new string into data: ["start day"], if no action, don't write that parameter
    addItem(state: UsersState, action: PayloadAction<string>) {
      state.data.push(action.payload);
    },
  },
});

export const { addItem } = usersSlice.actions;
export default usersSlice.reducer;
