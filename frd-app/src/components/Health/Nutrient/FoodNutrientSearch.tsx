import React from "react";
import { IonInput, IonItem, IonLabel } from "@ionic/react";

export function FoodNutritionSearch() {
  return (
    <>
      <IonItem counter={true}>
        <IonLabel position="floating">Default Counter</IonLabel>
        <IonInput></IonInput>
      </IonItem>
    </>
  );
}
