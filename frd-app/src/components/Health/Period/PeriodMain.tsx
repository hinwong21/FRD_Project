import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import AddStatusPage from "./AddStatusPage";
import PeriodCalendar from "./PeriodCanlender";

import UpcomingPeriod from "./UpcomingPeriod";

const PeriodMain = () => {
  return (
    <IonPage>
      <IonContent>
        {/* <UpcomingPeriod /> */}

        <AddStatusPage />
        {/* <PeriodCalendar /> */}
      </IonContent>
    </IonPage>
  );
};

export default PeriodMain;
