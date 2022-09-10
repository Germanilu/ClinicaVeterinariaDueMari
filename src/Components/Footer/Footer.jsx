import React from 'react';
import './Footer.scss';
import { useNavigate } from 'react-router-dom';

//Svg
import { ReactComponent as Fb } from '../../img/fb.svg';
import { ReactComponent as Yt } from '../../img/yt.svg';
import { ReactComponent as Palla } from '../../img/palla.svg';

const Footer = () => {
    //Const
    const navigate = useNavigate();

    //Function to navigate 
    const move = (i) => {
        navigate(i)
    };

    return (
        <div className='footerDesign'>
            <div className="logoFooter" onClick={() => move('/')}><img src={require('../../img/logoClinicaNoBG.png')} alt="Logo Duemari" className='imgLogo' /></div>
            <div className="socialContainer">
                <ul className="wrapper">
                    <a href="https://www.facebook.com/clinica.duemari/">
                        <li className="icon facebook">

                            <span className="tooltip">Facebook</span>
                            <span><i className="fab fa-facebook-f"><Fb /></i></span>
                        </li>
                    </a>
                    <a href="http://www.effettopallaonlus.it/">
                        <li className="icon onlus">
                            <span className="tooltip">Onlus</span>
                            <span><i className="fab fa-onlus"><Palla /></i></span>
                        </li>
                    </a>
                    <a href="https://www.youtube.com/channel/UCFOQ9UPNZvWb_fibjl19s3A">
                        <li className="icon youtube">
                            <span className="tooltip">Youtube</span>
                            <span><i className="fab fa-youtube"><Yt /></i></span>
                        </li>
                    </a>
                </ul>
            </div>
        </div>
    )
}
export default Footer;