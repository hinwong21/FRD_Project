import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import Finance, { TransactionType } from "./Finance";
import { getName } from "../../service/LocalStorage/LocalStorage";
import AccountingChart from "./AccountingChart";
import { useGet } from "../../hooks/useGet";
import styles from "./TransactionModal.module.scss";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import { useToken } from "../../hooks/useToken";

export interface Genre {
  id: number;
  category: string;
  name: string;
  type: string;
  amount: number;
  description?: string;
  // user_id: string;
  // created_at: string;
}

export const Genres: Genre[] = [
  {
    id: 1,
    category: "Income",
    name: "Income",
    type: "income",
    amount: 100,
    description: "",
  },
  {
    id: 2,
    category: "Food",
    name: "Food",
    type: "expense",
    amount: 100,
    description: "",
  },
  {
    id: 3,
    category: "Drink",
    name: "Drink",
    type: "expense",
    amount: 100,
    description: "",
  },
  {
    id: 4,
    category: "Transport",
    name: "Transport",
    type: "expense",
    amount: 100,
    description: "",
  },
  {
    id: 5,
    category: "Entertainment",
    name: "Entertainment",
    type: "expense",
    amount: 100,
    description: "",
  },
  {
    id: 6,
    category: "Bill",
    name: "Bill",
    type: "expense",
    amount: 100,
    description: "",
  },
  {
    id: 7,
    category: "Consumption",
    name: "Consumption",
    type: "expense",
    amount: 100,
    description: "",
  },
  {
    id: 8,
    category: "Medical",
    name: "Medical",
    type: "expense",
    amount: 100,
    description: "",
  },
  {
    id: 9,
    category: "Electronic",
    name: "Electronic",
    type: "expense",
    amount: 100,
    description: "",
  },
];

const compareWith = (o1: Genre, o2: Genre) => {
  if (!o1 || !o2) {
    return o1 === o2;
  }

  if (Array.isArray(o2)) {
    return o2.some((o) => o.id === o1.id);
  }

  return o1.id === o2.id;
};

export type Data3 = {
  amount: number;
  totalIncome: number;
  totalExpense: number;
};
type DailyTransaction = {
  category: string;
  amount: string;
};
function TransactionModal(props: { isTran: boolean; close: () => void }) {
  // const [selectedGenre, setSelectedGenre] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState<null | string>(null);
  const [amount, setAmount] = useState<string>("");
  const [data3, setData3] = useState<Data3[]>([]);
  const [json, setJson] = useGet<DailyTransaction[]>(
    "/account/getTransaction",
    []
  );
  const [token] = useToken();

  const getTransaction = async () => {
    let type = Genres.find((obj) => obj.name === selectedGenre)?.name;
    if (!type) return;

    // TODO ajax

    // let token = await getName("token");
    // const res = await fetch(
    //   `${process.env.REACT_APP_EXPRESS_SERVER_URL}/account/getTransaction`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: "Bearer " + token,
    //       "Content-type": "application/json",
    //     },
    //   }
    // );
    // let json = await res.json();
    // console.log(json, 1);

    // const res = await fetch(
    //   `${process.env.REACT_APP_EXPRESS_SERVER_URL}/account/getTransaction`,
    //   {
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   }
    // );
    // let json = await res.json();
    // console.log(json);

    let selectedCategoryAmount = json.filter(
      (item: { category: string | undefined }) => item.category === type
    );

    let totalAmount = selectedCategoryAmount.reduce(
      (total: any, item: any) => total + item.amount,
      0
    );

    let incomeArray = json.filter(
      (item: { category: string | undefined }) => item.category === "Income"
    );

    let totalIncome = incomeArray.reduce(
      (total: any, item: any) => total + item.amount,
      0
    );

    let expensesArray = json.filter(
      (item: { category: string | undefined }) => item.category !== "Income"
    );

    let totalExpense = expensesArray.reduce(
      (total: any, item: any) => total + item.amount,
      0
    );

    setData3([
      {
        amount: totalAmount,
        totalIncome: totalIncome,
        totalExpense: totalExpense,
      },
    ]);
  };

  return (
    <IonModal isOpen={props.isTran} class={styles.close}>
      <IonHeader>
        <IonToolbar color={styles.close} class={styles.close}>
          <IonButtons slot="start">
            <IonButton onClick={props.close} class={styles.close}>
              Close
            </IonButton>
          </IonButtons>
          <IonTitle class={styles.close}>Review</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Genre</IonLabel>
            <IonSelect
              multiple={false}
              compareWith={compareWith}
              onIonChange={(ev) => setSelectedGenre(ev.detail.value.name)}
            >
              {Genres.map((Genre) => (
                <IonSelectOption
                  key={Genre.id}
                  // value={Genre.id}
                  value={Genre}
                >
                  {Genre.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          {/* <IonItem lines="none"> */}
          {/* <IonLabel>Current value</IonLabel>
            <IonInput
              type="number"
              value={amount}
              onIonChange={(e) => setAmount(+(e.detail.value || ""))}
            ></IonInput> */}

          {/* <IonLabel>
              Current value:
              {selectedGenre !== null && selectedGenre}
            </IonLabel> */}
          {/* </IonItem> */}
        </IonList>
        {data3.length > 0 && (
          <Finance
            amount={data3[0].amount}
            totalIncome={data3[0].totalIncome}
            totalExpense={data3[0].totalExpense}
          />
        )}

        <div className={styles.submitBtn}>
          <IonButton color="light" size="default" onClick={getTransaction}>
            submit
          </IonButton>
        </div>
        <div className={styles.actChartDiv}>
          <AccountingChart />
        </div>
      </IonContent>
    </IonModal>
  );
}
export default TransactionModal;
