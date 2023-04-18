import React, { useEffect, useState } from "react";
import style from "./Main.module.scss";
import { MainHeader } from "./MainHeader";
import { Preferences } from "@capacitor/preferences";
import { useHistory } from "react-router";
import { ShakeAnimation } from "./ShakeAnimation";

export const DailySummary = () => {
  const [shaking, setShaking] = useState(true);
  async function setDailyCheckIn() {
    const now = new Date();
    const resetTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      6,
      0,
      0
    );

    if (now > resetTime) {
      // If the current time is past the reset time, set the reset time to tomorrow
      resetTime.setDate(resetTime.getDate() + 1);
    }
    await Preferences.set({
      key: "dailyCheckIn",
      value: JSON.stringify({ check: "Checked In", date: resetTime }),
    });
  }

  useEffect(() => {
    if (shaking) {
      setTimeout(() => {
        setShaking(false);
      }, 2000);
    }
    setDailyCheckIn();
  }, [shaking]);

  const history = useHistory();
  const handleStart = () => {
    history.push("/");
  };

  return (
    <div className={style.mainContainer}>
      {shaking ? (
        <ShakeAnimation />
      ) : (
        <div>
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
            <div className={style.calenderBtn} onClick={handleStart}>
              Enjoy Your Day!
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};
