import React, { useEffect, useState } from "react";
import styles from "./Setting.module.css";
import { useHistory } from "react-router-dom";
import { getName } from "../../service/LocalStorage/LocalStorage";

type Data = {
  username: string;
  height: number;
  weight: number;
  age: number;
  gender: string;
};

export const PersonalSetting = () => {
  const [data, setData] = useState<Data[]>([]);

  // import data from db or local storage
  useEffect(() => {
    const getUser = async () => {
      let token = await getName("token");
      const res = await fetch(
        `${process.env.REACT_APP_EXPRESS_SERVER_URL}/user/user`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      console.log(json);

      setData([
        {
          username: json.result[0].username,
          height: json.result[0].height,
          weight: json.result[0].weight,
          age: json.result[0].age,
          gender: json.result[0].gender,
        },
      ]);
    };
    getUser();
  }, []);

  const history = useHistory();

  const goEditUsername = () => {
    history.push({
      pathname: "/Edit",
      state: { item: "username", value: data[0]?.username },
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

  const goEditGender = () => {
    history.push({
      pathname: "/EditGender",
      state: { item: "gender", value: data[0]?.gender },
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
          <div className={styles.settingItemResult}>{data[0]?.username}</div>
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

      <div className={styles.settingContainer} onClick={goEditGender}>
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
