import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonRefresher,
    IonRefresherContent,
    RefresherEventDetail
  } from "@ionic/react";
  import { useParams } from "react-router";
  import { Calendar_zh } from "./Calendar_zh";
  import styles from "./Calendar.module.css"
  

  export const Calendar: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    // console.log(name);
    let titleName = "";
    let fetchPage = <></>;

    // function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    //   setTimeout(() => {
    //     // Any calls to load data go here
    //     event.detail.complete();
    //   }, 1000);
    // }
    // const calendarRef = useRef (null)

    // const onEventAdded = (event)=>{
    //   let calendarApi =  calendarRef.current.getApi();
    // }

    return (
      <IonPage>
        <IonContent fullscreen>
        {/* <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher> */}

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