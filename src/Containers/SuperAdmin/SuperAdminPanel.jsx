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
    const [vetId, setVetId] = useState()
    const [vet, setVet] = useState([])
    const [msgError, setMsgError] = useState()

    const updateVetData = (e) => {
        setVetData({ ...vetData, [e.target.name]: e.target.value })
    }


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

    //Use to set the hook vet with the vet ID 
    const onChangeHandler = (e) => {
        setVetId(e.target.value)
        console.log(vetId)
    }

    const findVet = async () => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };
            const attempt = await axios.get(`https://bbdd-cv2.herokuapp.com/api/vet/${vetId}`, config)
            console.log(attempt)
            setVet(attempt.data.data)
        } catch (error) {
            console.log(error)

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

                    {/* Box Find Vet */}
                    <div className="findVet">
                        <h1>Cercare Veterinario</h1>
                        <input className='inputShort' type="email" name='email' title='email' onChange={onChangeHandler} />
                        <div className="button" onClick={() => findVet()}>Cerca</div>

                        <div className="resultContainer">
                            {vet.name !== undefined &&
                                <div>
                                    <p>Id: {vet._id} </p>
                                    <p>Nome: {vet.name} </p>
                                    <p>Cognome: {vet.surname} </p>
                                    <p>Specializzazione: {vet.specialization} </p>
                                    <p>Email: {vet.email} </p>
                                </div>
                            }
                        </div>


                    </div>


                </div>
            </div>
        </div>
    )
}
export default SuperAdminPanel;