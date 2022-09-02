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
        password2:''
    })
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



    return (
        <div className='superAdminDesign'>
           <h1> Benvenuto {credentials.user_name}</h1>
           <div className="superAdminContainer">
            <div className="vetContainer">
                <div className="registerVet">
                <h1>Registrare Veterinario</h1>
                    <input className='inputShort' type="text" name='name' title='name' onChange={updateVetData} />
                    <input className='inputShort' type="text" name='surname' title='surname' onChange={updateVetData} />
                    <input className='inputShort' type="text" name='specialization' title='specialization' onChange={updateVetData} />
                    <input className='inputShort' type="email" name='email' title='email' onChange={updateVetData} />
                    <input className='inputShort' type="password" name='password' title='password' onChange={updateVetData} />                
                    <input className='inputShort' type="password" name='password2' title='password2' onChange={updateVetData} />  
                    {msgError}
                    <div className="button" onClick={() => vetRegister()}>Crea Veterinario</div>              
                </div>

            </div>
           </div>
        </div>
    )
}
export default SuperAdminPanel;