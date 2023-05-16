import React from "react";
import styles from "./Setting.module.css";
import { useHistory } from "react-router-dom";
import { UserSetting, useUserSetting } from "../../hooks/useUserSetting";

export const PersonalSetting = () => {
  const [user] = useUserSetting();

  const history = useHistory();

  if (!user) {
    return <div>Loading user data...</div>;
  }

  const renderEditField = (field: keyof UserSetting, unit?: string) => {
    const goEdit = () => {
      history.push({
        pathname: "/Edit/" + field,
      });
    };

    return (
      <div className={styles.settingContainer} onClick={goEdit}>
        <div className={styles.settingItemContainer}>
          <div className={styles.settingItem}>{field}</div>
          <div className={styles.settingItemResult}>
            {user[field]} {unit}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={styles.settingHeaderContainer}>
        <div>Personal Setting</div>
      </div>

      {renderEditField("username")}
      {renderEditField("height", "cm")}
      {renderEditField("weight", "kg")}
      {renderEditField("gender")}
      {renderEditField("age")}
    </>
  );
};
