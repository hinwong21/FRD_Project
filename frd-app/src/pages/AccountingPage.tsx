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
// import Finance from "./Finance";
// import { Finance_summary } from "./Finance_summary";
import style from "./AccountingPage.module.scss";
// import Calculator from "./Calculator";
import { useHistory } from "react-router";
import TransactionModal, {
  Genres,
} from "../components/Accounting/TransactionModal";
import { TransactionType } from "../components/Accounting/Finance";
// import Transaction from "./Transaction";

// export const Accounting = () => {
//   return <div>Accounting</div>;
// };

const AccountingPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTran, setIsTran] = useState<boolean>(false);
  const history = useHistory();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const closeTrans = useCallback(() => setIsTran(false), []);

  const addTransaction = useCallback(
    (transaction: TransactionType) =>
      setTransactions((transactions) => [...transactions, transaction]),
    []
  );

  const goToTransaction = () => {
    history.push("/Transaction");
    // console.log('fei hui transaction');
  };
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>記帳</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          {/* <div className={style.demo}><Finance_summary /></div> */}
          {/* <div className={style.main}><Finance /></div> */}
          {/* <Accounting /> */}
          {/* <div className={style.cal}>{<Calculator isOpen={isOpen} bigState={() => setIsOpen(!isOpen)} />}
            {/* <Link to="/Calculator"></Link> */}
          {/* <IonButton onClick={() => { setIsOpen(true) }}>Add Transaction</IonButton></div>  */}
          {/* <Transaction isTran={isTran} tr_set={setIsTran} /> */}
          {/* <Calculator isOpen={isOpen} cb_set={setIsOpen} /> */}

          {/* <IonButton onClick={goToTransaction}>Review</IonButton> */}
          <IonButton expand="block" onClick={() => setIsTran(true)}>
            Review
          </IonButton>
          <IonButton expand="block" onClick={() => setIsTran(true)}>
            Add Transaction
          </IonButton>

          <IonList>
            {transactions.map((transaction) => (
              <IonItem key={transaction.id}>
                {transaction.type} - ${transaction.amount.toLocaleString()}
              </IonItem>
            ))}
          </IonList>
        </IonContent>

        <TransactionModal
          isOpen={isTran}
          close={closeTrans}
          addTransaction={addTransaction}
        ></TransactionModal>
      </IonPage>
    </>
  );
};

export default AccountingPage;
