import {
  IonButton,
  IonContent,
  IonModal,
  IonLabel,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonItem,
  IonInput,
  useIonModal,
  IonDatetimeButton,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonList,
  IonAlert,
} from "@ionic/react";
import { useState, useRef, FormEvent, FC } from "react";
//   import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import styles from "./Calendar.module.css";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";

const NewEventForm = ({onDismiss}: {onDismiss: (data?: string | null | undefined | number, role?: string) => void;}) => {
  // const inputRef = useRef<HTMLIonInputElement>(null);

  const [showAlertNewEvent, setShowAlertNewEvent] = useState(false);
  const [alertMsgNewEvent, setAlertMsgNewEvent] = useState("");

  //add new event form data
  const [title, setTitle] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Hong Kong");
  const [color, setColor] = useState("blue");

  const handleAlertDismissNewEvent = () => {
    setShowAlertNewEvent(false);
  };

  async function handleSubmit () {
    // event.preventDefault();

    onDismiss("", "confirm")

    let id = uuidv4()

    const res= await fetch("http://localhost:8080/calendar/new-local-event",{
      method: "POST",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({
        id: id.slice(1,-1),
        title:title.slice(1,-1),
        description:description.slice(1,-1),
        start: startDateTime.slice(1,11)+ ' '+startDateTime.slice(12,17),
        end: endDateTime.slice(1,11)+' '+endDateTime.slice(12,17),
        backgroundColor:color
      })
    })
  }

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                color="medium"
                onClick={() => onDismiss(null, "cancel")}
              >
                Cancel
              </IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton
                // onClick={() => handleSubmit() }
                onClick={handleSubmit}
              >
                Add Event
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">

          <form>
            <IonItem>
              <IonLabel position="stacked">Title</IonLabel>
              <IonInput type="text" onIonChange={(e)=>setTitle(JSON.stringify(e.target.value))} placeholder="Event name" />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Event Start</IonLabel>
              <IonDatetimeButton
                datetime="datetime1"
              ></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime id="datetime1"
                onIonChange={(e)=>setStartDateTime(JSON.stringify(e.target.value))}></IonDatetime>
              </IonModal>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Event End</IonLabel>
              <IonDatetimeButton
                datetime="datetime2"
              ></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime id="datetime2"
                onIonChange={(e)=>setEndDateTime(JSON.stringify(e.target.value))}></IonDatetime>
              </IonModal>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Description</IonLabel>
              <IonInput placeholder="About the event" onIonChange={(e)=>setDescription(JSON.stringify(e.target.value))}/>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Location</IonLabel>
              <IonInput
                 value={location}
                placeholder="Where's the event location? Google map api?"
                onIonChange={(e)=>setLocation(JSON.stringify(e.target.value))}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Color</IonLabel>
              <IonSelect
                aria-label="Color"
                value={color}
                placeholder="Select color"
                onIonChange={(ev) => setColor(ev.detail.value)}
              >
                <IonSelectOption value="orange">Orange</IonSelectOption>
                <IonSelectOption value="yellow">Yellow</IonSelectOption>
                <IonSelectOption value="green">Green</IonSelectOption>
                <IonSelectOption value="blue">Blue</IonSelectOption>
                <IonSelectOption value="pink">Pink</IonSelectOption>
                <IonSelectOption value="black">Black</IonSelectOption>
                <IonSelectOption value="purple">Purple</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Link to</IonLabel>
              <IonInput 
                placeholder="Link to specific notes/todo list--auto complete input???"
              />
            </IonItem>
          </form>
        </IonContent>
      </IonPage>

      <IonAlert
        isOpen={showAlertNewEvent}
        onDidDismiss={handleAlertDismissNewEvent}
        message={alertMsgNewEvent}
        buttons={["OK"]}
      ></IonAlert>
    </>
  );
};

export const AddEvent = () => {
  const [present, dismiss] = useIonModal(NewEventForm, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
  });
  // const [message, setMessage] = useState('This modal example uses the modalController to present and dismiss modals.');

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          // setMessage(`Hello, ${ev.detail.data}!`);
        }
      },
    });
  }

  return (
    <IonButton className={styles.addButton} onClick={() => openModal()}>
      <FontAwesomeIcon icon={faPlus} />
    </IonButton>
  );
};

export default AddEvent;
