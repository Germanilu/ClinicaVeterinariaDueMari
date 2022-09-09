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
    const [callFunction, setCallFunction] = useState()
    const [msgError, setMsgError] = useState()

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
            setMsgVetDeleted("Veterinario Eliminato!")
        } catch (error) {
            setMsgVetDeleted("Sembra ci sia stato un'errore...")
        }
    }

    //Function that include all the general research Super_Admin can make
    const axiosRequestFunction = async () => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            switch (callFunction) {
                case 'allVets':
                    const vets = await axios.get("https://bbdd-cv2.herokuapp.com/api/vet", config)
                    setShowResearch(vets.data.data)
                    break;
                case 'allUsers':
                    const users = await axios.get("https://bbdd-cv2.herokuapp.com/api/users", config)
                    setShowResearch(users.data.data)
                    break;
                case 'allPets':
                    const pets = await axios.get("https://bbdd-cv2.herokuapp.com/api/pets", config)
                    setShowResearch(pets.data.data);
                    break;
                case 'allConsults':
                    const consults = await axios.get("https://bbdd-cv2.herokuapp.com/api/allConsults", config)
                    setShowResearch(consults.data.data);
                case 'vetId':
                    const vetId = await axios.get(`https://bbdd-cv2.herokuapp.com/api/vet/${id}`, config)
                    setShowResearchById(vetId.data.data);
                    break;
                case 'userId':
                    const userId = await axios.get(`https://bbdd-cv2.herokuapp.com/api/users/${id}`, config)
                    setShowResearchById(userId.data.data);
                    break;
                case 'petId':
                    const petId = await axios.get(`https://bbdd-cv2.herokuapp.com/api/pets${id}`, config)
                    setShowResearchById(petId.data.data)
            }
        } catch (error) {
            console.log(error)
            setShowResearchById("Sembra ci sia stato un'errore")
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
                        <div className="researchResult">
                            <h2>Ricerca tutti i Veterinari</h2>
                            <div className="button" onClick={() => { axiosRequestFunction(); setCallFunction("allVets") }}>Cerca</div>
                        </div>
                        <div className="researchResult">
                            <h2>Ricerca tutti gli Utenti</h2>
                            <div className="button" onClick={() => { axiosRequestFunction(); setCallFunction("allUsers") }}>Cerca</div>
                        </div>
                        <div className="researchResult">
                            <h2>RicercaTutti gli Animali</h2>
                            <div className="button" onClick={() => { axiosRequestFunction(); setCallFunction("allPets") }}>Cerca</div>
                        </div>
                        <div className="researchResult">
                            <h2>Ricerca Tutte le consulte</h2>
                            <div className="button" onClick={() => { axiosRequestFunction(); setCallFunction("allConsults") }}>Cerca</div>
                        </div>
                    </div>

                    <div className="containerResearchResult">
                        {showResearch.length > 0 && (
                            <div className="contGrid">
                                {showResearch.map(element => {
                                    console.log("Soy element", element)
                                    if (element.role === "vet") {
                                        return (
                                            <div className="contElement" key={element.id}>

                                                <div>
                                                    <p><strong>ID:</strong> {element._id}</p>
                                                    <p><strong>Nome:</strong>  {element.name}</p>
                                                    <p><strong>Cognome:</strong> {element.surname}</p>
                                                    <p><strong>Specializzazione:</strong> {element.specialization}</p>
                                                    <p><strong>Email:</strong> {element.email}</p>
                                                </div>
                                            </div>
                                        )
                                    } else if (element.role === "user") {
                                        return (
                                            <div className="contElement" key={element.id}>

                                                <p><strong>ID:</strong>  {element._id}</p>
                                                <p><strong>Nome:</strong>  {element.name}</p>
                                                <p><strong>Cognome:</strong> {element.surname}</p>
                                                <p><strong>Telefono:</strong> {element.mobile}</p>
                                                <p><strong>Indirizzo:</strong> {element.address} {element.city}</p>
                                                <p><strong>Email:</strong> {element.email}</p>

                                            </div>
                                        )

                                    } else if (element.age !== undefined) {
                                        return (
                                            <div className="contElement" key={element.id}>

                                                <p><strong>ID:</strong>  {element._id}</p>
                                                <p><strong>Nome:</strong>  {element.name}</p>
                                                <p><strong>Età:</strong>  {element.age}</p>
                                                <p><strong>Specie:</strong>  {element.breed}</p>
                                                <p><strong>Razza:</strong>  {element.type} </p>
                                                <p><strong>Peso:</strong>  {element.weight}</p>
                                                <p> <strong>Malattie Croniche: </strong> {element.diseases}</p>

                                            </div>
                                        )
                                    } else if (element.userMessage !== "") {
                                        return (
                                            <div className="contElement" key={element.id}>

                                                <p><strong>ID:</strong>{element._id}</p>
                                                <p><strong>PetID:</strong> {element.petId}</p>
                                                <p><strong>UserID:</strong> {element.userId}</p>
                                                <p><strong>Nome Utente:</strong> {element.userName} {element.userSurname}</p>
                                                <p><strong>Data:</strong> {element.date}</p>
                                                <p><strong>Messaggio Utente</strong> {element.userMessage}</p>
                                                <p><strong>Risposta:</strong> {element.vetMessage} </p>
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
                        <div className="researchResult">
                            <h2>Ricerca Veterinario Tramite ID</h2>
                            <input className='inputShort' type="text" name='text' title='text' onChange={onChangeHandler} placeholder="Inserire ID Veterinario" />
                            <div className="button" onClick={() => { axiosRequestFunction(); setCallFunction("vetId") }}>Cerca</div>
                        </div>
                        <div className="researchResult">
                            <h2>Ricerca Utente Tramite ID</h2>
                            <input className='inputShort' type="text" name='text' title='text' onChange={onChangeHandler} placeholder="Inserire ID Utente" />
                            <div className="button" onClick={() => { axiosRequestFunction(); setCallFunction("userId") }}>Cerca</div>
                        </div>
                        <div className="researchResult">
                            <h2>Ricerca Animale Tramite ID</h2>
                            <input className='inputShort' type="text" name='text' title='text' onChange={onChangeHandler} placeholder="Inserire ID Animale" />
                            <div className="button" onClick={() => { axiosRequestFunction(); setCallFunction("petId") }}>Cerca</div>
                        </div>
                    </div>
                    <div className="containerResearchByID">
                        {showResearchById !== undefined && (
                            <div>
                                {showResearchById.role === "vet" && (
                                    <div className="contElement">
                                        <div>
                                            <p><strong>ID:</strong> {showResearchById._id}</p>
                                            <p><strong>Nome:</strong>{showResearchById.name}</p>
                                            <p><strong>Cognome:</strong> {showResearchById.surname}</p>
                                            <p><strong>Specializzazione:</strong> {showResearchById.specialization}</p>
                                            <p><strong>Email:</strong> {showResearchById.email}</p>
                                        </div>
                                    </div>
                                )}

                                {showResearchById.role === "user" && (
                                    <div className="contElement">
                                        <p><strong>ID:</strong> {showResearchById._id}</p>
                                        <p><strong>Nome:</strong> {showResearchById.name}</p>
                                        <p><strong>Cognome:</strong> {showResearchById.surname}</p>
                                        <p><strong>Telefono:</strong> {showResearchById.mobile}</p>
                                        <p><strong>Indirizzo:</strong> {showResearchById.address} {showResearchById.city}</p>
                                        <p><strong>Email:</strong> {showResearchById.email}</p>

                                    </div>
                                )}

                                {showResearchById.age !== undefined && (
                                    <div className="contElement" >
                                        <p><strong>ID:</strong> {showResearchById._id}</p>
                                        <p><strong>Nome:</strong> {showResearchById.name}</p>
                                        <p><strong>Età:</strong> {showResearchById.age}</p>
                                        <p><strong>Specie:</strong> {showResearchById.breed}</p>
                                        <p><strong>Razza:</strong> {showResearchById.type} </p>
                                        <p><strong>Peso:</strong> {showResearchById.weight}</p>
                                        <p><strong>Malattie Croniche:</strong> {showResearchById.diseases}</p>
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