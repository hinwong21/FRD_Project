import {
  IonPage,
  IonContent,
  IonButton,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
} from "@ionic/react";
import React, { useCallback, useEffect, useState } from "react";
import Finance from "../components/Accounting/Finance";
// import { Finance_summary } from "./Finance_summary";
import style from "./AccountingPage.module.scss";
import TransactionModal, {
  Genres,
} from "../components/Accounting/TransactionModal";
import { TransactionType } from "../components/Accounting/Finance";
import Calculator from "../components/Accounting/Calculator";
import { AccountingSetup } from "../components/Accounting/AccountingSetup";
import { AccountingHeader } from "../components/Accounting/AccountingHeader";
import { useGet } from "../hooks/useGet";
// import Transaction from "./Transaction";

// export const Accounting = () => {
//   return <div>Accounting</div>;
// };

interface TransactionTypeTemp {
  id: number;
  category: string;
  type: string;
  amount: number;
  description?: any;
  user_id: string;
  created_at: string;
}

const AccountingPage: React.FC = () => {
  const today = new Date(); // 获取当前时间
  const date = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`; // 格式化日期
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTran, setIsTran] = useState<boolean>(false);

  const [calculateResult, setCalculateResult] = useState<TransactionType[]>([]);

  const closeTrans = useCallback(() => setIsTran(false), []);
  const closeOpen = useCallback(() => setIsOpen(false), []);

  const [dailyTransactions, setDailyTransactions] = useGet<
    TransactionTypeTemp[]
  >("/account/getDailyTransaction", []);

  const addCalculator = useCallback(
    (transaction: TransactionType) =>
      setCalculateResult((calculateResult) => {
        let newTodo = [...calculateResult];
        console.log(transaction, newTodo);
        newTodo.push(transaction);

        return newTodo;
      }),
    []
  );

  const [accountBudgets] = useGet("/account/budget", { budget: 0 });
  const insertedBudget = accountBudgets.budget;

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar color={style.toolbarColor} className={style.toolbarColor}>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Accounting</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          {!insertedBudget ? (
            <AccountingSetup />
          ) : (
            <>
              <AccountingHeader />
              <div className={style.demo}>{/* <Finance_summary /> */}</div>
              {/* <div className={style.main}><Finance /></div> */}
              {/* <div className={style.cal}>{<Calculator isOpen={isOpen} bigState={() => setIsOpen(!isOpen)} />}
            {/* <Link to="/Calculator"></Link> */}
              {/* <IonButton onClick={() => { setIsOpen(true) }}>Add Transaction</IonButton></div>  */}
              {/* <Transaction isTran={isTran} tr_set={setIsTran} /> */}
              {/* <Calculator isOpen={isOpen} cb_set={setIsOpen} /> */}
              {/* <IonButton onClick={goToTransaction}>Review</IonButton> */}
              <h1 className={style.h1}>{date}</h1>
              <div className={style.list}>
                {/* <IonList>
                  {calculateResult.map((calculateResult, idx) => (
                    <IonItem key={idx}>
                      {calculateResult.name} - $
                      {calculateResult.amount.toLocaleString()}
                    </IonItem>
                  ))}
                </IonList> */}
              </div>
              <IonList>
                {dailyTransactions.map((calculateResult) => (
                  <IonItem key={calculateResult.id}>
                    {calculateResult.category + " "}
                    {calculateResult.description} - $
                    {calculateResult.amount.toLocaleString()}
                  </IonItem>
                ))}
              </IonList>
              <div className={style.button}>
                <IonButton
                  color={style.reviewBtn}
                  className={style.reviewBtn}
                  class="ion-margin"
                  expand="block"
                  onClick={() => setIsTran(true)}
                >
                  Review
                </IonButton>
                <IonButton
                  color={style.btn}
                  className={style.btn}
                  expand="block"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Add Transaction
                </IonButton>
              </div>
            </>
          )}
        </IonContent>

        <TransactionModal isTran={isTran} close={closeTrans}></TransactionModal>
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
