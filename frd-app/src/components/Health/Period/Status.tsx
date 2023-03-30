import { IonIcon } from "@ionic/react";
import { calendarClearOutline } from "ionicons/icons";
import React from "react";
import styles from "./PeriodDate.module.scss";

//TODO onClick Fn , True or False, and then show the status detail
function Status(props: { subtitle: string; date: string }) {
  return (
    <div className={styles.card}>
      <div className={styles.box}>
        <h2 className={styles.subtitle}>{props.subtitle}</h2>
        <div className={styles.innerBox}>
          <IonIcon
            className={styles.icon}
            icon={calendarClearOutline}
            slot="start"
          />
          <div className={styles.miniBox}>
            <div className={styles.label}>date</div>
            <div className={styles.date}>{props.date}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Status;
