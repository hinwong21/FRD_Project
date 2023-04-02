import React, {useRef, useState} from "react";
import {
  IonButton,
  IonFab,
  IonFabButton,
  IonFabList,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
  useIonModal,
  IonModal,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,

} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBook, faPen, faCheck} from "@fortawesome/free-solid-svg-icons";
import  {DiaryEditor}  from "./DiaryEditor";
import {TodoListEditor} from "./TodoListEditor"
import MemoEditor, { TextEditor } from "./TextEditor";

import styles from "./Notes.module.css";
import "./Notes.module.css";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";



export const AddNotePopup: React.FC = () => {
  // const [diaryOpen, setDiaryOpen] = useState(false)
  // const [memoOpen, setMemoOpen] = useState(false)
  // const [todoOpen, setTodoOpen] = useState(false)


  const list = {
    options: [
      {
        icon: <FontAwesomeIcon icon={faBook} />,
        text: "Diary",
        id: "openDiary",
      },
      {
        icon: <FontAwesomeIcon icon={faPen} />,
        text: "Memo",
        id: "openMemo"
      },
      {
        icon: <FontAwesomeIcon icon={faCheck} />,
        text: "TodoList",
        id: "openTodo"
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
                  <IonButton id={list.options[index].id} expand="block">
                  <div>{list.options[index].icon}</div>
                  </IonButton>
                </IonFabButton>
              ))}
          </IonFabList>
        </IonFab>

          <NewDiary/>
          <NewMemo/>
          <NewTodo/>
      </>
    );
  };



  const NewDiary= ()=>{

    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
      if (ev.detail.role === 'confirm') {
        // setMessage(`Hello, ${ev.detail.data}!`);
      }
    }

    function confirm() {
      modal.current?.dismiss(input.current?.value, 'confirm');
    }

    return (
      <>
      <IonModal trigger="openDiary" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>New Diary</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <DiaryEditor/>
          </IonContent>
        </IonModal>
      
      </>
    )
  }

  const NewMemo= ()=>{

    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
      if (ev.detail.role === 'confirm') {
        // setMessage(`Hello, ${ev.detail.data}!`);
      }
    }

    function confirm() {
      modal.current?.dismiss(input.current?.value, 'confirm');
    }

    return (
      <>
      <IonModal trigger="openMemo" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>New Memo</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <MemoEditor/>
          </IonContent>
        </IonModal>
      
      </>
    )
  }

  const NewTodo= ()=>{

    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
      if (ev.detail.role === 'confirm') {
        // setMessage(`Hello, ${ev.detail.data}!`);
      }
    }

    function confirm() {
      modal.current?.dismiss(input.current?.value, 'confirm');
    }

    return (
      <>
      <IonModal trigger="openTodo" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>New Todo</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <TodoListEditor/>
          </IonContent>
        </IonModal>
      </>
    )
  }

  

export default AddNotePopup;