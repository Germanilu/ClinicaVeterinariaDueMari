import React, { useEffect, useState } from 'react';
import './MyReserve.scss';

import { userData } from '../../userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const MyReserve = () => {

    //var
    const credentials = useSelector(userData);
    const navigate = useNavigate();

    //Hooks

    const [allReserve, setAllReserve] = useState([])
    const [msg,setMsg] = useState();

    useEffect(() => {
        reserve()
    }, []);


    useEffect(() => {
        if (credentials.token === '') {
            navigate('/login')
        }
    });

    const reserve = async () => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            const attempt = await axios.get("https://bbdd-cv2.herokuapp.com/api/myBooking", config)
            if(attempt.data.data.length === 0){
                setMsg("Sembra che tu non abbia nessun appuntamento prenotato")
            }else{
                setAllReserve(attempt.data.data)
                setMsg("Ecco I tuoi appuntamenti")
            }
        } catch (error) {
            console.log(error)
            setMsg("Sembra che tu non abbia nessun appuntamento prenotato")
        }
    };

    return (
        <div className='myReserveDesign'>
            <h1>{msg}</h1>
            
            <div className="containerAppointment">
                {allReserve.map((element) => {
                    return (
                        <div className="containerMyReserve"><p><strong>Data:</strong>  {element.date},</p> <p> <strong>Orario:</strong> {element.hour}</p> </div>
                    )
                })}
            </div>
        </div>
    )
}
export default MyReserve;