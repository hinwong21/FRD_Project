import { IonSplitPane, IonRouterOutlet } from "@ionic/react";
import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { Nutrition } from "./components/Health/Nutrient/Nutrition";
import PeriodCalendar from "./components/Health/Period/PeriodCanlender";
import PeriodMain from "./components/Health/Period/PeriodMain";
import { MainPage } from "./components/Main/MainPage";
import Menu from "./components/Menu";
import Notepad from "./components/Notes/Notepad";
import AccountingPage from "./pages/AccountingPage";
import Page from "./pages/Page";
import { Edit } from "./components/Set/Edit";

export default function RoutesIsNotLogin() {
  return (
    <IonRouterOutlet id="main">
      <Switch>
        <Route path="/login">
          <MainPage />
        </Route>

        <Route>
          <Redirect to="/login" />
        </Route>
      </Switch>
    </IonRouterOutlet>
  );
}
