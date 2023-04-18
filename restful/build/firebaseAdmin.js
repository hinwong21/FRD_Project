"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserByUID = exports.getUserByUID = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
let firebaseAdminJson = "firebaseAdminConfig.json";
const serviceAccount = firebaseAdminJson;
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    serviceAccountId: "106079113441621459217.apps.googleusercontent.com",
});
let getUserByUID = async (uid) => {
    // console.log(uid)
    let result = await firebase_admin_1.default.auth().getUser(uid);
    if (result) {
        // See the UserRecord reference doc for the contents of userRecord.
        // let user: UserType = result.toJSON();
        console.log("Successfully fetched user data: ", result);
        return result;
    }
    else {
        throw new Error("User not found in Firebase");
    }
};
exports.getUserByUID = getUserByUID;
let updateUserByUID = async (uid, user) => {
    firebase_admin_1.default.auth().setCustomUserClaims(uid, user);
};
exports.updateUserByUID = updateUserByUID;
// getUserByUID("V5YacZZdVQN8xPwVoJXmhI3te8v1")
//# sourceMappingURL=firebaseAdmin.js.map