import React, { useState } from "react";
import {
  calendarClearOutline,
  calendarNumberOutline,
  calendarOutline,
  caretForwardOutline,
} from "ionicons/icons";
import styles from "./Period.module.scss";
import { IonButton, IonContent, IonIcon, IonPage } from "@ionic/react";

const Period = () => {
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString()
  );
  const [startDate, setStartDate] = useState("19/03/2023");
  const [endDate, setEndDate] = useState("03/04/2023");
  const [logs, setLogs] = useState([
    { date: "22/03/2023", status: "Period Day 1" },
    { date: "18/02/2023", status: "Period Day 5" },
  ]);

  const handleAddStatus = () => {
    const newStatus = { date: currentDate, status: "New Status" };
    setLogs([...logs, newStatus]);
  };

  return (
    <IonPage>
      <IonContent>
        <div className={styles.home}>
          <header>
            <h1 className={styles.title}>Period</h1>
          </header>

          <div className={styles.container}>
            <div className={styles.card}>
              <div className={styles.box}>
                <h2 className={styles.subtitle}>Upcoming Period</h2>
                <div className={styles.innerBox}>
                  <IonIcon
                    className={styles.icon}
                    icon={calendarClearOutline}
                    slot="start"
                  />
                  <div className={styles.miniBox}>
                    <div className={styles.label}>Start Date</div>
                    <div className={styles.date}>{startDate}</div>
                  </div>
                </div>

                <div className={styles.innerBox}>
                  <IonIcon
                    className={styles.icon}
                    icon={calendarClearOutline}
                    slot="start"
                  />
                  <div className={styles.miniBox}>
                    <div className={styles.label}>End Date</div>
                    <div className={styles.date}>{endDate}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.box}>
                <h2 className={styles.subtitle}>Today's Status</h2>
                <div className={styles.innerBox}>
                  {/* <div className={styles.icon}>&#128197;</div> */}
                  <IonIcon
                    className={styles.icon}
                    icon={calendarClearOutline}
                    slot="start"
                  />
                  <div className={styles.miniBox}>
                    <div className={styles.label}>Date</div>
                    <div className={styles.value}>{currentDate}</div>
                  </div>
                </div>

                <div className={styles.innerBox}>
                  <div className={styles.icon}>&#10133;</div>
                  <div className={styles.miniBox}>
                    <div className={styles.label}>Status</div>
                    <IonButton
                      color={styles.btn}
                      className={styles.btn}
                      onClick={handleAddStatus}
                    >
                      Add
                    </IonButton>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.box}>
                <h2 className={styles.subtitle}>Log</h2>
                <div className={styles.innerBox}>
                  {logs.map((log, index) => (
                    <div key={index} className={styles.logBox}>
                      <IonIcon
                        className={styles.icon}
                        icon={calendarClearOutline}
                        slot="start"
                      />
                      {/* <div className={styles.label}>Date</div> */}
                      <div className={styles.date}>{log.date}</div>
                      <div>
                        <div className={styles.badge}>{log.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Period;
