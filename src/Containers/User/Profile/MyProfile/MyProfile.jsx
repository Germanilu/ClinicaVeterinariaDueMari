import React, { useEffect, useState } from 'react';
import './MyProfile.scss'
import { updateUser, userData } from '../../userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    //var
    const credentials = useSelector(userData);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //hooks
    const [pets, setPets] = useState([])
    const [msgError, setMsgError] = useState()
    const [petData,setPetData] = useState([])
    console.log(petData)

    //To update userProfile with redux
    const [userProfile, setUserProfile] = useState({
        user_name: credentials.user_name,
        user_surname: credentials.user_surname,
        user_email: credentials.user_email,
        user_address: credentials.user_address,
        user_city: credentials.user_city,
        user_mobile: credentials.user_mobile,
        user_token: credentials.user_token,
        user_password: credentials.user_password,
        user_password: ""
    })

    useEffect(() => {
        myPet()
    }, [])


    useEffect(() => {
        if (credentials.token === '') {
            navigate('/login')
        }
    })

    //Retrive all pets by user ID
    const myPet = async () => {
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

    //To set hook userProfile with new Data
    const handlerInputs = (e) => {
        setUserProfile({ ...userProfile, [e.target.name]: e.target.value })
    }

    //To set the hook for the Pet
    const handlerPetInputs = (e) => {
        setPetData({ ...petData, [e.target.name]: e.target.value })
    }

    //Function that dispatch userData to redux 
    const editDetails = () => {
        if (userProfile.user_password == "") {
            setMsgError("Devi inserire la password");
            setTimeout(() => {
                setMsgError("")
            }, 3000);
        } else if (userProfile.user_password !== userProfile.user_password2) {
            setMsgError("Le due password non coincidono");
            setTimeout(() => {
                setMsgError("")
            }, 3000);
        } else {
            dispatch(updateUser(credentials, userProfile))
        }
    }

    //Function to edit pet data
    const editPetData = async(id) => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            const attempt = await axios.put(`https://bbdd-cv2.herokuapp.com/api/pet${id}`, petData, config)
            console.log(attempt)
        } catch (error) {
            console.log(error)
        }
    }

    //Function to delete pet
    const deletePet = async(id) => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            const attempt = await axios.delete(`https://bbdd-cv2.herokuapp.com/api/pet${id}`, config)
            console.log(attempt)
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='profileDesign'>
            {/* User Profile */}
            <div className="profileContainer">
                <h1>Il mio Profilo</h1>
                <div className="userInfo">
                    <input type="text" name='user_name' title='name' value={userProfile.user_name} disabled />
                    <input type="text" name='user_surname' title='surname' value={userProfile.user_surname} disabled />
                    <input type="text" name='user_mobile' title='mobile' value={userProfile.user_mobile} onChange={handlerInputs} />
                    <input type="text" name='user_address' title='address' lenght='30' value={userProfile.user_address} onChange={handlerInputs} />
                    <input type="text" name='user_city' title='city' value={userProfile.user_city} onChange={handlerInputs} />
                    <input type="email" name='user_email' title='email' value={userProfile.user_email} onChange={handlerInputs} />
                    <p>Password</p>
                    <input type="password" name='user_password' title='password' value={userProfile.user_password} onChange={handlerInputs} />
                    <input type="password" name='user_password2' title='password' value={userProfile.user_password2} onChange={handlerInputs} />
                </div>

                <div className="containerButtonProfile">
                    {msgError}
                    <div className="button buttonProfile" onClick={() => editDetails()}>Aggiorna Dati</div>
                </div>
            </div>

            {/* Pet Profile */}
            <div className="profilePetContainer">
                <h1>I Miei Animali</h1>
                <div className="petResult">
                    {pets.map(element => (
                        <div className="containerPet" key={element._id}>
                            <div className="firstSectionPet">
                            <div className="actualProfilePet">
                                <input className='inputPet' type="text" name='pet_name' title='name' value={element.name} />
                                <input className='inputPet' type="text" name='pet_type' title='type' value={element.type} />
                                <input className='inputPet' type="text" name='pet_age' title='age' value={element.age} />
                                <input className='inputPet' type="text" name='pet_weight' title='weight' value={element.weight} />
                                <input className='inputPet' type="text" name='pet_breed' title='breed' value={element.breed} />
                                <input className='inputPet' type="text" name='pet_deseases' title='deseases' value={element.diseases} />
                            </div>

                            {/* Container to change Pet information */}
                            <div className="actualProfilePet">
                                <input className='inputPet' type="text" name='weight' title='weight' placeholder='Aggiorna Peso' onChange={handlerPetInputs} />
                                <input className='inputPet' type="text" name='diseases' title='diseases' placeholder='Aggiorna Malattie Croniche' onChange={handlerPetInputs} />
                            </div>
                            </div>

                            {/* Button section */}
                            <div className="secondSectionPet">
                            <div className="containerButtonPet">
                                
                                <div className="button" onClick={() => deletePet(element._id)}>Elimina</div>
                                <div className="button" onClick={() => editPetData(element._id)} >Modifica</div>
                            </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
export default Profile;