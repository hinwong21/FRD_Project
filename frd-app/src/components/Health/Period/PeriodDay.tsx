import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
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
import {
  bodyOutline,
  calendarClearOutline,
  contrastOutline,
  phoneLandscapeOutline,
  sadOutline,
  waterOutline,
} from "ionicons/icons";
import LevelBtn from "./LevelBtn";
import StatusItem from "./StatusItem";

import { useForm } from "react-hook-form";
import AddStatusPage from "./AddStatusPage";

type OtherStatus = {
  content: string;
};

export const PeriodDay = () => {
  // Submit Form
  const { register, handleSubmit } = useForm<OtherStatus>();
  const submitHandler = (data: OtherStatus) => {
    // TODO Insert into the DB here?(use useEffect()) Save the data into the variable
    console.log(data);
  };

  return (
    <IonPage>
      <IonContent>
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
              <div>{/* <AddStatusPage /> */}</div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PeriodDay;
