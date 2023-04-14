"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(error, req, res) {
    // for logging errors
    let result = {
        ok: false,
        isErr: true,
        errMess: `${error.message} - ${req.route.path}`,
        data: null,
    };
    // res.status(500).json(result)
    res.json(result);
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map