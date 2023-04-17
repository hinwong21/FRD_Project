import { useStorageState } from "react-use-storage-state";

export function useLastCheckInTime() {
  const [lastCheckInTime, setLastCheckInTime] = useStorageState(
    "lastCheckInTime",
    0
  );

  const today6AM = new Date();
  today6AM.setHours(6, 0, 0, 0);

  const hasCheckedIn = lastCheckInTime < today6AM.getTime();

  return {
    hasCheckedIn,
    lastCheckInTime,
    setLastCheckInTime,
  };
}
