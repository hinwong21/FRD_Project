"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingController = void 0;
const error_1 = require("../error");
const uuid_1 = require("uuid");
class AccountingController {
    constructor(accountingService) {
        this.accountingService = accountingService;
        this.addTransaction = async (req, res) => {
            try {
                let userId = req.session.userId;
                let { name, type, amount, description } = req.body;
                console.log(name, type, amount, description, userId);
                const addResult = await this.accountingService.addTransaction(
                // id,
                name, type, amount, description, userId);
                console.log("accountingController.ts", addResult);
                res.json(addResult);
                // res.json({ ok: true });
                // return;
            }
            catch (error) {
                (0, error_1.errorHandler)(error, req, res);
                throw new Error(`Error occurred while adding transaction in accountingController : ${error.message}`);
            }
        };
        this.getTransaction = async (req, res) => {
            try {
                // let userId = req.session.userId!
                let userId = req.session.userId;
                console.log(userId);
                const tranResult = await this.accountingService.getTransaction(userId);
                // const tranResult = await this.accountingService.getTransaction(req.session.userId as number)
                console.log(tranResult);
                res.json(tranResult);
                return;
            }
            catch (error) {
                (0, error_1.errorHandler)(error, req, res);
            }
        };
        this.getMonthlyTransaction = async (req, res) => {
            try {
                // let userId = req.session.userId!
                let userId = req.session.userId;
                console.log(userId);
                const getResult = await this.accountingService.getMonthlyTransaction(userId);
                // const tranResult = await this.accountingService.getTransaction(req.session.userId as number)
                console.log("accountingController : ", getResult);
                res.json(getResult);
                return;
            }
            catch (error) {
                (0, error_1.errorHandler)(error, req, res);
            }
        };
        this.getDailyTransaction = async (req, res) => {
            try {
                let userId = req.session.userId;
                console.log(userId);
                const getDailyResult = await this.accountingService.getDailyTransaction(userId);
                console.log("accountingController : ", getDailyResult);
                res.json(getDailyResult);
                return;
            }
            catch (error) {
                (0, error_1.errorHandler)(error, req, res);
            }
        };
        this.updateBudget = async (req, res) => {
            try {
                let id = (0, uuid_1.v4)();
                let userId = req.session.userId;
                let budget = req.body.budget;
                await this.accountingService.updateBudget(id, userId, budget);
            }
            catch (error) {
                (0, error_1.errorHandler)(error, req, res);
            }
        };
        this.getBudget = async (req, res) => {
            try {
                let userId = req.session.userId;
                const result = await this.accountingService.getBudget(userId);
                res.json({ result });
            }
            catch (error) {
                (0, error_1.errorHandler)(error, req, res);
            }
        };
    }
}
exports.AccountingController = AccountingController;
//# sourceMappingURL=accountingController.js.map