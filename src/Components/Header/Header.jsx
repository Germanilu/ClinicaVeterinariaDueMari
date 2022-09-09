import React, { useEffect, useState }  from 'react';
import './Header.scss'
import MenuProfile from '../MenuProfile/MenuProfile';

import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {userData, logOut} from '../../Containers/User/userSlice';
import { ReactComponent as Hamburger } from '../../img/hamburguerMenu.svg';

const Header = () => {

    //Const
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const credentials = useSelector(userData);

    //Hooks
    const [show,setShow] = useState(false);
    //Responsive Hook
    const [openMenu, setOpenMenu] = useState(false);
    

    //Function to navigate 
    const move = (i) => {
        if(i === "/login"){
            navigate(i);
            window.location.reload();
        }else{
            navigate(i);
        }
    };

    //Validation
    if(!credentials?.user_role){
        return (
            <div className='headerDesign'>
                <div className="logoHeader" onClick={() => move('/')}><img src={require('../../img/logoClinicaNoBG.png')} alt="Logo Duemari" className='logoHeaderImg' /></div>
                <i className='hamburguerMenu' onClick={() => setOpenMenu(!openMenu) }>
                    <Hamburger/> 
                    </i>
                <div className={openMenu? "containerMenuResp": "containerMenu"}>
                    <div className="headerButton" onClick={() =>{ move('/consult'); setOpenMenu(false)}}>Consulto Online</div>
                    <div className="headerButton" onClick={() =>{ move('/reserve'); setOpenMenu(false)}}>Richiedi Appuntamento</div>
                    <div className="headerButton" onClick={() => move('/login')}>Accedi</div>
                </div>
            </div>
        )
    }else if(credentials?.user_role !== "user"){
        return(
            <div className='headerDesign'>
                <div className="logoHeader" onClick={() => move('/')}><img src={require('../../img/logoClinicaNoBG.png')} alt="Logo Duemari" className='logoHeaderImg' /></div>
                <i className='hamburguerMenu' onClick={() => setOpenMenu(!openMenu) }><Hamburger/> </i>
                <div className={openMenu? "containerMenuResp": "containerMenu"}>
                    <div className="headerButton" onClick={() =>{ move('/vetConsult'); setOpenMenu(false)}}>Consulte</div>
                    <div className="headerButton" onClick={() =>{ move('/vetReserve'); setOpenMenu(false)}}>Appuntamenti</div>
                    <div className="headerButton" onClick={() => dispatch(logOut())}>Logout</div>
                </div>
            </div>
        )
    }
    
    else{
        return(
            <div className='headerDesign'>
                <div className="logoHeader" onClick={() => move('/')}><img src={require('../../img/logoClinicaNoBG.png')} alt="Logo Duemari" className='logoHeaderImg' /></div>
                <i className='hamburguerMenu' onClick={() => setOpenMenu(!openMenu) }><Hamburger/> </i>
                <div className={openMenu? "containerMenuResp": "containerMenu"}>
                    <div className="headerButton" onClick={() =>{ move('/consult'); setOpenMenu(false)}}>Consulto Online</div>
                    <div className="headerButton" onClick={() =>{ move('/reserve'); setOpenMenu(false)} }>Richiedi Appuntamento</div>
                    <div className="headerButton" onClick={() => setShow(!show)}>Profilo</div>
                    <div className="headerButton" onClick={() => dispatch(logOut())}>Logout</div>
                </div>
                {show? <MenuProfile setShow={setShow} setOpenMenu={setOpenMenu}/>: null}
            </div>
        )
    }

   
}
export default Header;