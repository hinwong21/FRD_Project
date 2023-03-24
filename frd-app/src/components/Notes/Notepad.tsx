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
import {
  faPlus,
  faBook,
  faPen,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Notes.module.css";
import "./Notes.module.css";
// import { AddNotePopup } from "./AddNotePopup";
import { DiaryEditor } from "./DiaryEditor";
import {TodoListEditor} from "./TodoListEditor"
import MemoEditor from "./MemoEditor";
// import { useParams } from "react-router";

export const Notepad:React.FC = () => {
  //   const { name } = useParams<{ name: string }>();
  //   console.log(name);
  let titleName = "";
  let fetchPage = <></>;

  const list = {
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
  
  const [readMode, setReadMode] = useState({"status":true, "module":""})

  function writeNote (textType:string){
    setReadMode({"status":false, "module":textType})
  }

  const addNoteBtn = (
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
                <IonItem button={true} detail={false} key={index} onClick={event => writeNote(list.options[index].text)}>
                  <div>{list.options[index].icon}</div>
                  <div className={styles.listItemText}>{list.options[index].text}</div>
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        </IonPopover>
      </>
  )


    
    if (readMode.status == true) {
        return (addNoteBtn)
  } else {
    if(readMode.module == "Diary"){
        return (
        <>
        <DiaryEditor/>
        </>
        )
    }else if (readMode.module == "Memo"){
        return (
        <>
        <MemoEditor/>
        </>
        )
    }else if (readMode.module == "Todo List"){
        return (
        <>
        <TodoListEditor/>
        </>
        )
    }else{
      return(
        <></>
      )
    }
  }
}
export default Notepad;
