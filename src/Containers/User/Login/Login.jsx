import React from 'react';
import './Login.scss';
 
const Login = () => {
     return (
         <div className='loginDesign'>
             <div className="containerLogin">
                 <div className="containerImg">Here IMG</div>
                 <div className="containerDataLogin">
                     <h1>Clinica Veterinaria DueMari</h1>
                     <h3>Login</h3>
                     {/* Inputs */}
                     <div className="inputsContainer">
                         <div className="inputEmail">
                             <p className='inputPar'>Email</p>
                             <input type="email" />
                         </div>
                         <div className="inputPassword">
                             <p className='inputPar'>Password</p>
                             <input type="password" />
                         </div>
                         <div className="buttonLogin">Login</div>
                         <div className="containerRegister">
                            <p>Non sei ancora registrato?  ---Arrow</p>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     )
}
export default Login;