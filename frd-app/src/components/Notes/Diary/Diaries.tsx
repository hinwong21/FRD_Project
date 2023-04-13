import React, { useEffect, useState, useRef } from "react";
import styles from "../Notes.module.css";
import { Link } from "react-router-dom";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonPage,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonItem,
  IonDatetime,
  IonIcon,
  IonPopover,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import DiaryEditor from "./DiaryEditor";
import MemoEditor, { TextEditor } from "../TextEditor/TextEditor";
// import ReEditTextEditor from "./ReEditTextEditor";
import { DiaryViewer } from "./DiaryViewer";
import { useLocation } from "react-router-dom";
import modal from "bootstrap/js/dist/modal";
import { getName } from "../../../service/LocalStorage/LocalStorage";


type DiaryType = {
  id: string;
  content: string;
  created_at: string;
  deleted_at: string;
  updated_at: string;
  weather: string;
  title: string;
  mood: string;
  user_id: number;
};

export const Diaries: React.FC = () => {
  const [diaryContent, setDiaryContent] = useState<DiaryType[]>([]);

  async function getDiary() {
    let token = await getName("token")
    const res = await fetch("http://localhost:8090/editors/diary", {
      headers:{
        Authorization:"Bearer " + token},
      method: "GET",
    });
    const diary = await res.json();
    //   console.log(diary[0].content)
    setDiaryContent(diary);
  }

  useEffect(() => {
    getDiary();
  }, []);

  return (
    <>
      <IonItemGroup>
        <IonItemDivider>
          <IonLabel className={styles.diaryLabel}>Diary</IonLabel>
        </IonItemDivider>

        <IonButton
          color="light"
          id="chooseDate"
          size="small"
          className={styles.diaryChooseDate}
        >
          <FontAwesomeIcon icon={faCalendar} />
        </IonButton>

        <IonPopover
          trigger="chooseDate"
          keepContentsMounted={true}
          arrow={false}
        >
          <IonDatetime presentation="date"></IonDatetime>
          <IonToolbar>
            <IonButton size="small" color="medium">
              Filter
            </IonButton>
          </IonToolbar>
        </IonPopover>

        <div className={styles.diaryWrapper}>
          {diaryContent.map((item, index) => (
            <Link
              to={{
                pathname: "./EditDiary",
                state: {
                  data: item.content,
                  id: item.id,
                  weather: item.weather,
                  mood: item.mood,
                  title: item.title,
                },
              }}
              className={styles.diaryAContainer}
              key={index}
            >
              <div className={styles.diaryUpdatedTime}>
                <div className={styles.diaryDateAdjPosition}>
                  <div className={styles.diaryWeek}>
                    {JSON.parse(item.weather).date.slice(0, 3).toUpperCase()}
                  </div>
                  <div className={styles.diaryDate}>
                    <div className={styles.diaryDateDay}>
                      {item.created_at.slice(8, 10)}
                    </div>
                    <div className={styles.diaryDateMonth}>
                      {item.created_at.slice(5, 7) == "01"
                        ? "JAN"
                        : item.created_at.slice(5, 7) == "02"
                        ? "FEB"
                        : item.created_at.slice(5, 7) == "03"
                        ? "MAR"
                        : item.created_at.slice(5, 7) == "04"
                        ? "APR"
                        : item.created_at.slice(5, 7) == "05"
                        ? "MAY"
                        : item.created_at.slice(5, 7) == "06"
                        ? "JUN"
                        : item.created_at.slice(5, 7) == "07"
                        ? "JUL"
                        : item.created_at.slice(5, 7) == "08"
                        ? "AUG"
                        : item.created_at.slice(5, 7) == "09"
                        ? "SEP"
                        : item.created_at.slice(5, 7) == "10"
                        ? "OCT"
                        : item.created_at.slice(5, 7) == "11"
                        ? "NOV"
                        : item.created_at.slice(5, 7) == "12"
                        ? "DEC"
                        : ""}
                    </div>
                    <div className={styles.diaryDateYear}>
                      {item.created_at.slice(0, 4)}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.diaryContent}>
                <div className={styles.diaryTitle}>
                  <div className={styles.diaryTitleText}>{item.title}</div>
                  <div className={styles.diaryMood}>
                    {item.mood == "happy"
                      ? "😄"
                      : item.mood == "sad"
                      ? "🥴"
                      : item.mood == "shocked"
                      ? "😨"
                      : item.mood == "soso"
                      ? "😐"
                      : item.mood == "angry"
                      ? "😡"
                      : ""}
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: JSON.parse(item.content) }}
                  className={styles.diaryBlock}
                ></div>
              </div>
            </Link>
          ))}
        </div>
      </IonItemGroup>
    </>
  );
};

export const EditDiary = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [weatherDate, setWeatherDate] = useState("");
  const [weatherTemp, setWeatherTemp] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [diaryMood, setDiaryMood] = useState("");
  const [diaryTitle, setDiaryTitle] = useState("");

  const [memoEditorContent, setMemoEditorContent] = useState({});
  const [memoEditorId, setMemoEditorId] = useState("");

  function onWillDismiss_memo(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      console.log("memo");
    }
  }

  async function confirm_memo() {
    modal.current?.dismiss("", "confirm");
  }

  type dataType = {
    data: string;
    id: string;
    weather: string;
    mood: string;
    title: string;
  };

  const location = useLocation();
  const data = location.state as dataType;

  useEffect(() => {
    setMemoEditorContent(`${JSON.parse(data.data as string)}`);
    setMemoEditorId(data.id);
    setWeatherDate(JSON.parse(data.weather).date);
    setWeatherTemp(JSON.parse(data.weather).temperature);
    setWeatherIcon(JSON.parse(data.weather).icon[0]);
    setDiaryMood(data.mood);
    setDiaryTitle(data.title);
  }, []);

  return (
    <>
      <IonPage>
        <IonModal
          ref={modal}
          onWillDismiss={(ev) => onWillDismiss_memo(ev)}
          isOpen={true}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <Link to={"./TodoList"}>
                  <IonButton>Cancel</IonButton>
                </Link>
              </IonButtons>
              <IonTitle>Edit Diary</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm_memo()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <div className={styles.weatherWrapper}>
              <div className={styles.dateAndTemp}>
                <div className={styles.dateOfWeather}>{weatherDate}</div>
                {<div className={styles.temperature}>{weatherTemp}°C</div>}
              </div>
              <img
                className={styles.dayWeatherIcon}
                src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${weatherIcon}.png`}
                alt="weather icon"
              />
            </div>

            <div className={styles.diaryTitleInput}>{diaryTitle}</div>

            <div className={styles.emotionSelectionBlock}>
              <div
                id="happy"
                className={diaryMood === "happy" ? styles.selected : ""}
              >
                😄
              </div>
              <div
                id="angry"
                className={diaryMood === "angry" ? styles.selected : ""}
              >
                😡
              </div>
              <div
                id="soso"
                className={diaryMood === "soso" ? styles.selected : ""}
              >
                😐
              </div>
              <div
                id="shocked"
                className={diaryMood === "shocked" ? styles.selected : ""}
              >
                😨
              </div>
              <div
                id="sad"
                className={diaryMood === "sad" ? styles.selected : ""}
              >
                🥴
              </div>
            </div>

            <DiaryViewer content={memoEditorContent} />
            {/* <div className={styles.diaryContentDiv} dangerouslySetInnerHTML={{__html: JSON.stringify(memoEditorContent)}}/> */}
          </IonContent>
        </IonModal>
      </IonPage>
    </>
  );
};

export default Diaries;
