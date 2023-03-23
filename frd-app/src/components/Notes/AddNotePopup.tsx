import React, { useEffect, useState, Component } from "react";
import {
  IonButtons,
  IonButton,
  IonPopover,
  IonContent,
  IonList,
  IonItem,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBook, faPen, faCheck} from "@fortawesome/free-solid-svg-icons";
import styles from "./Notes.module.css";
import "./Notes.module.css";

export const AddNotePopup: React.FC = () => {
    const optionList = {
      options: [
        {
          icon: <FontAwesomeIcon icon={faBook} />,
          text: "Diary",
        },
        {
          icon: <FontAwesomeIcon icon={faPen} />,
          text: "Memo",
        },
        {
          icon: <FontAwesomeIcon icon={faCheck} />,
          text: "Todo List",
        },
      ],
    };
  
    const [list, setList] = useState(optionList);
  
    return (
      <>
        <IonButton
          id="popover-button"
          className={styles.addNotes}
        >
          <FontAwesomeIcon icon={faPlus} />
        </IonButton>

        <IonPopover trigger="popover-button" dismissOnSelect={true}>
          <IonContent>
            <IonList>
              {list.options.map((item, index) => (
                <IonItem button={true} detail={false} key={index}>
                  <div>{list.options[index].icon}</div>
                  <div className={styles.listItemText}>{list.options[index].text}</div>
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        </IonPopover>
      </>
    );
  };

export default AddNotePopup;