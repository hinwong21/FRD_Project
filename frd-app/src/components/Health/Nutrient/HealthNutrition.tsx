import React from "react";
import { NutrientProgressBar } from "./NutrientProgressBar";
import "./Nutrient.css";
import { useSelector } from "react-redux";
import { NutritionState } from "../../../redux/Nutrition/store";

let age = 23;
let weight = 60;
let height = 170;
let gender = "male";

const HealthNutrition = () => {
  const caloriesIntake = useSelector(
    (state: NutritionState) => state.caloriesIntake
  );

  const carbsIntake = useSelector((state: NutritionState) => state.carbsIntake);

  const proteinIntake = useSelector(
    (state: NutritionState) => state.proteinIntake
  );
  const fatIntake = useSelector((state: NutritionState) => state.fatIntake);

  let caloriesDailyIntake;
  if (gender === "male") {
    caloriesDailyIntake = Math.round(
      66.47 + 13.75 * weight + 5.003 * height - 6.755 * age
    );
  } else if (gender === "female") {
    caloriesDailyIntake = Math.round(
      655.1 + 9.563 * weight + 1.85 * height - 4.676 * age
    );
  } else {
    caloriesDailyIntake = 2000;
  }

  let proteinDailyIntake = Math.round(weight * 0.8);
  let minFatDailyIntake = Math.round(caloriesDailyIntake * 0.2);
  // let maxFatDailyIntake = Math.round(caloriesDailyIntake * 0.35);
  // let minCarbsDailyIntake = Math.round(caloriesDailyIntake * 0.45);
  let maxCarbsDailyIntake = Math.round(caloriesDailyIntake * 0.65);
  let caloriesLeft = caloriesDailyIntake - caloriesIntake;

  return (
    <div className="nutrient-header">
      {/* Calories */}
      <div className="header-calories-container">
        <div>
          <div className="header-calories-left">{caloriesLeft} left</div>
          <div className="daily-calories-intake">
            Daily calories intake: {caloriesDailyIntake}
          </div>
        </div>
        <div>
          <div className="header-calories-intake">{caloriesIntake} eaten</div>
        </div>
      </div>
      <div className="calories-progressBar-container">
        <NutrientProgressBar
          dailyIntake={caloriesDailyIntake}
          currentIntake={caloriesIntake} />
      </div>
      <div className="header-nutrient-container">
        {/* Carbs */}
        <div className="header-nutrient">
          <div>Carbs</div>
          <div className="header-nutrient-index">
            {carbsIntake} / {""}
            <span style={{ color: "gray" }}>{maxCarbsDailyIntake}g</span>
          </div>
          <div className="nutrient-progressBar-container">
            <NutrientProgressBar
              dailyIntake={maxCarbsDailyIntake}
              currentIntake={carbsIntake} />
          </div>
        </div>

        {/* Protein */}
        <div className="header-nutrient">
          <div>Protein</div>
          <div className="header-nutrient-index">
            {proteinIntake} / {""}
            <span style={{ color: "gray" }}>{proteinDailyIntake}g</span>
          </div>
          <div className="nutrient-progressBar-container">
            <NutrientProgressBar
              dailyIntake={proteinDailyIntake}
              currentIntake={proteinIntake} />
          </div>
        </div>

        {/* Fat */}
        <div className="header-nutrient">
          <div>Fat</div>
          <div className="header-nutrient-index">
            {fatIntake} / {""}
            <span style={{ color: "gray" }}>{minFatDailyIntake}g</span>
          </div>
          <div className="nutrient-progressBar-container">
            <NutrientProgressBar
              dailyIntake={minFatDailyIntake}
              currentIntake={fatIntake} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthNutrition;
