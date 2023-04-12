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
import { Preferences } from "@capacitor/preferences";
import { useState, useEffect } from "react";
import { LoginSetup } from "../Set/LoginSetup";
import { getName } from "../../service/LocalStorage/LocalStorage";
import { DailySummary } from "../Main/DailySummary";

export const Calendar: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  // console.log(name);
  let titleName = "";
  let fetchPage = <></>;

  const [loggedIn, setLoggedIn] = useState("");
  const [dailyCheckIn, setDailyCheckIn] = useState("");

  // const reset = async () => {
  //   await Preferences.remove({ key: "dailyCheckIn" });
  // };
  // reset();

  useEffect(() => {
    const resetData = async () => {
      const { value } = await Preferences.get({ key: "dailyCheckIn" });
      if (value !== null) {
        let json = JSON.parse(value);
        let date = new Date(json.date).getTime();
        let now = new Date().getTime();

        if (now >= date) {
          await Preferences.remove({ key: "dailyCheckIn" });
        }
      }
    };
    resetData();
  }, []);

  useEffect(() => {
    const getUserLocal = async () => {
      let token = await getName("token");
      const res = await fetch(
        `${process.env.REACT_APP_EXPRESS_SERVER_URL}/user/user`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      let data = json.result[0].age;
      if (data === null) {
        setLoggedIn("false");
        console.log(1);
      } else {
        setLoggedIn("true");
        console.log(2);
        const { value } = await Preferences.get({ key: "dailyCheckIn" });
        if (value == null) {
          setDailyCheckIn("false");
          console.log(3);
        } else {
          setDailyCheckIn("true");
          console.log(4);
        }
      }
    };
    getUserLocal();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        {loggedIn === "false" ? (
          <LoginSetup />
        ) : loggedIn === "true" && dailyCheckIn === "false" ? (
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
            {fetchPage}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Calendar;
