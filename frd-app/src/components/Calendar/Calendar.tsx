import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Calendar_zh } from "./Calendar_zh";
import Popup from "../Main/Popup"
import styles from "./Calendar.module.css";

export const Calendar: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Calendar</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className={styles.calendarWrapper}>
        <Popup/>
          <Calendar_zh />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Calendar;
