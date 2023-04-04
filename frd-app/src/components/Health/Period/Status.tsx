import { IonIcon } from "@ionic/react";
import { calendarClearOutline, trashBinOutline } from "ionicons/icons";
import React, { useState } from "react";
import styles from "./PeriodDate.module.scss";
import RecordItems from "./RecordItems";

function Status(props: {
  subtitle: string;
  date: string;
  statusType: string;
  statusContent: string;
  fnDel: () => void;
}) {
  //onClick Fn , True or False, and then show the status detail
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.box}>
        <div className={styles.headBox}>
          <h2 className={styles.subtitle}>{props.subtitle}</h2>
          <IonIcon
            className={styles.delIcon}
            icon={trashBinOutline}
            slot="end"
            onClick={() => {
              props.fnDel();
            }}
          ></IonIcon>
        </div>
        <div
          className={styles.outBox}
          onClick={() => {
            setOpenDetails(!openDetails);
          }}
        >
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
          <div className={styles.statusDetails}>
            <div className={styles.statusDetailsBox}>
              <div className={styles.statusType}>status type</div>
              <div className={styles.statusLv}>description</div>
              {/* <div className={styles.statusType}>{props.statusType}</div>
              <div className={styles.statusLv}>{props.statusLv}</div> */}
            </div>
          </div>
          {/* TODO Use map to loop GEN it */}
          {openDetails && (
            <RecordItems
              statusType={props.statusType}
              statusContent={props.statusContent}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Status;
