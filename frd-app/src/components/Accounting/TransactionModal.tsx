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
import React, { useRef, useState } from "react";
import { TransactionType } from "./Finance";

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

export let Transaction: React.FC<{
  isTran: boolean;
  tr_set: (b: boolean) => void;
}> = ({ isTran, tr_set }) => {
  const [currentGenre, setCurrentGenre] = useState("");
  const modal = useRef<HTMLIonModalElement>(null);
  return (
    <IonModal ref={modal} isOpen={isTran}>
      <IonButtons slot="start">
        <IonButton
          onClick={() => {
            modal.current?.dismiss();
            tr_set(false);
          }}
        >
          Close
        </IonButton>
      </IonButtons>
      <IonList>
        <IonItem>
          <IonSelect
            placeholder="Select Genre"
            compareWith={compareWith}
            onIonChange={(ev) =>
              setCurrentGenre(JSON.stringify(ev.detail.value))
            }
            multiple={true}
          >
            {Genres.map((Genre) => (
              <IonSelectOption key={Genre.id} value={Genre}>
                {Genre.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem lines="none">
          <IonLabel>Current value: {currentGenre}</IonLabel>
        </IonItem>
      </IonList>
    </IonModal>
  );
};

function TransactionModal(props: {
  isTran: boolean;
  close: () => void;
  addTransaction: (transaction: TransactionType) => void;
}) {
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [amount, setAmount] = useState<number>();
  function addTransaction() {
    let type = Genres.find((genre) => genre.id == selectedGenre)?.name;
    if (!type) return;

    if (!amount) return;

    // TODO ajax

    props.addTransaction({ id: 1, type, amount });
    props.close();
  }
  return (
    <IonModal isOpen={props.isTran}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={props.close}>Close</IonButton>
          </IonButtons>
          <IonTitle>Add Transaction</IonTitle>
          <IonButtons slot="end">
            <IonButton
              disabled={!selectedGenre || !amount}
              //multiple
              onClick={addTransaction}
            >
              Add
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Genre</IonLabel>
            <IonSelect
              onIonChange={(ev) => setSelectedGenre(ev.detail.value)}
              value={selectedGenre}
            >
              {Genres.map((Genre) => (
                <IonSelectOption key={Genre.id} value={Genre.id}>
                  {Genre.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem lines="none">
            <IonLabel>Current value</IonLabel>
            <IonInput
              type="number"
              value={amount}
              onIonChange={(e) => setAmount(+(e.detail.value || ""))}
            ></IonInput>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
}

export default TransactionModal;
