import React, { useEffect, useState } from 'react';
import './UserConsult.scss'
import { userData } from '../../User/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserConsult = () => {

    //Var
    const credentials = useSelector(userData);
    const navigate = useNavigate()


    //hooks
    const [pets, setPets] = useState([])
    const [message,SetMessage] = useState({petId: '', userMessage: ''})
    const [msgError,setMsgError] = useState()
    const [infoChoosenPet, setInfoChoosenPet] = useState()

    //Trigger verifyPet and detect when message.petId change to be able to display pet data on box
    useEffect(() => {
        verifyPet()
        dataPet()
    }, [message.petId])


    useEffect(() => {
        if (credentials.token === '') {
            navigate('/login')
        }
    })

    //Check if user have pet register, otherwise will redirect to /registerPet
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
                console.log(pets)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Function to update the message of the consult
    const updateMessage = (e) => {
        SetMessage({ ...message, [e.target.name]: e.target.value})
        console.log(message)
    }

    //Post new consult
    const createConsult = async() => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };
            //message get the petid selected and the userMessage inside the box and make the request
            const attempt = await axios.post("https://bbdd-cv2.herokuapp.com/api/newConsult", message, config)
            if(attempt.status === 200){
                setMsgError("Consulta Inviata con Successo! Ti risponderemo entro 48h")
            }
        } catch (error) {
            if(message.petId == "default"){
                setMsgError("Devi selezionare un'animale");
                setTimeout(() => {
                    setMsgError("")
                }, 5000);
            }else if(message.userMessage == ""){
                setMsgError("Il messagio è vuoto, Scrivi qualcosa");
                setTimeout(() => {
                    setMsgError("")
                }, 5000);
            }
            console.log(error)
        }
    }

    //Retrive dataPet 
    const dataPet = async() => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            const attempt = await axios.get(`https://bbdd-cv2.herokuapp.com/api/pets${message.petId}`,config)
            console.log(attempt)
            setInfoChoosenPet(attempt.data.data)
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='consultDesign'>
            <div className="consultText">Scrivi la tua consulta, entro 48h ti risponderemo!</div>
            <div className="containerConsult">

                <div className="boxContainerConsultData">
                    {/* Mapping result of pets from axios inside the dropdown menu */}
                    <select name="petId" className='selectPet' onChange={updateMessage}> 
                        <option name='default' value="default">Seleziona un'Animale</option>
                        {pets.map(element => (
                            <option key={element.id}  value={element._id} >{element.name}</option>
                        ))}
                    </select>
                    <div className="containerDataPet">
                        {infoChoosenPet !== undefined && 
                        <div>
                            <p>Nome: {infoChoosenPet.name}</p>
                            <p>Specie: {infoChoosenPet.type}</p>   
                            <p>Razza: {infoChoosenPet.breed}</p>   
                            <p>Età: {infoChoosenPet.age}</p>   
                            <p>Peso: {infoChoosenPet.weight} KG</p>   
                        </div>
                        }

                    </div>
                </div>

                <div className="boxContainerConsult">
                    <textarea name="userMessage" className='inputConsult' placeholder="Scrivi qui... " onChange={updateMessage}></textarea>
                    {msgError}
                    <div className="button buttonConsult" onClick={()=> createConsult()}>Invia Consulta</div>

                </div>

            </div>
        </div>
    )
}
export default UserConsult;