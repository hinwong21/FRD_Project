import admin from "firebase-admin";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

let firebaseAdminJson = "firebaseAdminConfig.json";

const serviceAccount = firebaseAdminJson;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  serviceAccountId: "106079113441621459217.apps.googleusercontent.com",
});

export let getUserByUID = async (uid: string) => {
  // console.log(uid)
  let result: UserRecord = await admin.auth().getUser(uid);
  if (result) {
    // See the UserRecord reference doc for the contents of userRecord.
    // let user: UserType = result.toJSON();
    console.log("Successfully fetched user data: ", result);

    return result;
  } else {
    throw new Error("User not found in Firebase");
  }
};

export type User = {
  gender?: string;
  age?: number;
  height?: number;
  weight?: number;
};
export let updateUserByUID = async (uid: string, user: User) => {
  admin.auth().setCustomUserClaims(uid, user);
};

// getUserByUID("V5YacZZdVQN8xPwVoJXmhI3te8v1")
