import React, { useEffect, useState } from "react";
import { NutrientProgressBar } from "./NutrientProgressBar";
import "./Nutrition.css";
import { useSelector } from "react-redux";
import { NutritionState } from "../../../redux/Nutrition/store";

type Nutrient = {
  caloriesDailyIntake: number;
  caloriesLeft: number;
  proteinDailyIntake: number;
  minFatDailyIntake: number;
  maxCarbsDailyIntake: number;
};

const HealthNutrition = () => {
  const [data, setData] = useState<Nutrient>();

  useEffect(() => {
    const getDailyIntake = async () => {
      try {
        const res = await fetch(`http://localhost:8080/nutrition/userData`);
        const json = await res.json();

        let age = json.result[0].age;
        let weight = json.result[0].weight;
        let height = json.result[0].height;
        let gender = json.result[0].gender;

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
        let maxCarbsDailyIntake = Math.round(caloriesDailyIntake * 0.65);
        let caloriesLeft = caloriesDailyIntake - caloriesIntake;

        setData({
          caloriesDailyIntake: caloriesDailyIntake,
          caloriesLeft: caloriesLeft,
          proteinDailyIntake: proteinDailyIntake,
          minFatDailyIntake: minFatDailyIntake,
          maxCarbsDailyIntake: maxCarbsDailyIntake,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getDailyIntake();
  }, []);

  const caloriesIntake = useSelector(
    (state: NutritionState) => state.caloriesIntake
  );

  const carbsIntake = useSelector((state: NutritionState) => state.carbsIntake);

  const proteinIntake = useSelector(
    (state: NutritionState) => state.proteinIntake
  );
  const fatIntake = useSelector((state: NutritionState) => state.fatIntake);

  return (
    <div className="nutrient-header">
      {/* Calories */}
      <div className="header-calories-container">
        <div>
          <div className="header-calories-left">{data?.caloriesLeft} left</div>
          <div className="daily-calories-intake">
            Daily calories intake: {data?.caloriesDailyIntake}
          </div>
        </div>
        <div>
          <div className="header-calories-intake">{caloriesIntake} eaten</div>
        </div>
      </div>
      <div className="calories-progressBar-container">
        <NutrientProgressBar
          dailyIntake={data?.caloriesDailyIntake}
          currentIntake={caloriesIntake}
        />
      </div>

      <div className="header-nutrient-container">
        {/* Carbs */}
        <div className="header-nutrient">
          <div>Carbs</div>
          <div className="header-nutrient-index">
            {carbsIntake} / {""}
            <span style={{ color: "gray" }}>{data?.maxCarbsDailyIntake}g</span>
          </div>
          <div className="nutrient-progressBar-container">
            <NutrientProgressBar
              dailyIntake={data?.maxCarbsDailyIntake}
              currentIntake={carbsIntake}
            />
          </div>
        </div>

        {/* Protein */}
        <div className="header-nutrient">
          <div>Protein</div>
          <div className="header-nutrient-index">
            {proteinIntake} / {""}
            <span style={{ color: "gray" }}>{data?.proteinDailyIntake}g</span>
          </div>
          <div className="nutrient-progressBar-container">
            <NutrientProgressBar
              dailyIntake={data?.proteinDailyIntake}
              currentIntake={proteinIntake}
            />
          </div>
        </div>

        {/* Fat */}
        <div className="header-nutrient">
          <div>Fat</div>
          <div className="header-nutrient-index">
            {fatIntake} / {""}
            <span style={{ color: "gray" }}>{data?.minFatDailyIntake}g</span>
          </div>
          <div className="nutrient-progressBar-container">
            <NutrientProgressBar
              dailyIntake={data?.minFatDailyIntake}
              currentIntake={fatIntake}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthNutrition;
