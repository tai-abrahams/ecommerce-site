import React from 'react'

const Button = ({type, name, borderFill}) => {
    return (
        <button className="fw-bold p-2" 
        style={{
            cursor:"pointer", 
            border: (borderFill === "filled" && "none"), 
            backgroundColor: (borderFill === "filled" ? "black" : "transparent"),
            color: (borderFill === "filled" && "white")
            }}>
            {name}
        </button>
    )
}

//create transition as mentioned in cart

export default Button
