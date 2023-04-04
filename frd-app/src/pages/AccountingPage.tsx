import {
  IonPage,
  IonContent,
  IonButton,
  IonModal,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { useCallback, useRef, useState } from "react";
import Finance from "../components/Accounting/Finance";
// import { Finance_summary } from "./Finance_summary";
import style from "./AccountingPage.module.scss";
import { useHistory } from "react-router";
import TransactionModal, {
  Genres,
} from "../components/Accounting/TransactionModal";
import { TransactionType } from "../components/Accounting/Finance";
import Calendar from "../components/Calendar/Calendar";
import Calculator from "../components/Accounting/Calculator";
import { Finance_summary } from "../components/Accounting/Finance_summary";
// import Transaction from "./Transaction";

// export const Accounting = () => {
//   return <div>Accounting</div>;
// };

const AccountingPage: React.FC = () => {
  const today = new Date(); // 获取当前时间
  const date = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`; // 格式化日期
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTran, setIsTran] = useState<boolean>(false);
  const history = useHistory();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [calculateResult, setCalculateResult] = useState<TransactionType[]>([]);

  const closeTrans = useCallback(() => setIsTran(false), []);
  const closeOpen = useCallback(() => setIsOpen(false), []);

  const addCalculator = useCallback(
    (transaction: TransactionType) =>
      setCalculateResult((calculateResult) => [
        ...calculateResult,
        transaction,
      ]),
    []
  );

  const addTransaction = useCallback(
    (transaction: TransactionType) =>
      setTransactions((transactions) => [...transactions, transaction]),
    []
  );

  const goToTransaction = () => {
    history.push("/Transaction");
  };
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Accounting</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <div className={style.demo}>{/* <Finance_summary /> */}</div>
          {/* <div className={style.main}><Finance /></div> */}
          {/* <Accounting /> */}
          {/* <div className={style.cal}>{<Calculator isOpen={isOpen} bigState={() => setIsOpen(!isOpen)} />}
            {/* <Link to="/Calculator"></Link> */}
          {/* <IonButton onClick={() => { setIsOpen(true) }}>Add Transaction</IonButton></div>  */}
          {/* <Transaction isTran={isTran} tr_set={setIsTran} /> */}
          {/* <Calculator isOpen={isOpen} cb_set={setIsOpen} /> */}
          {/* <IonButton onClick={goToTransaction}>Review</IonButton> */}
          <h1>{date}</h1>
          <div className={style.list}>
            <IonList>
              {transactions.map((transaction) => (
                <IonItem key={transaction.id}>
                  {transaction.name} - ${transaction.amount.toLocaleString()}
                </IonItem>
              ))}
            </IonList>
            <IonList>
              {calculateResult.map((calculateResult) => (
                <IonItem key={calculateResult.id}>
                  {calculateResult.name} - $
                  {calculateResult.amount.toLocaleString()}
                </IonItem>
              ))}
            </IonList>
          </div>
          <div className={style.button}>
            <IonButton expand="block" onClick={() => setIsTran(true)}>
              Review
            </IonButton>
            <IonButton
              expand="block"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Add Transaction
            </IonButton>
          </div>
        </IonContent>

        <TransactionModal
          isTran={isTran}
          close={closeTrans}
          addTransaction={addTransaction}
        ></TransactionModal>
        <Calculator
          isOpen={isOpen}
          close={closeOpen}
          addCalculator={addCalculator}
        ></Calculator>
      </IonPage>
    </>
  );
};

export default AccountingPage;
