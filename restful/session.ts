import expressSession from "express-session";

export let sessionMiddleware = expressSession({
  secret:
    Math.random().toString(36).slice(2) +
    Math.random().toString(36).slice(2) +
    Math.random().toString(36).slice(2),
  resave: true,
  saveUninitialized: true,
});

declare module "express-session" {
  interface SessionData {
    userId?: string;
    // email?: string;
    isLogin?: boolean;
    // CalendarAuthorized?: boolean;
    GoogleOauth?: {
      type?: string | undefined;
      client_id?: string | undefined;
      client_secret?: string | undefined;
      refresh_token?: string | null | undefined;
    };
  }
}
