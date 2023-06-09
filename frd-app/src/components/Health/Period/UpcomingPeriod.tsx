import React, { useCallback, useEffect, useMemo, useState } from "react";
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
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import TopBox, { useTopBox } from "./Topbox";
import Datebox from "./Datebox";
import AddTodayStsBtn from "./AddTodayStatusBtn";
import { getName } from "../../../service/LocalStorage/LocalStorage";
import { uuidv4 } from "@firebase/util";
import { api_origin } from "../../../service/api";
import { useToken } from "../../../hooks/useToken";
import { useGet } from "../../../hooks/useGet";

type stringDetails = {
  pregnancyChance?: string;
  subtitle?: string;
  periodDay?: string;
  ovuDay?: string;
  btnName?: string;
};

moment.tz.setDefault("Asia/Taipei");

type UpcomingDate = {
  end_at: string;
  upcoming_at: string;
  days: string;
  ovu_start_at: string;
  ovu_end_at: string;
  start_at: string;
  id: string;
  user_id: string;
} | null;

const UpcomingPeriod = () => {
  const [upcomingDate] = useGet<UpcomingDate>("/period/upcomingDate", null);
  const [showPeriodPage, setShowPeriodPage] = useState<boolean>(false);

  console.log("????", upcomingDate);

  // const showPage;
  const topBox = useTopBox(upcomingDate?.start_at, upcomingDate?.end_at);
  console.log("!!!", { ...topBox });
  console.log("topbox", topBox.endDate);

  const submit = useHistory();

  const handleHistory = useCallback(() => {
    submit.push("/Health-periodRecordDetails");
  }, [submit]);

  return (
    <>
      <IonHeader>
        <IonToolbar color={styles.pBar} className={styles.pBar}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Period</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className={styles.container}>
          <TopBox
            {...topBox}
            upcoming_date_id={upcomingDate?.id}
            btname="Period Editor"
          />
          {/* <br></br>
          <br></br>
       
          {/* <div className={styles.miniContainer}>
            <Datebox
              subTitle="period"
              startDate={upcomingDate?.start_at}
              endDate={upcomingDate?.end_at}
            />
          </div> */}
        </div>
        <div className={styles.goStatusBtn}>
          {/* <IonButton
            size="default"
            color={styles.btnStatus}
            className={styles.btnStatus}
            onClick={handleHistory}
          >
            status record
          </IonButton> */}
        </div>
      </IonContent>
    </>
  );
};

// const UpcomingPeriod_old = () => {
//   const submit = useHistory();

//   const handleHistory = useCallback(() => {
//     submit.push("/Health-periodRecordDetails");
//   }, [submit]);

//   const [token, setToken] = useToken();
//   const [startInfo, setStartInfo] = useState<Date | null>(null);
//   const [endInfo, setEndInfo] = useState<Date | null>();
//   const [currentDate, setCurrentDate] = useState<Date>(new Date());
//   const [upcomingInfo, setUpcomingInfo] = useState<Date | null>(null);
//   const [ovuStartInfo, setOvuStartInfo] = useState<Date | null>(null);
//   const [ovuEndInfo, setOvuEndInfo] = useState<Date | null>(null);
//   const [ovuInfo, setOvuInfo] = useState<Date | null>(null);

//   const [jsonData, setJsonData] = useState<any>();
//   // const [showUpcomingPage, setShowUpcomingPage] = useState<boolean>(true);
//   const [showPeriodPage, setShowPeriodPage] = useState<boolean>(false);

//   // Period Start & End
//   const [startDate, setStartDate] = useState<string>("");
//   const [endDate, setEndDate] = useState<string>("");
//   const [upcoming, setUpcoming] = useState<string | null>();
//   // Ovulation Start & End
//   const [ovuStartDate, setOvuStartDate] = useState<string>("");
//   const [ovuEndDate, setOvuEndDate] = useState<string>("");
//   const [countDay, setCountDay] = useState<string>("");
//   const [pregnancyChance, setPregnancyChance] = useState<string>("");

//   const [stringDetails, setStringDetails] = useState<stringDetails>({
//     pregnancyChance: "",
//     subtitle: "upcoming period",
//     periodDay: "",
//     ovuDay: "",
//     btnName: "period start",
//   });

//   //Choose the date by datePicker
//   const handleStartDate = (saveDate: Date | null) => {
//     setStartInfo(saveDate!);
//   };

//   const handleEndDate = (saveDate: Date | null) => {
//     setEndInfo(saveDate!);
//   };

