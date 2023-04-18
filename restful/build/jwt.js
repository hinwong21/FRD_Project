"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeJWT = exports.getJWT = void 0;
const permit_1 = require("permit");
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const env_1 = require("./env");
let permit = new permit_1.Bearer({ query: "access_token" });
function getJWT(req) {
    let token = permit.check(req);
    if (!token) {
        throw new Error("Not exist token in header");
    }
    try {
        let payload = jwt_simple_1.default.decode(token, env_1.env.SEREST);
        return payload;
    }
    catch (error) {
        throw new Error("signature is not match provided in the token");
    }
}
exports.getJWT = getJWT;
function encodeJWT(payload) {
    let token = jwt_simple_1.default.encode(payload, env_1.env.SEREST);
    return token;
}
exports.encodeJWT = encodeJWT;
//# sourceMappingURL=jwt.js.map