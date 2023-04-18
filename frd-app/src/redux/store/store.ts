//For export a store object, each application only have one store object
//TODO just for sample:
//case: Users login / logout needs to use Redux
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./UsersSlice";
import todoReducer from "../Notes/todoSlice"
import memoReducer from "../Notes/memoSlice"
import diaryReducer from "../Notes/diarySlice"
import notepadReducer from "../Notes/notepadSlice"
import eventReducer from "../Calendar/eventSlice"
import notesAlertReducer from "../Notes/notesAlertSlice"
import notesAlertMsgReducer from "../Notes/notesAlertMsgSlice"

export let store = configureStore({
  reducer: { 
    users: usersReducer,
    todo: todoReducer,
    memo: memoReducer,
    diary: diaryReducer,
    event: eventReducer,
    notepad: notepadReducer,
    alert: notesAlertReducer,
    alertMsg: notesAlertMsgReducer,
    },
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
