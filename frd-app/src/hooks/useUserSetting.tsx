import useStorageState from "react-use-storage-state";

export type UserSetting = {
  username: string;
  height?: number;
  weight?: number;
  age?: number;
  gender?: string;
};

export function useUserSetting() {
  return useStorageState<null | UserSetting>("userSetting", null);
}

export function useIsProfileCompleted() {
  const [userSetting] = useUserSetting();
  return userSetting && userSetting.age;
}
