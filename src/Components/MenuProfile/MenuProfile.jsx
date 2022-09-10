import React from 'react';
import './MenuProfile.scss';

import { useNavigate } from 'react-router-dom';

const MenuProfile = ({ setShow,  setOpenMenu }) => {

    const navigate = useNavigate();

    //This function is here to be able to navigate to section and also change the state of the MenuProfile Hook to be able to close it.
    const move = (i) => {
        navigate(i);
        setShow(false);
        setOpenMenu(false);
    }
    return (
        <div className="menuProfileDesign">
            <ul className="dropdown">
                <li><div onClick={() => move('/registerPet')} className='anim-1 aProfile'>Nuovo Animale</div></li>
                <li><div onClick={() => move('/myReserve')}  className='anim-2 aProfile'>Appuntamenti</div></li>
                <li><div  onClick={() => move('/myConsult')} className='anim-3 aProfile'>I miei consulti</div></li>
                <li><div onClick={() => move('/myProfile')} className='anim-4 aProfile'>Il mio profilo</div></li>
            </ul>
        </div>
    )
}
export default MenuProfile;