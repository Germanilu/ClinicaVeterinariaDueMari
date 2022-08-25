import React from 'react';
import './Header.scss'

import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {userData} from '../../Containers/User/userSlice';


const Header = () => {

    //Const
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const credentials = useSelector(userData);


    //Function to navigate 
    const move = (i) => {
        navigate(i)
    }

    //Validation
    if(!credentials?.user_role){
        return (
            <div className='headerDesign'>
                <div className="logo" onClick={() => move('/')}>Logo Clinica</div>
                <div className="containerMenu">
                    <div className="headerButton">Consulto Online</div>
                    <div className="headerButton">Richiedi Appuntamento</div>
                    <div className="headerButton" onClick={() => move('/login')}>Accedi</div>
                </div>
            </div>
        )
    }else{
        return(
            <div className='headerDesign'>
                Usuario Logueado
            </div>
        )
    }

   
}
export default Header;