import React from "react";
import { useHistory } from "react-router";
import style from "./Nutrition.module.scss";

export const SelectDietPrgm = () => {
  const history = useHistory();
  const handleFetchDiet = () => {
    history.push("/dietProgramme");
  };
  return (
    <div className={style.dietProgrammeSelectContainer}>
      <div className={style.dietProgrammeSelectBtn} onClick={handleFetchDiet}>
        Select your weight loss diet programme
      </div>
    </div>
  );
};
