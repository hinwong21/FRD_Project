import { CapacitorConfig } from "@capacitor/cli";
import { data } from "./GoogleCalendarClient";

const config: CapacitorConfig = {
  appId: "com.devdactic.capalogin",
  appName: "NOTICIAS",
  "bundledWebRuntime": false,
  webDir: "www",
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId: data.client_id,
      forceCodeForRefreshToken: true,
      grantOfflineAccess: true,
    },
  },
};

export default config;
