export let api_origin = process.env.REACT_APP_EXPRESS_SERVER_URL;

if (window.location.origin === "http://localhost:3000") {
  api_origin = "http://localhost:8090";
} else if (window.location.origin.includes("192.168")) {
  api_origin = window.location.origin.replace("3000", "8090");
} else {
  api_origin = "https://api.karaoke-gcat.me";
}
