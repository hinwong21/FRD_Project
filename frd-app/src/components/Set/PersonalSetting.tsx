import React from "react";
import styles from "./Setting.module.css";
import { useHistory } from "react-router-dom";
import { useGet } from "../../hooks/useGet";

type User = {
  username: string;
  height: number;
  weight: number;
  age: number;
  gender: string;
};

export const PersonalSetting = () => {
  const [user] = useGet<User | null>("/user/user", null);

  const history = useHistory();

  if (!user) {
    return <div>Loading user data...</div>;
  }

  const goEditUsername = () => {
    history.push({
      pathname: "/Edit",
      state: { item: "username", value: user.username },
    });
  };

  const goEditHeight = () => {
    history.push({
      pathname: "/Edit",
      state: { item: "height", value: user.height },
    });
  };

  const goEditWeight = () => {
    history.push({
      pathname: "/Edit",
      state: { item: "weight", value: user.weight },
    });
  };

  const goEditGender = () => {
    history.push({
      pathname: "/EditGender",
      state: { item: "gender", value: user.gender },
    });
  };

  const goEditAge = () => {
    history.push({
      pathname: "/Edit",
      state: { item: "age", value: user.age },
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
          <div className={styles.settingItemResult}>{user.username}</div>
        </div>
      </div>

      <div className={styles.settingContainer} onClick={goEditHeight}>
        <div className={styles.settingItemContainer}>
          <div className={styles.settingItem}>height</div>
          <div className={styles.settingItemResult}>{user.height} cm</div>
        </div>
      </div>

      <div className={styles.settingContainer} onClick={goEditWeight}>
        <div className={styles.settingItemContainer}>
          <div className={styles.settingItem}>weight</div>
          <div className={styles.settingItemResult}>{user.weight} kg</div>
        </div>
      </div>

      <div className={styles.settingContainer} onClick={goEditGender}>
        <div className={styles.settingItemContainer}>
          <div className={styles.settingItem}>gender</div>
          <div>{user.gender}</div>
        </div>
      </div>

      <div className={styles.settingContainer} onClick={goEditAge}>
        <div className={styles.settingItemContainer}>
          <div className={styles.settingItem}>age</div>
          <div>{user.age}</div>
        </div>
      </div>
    </>
  );
};
