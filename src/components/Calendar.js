//React imports
import React,{useState,useEffect} from 'react';
//fullcalendar imports
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from '@fullcalendar/multimonth';
//Mui imports
import Container from '@mui/material/Container';

import { GetTrainings_URL } from '../constants.js';

export default function Calendar() {
    const [events, setEvents] = useState([{
        start: new Date(),
        end: new Date(),
        title: ''
    }])

    //get the customer & trainings data
    useEffect(() => {
        // Send a GET request to the GetTrainings_URL endpoint
        fetch(GetTrainings_URL)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error fetching data');
                }
            })
            .then(responseData => {
                // Map the response data to an array of events
                const events = responseData.map(item => ({
                    start: item.date,
                    end: item.date,
                    title: `${item.activity} / ${item.customer.firstname} ${item.customer.lastname}`
                }));
                // Update the state with the array of events
                setEvents(events);
            })
            .catch(err => {
                console.error(err);
                alert('Failed to fetch data');
            });
    }, []);
    

    return(
        <div>
            <h1>Calendar Activities</h1>
            <Container
                className="calendarContainer"
                sx={{
                    backgroundColor:'white',
                    maxWidth:'90%',
                    margins:"auto" ,
                    padding:3
                    }}>
            <Fullcalendar
                className="calendar"
                plugins={[
                    dayGridPlugin, 
                    timeGridPlugin, 
                    interactionPlugin,
                    multiMonthPlugin
                ]}
                initialView={"dayGridMonth"}
                selectable='true'
                headerToolbar={{
                    start: "today prev,next", 
                    center: "title",
                    end: "timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear",
                    classNames: "header-toolbar"
                }}
                events={events}
                height={"80vh"}
            />
            </Container>
        </div>
    )
}