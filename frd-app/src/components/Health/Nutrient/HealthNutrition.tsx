import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NutritionState } from "../../../redux/Nutrition/store";
import { NutrientProgressBar } from "./NutrientProgressBar";
import "./Nutrition.css";

// type Intake = {
//   caloriesIntake: number;
//   carbsIntake: number;
//   proteinIntake: number;
//   fatIntake: number;
// };

// const defaultIntake: Intake = {
//   caloriesIntake: 0,
//   carbsIntake: 0,
//   proteinIntake: 0,
//   fatIntake: 0,
// };

type DailyIntake = {
  caloriesDailyIntake?: number | any;
  proteinDailyIntake?: number;
  minFatDailyIntake?: number;
  maxCarbsDailyIntake?: number;
};

const HealthNutrition = () => {
  const [dailyIntake, setDailyIntake] = useState<DailyIntake>();
  // const [intake, setIntake] = useState<Intake>(defaultIntake);
  const intake = useSelector((state: NutritionState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const getDailyIntake = async () => {
      try {
        const res = await fetch(`http://localhost:8080/nutrition/userData`);
        const json = await res.json();

        let age = json.result.user[0].age;
        let weight = json.result.user[0].weight;
        let height = json.result.user[0].height;
        let gender = json.result.user[0].gender;

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

        setDailyIntake({
          caloriesDailyIntake: caloriesDailyIntake,
          proteinDailyIntake: proteinDailyIntake,
          minFatDailyIntake: minFatDailyIntake,
          maxCarbsDailyIntake: maxCarbsDailyIntake,
        });

        // setIntake({
        //   caloriesIntake: json.result.nutrient[0].calories,
        //   carbsIntake: json.result.nutrient[0].carbs,
        //   proteinIntake: json.result.nutrient[0].protein,
        //   fatIntake: json.result.nutrient[0].fat,
        // });

        dispatch({
          type: "UPDATE",
          calories: json.result.nutrient[0].calories,
          carbs: json.result.nutrient[0].carbs,
          protein: json.result.nutrient[0].protein,
          fat: json.result.nutrient[0].fat,
        });

      } catch (err) {
        console.log(err);
      }
    };
    getDailyIntake();
  }, []);

  return (
    <div className="nutrient-header">
      {/* Calories */}
      <div className="header-calories-container">
        <div>
          {intake === undefined ? (
            <div className="header-calories-left">
              {dailyIntake?.caloriesDailyIntake} left
            </div>
          ) : (
            <div className="header-calories-left">
              {dailyIntake?.caloriesDailyIntake - intake.caloriesIntake} left
            </div>
          )}
          <div className="daily-calories-intake">
            Daily calories intake: {dailyIntake?.caloriesDailyIntake}
          </div>
        </div>
        <div>
          <div className="header-calories-intake">
            {intake?.caloriesIntake} eaten
          </div>
        </div>
      </div>
      <div className="calories-progressBar-container">
        <NutrientProgressBar
          dailyIntake={dailyIntake?.caloriesDailyIntake}
          currentIntake={intake?.caloriesIntake}
        />
      </div>

      <div className="header-nutrient-container">
        {/* Carbs */}
        <div className="header-nutrient">
          <div>Carbs</div>
          <div className="header-nutrient-index">
            {intake?.carbsIntake} / {""}
            <span style={{ color: "gray" }}>
              {dailyIntake?.maxCarbsDailyIntake}g
            </span>
          </div>
          <div className="nutrient-progressBar-container">
            <NutrientProgressBar
              dailyIntake={dailyIntake?.maxCarbsDailyIntake}
              currentIntake={intake?.carbsIntake}
            />
          </div>
        </div>

        {/* Protein */}
        <div className="header-nutrient">
          <div>Protein</div>
          <div className="header-nutrient-index">
            {intake?.proteinIntake} / {""}
            <span style={{ color: "gray" }}>
              {dailyIntake?.proteinDailyIntake}g
            </span>
          </div>
          <div className="nutrient-progressBar-container">
            <NutrientProgressBar
              dailyIntake={dailyIntake?.proteinDailyIntake}
              currentIntake={intake?.proteinIntake}
            />
          </div>
        </div>

        {/* Fat */}
        <div className="header-nutrient">
          <div>Fat</div>
          <div className="header-nutrient-index">
            {intake?.fatIntake} / {""}
            <span style={{ color: "gray" }}>
              {dailyIntake?.minFatDailyIntake}g
            </span>
          </div>
          <div className="nutrient-progressBar-container">
            <NutrientProgressBar
              dailyIntake={dailyIntake?.minFatDailyIntake}
              currentIntake={intake?.fatIntake}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthNutrition;
