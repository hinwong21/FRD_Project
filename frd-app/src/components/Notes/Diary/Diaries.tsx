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
  IonToast,
  IonCard,
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
import { useDispatch } from "react-redux";
import { setShouldGetDataDiary } from "../../../redux/Notes/diarySlice";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store/store";
import { setNotesAlertMsg } from "../../../redux/Notes/notesAlertMsgSlice";
import { setNotesAlertShow } from "../../../redux/Notes/notesAlertSlice";
import { api_origin } from "../../../service/api";

export type DiaryType = {
  id: string;
  content: string;
  created_at: string;
  deleted_at: string;
  updated_at: string;
  weather: WeatherType;
  title: string;
  mood: string;
  user_id: number;
};

export type WeatherType = {
  temperature: string;
  humidity: number;
  uvindexValue: number;
  uvindexdesc: string;
  icon: string;
  date: string;
};

export const Diaries: React.FC = () => {
  const datetimeRef = useRef<HTMLIonDatetimeElement>(null);

  const shouldGetDataDiary = useSelector(
    (state: IRootState) => state.diary.shouldGetDataDiary
  );
  const notesAlertShow = useSelector((state:IRootState)=> state.alert.errMsgShow)
  const notesAlertMsg = useSelector((state:IRootState)=> state.alertMsg.errMsg)
  const [diaryContent, setDiaryContent] = useState<DiaryType[]>([]);
  const [previewTextArray, setPreviewTextArray] = useState<JSX.Element[]>([]);
  const [previewImageArray, setPreviewImageArray] = useState<JSX.Element[]>([]);
  const [dateBtnOpen, setDateBtnOpen] = useState(false);
  const [filteredDiary, setFilteredDiary] = useState<DiaryType[]>([]);
  const [filterMode, setFilterMode] = useState(false);
  const [filteredDate, setFilteredDate] = useState("")

  const dispatch = useDispatch();

  async function getDiary() {
    const getDiaryLS = async () => {
      const { value } = await Preferences.get({ key: "diary" });
      if (value !== null) {
        const diaryContent = JSON.parse(value);
        const sortedDiaryContent = diaryContent.sort((a:any, b:any) => {
          return new Date(JSON.parse(b.created_at)).getTime() - new Date(JSON.parse(a.created_at)).getTime();
        });
        console.log(sortedDiaryContent)
        setDiaryContent(sortedDiaryContent);
      }
    };
    getDiaryLS();
    dispatch(setShouldGetDataDiary(false));
  }

  interface DiaryEntry {
    id: string;
    title: string;
    content: string;
  }

  async function deleteDiaryEntry(idToDelete: string): Promise<void> {
    const { value } = await Preferences.get({ key: "diary" });
    if (!value) {
      return;
    }

    const diaryEntries: DiaryEntry[] = JSON.parse(value);

    const indexToDelete = diaryEntries.findIndex(
      (entry) => entry.id === idToDelete
    );
    if (indexToDelete < 0) {
      // Entry not found
      return;
    }

    diaryEntries.splice(indexToDelete, 1);

    await Preferences.set({
      key: "diary",
      value: JSON.stringify(diaryEntries),
    });
  }

  useEffect(() => {
    getDiary();
  }, [shouldGetDataDiary]);

  useEffect(() => {
    createPreview();
  }, [diaryContent]);

  function createPreview() {
    const previewTextArray: JSX.Element[] = [];
    const previewImageArray: JSX.Element[] = [];
    console.log(diaryContent);
    diaryContent.map((item, index) => {
      const parsedContent = JSON.parse(item.content).ops;

      //get text content from diary and config preview block
      const previewText = parsedContent.map(
        (content: any, contentIndex: any) => {
          if (content.insert) {
            if (typeof content.insert === "string") {
              const attrs = content.attributes || {};
              const style: React.CSSProperties = {};
              if (attrs.bold) style.fontWeight = "bold";
              if (attrs.italic) style.fontStyle = "italic";
              if (attrs.underline) style.textDecoration = "underline";
              style.color = "black";
              return (
                <span key={contentIndex} style={style}>
                  {content.insert}
                </span>
              );
            }
          } else if (content.attributes && content.attributes.link) {
            return (
              <a href={content.attributes.link} key={contentIndex}>
                {content.insert}
              </a>
            );
          }
          return null;
        }
      );
      previewTextArray.push(<div key={index}>{previewText}</div>);

      //get image content from diary and config preview block
      const previewImg = parsedContent.map(
        (content: any, contentIndex: any) => {
          if (content.insert) {
            if (content.insert.image) {
              return (
                <img
                  key={contentIndex}
                  src={content.insert.image}
                  alt="Diary Image"
                  style={{ width: "40vw" }}
                />
              );
            }
          }return null;
        }
      );
      previewImageArray.push(<div key={index}>{previewImg}</div>);
    });
    setPreviewImageArray(previewImageArray);
    setPreviewTextArray(previewTextArray);
  }

  const handelDateOpen = () => {
    setDateBtnOpen(true);
  };

  const handleDateBtnClick = () => {
    const datetimeValue = datetimeRef.current?.value;
    setDateBtnOpen(false);
    setFilterMode(true);
    console.log(datetimeValue?.slice(0, 10));
    setFilteredDate(datetimeValue?.slice(0, 10) as string)

    const filteredDataDiary = diaryContent.filter((item) =>
      item.created_at.toLowerCase().includes(datetimeValue?.slice(0, 10) as string)
    );
    setFilteredDiary(filteredDataDiary);
  };

  const handleFilterClear = ()=>{
    setFilterMode(false)
    filteredDiary.length = 0
  }

 

  return (
    <>
      <IonItemGroup>
        <IonItemDivider>
          <IonLabel className={styles.diaryLabel}>Diary</IonLabel>
          
        </IonItemDivider>

        {filterMode && <div className={styles.filteredDateDiv}>Filtered: {filteredDate}</div>}

        {!filterMode &&　<IonButton
          color="light"
          size="small"
          className={styles.diaryChooseDate}
          onClick={handelDateOpen}
        >
          <FontAwesomeIcon icon={faCalendar} />
        </IonButton>}

        {filterMode && <IonButton color="dark"
          size="small" className={styles.clearDateFilter} onClick={handleFilterClear}>Clear</IonButton>}
        
        <IonPopover
          isOpen={dateBtnOpen}
          keepContentsMounted={true}
          arrow={false}
        >
          <IonDatetime presentation="date" ref={datetimeRef}></IonDatetime>
          <IonToolbar>
            <IonButton size="small" color="medium" onClick={handleDateBtnClick}>
              Filter
            </IonButton>
          </IonToolbar>
        </IonPopover>

        <div className={styles.diaryWrapper}>
          {!filterMode &&
            diaryContent.map((item, index) => (
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
                key={index}>
                <div className={styles.diaryUpdatedTime}>
                  <div className={styles.diaryDateAdjPosition}>
                    <div className={styles.diaryWeek}>
                      {item.weather.date.slice(0, 3).toUpperCase()}
                    </div>
                    <div className={styles.diaryDate}>
                      {JSON.parse(item.created_at).slice(8, 10)}

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

                      {JSON.parse(item.created_at).slice(0, 4)}
                    </div>
                  </div>
                </div>
                <div className={styles.diaryContent}>
                  <div className={styles.diaryTitle}>
                    <div className={styles.diaryTitleText}>{item.title}</div>
                  </div>

                  <div className={styles.diaryBlock}>
                    {previewTextArray.length > 0 && (
                      <div className={styles.previewText}>
                        {previewTextArray[index]}
                      </div>
                    )}
                    {previewImageArray.length > 0 && (
                      <div className={styles.previewImage}>
                        {previewImageArray[index]}
                      </div>
                    )}
                  </div>

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
              </Link>
            ))}

          {filterMode && filteredDiary.length <1 ? 
            <div>No diary on the selected date.</div>
          :filterMode && filteredDiary.length > 0?
            (filteredDiary.map((item, index) => (
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
                      {item.weather.date.slice(0, 3).toUpperCase()}
                    </div>
                    <div className={styles.diaryDate}>
                      {JSON.parse(item.created_at).slice(8, 10)}

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

                      {JSON.parse(item.created_at).slice(0, 4)}
                    </div>
                  </div>
                </div>
                <div className={styles.diaryContent}>
                  <div className={styles.diaryTitle}>
                    <div className={styles.diaryTitleText}>{item.title}</div>
                  </div>

                  <div className={styles.diaryBlock}>
                    {previewTextArray.length > 0 && (
                      <div className={styles.previewText}>
                        {previewTextArray[index]}
                      </div>
                    )}
                    {previewImageArray.length > 0 && (
                      <div className={styles.previewImage}>
                        {previewImageArray[index]}
                      </div>
                    )}
                  </div>

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
              </Link>
            ))):<></>}
        </div>
        <IonToast isOpen={notesAlertShow} message={notesAlertMsg} duration={5000}></IonToast>
      </IonItemGroup>
    </>
  );
};

