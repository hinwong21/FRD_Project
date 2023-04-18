"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeriodController = void 0;
const error_1 = require("../error");
const jwt_1 = require("../jwt");
class PeriodController {
    constructor(periodService) {
        this.periodService = periodService;
        this.getUpcomingDate = async (req, res) => {
            try {
                const userId = (0, jwt_1.getJWT)(req).userId;
                console.log("Controller userID:", userId);
                const result = await this.periodService.getUpcomingAt(userId);
                res.json({ result });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.inputPeriodData = async (req, res) => {
            try {
                const id = req.body.id;
                const userId = (0, jwt_1.getJWT)(req).userId;
                const start_at = req.body.start_at;
                const end_at = req.body.end_at;
                const upcoming_at = req.body.upcoming_at;
                const days = req.body.days;
                const ovu_start_at = req.body.ovu_start_at;
                const ovu_end_at = req.body.ovu_end_at;
                await this.periodService.inputAllPeriodData(id, userId, start_at, end_at, upcoming_at, days, ovu_start_at, ovu_end_at);
                res.json({ success: true });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.updatePeriod = async (req, res) => {
            try {
                const id = req.body.id; //Period id
                const { start_at, end_at, upcoming_at, days, ovu_start_at, ovu_end_at } = req.body;
                await this.periodService.updatePeriodData({
                    period_id: id,
                    user_id: (0, jwt_1.getJWT)(req).userId,
                    fields: {
                        start_at,
                        end_at,
                        upcoming_at,
                        days,
                        ovu_start_at,
                        ovu_end_at,
                    },
                });
                res.json({ success: true });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.inputStatus = async (req, res) => {
            try {
                let user_id = (0, jwt_1.getJWT)(req).userId;
                const statusId = req.body.statusId;
                const periodId = req.body.periodId;
                const type = req.body.type;
                const content = req.body.content;
                await this.periodService.inputPeriodStatus({
                    period_id: periodId,
                    user_id,
                    type,
                    content,
                    status_id: statusId,
                });
                res.json({ success: true });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.updateStatus = async (req, res) => {
            try {
                let user_id = (0, jwt_1.getJWT)(req).userId;
                const statusId = req.body.statusId;
                const type = req.body.type;
                const content = req.body.content;
                await this.periodService.updatePeriodStatus({
                    user_id,
                    type,
                    content,
                    status_id: statusId,
                });
                res.json({ success: true });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.getStatus = async (req, res) => {
            try {
                let user_id = (0, jwt_1.getJWT)(req).userId;
                const period_id = req.body.periodId;
                const result = await this.periodService.getPeriodStatus({
                    period_id,
                    user_id,
                });
                res.json({ result });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
    }
}
exports.PeriodController = PeriodController;
//# sourceMappingURL=periodController.js.map