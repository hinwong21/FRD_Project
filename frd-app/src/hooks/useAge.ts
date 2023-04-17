import useStorageState from "react-use-storage-state";

type Age = "loading" | number | undefined;

export function useAge() {
  return useStorageState<Age>("age", "loading");
}
