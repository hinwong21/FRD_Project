import React, { useEffect, useState, Component } from "react";
import styles from "./DiaryEditor.module.css";
import {DiaryTextEditor} from "./DiaryTextEditor"
import {
  IonPage,
  IonInput
} from "@ionic/react";

interface DiaryEditorProps {
  handleCallbackWeather :(arg0: { temperature: any; humidity: any; uvindexValue: number; uvindexdesc: string; icon: any; date: string; }) => void,
  handleCallbackTitleAndMood : (arg0: { selected: string|null, title: string }) => void
}

export const DiaryEditor: React.FC<DiaryEditorProps> = ({handleCallbackWeather, handleCallbackTitleAndMood}) =>{
  const [content, setContent] = useState("");
  const [data, setData] = useState<Data>();
  // const [value, setValue] = useState("")
  const [selected, setSelected] = useState<string | null>("happy");
  const [title, setTitle] = useState("Diary")

  const selectEmotion = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const selectedEmotion = (event.target as HTMLDivElement).id;
    setSelected(selectedEmotion);
  };


  type Data = {
    temperature: number;
    humidity: number;
    uvindexValue: number;
    uvindexdesc: string;
    icon: string;
  };

  function diaryDate ():string{
    const date = new Date();
    return date.toString().slice(0,15)
  }

  useEffect(() => {
    const todayWeather = async () => {
      let res = await fetch(
        "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en"
      );

      let json = await res.json();

      // define the change of uvIndex at night and morning
      let uvIndex = 0;
      if (typeof json.uvindex != "string") {
        uvIndex = json.uvindex.data[0].value;
      }

      let uvLevel = "";
      if (typeof json.uvindex != "string") {
        uvLevel += "(" + json.uvindex.data[0].desc + ")";
      }

      setData({
        temperature: json.temperature.data[0].value,
        humidity: json.humidity.data[0].value,
        uvindexValue: uvIndex,
        uvindexdesc: uvLevel,
        icon: json.icon
      });

      handleCallbackWeather({
        temperature: json.temperature.data[0].value,
        humidity: json.humidity.data[0].value,
        uvindexValue: uvIndex,
        uvindexdesc: uvLevel,
        icon: json.icon,
        date: diaryDate()
      })

    };
    todayWeather();
  }, []);

  useEffect(()=>{
    handleCallbackTitleAndMood({
      title:title,
      selected: selected
    })

  },[selected,title])

  
  return (
    <>
    <IonPage>

    <div className={styles.mainWrapper}>
      <div className={styles.weatherWrapper}>
        <div className={styles.dateAndTemp}>
          <div className={styles.dateOfWeather}>{diaryDate()}</div>
        {<div className={styles.temperature}>{data?.temperature}°C</div>}
        </div>
        <img
          className = {styles.dayWeatherIcon}
          src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${data?.icon}.png`}
          id = {data?.icon}
          alt="weather icon"
        />
      </div>

  <IonInput placeholder="Enter the diary title" color="dark" className={styles.diaryTitleInput} clearInput={true} maxlength={25} onIonChange={(event)=>{setTitle(event.target.value as string)}}></IonInput>

  <div className={styles.emotionSelectionBlock}>
      <div
        onClick={selectEmotion}
        id="happy"
        className={selected === "happy" ? styles.selected : ""}
      >
        😄
      </div>
      <div
        onClick={selectEmotion}
        id="angry"
        className={selected === "angry" ? styles.selected : ""}
      >
        😡
      </div>
      <div
        onClick={selectEmotion}
        id="soso"
        className={selected === "soso" ? styles.selected : ""}
      >
        😐
      </div>
      <div
        onClick={selectEmotion}
        id="shocked"
        className={selected === "shocked" ? styles.selected : ""}
      >
        😨
      </div>
      <div
        onClick={selectEmotion}
        id="sad"
        className={selected === "sad" ? styles.selected : ""}
      >
        🥴
      </div>
      </div>


      
    <div className={styles.editorWrapper}>
    <DiaryTextEditor/>
    </div>
      </div>
      </IonPage>
    </>
  );
};

export default DiaryEditor;