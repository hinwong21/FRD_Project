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
import StatusItem from "./StatusItem";
import {
  bodyOutline,
  contrastOutline,
  phoneLandscapeOutline,
  sadOutline,
  waterOutline,
} from "ionicons/icons";

type OtherStatus = {
  content: string;
};

const ModalExample = ({
  onDismiss,
}: {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}) => {
  const inputRef = useRef<HTMLIonInputElement>(null);
  // Submit Form
  const { register, handleSubmit } = useForm<OtherStatus>();
  const submitHandler = (data: OtherStatus) => {
    // TODO Insert into the DB here?(use useEffect()) Save the data into the variable
    console.log(data);
  };

  const [level, setLevel] = useState<number>(0);

  const handleLevelChange = (newLevel: number) => {
    setLevel(newLevel);
  };

  console.log("Parent Level:", level);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={styles.pBar} className={styles.pBar}>
          <IonButtons slot="start">
            <IonButton
              color={styles.pBar}
              onClick={() => onDismiss(null, "cancel")}
            >
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Add Status</IonTitle>
          <IonButtons slot="end">
            <IonButton
              color={styles.pBar}
              onClick={() => onDismiss(inputRef.current?.value, "confirm")}
            >
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* TODO ADD STATUS */}
        <StatusItem
          icon={waterOutline}
          type="menstrual flow"
          lv={5}
          onLevelChange={handleLevelChange}
        />
        <StatusItem
          icon={bodyOutline}
          type="lower back pain"
          lv={5}
          onLevelChange={handleLevelChange}
        />
        <StatusItem
          icon={sadOutline}
          type="heada
          che"
          lv={5}
          onLevelChange={handleLevelChange}
        />

        <StatusItem
          icon={phoneLandscapeOutline}
          type="fatigue"
          lv={5}
          onLevelChange={handleLevelChange}
        />
        <StatusItem
          icon={contrastOutline}
          type="contraceptive pill"
          lv={30}
          onLevelChange={handleLevelChange}
        />

        <StatusItem
          icon={contrastOutline}
          type="painkiller"
          lv={30}
          onLevelChange={handleLevelChange}
        />

        <form
          className={styles.statusForm}
          onSubmit={handleSubmit(submitHandler)}
        >
          <label className={styles.otherStatus} htmlFor="otherStatus">
            Other Status
          </label>
          <div className={styles.otherInputBox}>
            <textarea
              // ref={inputRef}
              className={styles.otherInput}
              // type="text"
              style={{ height: "70px" }}
              {...register("content")}
            ></textarea>
            <IonButton color={styles.btn} className={styles.btn} type="submit">
              Submit
            </IonButton>
          </div>
        </form>
        {/* <IonItem>
          <IonLabel position="stacked">Enter your name</IonLabel>
          <IonInput ref={inputRef} placeholder="Your name" />
        </IonItem> */}
      </IonContent>
    </IonPage>
  );
};

function PeriodDay() {
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

            {/* <div className={styles.statusBox}>
              <div className={styles.todayStatus}>today's status</div>
              <Button btname="add" />
            </div> */}

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
            Add Today's Status
          </IonButton>
        </IonContent>
      </div>
    </IonPage>
  );
}

export default PeriodDay;
