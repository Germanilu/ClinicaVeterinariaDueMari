import React, { useEffect, useState } from 'react';
import './RegisterPet.scss';
import { userData } from '../../Containers/User/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const RegisterPet = () => {
    //Var
    const credentials = useSelector(userData);
    const navigate = useNavigate();

    //Hooks
    const [msgError, setMsgError] = useState();
    const [petData, setPetData] = useState({
        name: '',
        type: '',
        breed: '',
        age: '',
        weight: '',
        diseases: '',
    });

    useEffect(() => {

    }, []);

    useEffect(() => {
        if (credentials.token === "") {
            navigate('/')
        }
    });

    //Functions
    const updatePetData = (e) => {
        setPetData({ ...petData, [e.target.name]: e.target.value });
    }

    const registerPet = async () => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            await axios.post("https://bbdd-cv2.herokuapp.com/api/pet/register", petData, config);
            setMsgError("Animale Registrato Correttamente!")
            setTimeout(() => {
                navigate('/')
            }, 3000);

        } catch (error) {
            setMsgError(error.response.data.message)
            setTimeout(() => {
                setMsgError("")
            }, 5000);
        }
    }

    return (
        <div className='registerPetDesign'>
            <h1>Registra un Animale</h1>
            <p>Prima di poter Utilizzare i nostri servizi registra un'animale</p>
            <div className="containerRegisterPet">
                <h1>Qualche dato del tuo amico...</h1>
                <div className="containerInput">
                    {/* Inputs */}
                    <div className="containerRegisterPetInput">
                        <div className="inputReg">
                            <p className='inputParReg'>Nome</p>
                            <input type="text" name='name' title='name' onChange={updatePetData} />
                        </div>
                        <div className="inputReg">
                            <p className='inputParReg'>Specie</p>
                            <select className='selectNewPet' name="type" onChange={updatePetData}>
                                <option value="default">Seleziona specie...</option>
                                <option value="Cane">Cane</option>
                                <option value="Gatto">Gatto</option>
                                <option value="Coniglio">Coniglio</option>
                                <option value="Roditore">Roditore</option>
                                <option value="Uccello">Uccello</option>
                            </select>
                        </div>
                        <div className="inputReg">
                            <p className='inputParReg'>Razza</p>
                            <input type="text" name='breed' title='breed' onChange={updatePetData} />
                        </div>
                        <div className="inputReg">
                            <p className='inputParReg'>Et??</p>
                            <input type="text" name='age' title='age' onChange={updatePetData} placeholder="GG/MM/AAAA" />
                        </div>
                        <div className="inputReg">
                            <p className='inputParReg'>Peso</p>
                            <input type="text" name='weight' title='weight' onChange={updatePetData} />
                        </div>
                        <div className="inputReg">
                            <p className='inputParReg'>Malattie Croniche</p>
                            <input type="text" name='diseases' title='diseases' onChange={updatePetData} />
                        </div>
                    </div>
                </div>
                {msgError}
                <div className="button" onClick={() => registerPet()}>Registra Animale</div>
            </div>
        </div>
    )
}
export default RegisterPet;