import React from 'react';
import './Header.scss'

import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {userData, logOut} from '../../Containers/User/userSlice';


const Header = () => {

    //Const
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const credentials = useSelector(userData);
    

    //Function to navigate 
    const move = (i) => {
        if(i === "/login"){
            navigate(i)
            window.location.reload();
        }else{
            navigate(i)
        }
    }

    //Validation
    if(!credentials?.user_role){
        return (
            <div className='headerDesign'>
                <div className="logo" onClick={() => move('/')}><img src={require('../../img/logoBlur.png')} alt="Logo Duemari" className='logo' /></div>
                <div className="containerMenu">
                    <div className="headerButton" onClick={() => move('/consult')}>Consulto Online</div>
                    <div className="headerButton" onClick={() => move('/reserve')}>Richiedi Appuntamento</div>
                    <div className="headerButton" onClick={() => move('/login')}>Accedi</div>
                </div>
            </div>
        )
    }else{
        return(
            <div className='headerDesign'>
                <div className="logo" onClick={() => move('/')}><img src={require('../../img/logoBlur.png')} alt="Logo Duemari" className='logo' /></div>
                <div className="containerMenu">
                    <div className="headerButton" onClick={() => move('/consult')}>Consulto Online</div>
                    <div className="headerButton" onClick={() => move('/reserve')}>Richiedi Appuntamento</div>
                    <div className="headerButton">Profilo</div>
                    <div className="headerButton" onClick={() => dispatch(logOut())}>Logout</div>
                </div>
            </div>
        )
    }

   
}
export default Header;