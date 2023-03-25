import React from "react";
import {
  IonButtons,
  IonButton,
  IonPopover,
  IonContent,
  IonList,
  IonItem,
  IonNavLink,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBook, faPen, faCheck} from "@fortawesome/free-solid-svg-icons";
import  DiaryEditor  from "./DiaryEditor";
import TodoListEditor from "./TodoListEditor"
import MemoEditor from "./MemoEditor";

import styles from "./Notes.module.css";
import "./Notes.module.css";

export const AddNotePopup: React.FC = () => {
  const list = {
    options: [
      {
        icon: <FontAwesomeIcon icon={faBook} />,
        text: "Diary",
        redirect: <DiaryEditor/>
      },
      {
        icon: <FontAwesomeIcon icon={faPen} />,
        text: "Memo",
        redirect: <MemoEditor/>
      },
      {
        icon: <FontAwesomeIcon icon={faCheck} />,
        text: "Todo List",
        redirect: <TodoListEditor/>
      },
    ],
  };
  

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
                  <IonNavLink routerDirection="forward" component={() => <DiaryEditor/>}>
                  <div>{list.options[index].icon}</div>
                  <div className={styles.listItemText}>{list.options[index].text}</div>
                  </IonNavLink>
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        </IonPopover>
      </>
    );
  };

export default AddNotePopup;