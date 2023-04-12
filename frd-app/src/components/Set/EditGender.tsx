import React, { useEffect, useState } from "react";
import styles from "./Edit.module.css";
import { IonPage, IonContent, IonIcon } from "@ionic/react";
import { chevronBackOutline, ellipse } from "ionicons/icons";
import { useHistory, useLocation } from "react-router";
import { getName } from "../../service/LocalStorage/LocalStorage";

export const EditGender = () => {
  const location = useLocation();
  const history = useHistory();

  const state: any = location.state;
  const value = state.value.toString();

  const [selectGender, setSelectGender] = useState(value);
  const [textStyle, setTextStyle] = useState({ color: "#74777a" });
  const goBack = () => {
    history.goBack();
  };

  const editFinish = async () => {
    if (value === selectGender) {
      return;
    }
    let token = await getName("token");
    fetch(`${process.env.REACT_APP_EXPRESS_SERVER_URL}/user/gender`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectGender,
      }),
    });

    history.goBack();
  };

  const handleClick = (gender: React.SetStateAction<string>) => {
    setSelectGender(gender);
  };

  useEffect(() => {
    if (selectGender !== value) {
      setTextStyle({
        color: "blue",
      });
    } else {
      setTextStyle({
        color: "#74777a",
      });
    }
  }, [selectGender, value]);

  return (
    <IonPage>
      <IonContent>
        <header className={styles.editHeaderContainer}>
          <div className={styles.editHeader}>
            <IonIcon
              icon={chevronBackOutline}
              className={styles.headerBack}
              onClick={goBack}
            />
            <div>Gender</div>
            <div style={textStyle} onClick={editFinish}>
              finish
            </div>
          </div>
        </header>

        <div className={styles.editGenderContainer}>
          <div>Male</div>
          <div
            className={`${styles.editGenderBtnContainer} ${
              selectGender === "male" ? styles.editGenderClickedContainer : ""
            }`}
            onClick={() => handleClick("male")}
          >
            <IonIcon
              icon={ellipse}
              className={`${styles.editGenderBtn} ${
                selectGender === "male" ? styles.editGenderClicked : ""
              }`}
            />
          </div>
        </div>

        <div className={styles.editGenderContainer}>
          <div>Female</div>
          <div
            className={`${styles.editGenderBtnContainer} ${
              selectGender === "female" ? styles.editGenderClickedContainer : ""
            }`}
            onClick={() => handleClick("female")}
          >
            <IonIcon
              icon={ellipse}
              className={`${styles.editGenderBtn} ${
                selectGender === "female" ? styles.editGenderClicked : ""
              }`}
            />
          </div>
        </div>

        <div className={styles.editGenderContainer}>
          <div>Not Convenient to answer</div>
          <div
            className={`${styles.editGenderBtnContainer} ${
              selectGender === "NA" ? styles.editGenderClickedContainer : ""
            }`}
            onClick={() => handleClick("NA")}
          >
            <IonIcon
              icon={ellipse}
              className={`${styles.editGenderBtn} ${
                selectGender === "NA" ? styles.editGenderClicked : ""
              }`}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
