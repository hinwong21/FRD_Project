import { Request, Response } from "express";
import { errorHandler } from "../../error";
import { EditorsService } from "../../service/editorsService";
import "../../session";
import { getJWT } from "../../jwt";

export class EditorsController {
  constructor(private editorsService: EditorsService) {
    this.editorsService = editorsService;
  }

  addMemo = async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const memoContent = req.body.content;
      const id = req.body.id;
      this.editorsService.addMemo(
        id,
        memoContent,
        req.session.userId as string
      );
      res.json({ success: true });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  updateMemo = async (req: Request, res: Response) => {
    try {
      await this.editorsService.updateMemo(req.body.id, req.body.content);
      res.json({ success: true });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  newDiary = async (req: Request, res: Response) => {
    try {
      await this.editorsService.newDiary(
        req.body.id,
        req.body.content,
        req.body.weather,
        req.body.title,
        req.body.mood,
        req.session.userId as string
      );
      res.json({ success: true });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  updateDiary = async (req: Request, res: Response) => {
    try {
      await this.editorsService.updateDiary(
        req.body.id,
        req.body.content,
        req.body.updated_at,
        req.body.title,
        req.body.mood
      );
      res.json({ success: true });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  newTodo = async (req: Request, res: Response) => {
    let userId = getJWT(req).userId;
    let id = req.body.id;
    let title = req.body.content.title;
    let dueDate = req.body.content.due_date;
    let hashtag = req.body.content.hashtag;
    let newHashtag = req.body.content.newHashtag;
    let sharedEmail = req.body.content.shared_email;
    let task = req.body.content.tasks;
    let memo = req.body.content.memo;
    try {
      await this.editorsService.newTodo(
        id,
        userId,
        title,
        dueDate,
        hashtag,
        newHashtag,
        sharedEmail,
        task,
        memo
      );
      res.json({ success: true });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  updateTodo = async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      res.json({ success: true });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };
}
