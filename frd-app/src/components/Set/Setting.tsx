import React from "react";
import {
  IonLabel,
  IonItem,
  IonList,
  IonToggle,
  IonTitle,
  IonIcon,
} from "@ionic/react";
import {
  calendarNumberOutline
} from "ionicons/icons";
import styles from "./Setting.module.css"

export const Setting = () => {
  return (
    <>
    <IonList>
      <IonTitle>Calendar</IonTitle>
      <IonItem>
        <IonLabel>
          <div className={styles.settingIcon}><IonIcon icon={calendarNumberOutline} ></IonIcon></div>
          <div className={styles.settingTitle}>Google Calendar</div>
          <div>Import from Google Calendar</div>
          </IonLabel>
        <IonToggle slot="end"></IonToggle>
      </IonItem>
      </IonList>
    </>
  
  );
};
