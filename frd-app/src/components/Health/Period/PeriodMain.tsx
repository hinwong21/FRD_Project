import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import PeriodCalendar from "./PeriodCanlender";
import UpcomingPeriod from "./UpcomingPeriod";
import PeriodDay from "./PeriodDay";
import PeriodRecord from "./PeriodRecord";

const PeriodMain = () => {
  //TODO 默認是顯示UpcomingPeriod，當periodDay = true，就顯示PeriodDay
  return (
    <IonPage>
      <IonContent>
        <UpcomingPeriod />

        {/* <PeriodDay /> */}
        {/* <PeriodRecord /> */}
        {/* <PeriodCalendar /> */}
      </IonContent>
    </IonPage>
  );
};

export default PeriodMain;
