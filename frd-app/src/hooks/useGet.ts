import { useEffect, useState } from "react";
import { api_origin } from "../service/api";
import { useToken } from "./useToken";
import useStorageState from "react-use-storage-state";
import { useIonToast } from "@ionic/react";

// get methods stay in useGet, post, and put methods stay in api.ts
export function useGet<T>(url: string, defaultValue: T) {
  // console.log("useGet, url:", url);
  const [token] = useToken();
  const [state, setState] = useStorageState(url, defaultValue);
  const [present, dismiss] = useIonToast();
  useEffect(() => {
    if (!url) return;
    fetch(api_origin + url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log({ url, json });
        if (json.error) {
          console.error("get error:", json.error);
          present({
            message: json.error,
            duration: 3500,
            buttons: [{ text: "Dismiss", role: "cancel", handler: dismiss }],
            color: "danger",
          });
        } else {
          setState(json);
        }
      });
  }, [url]);
  return [state, setState] as const;
}
