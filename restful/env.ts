import { config } from "dotenv";
import populateEnv from "populate-env";
import path from "path";
let p = path.join(__dirname, ".env");
config({ path: p });

export let env_config = {
  //默認是這個環境，但可以透過.env修改
  NODE_ENV: "development",
  DB_NAME: "",
  DB_USER: "",
  DB_PASSWORD: "",
  PORT: "",
  URL: "",
  DB_HOST: "",
};

populateEnv(env_config, { mode: "halt" });
