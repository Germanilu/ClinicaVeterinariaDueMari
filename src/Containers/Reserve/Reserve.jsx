import React, { useEffect, useState } from 'react';
import './Reserve.scss'

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { userData } from '../../Containers/User/userSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';



const Reserve = () => {

    //Var
    const credentials = useSelector(userData);
    //Hooks
    const [date, onChange] = useState(new Date());
    const [hour,setHour] = useState() 
  
    const reserve = async() => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            //.toDateString transformy date + time into date only, and avoid issue with date select to post request with previous da
            let body = {
                date: date.toDateString(),
                hour:hour
            };

            console.log(body)

            const attempt = await axios.post("https://bbdd-cv2.herokuapp.com/api/booking", body, config)
            console.log(attempt)
            
        } catch (error) {
            console.log(error)
        }
    }
  
    
    const updateHour = (e) => {
        setHour(e.target.value)
    }

    return (
        <div className='reserveDesign'>
            <h1>Richiedi un'appuntamento presso la clinica</h1>
            <div className="containerCalendar">
                <div className="calendar">
                    <h1>Seleziona una data</h1>
                    <Calendar onChange={onChange} value={date} locale="it-IT" />
                </div>
                <div className="containerHour">
                    <h1>Seleziona un orario</h1>
                    <select name="hour" onChange={updateHour} value="dd">
                        <option value="12:30">12:30</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                    </select>
                </div>
            </div>
            <div className="button" onClick={() => reserve()} >Richiedi Appuntamento</div>



        </div>
    )
}

export default Reserve;