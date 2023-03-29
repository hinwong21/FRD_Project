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
import DiaryEditor from "./components/Notes/DiaryEditor";
import PeriodMain from "./components/Health/Period/PeriodMain";
import HealthNutrition from "./components/Health/Nutrient/HealthNutrition";
import PeriodCalendar from "./components/Health/Period/PeriodCanlender";

setupIonicReact();

const App: React.FC = () => {
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
              <Route path="/Diaryeditor" exact={true}>
                <DiaryEditor />
              </Route>

              <Route path="/Health-period" exact={true}>
                <PeriodMain />
              </Route>
              <Route path="/Health-nutrient" exact={true}>
                <HealthNutrition />
              </Route>
              <Route path="/Health-periodCalendar" exact={true}>
                <PeriodCalendar />
              </Route>
            </Switch>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
