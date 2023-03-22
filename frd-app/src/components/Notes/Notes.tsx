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
  import styles from "./Calendar.module.css"
  
// 顯示所有notes，包括diary, memos, todolists (sql get)

  export const Notes: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    // console.log(name);
    let titleName = "";
    let fetchPage = <></>;
  
    return (
      <IonPage>
        <IonContent fullscreen>
          <div className={styles.calendarWrapper}>
          </div>
          {/* Fetch to the page that name equal to url */}
          {fetchPage}
        </IonContent>
      </IonPage>
    );
  };
  
  export default Notes;