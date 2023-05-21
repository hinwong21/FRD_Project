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
  IonToast,
  IonToggle,
} from "@ionic/react";
import { useState } from "react";
//   import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import styles from "./Calendar.module.css";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { getName } from "../../service/LocalStorage/LocalStorage";
import { Preferences } from "@capacitor/preferences";
import { useDispatch } from "react-redux";
import { setShouldGetDataEvent } from "../../redux/Calendar/eventSlice";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store/store";
import { api_origin } from "../../service/api";
import { CalendarItem } from "./Calendar_zh";

const NewEventForm = ({
  onDismiss,
}: {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}) => {
  const dispatch = useDispatch();
  const [showAlertNewEvent, setShowAlertNewEvent] = useState(false);
  const [alertMsgNewEvent, setAlertMsgNewEvent] = useState("");

  //add new event form data
  const [title, setTitle] = useState("");
  const [startDateTime, setStartDateTime] = useState(
    JSON.stringify(new Date())
  );
  const [endDateTime, setEndDateTime] = useState(JSON.stringify(new Date()));
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Hong Kong");
  const [color, setColor] = useState("blue");
  const [dateTimePicker, setDateTimePicker] = useState("date-time");
  const [fullDayMode, setFullDayMode] = useState(false);

  async function handleSubmit() {
    // event.preventDefault();
    onDismiss("", "confirm");

    let id = uuidv4();

    console.log("add event", startDateTime, endDateTime);

    //update local storage
    const key = "calendar";
    const data: CalendarItem = {
      id: id.slice(1, -1),
      title: title.slice(1, -1),
      extendedProps: {
        description: description.slice(1, -1),
      },
      start: startDateTime.slice(1, 11) + " " + startDateTime.slice(12, 17),
      end: endDateTime.slice(1, 11) + " " + endDateTime.slice(12, 17),
      backgroundColor: color,
    };
    const existingValue = await Preferences.get({ key });
    const existingData = existingValue.value
      ? JSON.parse(existingValue.value)
      : [];
    const value = JSON.stringify([...existingData, data]);
    await Preferences.set({ key, value });
    dispatch(setShouldGetDataEvent(true));

    //update db
    let token = await getName("token");
    const res = await fetch(`${api_origin}/calendar/new-local-event`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: id.slice(1, -1),
        title: title.slice(1, -1),
        description: description.slice(1, -1),
        start: startDateTime.slice(1, 11) + " " + startDateTime.slice(12, 17),
        end: endDateTime.slice(1, 11) + " " + endDateTime.slice(12, 17),
        backgroundColor: color,
      }),
    });

    const json = await res.json();
    if (json.success == true) {
      setShowAlertNewEvent(true);
      setAlertMsgNewEvent("Event created!");
    } else {
      setShowAlertNewEvent(true);
      setAlertMsgNewEvent("Something went wrong! Please try again later!");
    }
  }

  const setFullDay = () => {
    if (!fullDayMode) {
      setFullDayMode(true);
    } else {
      setFullDayMode(false);
    }
  };

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
              <IonButton onClick={handleSubmit}>Add Event</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <form>
            <IonItem>
              <IonLabel position="stacked">Title</IonLabel>
              <IonInput
                type="text"
                onIonChange={(e) => setTitle(JSON.stringify(e.target.value))}
                placeholder="Event name"
              />
            </IonItem>
            <IonItem>
              <IonLabel>All day</IonLabel>
              <IonToggle slot="end" onIonChange={setFullDay}></IonToggle>
            </IonItem>

            {!fullDayMode && (
              <div>
                <IonItem>
                  <IonLabel position="stacked">Event Start</IonLabel>
                  <IonDatetimeButton datetime="datetime1"></IonDatetimeButton>
                  <IonModal keepContentsMounted={true}>
                    <IonDatetime
                      id="datetime1"
                      presentation="date-time"
                      onIonChange={(e) =>
                        setStartDateTime(JSON.stringify(e.target.value))
                      }
                    ></IonDatetime>
                  </IonModal>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Event End</IonLabel>
                  <IonDatetimeButton datetime="datetime2"></IonDatetimeButton>
                  <IonModal keepContentsMounted={true}>
                    <IonDatetime
                      id="datetime2"
                      presentation="date-time"
                      onIonChange={(e) =>
                        setEndDateTime(JSON.stringify(e.target.value))
                      }
                    ></IonDatetime>
                  </IonModal>
                </IonItem>
              </div>
            )}

            {fullDayMode && (
              <div>
                <IonItem>
                  <IonLabel position="stacked">Event Start</IonLabel>
                  <IonDatetimeButton datetime="datetime3"></IonDatetimeButton>
                  <IonModal keepContentsMounted={true}>
                    <IonDatetime
                      id="datetime3"
                      presentation="date"
                      onIonChange={(e) =>
                        setStartDateTime(JSON.stringify(e.target.value))
                      }
                    ></IonDatetime>
                  </IonModal>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Event End</IonLabel>
                  <IonDatetimeButton datetime="datetime4"></IonDatetimeButton>
                  <IonModal keepContentsMounted={true}>
                    <IonDatetime
                      id="datetime4"
                      presentation="date"
                      onIonChange={(e) =>
                        setEndDateTime(JSON.stringify(e.target.value))
                      }
                    ></IonDatetime>
                  </IonModal>
                </IonItem>
              </div>
            )}

            <IonItem>
              <IonLabel position="stacked">Description</IonLabel>
              <IonInput
                placeholder="About the event"
                onIonChange={(e) =>
                  setDescription(JSON.stringify(e.target.value))
                }
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
          </form>
        </IonContent>
      </IonPage>

      <IonToast
        isOpen={showAlertNewEvent}
        message={alertMsgNewEvent}
        duration={5000}
      ></IonToast>
    </>
  );
};

export const AddEvent = () => {
  const [present, dismiss] = useIonModal(NewEventForm, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
  });

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
