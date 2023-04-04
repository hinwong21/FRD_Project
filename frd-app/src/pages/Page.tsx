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

import Calendar from "../components/Calendar/Calendar";

import Health from "../components/Health/Health";
import { MainPage } from "../components/Main/MainPage";
import DiaryEditor from "../components/Notes/DiaryEditor";
import { Notepad } from "../components/Notes/Notepad";
import { Setting } from "../components/Set/Setting";
import { Weather } from "../components/Weather/Weather";
import { EditMemo } from "../components/Notes/Notes";

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  let fetchPage = <></>;
  switch (name) {
    case "Main":
      fetchPage = <MainPage />;
      break;
    case "Calender":
      fetchPage = <Calendar />;
      break;
    case "TodoList":
      fetchPage = <Notepad />;
      break;
    case "Weather":
      fetchPage = <Weather />;
      break;
    // case "Accounting":
    //   // titleName = "記帳";
    //   fetchPage = <AccountingPage />;
    //   break;
    case "Health":
      fetchPage = <Health />;
      break;
    case "Setting":
      fetchPage = <Setting />;
      break;
    case "EditMemo":
      fetchPage = <EditMemo />;
      break;
  }

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader> */}

      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className="titleName">
              {name}
            </IonTitle>
          </IonToolbar> */}
        {/* </IonHeader> */}
        {/* <ExploreContainer name={name} /> */}
        {/* Fetch to the page that name equal to url */}
        {fetchPage}
      </IonContent>
    </IonPage>
  );
};

export default Page;
