import { CapacitorConfig } from "@capacitor/cli";
import dotenv from "dotenv";
dotenv.config();
const config: CapacitorConfig = {
  appId: "com.noticias0218081905181021.app",
  appName: "Noticias",
  webDir: "build",
  bundledWebRuntime: false,
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["apple.com", "google.com"],
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    cordova: {},
  },
};
export default config;
