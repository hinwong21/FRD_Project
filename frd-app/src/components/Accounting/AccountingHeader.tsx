import React, { useEffect, useState } from "react";
import styles from "./Accounting.module.scss";
import { getName } from "../../service/LocalStorage/LocalStorage";
import { useGet } from "../../hooks/useGet";

export const AccountingHeader = () => {
  const date = new Date();
  const thisYear = date.getFullYear();
  const thisMonth = date.toLocaleString("default", { month: "long" });
  const today = thisMonth + ", " + thisYear;
  const month = date.getMonth();
  const lastDayofMonth = new Date(thisYear, month + 1, 0);
  const daysLeftInMonth = lastDayofMonth.getDate() - date.getDate();

  const [budgetedAmount, setBudgetedAmount] = useState(Number);
  const [budgetedAmountThisMonth, setBudgetedAmountThisMonth] =
    useState(Number);

  const [budgetData, setBudgetData] = useGet("/account/budget", { budget: 0 });
  console.log({ budgetData });

  // not finish
  async function getMonthlyTran() {
    let token = await getName("token");
    const res = await fetch(
      `${process.env.REACT_APP_EXPRESS_SERVER_URL}/account/getMonthlyTransaction`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const json = await res.json();
    console.log(json);
  }

  useEffect(() => {
    // getBudget();
    // getMonthlyTran();
  }, []);

  return (
    <div className={styles.AccountingHeaderContainer}>
      <div>{today}</div>
      <div>Budgeted Amount</div>
      <div>$ {budgetedAmountThisMonth}</div>
      <div>This month budget: $ {budgetedAmount}</div>
      {daysLeftInMonth === 1 ? (
        <div>{daysLeftInMonth} day left in this month</div>
      ) : (
        <div>{daysLeftInMonth} days left in this month</div>
      )}
    </div>
  );
};
