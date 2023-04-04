import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { calendarClearOutline, trashOutline } from "ionicons/icons";
import React, { useState } from "react";
import styles from "./PeriodDate.module.scss";
import Status from "./Status";

const PeriodRecord = () => {
  const [showStatus, setShowStatus] = useState(true);

  //onClick Fn , True or False, and then show the status detail
  const [openDetails, setOpenDetails] = useState(false);

  // TODO 從 DB 拎data，要用map loop住gen

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color={styles.pBar} className={styles.pBar}>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Period</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className={styles.statusRecordContainer}>
          {/* TODO 要用map loop住gen,到時係比個array object去loop，而家hard code住先，暫時拆開statusType同statusLv先*/}
          {/* {showStatus && (
            <Status
              subtitle="March"
              date="22/03/2023"
              statusType="Tried"
              statusContent="5"
            />
          )} */}
          {showStatus && (
            <div className={styles.card}>
              <div className={styles.box}>
                <div className={styles.headBox}>
                  {/* <h2 className={styles.subtitle}>March</h2> */}
                  {/* <IonIcon
                      className={styles.delIcon}
                      icon={trashBinOutline}
                      slot="end"
                      onClick={() => {
                        props.fnDel();
                      }}
                    ></IonIcon> */}
                </div>
                <div
                  className={styles.outBox}
                  onClick={() => {
                    setOpenDetails(!openDetails);
                  }}
                >
                  <div className={styles.innerBox}>
                    {/* <IonIcon
                      className={styles.icon}
                      icon={calendarClearOutline}
                      slot="start"
                    /> */}
                    <div className={styles.topDayBox}>
                      <div className={styles.label}>date</div>
                      <div className={styles.date}>2023/03/23</div>
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

                  {/* TODO Use map to loop GEN the status details LOOP PERIOD_STATUS TABLE*/}
                  {openDetails && (
                    // <RecordItems
                    //   statusType={props.statusType}
                    //   statusContent={props.statusContent}
                    // />
                    <div className={styles.statusDetails}>
                      <div className={styles.statusDetailsBox}>
                        <div className={styles.statusType}>
                          {/* {props.statusType} */}
                          pain
                        </div>
                        <div className={styles.statusLv}>
                          {/* {props.statusContent} */}2
                        </div>
                      </div>
                    </div>
                  )}

                  {openDetails && (
                    <div className={styles.statusDetails}>
                      <div className={styles.statusDetailsBox}>
                        <div className={styles.statusType}>
                          {/* {props.statusType} */}
                          test
                        </div>
                        <div className={styles.statusLv}>
                          {/* {props.statusContent} */}3
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PeriodRecord;
