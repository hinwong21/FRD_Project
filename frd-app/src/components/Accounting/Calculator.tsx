import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
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
  IonContent,
  IonPage,
  IonLabel,
  IonInput,
} from "@ionic/react";
import { useRef } from "react";
import { TransactionType } from "./Finance";
import { Genres } from "./TransactionModal";

import { log } from "console";

// function Calculator() {
//     const [result, setResult] = useState("");
//     const [lhs, setLHS] = useState(0);
//     const [operator, setOperator] = useState<string | undefined>(undefined);

//     return (
//         <>
//             <Display result={result} />
//             <Panel operatingEvent={(element: number | string) => {
//                 if (isNaN(element as any)) {
//                     switch (element) {
//                         case "+":
//                             setLHS(parseInt(result));
//                             setResult("");
//                             setOperator("+");
//                             break;
//                         case "-":
//                             setLHS(parseInt(result));
//                             setResult("");
//                             setOperator("-");
//                             break;
//                         case "x":
//                             setLHS(parseInt(result));
//                             setResult("");
//                             setOperator("*");
//                             break;
//                         case "÷":
//                             setLHS(parseInt(result));
//                             setResult("");
//                             setOperator("/");
//                             break;
//                         case "=":
//                             const rhs = parseInt(result);
//                             switch (operator) {
//                                 case "+":
//                                     setResult((lhs + rhs).toString());
//                                     //setResult(currentValue=>currentValue+"00")
//                                     break;
//                                 case "-":
//                                     setResult((lhs - rhs).toString());
//                                     break;
//                                 case "x":
//                                     setResult((lhs * rhs).toString());
//                                     break;
//                                 case "÷":
//                                     setResult((lhs / rhs).toString());
//                                     break;

//                             }
//                             break;
//                         case "AC":

//                             break;
//                     }
//                 } else {
//                     setResult(result + element)
//                 }
//             }} />
//         </>
//     );
// }

// export default Calculator;

// function Calculator() {
//     const [result, setResult] = useState("");
//     const [lhs, setLHS] = useState(0);
//     const [operator, setOperator] = useState<string | undefined>(undefined);

//     function clearResult() {
//         setResult("");
//         setLHS(0);
//         setOperator(undefined);
//     }

//     function calculateResult() {
//         const rhs = parseInt(result);
//         switch (operator) {
//             case "+":
//                 setResult((lhs + rhs).toString());
//                 break;
//             case "-":
//                 setResult((lhs - rhs).toString());
//                 break;
//             case "x":
//                 setResult((lhs * rhs).toString());
//                 break;
//             case "÷":
//                 setResult((lhs / rhs).toString());
//                 break;
//             default:
//                 break;
//         }
//         setLHS(0);
//         setOperator(undefined);
//     }

//     return (
//         <>
//             <Display result={result} />
//             <Panel
//                 operatingEvent={(element: number | string) => {
//                     if (isNaN(element as any)) {
//                         switch (element) {
//                             case "+":
//                             case "-":
//                             case "x":
//                             case "÷":
//                                 setLHS(parseInt(result));
//                                 setResult("");
//                                 setOperator(element);
//                                 break;
//                             case "=":
//                                 calculateResult();
//                                 break;
//                             case "AC":
//                                 clearResult();
//                                 break;
//                             default:
//                                 break;
//                         }
//                     } else {
//                         setResult(result + element);
//                     }
//                 }}
//             />
//         </>
//     );
// }

// export default Calculator;

let Calculator: React.FC<{
  isOpen: boolean;
  close: () => void;
  addCalculator: (transaction: TransactionType) => void;
}> = ({ isOpen, close, addCalculator }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [amount, setAmount] = useState<number>();
  const [result, setResult] = useState("");
  const [lhs, setLHS] = useState("");
  const [operator, setOperator] = useState<string | undefined>(undefined);
  const [selectedGenre, setSelectedGenre] = useState(0);

  /* Confirm button function */
  async function markCalculator() {
    const obj = Genres.filter((genre) => genre.id === selectedGenre)[0];
    // console.log(Genres, selectedGenre);
    if (!obj) {
      alert("Please select a Genres");
      return;
    }

    if (!result) {
      alert("Please record your price");
      return;
    }
    let newObj = Object.assign(obj, { amount: result });

    /* Put data to database */
    // useEffect(() => {
    //   const putAmountDate = async () => {
    try {
      let res = await fetch(
        `${process.env.REACT_APP_EXPRESS_SERVER_URL}/account/addTransaction`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newObj),
        }
      );
      console.log("jsoned");
      let json = await res.json();

      // if (!res.ok) {
      if (!json.ok) {
        alert(json.errMess);
      }
      addCalculator(newObj);
      clearResult();
      close();
    } catch (error) {
      console.error(error);
      alert("error occurred");
    }
    //   };
    //   putAmountDate();
    // }, []);
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
        </IonList>
        {/* </IonContent> */}
        {/* <IonList>
          <IonItem>
            <IonSelect placeholder="Select Genre">
              <IonSelectOption value="income">Income</IonSelectOption>
              <IonSelectOption value="food">Food</IonSelectOption>
              <IonSelectOption value="drink">Drink</IonSelectOption>
              <IonSelectOption value="transport">Transport</IonSelectOption>
              <IonSelectOption value="entertainment">
                Entertainment
              </IonSelectOption>
              <IonSelectOption value="bill">Bill</IonSelectOption>
              <IonSelectOption value="consumption">Consumption</IonSelectOption>
              <IonSelectOption value="medical">Medical</IonSelectOption>
              <IonSelectOption value="electronic">Electronic</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList> */}
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
