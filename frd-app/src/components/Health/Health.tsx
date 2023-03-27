import React from "react";
import Period from "./Period/PeriodMain";
import styles from "./Health.module.scss";
import { Provider } from "react-redux";
import { nutritionStore } from "../../redux/Nutrition/store";
import HealthNutrition from "./Nutrient/HealthNutrition";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import { Route, Switch, useHistory } from "react-router-dom";

const Health = () => {
  const submit = useHistory();
  const handleHistory = (togo: string) => {
    if (togo === "Period") {
      submit.push("/Health-period");
    } else if (togo === "Nutrient") {
      submit.push("/Health-nutrient");
    }
  };

  return (
    <>
      <IonPage>
        <IonContent className={styles.mainBox}>
          <div className={styles.innerBox}>
            <IonButton
              color={styles.togoP}
              className={styles.togoP}
              onClick={() => handleHistory("Period")}
            >
              Period
            </IonButton>
            <Provider store={storeNutrition}>
              <IonButton
                color={styles.togoN}
                className={styles.togoN}
                onClick={() => handleHistory("Nutrient")}
              >
                Nutrient
              </IonButton>
            </Provider>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Health;
