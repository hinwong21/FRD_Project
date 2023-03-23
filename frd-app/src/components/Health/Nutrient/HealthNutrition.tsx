import React from "react";
import { NutrientProgressBar } from "./NutrientProgressBar";
import "./Nutrient.css";

let age = 23;
let weight = 60;
let height = 170;
let gender = "male";

export const HealthNutrition = () => {
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
  return (
    <div className="nutrient-header">
      {/* Calories */}
      <div className="header-calories-container">
        <div>
          <div className="header-calories-left">1587 left</div>
          <div className="daily-calories-intake">
            Daily calories intake: {caloriesDailyIntake}
          </div>
        </div>
        <div>
          <div className="header-calories-intake">0 eaten</div>
        </div>
      </div>
      <div className="calories-progressBar-container">
        <NutrientProgressBar
          dailyIntake={caloriesDailyIntake}
          currentIntake={0}
        />
      </div>

      <div className="header-nutrient-container">
        {/* Carbs */}
        <div className="header-nutrient">
          <div>Carbs</div>
          <div className="header-nutrient-index">
            0 / {""}
            <span style={{ color: "gray" }}>{maxCarbsDailyIntake}g</span>
          </div>
          <div className="nutrient-progressBar-container">
            <NutrientProgressBar
              dailyIntake={maxCarbsDailyIntake}
              currentIntake={0}
            />
          </div>
        </div>

        {/* Protein */}
        <div className="header-nutrient">
          <div>Protein</div>
          <div className="header-nutrient-index">
            0 / {""}
            <span style={{ color: "gray" }}>{proteinDailyIntake}g</span>
          </div>
          <div className="nutrient-progressBar-container">
            <NutrientProgressBar
              dailyIntake={proteinDailyIntake}
              currentIntake={0}
            />
          </div>
        </div>

        {/* Fat */}
        <div className="header-nutrient">
          <div>Fat</div>
          <div className="header-nutrient-index">
            0 / {""}
            <span style={{ color: "gray" }}>{minFatDailyIntake}g</span>
          </div>
          <div className="nutrient-progressBar-container">
            <NutrientProgressBar
              dailyIntake={minFatDailyIntake}
              currentIntake={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
