import { Preferences } from "@capacitor/preferences";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import style from "./Nutrition.module.scss";

export const DietProgramme = () => {
  const [selectedDietProgramme, setSelectedDietProgramme] = useState("");
  const history = useHistory();

  const getDietProgramme = async () => {
    const { value } = await Preferences.get({ key: "dietProgramme" });
    if (value !== "") {
      setSelectedDietProgramme("true");
    }
  };

  useEffect(() => {
    getDietProgramme();
  });

  const dietProgrammeSelect = (dietProgramme: string) => {
    // save chosen diet programme to local storage
    const setDietProgramme = async () => {
      await Preferences.set({
        key: "dietProgramme",
        value: dietProgramme,
      });
    };
    setDietProgramme();

    // fetch to nutrition page
    history.push("/Health-nutrient");
  };

  return (
    <>
      <div className={style.dietProgrammeContainer}>
        <h2>Weight Loss Diets Programme </h2>
        <div className={style.dietProgrammeNotice}>
          You can change your diets programme anytime.
        </div>

        <div
          className={style.dietProgrammeItem}
          onClick={() => {
            dietProgrammeSelect("Low Carbs");
          }}
        >
          Low-Carbs Diets
        </div>
        <div
          className={style.dietProgrammeItem}
          onClick={() => {
            dietProgrammeSelect("Ketogenic");
          }}
        >
          Ketogenic Diets
        </div>
        <div
          className={style.dietProgrammeItem}
          onClick={() => {
            dietProgrammeSelect("IMF");
          }}
        >
          Intermittent Fasting
        </div>
        {selectedDietProgramme === "true" ? (
          <div
            className={style.dietProgrammeItem2}
            onClick={() => {
              dietProgrammeSelect("");
            }}
          >
            Stop Diet Programme
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
