import { Provider } from "react-redux";
import { nutritionStore } from "../../../redux/Nutrition/store";
import Header from "./Header";
import { WaterBalance } from "./WaterBalance";
import { NutritionTracker } from "./NutritionTracker";
import style from "./Nutrition.module.scss";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { SelectDietPrgm } from "./SelectDietPrgm";

export const Nutrition = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar
          color={style.nutritionToolbar}
          className={style.nutritionToolbar}
        >
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Nutrition</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Provider store={nutritionStore}>
          <Header />
        </Provider>
        <SelectDietPrgm />
        {/* Water balance */}
        <WaterBalance />

        <Provider store={nutritionStore}>
          <NutritionTracker />
        </Provider>
      </IonContent>
    </IonPage>
  );
};
