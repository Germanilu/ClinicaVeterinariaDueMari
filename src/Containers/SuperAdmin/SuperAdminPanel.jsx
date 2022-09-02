import React, { useState } from 'react';
import './SuperAdminPanel.scss'
import { useSelector } from 'react-redux';
import { userData } from '../../Containers/User/userSlice';
import axios from 'axios';


const SuperAdminPanel = () => {

    //Var
    const credentials = useSelector(userData);


    //Hooks
    const [vetData, setVetData] = useState({
        name: '',
        surname: '',
        specialization: '',
        email: '',
        password: '',
        password2: ''
    })
    const [vetId, setVetId] = useState()
    const [msgVetDeleted, setMsgVetDeleted] = useState()
    const [msgError, setMsgError] = useState()

    const updateVetData = (e) => {
        setVetData({ ...vetData, [e.target.name]: e.target.value })
    }


    const vetRegister = async () => {

        //Regular expression
        //Email
        if (!vetData.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
            setMsgError('Introdurre Email valida');
            setTimeout(() => {
                setMsgError("")
            }, 3000);
            return;
        }
        //Password
        if (!vetData.password) {
            setMsgError("Devi inserire una password");
            setTimeout(() => {
                setMsgError("")
            }, 3000);
            return
        }
        if (!vetData.password.match(/^(?=.*[*@!#%&()^~{}]).*$/)) {

            setMsgError("La password deve avere un carattere speciale");
            setTimeout(() => {
                setMsgError("")
            }, 3000);
            return;
        }

        if (vetData.password !== vetData.password2) {
            setMsgError("Le password non coincidono")
            setTimeout(() => {
                setMsgError("")
            }, 3000);
            return;
        }


        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };
            const attempt = await axios.post("https://bbdd-cv2.herokuapp.com/api/newVet", vetData, config)
            setMsgError(attempt.data.message)

        } catch (error) {
            setMsgError(error.response.data.message)
        }
    }

    //Use to set the hook vet with the vet ID 
    const onChangeHandler = (e) => {
        setVetId(e.target.value)
        console.log(vetId)
    }

    const findVet = async () => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };
            const attempt = await axios.get(`https://bbdd-cv2.herokuapp.com/api/vet/${vetId}`, config)
            console.log(attempt)
            
        } catch (error) {
            console.log(error)

        }
    }

    const deleteVet = async() => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            const attempt = await axios.delete(`https://bbdd-cv2.herokuapp.com/api/vet/${vetId}`, config)
            console.log(attempt)
            setMsgVetDeleted("Veterinario Eliminato!")
            


        } catch (error) {
            console.log(error)
            setMsgVetDeleted("Sembra ci sia stato un'errore...")
        }
    }



    return (
        <div className='superAdminDesign'>
            <h1> Benvenuto {credentials.user_name}</h1>
            <div className="superAdminContainer">
                {/* Register Vet */}
                <div className="vetContainer">
                    <div className="registerVet">
                        <h1>Registrare Veterinario</h1>
                        <input className='inputShort' type="text" name='name' title='name' onChange={updateVetData} placeholder="Nome" />
                        <input className='inputShort' type="text" name='surname' title='surname' onChange={updateVetData} placeholder="Cognome" />
                        <input className='inputShort' type="text" name='specialization' title='specialization' onChange={updateVetData} placeholder="Specializzazione" />
                        <input className='inputShort' type="email" name='email' title='email' onChange={updateVetData} placeholder="Email" />
                        <input className='inputShort' type="password" name='password' title='password' onChange={updateVetData} placeholder="Password" />
                        <input className='inputShort' type="password" name='password2' title='password2' onChange={updateVetData} placeholder="Ripeti Password" />
                        {msgError}
                        <div className="button" onClick={() => vetRegister()}>Crea Veterinario</div>
                    </div>

                    {/* Box Find Vet */}
                    <div className="deleteVet">
                        <h1>Eliminare Veterinario</h1>
                        <input className='inputShort' type="email" name='email' title='email' onChange={onChangeHandler} placeholder="Inserire ID Veterinario" />
                        {msgVetDeleted}
                        <div className="button" onClick={() => deleteVet()}>Elimina</div>
                    </div>
                </div>

                <div className="containerResearch">
                    <h1>Cosa vuoi Cercare?</h1>
                    <div className="researchInputContainer">
                        <div className="allVetInput">
                            <h2>Ricerca tutti i Veterinari</h2>
                            
                            <div className="button">Cerca</div>
                        </div>
                        <div className="allUserInput">
                            <h2>Ricerca tutti gli Utenti</h2>
                            
                            <div className="button">Cerca</div>
                        </div>
                        <div className="allPetsd">
                            <h2>RicercaTutti gli Animali</h2>
                            
                            <div className="button">Cerca</div>
                        </div>
                        <div className="vetById">
                            <h2>Ricerca Veterinario Tramite ID</h2>
                            <input className='inputShort' type="text" />
                            <div className="button">Cerca</div>
                        </div>
                        <div className="userById">
                            <h2>Ricerca Utente Tramite ID</h2>
                            <input className='inputShort' type="text" />
                            <div className="button">Cerca</div>
                        </div>
                        <div className="petById">
                            <h2>Ricerca Animale Tramite ID</h2>
                            <input className='inputShort' type="text" />
                            <div className="button">Cerca</div>
                        </div>
                        <div className="allConsult">
                            <h2>Ricerca Tutte le consulte</h2>
                            <div className="button">Cerca</div>
                        </div>
                        
                       
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SuperAdminPanel;