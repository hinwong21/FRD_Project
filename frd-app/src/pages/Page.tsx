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
import { Accounting } from "../components/Accounting/Accounting";
import Calendar from "../components/Calendar/Calendar";
import ExploreContainer from "../components/ExploreContainer";
import { Health } from "../components/Health/Health";
import { MainPage } from "../components/Main/MainPage";
import { Notes } from "../components/Notes/notes";
import { Setting } from "../components/Set/Setting";
import { Weather } from "../components/Weather/Weather";

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  // console.log(name);
  // let titleName = "";
  let fetchPage = <></>;
  switch (name) {
    case "Main":
      // titleName = "主頁";
      fetchPage = <MainPage />;
      break;
    case "Calender":
      // titleName = "日曆";
      fetchPage = <Calendar />;
      break;
    case "TodoList":
      // titleName = "待辦事項";
      fetchPage = <Notes />;
      break;
    case "Weather":
      // titleName = "天氣";
      fetchPage = <Weather />;
      break;
    case "Accounting":
      // titleName = "記帳";
      fetchPage = <Accounting />;
      break;
    case "Health":
      // titleName = "生理健康";
      fetchPage = <Health />;
      break;
    case "Setting":
      // titleName = "設定";
      fetchPage = <Setting />;
      break;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className="titleName">
              {name}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name={name} /> */}
        {/* Fetch to the page that name equal to url */}
        {fetchPage}
      </IonContent>
    </IonPage>
  );
};

export default Page;
