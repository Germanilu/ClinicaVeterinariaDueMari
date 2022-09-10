import React, { useEffect, useState } from 'react';
import './MyConsult.scss';
import { userData } from '../../userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//Icons
import { GoArrowSmallRight, GoArrowSmallDown } from "react-icons/go";

const MyConsult = () => {

    //Var
    const credentials = useSelector(userData);
    const navigate = useNavigate();

    //Hooks
    const [allConsult, setAllConsult] = useState([]);

    useEffect(() => {
        consult()
    }, []);


    useEffect(() => {
        if (credentials.token === '') {
            navigate('/login')
        }
    });

    const consult = async () => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };
            const attempt = await axios.get("https://bbdd-cv2.herokuapp.com/api/myConsult", config)
            setAllConsult(attempt.data.data)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section>
            <h1>Ecco i tuoi consulti</h1>
            {allConsult.length === 0 && (
                <p className='noConsultP'>
                    Sembra tu non abbia richiesto ancora nessun consulto online. <br /> Vuoi richiedere un consulto? <span onClick={() => navigate('/consult')}>Clicca qui!</span>
                </p>
            )}
            <div className="container">
                <div className="accordion">
                    {allConsult.length > 0 && (
                        allConsult.map((element) => {
                            return (
                                <div>
                                    <div className="accordionItem" id={element._id}>
                                        <a className="accordionLink" href={`#${element._id}`}>
                                            <div className="flexAccordionHeader">
                                                <h3>Data Consulto: </h3>
                                                <p>{element.date}</p>
                                            </div>
                                            <i className="icon iconMdArrowForward"><GoArrowSmallRight /></i>
                                            <i className="icon iconMdArrowDown"><GoArrowSmallDown /></i>
                                        </a>
                                        <div className="answer">
                                            <h3>Domanda:</h3>
                                            <p>{element.userMessage}</p>
                                            {element.vetName ? (
                                                <div>
                                                    <h3>Ti ha risposto {element.vetName}</h3>
                                                    <p>{element.vetMessage}</p>
                                                </div>
                                            ) : (
                                                <h3>Riceverai una risposta entro 48h</h3>
                                            )
                                            }

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </section>
    )
}
export default MyConsult;