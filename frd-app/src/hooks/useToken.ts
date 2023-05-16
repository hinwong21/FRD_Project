import { useStorageState } from "react-use-storage-state";

export function useToken() {
  return useStorageState("token", "");
}
