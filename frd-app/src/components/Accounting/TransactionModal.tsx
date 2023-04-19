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
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import { useToken } from "../../hooks/useToken";
import styles from "./TransactionModal.module.css"

export interface Genre {
  id: number;
  name: string;
  type: string;
}

export const Genres: Genre[] = [
  {
    id: 1,
    name: "Income",
    type: "income",
  },
  {
    id: 2,
    name: "Food",
    type: "expense",
  },
  {
    id: 3,
    name: "Drink",
    type: "expense",
  },
  {
    id: 4,
    name: "Transport",
    type: "expense",
  },
  {
    id: 5,
    name: "Entertainment",
    type: "expense",
  },
  {
    id: 6,
    name: "Bill",
    type: "expense",
  },
  {
    id: 7,
    name: "Consumption",
    type: "expense",
  },
  {
    id: 8,
    name: "Medical",
    type: "expense",
  },
  {
    id: 9,
    name: "Electronic",
    type: "expense",
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

function TransactionModal(props: { isTran: boolean; close: () => void }) {
  // const [selectedGenre, setSelectedGenre] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState<null | string>(null);
  const [amount, setAmount] = useState<string>("");
  const [data3, setData3] = useState<Data3[]>([]);
  const [token] = useToken();

  const getTransaction = async () => {
    let type = Genres.find((obj) => obj.name === selectedGenre)?.name;
    if (!type) return;

    // TODO ajax

    const res = await fetch(
      `${process.env.REACT_APP_EXPRESS_SERVER_URL}/account/getTransaction`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
      }
    );
    let json = await res.json();
    console.log(json, 1);

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
    <IonModal isOpen={props.isTran}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={props.close}>Close</IonButton>
          </IonButtons>
          <IonTitle>Review</IonTitle>
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

        <div className={styles.submitBtn}><IonButton color="light" size="default" onClick={getTransaction} >submit</IonButton></div>
        <div className={styles.actChartDiv}>
        <AccountingChart />
        </div>
      </IonContent>
    </IonModal>
  );
}
export default TransactionModal;
