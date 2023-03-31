import React, { useState, useRef } from "react";
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  useIonModal,
  IonMenuButton,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import styles from "./PeriodDate.module.scss";
import Topbox from "./Topbox";

import { useForm } from "react-hook-form";

type OtherStatus = {
  content: string;
};

const ModalExample = ({
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
          <IonTitle>Welcome</IonTitle>
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
          <IonLabel position="stacked">Enter your name</IonLabel>
          <IonInput ref={inputRef} placeholder="Your name" />
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

function AddStatusPage() {
  // Submit Form
  const { register, handleSubmit } = useForm<OtherStatus>();
  const submitHandler = (data: OtherStatus) => {
    // TODO Insert into the DB here?(use useEffect()) Save the data into the variable
    console.log(data);
  };

  const [present, dismiss] = useIonModal(ModalExample, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
  });
  const [message, setMessage] = useState(
    "This modal example uses the modalController to present and dismiss modals."
  );

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          setMessage(`Hello, ${ev.detail.data}!`);
        }
      },
    });
  }

  return (
    <IonPage>
      <div className={styles.home}>
        <IonHeader>
          <IonToolbar color={styles.pBar} className={styles.pBar}>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Period</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* <header>
            <h1 className={styles.title}>period</h1>
          </header> */}
        <div>
          <div className={styles.container}>
            <Topbox
              subTitle="period day"
              periodDay="3"
              ovuDay="ovulation date: after 15 days"
              btname="period end"
            />

            <div className={styles.statusBox}>
              <div className={styles.todayStatus}>today's status</div>
              {/* <Button btname="add" /> */}
            </div>

            {/* <Status subtitle="status" date="22/03/2023" /> */}
          </div>
        </div>
        <IonContent className="ion-padding">
          <IonButton
            color={styles.btn}
            className={styles.btn}
            expand="block"
            onClick={() => openModal()}
          >
            Open
          </IonButton>
        </IonContent>
      </div>
    </IonPage>
  );
}

export default AddStatusPage;
