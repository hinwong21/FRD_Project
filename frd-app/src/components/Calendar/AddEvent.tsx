import {
  IonButton,
  IonPopover,
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
} from "@ionic/react";
import React, { memo, useState, useRef } from "react";
//   import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./Calendar.module.css";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
// import "./GoogleCalendarClient"


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
            <IonButton color="medium" onClick={() => onDismiss(null, 'cancel')}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Welcome</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => onDismiss(inputRef.current?.value, 'confirm')}>Confirm</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Enter your name</IonLabel>
          <IonInput ref={inputRef} placeholder="Your name" />
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
