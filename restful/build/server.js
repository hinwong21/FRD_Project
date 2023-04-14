"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpScheduler = void 0;
const express_1 = __importDefault(require("express"));
const session_1 = require("./session");
const env_1 = require("./env");
const nutritionRoute_1 = require("./route/nutritionRoute");
const cors_1 = __importDefault(require("cors"));
const calendarRoute_1 = require("./route/calendarRoute");
const userRoute_1 = require("./route/userRoute");
const accountingRoute_1 = require("./route/accountingRoute");
const editorsRoute_1 = require("./route/editorsRoute");
const schedule = __importStar(require("node-schedule"));
const axios_1 = __importDefault(require("axios"));
const periodRoute_1 = require("./route/periodRoute");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json({ limit: "50mb" }));
let url = env_1.env_config.URL;
app.use((0, cors_1.default)({
    origin: url,
}));
app.use(session_1.sessionMiddleware);
app.use("/nutrition", nutritionRoute_1.nutritionRoutes);
app.use("/calendar", calendarRoute_1.calendarRoutes);
app.use("/user", userRoute_1.userRoutes);
app.use("/account", accountingRoute_1.accountingRoutes);
app.use("/editors", editorsRoute_1.editorsRoutes);
app.use("/period", periodRoute_1.periodRoutes);
async function cb(title, body) {
}
async function setUpScheduler(min, hr, dayOfMonth, month, dayOfWeek, title, body) {
    schedule.scheduleJob(`${min} ${hr} ${dayOfMonth} ${month} ${dayOfWeek} *`, () => cb(title, body));
}
exports.setUpScheduler = setUpScheduler;
schedule.scheduleJob('0 6 * * * *', async () => {
    // 每天 6 点
    let title = "myTitle";
    let body = "myBody";
    let path = "mypath";
    let myApiKey = "AAAADIjgNZk:APA91bG7UwsXM5-aq7Eo09tFD-lmIL-MgfrcjrVGJP7Dht7-iATV_gEEM-vmFsgo1PyXB75hlDPCIdtdRS_TLh3yTQjbUBXkt8FxBdpE5fdbOi_jGugRHLKzLUwgxU_qB-zmDoLf1m9x";
    let tokens = await nutritionRoute_1.nutritionService.getAllFirebasePushNotificationTokens();
    const { data } = await axios_1.default.post('https://fcm.googleapis.com/fcm/send', {
        registration_idx: tokens,
        content_available: true,
        priority: "high",
        notification: {
            title: title,
            body: body,
        },
        data: {
            path: path
        }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `key=${myApiKey}`
        },
    });
    console.log(JSON.stringify(data));
});
let port = env_1.env_config.PORT;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map