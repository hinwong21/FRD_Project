import express from "express";
import { Bearer } from "permit";
import jwt from "jwt-simple";
import { env } from "./env";

let permit = new Bearer({ query: "access_token" });

export type JWTPayload = {
  userId: string;
};

export function getJWT(req: express.Request) {
  let token = permit.check(req);

  if (!token) {
    throw new Error("Not exist token in header");
  }

  try {
    console.log("DECODE", token, env.SEREST);

    let payload = jwt.decode(token, env.SEREST);

    return payload as JWTPayload;
  } catch (error) {
    console.log(error);

    throw new Error("signature is not match provided in the token");
  }
}

export function encodeJWT(payload: JWTPayload) {
  let token = jwt.encode(payload, env.SEREST);
  return token;
}
