"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editorsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const editorsController_1 = require("../controller/Notes/editorsController");
const editorsService_1 = require("../service/editorsService");
const guard_1 = require("../guard");
exports.editorsRoutes = express_1.default.Router();
let editorsService = new editorsService_1.EditorsService(db_1.knex);
let editorsController = new editorsController_1.EditorsController(editorsService);
exports.editorsRoutes.post("/new-memo", guard_1.isLoggedInAPI, editorsController.addMemo);
// editorsRoutes.get(
//   "/memo",isLoggedInAPI,
//   editorsController.getMemo
// );
exports.editorsRoutes.put("/update-memo", guard_1.isLoggedInAPI, editorsController.updateMemo);
exports.editorsRoutes.post("/new-diary", guard_1.isLoggedInAPI, editorsController.newDiary);
// editorsRoutes.get(
//     "/diary",isLoggedInAPI,
//     editorsController.getDiary
//   );
exports.editorsRoutes.post("/new-todo", guard_1.isLoggedInAPI, editorsController.newTodo);
exports.editorsRoutes.put("/update-diary", guard_1.isLoggedInAPI, editorsController.updateDiary);
exports.editorsRoutes.put("/update-todo", guard_1.isLoggedInAPI, editorsController.updateTodo);
//# sourceMappingURL=editorsRoute.js.map