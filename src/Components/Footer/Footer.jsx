import React from 'react';
import './Footer.scss'
import { useNavigate } from 'react-router-dom';

//Svg
import { ReactComponent as Fb } from '../../img/fb.svg'
import { ReactComponent as Yt } from '../../img/yt.svg'
import { ReactComponent as Palla } from '../../img/palla.svg'


const Footer = () => {
    //Const
    const navigate = useNavigate()

    //Function to navigate 
    const move = (i) => {
        navigate(i)
    }

    return (
        <div className='footerDesign'>
            <div className="logo" onClick={() => move('/')}><img src={require('../../img/logoBlur.png')} alt="Logo Duemari" className='logo' /></div>
            <div className="socialContainer">
                <ul class="wrapper">
                    <a href="https://www.facebook.com/clinica.duemari/">
                        <li class="icon facebook">

                            <span class="tooltip">Facebook</span>
                            <span><i class="fab fa-facebook-f"><Fb /></i></span>
                        </li>
                    </a>
                    <a href="http://www.effettopallaonlus.it/">
                        <li class="icon onlus">
                            <span class="tooltip">Onlus</span>
                            <span><i class="fab fa-onlus"><Palla /></i></span>
                        </li>
                    </a>
                    <a href="https://www.youtube.com/channel/UCFOQ9UPNZvWb_fibjl19s3A">
                        <li class="icon youtube">
                            <span class="tooltip">Youtube</span>
                            <span><i class="fab fa-youtube"><Yt /></i></span>
                        </li>
                    </a>
                </ul>
            </div>
        </div>
    )
}
export default Footer;