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
import Datebox from "./Datebox";
import Status from "./Status";

const UpcomingPeriod = () => {
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
              <Datebox
                subTitle="upcoming period"
                startDate={startDate}
                endDate={endDate}
              />

              <Datebox
                subTitle="upcoming ovulation"
                startDate={startDate}
                endDate={endDate}
              />

              {/* <Status subtitle="status" date={startDate} /> */}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UpcomingPeriod;
