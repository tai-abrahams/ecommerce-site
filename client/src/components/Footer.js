import React from 'react'
import { 
    Facebook, Twitter, Instagram, Pinterest, 
    Room, Phone, MailOutline 
    } from '@material-ui/icons'

const iconStyle = (bgcolor)=>({
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    color:"white",
    backgroundColor: bgcolor,
    cursor:"pointer"
    
    //color:"white"
})

const socials = [
    {
        id: 1,
        name: "Facebook",
        icon: <Facebook />,
        color: "#3B5999"
    },
    {
        id: 2,
        name: "Instagram",
        icon: <Instagram />,
        color: "#E4405F"
    },
    {
        id: 3,
        name: "Twitter",
        icon: <Twitter />,
        color: "#3B5999"
    },
    {
        id: 4,
        name: "Pinterest",
        icon: <Pinterest />,
        color: "#55ACEE"
    },
]


const Footer = () => {
    return (
        <div className="container-fluid d-flex flex-md-row flex-column">
            <div className="left d-flex flex-column my-5 p-4 border" style={{flex:1}}>
                <div className="fs-1 fw-bold" style={{letterSpacing:"-4px"}}>
                ecommerce.
                </div>
                <div className="desc my-3 mx-0">
                    There are many variations of passages of Lorem Ipsum available,
                    but the majority have suffered alteration in some form, by injected
                    humour, or randomised words which dont look even slightly believable.
                </div>
                <div className="socialContainer container d-flex flex-row my-2">
                { socials.map((social)=>(
                    <div className="d-flex align-items-center justify-content-center me-2" key={social.id} style={iconStyle(social.color)}>
                        {social.icon}
                    </div>
                ))}
                
                </div>
            </div>
            <div className="center my-5 p-4 border" style={{flex:1}}>
                <h3 className="mb-3 py-3 fs-3 fw-bold">
                    Useful Links
                </h3>
                <ul className="d-flex m-0 p-0 flex-wrap" style={{listStyle:"none"}}>
                    <li className="w-50 mb-3">Home</li>
                    <li className="w-50 mb-3">Cart</li>
                    <li className="w-50 mb-3">Man Fashion</li>
                    <li className="w-50 mb-3">Woman Fashion</li>
                    <li className="w-50 mb-3">Accessories</li>
                    <li className="w-50 mb-3">My Account</li>
                    <li className="w-50 mb-3">Order Tracking</li>
                    <li className="w-50 mb-3">Wishlist</li>
                    <li className="w-50 mb-3">Wishlist</li>
                    <li className="w-50 mb-3">Terms</li>
                </ul>
            </div>
            <div className="d-flex flex-column justify-content-center right my-5 p-4 border" style={{flex:1}}>
                <h3 className="d-flex fs-3 fw-bold justify-content-center">Contact</h3>
                <div className="contact-item d-flex flex-column justify-content-center align-items-center mb-4">
                    <Room className="me-4"/>
                    600 liverpool Street, London EC1 6EW
                </div>
                <div className="contact-item d-flex flex-column justify-content-center align-items-center mb-4">
                    <Phone className="me-4"/>
                    +44 7678 583120
                </div>
                <div className="contact-item d-flex flex-column justify-content-center align-items-center mb-4">
                    <MailOutline className="me-4"/>
                    contact@ecommerce.com
                </div>
                <div className="d-flex justify-content-center">
                    <img src="http://i.ibb.co/Qfvn4z6/payment.png" alt="payment methods" className="w-50"/>
                </div>
            </div>
            
        </div>
    )
}

export default Footer
