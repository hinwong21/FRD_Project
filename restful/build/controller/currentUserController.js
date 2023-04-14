"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserController = void 0;
const error_1 = require("../error");
require("../session");
const jwt_1 = require("../jwt");
const firebaseAdmin_1 = require("../firebaseAdmin");
class CurrentUserController {
    constructor(currentUserService) {
        this.currentUserService = currentUserService;
        this.verifyToken = async (req, res) => {
            try {
                let userId = req.session.userId;
                res.json({
                    ok: true,
                    isErr: null,
                    errMess: null,
                    data: userId,
                });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.getToken = async (req, res) => {
            try {
                // must checked userId is valid firebase uid
                let { userId, pushNotificationToken } = req.body;
                let user = await (0, firebaseAdmin_1.getUserByUID)(userId);
                if (!user) {
                    throw new Error("Not exist this userId in Firebase");
                }
                let { uid, displayName, email } = user;
                await this.currentUserService.createUser(uid, displayName, email, pushNotificationToken);
                let token = (0, jwt_1.createJwt)(uid);
                console.log(token);
                res.json({
                    ok: true,
                    isErr: null,
                    errMess: null,
                    data: token,
                });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.updateUser = async (req, res) => {
            try {
                // must checked userId is valid firebase uid
                let userId = req.body.userId;
                let user = req.body.user;
                await this.currentUserService.updateUser(userId, user);
                res.json({
                    ok: true,
                    isErr: null,
                    errMess: null,
                    data: null,
                });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.getUser = async (req, res) => {
            try {
                let userId = req.session.userId;
                const result = await this.currentUserService.getUser(userId);
                res.json({ result });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.updateData = async (req, res) => {
            try {
                let userId = req.session.userId;
                let height = req.body.height;
                let gender = req.body.gender;
                let age = req.body.age;
                let weight = req.body.weight;
                const result = await this.currentUserService.updateData(userId, height, gender, age, weight);
                res.json({ result });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.updateUsername = async (req, res) => {
            try {
                let userId = req.session.userId;
                let username = req.body.input;
                const result = await this.currentUserService.updateUsername(userId, username);
                res.json({ result });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.updateWeight = async (req, res) => {
            try {
                let userId = req.session.userId;
                let weight = req.body.input;
                const result = await this.currentUserService.updateWeight(userId, weight);
                res.json({ result });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.updateHeight = async (req, res) => {
            try {
                let userId = req.session.userId;
                let height = req.body.input;
                const result = await this.currentUserService.updateHeight(userId, height);
                res.json({ result });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.updateAge = async (req, res) => {
            try {
                let userId = req.session.userId;
                let age = req.body.input;
                const result = await this.currentUserService.updateAge(userId, age);
                res.json({ result });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.updateGender = async (req, res) => {
            try {
                let userId = req.session.userId;
                let gender = req.body.selectGender;
                const result = await this.currentUserService.updateGender(userId, gender);
                res.json({ result });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
    }
}
exports.CurrentUserController = CurrentUserController;
//# sourceMappingURL=currentUserController.js.map