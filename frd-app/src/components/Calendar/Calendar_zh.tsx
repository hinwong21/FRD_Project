import React, {memo} from 'react'
import FullCalendar from "@fullcalendar/react"
//change language to zh-tw // import locale from '@fullcalendar/core/locales/zh-tw';
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import {AddEvent} from "./AddEvent"
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


export const Calendar_zh = () => {
  
  const eventList = [
    {title:"Piano Lesson", start:'2023-03-20 12:30', end:'2023-03-21 16:30', extendedProps: {description: 'Pay lesson fee'}, backgroundColor:"blue",textColor:"white"},
    {title:"Tecky Group Project Discussion", start:'2023-03-20 10:30', extendedProps: {description: 'Brain Storm-- Karaoke App'},end:'2023-03-21 12:30',backgroundColor:"red",textColor:"white"},
    {title:"Revision Time", start:'2023-03-24 09:30', end:'2023-03-27 07:30', extendedProps: {description: 'I can do it!'}, backgroundColor:"brown",textColor:"white"}
  ]

  return (
    <>
    <div>
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, googleCalendarPlugin]}
        initialView = "dayGridMonth"
        headerToolbar={{
            start:"title",
            end:"prev,dayGridMonth,timeGridWeek,listWeek,next"
        }}
        editable= {true}
        // locale= {locale}
        contentHeight = {600}
        // dateClick = {handleDateClick}
        droppable = {true}
        selectable= {true}
        nowIndicator = {true}
        longPressDelay = {500}
        googleCalendarApiKey= 'AIzaSyCudYRoPMFcW8GuaTTNTgO9a0IGsz6lYak'
        eventSources = {
          [
            {googleCalendarId: 'en.hong_kong#holiday@group.v.calendar.google.com', backgroundColor: "red", textColor: "white", editable: false},
            eventList
          ]
        }
        eventDidMount = {(info)=>{
          return new bootstrap.Popover(info.el,{
            title: info.event.title,
            placement:"auto",
            trigger:"hover",
            customClass: "popoverStyle",
            content: info.event.extendedProps.description,
            html:true,
          })
        }}
        eventClick= {(event)=> {
          // stop from redirecting to Google Calendar onclick
          event.jsEvent.preventDefault();
      }}
        
        />
    </div>

    <AddEvent/>

    </>
  )
}

export default Calendar_zh