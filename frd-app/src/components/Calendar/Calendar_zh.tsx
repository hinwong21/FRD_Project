import {
  useRef,
  useEffect,
  useState,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faSquare,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useGet } from "../../hooks/useGet";
import { useToken } from "../../hooks/useToken";
import AccountingChart from "../Accounting/AccountingChart";
import isSameDayOrBefore from "date-fns";
import { MainHeader } from "../Main/MainHeader";
import { api_origin } from "../../service/api";

export const Calendar_zh = () => {
  const shouldGetDataEvent = useSelector(
    (state: IRootState) => state.event.shouldGetDataEvent
  );
  const [modalState, setModalState] = useState(false);
  const [modalDate, setModalDate] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [googleCalendarEvent, setGoogleCalendarEvent] = useState([] as {}[]);
  const [localCalendarEvent, setLocalCalendarEvent] = useState([] as {}[]);
  const [todoList, setTodoList] = useState([] as {}[]);
  const [diary, setDiary] = useState([] as {}[]);
  const [period, setPeriod] = useState([] as {}[]);
  const [periodList, setPeriodList] = useState([] as {}[]);
  // const [period, sePeriod] = useGet("/period/period_calendar", []);
  const [ovuList, setOvuList] = useState([] as {}[]);
  const [presentAlertTodo, setPresentAlertTodo] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState("");
  const [presentAlertEvent, setPresentAlertEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherDataType>();
  const [periodUpcomingDate, setPeriodUpcomingDate] = useState("");
  const [periodUpcomingDateList, setPeriodUpcomingDateList] = useState(
    {} as {}
  );
  const [fortune, setFortune] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [token] = useToken();
  // console.log(token)

  useEffect(() => {
    // getGoogleCalendarEvents();
    getLocalCalendarEvents();
    getTodoList();
    getDiary();
    getPeriod();
  }, []);

  useEffect(() => {
    // getGoogleCalendarEvents();
    getLocalCalendarEvents();
    getTodoList();
    getDiary();
    getPeriod();
    getUpcomingDate();
  }, [shouldGetDataEvent]);

  useEffect(() => {
    configPeriodList();
    configOvuList();
    configPeriodUpcomingDate();
  }, [period, periodUpcomingDate]);

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
    // await getPeriodLS();
    await getPeriodDB();
  }

  const getPeriodDB = async () => {
    // try {
    const res = await fetch(`${api_origin}/period/period_calendar`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
    });
    const res_json = await res.json();
    console.log(res_json);
    setPeriod(res_json.result.periodData);
    // } catch (error) {
    //   // getPeriodLS();
    //   console.log(error);
    // }
  };

  const getUpcomingDate = async () => {
    // try {
    const res = await fetch(`${api_origin}/period/upcomingDateLatest`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
    });
    const res_json = await res.json();
    console.log(res_json);
    setPeriodUpcomingDate(res_json.result.periodData.upcoming_at);
    // } catch (error) {
    //   // const { value } = await Preferences.get({ key: "period" });
    //   // if (value !== null) {
    //   //   const periodData = JSON.parse(value);
    //   //   const latestPeriod = periodData[periodData.length - 1]; // get the latest period object
    //   //   const upcomingAt = latestPeriod.upcoming_at;
    //   //   setPeriodUpcomingDate(upcomingAt); // get the end_date of the latest period object as the upcoming_at
    //   // }
    //   console.log(error);
    // }
  };

  function configPeriodList() {
    console.log("period", period);
    setPeriodList([]);
    // console.log("periodList", periodList);
    if (period.length > 0) {
      period.forEach((item: any, index) =>
        setPeriodList([
          ...periodList,
          {
            title: "🩸Period",
            start: item.start_at,
            end: item.end_at,
            extendedProps: { description: "Upcoming at " + item.upcoming_at },
            backgroundColor: "pink",
            textColor: "white",
          },
        ])
      );
      console.log("periodList", periodList);
    } else {
      return;
    }
  }

  function configPeriodUpcomingDate() {
    console.log("period", period);
    // console.log("periodList", periodList);
    if (periodUpcomingDate !== "") {
      setPeriodUpcomingDateList({
        title: "🩸Next Period Start",
        start: periodUpcomingDate,
        end: periodUpcomingDate,
        backgroundColor: "purple",
        textColor: "white",
      });
    } else {
      return;
    }
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

    // const clickedGoogleEvents = googleCalendarEvent.filter(
    //   (event: any) =>
    //     isSameDay(parseISO(event.start as string), clickedDate) ||
    //     isSameDay(parseISO(event.end as string), clickedDate) ||
    //     // isWithinInterval(clickedDate,{ start: new Date(event.start as string), end: new Date(event.end as string) })||
    //     (isAfter(clickedDate, parseISO(event.start as string)) &&
    //       isBefore(clickedDate, parseISO(event.end as string)))
    // );

    const clickedTodoList = todoList.filter((todo: any) =>
      isSameDay(parseISO(todo.due_date as string), clickedDate)
    );

    const clickedPeriod = periodList.filter(
      (period: any) =>
        isSameDay(parseISO(period.start as string), clickedDate) ||
        isSameDay(parseISO(period.end as string), clickedDate) ||
        (isAfter(clickedDate, parseISO(period.start as string)) &&
          isBefore(clickedDate, parseISO(period.end as string)))
    );

    const clickedOvu = ovuList.filter(
      (period: any) =>
        isSameDay(parseISO(period.start as string), clickedDate) ||
        isSameDay(parseISO(period.end as string), clickedDate) ||
        (isAfter(clickedDate, parseISO(period.start as string)) &&
          isBefore(clickedDate, parseISO(period.end as string)))
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

    setClickedEventList([
      ...clickedEvents,
      // , ...clickedGoogleEvents
    ]);
    setClickedTodoList(clickedTodoList);
    setClickedDiary(clickedDiary);
    setClickedPeriod(clickedPeriod);
    setClickedOvu(clickedOvu);
    setPublicHoliday(publicHolidays);
    setModalState(true);
    setModalDate(clickedDate.toString().slice(0, 15));
    setModalContent("ABC");
  };

  // const handleEventDidMount = (info: any) => {
  //   return new bootstrap.Popover(info.el, {
  //     title: info.event.title,
  //     placement: "auto",
  //     trigger: "hover",
  //     sanitize: false,
  //     customClass: "popoverStyle",
  //     html: true,
  //   });
  // };

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
        history.push("/Calendar");
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

  //for deletion
  let timer_todo: any;
  function handlePointerDownTodo(id: string) {
    timer_todo = setTimeout(() => {
      console.log("Long press event detected!");
      setPresentAlertTodo(true);
      setSelectedTodo(id);
    }, 500);
  }

  const handleAlertButtonClickTodo = async (buttonIndex: number) => {
    if (buttonIndex === 1) {
      setPresentAlertTodo(false);
      const deleteTodoListFromPreferences = async (id: string) => {
        const key = "todolist";
        const existingValue = await Preferences.get({ key });
        const existingData = existingValue.value
          ? JSON.parse(existingValue.value)
          : [];
        const newData = existingData.filter(
          (todoList: any) => todoList.id !== id
        );
        const value = JSON.stringify(newData);
        await Preferences.set({ key, value });
        dispatch(setShouldGetDataTodo(true));
      };
      deleteTodoListFromPreferences(selectedTodo);
    } else if (buttonIndex === 0) {
      setPresentAlertTodo(false);
      return;
    }
  };

  function handlePointerUpTodo() {
    clearTimeout(timer);
  }

  type WeatherDataType = {
    temperature: number;
    humidity: number;
    uvindexValue: number;
    uvindexdesc: string;
    icon: string;
  };

  useEffect(() => {
    const todayWeather = async () => {
      let res = await fetch(
        "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en"
      );

      let json = await res.json();

      // define the change of uvIndex at night and morning
      let uvIndex = 0;
      if (typeof json.uvindex != "string") {
        uvIndex = json.uvindex.data[0].value;
      }

      let uvLevel = "";
      if (typeof json.uvindex != "string") {
        uvLevel += "(" + json.uvindex.data[0].desc + ")";
      }

      setWeatherData({
        temperature: json.temperature.data[0].value,
        humidity: json.humidity.data[0].value,
        uvindexValue: uvIndex,
        uvindexdesc: uvLevel,
        icon: json.icon,
      });
    };
    todayWeather();
  }, []);

  function isWithin5DaysBefore(dayA: any, dayB: any) {
    const timeDiff = new Date(dayB).getTime() - new Date(dayA).getTime(); // get the time difference in milliseconds
    const dayDiff = timeDiff / (1000 * 3600 * 24); // convert milliseconds to days
    return dayDiff <= 5 && dayDiff >= 0;
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
          // editable={true}
          // locale= {locale}
          contentHeight={600}
          // droppable={true}
          // selectable={true}
          nowIndicator={true}
          // longPressDelay={500}
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
            [periodUpcomingDateList],
          ]}
          // eventDidMount={handleEventDidMount}
          eventClick={(event: any) => {
            // stop from redirecting to Google Calendar onclick
            event.jsEvent.preventDefault();
          }}
          dateClick={handleDateClick}
          dayMaxEventRows={true}
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
              {isToday(new Date(modalDate)) && <MainHeader />}
              <IonItemGroup>
                <IonItemDivider>
                  <IonLabel className={styles.dayViewLabel}>
                    {isToday(new Date(modalDate))
                      ? "📢 About Today"
                      : "📢 About this day"}
                  </IonLabel>
                </IonItemDivider>
                <ul className={styles.reminderMsg}>
                  {isToday(new Date(modalDate)) &&
                  (weatherData?.icon == "53" ||
                    weatherData?.icon == "54" ||
                    weatherData?.icon == "62" ||
                    weatherData?.icon == "63" ||
                    weatherData?.icon == "64" ||
                    weatherData?.icon == "65") ? (
                    <li>
                      There's a high probability of rain today, so don't forget
                      to bring your umbrella with you.
                    </li>
                  ) : weatherData?.icon == "50" || weatherData?.icon == "51" ? (
                    <li>
                      It's sunny for most of the day today, so don't forget to
                      apply sunscreen.
                    </li>
                  ) : weatherData?.icon == "90" || weatherData?.icon == "91" ? (
                    <li>
                      It's quite hot today, so remember to drink plenty of water
                      and avoid staying outdoors for extended periods of time.
                    </li>
                  ) : (
                    <div></div>
                  )}
                  {clickedPeriod.length > 0 ? (
                    <Link
                      to={{
                        pathname: "./Health",
                      }}
                      className={styles.periodMsg}
                    >
                      <li>
                        {" "}
                        Stay healthy and happy during your period. You may watch
                        some advice in Health page.{" "}
                      </li>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                  {isWithin5DaysBefore(modalDate, periodUpcomingDate) ? (
                    <li className={styles.periodMsgUpcoming}>
                      Your next menstrual period is coming, please be prepared
                      with enough medicine and menstrual products.
                    </li>
                  ) : (
                    <div></div>
                  )}
                </ul>
              </IonItemGroup>

              {publicHoliday.length > 0 && (
                <IonItemGroup>
                  <IonItemDivider>
                    <IonLabel className={styles.dayViewLabel}>
                      🔥 Public Holiday
                    </IonLabel>
                  </IonItemDivider>
                  {publicHoliday.map((holiday: any, index) => (
                    <div key={uuidv4()} className={styles.emptyMsg}>
                      {holiday.title}
                    </div>
                  ))}
                </IonItemGroup>
              )}

              <IonItemGroup>
                <IonItemDivider>
                  <IonLabel className={styles.dayViewLabel}>📅 Events</IonLabel>
                </IonItemDivider>

                {clickedEventList.length < 1 ? (
                  <div className={styles.emptyMsg}>
                    This day has no scheduled events.
                  </div>
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
                  <IonLabel className={styles.dayViewLabel}>
                    📝 Todo List
                  </IonLabel>
                </IonItemDivider>
                {clickedTodoList.length < 1 ? (
                  <div className={styles.emptyMsg}>
                    No Todo due on this day.
                  </div>
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
                        <IonCard
                          className={styles.todoListWrapper2}
                          onPointerDown={() => handlePointerDownTodo(todo.id)}
                          onPointerUp={handlePointerUpTodo}
                        >
                          <div className={styles.todoProgressIcon}>
                            {todo.task.some(
                              (taskItem: { checked: any }) => !taskItem.checked
                            ) ? (
                              <FontAwesomeIcon icon={faSpinner} color="red" />
                            ) : (
                              <FontAwesomeIcon
                                icon={faSquareCheck}
                                color="blue"
                              />
                            )}
                          </div>
                          <div className={styles.titleAndHashtagContainer}>
                            <div className={styles.todoListTitle}>
                              {todo.title}
                            </div>
                            <div className={styles.todoPreviewHashtag}>
                              {todo.hashtag.map(
                                (
                                  item:
                                    | string
                                    | number
                                    | boolean
                                    | ReactElement<
                                        any,
                                        string | JSXElementConstructor<any>
                                      >
                                    | ReactFragment
                                    | ReactPortal
                                    | null
                                    | undefined,
                                  index: Key | null | undefined
                                ) => (
                                  <div
                                    key={index}
                                    className={styles.todoPreviewHashtagStyle}
                                  >
                                    {item}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                          <div className={styles.todoListDate}>
                            Due on: {todo.due_date.slice(0, 10)}
                          </div>
                        </IonCard>
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
                    <IonLabel className={styles.dayViewLabel}>
                      🩸 Period
                    </IonLabel>
                  </IonItemDivider>
                  {clickedPeriod.map((period: any, index) => (
                    <div key={uuidv4()} className={styles.emptyMsg}>
                      <div>
                        {"Day " +
                          Math.min(
                            Math.max(
                              differenceInDays(
                                new Date(modalDate),
                                new Date(period.start)
                              ) + 2,
                              1
                            ),
                            differenceInDays(
                              new Date(period.end),
                              new Date(period.start)
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
                    <IonLabel className={styles.dayViewLabel}>
                      🌸 Ovulation Period
                    </IonLabel>
                  </IonItemDivider>
                  {clickedOvu.map((period: any, index) => (
                    <div key={uuidv4()} className={styles.emptyMsg}>
                      {
                        "Day " +
                          Math.min(
                            Math.max(
                              differenceInDays(
                                new Date(modalDate),
                                new Date(period.start)
                              ) + 2,
                              1
                            ),
                            differenceInDays(
                              new Date(period.end),
                              new Date(period.start)
                            ) + 1
                          )
                        // {Math.ceil((new Date(modalDate).getTime() - new Date(period.start).getTime()) / (1000 * 60 * 60 * 24))}
                      }
                    </div>
                  ))}
                </IonItemGroup>
              )}

              {isToday(new Date(modalDate)) && (
                <IonItemGroup>
                  <IonItemDivider>
                    <IonLabel className={styles.dayViewLabel}>
                      📢 Finance
                    </IonLabel>
                  </IonItemDivider>
                  <div className={styles.chartInCalendar}>
                    <AccountingChart />
                  </div>
                </IonItemGroup>
              )}

              {isToday(new Date(modalDate)) && (
                <div>
                  <IonItemGroup>
                    <IonItemDivider>
                      <IonLabel className={styles.dayViewLabel}>
                        🍔 Nutrition
                      </IonLabel>
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

          <IonAlert
            header="Delete this todolist?"
            isOpen={presentAlertTodo}
            animated={true}
            buttons={[
              {
                text: "Cancel",
                role: "cancel",
                handler: () => handleAlertButtonClickTodo(0),
              },
              {
                text: "Delete",
                role: "confirm",
                handler: () => handleAlertButtonClickTodo(1),
              },
            ]}
            onDidDismiss={() => setPresentAlertTodo(false)}
          ></IonAlert>
        </IonContent>
      </IonModal>
    </>
  );
};

export default Calendar_zh;
