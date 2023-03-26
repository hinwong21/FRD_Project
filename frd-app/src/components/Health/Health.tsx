import React from "react";
import Period from "./Period/PeriodMain";
import styles from "./Health.module.scss";
import { Provider } from "react-redux";
import { nutritionStore } from "../../redux/Nutrition/store";
import HealthNutrition from "./Nutrient/HealthNutrition";
import { IonContent, IonPage } from "@ionic/react";

export const Health = () => {
  return (
    <IonPage>
      <IonContent>
        <Period />
        <Provider store={nutritionStore}>
          <HealthNutrition />
        </Provider>
      </IonContent>
    </IonPage>
  );
};
