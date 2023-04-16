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
import Calculator from "./components/Accounting/Calculator";
import AccountingPage from "./pages/AccountingPage";
import PeriodMain from "./components/Health/Period/PeriodMain";
import { Nutrition } from "./components/Health/Nutrient/Nutrition";
import PeriodCalendar from "./components/Health/Period/PeriodCanlender";
import Notepad from "./components/Notes/Notepad";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "./atoms";
import { MainPage } from "./components/Main/MainPage";
import RoutesIsLogin from "./RoutesIsLogin";
import RoutesIsNotLogin from "./RoutesIsNotLogin";
import {
  getName,
  removeName,
  setName,
} from "./service/LocalStorage/LocalStorage";
import PeriodRecord from "./components/Health/Period/PeriodRecord";
import PeriodDay from "./components/Health/Period/PeriodDay";
import { PushNotifications } from "@capacitor/push-notifications";
import { Edit } from "./components/Set/Edit";
import { EditMemo } from "./components/Notes/Memo/Memos";
import { TextEditor } from "./components/Notes/TextEditor/TextEditor";
// import {NewMemo} from "./components/Notes/AddNotePopup"
import AddNotePopup from "./components/Notes/AddNotePopup";
import { AccountingSetup } from "./components/Accounting/AccountingSetup";
import { DietProgramme } from "./components/Health/Nutrient/DietProgramme";
import { useGet } from "./hooks/useGet";
import { useToken } from "./hooks/useToken";

// import { Device } from "@capacitor/device";
setupIonicReact();
// const logDeviceInfo = async () => {
//   const info = await Device.getInfo();
//   if (info.platform === "web") {

//   }
// };
// logDeviceInfo();
const App: React.FC = () => {
  const [token, setToken] = useToken();

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

  // const [isLogin, setIsLogin] = useState<boolean>(false);
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
              <Route path="/" exact={true}>
                <Redirect to="/page/Main" />
              </Route>
              <Route path="/page/:name" exact={true}>
                <Page />
              </Route>

              {/* <Route path="/Transaction" exact={true}>
                < Transaction />
              </Route> */}

              <Route path="/Accounting" exact={true}>
                <AccountingPage />
              </Route>

              <Route path="/Notepad" exact={true}>
                <Notepad />
              </Route>

              {/* <Route path="/TextEditor" exact={true}>
                <TextEditor />
          </Route>

          <Route path="/NewNotes" exact={true}>
                <AddNotePopup />
          </Route> */}

              <Route path="/Health-period" exact={true}>
                <PeriodMain />
              </Route>
              <Route path="/Health-nutrient" exact={true}>
                <Nutrition />
              </Route>
              <Route path="/dietProgramme" exact={true}>
                <DietProgramme />
              </Route>
              <Route path="/Health-periodCalendar" exact={true}>
                <PeriodCalendar />
              </Route>
              <Route path="/Health-periodRecordDetails" exact={true}>
                <PeriodRecord />
              </Route>
              <Route path="/Health-periodDate" exact={true}>
                <PeriodDay />
              </Route>

              {/* Setting page: edit personal information */}
              <Route path="/Edit" exact={true}>
                <Edit />
              </Route>

              <Route path="*" exact={true}>
                <div>404 not found</div>
              </Route>
            </Switch>
          </IonRouterOutlet>
        </IonSplitPane>
        {token ? <RoutesIsLogin /> : <RoutesIsNotLogin />}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
