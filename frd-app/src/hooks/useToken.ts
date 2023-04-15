import { useState } from "react";
import { TransactionType } from "../components/Accounting/Finance";
import { useStorageState } from "react-use-storage-state";

export function useToken() {
  const [state, setState] = useStorageState("token", "");
  return [state, setState] as const;
}
