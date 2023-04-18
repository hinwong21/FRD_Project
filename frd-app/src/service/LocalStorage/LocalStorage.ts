import { Preferences } from "@capacitor/preferences";

export const setName = async (key: string, value: string) => {
  await Preferences.set({
    key: key,
    value: value,
  });
};

export const getName = async (key: string) => {
  const { value } = await Preferences.get({ key: key });

  return value;
};

export const removeName = async (key: string) => {
  await Preferences.remove({ key: key });
};
