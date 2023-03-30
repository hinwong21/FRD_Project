import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import PeriodCalendar from "./PeriodCanlender";
import PeriodDay from "./PeriodDay";
import UpcomingPeriod from "./UpcomingPeriod";

const PeriodMain = () => {
  return (
    <IonPage>
      <IonContent>
        {/* <UpcomingPeriod /> */}
        <PeriodDay />
        {/* <PeriodCalendar /> */}
      </IonContent>
    </IonPage>
  );
};

export default PeriodMain;
