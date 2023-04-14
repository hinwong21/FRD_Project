import { useRef, useEffect, useState } from "react";
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import FullCalendar from "@fullcalendar/react";
//change language to zh-tw // import locale from '@fullcalendar/core/locales/zh-tw';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { AddEvent } from "./AddEvent";
import {
  IonContent,
  IonModal,
  IonLabel,
  IonButton,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonList,
  IonItem,
  IonMenuButton,
  IonHeader,
  IonItemDivider,
  IonItemGroup,
} from "@ionic/react";
import * as bootstrap from "bootstrap";
import styles from "./Calendar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { EventInput } from "@fullcalendar/core";

export const Calendar_zh = () => {
  const [modalState, setModalState] = useState(false);
  const [modalDate, setModalDate] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [googleCalendarEvent, setGoogleCalendarEvent] = useState([{}]);
  const [localCalendarEvent, setLocalCalendarEvent] = useState([{}]);

  const eventList = [
    {
      title: "Piano Lesson",
      start: "2023-03-20 12:30",
      end: "2023-03-21 16:30",
      extendedProps: { description: "Pay lesson fee" },
      backgroundColor: "blue",
      textColor: "white",
    },
    {
      title: "Tecky Group Project Discussion",
      start: "2023-03-20 10:30",
      extendedProps: { description: "Brain Storm-- Karaoke App" },
      end: "2023-03-21 12:30",
      backgroundColor: "red",
      textColor: "white",
    },
    {
      title: "Revision Time",
      start: "2023-03-24 09:30",
      end: "2023-03-27 07:30",
      extendedProps: { description: "I can do it!" },
      backgroundColor: "brown",
      textColor: "white",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
    },
  ];

  const googleCalendarEventArr: {}[] = [];

  useEffect(() => {
    getGoogleCalendarEvents();
    getLocalCalendarEvents();
  }, []);

  async function getGoogleCalendarEvents() {
    const events = await fetch("http://localhost:8080/calendar/google-events", {
      method: "GET",
    });
    const events_json = await events.json();
    const events_json2 = events_json[0].content.replace(/\\/g, "");
    const events_json3 = JSON.parse(events_json2);
    setGoogleCalendarEvent(events_json3);
  }

  async function getLocalCalendarEvents() {
    const events = await fetch("http://localhost:8080/calendar/local-events", {
      method: "GET",
    });
    const events_json = await events.json();
    console.log(events_json);
    setLocalCalendarEvent(events_json);
  }

  const modal = useRef<HTMLIonModalElement>(null);

  function dismiss() {
    setModalState(false);
  }





  return (
    <>
      <div>
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
            googleCalendarPlugin,
          ]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "title",
            end: "prev,dayGridMonth,timeGridWeek,listWeek,next",
          }}
          editable={true}
          // locale= {locale}
          contentHeight={600}
          droppable={true}
          selectable={true}
          nowIndicator={true}
          longPressDelay={500}
          googleCalendarApiKey="AIzaSyCudYRoPMFcW8GuaTTNTgO9a0IGsz6lYak"
          eventSources={[
            {
              googleCalendarId:
                "en.hong_kong#holiday@group.v.calendar.google.com",
              backgroundColor: "red",
              textColor: "white",
              editable: false,
            },
            localCalendarEvent,
            googleCalendarEvent,
            eventList,
          ]}
          eventDidMount={(info:any) => {
            return new bootstrap.Popover(info.el, {
              title: info.event.title,
              placement: "auto",
              trigger: "hover",
              customClass: "popoverStyle",
              content: info.event.extendedProps.description,
              html: true,
            });
          }}
          eventClick={(event:any) => {
            // stop from redirecting to Google Calendar onclick
            event.jsEvent.preventDefault();
          }}
          dateClick={async (info:any) => {
            // const res = await fetch ("/",{
            //   method: "POST",
            //   headers: {"Content-type": "application/json"},
            //   body: JSON.stringify(info.dateStr)
            // })
            // const json = await res.json();
            // console.log(json);
            
            // console.log(info);
            setModalState(true);
            setModalDate(info.dateStr);
            setModalContent("ABC");
          }}
        />
      </div>

      <AddEvent />

      <IonModal id="example-modal" ref={modal} isOpen={modalState}>
        <IonContent className={styles.modalContentStyle}>
          <IonHeader>
          <IonToolbar>
            <IonButtons slot="start"></IonButtons>
            <IonTitle>{modalDate}</IonTitle>
            <IonButtons slot="end">
              <IonButton color="light" onClick={() => dismiss()}>
                Close
              </IonButton>
            </IonButtons>
          </IonToolbar>
          </IonHeader>

          <IonItemGroup>
        <IonItemDivider>
          <IonLabel>Events</IonLabel>
        </IonItemDivider>
        <IonItem>
              <div>{modalContent}</div>
            </IonItem>
            <IonItem>
              <div>{modalContent}</div>
            </IonItem>
            <IonItem>
              <div>{modalContent}</div>
            </IonItem>
    </IonItemGroup>

    <IonItemGroup>
        <IonItemDivider>
          <IonLabel>Todo List</IonLabel>
        </IonItemDivider>
        <IonItem>
              <div>{modalContent}</div>
            </IonItem>
            <IonItem>
              <div>{modalContent}</div>
            </IonItem>
            <IonItem>
              <div>{modalContent}</div>
            </IonItem>
    </IonItemGroup>

    <IonItemGroup>
        <IonItemDivider>
          <IonLabel>Diary</IonLabel>
        </IonItemDivider>
        <IonItem>
              <div>{modalContent}</div>
            </IonItem>
            <IonItem>
              <div>{modalContent}</div>
            </IonItem>
            <IonItem>
              <div>{modalContent}</div>
            </IonItem>
    </IonItemGroup>

    <IonItemGroup>
        <IonItemDivider>
          <IonLabel>Period</IonLabel>
        </IonItemDivider>
        <IonItem>
              <div>{modalContent}</div>
            </IonItem>
            <IonItem>
              <div>{modalContent}</div>
            </IonItem>
            <IonItem>
              <div>{modalContent}</div>
            </IonItem>
    </IonItemGroup>

        </IonContent>
      </IonModal>
    </>
  );
};

export default Calendar_zh;
