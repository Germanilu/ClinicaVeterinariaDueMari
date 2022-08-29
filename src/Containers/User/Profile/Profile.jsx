import React, { useEffect, useState } from 'react';
import './Profile.scss'
import { userData } from '../../User/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    //var
    const credentials = useSelector(userData);
    const navigate = useNavigate()

    //hooks
    const [pets,setPets] = useState([])

    useEffect(() => {
       
        myPet()
    },[])


    useEffect(() => {
        // if (credentials.token === '') {
        //     navigate('/login')
        // }
    })

    const myPet = async() => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            const attempt = await axios.get("https://bbdd-cv2.herokuapp.com/api/myPets", config)

            console.log(attempt)

            setPets(attempt.data.data)



        } catch (error) {
            
        }
    }

    return (
        <div className='profileDesign'>

            <div className="profileContainer">
                <h1>Il mio Profilo</h1>
                <div className="userInfo">
                    <p><strong>Nome: </strong>{credentials.user_name}</p>
                    <p><strong>Cognome: </strong>{credentials.user_surname}</p>
                    <p><strong>Telefono: </strong> {credentials.user_mobile}</p>
                    <p><strong>Indirizzo: </strong> {credentials.user_address} {credentials.user_city}</p>
                    <p> <strong>Email: </strong>{credentials.user_email}</p>

                </div>
                <div className="containerButtonProfile">
                    <div className="button buttonProfile">Modifica Profilo</div>
                </div>
            </div>

            <div className="profilePetContainer">
                <h1>I Miei Animali</h1>
                <div className="petResult">
                {pets.map(element => (
                    <div className="containerPet">{element.name}</div>
                ))}
                </div>
                
            </div>
        </div>
    )
}
export default Profile;