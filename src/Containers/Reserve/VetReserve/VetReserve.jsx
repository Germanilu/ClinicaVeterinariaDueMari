import React, { useEffect, useState } from 'react';
import './VetReserve.scss'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'

import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css'



import { useSelector } from 'react-redux';
import { userData } from '../../../Containers/User/userSlice';
import axios from 'axios';


let locales = {
    'it': require("date-fns/locale/it")
}

const localizer = dateFnsLocalizer({
    format,
    startOfWeek,
    getDay,
    locales,
    
})

const VetReserve = () => {

    //Var
    const credentials = useSelector(userData);

    const events = [{
        title: '',
        start: '',
        end: ''
    }]

    useEffect(() => {
        request()
    }, [])


    useEffect(() => {
       
    })

    const request = async () => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };
            const attempt = await axios.get("https://bbdd-cv2.herokuapp.com/api/booking/", config)
            console.log(attempt)
            //Here for Each result i compose the date in the correct format and add to the hook all the data retrive from the axios request
            attempt.data.data.forEach(element => {
                let rowDate = element.date + " " + element.hour
                element.start = new Date(rowDate)
                element.end = new Date(rowDate)
                element.title= element.userName + " " + element.userSurname;
                events.push(element)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='vetReserveDesign'>
            <Calendar localizer={localizer} events={events}  startAccessor="start" endAccessor="end" className='vetCalendar' />
        </div>
    )
}
export default VetReserve;