import React from 'react';
import './Footer.scss'

import { ReactComponent as Fb } from '../../img/fb.svg'
import { ReactComponent as Ig } from '../../img/ig.svg'
import { ReactComponent as Yt } from '../../img/yt.svg'
import { ReactComponent as Tw } from '../../img/tw.svg'


const Footer = () => {

    return (
        <div className='footerDesign'>
            <div className="footerLogo">Logo Clinica</div>
            <div className="socialContainer">
                <ul class="wrapper">
                    <li class="icon facebook">
                        <span class="tooltip">Facebook</span>
                        <span><i class="fab fa-facebook-f"><Fb/></i></span>
                    </li>
                    <li class="icon twitter">
                        <span class="tooltip">Twitter</span>
                        <span><i class="fab fa-twitter"><Tw/></i></span>
                    </li>
                    <li class="icon instagram">
                        <span class="tooltip">Instagram</span>
                        <span><i class="fab fa-instagram"><Ig/></i></span>
                    </li>
                    <li class="icon youtube">
                        <span class="tooltip">Youtube</span>
                        <span><i class="fab fa-youtube"><Yt/></i></span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Footer;