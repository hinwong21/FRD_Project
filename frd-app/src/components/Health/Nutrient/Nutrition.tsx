import React from "react";
import { Provider } from "react-redux";
import { nutritionStore } from "../../../redux/Nutrition/store";
import HealthNutrition from "./HealthNutrition";
import { WaterBalance } from "./WaterBalance";
import "./Nutrition.css";
import { NutritionTracker } from "./NutritionTracker";

export const Nutrition = () => {
  return (
    <div className="page-container">
      <Provider store={nutritionStore}>
        <HealthNutrition />
      </Provider>

      {/* Water balance */}
      <WaterBalance />

      <Provider store={nutritionStore}>
        <NutritionTracker />
      </Provider>
    </div>
  );
};
