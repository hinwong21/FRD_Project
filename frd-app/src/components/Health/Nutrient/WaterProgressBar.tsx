import React, { useState, useEffect } from "react";
import "./WaterProgressBar.css"; // Import the CSS file for the progress bar

type ProgressBarProps = {
  dailyIntake: number;
  currentIntake: number;
};

export function WaterProgressBar({
  dailyIntake,
  currentIntake,
}: ProgressBarProps) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Calculate the progress towards the daily intake
    const progress = (currentIntake / dailyIntake) * 100;

    // Update the width of the progress bar
    setProgress(progress);
  }, [currentIntake, dailyIntake]);

  return (
    <>
      <div className="progress-bar">
        <div className="water-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </>
  );
}
