import { CapacitorConfig } from "@capacitor/cli";
import dotenv from "dotenv";
dotenv.config();
const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "ionic-app-base",
  webDir: "build",
  bundledWebRuntime: false,
  server: {
    url: process.env.REACT_APP_IP,
    cleartext: true,
  },
};
export default config;
