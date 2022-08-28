import React, { useEffect, useState } from 'react';
import './Consult.scss'
import { userData } from '../../Containers/User/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Consult = () => {

    //Var
    const credentials = useSelector(userData);
    const navigate = useNavigate()


    useEffect(() => {

        verifyPet()

    }, [])


    useEffect(() => {
        if (credentials.token === '') {
            navigate('/login')
        }
    })

    const verifyPet = async () => {
        try {

            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            const attempt = await axios.get("https://bbdd-cv2.herokuapp.com/api/myPets", config)
            if (attempt.status === 200 ) {
                console.log(attempt.data.data)
                if(attempt.data.data.length === 0){
                    console.log("No tienes animales")
                    navigate('/registerPet')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <div className='consultDesign'>Consulta online</div>
    )
}
export default Consult;