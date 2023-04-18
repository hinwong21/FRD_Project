import React from "react";
import style from "./Main.module.scss";
import cylinder from "./uploads/fortuneCylinder.png";


export const ShakeAnimation = () => {
  return (
    <div className={style.shakeContainer}>

      <img
        className={style.shakingCylinder}
        src={cylinder}
        alt="fortune cylinder"
      />
    </div>
  );
};
