import React from 'react';
import './Register.scss';
const Register = () => {
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
                                <input type="text" name='name' title='name' />
                            </div>
                            <div className="inputReg">
                                <p className='inputParReg'>Cognome</p>
                                <input type="text" name='surname' title='surname' />
                            </div>

                            <div className="inputReg">
                                <p className='inputParReg'>Codice Fiscale</p>
                                <input type="text" name='cf' title='cf' />
                            </div>

                            <div className="inputReg">
                                <p className='inputParReg'>Telefono</p>
                                <input type="text" name='mobile' title='mobile' />
                            </div>

                            <div className="inputReg">
                                <p className='inputParReg'>Indirizzo</p>
                                <input type="text" name='address' title='address' />
                            </div>

                            <div className="inputReg">
                                <p className='inputParReg'>Città</p>
                                <input type="text" name='city' title='city' />
                            </div>

                            <div className="inputReg">
                                <p className='inputParReg'>Email</p>
                                <input type="email" name='email' title='email' />
                            </div>

                            <div className="inputReg">
                                <p className='inputParReg'>Password</p>
                                <input type="password" name='password' title='password' />
                            </div>
                        </div>
                        <div className="buttonRegister">Registrati</div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Register;