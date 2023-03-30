import { IonButton } from "@ionic/react";
import React from "react";
import Button from "./Button";
import styles from "./PeriodDate.module.scss";
function Topbox(props: {
  subTitle: string;
  periodDay: string;
  ovuDay: string;
  btname: string;
}) {
  return (
    <div className={styles.topBox}>
      <div className={styles.upcomingPeriod}>
        {props.subTitle}
        <div>{props.periodDay}</div>
      </div>
      <div className={styles.upcomingOvulation}>{props.ovuDay}</div>
      <Button btname={props.btname} />
    </div>
  );
}

export default Topbox;
