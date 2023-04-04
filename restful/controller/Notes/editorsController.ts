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
      const memoContent = req.body.content;
      const id = req.body.id
      this.editorsService.addMemo(id, memoContent, 1);
      res.json({ success: true });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  getMemo = async (req:Request, res:Response)=>{
    try{
        const memos = await this.editorsService.getMemo(1)
        res.json(memos)
    }catch (err){
        errorHandler(err, req, res);
    }
  }

  updateMemo= async (req:Request, res:Response)=>{
    try{
      await this.editorsService.updateMemo(req.body.id, req.body.content)
      res.json({success:true})
    }catch (err){
      errorHandler(err, req, res);
    }
  }
}
