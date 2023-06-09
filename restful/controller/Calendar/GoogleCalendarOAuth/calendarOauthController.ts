import { errorHandler } from "../../../error";
const fs = require("fs").promises;
import { Response, Request } from "express";
import { authenticate } from "@google-cloud/local-auth";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { CalendarOauthService } from "../../../service/calendarOauthService";
import "../../../session";

export class CalendarOauthController {
  constructor(private calendarOauthService: CalendarOauthService) {
    this.calendarOauthService = calendarOauthService;
  }

  calendarAuthorization = async (req: Request, res: Response) => {
    const SCOPES = ["https://www.googleapis.com/auth/calendar"];
    const CREDENTIALS_PATH = "credentials.json";
    try {
      async function loadCredentialInSession(): Promise<
        OAuth2Client | null | any
      > {
        if (req.session.isLogin) {
          const credentials = {
            type: req.session.GoogleOauth?.type,
            client_id: req.session.GoogleOauth?.client_id,
            client_secret: req.session.GoogleOauth?.client_secret,
            refresh_token: req.session.GoogleOauth?.refresh_token,
          };
          return google.auth.fromJSON(credentials);
        }
      }

      async function saveCredentials(client: OAuth2Client): Promise<void> {
        const content = await fs.readFile(CREDENTIALS_PATH);
        const keys = JSON.parse(content);
        const key = keys.installed || keys.web;
        const payload = {
          type: "authorized_user",
          client_id: key.client_id,
          client_secret: key.client_secret,
          refresh_token: client.credentials.refresh_token,
        };
        req.session.GoogleOauth = payload;
      }

      async function authorize() {
        let client = await loadCredentialInSession();
        if (client) {
          return client;
        }
        client = await authenticate({
          scopes: SCOPES,
          keyfilePath: CREDENTIALS_PATH,
        });

        if (client.credentials) {
          await saveCredentials(client);
        }
        return client;
      }

      let listEvents = async (auth: OAuth2Client) => {
        let pageToken: string | undefined | null = undefined;
        let allEvents: any[] = [];
        const calendar = google.calendar({ version: "v3", auth });
        do {
          const res: any = await calendar.events.list({
            calendarId: "primary",
            timeMin: new Date().toISOString(),
            maxResults: 1000,
            singleEvents: true,
            orderBy: "startTime",
            pageToken,
          });
          const events = res.data.items || [];
          allEvents = allEvents.concat(events);
          pageToken = res.data.nextPageToken;
        } while (pageToken);

        if (allEvents.length === 0) {
          console.log("No upcoming events found.");
          res.json({ eventArr: "No upcoming events found", success: true });
          return;
        }

        let eventArr: {}[] = [];

        allEvents.map((event, i) => {
          eventArr.push({
            title: event.summary,
            start: event.start.dateTime
              ? event.start.dateTime.slice(0, 10) +
                " " +
                event.start.dateTime.slice(11, 16)
              : event.start.date,
            end: event.end.dateTime
              ? event.end.dateTime.slice(0, 10) +
                " " +
                event.end.dateTime.slice(11, 16)
              : event.end.date,
            extendedProps: {
              description: event.description
                ? event.description
                : "No Description",
            },
            backgroundColor: event.colorId,
            textColor: "white",
          });
        });

        console.log(eventArr);
        console.log(req.session);

        this.calendarOauthService.calendarAuthorization(
          req.session.userId as string,
          eventArr as {}[]
        );
        res.json({ eventArr, success: true });
      };

      authorize().then(listEvents);
    } catch (err) {
      errorHandler(err, req, res);
    }
  };
}
