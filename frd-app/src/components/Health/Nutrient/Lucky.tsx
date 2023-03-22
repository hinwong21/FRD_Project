import React, { useEffect, useState } from "react";

export function Lucky() {
  const [fortune, setFortune] = useState("");

  useEffect(() => {
    const todayLuckyNumber: number = Math.random() * 101;

    if (todayLuckyNumber > 97.5) {
      setFortune("大吉");
    } else if (todayLuckyNumber > 87.5 && todayLuckyNumber <= 97.5) {
      setFortune("中吉");
    } else if (todayLuckyNumber > 67.5 && todayLuckyNumber <= 87.5) {
      setFortune("小吉");
    } else if (todayLuckyNumber > 32.5 && todayLuckyNumber <= 67.5) {
      setFortune("吉");
    } else if (todayLuckyNumber > 12.5 && todayLuckyNumber <= 32.5) {
      setFortune("末吉");
    } else if (todayLuckyNumber > 2.5 && todayLuckyNumber <= 12.5) {
      setFortune("凶");
    } else {
      setFortune("大凶");
    }
  }, []);

  return (
    <div>
      <p>
        Today fortune: <span style={{ color: "red" }}>{fortune}</span>
      </p>
    </div>
  );
}
