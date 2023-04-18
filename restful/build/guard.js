"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedInAPI = void 0;
const error_1 = require("./error");
require("./session");
const jwt_1 = require("./jwt");
const isLoggedInAPI = async (req, res, next) => {
    try {
        let payload = (0, jwt_1.getJWT)(req);
        req.session.userId = payload.userId;
        req.session.isLogin = true;
        next();
    }
    catch (err) {
        (0, error_1.errorHandler)(err, req, res);
    }
};
exports.isLoggedInAPI = isLoggedInAPI;
//# sourceMappingURL=guard.js.map