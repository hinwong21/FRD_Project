import { createStore } from "redux";

export type NutritionState = {
  caloriesIntake: number;
  carbsIntake: number;
  proteinIntake: number;
  fatIntake: number;
};

export type Action =  {
  type: "INCREMENT";
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
};

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
        caloriesIntake: state.caloriesIntake + action.calories,
        carbsIntake: state.carbsIntake + action.carbs,
        proteinIntake: state.proteinIntake + action.protein,
        fatIntake: state.fatIntake + action.fat,
      };
    default:
      return state;
  }
}

export const nutritionStore = createStore(reducer);
