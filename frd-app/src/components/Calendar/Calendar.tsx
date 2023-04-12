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
  import { Calendar_zh } from "./Calendar_zh";
  import styles from "./Calendar.module.css"
  

  export const Calendar: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    // console.log(name);
    let titleName = "";
    let fetchPage = <></>;


    return (
      <IonPage>
        <IonContent id="999" fullscreen>
        <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Calendar</IonTitle>
        </IonToolbar>
      </IonHeader>

          <div className={styles.calendarWrapper}>
          <Calendar_zh/>
          </div>
          {/* Fetch to the page that name equal to url */}
          {/* {fetchPage} */}
        </IonContent>
      </IonPage>
    );
  };
  
  export default Calendar;