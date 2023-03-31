import { IonIcon } from "@ionic/react";
import { waterOutline } from "ionicons/icons";
import React from "react";
import LevelBtn from "./LevelBtn";
import styles from "./PeriodDate.module.scss";

export default function StatusItem(props: {
  icon: string;
  type: string;
  lv: number;
}) {
  return (
    <div className={styles.statusContainer}>
      <div className={styles.statusItem}>
        <div className={styles.item}>
          <IonIcon
            className={styles.statusIcon}
            icon={props.icon}
            slot="start"
          ></IonIcon>
          <div className={styles.type}>{props.type}</div>
        </div>
        <LevelBtn lv={props.lv} />
      </div>
    </div>
  );
}
