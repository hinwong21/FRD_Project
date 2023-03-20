// import React from 'react'
import FullCalendar from "@fullcalendar/react"
import locale from '@fullcalendar/core/locales/zh-tw';
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from '@fullcalendar/list';
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


export const Calendar_zh = () => {
  return (
    <>
    <div>
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView = "dayGridMonth"
        headerToolbar={{
            start:"prev,next",
            center:"title",
            end:"dayGridMonth,timeGridWeek,listWeek"
        }}
        editable= {true}
        locale= {locale}
        contentHeight = {1000}
        // dateClick = {handleDateClick}
        // droppable = {true}
        nowIndicator = {true}
        events = {[
          {title:"hihihi", start:'2023-03-20', end:'2023-03-21',backgroundColor:"blue",textColor:"white"}
        ]}
        eventDidMount = {(info)=>{
          return new bootstrap.Popover(info.el,{

          })
        }}
        />
    </div>
    </>
  )
}

export default Calendar_zh