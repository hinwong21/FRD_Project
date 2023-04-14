import React, { useEffect, useState } from "react";
import { WaterProgressBar } from "./WaterProgressBar";
import style from "./Nutrition.module.scss";
import { Preferences } from "@capacitor/preferences";

export const WaterBalance = () => {
  const [waterIntake, setWaterIntake] = useState<number>(0);

  useEffect(() => {
    const resetData = async () => {
      // get in local storage
      const { value } = await Preferences.get({ key: "water" });
      if (value !== null) {
        let json = JSON.parse(value);
        let date = new Date(json.date).getTime();
        let now = new Date().getTime();

        if (now >= date) {
          await Preferences.remove({ key: "water" });
          setWaterIntake(0);
        }
      }
    };
    resetData();
  }, []);

  useEffect(() => {
    const getWater = async () => {
      const { value } = await Preferences.get({ key: "water" });
      if (value !== null) {
        let data = JSON.parse(value);
        let water = data.water;
        setWaterIntake(water);
      }
    };

    getWater();
  }, []);

  function addWaterIntake() {
    const newWaterIntake = parseFloat((waterIntake + 0.1).toFixed(1));
    setWaterIntake(newWaterIntake);

    const setWaterLocal = async () => {
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
      // save in local storage
      await Preferences.set({
        key: "water",
        value: JSON.stringify({ water: newWaterIntake, date: resetTime }),
      });
    };
    setWaterLocal();
  }

  return (
    <div className={style.waterBalanceWrapper}>
      <div className={style.waterBalanceContainer}>
        <div className={style.waterBalanceHeader}>Water balance</div>

        <div className={style.waterBalanceMain}>
          <div className={style.waterIntakeContainer}>
            <div className={style.waterIntake}>
              <div className={style.currentWaterIntake}>
                Water: {waterIntake}
              </div>
              <div className={style.waterMinimumIntake}>
                Daily minimum intake: 1.6 L
              </div>
            </div>
            <button
              className={style.waterIntakeAddBtn}
              onClick={addWaterIntake}
            >
              +
            </button>
          </div>
          <div className={style.waterProgressBarContainer}>
            <WaterProgressBar dailyIntake={1.6} currentIntake={waterIntake} />
          </div>
        </div>
      </div>
    </div>
  );
};
