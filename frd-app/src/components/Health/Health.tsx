import React from "react";
import PeriodMain from "./Period/PeriodMain";
import { HealthNutrition } from "./Nutrient/HealthNutrition";
import styles from "./Health.module.scss";

export const Health = () => {
  return (
    <div>
      <PeriodMain />
      <HealthNutrition />
    </div>
  );
};
