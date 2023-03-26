import React, { useEffect, useState, Component } from "react";
import {
  IonButton,
  IonPopover,
  IonContent,
  IonList,
  IonItem,
  IonSearchbar,
  IonNavLink,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBook,
  faPen,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import "./Notes.module.css";
import { AddNotePopup } from "./AddNotePopup";
import { useParams } from "react-router";
import styles from "./Notes.module.css";

export const Notepad:React.FC = () => {
    const { name } = useParams<{ name: string }>();
    console.log(name);
  let titleName = "";
  let fetchPage = <></>;

  return (
    <>
      <IonSearchbar></IonSearchbar>
      <AddNotePopup />
      </>
  )
  }

export default Notepad;
