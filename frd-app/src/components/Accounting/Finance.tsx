import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, remove } from "ionicons/icons";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Finance.module.scss";

export type TransactionType = {
  id: number;
  type: string;
  name: string;
  amount: string;
  description: string;
};

const Finance = (props: {
  amount: number;
  totalIncome: number;
  totalExpense: number;
}) => {
  const [transactions, setTransactions] = React.useState<TransactionType[]>([]);
  const [type, setType] = React.useState("");
  const [amount, setAmount] = React.useState<string>("0");
  // const [data, setData] = useState<Data[]>([]);

  const today = new Date(); // 获取当前时间
  const date = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`; // 格式化日期

  // const handleAddTransaction = () => {
  //   const newTransaction: TransactionType = {
  //     id: transactions.length + 1,
  //     type,
  //     name: "",
  //     amount,
  //   };
  //   setTransactions([...transactions, newTransaction]);
  //   setType("");
  //   setAmount("0");
  // };

  const handleRemoveTransaction = (id: number) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
  };

  const incomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );
  // const totalIncome = useMemo(
  //   () =>
  //     incomeTransactions.reduce(
  //       (total, transaction) => total + parseInt(transaction.amount),
  //       0
  //     ),
  //   [transactions]
  // );
  // const totalExpense = useMemo(
  //   () =>
  //     expenseTransactions.reduce(
  //       (total, transaction) => total + parseInt(transaction.amount),
  //       0
  //     ),
  //   [transactions]
  // );
  const balance = props.totalIncome - props.totalExpense;

  return (
    <>
      <IonList>
        <div className={style.date}>
          <h1>{date}</h1>
        </div>
        {/* <IonTitle>
          <div className={style.title}>My Account</div>{" "}
        </IonTitle> */}
        {/* <IonItem>
          <div className={style.type}>
            <IonLabel>Type</IonLabel>
            <IonInput
              value={type}
              onIonChange={(e) => setType(e.detail.value!)}
            ></IonInput>
          </div>
        </IonItem> */}
        <IonItem>
          <IonLabel>Total Amount: $ {props.amount}</IonLabel>
          {/* <IonInput
            type="number"
            value={amount}
            onIonChange={(e) =>
              setAmount(parseFloat(e.detail.value!).toString())
            }
          ></IonInput> */}
        </IonItem>
      </IonList>
      <IonList>
        <div className={style.balance}>
          <IonItem>
            <IonLabel>Total Income: $ {props.totalIncome}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Total Expense: $ {props.totalExpense}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Balance: ${" " + balance.toFixed(2)}</IonLabel>
          </IonItem>
        </div>
      </IonList>
      <IonList>
        <IonItem>
          <IonLabel>Income</IonLabel>
        </IonItem>
        {incomeTransactions.map((transaction) => (
          <IonItem key={transaction.id}>
            <IonLabel>
              {transaction.type}: ${parseInt(transaction.amount).toFixed(2)}
            </IonLabel>
            <IonButton
              slot="end"
              onClick={() => handleRemoveTransaction(transaction.id)}
            >
              <IonIcon slot="icon-only" icon={remove} />
            </IonButton>
          </IonItem>
        ))}
      </IonList>
      <IonList>
        <IonItem>
          <IonLabel>Expenses</IonLabel>
        </IonItem>
        {expenseTransactions.map((transaction) => (
          <IonItem key={transaction.id}>
            <IonLabel>
              {transaction.type}: ${parseInt(transaction.amount).toFixed(2)}
            </IonLabel>
            <IonButton
              slot="end"
              onClick={() => handleRemoveTransaction(transaction.id)}
            >
              <IonIcon slot="icon-only" icon={remove} />
            </IonButton>
          </IonItem>
        ))}
      </IonList>
      {/* <IonItem>
                <Link to="/page/Calculator"><IonButton onClick={handleAddTransaction}>
                    <IonIcon slot="start" icon={add} />
                    Add Transaction
                </IonButton></Link>
            </IonItem> */}
      {/* <IonItem>
                <Link to="/page/Transaction"><IonButton onClick={handleAddTransaction}>
                    <IonIcon slot="start" icon={add} />
                    Review
                </IonButton></Link>
            </IonItem> */}
    </>
  );
};

export default Finance;
