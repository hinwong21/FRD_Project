import React from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import styles from "./Notes.module.css"
import { useParams } from "react-router";


export const Notes: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  // console.log(name);
  let titleName = "";
  let fetchPage = <></>;
  return (
    <IonPage>
        <IonContent fullscreen>
      <div className={styles.addNotes}><FontAwesomeIcon icon = {faPlus} /></div>
      {fetchPage}
        </IonContent>
    </IonPage>
    );
};

export default Notes