import React, { useState, useRef, useEffect } from "react";
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
import Button from "./Button";
import { useHistory } from "react-router";
import Datebox from "./Datebox";

type OtherStatus = {
  content: string;
};

export type LevelInfo = {
  type: string;
  lv: number;
};

// const statusInfo: Array<object> = [];

const ModalPeriod = ({
  onDismiss,
}: {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}) => {
  const inputRef = useRef<HTMLIonInputElement>(null);
  // Submit Form
  const { register, handleSubmit } = useForm<OtherStatus>();
  const formSubmitBtnRef = useRef<any>(null);
  const [statusInfo, setStatusInfo] = useState<Array<object>>([]);

  useEffect(() => {
    // TODO Insert into the DB here?(use useEffect()) Save the data into the variable
    console.log("Data Object", statusInfo);
  }, [statusInfo]);

  const submitHandler = (data: OtherStatus) => {
    console.log("dat::", data);
    const newStatusInfo = [...statusInfo];

    newStatusInfo.push(data);
    console.log("newStatusInfo After:", newStatusInfo);
    setStatusInfo(newStatusInfo);
  };

  const submitControl = () => {
    formSubmitBtnRef.current.click();
  };

  const [level, setLevel] = useState<LevelInfo>({
    type: "",
    lv: 0,
  });

  const handleLevelChange = (newLevel: LevelInfo) => {
    console.log("newLevel:", newLevel);

    setLevel(newLevel);
    const newLevelInfo = [...statusInfo];
    newLevelInfo.push(newLevel);
    setStatusInfo(newLevelInfo);
  };

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
              // onClick={() => onDismiss(inputRef.current?.value, "confirm")}
              // onClick={() => {
              //   submitControl();
              // }}
              onClick={() => {
                submitControl();
                console.log("StatusInfo", statusInfo);
                onDismiss(null, "confirm");
              }}
            >
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={styles.ionPadding}>
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
          type="headache"
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
              style={{ height: "70px", width: "320px" }}
              {...register("content")}
            ></textarea>
            {
              <IonButton
                className={styles.btnNone}
                ref={formSubmitBtnRef}
                type="submit"
              >
                Submit
              </IonButton>
            }
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
  const [present, dismiss] = useIonModal(ModalPeriod, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
  });

  const submit = useHistory();
  const handleHistory = () => {
    submit.push("/Health-periodRecordDetails");
  };

  const [dateInfo, setDateInfo] = useState<Date | null>();

  const handleDateInfo = (saveDate: Date | null) => {
    console.log("startDate:", saveDate);
    setDateInfo(saveDate);
    console.log("dateInfo:", dateInfo);
  };

  // const [message, setMessage] = useState(
  //   "This modal example uses the modalController to present and dismiss modals."
  // );

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          //TODO
          // setMessage(`Hello, ${ev.detail.data}!`);
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
            {/* <Topbox
              chance="low probability of pregnancy"
              subTitle="ovulation date:"
              // TODO Count the Ovulation day
              periodDay="after 15 days"
              // TODO Count the Period day
              ovuDay="period day 3"
              btname="period end"
              getDate={handleDateInfo}
            /> */}
            <br></br>
            <br></br>
            <Datebox subTitle="upcoming ovulation" startDate="" endDate="" />

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

          <br></br>
          <div className={styles.goStatusBtn}>
            <IonButton
              size="default"
              color={styles.btn}
              className={styles.btn}
              onClick={handleHistory}
            >
              status record
            </IonButton>
          </div>
        </IonContent>
      </div>
    </IonPage>
  );
}

export default PeriodDay;
