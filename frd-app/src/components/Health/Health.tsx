import React from "react";
import Period from "./Period/PeriodMain";
import styles from "./Health.module.scss";
import { Provider } from "react-redux";
import { nutritionStore } from "../../redux/Nutrition/store";
import HealthNutrition from "./Nutrient/HealthNutrition";

export const Health = () => {
  return (
    <div>
      <Period />
      <Provider store={nutritionStore}>
        <HealthNutrition />
      </Provider>
    </div>
  );
};
