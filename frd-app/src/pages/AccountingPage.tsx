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
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { getName } from "../service/LocalStorage/LocalStorage";
import { AccountingSetup } from "../components/Accounting/AccountingSetup";
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
  const [showData, setShowData] = useState<TransactionTypeTemp[]>([]);

  const closeTrans = useCallback(() => setIsTran(false), []);
  const closeOpen = useCallback(() => setIsOpen(false), []);

  const [insertedBudget, setInsertedBudget] = useState("true");

  async function getDailyData() {
    let token = await getName("token");
    const res = await fetch(
      `${process.env.REACT_APP_EXPRESS_SERVER_URL}/account/getDailyTransaction`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    let json = await res.json();
    setShowData(json);
    console.log(json);
  }

  useEffect(() => {
    getDailyData();
  }, []);

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

  useEffect(() => {
    const getBudget = async () => {
      let token = await getName("token");
      const res = await fetch(
        `${process.env.REACT_APP_EXPRESS_SERVER_URL}/account/budget`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      if (json.result.length > 0) {
        setInsertedBudget("true");
      } else {
        setInsertedBudget("false");
      }
    };
    getBudget();
  }, []);

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
          {insertedBudget === "false" ? (
            <AccountingSetup />
          ) : (
            <>
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
                {showData.map((calculateResult) => (
                  <IonItem key={calculateResult.id}>
                    {calculateResult.category} - $
                    {calculateResult.amount.toLocaleString()}
                  </IonItem>
                ))}
              </IonList>
              <div className={style.button}>
                <IonButton
                  color={style.btn}
                  className={style.btn}
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
