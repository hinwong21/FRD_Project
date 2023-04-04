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
import { getName } from "./service/LocalStorage/LocalStorage";

setupIonicReact();

const App: React.FC = () => {
  const setIsLogin = useSetRecoilState(loginState);
  const getIsLogin = useRecoilValue(loginState);

  useEffect(() => {
    async function main() {
      let token = await getName("token");
      if (token) {
        let res = await fetch(
          `${process.env.REACT_APP_EXPRESS_SERVER_URL}/verifyToken`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        let json = await res.json();
        if (json.ok) {
          setIsLogin((isLogin) => {
            let newState = { ...isLogin };
            newState.isLogin = true;
            return newState;
          });
        } else {
          setIsLogin((isLogin) => {
            let newState = { ...isLogin };
            newState.isLogin = false;
            return newState;
          });
        }
      } else {
        setIsLogin((isLogin) => {
          let newState = { ...isLogin };
          newState.isLogin = false;
          return newState;
        });
      }
    }
    main();
  }, []);
  // const [isLogin, setIsLogin] = useState<boolean>(false);
  // const cbLoginFunc = useCallback(() => changeLogin, []);
  // function changeLogin() {
  //   setIsLogin(true);
  // }

  return (
    <IonApp>
      <IonReactRouter>
        {getIsLogin.isLogin && <RoutesIsLogin />}
        {!getIsLogin.isLogin && <RoutesIsNotLogin />}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
