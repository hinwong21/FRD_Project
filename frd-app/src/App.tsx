import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import Menu from "./components/Menu";
import Page from "./pages/Page";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import AccountingPage from "./pages/AccountingPage";
import PeriodMain from "./components/Health/Period/PeriodMain";
import { Nutrition } from "./components/Health/Nutrient/Nutrition";
import PeriodCalendar from "./components/Health/Period/PeriodCanlender";
import Notepad from "./components/Notes/Notepad";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { setName } from "./service/LocalStorage/LocalStorage";
import PeriodRecord from "./components/Health/Period/PeriodRecord";
import PeriodDay from "./components/Health/Period/PeriodDay";
import { PushNotifications } from "@capacitor/push-notifications";
import { Edit } from "./components/Set/Edit";
import Memos, { EditMemo } from "./components/Notes/Memo/Memos";
import { TextEditor } from "./components/Notes/TextEditor/TextEditor";
// import {NewMemo} from "./components/Notes/AddNotePopup"
import AddNotePopup from "./components/Notes/AddNotePopup";
import { AccountingSetup } from "./components/Accounting/AccountingSetup";
import { DietProgramme } from "./components/Health/Nutrient/DietProgramme";
import { useGet } from "./hooks/useGet";
import { useToken } from "./hooks/useToken";
import { Login } from "./pages/Login/Login";
import { useAge } from "./hooks/useAge";
import { EditGender } from "./components/Set/EditGender";
import { LoginSetup } from "./components/Set/LoginSetup";

// import { Device } from "@capacitor/device";
setupIonicReact();
// const logDeviceInfo = async () => {
//   const info = await Device.getInfo();
//   if (info.platform === "web") {

//   }
// };
// logDeviceInfo();

function ProtectedRoute(props: {
  path: string;
  exact?: boolean;
  children?: ReactElement;
}) {
  const [token] = useToken();
  const [age] = useAge();
  return (
    <Route path={props.path} exact={props.exact}>
      {!token ? <Login /> : !age ? <LoginSetup /> : props.children}
    </Route>
  );
}

type User = { age?: number } | "loading";

const App: React.FC = () => {
  const [token, setToken] = useToken();
  const [user] = useGet<User>(token ? "/user/user" : "", "loading");
  const [age, setAge] = useAge();

  useEffect(() => {
    setAge(user === "loading" ? "loading" : user.age);
  }, [user]);

  const [verifyState] = useGet<{ ok: boolean | "loading" }>(
    token ? "/user/verifyToken" : "",
    { ok: "loading" as const }
  );
  if (verifyState.ok === false) {
    setToken("");
  }

  useEffect(() => {
    const main = async () => {
      await reg_push_notifications_token();
      await reg_push_notification_listeners();
    };
    main();
  }, []);

  const reg_push_notification_listeners = async () => {
    await PushNotifications.addListener("registration", async (token) => {
      console.log("Registration token: ", token.value);
      await setName("push_notification_token", token.value);
    });

    await PushNotifications.addListener("registrationError", (err) => {
      console.log("Registration error: ", err.error);
    });

    // await PushNotifications.addListener(
    //   "pushNotificationReceived",
    //   (notification) => {
    //     console.log("Push notification received: ", notification);
    //     if(notification.path===""){
    //       // goto this page
    //     }
    //   }
    // );

    // await PushNotifications.addListener(
    //   "pushNotificationActionPerformed",
    //   (notification) => {
    //     console.log(
    //       "Push notification action performed",
    //       notification.actionId,
    //       notification.inputValue
    //     );

    //     if(notification.path===""){
    //       // goto this page
    //     }
    //   }
    // );
  };
  const reg_push_notifications_token = async () => {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === "prompt") {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== "granted") {
      throw new Error("User denied permissions!");
    }

    await PushNotifications.register();
  };

  // const cbLoginFunc = useCallback(() => changeLogin, []);
  // function changeLogin() {
  //   setIsLogin(true);
  // }

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Switch>
              <ProtectedRoute path="/" exact={true}>
                <Redirect to="/page/Calender" />
              </ProtectedRoute>

              <Route path="/login" exact={true}>
                {!token ? <Login /> : <Redirect to="/" />}
              </Route>

              <ProtectedRoute path="/page/:name" exact={true}>
                <Page />
              </ProtectedRoute>

              {/* <Route path="/Transaction" exact={true}>
                < Transaction />
              </Route> */}

              <ProtectedRoute path="/Accounting" exact={true}>
                <AccountingPage />
              </ProtectedRoute>

              <ProtectedRoute path="/Notepad" exact={true}>
                <Notepad />
              </ProtectedRoute>

              <Route path="/Memos" exact={true}>
                {/* TODO use full page */}
                <Memos />
              </Route>

              {/* <Route path="/TextEditor" exact={true}>
                <TextEditor />
              </Route> */}

              <Route path="/NewNotes" exact={true}>
                <AddNotePopup />
              </Route>

              <ProtectedRoute path="/Health-period" exact={true}>
                <PeriodMain />
              </ProtectedRoute>
              <ProtectedRoute path="/Health-nutrient" exact={true}>
                <Nutrition />
              </ProtectedRoute>
              <ProtectedRoute path="/dietProgramme" exact={true}>
                <DietProgramme />
              </ProtectedRoute>
              <ProtectedRoute path="/Health-periodCalendar" exact={true}>
                <PeriodCalendar />
              </ProtectedRoute>
              <ProtectedRoute path="/Health-periodRecordDetails" exact={true}>
                <PeriodRecord />
              </ProtectedRoute>
              <ProtectedRoute path="/Health-periodDate" exact={true}>
                <PeriodDay />
              </ProtectedRoute>

              {/* Setting page: edit personal information */}
              <ProtectedRoute path="/Edit" exact={true}>
                <Edit />
              </ProtectedRoute>
              <Route path="/EditGender" exact={true}>
                <EditGender />
              </Route>

              <ProtectedRoute path="*" exact={true}>
                <div>404 not found</div>
              </ProtectedRoute>
            </Switch>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
