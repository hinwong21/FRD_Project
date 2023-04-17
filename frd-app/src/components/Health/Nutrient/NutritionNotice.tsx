import React from "react";
import style from "./Nutrition.module.scss";

export const NutritionNotice = () => {
  let notice1 =
    "Eating iron-rich foods such as red meat, spinach, lentils, and fortified cereals can help replenish iron levels.";
  let notice2 =
    "Eating fiber-rich foods such as fruits, vegetables, whole grains, and legumes can help alleviate constipation, a common symptom during menstruation.";
  let notice3 =
    "Eating anti-inflammatory foods such as fatty fish, nuts, seeds, and leafy greens can help reduce inflammation.";
  return (
    <div className={style.nutritionNoticeContainer}>
      <div className={style.nutritionNotice}>
        <div className={style.nutritionNoticePeriod}></div>
        <div className={style.nutritionNoticeContent}>
          <header>Period</header>
          <div>{notice1}</div>
        </div>
      </div>
    </div>
  );
};
