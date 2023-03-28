import {
    IonButton,
    IonPopover,
    IonContent,
    IonPage,
  } from "@ionic/react";
  import React, {memo, useState} from 'react'
//   import { useParams } from "react-router";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from "@fortawesome/free-solid-svg-icons";
  import styles from "./Calendar.module.css"
  // import "./GoogleCalendarClient"
  

  export const AddEvent= () => {
    const [showPopover, setShowPopover] = useState(false);
    return (
        <>
          <IonButton
          id="popover-button"
          className={styles.addNotes}
        >
          <FontAwesomeIcon icon={faPlus} />
        </IonButton>

    <IonPopover trigger="popover-button" isOpen={showPopover} onDidDismiss={() => setShowPopover(false)}>
          <IonContent>
            <form className={styles.newEventAdd}>
              <label>Title</label>
              <input type="text" id="title"></input>
              <label>Start</label>
              <input type="datetime-local" id="startTime"></input>
              <label>End</label>
              <input type="datetime-local" id="endTime"></input>
              <label>Description</label>
              <input type="text" id="description"></input>
              <label>Background Color</label>
              <input type="color" id="backgroundColor"></input>
              <button onClick={() => setShowPopover(false)}>Submit</button>
            </form>
          </IonContent>
    </IonPopover>
    </>
    );
  };
  
  export default AddEvent;