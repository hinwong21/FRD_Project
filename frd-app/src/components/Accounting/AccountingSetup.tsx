import React, { useState } from "react";
import styles from "./Accounting.module.scss";
import { useHistory } from "react-router";
import { Preferences } from "@capacitor/preferences";
import { useFetch } from "../../hooks/useFetch";

export const AccountingSetup = () => {
  const [budget, setBudget] = useState("");
  const fetch = useFetch();
  const history = useHistory();
  const handleSubmit = async () => {
    if (budget === "") {
      alert("Budget is missed!");
    }

    // insert to db
    await fetch("post", "/account/budget", { budget });

    const setBudgetToLocal = async () => {
      await Preferences.set({
        key: "budget",
        value: budget,
      });
    };
    setBudgetToLocal();

    // fetch page to Accounting
    history.push("/page/Accounting");
  };
  return (
    <>
      <div className={styles.AccountingSettingContainer}>
        <header className={styles.AccountingSettingHeader}>
          Accounting Information Setup
        </header>
        <p className={styles.AccountingSettingNotice}>
          You can always change your information later.
        </p>

        <div className={styles.AccountingSettingItem}>
          <input
            className={styles.AccountingSettingItemInput}
            placeholder="Budget"
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          ></input>
        </div>

        <div className={styles.AccountingSettingFinish} onClick={handleSubmit}>
          finish
        </div>
      </div>
    </>
  );
};
