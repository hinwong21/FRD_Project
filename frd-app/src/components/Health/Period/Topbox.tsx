import {
  IonButton,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import styles from "./PeriodDate.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import sty from "./DatePicker.module.scss";

function Topbox(props: {
  chance: string;
  subTitle: string;
  periodDay: string;
  ovuDay: string;
  btname: string;
  // getDate: (saveDate: Date | null) => void;
  getStart: (startDate: Date | null) => void;
  getEnd: (endDate: Date | null) => void;
}) {
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const handleDateChange = (start: Date | null, end: Date | null) => {
    // setSelectedDate(start);
    setStartDate(start);
    setEndDate(end);
    setCalendarVisible(true);
  };

  useEffect(() => {
    // 呼叫父component中的函數更新date值
    // props.getDate(selectedDate);
    props.getStart(startDate);
    props.getEnd(endDate);
  }, [props, startDate, endDate]);

  return (
    <div className={styles.topBox}>
      <div className={styles.chancePre}>{props.chance}</div>
      <div className={styles.upcomingPeriod}>
        {props.subTitle}
        <div>{props.periodDay}</div>
      </div>
      <div className={styles.upcomingOvulation}>{props.ovuDay}</div>
      <IonButton
        size="default"
        color={styles.btn}
        className={styles.btn}
        onClick={() => setCalendarVisible(true)}
      >
        {props.btname}
      </IonButton>
      <IonModal
        className={sty.dateModal}
        isOpen={calendarVisible}
        onDidDismiss={() => setCalendarVisible(false)}
      >
        <IonHeader>
          <IonToolbar color={styles.pBar} className={styles.pBar}>
            <IonTitle className={sty.title}>select date</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className={sty.outsideDatePickerBox}>
          <div className={sty.textBox}>
            <div>start date</div>
            <div>end date</div>
          </div>
          <div className={sty.datePickerBox}>
            <DatePicker
              className={sty.customDatePicker}
              // selected={startDate}
              startDate={startDate}
              endDate={endDate}
              selectsRange={true}
              onChange={(dates) =>
                handleDateChange(dates[0] as Date, dates[1] as Date)
              }
              dateFormat="dd/MM/yyyy"
            />

            <IonButton
              color={styles.btn}
              className={styles.btn}
              onClick={() => setCalendarVisible(false)}
            >
              Close
            </IonButton>
          </div>
        </div>
      </IonModal>
    </div>
  );
}

export default Topbox;
