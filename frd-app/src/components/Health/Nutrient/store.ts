import { createStore } from "redux";
import { data } from "./data";

export type AppState = {
  count: number;
};

export type Action = { type: "INCREMENT" } | { type: "DECREMENT" };

const initialState: AppState = {
  count: 0,
};

function reducer(state = initialState, action: Action): AppState {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + data.calories,
      };
    case "DECREMENT":
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
}

export const store = createStore(reducer);
