import express from "express";
import { Request, Response } from "express";
import path from "path";
import { env } from "./env";

const app = express();

app.get("/", function (req: Request, res: Response) {
});


let port = env.PORT;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});