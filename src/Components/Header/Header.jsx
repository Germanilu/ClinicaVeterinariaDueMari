import React from 'react';
import './Header.scss'
const Header = () => {
     return (
         <div className='headerDesign'>
            <div className="logo">Logo Clinica</div>
            <div className="containerMenu">
                <div className="headerButton">Consulto Online</div>
                <div className="headerButton">Richiedi Appuntamento</div>
                <div className="headerButton">Accedi</div>
            </div>
         </div>
     )
}
export default Header;