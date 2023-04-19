import { config } from "dotenv";
import populateEnv from "populate-env";

config();

export let env = {
  //默認是這個環境，但可以透過.env修改
  REACT_APP_IP: "http://192.168.160.135:3000",
  EXPRESS_SERVER_URL: "http://localhost:8090",
};

populateEnv(env, { mode: "halt" });
