import React, { useEffect, useState } from 'react';
import './VetConsult.scss';
import { userData } from '../../User/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoArrowSmallDown } from "react-icons/go";

const VetConsult = () => {

    //Var
    const credentials = useSelector(userData);
    const navigate = useNavigate();

    //hooks
    const [unreplyConsult, setUnreplyConsult] = useState([]);
    const [replyConsult, setReplyConsult] = useState([]);
    const [show, setShow] = useState();
    const [replyBox, setReplyBox] = useState();
    const [reply, setReply] = useState("");
    const [msg, setMsg] = useState();


    useEffect(() => {
        verifyUnreplyConsult()
        verifyReplyConsult()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        if (credentials.token === '') {
            navigate('/login')
        }
    });

    //Verify all the existing unreply consult on DB
    const verifyUnreplyConsult = async () => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            const attempt = await axios.get("https://bbdd-cv2.herokuapp.com/api/allConsultsUnrep", config)
            setUnreplyConsult(attempt.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    //Verify all the consult already reply by Vet
    const verifyReplyConsult = async () => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            const attempt = await axios.get("https://bbdd-cv2.herokuapp.com/api/consult", config)
            setReplyConsult(attempt.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    //Send Reply to Consult
    const sendConsultReply = async (id) => {
        try {
            const body = {
                vetMessage: reply
            }
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };
            const attempt = await axios.put(`https://bbdd-cv2.herokuapp.com/api/consult/${id}`, body, config)
            setMsg(attempt.data.message)
            window.location.reload();
        } catch (error) {
            setMsg(error.response.data.message)
            setTimeout(() => {
                setMsg("")
            }, 3000);
        }
    }

    //Receive idConsult as parameter and change the state of the hook 
    const isClick = (id) => {
        show === "" ? setShow(id) : setShow("");
    };

    const isReply = (id) => {
        replyBox === "" ? setReplyBox(id) : setReplyBox("");
    };


    //Function to update the reply of the consult
    const updateMessage = (e) => {
        setReply(e.currentTarget.value);
    };


    return (
        <div className='vetConsultDesign'>
            <h1>Nuovi Consulti</h1>
            <div className="unreplyConsultContainer">
                {unreplyConsult.map((element) => {
                    return (
                        <div className="consultBox" key={element._id} >
                            <div className="consultBoxHeader">
                                <div className="widthFixContainer">
                                    <p><strong>Data Consulto Online: </strong>  {element.date}</p>
                                </div>
                                <div className="widthFixContainer">
                                    <p><strong>Nome Utente: </strong>  {element.userName} {element.userSurname}</p>
                                </div>
                                <GoArrowSmallDown onClick={() => isClick(element._id)} />
                            </div>
                            <div className={show === element._id ? "showConsultBox" : "hideConsultBox"}>
                                <div className="containerConsultText"><strong>Messaggio:</strong> {element.userMessage}</div>
                                <div className="button smallButton" onClick={() => isReply(element._id)}>Rispondi</div>
                                <div className={replyBox === element._id ? "showReplyBox" : "hideReplyBox"}>
                                    <textarea name="vetMessage" className='replyTextArea' onChange={updateMessage} ></textarea>
                                    {msg}
                                    <div className="button smallButton" onClick={() => sendConsultReply(element._id)}>Invia Risposta</div>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </div>
            <h1>Storico Consulti</h1>
            <div className="replyConsultContainer"> 
                {replyConsult.map((element) => {
                    return (
                        <div className="consultBox" key={element._id} >
                            <div className="consultBoxHeader">
                                <div className="widthFixContainer">
                                    <p><strong>Data Consulto Online: </strong>  {element.date}</p>
                                </div>
                                <div className="widthFixContainer">
                                    <p><strong>Nome Utente: </strong>  {element.userName} {element.userSurname}</p>
                                </div>
                                <GoArrowSmallDown onClick={() => isClick(element._id)} />
                            </div>
                            <div className={show === element._id ? "showConsultBox" : "hideConsultBox"}>
                                <div className="containerConsultText"><strong>Messaggio:</strong> {element.userMessage}</div>
                                <div className="containerConsultReply"><strong>Risposta:</strong> {element.vetMessage}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default VetConsult;