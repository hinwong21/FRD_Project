import express from "express";
import { Request, Response } from "express";
import { sessionMiddleware } from "./session";
import path from "path";
import { env } from "./env";
import { nutritionRoutes } from "./route/nutritionRoues";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(sessionMiddleware);

app.use("/", nutritionRoutes);

app.get("/", function (req: Request, res: Response) {});

let port = env.PORT;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
