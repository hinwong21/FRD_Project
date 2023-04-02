import React from "react";
import { Provider } from "react-redux";
import { nutritionStore } from "../../../redux/Nutrition/store";
import Header from "./Header";
import { WaterBalance } from "./WaterBalance";
import "./Nutrition.css";
import { NutritionTracker } from "./NutritionTracker";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
} from "@ionic/react";

export const Nutrition = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Nutrition</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="page-container">
        <Provider store={nutritionStore}>
          <Header />
        </Provider>

        {/* Water balance */}
        <WaterBalance />

        <Provider store={nutritionStore}>
          <NutritionTracker />
        </Provider>
      </IonContent>
    </IonPage>
  );
};
