import React, { useState } from "react";
import {
  calendarClearOutline,
  calendarNumberOutline,
  calendarOutline,
  caretForwardOutline,
} from "ionicons/icons";
import styles from "./PeriodDate.module.scss";
import { IonButton, IonContent, IonIcon, IonPage } from "@ionic/react";
import PeriodCalendar from "./PeriodCanlender";
import { Link } from "react-router-dom";
import Topbox from "./Topbox";

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

  //Has record or not,
  const [hasRecord, setHasRecord] = useState(false);
  //On Period date or not
  const [isPeriod, setIsPeriod] = useState(false);

  return (
    <IonPage>
      <IonContent>
        <div className={styles.home}>
          <header>
            <h1 className={styles.title}>period</h1>
          </header>
          <div>
            <div className={styles.container}>
              <Topbox
                subTitle="upcoming period"
                periodDay="3 Days"
                ovuDay="ovulation date: after 15 days"
                btname="period start"
              />

              <div className={styles.card}>
                <div className={styles.box}>
                  <h2 className={styles.subtitle}>upcoming period</h2>
                  <div className={styles.innerBox}>
                    <IonIcon
                      className={styles.icon}
                      icon={calendarClearOutline}
                      slot="start"
                    />
                    <div className={styles.miniBox}>
                      <div className={styles.label}>start date</div>
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
                      <div className={styles.label}>end date</div>
                      <div className={styles.date}>{endDate}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.box}>
                  <h2 className={styles.subtitle}>upcoming ovulation</h2>
                  <div className={styles.innerBox}>
                    <IonIcon
                      className={styles.icon}
                      icon={calendarClearOutline}
                      slot="start"
                    />
                    <div className={styles.miniBox}>
                      <div className={styles.label}>start date</div>
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
                      <div className={styles.label}>end date</div>
                      <div className={styles.date}>{endDate}</div>
                    </div>
                  </div>
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
