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
import { useFetch } from "../../../hooks/useFetch";
import { api_origin } from "../../../service/api";
import { useToken } from "../../../hooks/useToken";
import Datebox from "./Datebox";
import { useGet } from "../../../hooks/useGet";

const DAY = 1000 * 60 * 60 * 24;

function formatDays(ms: number) {
  let days = Math.ceil(ms / DAY);
  if (days > 1) {
    return days + " days";
  }
  return days + " day";
}

function formatDaysLate(ms: number) {
  let days = Math.ceil(ms / DAY);
  if (days > 1) {
    return days + " days late";
  }
  return days + " day late";
}

function dateToString(date: Date | null | undefined) {
  return date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}`
    : "";
}

export function calcTopBox(
  input_start_at: string | Date | number | undefined,
  input_end_at: string | Date | number | undefined
): TopBoxFields | {} | undefined {
  if (!input_start_at) return {};

  const now = Date.now();
  const start_at = new Date(input_start_at).getTime();
  const end_at = new Date(input_end_at!).getTime();
  const up_coming_period_start_at = start_at + 28 * DAY;
  const ovu_start_at = start_at + (14 - 5) * DAY;
  const ovu_end_at = start_at + (14 + 1) * DAY;
  const diff_day_upcoming =
    Math.abs(up_coming_period_start_at + 14 * DAY - now) / DAY;
  const diff_day = Math.abs(start_at + 14 * DAY - now) / DAY;
  const pregnancyChance =
    3 < diff_day || 3 < diff_day_upcoming
      ? "low probability of pregnancy"
      : 1 < diff_day && diff_day < 3
      ? "middle probability of pregnancy"
      : diff_day < 1
      ? "high probability of pregnancy"
      : "?";
  // const periodDay =
  //   now < up_coming_period_start_at
  //     ? formatDays(up_coming_period_start_at - now)
  //     : formatDays(now - up_coming_period_start_at);
  const periodDay =
    now < start_at ? formatDays(start_at - now) : formatDays(now - start_at);
  const periodDayFormUpcoming =
    now < up_coming_period_start_at
      ? formatDays(up_coming_period_start_at - now)
      : formatDays(now - up_coming_period_start_at);

  const periodDayLate =
    now < start_at
      ? formatDaysLate(start_at - now)
      : formatDaysLate(now - start_at);
  console.log("periodDayLate", periodDayLate);

  let topBoxFields: TopBoxFields;
  if (now < start_at) {
    topBoxFields =
      now < start_at
        ? // up coming
          {
            // white top
            chance: pregnancyChance,
            // pink first
            subTitle: "upcoming period",
            // pink second
            periodDay,
            // white bottom
            ovuDay: `ovulation after ${formatDays(start_at + 14 * DAY - now)}`,
            // for ajax
            up_coming_period_start_at,
            ovu_start_at,
            ovu_end_at,
          }
        : // late
          {
            // white top
            chance: pregnancyChance,
            // pink first
            subTitle: "upcoming period",
            // pink second
            periodDay: periodDayLate,
            // white bottom
            ovuDay: `ovulation after ${formatDays(start_at + 14 * DAY - now)}`,
            // for ajax
            up_coming_period_start_at,
            ovu_start_at,
            ovu_end_at,
          };
    return topBoxFields;
  } else if (now >= start_at && now < end_at) {
    topBoxFields = {
      // white top
      chance: "low probability of pregnancy",
      // pink first
      subTitle: "period day",
      // pink second
      periodDay,
      // white bottom
      ovuDay: `ovulation after ${formatDays(start_at + 14 * DAY - now)}`,
      // for ajax
      up_coming_period_start_at,
      ovu_start_at,
      ovu_end_at,
    };
    //TODO Set true or false show the add status btn

    return topBoxFields;
  } else if (now >= start_at && now >= end_at) {
    console.log("Run here???");

    topBoxFields = {
      // white top
      chance: pregnancyChance,
      // pink first
      subTitle: "upcoming period",
      // pink second
      periodDay: periodDayFormUpcoming,
      // white bottom
      ovuDay: `ovulation after ${formatDays(
        up_coming_period_start_at + 14 * DAY - now
      )}`,
      // for ajax
      up_coming_period_start_at,
      ovu_start_at,
      ovu_end_at,
    };
    return topBoxFields;
  }
}

type TopBoxFields = {
  up_coming_period_start_at: number;
  start_at?: Date | string;
  end_at?: Date | string;
  ovu_start_at: number;
  ovu_end_at: number;
  chance: string | undefined;
  subTitle: string | undefined;
  periodDay: string | undefined;
  ovuDay: string | undefined;
};

export const useTopBox = (
  dbStartAt: string | undefined,
  dbEndAt: string | undefined
) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [token] = useToken();
  const fields = calcTopBox(startDate || dbStartAt, endDate || dbEndAt);
  console.log("1", startDate);
  console.log("2", dbStartAt);
  console.log("3", endDate);
  console.log("4", dbEndAt);

  return { startDate, setStartDate, endDate, setEndDate, ...fields };
};

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

function TopBox(
  props: Partial<TopBoxFields> & {
    btname: string | undefined;
    startDate: Date | null;
    endDate: Date | null;
    setStartDate: (startDate: Date | null) => void;
    setEndDate: (endDate: Date | null) => void;
    upcoming_date_id: string | undefined;
  }
) {
  const [upcomingDate] = useGet<UpcomingDate>("/period/upcomingDate", null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [period_start, setPeriod_start] = useState<string>(
    dateToString(props.startDate)
  );
  const [period_end, setPeriod_end] = useState<string>(
    dateToString(props.endDate)
  );
  const [token] = useToken();
  const fetch = useFetch();

  const handleDateChange = (start: Date | null, end: Date | null) => {
    console.log("%%%%%%", start);

    if (
      start &&
      end &&
      props.up_coming_period_start_at &&
      props.ovu_start_at &&
      props.ovu_end_at
    ) {
      fetch(props.upcoming_date_id ? "PUT" : "POST", "/period/periodData", {
        id: props.upcoming_date_id,
        start_at: dateToString(start),
        end_at: dateToString(end),
        upcoming_at: dateToString(new Date(props.up_coming_period_start_at)),
        days: "5",
        ovu_start_at: dateToString(new Date(props.ovu_start_at)),
        ovu_end_at: dateToString(new Date(props.ovu_end_at)),
      });
    }

    props.setStartDate(start);
    props.setEndDate(end);
    setCalendarVisible(true);
    console.log("444555666", dateToString(start));

    setPeriod_start(dateToString(start));
    setPeriod_end(dateToString(end));
  };

  return (
    <div className={styles.bigBox}>
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
                startDate={props.startDate}
                endDate={props.endDate}
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

      <br></br>
      <br></br>
      <br></br>
      <Datebox
        subTitle="period"
        startDate={period_start ? period_start : upcomingDate?.start_at}
        endDate={period_end ? period_end : upcomingDate?.end_at}
      />
      <Datebox
        subTitle="fertile period"
        startDate={dateToString(new Date(props.ovu_start_at!))}
        endDate={dateToString(new Date(props.ovu_end_at!))}
      />
    </div>
  );
}

export default React.memo(TopBox);
