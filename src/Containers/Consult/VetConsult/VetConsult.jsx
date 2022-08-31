import React, { useEffect, useState } from 'react';
import './VetConsult.scss'

import { userData } from '../../User/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VetConsult = () => {

    //Var
    const credentials = useSelector(userData);
    const navigate = useNavigate()


    //hooks
    const [unreplyConsult, setUnreplyConsult] = useState([])
    // const [replyConsult, setReplyConsult] = useState([])
    const [show, setShow] = useState()

    useEffect(() => {
        verifyUnreplyConsult()
        // verifyReplyConsult()
    }, [])


    useEffect(() => {
        // if (credentials.token === '') {
        //     navigate('/login')
        // }
    })


    const verifyUnreplyConsult = async () => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            const attempt = await axios.get("https://bbdd-cv2.herokuapp.com/api/allConsultsUnrep", config)
            console.log(attempt)
            setUnreplyConsult(attempt.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    // const verifyReplyConsult = async() => {
    //     try {
    //         let config = {
    //             headers: { Authorization: `Bearer ${credentials.token}` }
    //         };

    //         const attempt = await axios.get("https://bbdd-cv2.herokuapp.com/api/consult", config)
    //         console.log(attempt)
    //         setReplyConsult(attempt.data.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    //Receive idConsult as parameter and change the state of the hook 
    const isClick = (id) => {
        show === "" ? setShow(id) : setShow("")
    }

    return (
        <div className='vetConsultDesign'>
            <h1>Nuovi Consulti</h1>
            <div className="unreplyConsultContainer">
                {unreplyConsult.map((element) => {
                    return (
                        <div className="unreplyConsultBox" key={element._id} onClick={() => isClick(element._id)}><strong>Data Consulto Online: </strong>  {element.date}
                            <div className={show === element._id ? "showUnreplyConsultBox" : "hideUnreplyConsultBox"}>
                                <div className="containerUnreplyConsultText"><strong>Messaggio:</strong> {element.userMessage}</div>
                                <div className="button" onClick={() => console.log("CLICK")} >Dettaglio</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="replyConsultContainer">
                reply consult
            </div>
        </div>
    )
}
export default VetConsult;