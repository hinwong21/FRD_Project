import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NutritionState } from "../../../redux/Nutrition/store";
import { HeaderNutrient } from "./HeaderNutrient";
import { NutrientProgressBar } from "./NutrientProgressBar";
import style from "./Nutrition.module.scss";
import { Preferences } from "@capacitor/preferences";
import { SelectDietPrgm } from "./SelectDietPrgm";

type DailyIntake = {
  caloriesDailyIntake?: number | any;
  proteinDailyIntake?: number;
  minFatDailyIntake?: number;
  maxCarbsDailyIntake?: number;
};

interface UserData {
  height: string;
  gender: string;
  weight: string;
  age: string;
}

const HealthNutrition = () => {
  const [dailyIntake, setDailyIntake] = useState<DailyIntake>();
  const intake = useSelector((state: NutritionState) => state);
  const [dietProgramme, setDietProgramme] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getDailyIntake = async () => {
      try {
        const { value } = await Preferences.get({ key: "userData" });

        if (value) {
          const userData: UserData = JSON.parse(value);
          let height = parseFloat(userData.height);
          let age = parseInt(userData.age);
          let weight = parseFloat(userData.weight);
          let gender = userData.gender;

          // get the user of selected diet programme
          const getDietProgramme = async () => {
            const { value } = await Preferences.get({ key: "dietProgramme" });
            if (value == null || value === "") {
              setDietProgramme("");
            } else {
              setDietProgramme(value);
            }
          };
          getDietProgramme();

          let caloriesDailyIntake,
            proteinDailyIntake,
            fatDailyIntake,
            carbsDailyIntake;
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

          if (dietProgramme === "") {
            carbsDailyIntake = Math.round(caloriesDailyIntake * 0.65);
            proteinDailyIntake = Math.round(weight * 0.8);
            fatDailyIntake = Math.round(caloriesDailyIntake * 0.2);
          } else if (dietProgramme === "Low Carbs") {
            carbsDailyIntake = 57;
            proteinDailyIntake = Math.round(weight * 0.8);
            fatDailyIntake = Math.round(caloriesDailyIntake * 0.2);
          } else if (dietProgramme === "Ketogenic") {
            carbsDailyIntake = Math.round(caloriesDailyIntake * 0.1);
            proteinDailyIntake = Math.round(weight * 0.35);
            fatDailyIntake = Math.round(caloriesDailyIntake * 0.6);
          } else if (dietProgramme === "IMF") {
            carbsDailyIntake = Math.round(caloriesDailyIntake * 0.65);
            proteinDailyIntake = Math.round(weight);
            fatDailyIntake = Math.round(caloriesDailyIntake * 0.35);
          }

          setDailyIntake({
            caloriesDailyIntake,
            proteinDailyIntake,
            minFatDailyIntake: fatDailyIntake,
            maxCarbsDailyIntake: carbsDailyIntake,
          });

          const data = await Preferences.get({ key: "nutrientIntake" });
          if (data.value != null) {
            dispatch({
              type: "UPDATE",
              calories: JSON.parse(data.value).calories,
              carbs: JSON.parse(data.value).carbs,
              protein: JSON.parse(data.value).protein,
              fat: JSON.parse(data.value).fat,
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getDailyIntake();
  }, [dietProgramme, dispatch]);

  return (
    <>
      <div className={style.nutrientHeader}>
        {/* Calories */}
        <div className={style.headerCaloriesContainer}>
          <div>
            {intake === undefined ? (
              <div className={style.headerCaloriesLeft}>
                {dailyIntake?.caloriesDailyIntake} left
              </div>
            ) : (
              <div className={style.headerCaloriesLeft}>
                {dailyIntake?.caloriesDailyIntake - intake.caloriesIntake} left
              </div>
            )}

            <div className={style.dailyCaloriesIntake}>
              Daily calories intake: {dailyIntake?.caloriesDailyIntake}
            </div>
          </div>
          <div>
            {dietProgramme !== "" ? (
              <div className={style.showDietProgramme}>{dietProgramme}</div>
            ) : (
              ""
            )}
            <div className={style.headerCaloriesIntake}>
              {intake?.caloriesIntake} eaten
            </div>
          </div>
        </div>
        <div className={style.caloriesProgressBarContainer}>
          <NutrientProgressBar
            dailyIntake={dailyIntake?.caloriesDailyIntake}
            currentIntake={intake?.caloriesIntake}
          />
        </div>

        <div className={style.headerNutrientContainer}>
          {/* Carbs */}
          <HeaderNutrient
            nutrient="carbs"
            Intake={intake?.carbsIntake}
            DailyIntake={dailyIntake?.maxCarbsDailyIntake}
          />

          {/* Protein */}
          <HeaderNutrient
            nutrient="protein"
            Intake={intake?.proteinIntake}
            DailyIntake={dailyIntake?.proteinDailyIntake}
          />

          {/* Fat */}
          <HeaderNutrient
            nutrient="fat"
            Intake={intake?.fatIntake}
            DailyIntake={dailyIntake?.minFatDailyIntake}
          />
        </div>
      </div>
    </>
  );
};

export default HealthNutrition;
