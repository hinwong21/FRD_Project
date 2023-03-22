// import { IonContent, IonPage } from "@ionic/react";
// import React from "react";
// import PeriodCalendar from "./PeriodCanlender";

// export const Period = () => {
//   return (
//     <div>
//       <PeriodCalendar />
//     </div>
//   );
// };

import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import {
  calendarClearOutline,
  calendarNumberOutline,
  calendarOutline,
  caretForwardOutline,
} from "ionicons/icons";

import styles from "./Period.module.css";

const Period = () => {
  return (
    <IonPage className={styles.periodWrapper}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Period</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Today's Status</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonIcon icon={calendarClearOutline} slot="start" />
                <IonLabel>Date</IonLabel>
                <IonLabel slot="end">Mar 22, 2023</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={caretForwardOutline} slot="start" />
                <IonLabel>Status</IonLabel>
                <IonLabel slot="end">Period Day 1</IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Next Period</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonIcon icon={calendarClearOutline} slot="start" />
                <IonLabel>Start Date</IonLabel>
                <IonLabel slot="end">Mar 28, 2023</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={calendarClearOutline} slot="start" />
                <IonLabel>End Date</IonLabel>
                <IonLabel slot="end">Apr 3, 2023</IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Period;
