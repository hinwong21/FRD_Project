import { CapacitorConfig } from "@capacitor/cli";
import dotenv from "dotenv";
dotenv.config();
const config: CapacitorConfig = {
  appId: "com.0218081905181021noticias.app",
  appName: "noticias",
  webDir: "build",
  bundledWebRuntime: false,
  server: {
    url: process.env.REACT_APP_IP,
    cleartext: true,
  },
};
export default config;
