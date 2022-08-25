import React, { useState } from 'react';
import './Register.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    //Hooks
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        cf: '',
        mobile: '',
        address: '',
        city: '',
        email: '',
        password: '',
    });
    const [msgError, setMsgError] = useState()

    //Var
    const navigate = useNavigate();


    //Functions
    const updateUserData = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const userRegister = async () => {
        try {
            let data = ['name', 'surname', 'cf', 'mobile', 'address', 'city', 'email', 'password'];

            for (let field of data) {
                if (userData[field] === '') {
                    setMsgError(`Mancano dati essenziali, devi compilare ${[field]}`)
                }
            }

            //Regular expression
            //Email
            if (!userData.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
                setMsgError('Introdurre Email valida');
                return;
            }
            //Password
            if (!userData.password.match(/^(?=.*[*@!#%&()^~{}]).*$/)) {

                setMsgError("La password deve avere un carattere speciale");
                return;
            }

            const attempt = await axios.post("https://bbdd-cv2.herokuapp.com/api/auth/register", userData)
            if (attempt.status === 200) {
                console.log("REGISTRATO CORRETTAMENTE")
                setTimeout(() => {
                    navigate('/login')
                }, 2000);
            }
        } catch (error) {
            setMsgError(error.response.data.message)
        }
    }
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
                                    <p className='inputParReg'>Codice Fiscale</p>
                                    <input type="text" name='cf' title='cf' onChange={updateUserData} />
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
                            </div>
                            {msgError}
                            <div className="buttonRegister" onClick={() => userRegister()}>Registrati</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    



export default Register;