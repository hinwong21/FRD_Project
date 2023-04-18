"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorsController = void 0;
const error_1 = require("../../error");
require("../../session");
class EditorsController {
    constructor(editorsService) {
        this.editorsService = editorsService;
        this.addMemo = async (req, res) => {
            try {
                console.log(req.body);
                const memoContent = req.body.content;
                const id = req.body.id;
                this.editorsService.addMemo(id, memoContent, req.session.userId);
                res.json({ success: true });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.updateMemo = async (req, res) => {
            try {
                await this.editorsService.updateMemo(req.body.id, req.body.content);
                res.json({ success: true });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.newDiary = async (req, res) => {
            try {
                await this.editorsService.newDiary(req.body.id, req.body.content, req.body.weather, req.body.title, req.body.mood, req.session.userId);
                res.json({ success: true });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.updateDiary = async (req, res) => {
            try {
                await this.editorsService.updateDiary(req.body.id, req.body.content, req.body.updated_at, req.body.title, req.body.mood);
                res.json({ success: true });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.newTodo = async (req, res) => {
            try {
                console.log(req.body);
                res.json({ success: true });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.updateTodo = async (req, res) => {
            try {
                console.log(req.body);
                res.json({ success: true });
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.editorsService = editorsService;
    }
}
exports.EditorsController = EditorsController;
//# sourceMappingURL=editorsController.js.map