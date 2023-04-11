import express from "express";
import { sessionMiddleware } from "./session";
import { env_config } from "./env";
import { nutritionRoutes, nutritionService } from "./route/nutritionRoute";
import cors from "cors";
import { calendarRoutes } from "./route/calendarRoute";
import { userRoutes } from "./route/userRoute";
import { accountingRoutes } from "./route/accountingRoute";
import { editorsRoutes } from "./route/editorsRoute";
import * as schedule from 'node-schedule';
import axios from 'axios';
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



async function cb(title: string, body: string) {

}

export async function setUpScheduler(min: number | string, hr: number | string, dayOfMonth: number | string, month: number | string, dayOfWeek: number | string, title: string, body: string) {
  schedule.scheduleJob(`${min} ${hr} ${dayOfMonth} ${month} ${dayOfWeek} *`, () => cb(title, body))
}

schedule.scheduleJob('0 6 * * * *', async () => {
  // 每天 6 点
  let title = "myTitle"
  let body = "myBody"
  let path = "mypath"
  let myApiKey = "AAAADIjgNZk:APA91bG7UwsXM5-aq7Eo09tFD-lmIL-MgfrcjrVGJP7Dht7-iATV_gEEM-vmFsgo1PyXB75hlDPCIdtdRS_TLh3yTQjbUBXkt8FxBdpE5fdbOi_jGugRHLKzLUwgxU_qB-zmDoLf1m9x"
  let tokens: string[] = await nutritionService.getAllFirebasePushNotificationTokens()
  const { data } = await axios.post(
    'https://fcm.googleapis.com/fcm/send',
    {
      registration_idx: tokens,
      content_available: true,
      priority: "high",
      notification: {
        title: title,
        body: body,
      },
      data: {
        path: path
      }
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `key=${myApiKey}`
      },
    },
  );

  console.log(JSON.stringify(data));


});


let port = env_config.PORT;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
