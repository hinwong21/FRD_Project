"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = require("dotenv");
const populate_env_1 = __importDefault(require("populate-env"));
(0, dotenv_1.config)();
exports.env = {
    //默認是這個環境，但可以透過.env修改
    NODE_ENV: "development",
    DB_NAME: "",
    DB_USER: "",
    DB_PASSWORD: "",
    PORT: 8090,
    DB_HOST: "",
    DB_PORT: "",
    SEREST: "",
};
(0, populate_env_1.default)(exports.env, { mode: "halt" });
//# sourceMappingURL=env.js.map