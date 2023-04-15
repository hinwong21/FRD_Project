import { useEffect, useState } from "react";
import { api_origin } from "../service/api";
import { useToken } from "./useToken";
import useStorageState from "react-use-storage-state";

export function useGet<T>(url: string, defaultValue: T) {
  const [token] = useToken();
  const [state, setState] = useStorageState(url, defaultValue);
  useEffect(() => {
    fetch(api_origin + url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          console.error(json.error);
          // TODO use ion toast for better UI
          alert(json.error);
        } else {
          setState(json);
        }
      });
  }, [url, token]);
  return [state, setState] as const;
}
