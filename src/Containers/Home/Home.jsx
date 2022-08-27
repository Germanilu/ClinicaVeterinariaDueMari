import React, { useEffect, useRef, useState } from 'react';
import './Home.scss'

//Import To enable reveal on scroll
import { Slide } from "react-awesome-reveal";


const Home = () => {
    //UseRef create a reference to the DOM element
    const myRef = useRef();
    //Hooks
    const [isVisible, setIsVisible] = useState();

    useEffect(() => {
        //Every time the entry match the ref in the vieport will change the hook state and trigger the css animation
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setIsVisible(entry.isIntersecting)
        })
        observer.observe(myRef.current)
    }, [])





    return (

        <div className='homeDesign'>
            <div className="firstSection">
                <div className="containerInfo">
                    <div className="containerText">
                        <h1>Clinica Veterinaria Duemari</h1>
                        <p>Hai un problema che riguarda la salute del tuo amico animale? <br />  Ti serve un consiglio o parere? <br /><br /> <strong>Contattaci</strong> accedendo al servizio di consulta online in fondo alla pagina o vienici a trove direttamente in clinica! <br /> </p>
                    </div>
                </div>
            </div>

            <div className="secondSection">
                <div class="containerSecondSection">
                    <div className="consultText">
                        <Slide>
                            <h1>Il Consulto</h1>
                            <p>
                                Abbiamo creato questo servizio per<strong> potervi offrire delle consulenze online </strong> in una maniera per noi sostenibile. <br /> <br />
                                Ci auguriamo in questo modo di riuscire a fornirvi risposte e consigli riguardanti i problemi di salute dei vostri amici animali. E magari sarà anche un modo con il quale voi aiuterete noi a sostenerci. <br /><br />
                                Il consulto <strong> non potrà in alcun modo sostituire </strong> una visita veterinaria effettuata in presenza dell'animale. <br /><br /> Verranno forniti pareri e consigli relativi alle domande che vorrete farci e che ci auguriamo vi aiuteranno a comprendere e a gestire al meglio i problemi sanitari dei vostri amici a quattro zampe ( o con le ali, o pinne o altro).</p>
                        </Slide>
                    </div>

                    <div className="cardHome" >
                        <div className="cardHome__image-container">
                            <img className={isVisible ? "cardHome__image" : "hideAnimation"} ref={myRef} src={require("../../img/clinica.png")} alt="" />
                        </div>
                        <svg className="cardHome__svg" viewBox="0 0 800 500">
                            <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#92f3e3" />
                            <path className={isVisible ? "cardHome__line" : "hideAnimation"} ref={myRef} d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" stroke-width="3" fill="transparent" />
                        </svg>
                        <div className={isVisible ? "cardHome__content" : "hideAnimation"} ref={myRef}>
                            <h1 className="cardHome__title">Consulto Online</h1>
                            <p>Cosa aspetti, Contattaci e ti risponderemo nell'arco di 48h </p>
                            <div className="buttonConsult">Richiedi Consulto</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Home;