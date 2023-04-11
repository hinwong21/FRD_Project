import React, { useEffect, useState } from "react";
import styles from "./Setting.module.css";
import { useHistory } from "react-router-dom";

type Data = {
  height: number;
  weight: number;
  age: number;
  gender: string;
};

export const PersonalSetting = () => {
  const [data, setData] = useState<Data[]>([]);

  // import data from db or local storage
  useEffect(() => {
    setData([
      {
        height: 170,
        weight: 60,
        age: 23,
        gender: "male",
      },
    ]);
  }, []);

  const history = useHistory();

  const goEditUsername = () => {
    history.push({
      pathname: "/Edit",
      state: { item: "username", value: "username" },
    });
  };

  const goEditHeight = () => {
    history.push({
      pathname: "/Edit",
      state: { item: "height", value: data[0]?.height },
    });
  };

  const goEditWeight = () => {
    history.push({
      pathname: "/Edit",
      state: { item: "weight", value: data[0]?.weight },
    });
  };

  const goEditAge = () => {
    history.push({
      pathname: "/Edit",
      state: { item: "age", value: data[0]?.age },
    });
  };

  return (
    <>
      <div className={styles.settingHeaderContainer}>
        <div>Personal Setting</div>
      </div>

      <div className={styles.settingContainer} onClick={goEditUsername}>
        <div className={styles.settingItemContainer}>
          <div className={styles.settingItem}>username</div>
          <div className={styles.settingItemResult}>username</div>
        </div>
      </div>

      <div className={styles.settingContainer} onClick={goEditHeight}>
        <div className={styles.settingItemContainer}>
          <div className={styles.settingItem}>height</div>
          <div className={styles.settingItemResult}>{data[0]?.height} cm</div>
        </div>
      </div>

      <div className={styles.settingContainer} onClick={goEditWeight}>
        <div className={styles.settingItemContainer}>
          <div className={styles.settingItem}>weight</div>
          <div className={styles.settingItemResult}>{data[0]?.weight} kg</div>
        </div>
      </div>

      <div className={styles.settingContainer}>
        <div className={styles.settingItemContainer}>
          <div className={styles.settingItem}>gender</div>
          <div>{data[0]?.gender}</div>
        </div>
      </div>

      <div className={styles.settingContainer} onClick={goEditAge}>
        <div className={styles.settingItemContainer}>
          <div className={styles.settingItem}>age</div>
          <div>{data[0]?.age}</div>
        </div>
      </div>
    </>
  );
};
