import React, { useState } from "react";
import styles from "./LoginSetup.module.css";
import { getName } from "../../service/LocalStorage/LocalStorage";
import { Preferences } from "@capacitor/preferences";
import { useHistory } from "react-router";

export const LoginSetup = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const history = useHistory();

  const handleSubmit = async () => {
    if (gender === "") {
      alert("Gender is missed!");
    }
    if (age === "") {
      alert("Age is missed!");
    }
    if (height === "") {
      alert("Height is missed!");
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
          <select
            className={styles.loginSettingItemSelect}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Please choose your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="NA">Not convenient to answer</option>
          </select>
        </div>

        <div className={styles.loginSettingItem}>
          <input
            className={styles.loginSettingItemInput}
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          ></input>
        </div>

        <div className={styles.loginSettingItem}>
          <input
            className={styles.loginSettingItemInput}
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          ></input>
        </div>

        <div className={styles.loginSettingItem}>
          <input
            className={styles.loginSettingItemInput}
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
