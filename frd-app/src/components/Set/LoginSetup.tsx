import React from "react";
import styles from "./LoginSetup.module.css";

export const LoginSetup = () => {
  return (
    <>
      <header className={styles.loginSettingHeader}>
        Personal Information Setup
      </header>

      <div className={styles.loginSettingItemContainer}></div>
      <div>Gender</div>
      <div className={styles.loginSettingItem}>
        <select className={styles.loginSettingItemSelect}>
          <option value="">Please choose your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="NA">Not convenient to answer</option>
        </select>
      </div>

      <div className={styles.loginSettingItemContainer}></div>
      <div>Age</div>
      <div className={styles.loginSettingItem}>
        <input className={styles.loginSettingItemInput} type="number"></input>
      </div>

      <div className={styles.loginSettingItemContainer}></div>
      <div>Height</div>
      <div className={styles.loginSettingItem}>
        <input className={styles.loginSettingItemInput} type="number"></input>
        <div>cm</div>
      </div>

      <div className={styles.loginSettingItemContainer}></div>
      <div>Weight</div>
      <div className={styles.loginSettingItem}>
        <input className={styles.loginSettingItemInput} type="number"></input>
        <div>kg</div>
      </div>
    </>
  );
};
