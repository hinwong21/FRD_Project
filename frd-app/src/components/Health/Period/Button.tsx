import { IonButton } from "@ionic/react";
import React from "react";
import styles from "./PeriodDate.module.scss";

function Button(props: { btname: string }) {
  return (
    <IonButton size="default" color={styles.btn} className={styles.btn}>
      {props.btname}
    </IonButton>
  );
}

export default Button;
