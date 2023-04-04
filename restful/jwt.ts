import sha512 from "js-sha512";

import express from "express";
import { env_config } from "./env";
let sha384 = sha512.sha384;
// let secret = 'ashdkjashdsadasdsadsadajkashdkjashdkjhasjkdakjsdh'
export const createJwt = (user_id: string) => {
    // create Header
    let header = JSON.stringify({
        typ: "JWT",
        alg: "HS384",
    });
    // let exp = Date.now() + 172800;

    //create the token payload
    let payload = JSON.stringify({
        user_id: user_id,

        // 'exp':exp
    });

    let base64UrlHeader = base64EncodeHook(header);
    let base64UrlPayload = base64EncodeHook(payload);
    let signature = sha384.hmac(env_config.SEREST, base64UrlHeader + "." + base64UrlPayload);
    let base64UrlSignature = base64EncodeHook(signature);

    let jwt = base64UrlHeader + "." + base64UrlPayload + "." + base64UrlSignature;

    return jwt;
};

export const verifyJwt = (jwt: string, req: express.Request) => {
    // let errMess = ''
    // if(!jwt){
    // // errMess = 'Please provide jwt to verify'
    // // return {"isValid":false,"errMess":errMess,"token":null}
    // throw new Error("Please provide jwt to verify")
    // }

    // split the token client
    let tokenParts = jwt.split(".");
    let header = base64decode(tokenParts[0]);
    let payload = base64decode(tokenParts[1]);
    let signatureProvided = tokenParts[2];

    // check is expired

    // let exp = JSON.parse(payload).exp
    // let tokenIsExpired = Date.now() - exp > 0
    // if(tokenIsExpired){
    //     throw new Error("Token is expired")
    // }

    // build a signature base on the header and payload using secret
    let base64UrlHeader = base64EncodeHook(header);
    let base64UrlPayload = base64EncodeHook(payload);
    let signature = sha384.hmac(env_config.SEREST, base64UrlHeader + "." + base64UrlPayload);
    let base64UrlSignature = base64EncodeHook(signature);

    // verify it matches the signature provided in the token

    let signatureValid = base64UrlSignature === signatureProvided;
    let obj = JSON.parse(payload);
    if (!signatureValid) {
        throw new Error("signature is not match provided in the token");
    } else {
        req.session.userId = obj.user_id;
    }
};

const base64EncodeHook = (text: string) => {
    //'+' to '-' '/'to'_' '='to''
    let p = text;
    p = p.replaceAll("+", "-");
    p = p.replaceAll("/", "_");
    p = p.replaceAll("=", "");

    return base64encode(p);
};

const base64encode = (str: string): string => Buffer.from(str, "binary").toString("base64");
const base64decode = (str: string): string => Buffer.from(str, "base64").toString("binary");