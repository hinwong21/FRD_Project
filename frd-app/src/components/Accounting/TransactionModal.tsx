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
import Finance, { TransactionType } from "./Finance";

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

// function TransactionModal(props: {
//   isTran: boolean;
//   close: () => void;
//   addTransaction: (transaction: TransactionType) => void;
// }) {
//   // const [selectedGenre, setSelectedGenre] = useState(0);
//   const [selectedGenre, setSelectedGenre] = useState("");
//   const [amount, setAmount] = useState<number>();
//   // function addTransaction() {
//   //   let type = Genres.find((genre) => genre.id == selectedGenre)?.name;
//   //   if (!type) return;

//   //   if (!amount) return;

//   //   // TODO ajax

//   //   props.addTransaction({ id: 1, type, amount });
//   //   props.close();
//   // }
//   return (
//     <IonModal isOpen={props.isTran}>
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonButton onClick={props.close}>Close</IonButton>
//           </IonButtons>
//           <IonTitle>Review</IonTitle>
//           {/* <IonButtons slot="end">
//             <IonButton
//               disabled={!selectedGenre || !amount}
//               onClick={addTransaction}
//             >
//               Add
//             </IonButton>
//           </IonButtons> */}
//         </IonToolbar>
//       </IonHeader>
//       <IonContent>
//         <IonList>
//           <IonItem>
//             <IonLabel>Genre</IonLabel>
//             <IonSelect
//               multiple={true}
//               compareWith={compareWith}
//               onIonChange={(ev) =>
//                 setSelectedGenre(JSON.stringify(ev.detail.value))
//               }
//               // value={selectedGenre}
//             >
//               {Genres.map((Genre) => (
//                 <IonSelectOption
//                   key={Genre.id}
//                   // value={Genre.id}
//                   value={Genre}
//                 >
//                   {Genre.name}
//                 </IonSelectOption>
//               ))}
//             </IonSelect>
//           </IonItem>
//           <IonItem lines="none">
//             {/* <IonLabel>Current value</IonLabel>
//             <IonInput
//               type="number"
//               value={amount}
//               onIonChange={(e) => setAmount(+(e.detail.value || ""))}
//             ></IonInput> */}
//             <IonLabel>Current value: {selectedGenre}</IonLabel>
//           </IonItem>
//         </IonList>
//         <Finance />
//       </IonContent>
//     </IonModal>
//   );
// }

// export default TransactionModal;

const compareWith = (o1: Genre, o2: Genre) => {
  if (!o1 || !o2) {
    return o1 === o2;
  }

  if (Array.isArray(o2)) {
    return o2.some((o) => o.id === o1.id);
  }

  return o1.id === o2.id;
};

function TransactionModal(props: {
  isTran: boolean;
  close: () => void;
  addTransaction: (transaction: TransactionType) => void;
}) {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [amount, setAmount] = useState<string>("");

  // const addTransaction = () => {
  //   if (!selectedGenre || !amount) return;

  //   const genre = JSON.parse(selectedGenre) as Genre;

  async function getTransaction() {
    let type = Genres.find((genre) => genre.name === selectedGenre)?.name;
    if (!type || !amount) return;

    // TODO ajax
    try {
      const res = await fetch(
        `${process.env.REACT_APP_EXPRESS_SERVER_URL}/account/getTransaction`
      );
      let json = await res.json();
      if (!json.ok) {
        alert(json.errMess);
      }
    } catch (error) {
      console.error(error);
      alert("error occurred");
    }

    props.addTransaction({ id: 1, type, name: "", amount });
    props.close();
  }

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
              onClick={addTransaction}
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
              onIonChange={(ev) => setSelectedGenre(ev.detail.value)}
              value={selectedGenre}
            >
              {Genres.map((genre) => (
                <IonSelectOption key={genre.id} value={JSON.stringify(genre)}>
                  {genre.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem lines="none">
            <IonLabel>
              Current value:
              {selectedGenre && JSON.parse(selectedGenre).name},
              {getTransaction()}
            </IonLabel>
            <IonInput
              type="number"
              value={amount}
              // onIonChange={(e) => setAmount(+(e.detail.value || ""))}
              onIonChange={(e) => setAmount(e.detail.value!)}
            ></IonInput>
          </IonItem>
        </IonList>
        <Finance />
      </IonContent>
    </IonModal>
  );
}

export default TransactionModal;
