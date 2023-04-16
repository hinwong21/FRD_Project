import { useStorageState } from "react-use-storage-state";

export function usePushNotificationToken() {
  const [state, setState] = useStorageState("push_notification_token", "");
  return [state, setState] as const;
}
