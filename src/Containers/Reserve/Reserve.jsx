import React, { useEffect, useState } from 'react';
import './Reserve.scss'

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';




const Reserve = () => {

    const [date, onChange] = useState(new Date());
    console.log(date)

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
                    <select name="" id="">
                        <option value="">12:30</option>
                        <option value="">13:00</option>
                        <option value="">13:30</option>
                    </select>
                </div>
            </div>
            <div className="button">Richiedi Appuntamento</div>



        </div>
    )
}

export default Reserve;