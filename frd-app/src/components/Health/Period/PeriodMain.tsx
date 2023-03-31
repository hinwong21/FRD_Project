import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import PeriodCalendar from "./PeriodCanlender";
import UpcomingPeriod from "./UpcomingPeriod";
import PeriodDay from "./PeriodDay";

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
