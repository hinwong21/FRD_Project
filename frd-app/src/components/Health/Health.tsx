import React from "react";
import Period from "./Period/PeriodMain";
import styles from "./Health.module.scss";
import { Provider } from "react-redux";
import { storeNutrition } from "../../redux/Nutrition/store";
import HealthNutrition from "./Nutrient/HealthNutrition";
import { IonContent, IonPage } from "@ionic/react";

export const Health = () => {
  return (
    <IonPage>
      <IonContent>
        <Period />
        <Provider store={storeNutrition}>
          <HealthNutrition />
        </Provider>
      </IonContent>
    </IonPage>
  );
};
