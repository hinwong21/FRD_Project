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
import Popup from "../Main/Popup";
import styles from "./Calendar.module.css";
import { getName } from "../../service/LocalStorage/LocalStorage";
import { useEffect, useState } from "react";

export const Calendar: React.FC = () => {
  const [dailyShake, setDailyShake] = useState(false);
  const handleDailyShake = async () => {
    const dailyData = await getName("dailyShake");

    if (dailyData !== null) {
      console.log(dailyData);
      let todayNum = new Date().getDate();
      let today = todayNum.toString();
      if (today === dailyData) {
        setDailyShake(true);
      } else {
        setDailyShake(false);
      }
    }
  };

  useEffect(() => {
    handleDailyShake();
  }, []);
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
          {!dailyShake ? <Popup /> : ""}
          <Calendar_zh />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Calendar;
