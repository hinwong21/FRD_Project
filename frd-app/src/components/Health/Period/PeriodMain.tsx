import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import PeriodCalendar from "./PeriodCanlender";
import PeriodDate from "./PeriodDate";

const PeriodMain = () => {
  return (
    <IonPage>
      <IonContent>
        <PeriodDate />
        {/* <PeriodCalendar /> */}
      </IonContent>
    </IonPage>
  );
};

export default PeriodMain;
