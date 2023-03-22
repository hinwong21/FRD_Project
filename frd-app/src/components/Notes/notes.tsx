import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import styles from "./Notes.module.css"
import { IonTitle } from "@ionic/react";


export const Notes: React.FC = () => {
  return (
    <> 
      <div className={styles.addNotes}><FontAwesomeIcon icon = {faPlus} /></div>
    </>
   
    );
};

export default Notes