import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import PeriodCalendar from "./PeriodCanlender";
import UpcomingPeriod from "./UpcomingPeriod";
import PeriodDay from "./PeriodDay";
import PeriodRecord from "./PeriodRecord";

const PeriodMain = () => {
  return (
    <IonPage>
      <IonContent>
        {/* <UpcomingPeriod /> */}

        {/* <PeriodDay /> */}
        <PeriodRecord />
        {/* <PeriodCalendar /> */}
      </IonContent>
    </IonPage>
  );
};

export default PeriodMain;
