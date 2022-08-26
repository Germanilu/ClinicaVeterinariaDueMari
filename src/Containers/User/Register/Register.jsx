import React, { useState } from 'react';
import './Register.scss';
import axios from 'axios';

const Register = () => {

    //Hooks
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        mobile: '',
        address: '',
        city: '',
        email: '',
        password: '',
        password2: '',
    });
    const [msgError, setMsgError] = useState()
    const [register, setRegister] = useState('');

    //Functions
    const updateUserData = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const userRegister = async () => {

        //Regular expression
        //Email
        if (!userData.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
            setMsgError('Introdurre Email valida');
            setTimeout(() => {
                setMsgError("")
            }, 3000);
            return;
        }
        //Password
        if (!userData.password) {
            setMsgError("Devi inserire una password");
            setTimeout(() => {
                setMsgError("")
            }, 3000);
            return
        }
        if (!userData.password.match(/^(?=.*[*@!#%&()^~{}]).*$/)) {

            setMsgError("La password deve avere un carattere speciale");
            setTimeout(() => {
                setMsgError("")
            }, 3000);
            return;
        }

        if (userData.password !== userData.password2) {
            setMsgError("Le password non coincidono")
            setTimeout(() => {
                setMsgError("")
            }, 3000);
            return;
        }

        try {
            const attempt = await axios.post("https://bbdd-cv2.herokuapp.com/api/auth/register", userData)
            if (attempt.status === 200) {
                setRegister(true);
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }
        } catch (error) {
            setMsgError(error.response.data.message)
        }
    }

    if (register === true) {
        return (
            <div className='registerDesign'>
                <div className="containerReg">
                    <div className="containerImgReg">
                        <div className="containerImgCircleReg">
                            <img src={require('../../../img/birdLoginNoBG.png')} alt="" className='imgRegister' />
                        </div>
                        <h2>Clinica Veterinaria DueMari</h2>
                        <p>Benvenuto, registrati per usufruire dei nostri servizi</p>
                    </div>
                    <div className="containerDataWelcome">
                        <h1>Hey!</h1>
                        <h2>Ciao! {userData.name}</h2>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='registerDesign'>
                <div className="containerReg">
                    <div className="card">
                        <div className="frontCard">
                            <div className="containerImgReg">
                                <div className="containerImgCircleReg">
                                    <img src={require('../../../img/birdLoginNoBG.png')} alt="" className='imgRegister' />
                                </div>
                                <h2>Clinica Veterinaria DueMari</h2>
                                <p>Benvenuto, registrati per usufruire dei nostri servizi</p>
                            </div>
                            <div className="containerDataRegister">
                                <h1>Registrati</h1>
                                {/* Inputs */}
                                <div className="inputsContainerReg">
                                    <div className="dataInputsReg">
                                        <div className="inputReg">
                                            <p className='inputParReg'>Nome</p>
                                            <input type="text" name='name' title='name' onChange={updateUserData} />
                                        </div>
                                        <div className="inputReg">
                                            <p className='inputParReg'>Cognome</p>
                                            <input type="text" name='surname' title='surname' onChange={updateUserData} />
                                        </div>

                                        <div className="inputReg">
                                            <p className='inputParReg'>Telefono</p>
                                            <input type="text" name='mobile' title='mobile' onChange={updateUserData} />
                                        </div>

                                        <div className="inputReg">
                                            <p className='inputParReg'>Indirizzo</p>
                                            <input type="text" name='address' title='address' onChange={updateUserData} />
                                        </div>

                                        <div className="inputReg">
                                            <p className='inputParReg'>Città</p>
                                            <input type="text" name='city' title='city' onChange={updateUserData} />
                                        </div>

                                        <div className="inputReg">
                                            <p className='inputParReg'>Email</p>
                                            <input type="email" name='email' title='email' onChange={updateUserData} />
                                        </div>

                                        <div className="inputReg">
                                            <p className='inputParReg'>Password</p>
                                            <input type="password" name='password' title='password' onChange={updateUserData} />
                                        </div>

                                        <div className="inputReg">
                                            <p className='inputParReg'>Ripeti Password</p>
                                            <input type="password" name='password2' title='password2' onChange={updateUserData} />
                                        </div>
                                    </div>
                                    {msgError}
                                    <div className="buttonRegister" onClick={() => userRegister()}>Registrati</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Register;