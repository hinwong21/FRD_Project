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
    <IonSplitPane contentId="main">
      <Menu />
      <IonRouterOutlet id="main">
        <Switch>
          <Route path="/" exact={true}>
            <Redirect to="/login" />
          </Route>
          <Route path="/login" exact={true}>
            <MainPage />
          </Route>
          <Route path="/page/:name" exact={true}>
            <Redirect to="/login" />
          </Route>
          <Route path="/Accounting" exact={true}>
            <Redirect to="/login" />
          </Route>
          <Route path="/Notepad" exact={true}>
            <Redirect to="/login" />
          </Route>

        <Route path="/Health-period" exact={true}>
          <Redirect to="/login" />
        </Route>
        <Route path="/Health-nutrient" exact={true}>
          <Redirect to="/login" />
        </Route>
        <Route path="/Health-periodCalendar" exact={true}>
          <Redirect to="/login" />
        </Route>
        <Route path="/Edit" exact={true}>
          <Edit />
        </Route>
        <Route path="*" exact={true}>
          <div>404 not found</div>
        </Route>
      </Switch>
    </IonRouterOutlet>
    // </IonSplitPane>
  );
}
