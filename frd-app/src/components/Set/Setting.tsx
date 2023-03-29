import {
  IonLabel,
  IonItem,
  IonList,
  IonToggle,
  IonTitle,
  IonIcon,
  IonAlert,
} from "@ionic/react";
import React, { memo, useState, useRef } from "react";
import {
  calendarNumberOutline
} from "ionicons/icons";
import styles from "./Setting.module.css"
// import {env} from "../../../env"

export const Setting = () => {

  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")


  async function getGoogleCalendarEvents(){
    // let port = env.EXPRESS_SERVER_URL
    const res = await fetch ("http://localhost:8080/calendar/google-events",{
      method:"GET"
    })
    const json = await res.json();
    if (json.success){
      setShowAlert(true)
      setAlertMsg("Successfully imported events from your Google Calendar!")
    }else{
      setShowAlert(false)
      setAlertMsg("Failed! Please try again later!")
    }
  
  }

  const handleAlertDismiss = ()=>{
    setShowAlert(false)
  }

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
        <IonToggle slot="end" onIonFocus={getGoogleCalendarEvents} ></IonToggle>
      </IonItem>
      </IonList>
    

    <IonAlert isOpen={showAlert} onDidDismiss={handleAlertDismiss} message={alertMsg} buttons={['OK']}></IonAlert>
  </>
  );
};
