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
    const [id, setId] = useState()
    const [msgVetDeleted, setMsgVetDeleted] = useState()
    const [showResearch, setShowResearch] = useState([])
    const [showResearchById, setShowResearchById] = useState()
    const [msgError, setMsgError] = useState()

    console.log(showResearch.length)

    const updateVetData = (e) => {
        setVetData({ ...vetData, [e.target.name]: e.target.value })
    }

    //Register new vet
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

    //Use to set the hook  with the  ID 
    const onChangeHandler = (e) => {
        setId(e.target.value)
        console.log(id)
    }



    //Delete vet Function
    const deleteVet = async () => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            const attempt = await axios.delete(`https://bbdd-cv2.herokuapp.com/api/vet/${id}`, config)
            console.log(attempt)
            setMsgVetDeleted("Veterinario Eliminato!")



        } catch (error) {
            console.log(error)
            setMsgVetDeleted("Sembra ci sia stato un'errore...")
        }
    }

    //Get all vets on db
    const findAllVets = async () => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            const attempt = await axios.get("https://bbdd-cv2.herokuapp.com/api/vet", config)
            console.log(attempt)
            setShowResearch(attempt.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    //Gets all user on db
    const findAllUsers = async () => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };
            const attempt = await axios.get("https://bbdd-cv2.herokuapp.com/api/users", config)
            console.log(attempt)
            setShowResearch(attempt.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const findAllPets = async () => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };
            const attempt = await axios.get("https://bbdd-cv2.herokuapp.com/api/pets", config)
            console.log(attempt)
            setShowResearch(attempt.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const findAllConsults = async () => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };
            const attempt = await axios.get("https://bbdd-cv2.herokuapp.com/api/allConsults", config)
            console.log(attempt)
            setShowResearch(attempt.data.data)
        } catch (error) {
            console.log(error)
        }
    }


    // ID RESEARCH FUNCTION 

    const findUserById = async () => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };
            const attempt = await axios.get(`https://bbdd-cv2.herokuapp.com/api/users/${id}`, config)
            console.log(attempt)
            setShowResearchById(attempt.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const findVet = async () => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };
            const attempt = await axios.get(`https://bbdd-cv2.herokuapp.com/api/vet/${id}`, config)
            console.log(attempt.data.data)
            setShowResearchById(attempt.data.data)

        } catch (error) {
            console.log(error)

        }
    }

    const findPetById = async () => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };
            const attempt = await axios.get(`https://bbdd-cv2.herokuapp.com/api/pets${id}`, config)
            console.log(attempt)
            setShowResearchById(attempt.data.data)
        } catch (error) {
            console.log(error)
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

                    {/* Box Delete Vet */}
                    <div className="deleteVet">
                        <h1>Eliminare Veterinario</h1>
                        <input className='inputShort' type="text" name='text' title='text' onChange={onChangeHandler} placeholder="Inserire ID Veterinario" />
                        {msgVetDeleted}
                        <div className="button" onClick={() => deleteVet()}>Elimina</div>
                    </div>
                </div>

                {/* Box Research  */}
                <div className="containerResearch">
                    <h1>Cosa vuoi Cercare?</h1>
                    <div className="researchInputContainer">
                        <div className="allVetInput">
                            <h2>Ricerca tutti i Veterinari</h2>
                            <div className="button" onClick={() => findAllVets()}>Cerca</div>
                        </div>
                        <div className="allUserInput">
                            <h2>Ricerca tutti gli Utenti</h2>
                            <div className="button" onClick={() => findAllUsers()}>Cerca</div>
                        </div>
                        <div className="allPetsd">
                            <h2>RicercaTutti gli Animali</h2>
                            <div className="button" onClick={() => findAllPets()}>Cerca</div>
                        </div>
                        <div className="allConsult">
                            <h2>Ricerca Tutte le consulte</h2>
                            <div className="button" onClick={() => findAllConsults()}>Cerca</div>
                        </div>
                    </div>

                    <div className="containerResearchResult">
                        Mostrare qui le consulte fatte
                        {showResearch.length > 0 && (
                            <div className="contGrid">
                                {showResearch.map(element => {
                                    console.log("Soy element", element)
                                    if (element.role === "vet") {
                                        return (
                                            <div className="contElement" key={element.id}>

                                                <div>
                                                    <p>ID: {element._id}</p>
                                                    <p>Nome: {element.name}</p>
                                                    <p>Cognome: {element.surname}</p>
                                                    <p>Specializzazione: {element.specialization}</p>
                                                    <p>Email: {element.email}</p>
                                                </div>
                                            </div>
                                        )
                                    } else if (element.role === "user") {
                                        return (
                                            <div className="contElement" key={element.id}>

                                                <p>ID: {element._id}</p>
                                                <p>Nome: {element.name}</p>
                                                <p>Cognome: {element.surname}</p>
                                                <p>Telefono: {element.mobile}</p>
                                                <p>Indirizzo: {element.address} {element.city}</p>
                                                <p>Telefono: {element.mobile}</p>
                                                <p>Email: {element.email}</p>

                                            </div>
                                        )

                                    } else if (element.age !== undefined) {
                                        return (
                                            <div className="contElement" key={element.id}>

                                                <p>ID: {element._id}</p>
                                                <p>Nome: {element.name}</p>
                                                <p>Età: {element.age}</p>
                                                <p>Specie: {element.breed}</p>
                                                <p>Razza: {element.type} </p>
                                                <p>Peso: {element.weight}</p>
                                                <p>Malattie Croniche: {element.diseases}</p>

                                            </div>
                                        )
                                    } else if (element.userMessage !== "") {
                                        return (
                                            <div className="contElement" key={element.id}>

                                                <p>ID: {element._id}</p>
                                                <p>PetID: {element.petId}</p>
                                                <p>UserID: {element.userId}</p>
                                                <p>Nome Utente {element.userName} {element.userSurname}</p>
                                                <p>Data: {element.date}</p>
                                                <p>Messaggio Utente: {element.userMessage}</p>
                                                <p>Risposta: {element.vetMessage} </p>
                                            </div>
                                        )
                                    }
                                }
                                )}
                            </div>
                        )
                        }
                    </div>

                    {/* Research by ID */}
                    <h1>Ricerca tramite ID</h1>
                    <div className="containerSearchId">
                        <div className="vetById">
                            <h2>Ricerca Veterinario Tramite ID</h2>
                            <input className='inputShort' type="text" name='text' title='text' onChange={onChangeHandler} placeholder="Inserire ID Veterinario" />
                            <div className="button" onClick={() => findVet()}>Cerca</div>
                        </div>
                        <div className="userById">
                            <h2>Ricerca Utente Tramite ID</h2>
                            <input className='inputShort' type="text" name='text' title='text' onChange={onChangeHandler} placeholder="Inserire ID Utente" />
                            <div className="button" onClick={() => findUserById()}>Cerca</div>
                        </div>
                        <div className="petById">
                            <h2>Ricerca Animale Tramite ID</h2>
                            <input className='inputShort' type="text" name='text' title='text' onChange={onChangeHandler} placeholder="Inserire ID Animale" />
                            <div className="button" onClick={() => findPetById()}>Cerca</div>
                        </div>
                    </div>
                    <div className="containerResearchByID">
                       
                        {showResearchById !== undefined && (
                            <div>
                                {showResearchById.role === "vet" && (
                                    <div className="contElement">
                                    <div>
                                        <p>ID: {showResearchById._id}</p>
                                        <p>Nome: {showResearchById.name}</p>
                                        <p>Cognome: {showResearchById.surname}</p>
                                        <p>Specializzazione: {showResearchById.specialization}</p>
                                        <p>Email: {showResearchById.email}</p>
                                    </div>
                                </div>
                                )}

                                {showResearchById.role === "user" && (
                                    <div className="contElement">

                                    <p>ID: {showResearchById._id}</p>
                                    <p>Nome: {showResearchById.name}</p>
                                    <p>Cognome: {showResearchById.surname}</p>
                                    <p>Telefono: {showResearchById.mobile}</p>
                                    <p>Indirizzo: {showResearchById.address} {showResearchById.city}</p>
                                    <p>Telefono: {showResearchById.mobile}</p>
                                    <p>Email: {showResearchById.email}</p>

                                </div>
                                )}

                                {showResearchById.age !== undefined && (
                                     <div className="contElement" >

                                     <p>ID: {showResearchById._id}</p>
                                     <p>Nome: {showResearchById.name}</p>
                                     <p>Età: {showResearchById.age}</p>
                                     <p>Specie: {showResearchById.breed}</p>
                                     <p>Razza: {showResearchById.type} </p>
                                     <p>Peso: {showResearchById.weight}</p>
                                     <p>Malattie Croniche: {showResearchById.diseases}</p>

                                 </div>
                                )}
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SuperAdminPanel;