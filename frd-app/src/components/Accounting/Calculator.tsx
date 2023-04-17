import React, { useEffect, useState } from "react";
import { Display } from "./Display";
import { Panel } from "./Panel";
import {
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonModal,
  IonButton,
  IonButtons,
  IonLabel,
  IonInput,
} from "@ionic/react";
import { useRef } from "react";
import { TransactionType } from "./Finance";
import { Genre, Genres } from "./TransactionModal";
import { useHistory } from "react-router";
import { post } from "../../service/api";
import { useTransactions } from "../../hooks/useTransactions";

const Calculator: React.FC<{
  isOpen: boolean;
  close: () => void;
  addCalculator: (transaction: TransactionType) => void;
}> = ({ isOpen, close, addCalculator }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const name: string = "";
  const [lhs, setLHS] = useState("");
  const [operator, setOperator] = useState<string | undefined>(undefined);
  const [selectedGenre, setSelectedGenre] = useState(0);
  const history = useHistory();

  const [transactions, setTransactions] = useTransactions();

  /* Confirm button function */
  async function markCalculator() {
    const obj = [...Genres].filter((genre) => genre.id === selectedGenre)[0];
    // console.log(Genres, selectedGenre);
    if (!obj) {
      alert("Please select a Genres");
      return;
    }

    if (!result) {
      alert("Please record your price");
      return;
    }
    let newObj = Object.assign(
      obj,
      { amount: result },
      { description: description }
    );
    console.log("newObj", newObj);

    /* save data to local storage */

    setTransactions([...transactions, newObj]);

    /* Put data to database */

    await post("/account/addTransaction", newObj);
    // fetch page to Accounting
    history.push("/page/Accounting");
    addCalculator(newObj);
    clearResult();
    close();

    // /* gen by chatgpt */
    // const transaction: TransactionType = {
    //   id: 1,
    //   type: type,
    //   amount: parseFloat(result),
    // };
  }
  /* AC button function */
  function clearResult() {
    setResult("");
    setLHS("");
    setOperator(undefined);
  }

  function calculateResult() {
    const rhs = parseFloat(result);
    const leftOperand = parseFloat(lhs);
    switch (operator) {
      case "+":
        setResult((leftOperand + rhs).toString());
        break;
      case "-":
        setResult((leftOperand - rhs).toString());
        break;
      case "x":
        setResult((leftOperand * rhs).toString());
        break;
      case "÷":
        setResult((leftOperand / rhs).toString());
        break;
      default:
        break;
    }
    setLHS("");
    setOperator(undefined);
  }

  function deleteResult() {
    setResult(result.slice(0, -1));
  }
  const handleModalDIdDismiss = () => {
    console.log("Modal did dismiss");
    // props.bigState()
  };
  return (
    <>
      {/* <IonPage>
                <IonContent > */}
      {/* <IonModal isOpen={props.isOpen} onDidDismiss={handleModalDIdDismiss}> */}
      <IonModal ref={modal} isOpen={isOpen}>
        <IonButtons slot="start">
          <IonButton
            onClick={() => {
              modal.current?.dismiss();
              close();
            }}
          >
            Close
          </IonButton>
        </IonButtons>
        {/* <IonContent> */}
        <IonList>
          <IonItem>
            <IonLabel>Select Genre</IonLabel>
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
          {/* <IonItem lines="none">
              <IonLabel>Current value</IonLabel>
              <IonInput
                type="number"
                value={amount}
                onIonChange={(e) => setAmount(+(e.detail.value || ""))}
              ></IonInput>
            </IonItem> */}
          <IonItem>
            <IonLabel position="fixed">Name</IonLabel>
            <IonInput
              placeholder="Enter Description"
              value={description}
              onIonChange={(event) => setDescription(event.detail.value!)}
            ></IonInput>
          </IonItem>
        </IonList>

        <Display result={result} />
        <Panel
          operatingEvent={(element: number | string) => {
            if (isNaN(element as any)) {
              switch (element) {
                case "+":
                case "-":
                case "x":
                case "÷":
                  setLHS(result);
                  setResult("");
                  setOperator(element);
                  break;
                case "=":
                  calculateResult();
                  break;
                case "AC":
                  clearResult();
                  break;
                case "⌫":
                  deleteResult();
                  break;
                case ".":
                  if (result.indexOf(".") === -1) {
                    setResult(result + ".");
                  }
                  break;
                case "✔":
                  markCalculator(); // Call the markCalculator function
                  break;
                default:
                  break;
              }
            } else {
              setResult(result + element);
            }
          }}
        />
      </IonModal>
      {/* </IonContent>
            </IonPage> */}
      {/* </ IonModal> */}
    </>
  );
};
export default Calculator;
