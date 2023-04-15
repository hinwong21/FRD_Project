import { getName } from "./LocalStorage/LocalStorage";

export let api_origin = process.env.REACT_APP_EXPRESS_SERVER_URL;

if (window.location.origin === "http://localhost:3000") {
  api_origin = "http://localhost:8090";
} else if (window.location.origin.includes("192.168")) {
  api_origin = window.location.origin.replace("3000", "8090");
} else {
  api_origin = "https://api.karaoke-gcat.me";
}

export async function post(url: string, body: object) {
  let token = await getName("token");
  let res = await fetch(api_origin + url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  let json = await res.json();
  if (json.error) {
    console.error(json.error);
    // TODO use ion toast for better UI
    alert(json.error);
    throw new Error(json.error);
  }
  console.log(json);
  return json;
}
