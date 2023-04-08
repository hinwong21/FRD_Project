import { IonSpinner } from "@ionic/react";
import React from "react";
import style from "./Loading.module.scss";

export const Loading = () => {
  return (
    <div className={style.loadingContainer}>
      <div className={style.drinkWater}>見字飲水</div>
      <IonSpinner
        name="lines-small"
        className={style.loadingSpinner}
      ></IonSpinner>
    </div>
  );
};
