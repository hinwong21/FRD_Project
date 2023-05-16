import { useEffect, useState } from "react";
import styles from "./Edit.module.css";
import { IonPage, IonContent, IonIcon } from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { chevronBackOutline, closeOutline } from "ionicons/icons";
import { useFetch } from "../../hooks/useFetch";
import { UserSetting, useUserSetting } from "../../hooks/useUserSetting";

export const Edit = () => {
  const { field } = useParams<{ field: keyof UserSetting }>();

  const [userSetting, setUserSetting] = useUserSetting();

  const value = userSetting?.[field];

  const [input, setInput] = useState(value);
  const [textStyle, setTextStyle] = useState({ color: "#74777a" });
  const fetch = useFetch();

  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const clearInput = () => {
    setInput("");
  };

  const editFinish = async () => {
    if (input === value) {
      return;
    } else {
      await fetch("POST", "/user/" + field, { input });
      setUserSetting({ ...userSetting!, [field]: input });

      history.goBack();
    }
  };

  useEffect(() => {
    if (input !== value) {
      setTextStyle({
        color: "blue",
      });
    } else {
      setTextStyle({
        color: "#74777a",
      });
    }
  }, [input, value]);

  return (
    <>
      <IonPage>
        <IonContent>
          <header className={styles.editHeaderContainer}>
            <div className={styles.editHeader}>
              <IonIcon
                icon={chevronBackOutline}
                className={styles.headerBack}
                onClick={goBack}
              />
              <div>{field}</div>
              <div style={textStyle} onClick={editFinish}>
                finish
              </div>
            </div>
          </header>

          <div className={styles.editContainer}>
            <div>{field}</div>

            <div className={styles.editItemContainer}>
              <input
                className={styles.editInput}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              ></input>
              <IonIcon
                icon={closeOutline}
                className={styles.clearBtn}
                onClick={clearInput}
              />
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};
