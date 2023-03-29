import React from "react";
import {
  IonButtons,
  IonButton,
  IonPopover,
  IonContent,
  IonList,
  IonItem,
  IonNavLink,
  IonFab,
  IonFabButton,
  IonFabList
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


        <IonFab slot="fixed" vertical="bottom" horizontal="end" className={styles.fabButton}>
          <IonFabButton>
            <FontAwesomeIcon icon={faPlus} />
          </IonFabButton>
          <IonFabList side="top">
          {list.options.map((item, index) => (
                <IonFabButton key={index}>
                  <IonNavLink routerDirection="forward" component={() => <DiaryEditor/>}>
                  <div>{list.options[index].icon}</div>
                  </IonNavLink>
                </IonFabButton>
              ))}
          </IonFabList>
        </IonFab>
      </>
    );
  };

export default AddNotePopup;