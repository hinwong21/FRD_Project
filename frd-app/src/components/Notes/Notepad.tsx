import React, { useEffect, useState, Component } from "react";
import {
  IonButtons,
  IonHeader,
  IonLabel,
  IonMenuButton,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Notes.module.css";
import { AddNotePopup } from "./AddNotePopup";
import { useParams } from "react-router";
import { Notes } from "./Notes";
import {Memos} from "./Memo/Memos"
import {Diaries} from "./Diary/Diaries"
import {TodoLists} from "./Todo/TodoLists"
import styles from "./Notes.module.css";

export const Notepad: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  let titleName = "";
  let fetchPage = <></>;

 const [selectedSegment, setSelectedSegment] = useState<string>("today")

 const handleSegmentChange = (event:CustomEvent)=>{
  setSelectedSegment(event.detail.value);
 }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Notepad</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonSegment value={selectedSegment} onIonChange={handleSegmentChange} >
        <IonSegmentButton value="today">
          <IonLabel>Today</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="todo">
          <IonLabel>Todo</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="memo">
          <IonLabel>Memo</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="diary">
          <IonLabel>Diary</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      <IonSearchbar></IonSearchbar>
      {selectedSegment==="memo" && <Memos />}
      {selectedSegment==="diary" && <Diaries />}
      {selectedSegment==="today" && <Notes />}
      {selectedSegment==="todo" && <TodoLists />}

      <AddNotePopup />
    </>
  );
};

export default Notepad;
