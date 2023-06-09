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
import React, { useEffect, useRef, useState } from "react";
import Finance, { TransactionType } from "./Finance";
import { type } from "os";

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

type Data = {
  amount: number;
  category: string;
  createdAt: string;
  type: string;
  id: number;
};

function TransactionModal(props: {
  isTran: boolean;
  close: () => void;
  addTransaction: (transaction: TransactionType) => void;
}) {
  // const [selectedGenre, setSelectedGenre] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState<null | string>(null);
  const [amount, setAmount] = useState<string>("500");
  const [data, setData] = useState<Data[]>([]);

  // useEffect(() => {
  //   getTransaction();
  // }, []);

  async function getTransaction() {
    // console.log(selectedGenre);
    let type = Genres.find((obj) => obj.name === selectedGenre)?.name;
    console.log(type, amount);
    if (!type) return;

    if (!amount) return;

    // TODO ajax
    const res = await fetch(
      `${process.env.REACT_APP_EXPRESS_SERVER_URL}/account/getTransaction`
    );
    let json = await res.json();
    // console.log(json, "ssssssssss");
    console.log(typeof json[0].amount);

    // if (!json.ok) {
    //   alert(json.errMess);
    // }
  }
  // useEffect(() => {
  //   async function getData() {
  //     let type = Genres.find((genre) => genre.name === selectedGenre)?.name;
  //     if (!type) return;

  //     if (!amount) return;

  //     const res = await fetch(
  //       `${process.env.REACT_APP_EXPRESS_SERVER_URL}/account/getTransaction`
  //     );
  //     let json = await res.json();
  //     if (!json.ok) {
  //       alert(json.errMess);

  //       props.addTransaction({ id: 1, type: "", name: "", amount });
  //     }
  //   }

  //   getData();
  // }, [selectedGenre, amount]);

  return (
    <IonModal isOpen={props.isTran}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={props.close}>Close</IonButton>
          </IonButtons>
          <IonTitle>Review</IonTitle>
          {/* <IonButtons slot="end">
            <IonButton
              disabled={!selectedGenre || !amount}
              onClick={getTransaction}
            >
              Add
            </IonButton>
          </IonButtons> */}
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
          <IonItem lines="none">
            {/* <IonLabel>Current value</IonLabel>
            <IonInput
              type="number"
              value={amount}
              onIonChange={(e) => setAmount(+(e.detail.value || ""))}
            ></IonInput> */}
            <IonLabel>
              Current value:
              {selectedGenre !== null && selectedGenre}
            </IonLabel>
          </IonItem>
        </IonList>
        {/* <Finance /> */}
        <IonButton onClick={getTransaction}>submit</IonButton>
      </IonContent>
    </IonModal>
  );
}
export default TransactionModal;