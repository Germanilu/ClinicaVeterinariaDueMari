import React, { useEffect, useState } from 'react';
import './MyConsult.scss'
import { userData } from '../../userSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';

const MyConsult = () => {

    //Var
    const credentials = useSelector(userData);
    const [allConsult, setAllConsult] = useState([])

    useEffect(() => {
        consult()
    },[] )


    useEffect(() => {
        // if (credentials.token === '') {
        //     navigate('/login')
        // }
    })

    const consult = async() => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${credentials.token}` }
            };

            const attempt = await axios.get("https://bbdd-cv2.herokuapp.com/api/myConsult", config)
            console.log(attempt)
            setAllConsult(attempt.data.data)

        } catch (error) {
            console.log(error)
        }
    }

     return (
         <div className='myConsultDesign'>
            <div className="myConsultContainer">
            {allConsult.map(element => (
                        <div className="myConsultBox" key={element.id}>
                            <div className="myConsultDate">{element.date}</div>
                        </div>
                        ))}
                
            </div>
         </div>
     )
}
export default MyConsult;