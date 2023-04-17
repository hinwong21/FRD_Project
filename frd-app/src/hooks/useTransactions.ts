import { useState } from "react";
import { TransactionType } from "../components/Accounting/Finance";
import { useStorageState } from "react-use-storage-state";

/* 修改setName函式名稱為setTransaction，並加入transactions參數 */
/* 讀取transactions */
export function useTransactions() {
  const [state, setState] = useStorageState<TransactionType[]>(
    "transactions",
    []
  );
  return [state, setState] as const;
}
