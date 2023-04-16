import {
  IonLabel,
  IonItem,
  IonList,
  IonToggle,
  IonTitle,
  IonIcon,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
  IonContent,
  useIonAlert,
} from "@ionic/react";
import { useState } from "react";
import { calendarNumberOutline } from "ionicons/icons";
import styles from "./Setting.module.css";
import { PersonalSetting } from "./PersonalSetting";
import { useGet } from "../../hooks/useGet";

export const Setting = () => {
  const [presentAlert] = useIonAlert();

  const [shouldGet, setShouldGet] = useState(false);

  const [getResult] = useGet(
    shouldGet ? "/calendar/google-calendar-authorization" : "",
    { success: false }
  );

  if (getResult.success) {
    presentAlert("Successfully imported events from your Google Calendar!");
  }

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
                checked={shouldGet}
                onIonChange={(e) => setShouldGet(e.detail.value)}
              ></IonToggle>
            </IonItem>
          </IonList>

          <PersonalSetting />
        </IonContent>
      </IonPage>
    </>
  );
};
