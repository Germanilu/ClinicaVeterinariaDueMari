import React from 'react';
import './MenuProfile.scss'

import { useNavigate } from 'react-router-dom';

const MenuProfile = ({show,setShow}) => {
    
    const navigate = useNavigate()

    //This function is here to be able to navigate to section and also change the state of the MenuProfile Hook to be able to close it.
    const move = (i) => {
        navigate(i)
        setShow(false)
    }
     return (
         <div className='menuProfileDesign'>
            <div className="button" onClick={() => move('/registerPet')}>Nuovo Animale</div>
            <div className="button" onClick={() => move('/myReserve')}>Appuntamenti</div>
            <div className="button" onClick={() => move('/myConsult')}>I miei consulti</div>
            <div className="button" onClick={() => move('/myProfile')}>Il mio Profilo</div>
         </div>
     )
}
export default MenuProfile;