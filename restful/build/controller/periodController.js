"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeriodController = void 0;
const error_1 = require("../error");
class PeriodController {
    constructor(periodService) {
        this.periodService = periodService;
        this.getUpcomingDate = async (req, res) => {
            try {
                // const userId = req.session.userId!;
                const userId = "bb0ae5bc-5047-45cc-8aeb-b05e65fd11c3";
                const result = await this.periodService.getUpcomingAt(userId);
                console.log(result);
                res.json({ result });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.inputPeriodData = async (req, res) => {
            try {
                // const id = req.body.id;
                const id = "eefff545";
                // const userId = req.session.userId!;
                const userId = "bb0ae5bc-5047-45cc-8aeb-b05e65fd11c3";
                const start_at = req.body.start_at;
                const end_at = req.body.end_at;
                // const upcoming_at = req.body.upcoming;
                const upcoming_at = req.body.upcoming_at;
                const days = req.body.days;
                const ovu_start_at = req.body.ovu_start_at;
                const ovu_end_at = req.body.ovu_end_at;
                const result = await this.periodService.inputAllPeriodData(id, userId, start_at, end_at, upcoming_at, days, ovu_start_at, ovu_end_at);
                res.json({ result });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.updatePeriod = async (req, res) => {
            try {
                // const id = req.body.id; //Period id
                const id = "77"; //Period id
                const start_at = req.body?.start_at;
                const end_at = req.body?.end_at;
                const upcoming_at = req.body?.upcoming_at;
                const days = req.body?.days;
                const ovu_start_at = req.body?.ovu_start_at;
                const ovu_end_at = req.body?.ovu_end_at;
                const result = await this.periodService.updatePeriodData(id, start_at, end_at, upcoming_at, days, ovu_start_at, ovu_end_at);
                res.json({ result });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.inputStatus = async (req, res) => {
            try {
                const statusId = req.body.statusId;
                // const statusId = "testSts10";
                // const periodId = req.body.periodId;
                const periodId = "bff83863-6c58-44cc-92a4-085dff2ee02a";
                const type = req.body.type;
                // const type = "type7";
                const content = req.body.content;
                // const content = "content7";
                const result = await this.periodService.inputPeriodStatus(statusId, periodId, type, content);
                res.json({ result });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.updateStatus = async (req, res) => {
            try {
                // const statusId = req.body.statusId;
                const statusId = "testSts3";
                // const type = req.body.type;
                const type = "Updatetype3";
                // const content = req.body.content;
                const content = "updateContent3";
                const result = await this.periodService.updatePeriodStatus(statusId, type, content);
                res.json({ result });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.getStatus = async (req, res) => {
            try {
                // const periodId = req.body.periodId;
                const periodId = "bff83863-6c58-44cc-92a4-085dff2ee02a";
                const result = await this.periodService.getPeriodStatus(periodId);
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