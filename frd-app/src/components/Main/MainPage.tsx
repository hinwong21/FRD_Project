import React, { useEffect, useState } from "react";
import { Login } from "../../pages/Login/Login";
import { Link } from "react-router-dom";
import { IonPage, IonContent } from "@ionic/react";
import { MainHeader } from "./MainHeader";
import { Preferences } from "@capacitor/preferences";
import style from "./Main.module.scss";
import Calendar from "../Calendar/Calendar";

export const MainPage = () => {
  const [loggedIn, setLoggedIn] = useState("");
  const [dailyCheckIn, setDailyCheckIn] = useState("");

  useEffect(() => {
    const getUserLocal = async () => {
      const { value } = await Preferences.get({ key: "users" });
      if (value == null) {
        setLoggedIn("false");
      } else {
        setLoggedIn("true");
        const { value } = await Preferences.get({ key: "dailyCheckIn" });
        if (value == null) {
          setDailyCheckIn("true");
        } else {
          setDailyCheckIn("false");
        }
      }
    };
    getUserLocal();
  }, []);

  // const reset = async () => {
  //   await Preferences.remove({ key: "users" });
  //   await Preferences.remove({ key: "dailyCheckIn" });
  // };
  // reset();

  return (
    <>
      <Login />

      {/* <IonPage>
          <IonContent fullscreen>
            <div className={style.mainContainer}>
              <MainHeader />
              <div className={style.mainEventHeader}>Today Schedule</div>
              <div className={style.mainEventContainer}>
                <ul>
                  <li className={style.mainEvent}>08:00 - 09:30 running</li>
                  <li className={style.mainEvent}>10:00 - 11:00 swimming</li>
                  <li className={style.mainEvent}>12:00 - 13:00 lunch</li>
                  <li className={style.mainEvent}>
                    19:00 - 20:00 dinner with alex
                  </li>
                  <li className={style.mainEvent}>12:00 - 13:00 running</li>
                  <li className={style.mainEvent}>
                    19:00 - 20:00 dinner with alex
                  </li>
                  <li className={style.mainEvent}>12:00 - 13:00 running</li>
                  <li className={style.mainEvent}>
                    19:00 - 20:00 dinner with alex
                  </li>
                  <li className={style.mainEvent}>12:00 - 13:00 running</li>
                  <li className={style.mainEvent}>
                    20:00 - 22:00 dinner with alex
                  </li>
                  <li className={style.mainEvent}>12:00 - 13:00 running</li>
                  <li className={style.mainEvent}>
                    20:00 - 22:00 dinner with alex
                  </li>
                  <li className={style.mainEvent}>12:00 - 13:00 running</li>
                  <li className={style.mainEvent}>
                    20:00 - 22:00 dinner with alex
                  </li>
                  <div className={style.space}></div>
                </ul>
              </div>

              <footer className={style.mainFooter}>
                <Link to="/page/Calender" className={style.calenderBtn}>
                  Start a Great Day
                </Link>
              </footer>
            </div>
          </IonContent>
        </IonPage> */}
    </>
  );
};
