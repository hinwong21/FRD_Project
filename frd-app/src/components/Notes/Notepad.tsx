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
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./Notes.module.css";
import "./Notes.module.css";
import {AddNotePopup} from "./AddNotePopup"
// import { useParams } from "react-router";

export const Notepad: React.FC = () => {
  //   const { name } = useParams<{ name: string }>();
  //   console.log(name);
  let titleName = "";
  let fetchPage = <></>;

  return (
  <>
  {/* fetch db/local storage to show all the notes */}
  < AddNotePopup />
  </>
  );
};



export default Notepad;
