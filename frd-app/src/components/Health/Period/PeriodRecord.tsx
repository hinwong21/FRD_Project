import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import styles from "./PeriodDate.module.scss";
import Status from "./Status";

const PeriodRecord = () => {
  const [showStatus, setShowStatus] = useState(true);

  function del() {
    setShowStatus(false);
  }
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

        <div className={styles.statusContainer}>
          {/* TODO 要用map loop住gen,到時係比個array object去loop，而家hard code住先，暫時拆開statusType同statusLv先*/}
          {showStatus && (
            <Status
              subtitle="March"
              date="22/03/2023"
              statusType="Tried"
              statusLv="5"
              fnDel={del}
            />
          )}

          {showStatus && (
            <Status
              subtitle="February"
              date="07/02/2023"
              statusType="Pain"
              statusLv="2"
              fnDel={del}
            />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PeriodRecord;
