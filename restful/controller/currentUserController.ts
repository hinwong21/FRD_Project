import { Request, Response } from "express";
import { errorHandler } from "../error";
import "../session";
import { createJwt } from "../jwt";
import { User, getUserByUID } from "../firebaseAdmin";
import { CurrentUserService } from "../service/currentUserService";

export class CurrentUserController {
    constructor(private currentUserService: CurrentUserService) { }

    verifyToken = async (req: Request, res: Response) => {
        try {
            let userId = req.session.userId!

            res.json({
                ok: true,
                isErr: null,
                errMess: null,
                data: userId,
            })
        } catch (err) {
            errorHandler(err, req, res);
        }
    }
    getToken = async (req: Request, res: Response) => {
        try {
            // must checked userId is valid firebase uid
            let { userId, pushNotificationToken } = req.body
            let user = await getUserByUID(userId)

            if (!user) { throw new Error("Not exist this userId in Firebase") }
            let { uid, displayName, email } = user as { uid: string, displayName: string, email: string }
            await this.currentUserService.createUser(uid, displayName, email, pushNotificationToken)
            let token = createJwt(uid)
            console.log(token);

            res.json({
                ok: true,
                isErr: null,
                errMess: null,
                data: token,
            })
        } catch (err) {

            errorHandler(err, req, res);

        }
    }
    updateUser = async (req: Request, res: Response) => {
        try {
            // must checked userId is valid firebase uid
            let userId = req.body.userId;
            let user = req.body.user as User;
            await this.currentUserService.updateUser(userId, user)

            res.json({
                ok: true,
                isErr: null,
                errMess: null,
                data: null,
            })
        } catch (err) {

            errorHandler(err, req, res);

        }
    }
}