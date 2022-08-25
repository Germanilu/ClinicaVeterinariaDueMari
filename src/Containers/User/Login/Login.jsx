import React, { useEffect, useState } from 'react';
import './Login.scss';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, userData } from '../userSlice';

const Login = () => {

    //Hooks
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [msgError, setMsgError] = useState();

    //Var
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const updateCredentials = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    //Function to navigate 
    const move = (i) => {
        navigate(i)
    }

    const login = () => {

        //Regular expression to validate email
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(credentials.email)) {
            setMsgError(" Introduci un'email valida ");
            return;
        }
        //Regular Expression to validate Password
        if (credentials.password.length > 5) {
            if (! /[\d()+-]/g.test(credentials.password)) {
                setMsgError("Introduci una password Valida");
                return;
            }
        }

        setMsgError("")

        //Dispatch credentials to loginUser(Redux) & hook msgError
        dispatch(loginUser({ email: credentials.email, password: credentials.password }, setMsgError))

    }

    return (
        <div className='loginDesign'>
            <div className="containerLogin">
                <div className="containerImg">
                    <div className="containerImgCircle">
                        <img src={require('../../../img/birdLoginNoBG.png')} alt="" className='imgLogin' />
                    </div>
                    <h2>Clinica Veterinaria DueMari</h2>
                        <p>Benvenuto, esegui l'accesso per usufruire i nostri servizi</p>
                </div>
                <div className="containerDataLogin">
                    <h1>Benvenuto!</h1>
                    {/* Inputs */}
                    <div className="inputsContainer">
                        <div className="inputEmail">
                            <p className='inputPar'>Email</p>
                            <input type="email" name='email' title='email' onChange={updateCredentials} />
                        </div>
                        <div className="inputPassword">
                            <p className='inputPar'>Password</p>
                            <input type="password" name='password' title='password' onChange={updateCredentials} />
                        </div>
                        <div className="buttonLogin" onClick={() => login()}>Accedi</div>
                        {msgError}
                        <div className="containerRegister">
                            <p>Non sei ancora registrato?  <span className='redirRegister' onClick={() => move('/register')}>Crea un Account</span> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;