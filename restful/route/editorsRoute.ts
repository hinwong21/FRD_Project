import express from "express";
import { isLoggedInAPI } from "../guard";
import { knex } from "../database/db";
import {EditorsController} from "../controller/Notes/editorsController"
import { EditorsService } from "../service/editorsService";

export let editorsRoutes = express.Router();

let editorsService = new EditorsService(knex);
let editorsController = new EditorsController(editorsService);

editorsRoutes.post(
    "/new-memo",
    editorsController.addMemo
  );

editorsRoutes.get(
    "/memo",
    editorsController.getMemo
  );