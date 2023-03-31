import React, { useState, useEffect } from "react";
import "./ProgressBar.css"; // Import the CSS file for the progress bar

type ProgressBarProps = {
  dailyIntake: number | undefined;
  currentIntake: number | undefined;
};

export function NutrientProgressBar({
  dailyIntake,
  currentIntake,
}: ProgressBarProps) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Calculate the progress towards the daily intake
    const progress = ((currentIntake as 0) / (dailyIntake as 0)) * 100;

    // Update the width of the progress bar
    setProgress(progress);
  }, [currentIntake, dailyIntake]);

  return (
    <>
      <div className="progress-bar">
        <div className="nutrient-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </>
  );
}
