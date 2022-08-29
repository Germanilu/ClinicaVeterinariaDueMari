import React, { useEffect, useState } from 'react';
import './Profile.scss'
import { userData } from '../../User/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const credentials = useSelector(userData);
    const navigate = useNavigate()

    useEffect(() => {
        console.log(credentials)
    })


    useEffect(() => {
        // if (credentials.token === '') {
        //     navigate('/login')
        // }
    })

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

            <div className="petContainer">
                <h1>I Miei Animali</h1>
            </div>
        </div>
    )
}
export default Profile;