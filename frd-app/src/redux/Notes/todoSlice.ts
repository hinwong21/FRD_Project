import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'data',
    initialState: {
      shouldGetDataTodo: false
    },
    reducers: {
      setShouldGetDataTodo: (state, action) => {
        state.shouldGetDataTodo = action.payload;
      }
    }
  });


export const { setShouldGetDataTodo } = todoSlice.actions;
export default todoSlice.reducer;

