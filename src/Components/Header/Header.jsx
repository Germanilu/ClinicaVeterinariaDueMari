import React, { useEffect, useState }  from 'react';
import './Header.scss'
import MenuProfile from '../MenuProfile/MenuProfile';

import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {userData, logOut} from '../../Containers/User/userSlice';


const Header = () => {

    //Const
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const credentials = useSelector(userData);

    //Hooks
    const [show,setShow] = useState(false)
    

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
                <div className="logoHeader" onClick={() => move('/')}><img src={require('../../img/logoClinicaNoBG.png')} alt="Logo Duemari" className='logoHeaderImg' /></div>
                <div className="containerMenu">
                    <div className="headerButton" onClick={() => move('/consult')}>Consulto Online</div>
                    <div className="headerButton" onClick={() => move('/reserve')}>Richiedi Appuntamento</div>
                    <div className="headerButton" onClick={() => move('/login')}>Accedi</div>
                </div>
            </div>
        )
    }else if(credentials?.user_role !== "user"){
        return(
            <div className='headerDesign'>
                <div className="logoHeader" onClick={() => move('/')}><img src={require('../../img/logoClinicaNoBG.png')} alt="Logo Duemari" className='logoHeaderImg' /></div>
                <div className="containerMenu">
                    <div className="headerButton" onClick={() => move('/vetConsult')}>Consulte</div>
                    <div className="headerButton" onClick={() => move('/vetReserve')}>Appuntamenti</div>
                    <div className="headerButton" onClick={() => dispatch(logOut())}>Logout</div>
                </div>
            </div>
        )
    }
    
    else{
        return(
            <div className='headerDesign'>
                <div className="logoHeader" onClick={() => move('/')}><img src={require('../../img/logoClinicaNoBG.png')} alt="Logo Duemari" className='logoHeaderImg' /></div>
                <div className="containerMenu">
                    <div className="headerButton" onClick={() => move('/consult')}>Consulto Online</div>
                    <div className="headerButton" onClick={() => move('/reserve')}>Richiedi Appuntamento</div>
                    <div className="headerButton" onClick={() => setShow(!show)}>Profilo</div>
                    <div className="headerButton" onClick={() => dispatch(logOut())}>Logout</div>
                </div>
                {show? <MenuProfile setShow={setShow} show={show}/>: null}
            </div>
        )
    }

   
}
export default Header;