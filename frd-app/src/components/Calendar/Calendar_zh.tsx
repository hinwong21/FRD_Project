import { useRef, useEffect, useState } from "react";
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  isSameDay,
  parseISO,
  isWithinInterval,
  differenceInDays,
  isAfter,
  isBefore,
} from "date-fns";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { v4 as uuidv4 } from "uuid";
import { isToday } from "date-fns";
import moment from "moment-timezone";
import { DateClickArg } from "@fullcalendar/interaction";
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
  IonPopover,
  IonCard,
  IonAlert,
} from "@ionic/react";
import * as bootstrap from "bootstrap";
import styles from "./Calendar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { EventApi, EventInput } from "@fullcalendar/core";
import { getName } from "../../service/LocalStorage/LocalStorage";
import { Preferences } from "@capacitor/preferences";
import { Link } from "react-router-dom";
import Header from "../Health/Nutrient/Header";
import { nutritionStore } from "../../redux/Nutrition/store";
import { Provider } from "react-redux";
import { useDispatch } from "react-redux";
import { setShouldGetDataTodo } from "../../redux/Notes/todoSlice";
import { setShouldGetDataEvent } from "../../redux/Calendar/eventSlice";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store/store";
import { useHistory } from "react-router-dom";

export const Calendar_zh = () => {
  const shouldGetDataEvent = useSelector((state: IRootState) => state.event.shouldGetDataEvent);
  const [modalState, setModalState] = useState(false);
  const [modalDate, setModalDate] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [googleCalendarEvent, setGoogleCalendarEvent] = useState([] as {}[]);
  const [localCalendarEvent, setLocalCalendarEvent] = useState([] as {}[]);
  const [todoList, setTodoList] = useState([] as {}[]);
  const [diary, setDiary] = useState([] as {}[]);
  const [period, setPeriod] = useState([] as {}[]);
  const [periodList, setPeriodList] = useState([] as {}[]);
  const [ovuList, setOvuList] = useState([] as {}[]);
  // const [presentAlertTodo, setPresentAlertTodo] = useState(false);
  // const [selectedTodo, setSelectedTodo] = useState("");
  const [presentAlertEvent, setPresentAlertEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    getGoogleCalendarEvents();
    getLocalCalendarEvents();
    getTodoList();
    getDiary();
    getPeriod();
  }, []);

  useEffect(() => {
    getGoogleCalendarEvents();
    getLocalCalendarEvents();
    getTodoList();
    getDiary();
    getPeriod();
  }, [shouldGetDataEvent]);

  useEffect(() => {
    configPeriodList();
    configOvuList();
  }, [period]);

  async function getGoogleCalendarEvents() {
    const getGoogleCalendarLS = async () => {
      const { value } = await Preferences.get({ key: "google_calendar" });
      // console.log(value)
      if (value !== null) {
        setGoogleCalendarEvent(JSON.parse(value));
      }
    };
    getGoogleCalendarLS();
    dispatch(setShouldGetDataEvent(false));
  }

  async function getLocalCalendarEvents() {
    const getLocalEventLS = async () => {
      const { value } = await Preferences.get({ key: "calendar" });
      console.log(value);
      if (value !== null) {
        setLocalCalendarEvent(JSON.parse(value));
      }
    };
    getLocalEventLS();
    dispatch(setShouldGetDataEvent(false));
  }

  async function getTodoList() {
    const getTodoListLS = async () => {
      const { value } = await Preferences.get({ key: "todolist" });
      // console.log(value)
      if (value !== null) {
        setTodoList(JSON.parse(value));
      }
    };
    getTodoListLS();
  }

  async function getDiary() {
    const getDiaryLS = async () => {
      const { value } = await Preferences.get({ key: "diary" });
      // console.log(value)
      if (value !== null) {
        setDiary(JSON.parse(value));
      }
    };
    getDiaryLS();
  }

  const getPeriodLS = async () => {
    const { value } = await Preferences.get({ key: "period" });
    // console.log(value)
    if (value !== null) {
      const periodData = JSON.parse(value);
      setPeriod(periodData);
      console.log(1, period);
    }
  };
  async function getPeriod() {
    await getPeriodLS();
  }

  function configPeriodList() {
    console.log("period", period);
    // console.log("periodList", periodList);
    period.forEach((item: any, index) =>
      setPeriodList([
        ...periodList,
        {
          title: "🩸Peiord",
          start: item.start_at,
          end: item.end_at,
          extendedProps: { description: "Upcoming at " + item.upcoming_at },
          backgroundColor: "pink",
          textColor: "white",
        },
      ])
    );
    console.log("periodList", periodList);
  }

  function configOvuList() {
    period.forEach((item: any, index) =>
      setOvuList([
        ...periodList,
        {
          title: "🌸Ovulation Period",
          start: item.ovu_start_at,
          end: item.ovu_end_at,
          extendedProps: { description: "Ovulation Period" },
          backgroundColor: "#4d86d2",
          textColor: "white",
        },
      ])
    );
  }

  const modal = useRef<HTMLIonModalElement>(null);

  function dismiss() {
    setModalState(false);
  }

  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [clickedEventList, setClickedEventList] = useState([] as {}[]);
  const [clickedTodoList, setClickedTodoList] = useState([] as {}[]);
  const [clickedDiary, setClickedDiary] = useState([] as {}[]);
  const [clickedPeriod, setClickedPeriod] = useState([] as {}[]);
  const [clickedOvu, setClickedOvu] = useState([] as {}[]);
  const [publicHoliday, setPublicHoliday] = useState<EventApi[]>([]);

  const handleDateClick = (arg: DateClickArg) => {
    const clickedDate = arg.date;
    const clickedEvents = localCalendarEvent.filter(
      (event: any) =>
        isSameDay(parseISO(event.start as string), clickedDate) ||
        isSameDay(parseISO(event.end as string), clickedDate) ||
        (isAfter(clickedDate, parseISO(event.start as string)) &&
          isBefore(clickedDate, parseISO(event.end as string)))
    );

    const clickedGoogleEvents = googleCalendarEvent.filter(
      (event: any) =>
        isSameDay(parseISO(event.start as string), clickedDate) ||
        isSameDay(parseISO(event.end as string), clickedDate) ||
        // isWithinInterval(clickedDate,{ start: new Date(event.start as string), end: new Date(event.end as string) })||
        (isAfter(clickedDate, parseISO(event.start as string)) &&
          isBefore(clickedDate, parseISO(event.end as string)))
    );
    const clickedTodoList = todoList.filter((todo: any) =>
      isSameDay(parseISO(todo.due_date as string), clickedDate)
    );
    const clickedPeriod = periodList.filter((period: any) =>
      isWithinInterval(clickedDate, {
        start: parseISO(period.start as string),
        end: parseISO(period.end as string),
      })
    );
    const clickedOvu = ovuList.filter((period: any) =>
      isWithinInterval(clickedDate, {
        start: parseISO(period.start as string),
        end: parseISO(period.end as string),
      })
    );

    const calendarApi = arg.view.calendar;
    const calendarEvents = calendarApi.getEvents();
    console.log(calendarEvents[0].start);
    const publicHolidays = calendarEvents.filter(
      (event: any) =>
        event.start.toString().slice(0, 15) ===
          clickedDate.toString().slice(0, 15) &&
        event.extendedProps.description === "Public holiday"
    );
    // console.log(publicHolidays)

    setClickedEventList([...clickedEvents, ...clickedGoogleEvents]);
    setClickedTodoList(clickedTodoList);
    setClickedDiary(clickedDiary);
    setClickedPeriod(clickedPeriod);
    setClickedOvu(clickedOvu);
    setPublicHoliday(publicHolidays);
    setModalState(true);
    setModalDate(clickedDate.toString().slice(0, 15));
    setModalContent("ABC");
  };

  const handleEventDidMount = (info: any) => {
    return new bootstrap.Popover(info.el, {
      title: info.event.title,
      placement: "auto",
      trigger: "hover",
      sanitize: false,
      customClass: "popoverStyle",
      html: true,
    });
  };

  //for deletion
  // let timer: any;
  // function handlePointerDown(id:string) {
  //   timer = setTimeout(() => {
  //     console.log('Long press event detected!');
  //     setPresentAlert(true)
  //     setSelectedTodo(id)

  //   }, 500);
  // }

  // const handleAlertButtonClick = async (buttonIndex: number) => {
  //   if (buttonIndex === 1) {
  //     setPresentAlert(false)
  //     const deleteTodoListFromPreferences = async (id: string) => {
  //       const key = "todolist";
  //       const existingValue = await Preferences.get({ key });
  //       const existingData = existingValue.value ? JSON.parse(existingValue.value) : [];
  //       const newData = existingData.filter((todoList: any) => todoList.id !== id);
  //       const value = JSON.stringify(newData);
  //       await Preferences.set({ key, value });
  //       dispatch(setShouldGetDataTodo(true));
  //     }
  //   deleteTodoListFromPreferences(selectedTodo)
  //   } else if (buttonIndex === 0) {
  //     setPresentAlert(false)
  //     return;
  //   }
  // };

  // function handlePointerUp() {
  //   clearTimeout(timer);
  // }

  //for deletion
  let timer: any;
  function handlePointerDownEvent(id: string) {
    timer = setTimeout(() => {
      console.log("Long press event detected!");
      setPresentAlertEvent(true);
      setSelectedEvent(id);
    }, 500);
  }

  const handleAlertButtonClickEvent = async (buttonIndex: number) => {
    if (buttonIndex === 1) {
      setPresentAlertEvent(false);
      const deleteEventFromPreferences = async (id: string) => {
        const key = "calendar";
        const existingValue = await Preferences.get({ key });
        const existingData = existingValue.value
          ? JSON.parse(existingValue.value)
          : [];
        const newData = existingData.filter((memo: any) => memo.id !== id);
        const value = JSON.stringify(newData);
        await Preferences.set({ key, value });
        dispatch(setShouldGetDataEvent(true));
        history.push("/Calendar")
      };
      deleteEventFromPreferences(selectedEvent);
    } else if (buttonIndex === 0) {
      setPresentAlertEvent(false);
      return;
    }
  };

  function handlePointerUpEvent() {
    clearTimeout(timer);
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
            periodList,
            ovuList,
          ]}
          // eventDidMount={handleEventDidMount}
          eventClick={(event: any) => {
            // stop from redirecting to Google Calendar onclick
            event.jsEvent.preventDefault();
          }}
          dateClick={handleDateClick}
          dayMaxEventRows= {true} // for all non-TimeGrid views
        />
      </div>

      <AddEvent />

      <IonModal id="example-modal" ref={modal} isOpen={modalState}>
        <IonContent>
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
          <div className={styles.contentContainer}>
            <div className={styles.modalContentStyle}>
              <IonItemGroup>
                <IonItemDivider>
                  <IonLabel className={styles.dayViewLabel}>📢 About Today</IonLabel>
                </IonItemDivider>
              </IonItemGroup>

              <IonItemGroup>
                <IonItemDivider>
                  <IonLabel className={styles.dayViewLabel}>🔥 Public Holiday</IonLabel>
                </IonItemDivider>
                {publicHoliday.length < 1 ? (
                  <div>No Public Holiday.</div>
                ) : (
                  publicHoliday.map((holiday: any, index) => (
                    <div key={uuidv4()}>{holiday.title}</div>
                  ))
                )}
              </IonItemGroup>

              <IonItemGroup>
                <IonItemDivider>
                  <IonLabel className={styles.dayViewLabel}>📅 Events</IonLabel>
                </IonItemDivider>

                {clickedEventList.length < 1 ? (
                  <div>This day has no scheduled events.</div>
                ) : (
                  clickedEventList.map((event: any, index: any) => (
                    <div>
                      <Link
                        key={uuidv4()}
                        to={{
                          pathname: "./ModifyEvent",
                          state: { data: event, id: event.id },
                        }}
                      >
                        <IonCard
                          className={styles.calendarEventDayViewWrapper}
                          onPointerDown={() => handlePointerDownEvent(event.id)}
                          onPointerUp={handlePointerUpEvent}
                        >
                          <div className={styles.calendarPreviewTimeWrapper}>
                            <div className={styles.calendarPreviewStartTime}>
                              {event.start} &nbsp; to &nbsp;
                            </div>
                            <div className={styles.calendarPreviewEndTime}>
                              {event.end}
                            </div>
                          </div>
                          <div className={styles.calendarPreviewTextWrapper}>
                            <div className={styles.calendarPreviewTitle}>
                              {event.title}
                            </div>
                            <div className={styles.calendarPreviewDescription}>
                              {event.description}
                            </div>
                          </div>
                        </IonCard>
                      </Link>
                    </div>
                  ))
                )}
              </IonItemGroup>

              <IonItemGroup>
                <IonItemDivider>
                  <IonLabel className={styles.dayViewLabel}>📝 Todo List</IonLabel>
                </IonItemDivider>
                {clickedTodoList.length < 1 ? (
                  <div>No Todo due on this day.</div>
                ) : (
                  clickedTodoList.map((todo: any, index) => (
                    <div key={uuidv4()}>
                      <Link
                        key={index}
                        to={{
                          pathname: "./EditTodo",
                          state: { data: todo, id: todo.id },
                        }}
                        className={styles.todoListWrapper}
                      >
                        <div>{todo.title}</div>
                      </Link>
                    </div>
                  ))
                )}
              </IonItemGroup>
              {clickedPeriod.length < 1 ? (
                <div></div>
              ) : (
                <IonItemGroup>
                  <IonItemDivider>
                    <IonLabel className={styles.dayViewLabel}>🩸 Period</IonLabel>
                  </IonItemDivider>
                  {clickedPeriod.map((period: any, index) => (
                    <div key={uuidv4()}>
                      <div>
                        {"Day " +
                          Math.min(
                            Math.max(
                              differenceInDays(
                                parseISO(modalDate as string),
                                parseISO(period.start as string)
                              ) + 1,
                              1
                            ),
                            differenceInDays(
                              parseISO(period.end as string),
                              parseISO(period.start as string)
                            ) + 1
                          )}
                      </div>
                    </div>
                  ))}
                </IonItemGroup>
              )}
              {clickedOvu.length < 1 ? (
                <div></div>
              ) : (
                <IonItemGroup>
                  <IonItemDivider>
                    <IonLabel className={styles.dayViewLabel}>🌸 Ovulation Period</IonLabel>
                  </IonItemDivider>
                  {clickedOvu.map((period: any, index) => (
                    <div key={uuidv4()}>
                      {"Day " +
                        Math.min(
                          Math.max(
                            differenceInDays(
                              parseISO(modalDate as string),
                              parseISO(period.start as string)
                            ) + 1,
                            1
                          ),
                          differenceInDays(
                            parseISO(period.end as string),
                            parseISO(period.start as string)
                          ) + 1
                        )}
                    </div>
                  ))}
                </IonItemGroup>
              )}

              {isToday(new Date(modalDate)) && (
                <div>
                  <IonItemGroup>
                    <IonItemDivider>
                      <IonLabel className={styles.dayViewLabel}>📢 Health</IonLabel>
                    </IonItemDivider>
                  </IonItemGroup>

                  <Provider store={nutritionStore}>
                    <Header />
                  </Provider>
                </div>
              )}
            </div>
          </div>
   
          <IonAlert
          header="Delete this event?"
          isOpen={presentAlertEvent}
          animated={true}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              handler: () => handleAlertButtonClickEvent(0),
            },
            {
              text: "Delete",
              role: "confirm",
              handler: () => handleAlertButtonClickEvent(1),
            },
          ]}
          onDidDismiss={() => setPresentAlertEvent(false)}
        ></IonAlert>
        </IonContent>
      </IonModal>
    </>
  );
};

export default Calendar_zh;
