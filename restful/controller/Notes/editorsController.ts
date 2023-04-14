import { Request, Response } from "express";
import { errorHandler } from "../../error";
import { EditorsService } from "../../service/editorsService";
import "../../session";

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

  getMemo = async (req: Request, res: Response) => {
    try {
      const memos = await this.editorsService.getMemo(
        req.session.userId as string
      );
      res.json(memos);
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

  getDiary = async (req: Request, res: Response) => {
    try {
      const diaries = await this.editorsService.getDiary(
        req.session.userId as string
      );
      res.json(diaries);
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  newTodo = async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      res.json({ success: true });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  // getHashtags = async (req:Request, res:Response)=>{
  //   try{
  //     let hashtags = await this.editorsService

  //   }catch(err){
  //     errorHandler(err, req, res);
  // }
  // }
}
