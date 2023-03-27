// import { google, calendar_v3 } from "googleapis";

// //Global variables to access the calendar
// let clientId = "Your cliendID";
// let scopes = "https://www.googleapis.com/auth/calendar";
// let calendarId = "Your google calendar id";
// let eventsList: any[] = [];

// //Autorice the user
// checkAuth();

// //authorization in google
// function checkAuth() {
//   gapi.auth.authorize(
//     {
//       client_id: clientId,
//       scope: scopes,
//       immediate: true,
//     },
//     handleAuthResult
//   );
// }

// // //checks if authorized
// function handleAuthResult(authResult: any) {
//   if (authResult && !authResult.error) {
//     loadCalendarApi();
//   } else {
//     handleAuthClick();
//   }
// }

// // //request credentials
// function handleAuthClick() {
//   gapi.auth.authorize(
//     {
//       client_id: clientId,
//       scope: scopes,
//       immediate: false,
//     },
//     handleAuthResult
//   );
//   return false;
// }

// function loadCalendarApi() {
//   gapi.client.load("calendar", "v3", makeApiCall);
// }

// //  Load the API and make an API call.  Display the results on the screen.

// function makeApiCall() {
//   let requestList = gapi.client.calendar.events.list({
//     calendarId: calendarId,
//   });

//   console.log("--- eventsList ---");
//   console.log(eventsList);
//   uiCalendarConfig.calendars["myCalendar"].fullCalendar(
//     "removeEventSource",
//     eventsList
//   );
//   eventsList = [];

//   // Step 6: Execute the API request
//   requestList.then(
//     function (resp) {
//       if (resp.result.error) {
//         reportError(
//           "Google Calendar API: " + data.error.message,
//           data.error.errors
//         );
//       } else if (resp.result.items) {
//         resp.result.items.forEach(function (entry, index) {
//           eventsList.push({
//             id: entry.id,
//             title: entry.summary,
//             start: entry.start.dateTime || entry.start.date, // try timed. will fall back to all-day
//             end: entry.end.dateTime || entry.end.date, // same
//             url: url,
//             location: entry.location,
//             description: entry.description,
//           });
//         });
//       }

//       if (eventsList.length > 0) {
//         uiCalendarConfig.calendars["myCalendar"].fullCalendar(
//           "addEventSource",
//           eventsList,
//           true
//         );
//       }
//     },
//     function (reason) {
//       console.log("Error: " + reason.result.error.message);
//     }
//   );
// }

// // //insert into calendar

// function makeRpcRequest(eventData) {
//   gapi.client.load("calendar", "v3").then(function () {
//     request = gapi.client.calendar.events.insert({
//       calendarId: calendarId,
//       resource: eventData,
//     });

//     request.then(
//       function (resp) {
//         if (resp.result.error) {
//           reportError(
//             "Google Calendar API: " + data.error.message,
//             data.error.errors
//           );
//         } else {
//           makeApiCall();
//           console.log(resp);
//           var creator = resp.result.creator.email;
//           var calendarEntry = resp.result.htmlLink;

//           console.log("--- Calendar entry successfully created by---");
//           console.log(creator);
//           console.log("--- dd ---");
//           console.log(calendarEntry);
//         }
//       },
//       function (reason) {
//         console.log("Error: " + reason.result.error.message);
//       }
//     );
//   });
// }
