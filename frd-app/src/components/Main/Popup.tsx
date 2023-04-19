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
import { setName } from "../../service/LocalStorage/LocalStorage";

function Popup() {
  const modal = useRef<HTMLIonModalElement>(null);
  const [shaking, setShaking] = useState(true);
  const [isOpen] = useState(true);
  const fetch = useFetch();

  function dismiss() {
    modal.current?.dismiss();
  }

  // calc the lucky number
  const todayLuckyNumber: number = Math.random() * 101;
  let fortune: any;
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

  const handleFortune = async () => {
    await setName("fortune", fortune);
    await fetch("post", "/user/fortune", { fortune });
  };

  // insert to db and local
  useEffect(() => {
    handleFortune();
  }, []);

  useEffect(() => {
    if (shaking) {
      setTimeout(() => {
        setShaking(false);
      }, 3000);
    }
  }, [shaking]);

  return (
    <>
      {/* <div className={styles.popupContainer}> */}
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
      {/* </div> */}
    </>
  );
}

export default Popup;
