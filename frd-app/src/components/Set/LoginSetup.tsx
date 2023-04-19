import React, { useState } from "react";
import styles from "./LoginSetup.module.css";
import { getName, setName } from "../../service/LocalStorage/LocalStorage";
import { Preferences } from "@capacitor/preferences";
import { useIonRouter } from "@ionic/react";

import { useHistory } from "react-router";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { api_origin } from "../../service/api";
import { useAge } from "../../hooks/useAge";

export const LoginSetup = () => {
  const routerIon = useIonRouter();

  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [ageGolbal, setAgeGolbal] = useAge();

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
    let token = await getName("token");

    console.log("token", token);

    fetch(`${api_origin}/user/data`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        height,
        gender,
        age,
        weight,
      }),
    });

    // save data to local storage
    await setName("height", height);
    await setName("weight", weight);
    await setName("age", age);
    await setName("gender", gender);

    // await Preferences.set({
    //   key: "userData",
    //   value: JSON.stringify({
    //     height,
    //     gender,
    //     age,
    //     weight,
    //   }),
    // });

    // history.push("/page/Calender");

    setAgeGolbal(+age);
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
