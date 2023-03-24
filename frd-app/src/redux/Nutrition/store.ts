import { createStore } from "redux";

export type NutritionState = {
  caloriesIntake: number;
  carbsIntake: number;
  proteinIntake: number;
  fatIntake: number;
};

export type Action = { type: "INCREMENT" };

const initialState: NutritionState = {
  caloriesIntake: 0,
  carbsIntake: 0,
  proteinIntake: 0,
  fatIntake: 0,
};

function reducer(state = initialState, action: Action): NutritionState {
  switch (action.type) {
    case "INCREMENT":
      return {
        caloriesIntake: state.caloriesIntake,
        carbsIntake: state.carbsIntake,
        proteinIntake: state.proteinIntake,
        fatIntake: state.fatIntake,
      };
    default:
      return state;
  }
}

export const storeNutrition = createStore(reducer);