export const EditDiary = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const dispatch = useDispatch();
  const [weatherDate, setWeatherDate] = useState("");
  const [weatherTemp, setWeatherTemp] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [diaryMood, setDiaryMood] = useState("");
  const [diaryTitle, setDiaryTitle] = useState("");
  const [diaryContent, setDiaryContent] = useState("");
  const [sizeAlertOpen, setSizeAlertOpen] = useState(false);
  const [sizeAlertMsg, setSizeAlertMsg] = useState("");

  const [memoEditorContent, setMemoEditorContent] = useState("");
  const [diaryId, setDiaryId] = useState("");

  function onWillDismiss_diary(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      console.log("diary");
    }
  }

  async function confirm_diary() {
    let token = await getName("token");
    modal.current?.dismiss("", "confirm");

    //update local storage
    async function updateDiaryLS(
      id: string,
      diaryContent: string,
      diaryMood: string,
      diaryTitle: string
    ) {
      const key = "diary";
      const existingValue = await Preferences.get({ key });
      const existingData = existingValue.value
        ? JSON.parse(existingValue.value)
        : [];
      const index = existingData.findIndex(
        (item: { id: string }) => item.id === id
      );
      if (index !== -1) {
        existingData[index].content = diaryContent;
        existingData[index].updated_at = JSON.stringify(new Date());
        existingData[index].mood = diaryMood;
        existingData[index].title = diaryTitle;
      }

      try{
        const value = JSON.stringify(existingData);
        await Preferences.set({ key, value });
        dispatch(setShouldGetDataDiary(true));
      }catch{
        dispatch(setNotesAlertShow(true))
      dispatch(setNotesAlertMsg("Exceeded size limit. Please try inserting fewer images."))
      //reset the alert show value to false
      const timer = setTimeout(() => {
        dispatch(setNotesAlertShow(false))
      }, 5000);
      return () => clearTimeout(timer);
      }
      
    }

    updateDiaryLS(diaryId, diaryContent, diaryMood, diaryTitle);

    // Preferences.addExceptionListener((error) => {
    //   if (error.message.includes("Failed to execute 'setItem' on 'Storage': Setting the value of")) {
    //     alert("Storage quota exceeded. Please clear some space and try again.");
    //   }
    // });

    //update db
    const res = await fetch(`${api_origin}/editors/update-diary`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: diaryId,
        content: diaryContent,
        updated_at: JSON.stringify(new Date()),
        mood: diaryMood,
        title: diaryTitle,
      }),
    });
    const json = await res.json();
    console.log(json);
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

  function handleReEditEditorCallback(childData: any) {
    setDiaryContent(childData.content);
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

            <IonInput
              placeholder="Enter the diary title"
              value={diaryTitle}
              color="dark"
              className={styles.diaryTitleInput}
              clearInput={true}
              maxlength={25}
              onIonChange={(event: any) => {
                setDiaryTitle(event.target.value as string);
              }}
            ></IonInput>

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

            <ReEditTextEditor
              content={memoEditorContent}
              handleReEditEditorCallback={handleReEditEditorCallback}
            />
          </IonContent>
        </IonModal>
        <IonToast
          isOpen={sizeAlertOpen}
          message={sizeAlertMsg}
          duration={5000}
        ></IonToast>
      </IonPage>
    </>
  );
};

export default Diaries;
