import React, { useState } from "react";
import { WaterProgressBar } from "./WaterProgressBar";
import "./Nutrition.css";

export const WaterBalance = () => {
  const [waterIntake, setWaterIntake] = useState<number>(0);
  function addWaterIntake() {
    const newWaterIntake = (waterIntake + 0.1).toFixed(1);
    setWaterIntake(parseFloat(newWaterIntake));
  }
  return (
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
  );
};
