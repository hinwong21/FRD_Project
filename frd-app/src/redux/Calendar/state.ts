export interface CalendarEventState {
    events : object[]
  }
  
  export const initialState: CalendarEventState = {
    events: [
      {title:"Piano Lesson", start:'2023-03-20 12:30', end:'2023-03-21 16:30', extendedProps: {description: 'Pay lesson fee'}, backgroundColor:"blue",textColor:"white"},
      {title:"Tecky Group Project Discussion", start:'2023-03-20 10:30', extendedProps: {description: 'Brain Storm-- Karaoke App'},end:'2023-03-21 12:30',backgroundColor:"red",textColor:"white"},
      {title:"Revision Time", start:'2023-03-24 09:30', end:'2023-03-27 07:30', extendedProps: {description: 'I can do it!'}, backgroundColor:"brown",textColor:"white"}
      ]
  }