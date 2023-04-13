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
import DiaryEditor from "../components/Notes/Diary/DiaryEditor";
import { Notepad } from "../components/Notes/Notepad";
import { Setting } from "../components/Set/Setting";
import { Weather } from "../components/Weather/Weather";
import { EditMemo } from "../components/Notes/Memo/Memos";
import { EditDiary } from "../components/Notes/Diary/Diaries";
import { EditTodo } from "../components/Notes/Todo/TodoLists";
import AccountingPage from "./AccountingPage";

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  let fetchPage = <></>;
  switch (name) {
    // case "Main":
    //   fetchPage = <MainPage />;
    //   break;
    case "Calender":
      fetchPage = <Calendar />;
      break;
    case "TodoList":
      fetchPage = <Notepad />;
      break;
    case "Weather":
      fetchPage = <Weather />;
      break;
    case "Accounting":
      // titleName = "記帳";
      fetchPage = <AccountingPage />;
      break;
    case "Health":
      fetchPage = <Health />;
      break;
    case "Setting":
      fetchPage = <Setting />;
      break;
    case "EditMemo":
      fetchPage = <EditMemo />;
      break;

    case "EditMemo":
      fetchPage = <EditTodo />;
      break;

    case "EditDiary":
      fetchPage = <EditDiary />;
      break;
  }

  return (
    // <IonPage>
      
      /* <IonContent id="111" fullscreen> */
        
        
        
        <>        
        {fetchPage}
        </>
      // </IonContent>
    // </IonPage>
  );
};

export default Page;
