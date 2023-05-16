import { useState } from "react";
import styles from "./LoginSetup.module.css";
import { useIonRouter } from "@ionic/react";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useUserSetting } from "../../hooks/useUserSetting";
import { useFetch } from "../../hooks/useFetch";

export const LoginSetup = () => {
  const routerIon = useIonRouter();

  const fetch = useFetch();

  const [userSetting, setUserSetting] = useUserSetting();

  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = async () => {
    if (gender === "") {
      alert("Gender is missed!");
      return;
    }
    if (age === "") {
      alert("Age is missed!");
      return;
    }
    if (height === "") {
      alert("Height is missed!");
      return;
    }
    if (weight === "") {
      alert("Weight is missed!");
      return;
    }

    console.log(gender, age, height, weight);

    // insert to db

    await fetch("POST", "/user/setting", {
      username: userSetting?.username || "",
      height,
      gender,
      age,
      weight,
    });

    // save data to local storage
    setUserSetting({
      username: userSetting?.username || "",
      height: +height,
      weight: +weight,
      age: +age,
      gender,
    });

    routerIon.push("/page/Calender");

    // fetch page to calendar
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Account Setup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className={styles.loginSettingContainer}>
          <header className={styles.loginSettingHeader}>
            Personal Information Setup
          </header>

          <p className={styles.loginSettingNotice}>
            Fill out your information for your new account. You can always
            change your information later.
          </p>

          <div className={styles.loginSettingItem}>
            <IonSelect
              className={styles.loginSettingItemSelect}
              value={gender}
              onIonChange={(e) =>
                setGender((e.target as HTMLIonSelectElement).value)
              }
            >
              <IonSelectOption value="">
                Please choose your gender
              </IonSelectOption>
              <IonSelectOption value="male">Male</IonSelectOption>
              <IonSelectOption value="female">Female</IonSelectOption>
              <IonSelectOption value="NA">
                Not convenient to answer
              </IonSelectOption>
            </IonSelect>
          </div>

          <div className={styles.loginSettingItem}>
            <input
              className={styles.loginSettingItemInput}
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            ></input>
          </div>

          <div className={styles.loginSettingItem}>
            <input
              className={styles.loginSettingItemInput}
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            ></input>
          </div>

          <div className={styles.loginSettingItem}>
            <input
              className={styles.loginSettingItemInput}
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            ></input>
          </div>

          <div className={styles.loginSettingFinish} onClick={handleSubmit}>
            finish
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
