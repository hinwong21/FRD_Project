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
import { useEffect, useRef, useState} from "react";
//   import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import styles from "./Calendar.module.css";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { getName } from "../../service/LocalStorage/LocalStorage";
import { Preferences } from "@capacitor/preferences";
import { Link, useHistory, useLocation } from "react-router-dom";

export const NewEventFormModify = () => {
  const history = useHistory()
  const modal = useRef<HTMLIonModalElement>(null);

  const location_link = useLocation();
  const data_link = location_link.state as dataType;
  console.log(data_link)


  //add new event form data
  const [title, setTitle] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [description, setDescription] = useState("");
  // const [location, setLocation] = useState("Hong Kong");
  const [color, setColor] = useState("blue");
  const [ fullDayMode, setFullDayMode] = useState(false)
  // const[startDateTimeFull, setStartDateTimeFull] = useState()
  // const [endDateTimeFull, setEndDateTimeFull] = useState("");

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      console.log("todo");
    }
  }

  type dataType = {
    data: dataDataType;
    id: string;
  }

  type dataDataType = {
    backgroundColor: string,
    description: string,
    end: string,
    id: string,
    start: string,
    title:string
  }

  

  async function handleSubmit () {
    // event.preventDefault();
    modal.current?.dismiss("", "confirm");
    history.goBack()

    async function updateCalendarLS(id:string, color:string, description: string, startDateTime:string, endDateTime:string, title:string) {
      const key = "calendar";
      const existingValue = await Preferences.get({ key });
      const existingData = existingValue.value ? JSON.parse(existingValue.value) : [];
      const index = existingData.findIndex((item: { id: string; }) => item.id === id);
      console.log(fullDayMode)
      if (index !== -1) {
        existingData[index].backgroundColor = color;
        existingData[index].description = JSON.stringify(description).slice(1,-1);
        existingData[index].title = JSON.stringify(title).slice(1,-1);
        if (!fullDayMode){
          existingData[index].start = startDateTime.slice(0,10)+ ' '+startDateTime.slice(11,16);
          existingData[index].end = endDateTime.slice(0,10)+' '+endDateTime.slice(11,16);
        }else if (fullDayMode){
          existingData[index].start = startDateTime.slice(0,10)
          existingData[index].end = endDateTime.slice(0,10)
        }
      }
      const value = JSON.stringify(existingData);
      console.log(value)
      await Preferences.set({ key, value });
      // dispatch(setShouldGetDataMemo(true))
    }

    updateCalendarLS(data_link.id, color, description, startDateTime, endDateTime, title )

    //update db
    // let token = await getName("token")
    // const res= await fetch("http://localhost:8090/calendar/update-local-event",{
    //   method: "PUT",
    //   headers:{
    //     Authorization:"Bearer " + token,
    //     "Content-type":"application/json"},
    //     body:JSON.stringify({
    //     id: id.slice(1,-1),
    //     title:title.slice(1,-1),
    //     description:description.slice(1,-1),
    //     start: startDateTime.slice(1,11)+ ' '+startDateTime.slice(12,17),
    //     end: endDateTime.slice(1,11)+' '+endDateTime.slice(12,17),
    //     backgroundColor:color
    //   })
    // })

  }

  const setFullDay = ()=>{
    if (!fullDayMode){
      setFullDayMode(true)
    }else{
      setFullDayMode(false)
    }
  }


  useEffect(()=>{
    if (data_link.data.start.length === 10){
      setFullDayMode(true)
      setStartDateTime(data_link.data.start + "T" + "11:11:00.000Z")
      setEndDateTime(data_link.data.end + "T" + "11:11:00.000Z")
    }else{
      setFullDayMode(false)
      setStartDateTime(data_link.data.start.replace(" ", "T") + ":00.000Z")
      setEndDateTime(data_link.data.end.replace(" ", "T") + ":00.000Z")
    }
    
    setTitle(data_link.data.title)
    setColor(data_link.data.backgroundColor)
    setDescription(data_link.data.description)
  },[])

  const handelCancel=()=>{
    history.goBack()
  }

  // useEffect(()=>{}
  //   // console.log(endDateTime, startDateTime)

  //   async function updateCalendarLSDateTime(id:string, startDateTime:string, endDateTime:string) {
  //     const key = "calendar";
  //     const existingValue = await Preferences.get({ key });
  //     const existingData = existingValue.value ? JSON.parse(existingValue.value) : [];
  //     const index = existingData.findIndex((item: { id: string; }) => item.id === id);
  //     console.log(fullDayMode)
  //     if (index !== -1) {
  //       existingData[index].backgroundColor = color;
  //       existingData[index].description = JSON.stringify(description).slice(1,-1);
  //       existingData[index].title = JSON.stringify(title).slice(1,-1);
  //       if (!fullDayMode){
  //         existingData[index].start = startDateTime.slice(0,10)+ ' '+startDateTime.slice(11,16);
  //         existingData[index].end = endDateTime.slice(0,10)+' '+endDateTime.slice(11,16);
  //       }else if (fullDayMode){
  //         existingData[index].start = startDateTime.slice(0,10)
  //         existingData[index].end = endDateTime.slice(0,10)
  //       }
  //     }
  //     const value = JSON.stringify(existingData);
  //     console.log(value)
  //     await Preferences.set({ key, value });
  //     // dispatch(setShouldGetDataMemo(true))
  //   }
    
  //   updateCalendarLSDateTime(data_link.id, startDateTime, endDateTime);

  // ),[endDateTime, startDateTime])


  return (
    <>
      <IonModal
          ref={modal}
          onWillDismiss={(ev) => onWillDismiss(ev)}
          isOpen={true}
        >
          <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
            {/* <Link to={"./Calendar"}> */}
                <IonButton onClick={handelCancel}>Cancel</IonButton>
            {/* </Link> */}
            </IonButtons>
            <IonButtons slot="end">
              <IonButton
                onClick={handleSubmit}
              >
                Modify
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">

          <form>
            <IonItem>
              <IonLabel position="stacked">Title</IonLabel>
              <IonInput type="text" value={title} onIonInput={(e)=>setTitle(e.target.value as string)} placeholder="Event name" />
            </IonItem>
            <IonItem>
              <IonLabel>All day</IonLabel>
            <IonToggle
                slot="end"
                checked={fullDayMode}
                onIonChange={setFullDay}
              ></IonToggle>
              </IonItem>

              {!fullDayMode &&(
              <div>
              <IonItem>
               <IonLabel position="stacked">Event Start</IonLabel>
              <IonDatetimeButton datetime="datetime1"
              ></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime id="datetime1" presentation="date-time" display-format="YYYY-MM-DDTHH:mm:ssTZD" value={startDateTime}
                onIonChange={(e)=>setStartDateTime(e.target.value as string)}></IonDatetime>
              </IonModal>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Event End</IonLabel>
              <IonDatetimeButton
                datetime="datetime2"
              ></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime id="datetime2" presentation="date-time" value={endDateTime} display-format="YYYY-MM-DDTHH:mm:ssTZD"
                onIonChange={(e)=>setEndDateTime(e.target.value as string)}></IonDatetime>
              </IonModal>
            </IonItem>
            </div>
           ) }

            {fullDayMode &&(
              <div>
              <IonItem>
               <IonLabel position="stacked">Event Start</IonLabel>
              <IonDatetimeButton datetime="datetime3"
              ></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime id="datetime3" presentation="date" value={startDateTime} display-format="YYYY-MM-DDTHH:mm:ssTZD"
                onIonChange={(e)=>setStartDateTime(e.target.value as string)}></IonDatetime>
              </IonModal>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Event End</IonLabel>
              <IonDatetimeButton
                datetime="datetime4"
              ></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime id="datetime4" presentation="date" value={endDateTime} display-format="YYYY-MM-DDTHH:mm:ssTZD"
                onIonChange={(e)=>setEndDateTime(e.target.value as string)}
                ></IonDatetime>
              </IonModal>
            </IonItem>
            </div>
            )}

            <IonItem>
              <IonLabel position="stacked">Description</IonLabel>
              <IonInput placeholder="About the event" value={description} onIonChange={(e)=>setDescription(e.target.value as string)}/>
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
        </IonModal>
    </>
  );
};

export const AddEvent = () => {
  const [present, dismiss] = useIonModal(NewEventFormModify, {
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

export default NewEventFormModify;
