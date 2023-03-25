import React, {memo} from 'react'
import FullCalendar from "@fullcalendar/react"
// import locale from '@fullcalendar/core/locales/zh-tw';
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"
import listPlugin from '@fullcalendar/list';
import {
  IonPopover,
  IonContent,
  IonButton,
} from "@ionic/react";
import {AddEvent} from "./AddEvent"
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


export const Calendar_zh = () => {
  
  const eventList = [
    {title:"hihihi", start:'2023-03-20 12:30', end:'2023-03-21 16:30',backgroundColor:"blue",textColor:"white"},
    {title:"byebyebye", start:'2023-03-20 10:30', end:'2023-03-21 12:30',backgroundColor:"red",textColor:"white"},
    {title:"yoyoyo", start:'2023-03-24 09:30', end:'2023-03-27 07:30',backgroundColor:"brown",textColor:"white"}
  ]


  return (
    <>
    <div>
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
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
        events = {eventList}
        eventDidMount = {(info)=>{
          return new bootstrap.Popover(info.el,{
            title: info.event.title,
            placement:"auto",
            trigger:"hover",
            customClass: "popoverStyle",
            content:
            "<p>ABC testing</p>",
            html:true,
          })
        }}
        
        />
    </div>

    <AddEvent/>

    </>
  )
}

export default Calendar_zh