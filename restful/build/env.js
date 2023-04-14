"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env_config = void 0;
const dotenv_1 = require("dotenv");
const populate_env_1 = __importDefault(require("populate-env"));
const path_1 = __importDefault(require("path"));
let p = path_1.default.join(__dirname, ".env");
(0, dotenv_1.config)({ path: p });
exports.env_config = {
    //默認是這個環境，但可以透過.env修改
    NODE_ENV: "development",
    DB_NAME: "",
    DB_USER: "",
    DB_PASSWORD: "",
    PORT: "",
    URL: "",
    DB_HOST: "",
    DB_PORT: "",
    SEREST: ""
};
(0, populate_env_1.default)(exports.env_config, { mode: "halt" });
//# sourceMappingURL=env.js.map