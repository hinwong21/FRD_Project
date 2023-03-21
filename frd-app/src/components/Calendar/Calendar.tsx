import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
// import { Accounting } from "../Accounting/Accounting";
// import { Health } from "../Health/Health";
// import { MainPage } from "../Main/MainPage";
// import { Setting } from "../Set/Setting";
// import { Todolist } from "../TodoList/Todolist";
// import { Weather } from "../Weather/Weather";
import { Calendar_zh } from "./Calendar_zh";
import { TodoPreview } from "./TodoPreview";
import { BriefWeather } from "./BriefWeather";
import styles from "./Calendar.module.css"

const Calendar: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  // console.log(name);
  let titleName = "";
  let fetchPage = <></>;

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className={styles.calendarWrapper}>
        <Calendar_zh/>
        </div>
        {/* Fetch to the page that name equal to url */}
        {fetchPage}
      </IonContent>
    </IonPage>
  );
};

export default Calendar;
