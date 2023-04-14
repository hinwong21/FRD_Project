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
  IonDatetime,
  IonPopover,
  IonInput,
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
import { ReEditTextEditor } from "../Memo/ReEditTextEditor";
import { Preferences } from "@capacitor/preferences";


type DiaryType = {
  id: string;
  content: string;
  created_at: string;
  deleted_at: string;
  updated_at: string;
  weather: WeatherType[];
  title: string;
  mood: string;
  user_id: number;
};

type WeatherType = {
  temperature: string;
  humidity: number;
  uvindexValue: number;
  uvindexdesc: string;
  icon: string;
  date: string;
}

export const Diaries: React.FC = () => {
  const [diaryContent, setDiaryContent] = useState<DiaryType[]>([]);

  async function getDiary() {
    const getDiaryLS = async () => {
      const { value } = await Preferences.get({ key: "diary" });
      console.log(123)
      if (value !== null) {
        setDiaryContent(JSON.parse(value));
        // console.log(JSON.parse(JSON.parse(value)[0].weather));
        
      }
    };
    getDiaryLS()
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
                    {/* {item.weather.date.slice(0, 3).toUpperCase()} */}
                  </div>
                  <div className={styles.diaryDate}>
                    <div className={styles.diaryDateDay}>
                      {JSON.parse(item.created_at).slice(8, 10)}
                    </div>
                    <div className={styles.diaryDateMonth}>
                      {JSON.parse(item.created_at).slice(5, 7) === "01"
                        ? "JAN"
                        : JSON.parse(item.created_at).slice(5, 7) === "02"
                        ? "FEB"
                        : JSON.parse(item.created_at).slice(5, 7) === "03"
                        ? "MAR"
                        : JSON.parse(item.created_at).slice(5, 7) === "04"
                        ? "APR"
                        : JSON.parse(item.created_at).slice(5, 7) === "05"
                        ? "MAY"
                        : JSON.parse(item.created_at).slice(5, 7) === "06"
                        ? "JUN"
                        : JSON.parse(item.created_at).slice(5, 7) === "07"
                        ? "JUL"
                        : JSON.parse(item.created_at).slice(5, 7) === "08"
                        ? "AUG"
                        : JSON.parse(item.created_at).slice(5, 7) === "09"
                        ? "SEP"
                        : JSON.parse(item.created_at).slice(5, 7) === "10"
                        ? "OCT"
                        : JSON.parse(item.created_at).slice(5, 7) === "11"
                        ? "NOV"
                        : JSON.parse(item.created_at).slice(5, 7) === "12"
                        ? "DEC"
                        : ""}
                    </div>
                    <div className={styles.diaryDateYear}>
                      {JSON.parse(item.created_at).slice(0, 4)}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.diaryContent}>
                <div className={styles.diaryTitle}>
                  <div className={styles.diaryTitleText}>{item.title}</div>
                  <div className={styles.diaryMood}>
                    {item.mood === "happy"
                      ? "😄"
                      : item.mood === "sad"
                      ? "🥴"
                      : item.mood === "shocked"
                      ? "😨"
                      : item.mood === "soso"
                      ? "😐"
                      : item.mood === "angry"
                      ? "😡"
                      : ""}
                  </div>
                </div>
                <div
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
  const [diaryContent, setDiaryContent] = useState("")

  const [memoEditorContent, setMemoEditorContent] = useState("");
  const [diaryId, setDiaryId] = useState("");

  function onWillDismiss_diary(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      console.log("diary");
    }
  }

  async function confirm_diary() {
    let token = await getName("token")
    modal.current?.dismiss("", "confirm");

    //update db
    const res = await fetch ("http://localhost:8090/editors/update-memo",{
      method: "PUT",
      headers:{
      Authorization:"Bearer " + token,
      "Content-type":"application/json"},
      body: JSON.stringify({
        id: diaryId,
        content:diaryContent,
        updated_at: JSON.stringify(new Date()),
        mood: diaryMood,
        title: diaryTitle
      })
    })
    const json= await res.json()
    console.log(json)

    //update local storage
    async function updateDiaryLS(id:string, diaryContent:string, diaryMood:string, diaryTitle:string) {
      const key = "diary";
      const existingValue = await Preferences.get({ key });
      const existingData = existingValue.value ? JSON.parse(existingValue.value) : [];
      const index = existingData.findIndex((item: { id: string; }) => item.id === id);
      if (index !== -1) {
        existingData[index].content = diaryContent;
        existingData[index].updated_at = JSON.stringify(new Date());
        existingData[index].mood = diaryMood;
        existingData[index].title = diaryTitle;
      }
      const value = JSON.stringify(existingData);
      await Preferences.set({ key, value });
    }
    updateDiaryLS(diaryId, diaryContent, diaryMood, diaryTitle)
  }

  type dataType = {
    data: string;
    id: string;
    weather: WeatherType;
    mood: string;
    title: string;
  };

  const location = useLocation();
  const data = location.state as dataType;

  useEffect(() => {
    setMemoEditorContent(data.data as string);
    setDiaryId(data.id);
    setWeatherDate(data.weather.date);
    setWeatherTemp(data.weather.temperature);
    setWeatherIcon(data.weather.icon);
    setDiaryMood(data.mood);
    setDiaryTitle(data.title);
  }, []);

  function handleReEditEditorCallback (childData:any){  
    setDiaryContent(childData.content)
  }

  const selectEmotion = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const selectedEmotion = (event.target as HTMLDivElement).id;
    setDiaryMood(selectedEmotion);
  };




  return (
    <>
      <IonPage>
        <IonModal
          ref={modal}
          onWillDismiss={(ev) => onWillDismiss_diary(ev)}
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
              <Link to={"./TodoList"}>
                <IonButton strong={true} onClick={() => confirm_diary()}>
                  Confirm
                </IonButton>
                </Link>
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

            <IonInput placeholder="Enter the diary title" value={diaryTitle} color="dark" className={styles.diaryTitleInput} clearInput={true} maxlength={25} onIonChange={(event: any )=>{setDiaryTitle(event.target.value as string)}}></IonInput>

            <div className={styles.emotionSelectionBlock}>
              <div
              onClick={selectEmotion}
                id="happy"
                className={diaryMood === "happy" ? styles.selected : ""}
              >
                😄
              </div>
              <div
              onClick={selectEmotion}
                id="angry"
                className={diaryMood === "angry" ? styles.selected : ""}
              >
                😡
              </div>
              <div
              onClick={selectEmotion}
                id="soso"
                className={diaryMood === "soso" ? styles.selected : ""}
              >
                😐
              </div>
              <div
              onClick={selectEmotion}
                id="shocked"
                className={diaryMood === "shocked" ? styles.selected : ""}
              >
                😨
              </div>
              <div
              onClick={selectEmotion}
                id="sad"
                className={diaryMood === "sad" ? styles.selected : ""}
              >
                🥴
              </div>
            </div>

            <ReEditTextEditor content={memoEditorContent} handleReEditEditorCallback={handleReEditEditorCallback}/>
          </IonContent>
        </IonModal>
      </IonPage>
    </>
  );
};

export default Diaries;
