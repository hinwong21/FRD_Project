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
  IonPage,
  IonToolbar,
  IonContent,
} from "@ionic/react";
import {useState} from "react";
import { calendarNumberOutline } from "ionicons/icons";
import styles from "./Setting.module.css"; 
import { PersonalSetting } from "./PersonalSetting";
import { getName } from "../../service/LocalStorage/LocalStorage";
import { Preferences } from "@capacitor/preferences";

export const Setting = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  async function getGoogleCalendarEvents() {
    // let port = env.EXPRESS_SERVER_URL
    const res = await fetch(
      "http://localhost:8090/calendar/google-calendar-authorization",
      {
        method: "GET",
      }
    );
    const json = await res.json();
    if (json.success) {
      setShowAlert(true);
      setAlertMsg("Successfully imported events from your Google Calendar!");
    //get the google calendar events from db
    let token = await getName("token")
    const events = await fetch("http://localhost:8090/calendar/google-events", {
      headers:{
        Authorization:"Bearer " + token,
        "Content-type":"application/json"},
      method: "GET",
    });
    const events_json = await events.json();
    const events_json2 = events_json[0].content.replace(/\\/g, "");
    const events_json3 = JSON.parse(events_json2);
    //insert them into local storage
    const key = "calendar";
    const data = events_json3
    const existingValue = await Preferences.get({ key });
    const existingData = existingValue.value
      ? JSON.parse(existingValue.value)
      : [];
    const value = JSON.stringify([...existingData, data]);
    await Preferences.set({ key, value });
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
