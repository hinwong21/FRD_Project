import express from "express";
import { knex } from "../database/db";
import { EditorsController } from "../controller/Notes/editorsController"
import { EditorsService } from "../service/editorsService";
import { isLoggedInAPI } from "../guard";

export let editorsRoutes = express.Router();

let editorsService = new EditorsService(knex);
let editorsController = new EditorsController(editorsService);

editorsRoutes.post(
  "/new-memo",isLoggedInAPI,
  editorsController.addMemo
);

editorsRoutes.get(
  "/memo",isLoggedInAPI,
  editorsController.getMemo
);

editorsRoutes.put(
    "/update-memo",isLoggedInAPI,
    editorsController.updateMemo
  );

editorsRoutes.post(
    "/new-diary",isLoggedInAPI,
    editorsController.newDiary
  );

editorsRoutes.get(
    "/diary",isLoggedInAPI,
    editorsController.getDiary
  );

editorsRoutes.post(
    "/new-todo",isLoggedInAPI,
    editorsController.newTodo
  );