//   async function countEndDate(date: any) {
//     let upcomingEndDate =
//       new Date(date.upcoming_at).getTime() + date.days * 24 * 60 * 60 * 1000;
//     let theEndDate = dateToString(new Date(upcomingEndDate));
//     setEndDate(theEndDate);
//   }

//   function dateToString(date: Date | null | undefined) {
//     return date
//       ? `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
//           2,
//           "0"
//         )}/${String(date.getDate()).padStart(2, "0")}`
//       : "";
//   }

//   //For if no record of upcoming_at Case3
//   async function countUpcomingPeriod(startInfo: Date) {
//     const millisecondsInDay = 24 * 60 * 60 * 1000;
//     const upcomingTimestamp = new Date(
//       startInfo.getTime() + 28 * millisecondsInDay
//     );
//     setUpcoming(dateToString(upcomingTimestamp)); //Insert to DB (upcoming_at)
//   }

//   //Count the date
//   //Compare with the start date and the current day
//   async function countThePeriodData(date: Date) {
//     console.log("function countThePeriodData:", date);

//     if (currentDate.getTime() < date.getTime()) {
//       const diffInMs = Math.abs(date.getTime() - currentDate.getTime());
//       const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
//       setCountDay(diffInDays > 1 ? diffInDays + " days" : diffInDays + " day");
//     } else if (currentDate.getTime() > date.getTime()) {
//       const diffInMs = Math.abs(date.getTime() - currentDate.getTime());
//       const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
//       setCountDay(
//         diffInDays > 1 ? diffInDays + " days late" : diffInDays + " day late"
//       );
//     }

//     let ovuTimeStamp = date!.getTime() - 14 * 24 * 60 * 60 * 1000;
//     setOvuInfo(new Date(ovuTimeStamp));

//     let probability = "";

//     const diffTime = Math.abs(ovuInfo!.getTime() - currentDate.getTime());
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     console.log("countOvu", diffDays);

//     if (diffDays > 3) {
//       probability = "low probability of pregnancy";
//     } else if (diffDays > 1 && diffDays < 3) {
//       probability = "middle probability of pregnancy";
//     } else {
//       probability = "height probability of pregnancy";
//     }

//     setStringDetails({
//       pregnancyChance: probability,
//       subtitle: "upcoming period",
//       periodDay: countDay,
//       ovuDay: `ovulation after: ${
//         diffDays > 1 ? `${diffDays} days` : `${diffDays} day`
//       }`,
//       btnName: "period editor",
//     });
//   }

//   async function countTheComingData(date: Date) {
//     console.log("function countTheComingData:", date);

//     const diffInMs = Math.abs(currentDate.getTime() - date.getTime());
//     const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

//     let ovuTimeStamp = date!.getTime() - 14 * 24 * 60 * 60 * 1000;
//     setOvuInfo(new Date(ovuTimeStamp));

//     let probability = "";

//     const diffTime = Math.abs(ovuInfo!.getTime() - currentDate.getTime());
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     console.log("countOvu", diffDays);

//     setStringDetails({
//       pregnancyChance: "low probability of pregnancy",
//       subtitle: "period day",
//       periodDay: diffInDays + "",
//       ovuDay: `ovulation after: ${
//         diffDays > 1 ? `${diffDays} days` : `${diffDays} day`
//       }`,
//       btnName: "period editor",
//     });
//   }

//   useEffect(() => {
//     const getUpcomingDate = async () => {
//       try {
//         const res = await fetch(`${api_origin}/period/upcomingDate`, {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         });

//         const json = await res.json();
//         console.log("JSONNN:", json);
//         // console.log(json.result.upcomingDate);

//         const allPeriodDataResult = json.result.upcomingDate;
//         const periodDateResult =
//           allPeriodDataResult[allPeriodDataResult.length - 1];
//         console.log("allPeriodDataResult of Upcoming Date:", periodDateResult);
//         setJsonData(periodDateResult);

//         setUpcomingInfo(new Date(periodDateResult.upcoming_at));

//         //TODO compare with currentDate
//         //Case 1 DB有紀錄，直接塞數據，不用計算
//         if (periodDateResult.upcoming_at && startInfo === null) {
//           setOvuStartInfo(new Date(periodDateResult.ovu_start_at));
//           setOvuEndInfo(new Date(periodDateResult.ovu_end_at));

//           setStartDate(periodDateResult.start_at);
//           setEndDate(periodDateResult.end_at);

//           setOvuStartDate(periodDateResult.ovu_start_at);
//           setOvuEndDate(periodDateResult.ovu_end_at);
//           console.log("SEE:", startDate, endDate, ovuStartDate, ovuEndDate);

//           // await countThePeriodData(new Date(periodDateResult.start_at));
//         }

