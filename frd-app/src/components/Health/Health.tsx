import React from "react";
import { Nutrient } from "./Nutrient/Nutrient";
import Period from "./Period/Period";
import styles from "./Health.module.scss";

export const Health = () => {
  return (
    <div>
      <Period />
      <Nutrient />
    </div>
  );
};
