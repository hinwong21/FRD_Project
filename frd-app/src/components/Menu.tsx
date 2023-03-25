import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  bookmarkOutline,
  calendarOutline,
  calendarSharp,
  cashOutline,
  cashSharp,
  diamondOutline,
  diamondSharp,
  listCircleOutline,
  listCircleSharp,
  medkitOutline,
  medkitSharp,
  settingsOutline,
  settingsSharp,
  sunnyOutline,
  sunnySharp,
} from "ionicons/icons";
import "./Menu.css";

interface AppPage {
  id: number;
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    id: 1,
    title: "Main",
    url: "/page/Main",
    iosIcon: diamondOutline,
    mdIcon: diamondSharp,
  },
  {
    id: 2,
    title: "Calender",
    url: "/page/Calender",
    iosIcon: calendarOutline,
    mdIcon: calendarSharp,
  },

  {
    id: 3,
    title: "Notes",
    url: "/page/TodoList",
    iosIcon: listCircleOutline,
    mdIcon: listCircleSharp,
  },

  {
    id: 4,
    title: "Weather",
    url: "/page/Weather",
    iosIcon: sunnyOutline,
    mdIcon: sunnySharp,
  },

  {
    id: 5,
    title: "Accounting",
    url: "/Accounting",
    iosIcon: cashOutline,
    mdIcon: cashSharp,
  },
  {
    id: 6,
    title: "Health",
    url: "/page/Health",
    iosIcon: medkitOutline,
    mdIcon: medkitSharp,
  },
  {
    id: 7,
    title: "Setting",
    url: "/page/Setting",
    iosIcon: settingsOutline,
    mdIcon: settingsSharp,
  },
];

const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

const Menu: React.FC = () => {
  const location = useLocation();

  console.log("location.pathname:", location.pathname);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          {/* TODO Project name, PENDING */}
          <IonListHeader>FRD Project</IonListHeader>
          {/* TODO Show the user name or user ac here, set a variable here */}
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={appPage.id} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        {/* TODO Label Part, PENDING...Maybe Delete?  */}
        {/* <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList> */}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
