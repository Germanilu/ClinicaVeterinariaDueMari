import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './UserReserve.scss'
import { userData } from '../../User/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const UserReserve = () => {

    //Var
    const credentials = useSelector(userData);
    const navigate = useNavigate()
    //Hooks
    const [date, onChange] = useState(new Date());
    const [hour, setHour] = useState()
    const [msgError, setMsgError] = useState();


    useEffect(() => {
       
    }, [])

    useEffect(() => {
        if (credentials.token === '') {
            navigate('/login')
        }
    })

    
    const reserve = async () => {

        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            //.toDateString transformy date + time into date only, and avoid issue with date select to post request with previous da
            let body = {
                date: date.toDateString(),
                hour: hour
            };

            console.log(body)

            if (hour === "default") {

                setMsgError("Devi selezionare un'orario")
                return;
            }

            const attempt = await axios.post("https://bbdd-cv2.herokuapp.com/api/booking", body, config)
            console.log(attempt)
            if (attempt.status === 200) {
                setMsgError("Appuntamento Prenotato!")
            }
        } catch (error) {
            setMsgError(error.response.data.message)
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
                    <Calendar onChange={onChange} value={date} locale="it"/>

                </div>
                <div className="containerHour">
                    <h1>Seleziona un orario</h1>
                    <select name="hour" onChange={updateHour} >
                        <option value="default">Seleziona un'orario</option>
                        <option value="09:00">09:00</option>
                        <option value="09:30">09:30</option>
                        <option value="10:00">10:00</option>
                        <option value="10:30">10:30</option>
                        <option value="11:00">11:00</option>
                        <option value="11:30">11:30</option>
                        <option value="12:00">12:00</option>
                        <option value="14:00">14:00</option>
                        <option value="14:30">14:30</option>
                        <option value="15:00">15:00</option>
                        <option value="15:30">15:30</option>
                        <option value="16:00">16:00</option>
                        <option value="16:30">16:30</option>
                        <option value="17:00">17:00</option>
                        <option value="17:30">17:30</option>
                        <option value="18:00">18:00</option>
                        <option value="18:30">18:30</option>
                    </select>
                </div>
            </div>
            {msgError}
            <div className="button" onClick={() => reserve()} >Richiedi Appuntamento</div>
        </div>
    )
}

export default UserReserve;