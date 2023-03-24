import React, { useState } from 'react';
import logo from './logo.svg';
import { Display } from './Display';
import { Panel } from './Panel';
import { IonList, IonItem, IonSelect, IonSelectOption, IonModal } from '@ionic/react';

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

function Calculator(
    // props: { isOpen: boolean, bigState: () => void }
) {
    const [result, setResult] = useState("");
    const [lhs, setLHS] = useState("");
    const [operator, setOperator] = useState<string | undefined>(undefined);

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
        console.log('Modal did dismiss');
        // props.bigState()
    }
    return (
        <>
            {/* <IonModal isOpen={props.isOpen} onDidDismiss={handleModalDIdDismiss}> */}

            <IonList>
                <IonItem>
                    <IonSelect placeholder="Select Genre">
                        <IonSelectOption value="income">Income</IonSelectOption>
                        <IonSelectOption value="food">Food</IonSelectOption>
                        <IonSelectOption value="drink">Drink</IonSelectOption>
                        <IonSelectOption value="transport">Transport</IonSelectOption>
                        <IonSelectOption value="entertainment">Entertainment</IonSelectOption>
                        <IonSelectOption value="bill">Bill</IonSelectOption>
                        <IonSelectOption value="consumption">Consumption</IonSelectOption>
                        <IonSelectOption value="medical">Medical</IonSelectOption>
                        <IonSelectOption value="electronic">Electronic</IonSelectOption>
                    </IonSelect>
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
                            case "delete":
                                deleteResult();
                                break;
                            case ".":
                                if (result.indexOf(".") === -1) {
                                    setResult(result + ".");
                                }
                                break;
                            default:
                                break;
                        }
                    } else {
                        setResult(result + element);
                    }
                }}
            />
            {/* </ IonModal> */}
        </>
    )
}
export default Calculator;
