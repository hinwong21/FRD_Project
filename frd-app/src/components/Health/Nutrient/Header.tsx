import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NutritionState } from "../../../redux/Nutrition/store";
import { HeaderNutrient } from "./HeaderNutrient";
import { NutrientProgressBar } from "./NutrientProgressBar";
import style from "./Nutrition.module.scss";
import { getName } from "../../../service/LocalStorage/LocalStorage";
import { useHistory } from "react-router";
import { Preferences } from "@capacitor/preferences";

type DailyIntake = {
  caloriesDailyIntake?: number | any;
  proteinDailyIntake?: number;
  minFatDailyIntake?: number;
  maxCarbsDailyIntake?: number;
};

const HealthNutrition = () => {
  const [dailyIntake, setDailyIntake] = useState<DailyIntake>();
  const intake = useSelector((state: NutritionState) => state);
  const [dietProgramme, setDietProgramme] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const getDailyIntake = async () => {
      try {
        let token = await getName("token");
        const res = await fetch(
          `${process.env.REACT_APP_EXPRESS_SERVER_URL}/nutrition/userData`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const json = await res.json();

        let age = json.result.user[0].age;
        let weight = json.result.user[0].weight;
        if (weight == null) {
          weight = 55;
        }
        let height = json.result.user[0].height;
        let gender = json.result.user[0].gender;

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
          caloriesDailyIntake: caloriesDailyIntake,
          proteinDailyIntake: proteinDailyIntake,
          minFatDailyIntake: fatDailyIntake,
          maxCarbsDailyIntake: carbsDailyIntake,
        });

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
  }, [dietProgramme, dispatch]);

  const handleFetchDiet = () => {
    history.push("/dietProgramme");
  };

  return (
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

      <div className={style.dietProgrammeSelectBtn} onClick={handleFetchDiet}>
        Select your weight loss diet programme
      </div>
    </div>
  );
};

export default HealthNutrition;
