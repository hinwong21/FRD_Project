import React, { useEffect, useState } from "react";
import { WaterProgressBar } from "./WaterProgressBar";
import "./Nutrition.css";
import { Preferences } from "@capacitor/preferences";

export const WaterBalance = () => {
  const [waterIntake, setWaterIntake] = useState<number>(0);

  useEffect(() => {
    const resetData = async () => {
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

      await Preferences.set({
        key: "water",
        value: JSON.stringify({ water: newWaterIntake, date: resetTime }),
      });
    };
    setWaterLocal();
  }

  return (
    <div className="water-balance-wrapper">
      <div className="water-balance-container">
        <div className="water-balance-header">Water balance</div>

        <div className="water-balance-main">
          <div className="water-intake-container">
            <div className="water-intake">
              <div className="current-water-intake">Water: {waterIntake}</div>
              <div className="water-minimum-intake">
                Daily minimum intake: 1.6 L
              </div>
            </div>
            <button className="water-intake-addBtn" onClick={addWaterIntake}>
              +
            </button>
          </div>
          <div className="water-progressBar-container">
            <WaterProgressBar dailyIntake={1.6} currentIntake={waterIntake} />
          </div>
        </div>
      </div>
    </div>
  );
};
