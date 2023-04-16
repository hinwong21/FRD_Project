import { useStorageState } from "react-use-storage-state";

type DailyCheckIn = {
  check: "Checked In";
  date: string; // Date ISO string
} | null;

export function useDailyCheckIn() {
  const [state, setState] = useStorageState<DailyCheckIn>("dailyCheckIn", null);
  return [state, setState] as const;
}
