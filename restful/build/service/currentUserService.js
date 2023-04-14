"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserService = void 0;
const firebaseAdmin_1 = require("../firebaseAdmin");
class CurrentUserService {
    constructor(knex) {
        this.knex = knex;
        this.createUser = async (userId, username, email, pushNotificationToken) => {
            let [user] = await this.knex("users").select("*").where("id", userId);
            if (!user) {
                // insert DB
                await this.knex("users").insert({
                    id: userId,
                    username: username,
                    email: email,
                    push_notification_token: pushNotificationToken,
                });
            }
            return;
        };
        this.updateUser = async (userId, user) => {
            let txn = await this.knex.transaction();
            try {
                await txn("users").update(user).where("id", userId);
                await (0, firebaseAdmin_1.updateUserByUID)(userId, user);
                await txn.commit();
            }
            catch (err) {
                await txn.rollback();
                throw new Error(`${err.message}`);
            }
        };
        this.getUser = async (userId) => {
            try {
                let user = await this.knex("users").select("*").where({ id: userId });
                return user;
            }
            catch (err) {
                throw new Error(`${err.message}`);
            }
        };
        this.updateData = async (userId, height, gender, age, weight) => {
            try {
                await this.knex("users")
                    .update({
                    height,
                    gender,
                    age,
                    weight,
                })
                    .where({ id: userId });
            }
            catch (err) {
                throw new Error(`${err.message}`);
            }
        };
        this.updateUsername = async (userId, username) => {
            try {
                await this.knex("users").update({ username }).where({ id: userId });
            }
            catch (err) {
                throw new Error(`${err.message}`);
            }
        };
        this.updateWeight = async (userId, weight) => {
            try {
                await this.knex("users").update({ weight }).where({ id: userId });
            }
            catch (err) {
                throw new Error(`${err.message}`);
            }
        };
        this.updateHeight = async (userId, height) => {
            try {
                await this.knex("users").update({ height }).where({ id: userId });
            }
            catch (err) {
                throw new Error(`${err.message}`);
            }
        };
        this.updateAge = async (userId, age) => {
            try {
                await this.knex("users").update({ age }).where({ id: userId });
            }
            catch (err) {
                throw new Error(`${err.message}`);
            }
        };
        this.updateGender = async (userId, gender) => {
            try {
                await this.knex("users").update({ gender }).where({ id: userId });
            }
            catch (err) {
                throw new Error(`${err.message}`);
            }
        };
        this.knex = knex;
    }
}
exports.CurrentUserService = CurrentUserService;
//# sourceMappingURL=currentUserService.js.map