import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  useIonModal,
  IonMenuButton,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import styles from "./PeriodDate.module.scss";

import { useForm } from "react-hook-form";
import StatusItem from "./StatusItem";
import {
  bodyOutline,
  contrastOutline,
  phoneLandscapeOutline,
  sadOutline,
  waterOutline,
} from "ionicons/icons";

import { useHistory } from "react-router";
import { useFetch } from "../../../hooks/useFetch";
import { async, uuidv4 } from "@firebase/util";

type OtherStatus = {
  content: string;
};

export type ItemInfo = {
  type?: string;
  lv?: number;
  content?: string;
};

// const statusInfo: Array<object> = [];

const ModalPeriod = ({
  onDismiss,
}: {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}) => {
  const inputRef = useRef<HTMLIonInputElement>(null);

  // Submit Form
  //For Input other status
  const { register, handleSubmit } = useForm<ItemInfo>();
  const fetch = useFetch();
  // const { register, handleSubmit } = useForm<OtherStatus>();
  const formSubmitBtnRef = useRef<any>(null);
  // const [otherInfo, setOtherInfo] = useState<Array<OtherStatus>>([]);
  const [otherInfo, setOtherInfo] = useState<Array<ItemInfo>>([]);
  const [periodId, setPeriodId] = useState<string>(uuidv4());
  const [statusId, setStatusId] = useState<string>();
  const [checkDate, setCheckDate] = useState<Date>(new Date());

  //For StatusItems
  const [statusInfo, setStatusInfo] = useState<Array<ItemInfo>>([]);
  const [item, setItem] = useState<ItemInfo>({
    type: "",
    lv: 0,
    content: "",
  });

  // const periodId = useMemo(
  //   () =>
  //     ,[]);

  useEffect(() => {
    //TODO fetch to backend & group with input text
    // insert to db
  }, [statusInfo]);

  // if()

  async function insertDB() {
    setStatusId(uuidv4());
    for (let index = 0; index < statusInfo.length; index++) {
      await fetch("post", "/period/periodStatus", {
        statusId,
        periodId,
        type: statusInfo[index].type,
        content: statusInfo[index].content
          ? statusInfo[index].content
          : statusInfo[index].lv + " ",
      });

      console.log("insertDB run");
    }
  }

  async function updateDB() {
    await fetch("put", "/period/periodStatus", {
      statusId,
      type: item.type,
      content: item.content ? item.content : item.lv + " ",
    });
    console.log("updateDB run");
  }

  const submitHandler = (data: ItemInfo) => {
    const newData = { type: "other", ...data };
    setStatusInfo([...statusInfo, newData]);
  };

  const submitControl = () => {
    formSubmitBtnRef.current.click();
  };

  const handleLevelChange = (newItem: ItemInfo) => {
    const existingItem = statusInfo.find((item) => item.type === newItem.type);

    if (existingItem) {
      if (newItem.lv === 0) {
        const updatedStatusInfo = statusInfo.filter(
          (item) => item.type !== newItem.type
        );
        setStatusInfo(updatedStatusInfo);
      } else {
        existingItem.lv = newItem.lv;
        setStatusInfo([...statusInfo]);
      }
    } else {
      // if (newItem.lv !== 0) {
      setStatusInfo([...statusInfo, newItem]);
      // }
    }
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

function AddTodayStsBtn() {
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
    <div className="ion-padding">
      <IonButton
        color={styles.btn}
        className={styles.btn}
        expand="block"
        onClick={() => openModal()}
      >
        Add Today's Status
      </IonButton>

      <br></br>
    </div>
  );
}

export default AddTodayStsBtn;
