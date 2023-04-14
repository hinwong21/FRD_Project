import React, { useState } from "react";
import styles from "./LoginSetup.module.css";
import { getName } from "../../service/LocalStorage/LocalStorage";
import { Preferences } from "@capacitor/preferences";
import { useHistory } from "react-router";
import { IonSelect, IonSelectOption } from "@ionic/react";

export const LoginSetup = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const history = useHistory();

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

    // insert to db
    let token = await getName("token");
    fetch(`${process.env.REACT_APP_EXPRESS_SERVER_URL}/user/data`, {
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
    await Preferences.set({
      key: "userData",
      value: JSON.stringify({
        height,
        gender,
        age,
        weight,
      }),
    });

    // fetch page to calendar
    history.push("/");
  };

  return (
    <>
      <div className={styles.loginSettingContainer}>
        <header className={styles.loginSettingHeader}>
          Personal Information Setup
        </header>

        <p className={styles.loginSettingNotice}>
          Fill out your information for your new account. You can always change
          your information later.
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
    </>
  );
};
