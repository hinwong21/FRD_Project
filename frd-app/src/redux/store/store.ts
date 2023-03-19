//For export a store object, each application only have one store object
//TODO just for sample:
//case: Users login / logout needs to use Redux
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./UsersSlice";

export let store = configureStore({
  reducer: { users: usersReducer },
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
