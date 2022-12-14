import React from 'react';
import './Home.scss';
import './AdminHome.scss';
import { useNavigate } from 'react-router-dom';

//Import to Enable intersectionObserver
import { useInView } from 'react-intersection-observer';
import BackToTop from '../../Components/BackToTop/BackToTop';
import { useSelector } from 'react-redux';
import { userData } from '../../Containers/User/userSlice';
import SuperAdminPanel from '../SuperAdmin/SuperAdminPanel';


const Home = () => {

    //Var
    const credentials = useSelector(userData);

    // Ref create a reference to the DOM element & UseInView trigger element when in view
    const { ref: myRef, inView: isVisible } = useInView();
    const { ref: mySecondRef, inView: isAlsoVisible } = useInView();

    //var
    const navigate = useNavigate();

    if (credentials?.user_role === "user" || credentials.token === "") {
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
                {/* Consult Section */}
                <div className="secondSection">
                    <div className="containerSecondSection columnReverse">
                        <div className={isVisible ? "consultText": "hideAnimation"}>
                            <h1>Il Consulto</h1>
                            <p>
                                Abbiamo creato questo servizio per<strong> potervi offrire delle consulenze online </strong> in una maniera per noi sostenibile. <br /> <br />
                                Ci auguriamo in questo modo di riuscire a fornirvi risposte e consigli riguardanti i problemi di salute dei vostri amici animali. E magari sar?? anche un modo con il quale voi aiuterete noi a sostenerci. <br /><br />
                                Il consulto <strong> non potr?? in alcun modo sostituire </strong> una visita veterinaria effettuata in presenza dell'animale. <br /><br /> Verranno forniti pareri e consigli relativi alle domande che vorrete farci e che ci auguriamo vi aiuteranno a comprendere e a gestire al meglio i problemi sanitari dei vostri amici a quattro zampe ( o con le ali, o pinne o altro).</p>
                        </div>
                        <div className="cardHome" >
                            <div className="cardHome__image-container">
                                <img className={isVisible ? "cardHome__image" : "hideAnimation"} ref={myRef} src={require("../../img/perro1.jpg")} alt="" />
                            </div>
                            <svg className="cardHome__svg" viewBox="0 0 800 500">
                                <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#92f3e3" />
                                <path className={isVisible ? "cardHome__line" : "hideAnimation"} ref={myRef} d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" strokeWidth={10} fill="transparent" />
                            </svg>
                            <div className={isVisible ? "cardHome__content" : "hideAnimation"} ref={myRef}>
                                <h1 className="cardHome__title">Consulto Online</h1>
                                <p>Cosa aspetti, Contattaci e ti risponderemo nell'arco di 48h </p>
                                <button className="button" onClick={() => navigate('/consult')}>Richiedi Consulto</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Reserve Section */}
                <div className="secondSection">
                    <div className="containerSecondSection">
                        <div className="cardHome" >
                            <div className="cardHome__image-container">
                                <img className={isAlsoVisible ? "cardHome__image" : "hideAnimation"} ref={mySecondRef} src={require("../../img/clinica.png")} alt="" />
                            </div>
                            <svg className="cardHome__svg" viewBox="0 0 800 500">
                                <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#92f3e3" />
                                <path className={isAlsoVisible ? "cardHome__line" : "hideAnimation"} ref={mySecondRef} d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" strokeWidth={10} fill="transparent" />
                            </svg>
                            <div className={isAlsoVisible ? "cardHome__content" : "hideAnimation"} ref={mySecondRef}>
                                <h1 className="cardHome__title">Prenota Visita</h1>
                                <p>Prenota una visita e potrai portare il tuo animale presso la clinica </p>
                                <button className="button" onClick={() => navigate('/reserve')} >Prenota ora</button>
                            </div>
                        </div>

                        <div className={isAlsoVisible ? "consultText" : "hideAnimation"}>
                            <h1>Prenota Un'Appuntamento</h1>
                            <p>
                                Come abbiamo sottolineato sopra, il consulto non potr?? in alcun modo sostituire una visita veterinaria effettuata in presenza dell'animale. Se hai bisogno di portarci il tuo animale per una visita in sede dovrai semplicemente richiedere un'appuntamento. <br /> <br /> Controlla la disponibilit?? e <strong> richiedi una visita privata </strong> per il tuo animale! </p>
                        </div>
                    </div>
                </div>
                <BackToTop />
            </div>

        )
    } else if (credentials.user_role === "vet") {
        return (
            <div className="vetHomeDesign">
                <h1>Ciao {credentials.user_name} !</h1>
                <div className="containerCardsVet">
                    <div className="cardHome" >
                        <div className="cardHome__image-container">
                            <img className={isVisible ? "cardHome__image" : "hideAnimation"} ref={myRef} src={require("../../img/perro1.jpg")} alt="" />
                        </div>
                        <svg className="cardHome__svg" viewBox="0 0 800 500">
                            <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#92f3e3" />
                            <path className={isVisible ? "cardHome__line" : "hideAnimation"} ref={myRef} d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" strokeWidth={10} fill="transparent" />
                        </svg>
                        <div className={isVisible ? "cardHome__content" : "hideAnimation"} ref={myRef}>
                            <h1 className="cardHome__title">Consulti Online</h1>
                            <p>Controlla tutti i consulti online dei nostri clienti. <br /> Ricorda di rispondere entro 48h </p>
                            <button className="button" onClick={() => navigate('/vetConsult')} >Consulti</button>
                        </div>
                    </div>

                    <div className="cardHome" >
                        <div className="cardHome__image-container">
                            <img className={isAlsoVisible ? "cardHome__image" : "hideAnimation"} ref={mySecondRef} src={require("../../img/clinica.png")} alt="" />
                        </div>
                        <svg className="cardHome__svg" viewBox="0 0 800 500">
                            <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#92f3e3" />
                            <path className={isAlsoVisible ? "cardHome__line" : "hideAnimation"} ref={mySecondRef} d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" strokeWidth={10} fill="transparent" />
                        </svg>
                        <div className={isAlsoVisible ? "cardHome__content" : "hideAnimation"} ref={mySecondRef}>
                            <h1 className="cardHome__title">Appuntamenti</h1>
                            <p>Controlla l'agenda per vedere i prossimi appuntamenti</p>
                            <button className="button" onClick={() => navigate('/reserve')} >Appuntamenti</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (credentials.user_role === "super_admin") {
        return (
            <SuperAdminPanel />
        )
    }
}
export default Home;