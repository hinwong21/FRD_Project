import React, { useEffect, useRef, useState } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonContent,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
// import styles from "./main.module.css";
import "./main.css";
import { ShakeAnimation } from "./ShakeAnimation";
import "animate.css";
import { useFetch } from "../../hooks/useFetch";
import { getName, setName } from "../../service/LocalStorage/LocalStorage";

function Popup() {
  const modal = useRef<HTMLIonModalElement>(null);
  const [shaking, setShaking] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [fortune, setFortune] = useState("");
  const fetch = useFetch();

  function dismiss() {
    modal.current?.dismiss();
  }

  const handleFortune = async () => {
    // calc the lucky number
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
  };

  // upload DB and local storage
  async function updateStorage() {
    let today = new Date().getDate();
    await setName("dailyShake", today.toString());
    await setName("fortune", fortune);
    await fetch("post", "/user/fortune", { fortune });
  }

  const handleDailyShake = async () => {
    const dailyData = await getName("dailyShake");

    if (dailyData !== null) {
      let todayNum = new Date().getDate();
      let today = todayNum.toString();
      if (today === dailyData) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    }
  };

  // insert to db and local
  useEffect(() => {
    handleFortune();
    handleDailyShake();
  }, []);

  useEffect(() => {
    updateStorage();
  }, [fortune]);

  useEffect(() => {
    if (shaking) {
      setTimeout(() => {
        setShaking(false);
      }, 3000);
    }
  }, [shaking]);

  return (
    <>
      <IonModal
        id="example-modal2"
        ref={modal}
        trigger="open-modal"
        isOpen={isOpen}
      >
        <IonContent>
          <IonToolbar>
            <IonTitle>Today Fortune</IonTitle>
            <IonButtons slot="end">
              <IonButton color="light" onClick={() => dismiss()}>
                Close
              </IonButton>
            </IonButtons>
          </IonToolbar>
          {shaking ? (
            <ShakeAnimation />
          ) : (
            <div className="shakeFortuneContainer animate__animated animate__zoomInDown">
              <div className="shakeFortuneOutline">
                <div className="shakeFortuneBorder">
                  <div className="shakeFortune">{fortune}</div>
                </div>
              </div>
            </div>
          )}
        </IonContent>
      </IonModal>
    </>
  );
}

export default Popup;
