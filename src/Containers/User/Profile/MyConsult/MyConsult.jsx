import React, { useEffect, useState } from 'react';
import './MyConsult.scss'
import { userData } from '../../userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyConsult = () => {

    //Var
    const credentials = useSelector(userData);
    const navigate = useNavigate()

    //Hooks
    const [allConsult, setAllConsult] = useState([])
    const [show, setShow] = useState()

    useEffect(() => {
        consult()
    }, [])


    useEffect(() => {
        // if (credentials.token === '') {
        //     navigate('/login')
        // }
    })

    const consult = async () => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            const attempt = await axios.get("https://bbdd-cv2.herokuapp.com/api/myConsult", config)
            console.log(attempt)
            setAllConsult(attempt.data.data)

        } catch (error) {
            console.log(error)
        }
    }

    //Receive idConsult as parameter and change the state of the hook 
    const isClick = (id) => {
        show === "" ? setShow(id) : setShow("")
    }

    return (
        <div className='myConsultDesign'>
            <div className="myConsultContainer">
                {allConsult.length === 0 && (
                    <p>
                        Al momento non hai ancora richiesto nessun consulto Online, Vuoi richiedere un consulto? <span onClick={() => navigate('/consult')}>Clicca qui!</span>
                    </p>
                )}
                {allConsult.length > 0 && (
                    allConsult.map((element) => {
                        return (
                            <div className="myConsultBox" key={element._id} onClick={() => isClick(element._id)} > <strong>Data Consulto Online:</strong>  {element.date}
                                <div className={show === element._id ? "showContainerConsult" : "hideContainerConsult"} >
                                    <div className="containerConsultText"> <strong>Messaggio:</strong>  {element.userMessage}</div>
                                    <div className="containerConsultText"> <strong>Risposta Veterinario:</strong>  {element.vetMessage}</div>
                                </div>

                            </div>
                        )
                    }
                    )
                )
                }
            </div>
        </div>
    )
}
export default MyConsult;