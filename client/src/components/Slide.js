import React, { useState, useEffect } from 'react'
const mediaMatch = window.matchMedia('(max-width: 768px)');
//const [ matches, setMatches ] = useState(mediaMatch.matches); //redux/useContext

const Slide = (props) => {

    const [ matches, setMatches ] = useState(mediaMatch.matches);
    const { bg, image, title, desc, button } = props;

    useEffect(()=>{
        const handler = (e) => { setMatches(e.matches)};
        mediaMatch.addEventListener("change", handler);
        return () => mediaMatch.removeEventListener("change", handler);
    })

    return (
        
        <div className="container-fluid m-0 p-0 border border-primary">
            <div className="d-flex justify-content-center align-items-center vw-100 vh-100" 
                style={{
                        flex:"1",
                        backgroundImage:`url(${image})`,
                        backgroundSize:"cover",
                        backgroundPosition:"60% 50%"
                }}>
                {/*<div className="imgContainer d-flex h-100" style={{flex:"1"}}>
                    
                        <img src={image} className="img-fluid h-100" alt="" style={{objectFit:"cover", objectPosition: "65%"}}/>
                    
                </div>*/}
                <div 
                    className="infoContainer d-flex flex-column align-items-center justify-content-start w-75 h-auto m-0 p-0" 
                    /*style={{
                        flex:"1",
                        backgroundImage:`url(${image})`,
                        backgroundSize:"cover",
                        backgroundPosition:"center" 
                        }}*/
                >
                    <h1 className="title fw-bold w-75 text-left" style={{fontSize:`${ matches ? "40px" : "50px"}`, lineHeight:"38px"}}>
                        <span className="bg-white px-1 align-items-center text-center">
                            {title}
                        </span>
                    </h1>
                    <p className="desc fs-5 w-75"><span className="bg-white ">{desc}</span></p>
                    
                    <div className="d-flex justify-content-start p-0 w-75">
                        <button type="button" className={`btn btn-dark p-2 fs-6 rounded-0 w-auto ${matches ? "w-50" : "w-25"}`} style={{cursor:"pointer"}}>{button}</button>  
                    </div>        
                </div>
            </div>
        </div>

    )
}

export default Slide
