import express from "express";
import { Request, Response } from "express";
import { sessionMiddleware } from "./session";
import path from "path";
import { env_config } from "./env";
import { nutritionRoutes } from "./route/nutritionRoute";
import cors from "cors";
import { calendarRoutes } from "./route/calendarRoute";
import { userRoutes } from "./route/userRoute";
import { accountingRoutes } from "./route/accountingRoute";
import { editorsRoutes } from "./route/editorsRoute";
import { periodRoutes } from "./route/periodRoute";

const app = express();
app.use(express.urlencoded());
app.use(express.json({ limit: "50mb" }));

let url = env_config.URL;
app.use(
  cors({
    origin: url,
  })
);

app.use(sessionMiddleware);

app.use("/nutrition", nutritionRoutes);
app.use("/calendar", calendarRoutes);
app.use("/user", userRoutes);
app.use("/account", accountingRoutes);
app.use("/editors", editorsRoutes);
app.use("/period", periodRoutes);

let port = env_config.PORT;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
