import React from "react";
import { NutrientProgressBar } from "./NutrientProgressBar";

export const HeaderNutrient = (props: {
  nutrient: string;
  Intake: number;
  DailyIntake: number | undefined;
}) => {
  return (
    <div className="header-nutrient">
      <div>{props.nutrient}</div>
      <div className="header-nutrient-index">
        {props.Intake}/ {""}
        <span style={{ color: "gray" }}>{props.DailyIntake}g</span>
      </div>
      <div className="nutrient-progressBar-container">
        <NutrientProgressBar
          dailyIntake={props.DailyIntake}
          currentIntake={props.Intake}
        />
      </div>
    </div>
  );
};
