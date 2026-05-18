import React from 'react'
import { Send } from '@material-ui/icons'

function Newsletter({matches}) {
    return (
        <div className="container-fluid bg-light d-flex align-items-center justify-content-center flex-column" style={{height: "60vh"}}>
            <h1 className="mb-2 fw-bold" style={{fontSize:"60px"}}>Newsletter</h1>
            <div className="description fs-1 mb-2 fw-2 text-center">Get timely updates on your favourite products.</div>
            <div className={`d-flex justify-content-between ${!matches ? "w-100" : "w-50"} bg-white border-0`} style={{height:"40px"}}>
                <input className="border-secondary border-1 px-3" placeholder="Enter email address here." style={{outline:"none", flex:8}}/>
                <button className="button submit border-0" style={{flex:1, backgroundColor:"teal", color:"white"}}>
                    <Send />
                </button>
            </div>
            
        </div>
    )
}

export default Newsletter
