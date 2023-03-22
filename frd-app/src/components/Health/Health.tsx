import React from "react";
import { Nutrient } from "./Nutrient/Nutrient";
import { Period } from "./Period/Period";

export const Health = () => {
  return (
    <div>
      <Period />
      <Nutrient />
    </div>
  );
};
