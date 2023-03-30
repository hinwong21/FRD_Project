import express from "express";
import { isLoggedInAPI } from "../guard";
import { knex } from "../database/db";
import { CurrentUserController } from "../controller/currentUserController";


export let userRoutes = express.Router();


let currentUserController = new CurrentUserController ();

userRoutes.get(
  "/current",
  currentUserController.currentUser
);