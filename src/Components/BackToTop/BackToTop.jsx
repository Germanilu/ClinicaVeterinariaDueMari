import React from 'react';
import './BackToTop.scss'
import { useEffect, useState } from 'react';
 
const BackToTop = () => {

    const [backToTop, setBackToTop] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 150){
                setBackToTop(true)
            }else{
                setBackToTop(false)
            }
        })
    },[])

    const scrollUp = () => {
        window.scrollTo({
            top:0,
            behavior: "smooth"
        })
    }

     return (
         <div>
            {backToTop && (
                <button className="buttonToTop" onClick={() => scrollUp()} ><svg width="24" height="24" viewBox="0 0 24 24"><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/></svg></button>
            )}
         </div>
     )
}
export default BackToTop;