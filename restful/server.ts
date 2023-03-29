import express from "express";
import { Request, Response } from "express";
import { sessionMiddleware } from "./session";
import path from "path";
import { env } from "./env";
import { nutritionRoutes } from "./route/nutritionRoues";
import cors from "cors";
import { calendarRoutes } from "./route/calendarRoute";

const app = express();
app.use(express.json());

let url = env.URL;
app.use(
  cors({
    origin: "url",
  })
);

app.use(sessionMiddleware);

app.use("/", nutritionRoutes);
app.use("/calendar", calendarRoutes);
app.use("/Account", accountRoutes);

let port = env.PORT;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
