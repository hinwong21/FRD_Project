import React, { useEffect, useState, Component } from "react";
import styles from "./DiaryEditor.module.css";
import {TextEditor} from "./TextEditor"
import {
  IonButtons,
  IonButton,
  IonPopover,
  IonContent,
  IonList,
  IonItem,
  IonNavLink,
  IonFab,
  IonFabButton,
  IonFabList,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle
} from "@ionic/react";



export const DiaryEditor = () => {
  const [content, setContent] = useState("");
  const [data, setData] = useState<Data>();
  // const [value, setValue] = useState("")


  // function onContentStateChange(contentState: any) {
  //   setContent(contentState);
  // }

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
    };
    todayWeather();
  }, []);

  

  return (
    <>
    <IonPage>

    <div className={styles.mainWrapper}>
      <div className={styles.weatherWrapper}>
        <div className={styles.dateAndTemp}>{diaryDate()}
        {<div className={styles.temperature}>{data?.temperature}°C</div>}
        </div>
        <img
          className = {styles.dayWeatherIcon}
          src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${data?.icon}.png`}
          alt="weather icon"
        />
      </div>

    <TextEditor/>
      
      </div>
      </IonPage>
    </>
  );
};

export default DiaryEditor;