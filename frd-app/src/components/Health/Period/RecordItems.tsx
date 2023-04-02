import React from "react";
import styles from "./PeriodDate.module.scss";

function RecordItems(props: { statusType: string; statusLv: string }) {
  return (
    <div className={styles.statusDetails}>
      <div className={styles.statusDetailsBox}>
        <div className={styles.statusType}>{props.statusType}</div>
        <div className={styles.statusLv}>{props.statusLv}</div>
      </div>
    </div>
  );
}

export default RecordItems;
