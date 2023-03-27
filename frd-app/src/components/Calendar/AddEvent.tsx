import {
    IonButton,
    IonPopover,
    IonContent,
    IonPage,
  } from "@ionic/react";
//   import { useParams } from "react-router";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from "@fortawesome/free-solid-svg-icons";
  import styles from "./Calendar.module.css"
  // import "./GoogleCalendarClient"
  

  export const AddEvent= () => {

    return (
        <>
          <IonButton
          id="popover-button"
          className={styles.addNotes}
        >
          <FontAwesomeIcon icon={faPlus} />
        </IonButton>

    <IonPopover trigger="popover-button" dismissOnSelect={true}>
          <IonContent>
            <form>
              <label>testing 1</label>
              <input></input>
              <label>tesing 2</label>
              <input></input>
              <label>tesing 3</label>
              <input></input>
              <button>Submit</button>
            </form>
          </IonContent>
    </IonPopover>
    </>
    );
  };
  
  export default AddEvent;