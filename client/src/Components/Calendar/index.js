import React from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import './style.css'
function Calendar(props){
    return (
      <div>
      <div>
        <FullCalendar
          defaultView="dayGridMonth"
          header={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,listWeek",
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          //to get events to show up, create a separate events object and use props to pass in the event details. Events takes in an array of object. Each object in the array should have the title of the event with a data following this format: 2019-10-20T08:00. Default duration of all events is 1 hour.
          events={props.events}
        />
      </div>
    </div>
    )
}

export default Calendar;