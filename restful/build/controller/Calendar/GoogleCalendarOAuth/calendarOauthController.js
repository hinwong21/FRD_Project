"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarOauthController = void 0;
const error_1 = require("../../../error");
const fs = require("fs").promises;
const local_auth_1 = require("@google-cloud/local-auth");
const googleapis_1 = require("googleapis");
require("../../../session");
class CalendarOauthController {
    constructor(calendarOauthService) {
        this.calendarOauthService = calendarOauthService;
        this.calendarAuthorization = async (req, res) => {
            const SCOPES = ["https://www.googleapis.com/auth/calendar"];
            const CREDENTIALS_PATH = "credentials.json";
            try {
                async function loadCredentialInSession() {
                    if (req.session.isLogin) {
                        const credentials = {
                            type: req.session.GoogleOauth?.type,
                            client_id: req.session.GoogleOauth?.client_id,
                            client_secret: req.session.GoogleOauth?.client_secret,
                            refresh_token: req.session.GoogleOauth?.refresh_token,
                        };
                        return googleapis_1.google.auth.fromJSON(credentials);
                    }
                }
                async function saveCredentials(client) {
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
                    client = await (0, local_auth_1.authenticate)({
                        scopes: SCOPES,
                        keyfilePath: CREDENTIALS_PATH,
                    });
                    if (client.credentials) {
                        await saveCredentials(client);
                    }
                    return client;
                }
                let listEvents = async (auth) => {
                    let pageToken = undefined;
                    let allEvents = [];
                    const calendar = googleapis_1.google.calendar({ version: "v3", auth });
                    do {
                        const res = await calendar.events.list({
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
                    let eventArr = [];
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
                    this.calendarOauthService.calendarAuthorization(req.session.userId, eventArr);
                    res.json({ eventArr, success: true });
                };
                authorize().then(listEvents);
            }
            catch (err) {
                (0, error_1.errorHandler)(err, req, res);
            }
        };
        this.calendarOauthService = calendarOauthService;
    }
}
exports.CalendarOauthController = CalendarOauthController;
//# sourceMappingURL=calendarOauthController.js.map