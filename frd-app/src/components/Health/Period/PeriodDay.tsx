import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { OverlayEventDetail } from "@ionic/core/components";
import React, { useRef, useState } from "react";
import Datebox from "./Datebox";
import Topbox from "./Topbox";
import styles from "./PeriodDate.module.scss";
import Status from "./Status";
import Button from "./Button";
import { calendarClearOutline, waterOutline } from "ionicons/icons";

export const PeriodDay = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState(
    "This modal example uses triggers to automatically open a modal when the button is clicked."
  );

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  return (
    <IonPage>
      <IonContent>
        <div className={styles.home}>
          <IonHeader>
            <IonToolbar>
              <IonTitle className={styles.title}>period</IonTitle>
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

              <IonContent className="ion-padding">
                <IonButton
                  id="open-modal"
                  size="default"
                  color={styles.btn}
                  className={styles.btn}
                  expand="block"
                >
                  add
                </IonButton>
                {/* <Button btname="add" id="open-modal" /> */}
                {/* <IonButton color="dark" id="open-modal" expand="block">
                  Add
                </IonButton> */}
                {/* <p>{message}</p> */}
                <IonModal
                  ref={modal}
                  trigger="open-modal"
                  onWillDismiss={(ev) => onWillDismiss(ev)}
                >
                  <IonHeader>
                    <IonToolbar
                      color={styles.toolbar}
                      className={styles.toolbar}
                    >
                      <IonButtons slot="start">
                        <IonButton onClick={() => modal.current?.dismiss()}>
                          Cancel
                        </IonButton>
                      </IonButtons>
                      <IonTitle>Add Status</IonTitle>
                      <IonButtons slot="end">
                        <IonButton strong={true} onClick={() => confirm()}>
                          Confirm
                        </IonButton>
                      </IonButtons>
                    </IonToolbar>
                  </IonHeader>

                  {/* TODO ADD STATUS */}
                  <div className="statusContainer">
                    <div className="statusItem">
                      <IonIcon
                        className="statusIcon"
                        icon={waterOutline}
                        slot="start"
                      ></IonIcon>
                    </div>
                  </div>
                </IonModal>
              </IonContent>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PeriodDay;
