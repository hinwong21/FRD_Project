import admin from "firebase-admin";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

import path from 'path';

let firebaseAdminJson = path.join(__dirname, 'FirebaseAdminConfig.json')

const serviceAccount = firebaseAdminJson
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    serviceAccountId: '106079113441621459217.apps.googleusercontent.com'
})


type UserType = {
    uid?: string,
}

export let getUserByUID = async (uid: string) => {
    // console.log(uid)
    let result: UserRecord = await admin.auth().getUser(uid)
    if (result) {
        // See the UserRecord reference doc for the contents of userRecord.
        let user: UserType = result.toJSON()
        console.log('Successfully fetched user data: ', user)

        return user
    } else {
        throw new Error("Not exist this uid")
    }


}

export type User = {
    gender?: string;
    age?: number;
    height?: number;
    weight?: number;
}
export let updateUserByUID = async (uid: string, user: User) => {
    admin.auth().setCustomUserClaims(uid, user)
}


// getUserByUID("V5YacZZdVQN8xPwVoJXmhI3te8v1")