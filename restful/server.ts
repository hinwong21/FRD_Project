import express from "express";
import { Request, Response } from "express";
import { sessionMiddleware } from "./session";
import path from "path";
import { env } from "./env";
import { nutritionRoutes } from "./route/nutritionRoues";
import { calendarRoutes } from "./route/calendarRoute";

const app = express();
app.use(express.json());

app.use(sessionMiddleware);

app.use("/", nutritionRoutes);
app.use("/calendar", calendarRoutes);


let port = env.PORT;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
