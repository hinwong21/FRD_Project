import Knex from "knex";
const knexConfig = require("./knexfile");

// export let knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
export let knex = Knex(knexConfig["development"]);

// async function main() {
//   const staff = await knex.select("*").from("users").where("id", ">", "0");
//   console.log(staff);
//   knex.destroy();
// }

// main();
