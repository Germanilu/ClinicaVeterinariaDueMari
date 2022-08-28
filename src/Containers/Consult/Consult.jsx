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


    //hooks
    const [pets, setPets] = useState([])


    useEffect(() => {
        verifyPet()
    }, [])


    useEffect(() => {
        // if (credentials.token === '') {
        //     navigate('/login')
        // }
    })

    const verifyPet = async () => {
        try {

            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            const attempt = await axios.get("https://bbdd-cv2.herokuapp.com/api/myPets", config)
            if (attempt.status === 200) {
                if (attempt.data.data.length === 0) {
                    navigate('/registerPet')
                }
                setPets(attempt.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='consultDesign'>
            <div className="consultText">Scrivi la tua consulta, entro 48h ti risponderemo!</div>
            <div className="containerConsult">

                <div className="boxContainerConsultData">
                    {/* Mapping result from axios inside select input */}
                    <select name="Pets" className='selectPet'>
                        <option value="default">--</option>
                        {pets.map(element => (
                            <option key={element.id} value={element.id}>{element.name}</option>
                        ))}
                    </select>
                    <div className="containerDataPet">IMG and Data after selection</div>
                </div>

                <div className="boxContainerConsult">
                    <textarea name="message" className='inputConsult' placeholder="Scrivi qui... "></textarea>
                    <div className="button buttonConsult">Invia Consulta</div>

                </div>

            </div>
        </div>
    )
}
export default Consult;