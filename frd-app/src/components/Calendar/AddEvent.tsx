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
} from "@ionic/react";
import React, { memo, useState, useRef } from "react";
//   import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./Calendar.module.css";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";

const NewEventForm = ({
  onDismiss,
}: {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}) => {
  const inputRef = useRef<HTMLIonInputElement>(null);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => onDismiss(null, "cancel")}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>New Event</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => onDismiss(inputRef.current?.value, "confirm")}
            >
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Title</IonLabel>
          <IonInput ref={inputRef} placeholder="Event name" />

          <IonLabel position="stacked">Event Start</IonLabel>
          <IonDatetimeButton datetime="datetime1"></IonDatetimeButton>
          <IonModal keepContentsMounted={true}>
            <IonDatetime id="datetime1"></IonDatetime>
          </IonModal>

          <IonLabel position="stacked">Event End</IonLabel>
          <IonDatetimeButton datetime="datetime2"></IonDatetimeButton>
          <IonModal keepContentsMounted={true}>
            <IonDatetime id="datetime2"></IonDatetime>
          </IonModal>

          <IonLabel position="stacked">Description</IonLabel>
          <IonInput ref={inputRef} placeholder="About the event" />

          <IonLabel position="stacked">Location</IonLabel>
          <IonInput ref={inputRef} placeholder="Where's the event location? Google map api?" />

          <IonLabel position="stacked">Color</IonLabel>
          <IonList>
            <IonItem>
              <IonSelect placeholder="Select Color">
                <IonSelectOption value="orange">Orange</IonSelectOption>
                <IonSelectOption value="yellow">Yellow</IonSelectOption>
                <IonSelectOption value="green">Green</IonSelectOption>
                <IonSelectOption value="blue">Blue</IonSelectOption>
                <IonSelectOption value="pink">Pink</IonSelectOption>
                <IonSelectOption value="black">Black</IonSelectOption>
                <IonSelectOption value="purple">Purple</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>

          <IonLabel position="stacked">Link to</IonLabel>
          <IonInput ref={inputRef} placeholder="Link to specific notes/todo list--auto complete input???" />

        </IonItem>
      </IonContent>
    </IonPage>
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
        // if (ev.detail.role === 'confirm') {
        //   // setMessage(`Hello, ${ev.detail.data}!`);
        // }
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
