import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import "./Weather.css";

type Data = {
  temperature: number;
  humidity: number;
  uvindexValue: number;
  uvindexdesc: string;
};

type Forecastemp = {
  value: number;
};

type NineDayWeather = {
  week: string;
  forecastMaxtemp: Forecastemp;
  forecastMintemp: Forecastemp;
  ForecastIcon: string;
};

type Data2 = {
  nineDayWeather: NineDayWeather[];
};

export function Weather() {
  const [data, setData] = useState<Data>();
  const [data2, setData2] = useState<Data2>();

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
      });
    };
    todayWeather();
  }, []);

  useEffect(() => {
    const nineDayWeather = async () => {
      let res = await fetch(
        "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en"
      );

      let json = await res.json();

      setData2({
        nineDayWeather: json.weatherForecast,
      });
    };
    nineDayWeather();
  }, []);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Weather</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <div className="page-container">
            <div className="weather-location">Hong Kong</div>
            {<div className="todayWeather-temp">{data?.temperature}°C</div>}
            {
              <div className="todayWeather-humidity">
                Humidity: {data?.humidity}%
              </div>
            }

            <div className="todayWeather-uvindex-container">
              {
                <div className="todayWeather-uvindex-value">
                  Ultraviolet index: {data?.uvindexValue}
                </div>
              }
              {<div>{data?.uvindexdesc}</div>}
            </div>

            <div className="nineDayWeather-container">
              <div className="dayWeather-header-container">
                <div className="dayWeather-header">9-day Weather Forecast</div>
              </div>
              {data2?.nineDayWeather.map((forecastDate, index) => (
                <div className="dayWeather" key={index}>
                  <div className="dayWeather-week">
                    {data2?.nineDayWeather[index].week}
                  </div>
                  <div className="dayWeather-icon-container">
                    <img
                      className="dayWeather-icon"
                      src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${data2?.nineDayWeather[index].ForecastIcon}.png`}
                      alt="weather icon"
                    />
                  </div>
                  <div className="dayWeather-temp">
                    {data2?.nineDayWeather[index].forecastMintemp.value} -{" "}
                    {data2?.nineDayWeather[index].forecastMaxtemp.value}°C
                  </div>
                </div>
              ))}
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}
