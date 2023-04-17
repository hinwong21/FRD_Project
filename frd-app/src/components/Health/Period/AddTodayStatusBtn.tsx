import { useState, useRef, useEffect } from "react";
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  useIonModal,
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

type OtherStatus = {
  content: string;
};

export type ItemInfo = {
  type: string;
  lv: number;
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
  const { register, handleSubmit } = useForm<OtherStatus>();
  const formSubmitBtnRef = useRef<any>(null);
  const [otherInfo, setOtherInfo] = useState<Array<OtherStatus>>([]);

  //For StatusItems
  const [statusInfo, setStatusInfo] = useState<Array<ItemInfo>>([]);
  const [item, setItem] = useState<ItemInfo>({
    type: "",
    lv: 0,
  });
  const [newItem, setNewItem] = useState<ItemInfo>({
    type: "",
    lv: 0,
  });

  useEffect(() => {
    console.log("Data Object", statusInfo);
  }, [statusInfo]);

  const submitHandler = (data: OtherStatus /*item:  OtherStatus*/) => {
    console.log("submitHandler ", data);
    // const newOtherInfo = [...otherInfo];
    const newItemInfo = [...statusInfo];

    // newOtherInfo.push(data);
    // console.log("newOtherInfo After:", newOtherInfo);
    // setOtherInfo(newOtherInfo);
    newItemInfo.push(item);
    console.log("newItemInfo After:", newItemInfo);
    setStatusInfo(newItemInfo);
  };

  const submitControl = () => {
    formSubmitBtnRef.current.click();
  };

  const handleLevelChange = (newItem: ItemInfo) => {
    console.log("newLevel:", newItem);
    console.log("newLevel type:", newItem.type);
    console.log("item type:", item.type);
    console.log(item);

    const newLevelInfo = [];
    if (statusInfo.length === 0) {
      newLevelInfo.push(newItem);
      setStatusInfo(newLevelInfo);
      setItem(newItem);
      console.log("look ITEM", item);
    } else if (statusInfo.length > 0) {
      for (let index = 0; index < statusInfo.length; index++) {
        if (newItem.type === statusInfo[index].type && newItem.lv !== 0) {
          statusInfo[index].lv = newItem.lv;
          console.log("if ", statusInfo);
        } else {
          newLevelInfo.push(newItem);
          setStatusInfo(newLevelInfo);
        }
      }
    }

    // if (newLevel.type === item.type) {
    //   console.log("Here");

    //   const newLevelInfo = [...statusInfo];
    //   const newLevelInfo = [];
    //   newLevelInfo.push(newLevel);
    //   setStatusInfo(newLevelInfo);
    // } else if (newLevel.type !== item.type) {
    //   const newLevelInfo = [...statusInfo];
    //   newLevelInfo.push(newLevel);
    //   setStatusInfo(newLevelInfo);
    // }
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
