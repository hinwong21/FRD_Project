import React, { useState } from "react";
import {
  calendarClearOutline,
  calendarNumberOutline,
  calendarOutline,
  caretForwardOutline,
} from "ionicons/icons";
import styles from "./Period.module.scss";
import { IonContent, IonIcon, IonPage } from "@ionic/react";

const Period = () => {
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString()
  );
  const [startDate, setStartDate] = useState("Mar 19, 2023");
  const [endDate, setEndDate] = useState("Apr 3, 2023");
  const [logs, setLogs] = useState([
    { date: "Mar 22, 2023", status: "Period Day 1" },
    { date: "Feb 18, 2023", status: "Period Day 5" },
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
                <h2 className={styles.subtitle}>Today's Status</h2>
                <div className={styles.innerBox}>
                  {/* <div className={styles.icon}>&#128197;</div> */}
                  <IonIcon icon={calendarClearOutline} slot="start" />
                  <div className={styles.miniBox}>
                    <div className={styles.label}>Date</div>
                    <div className={styles.value}>{currentDate}</div>
                  </div>
                </div>

                <div className={styles.innerBox}>
                  <div className={styles.icon}>&#10133;</div>
                  <div className={styles.miniBox}>
                    <div className={styles.label}>Status</div>
                    <button color="primary" onClick={handleAddStatus}>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.box}>
                <h2 className={styles.subtitle}>Upcoming Period</h2>
                <div className={styles.innerBox}>
                  <div className="icon">&#128197;</div>
                  <div className="label">Start Date</div>
                  <div className="date">{startDate}</div>
                </div>
                <div className={styles.innerBox}>
                  <div className="icon">&#128197;</div>
                  <div className={styles.miniBox}>
                    <div className="label">End Date</div>
                    <div className="date">{endDate}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.box}>
                <h2 className={styles.subtitle}>Log</h2>
                <div className={styles.innerBox}>
                  {logs.map((log, index) => (
                    <div key={index}>
                      <div className="icon">&#128197;</div>
                      <div className="label">Date</div>
                      <div className="date">{log.date}</div>
                      <div className="badge">{log.status}</div>
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
