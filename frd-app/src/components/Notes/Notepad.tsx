import React, { useEffect, useState, Component } from "react";
import {
  IonSearchbar,
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
      <IonSearchbar></IonSearchbar>
      <AddNotePopup />
      </>
  )
  }

export default Notepad;
