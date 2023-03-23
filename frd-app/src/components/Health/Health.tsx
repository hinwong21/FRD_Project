import React from "react";
import Period from "./Period/Period";
import { HealthNutrition } from "./Nutrient/HealthNutrition";
import styles from "./Health.module.scss";

export const Health = () => {
  return (
    <div>
      <Period />
      <HealthNutrition />
    </div>
  );
};
