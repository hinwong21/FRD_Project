import React, { useEffect, useState } from "react";
import style from "./Main.module.scss";

type Weather = {
  icon: number;
  temp: number;
};
export const MainHeader = () => {
  const [weather, setWeather] = useState<Weather>();

  const today = new Date().toLocaleDateString("en-Us", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else if (currentHour < 22) {
    greeting = "Good evening";
  } else {
    greeting = "Good night";
  }

  const todayLuckyNumber: number = Math.random() * 101;
  let fortune;
  if (todayLuckyNumber > 97.5) {
    fortune = "大吉";
  } else if (todayLuckyNumber > 87.5 && todayLuckyNumber <= 97.5) {
    fortune = "中吉";
  } else if (todayLuckyNumber > 67.5 && todayLuckyNumber <= 87.5) {
    fortune = "小吉";
  } else if (todayLuckyNumber > 32.5 && todayLuckyNumber <= 67.5) {
    fortune = "吉";
  } else if (todayLuckyNumber > 12.5 && todayLuckyNumber <= 32.5) {
    fortune = "末吉";
  } else if (todayLuckyNumber > 2.5 && todayLuckyNumber <= 12.5) {
    fortune = "凶";
  } else {
    fortune = "大凶";
  }

  useEffect(() => {
    const todayWeather = async () => {
      let res = await fetch(
        "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en"
      );
      let json = await res.json();
      let todayIcon = json.icon;
      let todayTemp = json.temperature.data[0].value;
      setWeather({
        icon: todayIcon,
        temp: todayTemp,
      });
    };
    todayWeather();
  }, []);

  return (
    <header className={style.mainHeaderContainer}>
      <div className={style.mainDate}>{today}</div>
      <div className={style.mainHeader}>
        <div className={style.leftMainHeader}>
          <div className={style.mainGreeting}>{greeting}, user</div>
          <div className={style.mainFortune}>
            Today fortune: <span className={style.fortuneColor}>{fortune}</span>
          </div>
        </div>
        <div className={style.rightMainHeader}>
          <img
            className={style.dayWeatherIcon}
            src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${weather?.icon}.png`}
            alt="weather icon"
          />
          <div>{weather?.temp}°C</div>
        </div>
      </div>
    </header>
  );
};
