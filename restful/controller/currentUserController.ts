import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../error";
import { User, getUserByUID } from "../firebaseAdmin";
import { CurrentUserService } from "../service/currentUserService";
import { encodeJWT, getJWT } from "../jwt";

export class CurrentUserController {
  constructor(private currentUserService: CurrentUserService) {}

  verifyToken = async (req: Request, res: Response) => {
    try {
      let userId = getJWT(req).userId;

      res.json({
        ok: true,
        isErr: null,
        errMess: null,
        data: userId,
      });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  getToken = async (req: Request, res: Response) => {
    try {
      // must checked userId is valid firebase uid
      let { userId, pushNotificationToken } = req.body;
      let user = await getUserByUID(userId);
      if (!user.email) {
        throw new Error("Missing user email");
      }
      if (!user.displayName) {
        throw new Error("Missing displayName");
      }

      await this.currentUserService.createUser({
        userId: user.uid,
        username: user.displayName,
        email: user.email,
        pushNotificationToken,
      });
      let token = encodeJWT({ userId: user.uid });
      console.log(token);

      res.json({
        ok: true,
        isErr: null,
        errMess: null,
        data: token,
      });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      // must checked userId is valid firebase uid
      let userId = req.body.userId;
      let user = req.body.user as User;
      await this.currentUserService.updateUser(userId, user);

      res.json({
        ok: true,
        isErr: null,
        errMess: null,
        data: null,
      });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      let userId = getJWT(req).userId;
      const user = await this.currentUserService.getUser(userId);
      res.json(user);
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  updateData = async (req: Request, res: Response) => {
    try {
      let userId = getJWT(req).userId;
      let height = req.body.height;
      let gender = req.body.gender;
      let age = req.body.age;
      let weight = req.body.weight;
      const result = await this.currentUserService.updateData(
        userId,
        height,
        gender,
        age,
        weight
      );
      res.json({ result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  updateUsername = async (req: Request, res: Response) => {
    try {
      let userId = getJWT(req).userId;
      let username = req.body.input;
      const result = await this.currentUserService.updateUsername(
        userId,
        username
      );
      res.json({ result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  updateWeight = async (req: Request, res: Response) => {
    try {
      let userId = getJWT(req).userId;
      let weight = req.body.input;
      const result = await this.currentUserService.updateWeight(userId, weight);
      res.json({ result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  updateHeight = async (req: Request, res: Response) => {
    try {
      let userId = getJWT(req).userId;
      let height = req.body.input;
      const result = await this.currentUserService.updateHeight(userId, height);
      res.json({ result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  updateAge = async (req: Request, res: Response) => {
    try {
      let userId = getJWT(req).userId;
      let age = req.body.input;
      const result = await this.currentUserService.updateAge(userId, age);
      res.json({ result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  updateGender = async (req: Request, res: Response) => {
    try {
      let userId = getJWT(req).userId;
      let gender = req.body.selectGender;
      const result = await this.currentUserService.updateGender(userId, gender);
      res.json({ result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  updateField = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let userId = getJWT(req).userId;
      let field = req.params.field;
      switch (field) {
        case "username":
        case "weight":
        case "height":
        case "age":
        case "gender":
          break;
        default:
          next();
          return;
      }
      let value = req.body.input;
      const result = await this.currentUserService.updateField(
        userId,
        field,
        value
      );
      res.json({ result });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };
}
