import { IonIcon } from "@ionic/react";
import { calendarClearOutline } from "ionicons/icons";
import React from "react";
import styles from "./PeriodDate.module.scss";

function Datebox(props: {
  subTitle: string;
  startDate: string | undefined;
  endDate: string | undefined;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.box}>
        <h2 className={styles.subtitle}>{props.subTitle}</h2>
        <div className={styles.innerBox}>
          <IonIcon
            className={styles.icon}
            icon={calendarClearOutline}
            slot="start"
          />
          <div className={styles.miniBox}>
            <div className={styles.label}>start date</div>
            <div className={styles.date}>{props.startDate}</div>
          </div>
        </div>

        <div className={styles.innerBox}>
          <IonIcon
            className={styles.icon}
            icon={calendarClearOutline}
            slot="start"
          />
          <div className={styles.miniBox}>
            <div className={styles.label}>end date</div>
            <div className={styles.date}>{props.endDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Datebox;
