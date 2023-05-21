import express from "express";
import { sessionMiddleware } from "./session";
import { env } from "./env";
import { nutritionRoutes, nutritionService } from "./route/nutritionRoute";
import cors from "cors";
import { calendarRoutes } from "./route/calendarRoute";
import { userRoutes } from "./route/userRoute";
import { accountingRoutes } from "./route/accountingRoute";
import { editorsRoutes } from "./route/editorsRoute";
import * as schedule from "node-schedule";
import axios from "axios";
import { periodRoutes } from "./route/periodRoute";
import { print } from "listening-on";

const app = express();
app.use(express.urlencoded());
app.use(express.json({ limit: "50mb" }));

app.use(cors());

app.use(sessionMiddleware);

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/nutrition", nutritionRoutes);
app.use("/calendar", calendarRoutes);
app.use("/user", userRoutes);
app.use("/account", accountingRoutes);
app.use("/editors", editorsRoutes);
app.use("/period", periodRoutes);

async function cb(title: string, body: string) {}

export async function setUpScheduler(
  min: number | string,
  hr: number | string,
  dayOfMonth: number | string,
  month: number | string,
  dayOfWeek: number | string,
  title: string,
  body: string
) {
  schedule.scheduleJob(
    `${min} ${hr} ${dayOfMonth} ${month} ${dayOfWeek} *`,
    () => cb(title, body)
  );
}

schedule.scheduleJob("0 6 * * * *", async () => {
  // 每天 6 点
  let title = "myTitle";
  let body = "myBody";
  let path = "mypath";
  let tokens: string[] =
    await nutritionService.getAllFirebasePushNotificationTokens();
  const { data } = await axios.post(
    "https://fcm.googleapis.com/fcm/send",
    {
      registration_idx: tokens,
      content_available: true,
      priority: "high",
      notification: {
        title: title,
        body: body,
      },
      data: {
        path: path,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=${env.FIREBASE_API_KEY}`,
      },
    }
  );

  console.log(JSON.stringify(data));
});

app.listen(env.PORT, () => {
  print(env.PORT);
});
