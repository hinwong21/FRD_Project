import React from "react";
import { Provider } from "react-redux";
import { nutritionStore } from "../../../redux/Nutrition/store";
import Header from "./Header";
import { WaterBalance } from "./WaterBalance";
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
      <IonContent>
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
