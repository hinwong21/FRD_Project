import { api_origin } from "../service/api";
import { useToken } from "./useToken";
import { useIonToast } from "@ionic/react";

export function useFetch<T>() {
  const [token] = useToken();
  const [present, dismiss] = useIonToast();

  return async function (method: string, url: string, body: object) {
    let res = await fetch(api_origin + url, {
      method,
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let json = await res.json();
    if (json.error) {
      console.error("post error:", json.error);
      present({
        message: json.error,
        duration: 3500,
        buttons: [{ text: "Dismiss", role: "cancel", handler: dismiss }],
        color: "danger",
      });
      throw new Error(json.error);
    }
    console.log(json);
    return json;
  };
}
