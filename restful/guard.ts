import express from "express";
import { errorHandler } from "./error";
import "./session";
import { getJWT } from "./jwt";

export const isLoggedInAPI = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let payload = getJWT(req);
    req.session.userId = payload.userId;
    req.session.isLogin = true;
    next();
  } catch (err) {
    errorHandler(err, req, res);
  }
};
