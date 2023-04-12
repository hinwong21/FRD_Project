import React, { useCallback, useEffect, useState } from "react";
import moment from "moment-timezone";

import styles from "./PeriodDate.module.scss";

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import { useHistory } from "react-router-dom";
import Topbox from "./Topbox";
import Datebox from "./Datebox";
import AddTodayStsBtn from "./AddTodayStatusBtn";

type stringDetails = {
  pregnancyChance: string;
  subtitle: string;
  periodDay: string;
  ovuDay: string;
  btnName: string;
};

moment.tz.setDefault("Asia/Taipei");

const UpcomingPeriod = () => {
  const submit = useHistory();

  const handleHistory = useCallback(() => {
    submit.push("/Health-periodRecordDetails");
  }, [submit]);

  // const [startInfo, setDateInfo] = useState<Date>();
  const [startInfo, setStartInfo] = useState<Date | null>();
  const [endInfo, setEndInfo] = useState<Date | null>();
  const [currentDate, setCurrentDate] = useState(new Date());
  // const [currentDate, setCurrentDate] = useState(
  //   new Date().toLocaleDateString()
  // );
  const [showUpcomingPage, setShowUpcomingPage] = useState<boolean>(true);
  const [showPeriodPage, setShowPeriodPage] = useState<boolean>(false);
  // const handleDateInfo = (saveDate: Date | null) => {
  //   console.log("DateInfo:", saveDate);
  //   setDateInfo(saveDate!);
  //   console.log("startInfo:", startInfo);
  // };

  const handleStartDate = (saveDate: Date | null) => {
    console.log("startInfo:", saveDate);
    setStartInfo(saveDate!);
    console.log("StartDateInfo:", startInfo);
  };

  const handleEndDate = (saveDate: Date | null) => {
    console.log("endInfo:", saveDate);
    setEndInfo(saveDate!);
    console.log("endDateInfo:", endInfo);
  };

  function dateToString(date: Date | null | undefined) {
    return date
      ? `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}/${String(date.getDate()).padStart(2, "0")}`
      : "";
  }

  async function checkTheDate() {
    const currentD = moment().format("DD-MM-YYY");

    try {
      //TODO fetch DB to get data of upcoming_at and change the upcoming_at format to the Date()
      //TODO compare with currentDate
      /* 
      if (currentDate >= upcomingAt ) {
        check DB 有沒有最新的upcoming_at 的年月數據,如果沒有，表示還沒來，就顯示延遲X天
        const diffInMs = Math.abs(upcoming.getTime() - currentDate.getTime());
      //     const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
      //     setCountDay(diffInDays > 1 ? diffInDays + " days" : diffInDays + " day");
      //   } else if (startInfo.getTime() < currentDate.getTime()) {
      //     const diffInMs = Math.abs(startInfo.getTime() - currentDate.getTime());
      //     const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
      //     setCountDay(
      //       diffInDays > 1 ? diffInDays + " days late" : diffInDays + " day late"
      //     );
        const ovuChange = Number(ovuStartDate) + diffInDays
        set()
        setStringDetails({
          pregnancyChance: "low probability of pregnancy",
          subtitle: "upcoming period",
          periodDay: countDay,
          ovuDay: "period day 3",
          btnName: "period start",
        });
        console.log('日期相同!');
      } else {
        console.log('日期不相同!');
      }
    } */
    } catch (error) {}
  }

  // Period Start & End
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  // Ovulation Start & End
  const [ovuStartDate, setOvuStartDate] = useState<string>("");
  const [ovuEndDate, setOvuEndDate] = useState<string>("");
  //
  const [countDay, setCountDay] = useState<string>("");
  const [stringDetails, setStringDetails] = useState<stringDetails>({
    pregnancyChance: "",
    subtitle: "upcoming period",
    periodDay: "",
    ovuDay: "ovulation date: after 15 days",
    btnName: "period start",
  });

  const [upcoming, setUpcoming] = useState<string>("");
  // const [pregnancyChance, setPregnancyChance] = useState<string>("");
  // const [subtitle, setSubtitle] = useState<string>("upcoming period");
  // const [periodDay, setPeriodDay] = useState<string>("");
  // const [ovuDay, setOvuDay] = useState<string>("ovulation date: after 15 days");
  // const [btnName, setBtnName] = useState<string>("period start");

  function countUpcomingPeriod(startInfo: Date) {
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const upcomingTimestamp = new Date(
      startInfo.getTime() + 28 * millisecondsInDay
    );
    setUpcoming(dateToString(upcomingTimestamp)); //Insert to DB (upcoming_at)
  }

  //TODO Insert DB
  useEffect(() => {
    //TODO 加多個條件判斷
    /* if(start_at !== null && startInfo === null){ startInfo = start_at } else if(start_at !== null && startInfo !== null) {start_at = startInfo; Insert DB} else if (start_at === null && startInfo){ 
      //
      start_at = startInfo; //Insert to  DB (start_at)
      countUpcomingPeriod(startInfo)

      下面的代碼
      
    }

    */
    //Case 1: upcoming_at is Null
    if (startInfo) {
      //Upcoming Period date
      if (
        (startInfo.getFullYear() === currentDate.getFullYear() &&
          startInfo.getMonth() === currentDate.getMonth() &&
          startInfo.getDate() === currentDate.getDate()) ||
        startInfo.getTime() < currentDate.getTime()
      ) {
        //TODO Count Day
        setStringDetails({
          pregnancyChance: "low probability of pregnancy",
          subtitle: "ovulation date:",
          periodDay: "after 15 days",
          ovuDay: "period day 3",
          btnName: "edit the period",
        });
        setShowPeriodPage(true);
      } else if (startInfo.getTime() > currentDate.getTime()) {
        //Count the period coming day
        const diffInMs = Math.abs(startInfo.getTime() - currentDate.getTime());
        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
        setCountDay(
          diffInDays > 1 ? diffInDays + " days" : diffInDays + " day"
        );

        setStringDetails({
          //TODO Count Day
          pregnancyChance: "",
          subtitle: "upcoming period",
          periodDay: countDay,
          ovuDay: "ovulation date: after 15 days",
          btnName: "period start",
        });
        setShowPeriodPage(false);
      }

      //TODO 加多個條件判斷 if(upcoming_at !== null && startInfo)
      // Case 2: upcoming_at is not Null
      // if (startInfo) {
      //   //Upcoming Period date
      //   if (
      //     startInfo.getFullYear() === currentDate.getFullYear() &&
      //     startInfo.getMonth() === currentDate.getMonth() &&
      //     startInfo.getDate() === currentDate.getDate()
      //   ) {
      //     handleHistory();
      //   } else if (startInfo.getTime() > currentDate.getTime()) {
      //     // TODO 應該用 start_at 與 currentDate比較。這裡暫時以dateInfo damo住先
      //     const diffInMs = Math.abs(startInfo.getTime() - currentDate.getTime());
      //     const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
      //     setCountDay(diffInDays > 1 ? diffInDays + " days" : diffInDays + " day");
      //   } else if (startInfo.getTime() < currentDate.getTime()) {
      //     const diffInMs = Math.abs(startInfo.getTime() - currentDate.getTime());
      //     const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
      //     setCountDay(
      //       diffInDays > 1 ? diffInDays + " days late" : diffInDays + " day late"
      //     );
      //   }

      //Start period date
      //TODO insert DB 計算埋 upcoming_at日期
      setStartDate(dateToString(startInfo));
      console.log("SATRTDATE:", startDate);
    } else {
      //TODO 如果upcoming_at 是有data的，就從該處拿數據，進行計算
      // if(upcoming_at !== null)
      //將string 格式變成 Date
      // const dateObj = new Date(ovuStartDate);
      // console.log("DATEOBJ:", dateObj);
    }
  }, [currentDate, handleHistory, startDate, startInfo, countDay]);

  //end date
  //TODO Insert DB && if(upcoming_at === null && startInfo)
  useEffect(() => {
    if (endInfo) {
      // let newDate = new Date(endInfo as Date);
      // //TODO 4 是從DB 獲取的period週期，再減 1
      // newDate.setDate(newDate.getDate() + 4);
      setEndDate(dateToString(endInfo));

      // console.log("END_DATE:", endDate);
    } else if (startInfo) {
      //else if (startInfo || start_at)
      let newDate = new Date(startInfo as Date);
      //TODO 4 是從DB 獲取的period週期，再減 1
      newDate.setDate(newDate.getDate() + 4);
      setEndDate(dateToString(newDate));
    } else if (!endInfo) {
      // else if (!endInfo || !end_at)
      setEndInfo(null);
    }
  }, [endDate, endInfo, startInfo]);

  // Ovu start date
  //TODO Insert DB && if(upcoming_at === null && startInfo)
  useEffect(() => {
    if (startInfo) {
      let newDate = new Date(startInfo as Date);
      //TODO 4 是從DB 獲取的period週期，再減 1
      newDate.setDate(newDate.getDate() + 4 + 4);
      setOvuStartDate(dateToString(newDate));

      // console.log("OVU_START_DATE:", ovuStartDate);
    }
  }, [startInfo, ovuStartDate]);

  //Ovu end date
  //TODO Insert DB && if(upcoming_at === null && startInfo)
  useEffect(() => {
    if (startInfo) {
      let newDate = new Date(startInfo as Date);
      //TODO 4 是從DB 獲取的period週期，再減 1
      newDate.setDate(newDate.getDate() + 4 + 11);
      setOvuEndDate(dateToString(newDate));

      console.log("OVU_END_DATE:", ovuEndDate);
    }
  }, [startInfo, ovuEndDate]);

  //Count Days
  useEffect(() => {
    if (startInfo) {
    }
  });

  // const handleAddStatus = () => {
  //   const newStatus = { date: currentDate, status: "New Status" };
  //   setLogs([...logs, newStatus]);
  // };

  // //Has record or not,
  // const [hasRecord, setHasRecord] = useState(false);
  // //On Period date or not
  // const [isPeriod, setIsPeriod] = useState(false);

  return (
    <IonPage>
      <IonContent>
        <div className={styles.home}>
          <IonHeader>
            <IonToolbar color={styles.pBar} className={styles.pBar}>
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>Period</IonTitle>
            </IonToolbar>
          </IonHeader>

          <div>
            <div className={styles.container}>
              {/* {!showUpcomingPage && (
                <> */}
              <Topbox
                // TODO Count the chance
                chance={stringDetails.pregnancyChance}
                subTitle={stringDetails.subtitle}
                // periodDay={leftDay}
                periodDay={stringDetails.periodDay}
                ovuDay={stringDetails.ovuDay}
                btname={stringDetails.btnName}
                // getDate={handleDateInfo}
                getStart={handleStartDate}
                getEnd={handleEndDate}
              />
              {!showPeriodPage && (
                <>
                  <br></br>
                  <br></br>
                  <Datebox
                    subTitle="upcoming period"
                    startDate={startDate}
                    endDate={endDate}
                  />
                </>
              )}
              {showPeriodPage && (
                <>
                  <div className={styles.showBox}>
                    <AddTodayStsBtn />
                    <IonButton color={styles.endBtn} className={styles.endBtn}>
                      period end
                    </IonButton>
                  </div>
                </>
              )}

              <Datebox
                subTitle="fertile period"
                startDate={ovuStartDate}
                endDate={ovuEndDate}
              />

              {!showPeriodPage && (
                <>
                  <br></br>
                  <br></br>
                </>
              )}
            </div>
          </div>
          <div className={styles.goStatusBtn}>
            <IonButton
              size="default"
              color={styles.btnStatus}
              className={styles.btnStatus}
              onClick={handleHistory}
            >
              status record
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UpcomingPeriod;
