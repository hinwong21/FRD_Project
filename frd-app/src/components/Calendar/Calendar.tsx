import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import { Calendar_zh } from "./Calendar_zh";
import styles from "./Calendar.module.css";
import { useState, useEffect } from "react";
import { LoginSetup } from "../Set/LoginSetup";
import { DailySummary } from "../Main/DailySummary";
import { useToken } from "../../hooks/useToken";
import { useDailyCheckIn } from "../../hooks/useDailyCheckIn";

export const Calendar: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  // console.log(name);
  let titleName = "";
  let fetchPage = <></>;

  const [dailyCheckIn, setDailyCheckIn] = useDailyCheckIn();

  useEffect(() => {
    if (dailyCheckIn) {
      let date = new Date(dailyCheckIn.date).getTime();
      let now = new Date().getTime();

      if (now >= date) {
        setDailyCheckIn(null);
      }
    }
  }, [dailyCheckIn]);

  const [token, setToken] = useToken();

  return (
    <IonPage>
      <IonContent id="999" fullscreen>
        {!token ? (
          <LoginSetup />
        ) : token && !dailyCheckIn ? (
          <DailySummary />
        ) : (
          <>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonMenuButton />
                </IonButtons>
                <IonTitle>Calendar</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div className={styles.calendarWrapper}>
              <Calendar_zh />
            </div>
            {/* Fetch to the page that name equal to url */}
            {/* {fetchPage} */}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Calendar;
