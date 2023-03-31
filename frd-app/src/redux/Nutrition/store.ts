import { createStore } from "redux";

export type NutritionState = {
  caloriesIntake: number;
  carbsIntake: number;
  proteinIntake: number;
  fatIntake: number;
};

export type Action =
  | {
      type: "INCREMENT";
      calories: number;
      carbs: number;
      protein: number;
      fat: number;
    }
  | {
      type: "UPDATE";
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
        caloriesIntake: parseFloat(
          (state.caloriesIntake + action.calories).toFixed(1)
        ),
        carbsIntake: parseFloat((state.carbsIntake + action.carbs).toFixed(1)),
        proteinIntake: parseFloat(
          (state.proteinIntake + action.protein).toFixed(1)
        ),
        fatIntake: parseFloat((state.fatIntake + action.fat).toFixed(1)),
      };
    case "UPDATE":
      return {
        caloriesIntake: parseFloat(action.calories.toFixed(1)),
        carbsIntake: parseFloat(action.carbs.toFixed(1)),
        proteinIntake: parseFloat(action.protein.toFixed(1)),
        fatIntake: parseFloat(action.fat.toFixed(1)),
      };
    default:
      return state;
  }
}

export const nutritionStore = createStore(reducer);
