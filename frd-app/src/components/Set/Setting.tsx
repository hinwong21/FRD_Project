import {
  IonLabel,
  IonItem,
  IonList,
  IonToggle,
  IonTitle,
  IonIcon,
  IonAlert,
  IonButtons,
  IonHeader,
  IonMenuButton,
<<<<<<< HEAD
  IonToolbar,
=======
  IonPage,
  IonToolbar,
  IonContent,
>>>>>>> f2e9ac2d983e83cddc48d0b7f307bed23bf2f8f0
} from "@ionic/react";
import React, { memo, useState, useRef } from "react";
import { calendarNumberOutline } from "ionicons/icons";
import styles from "./Setting.module.css"; // import {env} from "../../../env"
import { PersonalSetting } from "./PersonalSetting";

export const Setting = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  async function getGoogleCalendarEvents() {
    // let port = env.EXPRESS_SERVER_URL
    const res = await fetch(
      "http://localhost:8080/calendar/google-calendar-authorization",
      {
        method: "GET",
      }
    );
    const json = await res.json();
    if (json.success) {
      setShowAlert(true);
      setAlertMsg("Successfully imported events from your Google Calendar!");
    } else {
      setShowAlert(false);
      setAlertMsg("Failed! Please try again later!");
    }
  }

  const handleAlertDismiss = () => {
    setShowAlert(false);
  };

  return (
    <>
<<<<<<< HEAD
    <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Setting</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonList>
        <IonTitle>Calendar</IonTitle>
        <IonItem>
          <IonLabel>
            <div className={styles.settingIcon}>
              <IonIcon icon={calendarNumberOutline}></IonIcon>
            </div>
            <div className={styles.settingTitle}>Google Calendar</div>
            <div>Import from Google Calendar</div>
          </IonLabel>
          <IonToggle
            slot="end"
            onIonFocus={getGoogleCalendarEvents}
          ></IonToggle>
        </IonItem>
      </IonList>
=======
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Setting</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonTitle>Calendar</IonTitle>
            <IonItem>
              <IonLabel>
                <div className={styles.settingIcon}>
                  <IonIcon icon={calendarNumberOutline}></IonIcon>
                </div>
                <div className={styles.settingTitle}>Google Calendar</div>
                <div>Import from Google Calendar</div>
              </IonLabel>
              <IonToggle
                slot="end"
                onIonFocus={getGoogleCalendarEvents}
              ></IonToggle>
            </IonItem>
          </IonList>
>>>>>>> f2e9ac2d983e83cddc48d0b7f307bed23bf2f8f0

          <IonAlert
            isOpen={showAlert}
            onDidDismiss={handleAlertDismiss}
            message={alertMsg}
            buttons={["OK"]}
          ></IonAlert>

          <PersonalSetting />
        </IonContent>
      </IonPage>
    </>
  );
};
