"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = void 0;
const knex_1 = __importDefault(require("knex"));
const knexConfig = require("./knexfile");
// export let knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
exports.knex = (0, knex_1.default)(knexConfig["development"]);
// async function main() {
//   const staff = await knex.select("*").from("users").where("id", ">", "0");
//   console.log(staff);
//   knex.destroy();
// }
// main();
//# sourceMappingURL=db.js.map