//         /*
//       //TODO case 2
//       if (
//         (periodDateResult.upcoming_at && startInfo !== null) ||
//         (!periodDateResult.upcoming_at && startInfo !== null)
//       ) {
//         //TODO 還沒有來，來了就直接飛去另一個page
//         if (startInfo.getTime() > currentDate.getTime()) {
//           setUpcomingInfo(startInfo);
//           setUpcoming(dateToString(startInfo));
//           setStartDate(dateToString(startInfo));

//           //count the ovu date
//           let ovuTimeStamp = startInfo!.getTime() - 14 * 24 * 60 * 60 * 1000;
//           setOvuInfo(new Date(ovuTimeStamp));
//           console.log("update ovu1:", ovuInfo);

//           // await countThePeriodData(startInfo);
//           // await countUpcomingPeriod(startInfo);

//           setShowPeriodPage(false);

//           //TODO count ovu
//         } else if (startInfo.getTime() <= currentDate.getTime()) {
//           //count the ovu date
//           let ovuTimeStamp = startInfo!.getTime() - 14 * 24 * 60 * 60 * 1000;
//           setOvuInfo(new Date(ovuTimeStamp));
//           console.log("update ovu2:", ovuInfo);
//           // countTheComingData(startInfo);
//           setShowPeriodPage(true);
//         }
//       }
//       //Case 3
//       //TODO 寫在 下面useEffect那裡？ 寫在這裡沒有效果
//       if (!periodDateResult.upcoming_at && startInfo !== null) {
//         let token = await getName("token");
//         let id = uuidv4();
//         console.log(
//           "see the result::",
//           id,
//           jsonData.user_id,
//           startDate,
//           endDate,
//           upcoming,
//           ovuStartDate,
//           ovuEndDate
//         );

//         fetch(`${api_origin}/period/periodData`, {
//           method: "POST",
//           headers: {
//             Authorization: "Bearer " + token,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             id,
//             userId: jsonData.user_id,
//             start_at: startDate,
//             end_at: endDate,
//             upcoming_at: upcoming,
//             days: "5",
//             ovu_start_at: ovuStartDate,
//             ovu_end_at: ovuEndDate,
//           }),
//         });

//         console.log("tteerr:", id);
//       }
//       */
//       } catch (error) {
//         console.log("getUpcomingDate", error);
//       }
//     };

//     getUpcomingDate();
//   }, [startInfo]);

//   // //start date
//   // useEffect(() => {
//   //   const updateStartDate = async () => {
//   //     // let newDate = new Date(endInfo as Date);
//   //     // //TODO 4 是從DB 獲取的period週期，再減 1
//   //     // newDate.setDate(newDate.getDate() + 4);
//   //     setStartDate(dateToString(startInfo));
//   //     if (startInfo && upcomingInfo) {
//   //       //Updated the DB
//   //       // let token = await getName("token");
//   //       // fetch(`${api_origin}/period/periodData`, {
//   //       //   method: "PUT",
//   //       //   headers: {
//   //       //     Authorization: "Bearer " + token,
//   //       //     "Content-Type": "application/json",
//   //       //   },
//   //       //   body: JSON.stringify({
//   //       //     id: jsonData.id,
//   //       //     start_at: startDate,
//   //       //   }),
//   //       // });
//   //     }

//   //     // await countThePeriodData(startInfo as Date);
//   //   };
//   //   updateStartDate();
//   // }, [startDate, startInfo]);

//   // //upcoming date
//   // useEffect(() => {
//   //   const updateUpcomingDate = async () => {
//   //     if (upcoming) {
//   //       // //Updated the DB
//   //       // let token = await getName("token");
//   //       // fetch(`${api_origin}/period/periodData`, {
//   //       //   method: "PUT",
//   //       //   headers: {
//   //       //     Authorization: "Bearer " + token,
//   //       //     "Content-Type": "application/json",
//   //       //   },
//   //       //   body: JSON.stringify({
//   //       //     id: jsonData.id,
//   //       //     upcoming_at: upcoming,
//   //       //   }),
//   //       // });
//   //     }
//   //   };
//   //   updateUpcomingDate();
//   // }, [upcoming]);

//   // //end date
//   // //TODO Insert DB && if(upcoming_at === null && startInfo)
//   // useEffect(() => {
//   //   const updateEndDate = async () => {
//   //     if (endInfo) {
//   //       // let newDate = new Date(endInfo as Date);
//   //       // //TODO 4 是從DB 獲取的period週期，再減 1
//   //       // newDate.setDate(newDate.getDate() + 4);
//   //       setEndDate(dateToString(endInfo));

