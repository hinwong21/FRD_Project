import React, { useEffect, useState, Component } from "react";
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonSearchbar, IonTitle, IonToolbar,
} from "@ionic/react";
import "./Notes.module.css";
import { AddNotePopup } from "./AddNotePopup";
import { useParams } from "react-router";
import styles from "./Notes.module.css";

export const Notepad:React.FC = () => {
    const { name } = useParams<{ name: string }>();
  let titleName = "";
  let fetchPage = <></>;

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
      <IonSearchbar></IonSearchbar>
      <AddNotePopup />
      </>
  )
  }

export default Notepad;
