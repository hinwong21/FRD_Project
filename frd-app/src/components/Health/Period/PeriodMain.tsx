import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import PeriodDate from "./PeriodDate";

const PeriodMain = () => {
  return (
    <IonPage>
      <IonContent>
        <PeriodDate />
      </IonContent>
    </IonPage>
  );
};

export default PeriodMain;
