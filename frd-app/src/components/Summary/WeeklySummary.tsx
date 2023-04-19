import React from "react";
import style from "./Summary.module.scss";
import { WeeklySummaryFortune } from "./WeeklySummaryFortune";
import { WeeklySummaryTodo } from "./WeeklySummaryTodo";
import { WeeklySummaryNutrition } from "./WeeklySummaryNutrition";
import { WeeklySummaryAccount } from "./WeeklySummaryAccount";

const WeeklySummary = () => {
  return (
    <>
      <div className={style.weeklySummaryContainer}>
        <WeeklySummaryFortune />
        <WeeklySummaryTodo />
        <WeeklySummaryNutrition />
        <WeeklySummaryAccount />
      </div>
    </>
  );
};

export default WeeklySummary;
