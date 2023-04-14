"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedInAPI = void 0;
const error_1 = require("./error");
require("./session");
const jwt_1 = require("./jwt");
const isLoggedInAPI = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            let token = req.headers.authorization.split(' ')[1];
            (0, jwt_1.verifyJwt)(token, req);
            next();
        }
        else {
            throw new Error("Not exist token in header");
        }
    }
    catch (err) {
        // res.json({
        //     data:null,
        //     isErr:true,
        //     errMess:err.message
        // })
        (0, error_1.errorHandler)(err, req, res);
    }
};
exports.isLoggedInAPI = isLoggedInAPI;
//# sourceMappingURL=guard.js.map