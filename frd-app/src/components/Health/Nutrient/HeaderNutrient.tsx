import React from "react";
import { NutrientProgressBar } from "./NutrientProgressBar";
import style from "./Nutrition.module.scss";

export const HeaderNutrient = (props: {
  nutrient: string;
  Intake: number;
  DailyIntake: number | undefined;
}) => {
  return (
    <div className={style.headerNutrient}>
      <div>{props.nutrient}</div>
      <div className={style.headerNutrientIndex}>
        {props.Intake}/ {""}
        <span style={{ color: "gray" }}>{props.DailyIntake}g</span>
      </div>
      <div className={style.nutrientProgressBarContainer}>
        <NutrientProgressBar
          dailyIntake={props.DailyIntake}
          currentIntake={props.Intake}
        />
      </div>
    </div>
  );
};