//   //       //Updated the DB
//   //       // let token = await getName("token");
//   //       // fetch(`${api_origin}/period/periodData`, {
//   //       //   method: "PUT",
//   //       //   headers: {
//   //       //     Authorization: "Bearer " + token,
//   //       //     "Content-Type": "application/json",
//   //       //   },
//   //       //   body: JSON.stringify({
//   //       //     id: jsonData.id,
//   //       //     end_at: endDate,
//   //       //   }),
//   //       // });
//   //     }
//   //   };
//   //   updateEndDate();
//   // }, [endDate, endInfo]);

//   // // Ovu start date
//   // //TODO Insert DB && if(upcoming_at === null && startInfo)
//   // useEffect(() => {
//   //   const updateOvuStartDate = async () => {
//   //     if (endInfo) {
//   //       let newDate = new Date(endInfo as Date);

//   //       newDate.setDate(newDate.getDate() + 4);
//   //       setOvuStartDate(dateToString(newDate));

//   //       //Updated the DB
//   //       // let token = await getName("token");
//   //       // fetch(`${api_origin}/period/periodData`, {
//   //       //   method: "PUT",
//   //       //   headers: {
//   //       //     Authorization: "Bearer " + token,
//   //       //     "Content-Type": "application/json",
//   //       //   },
//   //       //   body: JSON.stringify({
//   //       //     id: jsonData.id,
//   //       //     ovu_start_at: ovuStartDate,
//   //       //   }),
//   //       // });
//   //     }
//   //   };
//   //   updateOvuStartDate();
//   // }, [endInfo, ovuStartDate]);

//   // //Ovu end date
//   // //TODO Insert DB && if(upcoming_at === null && startInfo)
//   // useEffect(() => {
//   //   const updateOvuEndDate = async () => {
//   //     if (endInfo) {
//   //       let newDate = new Date(endInfo as Date);

//   //       newDate.setDate(newDate.getDate() + 9);
//   //       setOvuEndDate(dateToString(newDate));

//   //       //Updated the DB
//   //       // let token = await getName("token");
//   //       // fetch(`${api_origin}/period/periodData`, {
//   //       //   method: "PUT",
//   //       //   headers: {
//   //       //     Authorization: "Bearer " + token,
//   //       //     "Content-Type": "application/json",
//   //       //   },
//   //       //   body: JSON.stringify({
//   //       //     id: jsonData.id,
//   //       //     ovu_end_at: ovuEndDate,
//   //       //   }),
//   //       // });
//   //     }
//   //   };
//   //   updateOvuEndDate();
//   // }, [endInfo, ovuEndDate]);

//   return (
//     <div className={styles.home}>
//       <IonHeader>
//         <IonToolbar color={styles.pBar} className={styles.pBar}>
//           <IonButtons slot="start">
//             <IonMenuButton />
//           </IonButtons>
//           <IonTitle>Period</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <div>
//         <div className={styles.container}>
//           {/* {!showUpcomingPage && (
//                 <> */}
//           <TopBox
//             // TODO Count the chance
//             chance={stringDetails.pregnancyChance}
//             subTitle={stringDetails.subtitle}
//             // periodDay={leftDay}
//             periodDay={stringDetails.periodDay}
//             ovuDay={stringDetails.ovuDay}
//             btname={stringDetails.btnName}
//             // getDate={handleDateInfo}
//             setStartDate={handleStartDate}
//             setEndDate={handleEndDate}
//           />
//           {!showPeriodPage && (
//             <>
//               <br></br>
//               <br></br>
//               <Datebox
//                 subTitle="period"
//                 startDate={startDate}
//                 endDate={endDate}
//               />
//             </>
//           )}
//           {showPeriodPage && (
//             <>
//               <div className={styles.showBox}>
//                 <AddTodayStsBtn />
//                 <IonButton color={styles.endBtn} className={styles.endBtn}>
//                   period end
//                 </IonButton>
//               </div>
//             </>
//           )}

//           <Datebox
//             subTitle="fertile period"
//             startDate={ovuStartDate}
//             endDate={ovuEndDate}
//           />

//           {!showPeriodPage && (
//             <>
//               <br></br>
//               <br></br>
//             </>
//           )}
//         </div>
//       </div>
//       <div className={styles.goStatusBtn}>
//         <IonButton
//           size="default"
//           color={styles.btnStatus}
//           className={styles.btnStatus}
//           onClick={handleHistory}
//         >
//           status record
//         </IonButton>
//       </div>
//     </div>
//   );
// };

export default React.memo(UpcomingPeriod);
