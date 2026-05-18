import React from 'react'

const Register = () => {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center m-0 vh-100 vw-100" 
            style={{
                backgroundImage:
                `linear-gradient(
                    rgba(255, 255, 255, 0.5),
                    rgba(255, 255, 225, 0.5)
                ), url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto-compress&cs=tinysrgb&dpr=2&h=650&w=940")`,
                backgroundPosition:"center"
            }}>
            <div className="wrapper w-50 bg-light p-4">
                <h3 className="fw-light">CREATE AN ACCOUNT</h3>
                <form className="d-flex flex-wrap">
                    <input placeholder="first name" className="mt-3 me-2 ms-0 mb-0 p-2" style={{flex:1, minWidth:"40%"}}/>
                    <input placeholder="last name" className="mt-3 me-2 ms-0 mb-0 p-2" style={{flex:1, minWidth:"40%"}} />
                    <input placeholder="username" className="mt-3 me-2 ms-0 mb-0 p-2" style={{flex:1, minWidth:"40%"}} />
                    <input placeholder="email" className="mt-3 me-2 ms-0 mb-0 p-2" style={{flex:1, minWidth:"40%"}} />
                    <input placeholder="password" className="mt-3 me-2 ms-0 mb-0 p-2" style={{flex:1, minWidth:"40%"}} />
                    <input placeholder="confirm password" className="mt-3 me-2 ms-0 mb-0 p-2" style={{flex:1, minWidth:"40%"}} />
                    <span className="agreement my-4 mx-0" style={{fontSize:"12px"}}>
                        By creating this account, i consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>.
                    </span>
                    <button className="border-0 px-2 py-3 text-white" style={{cursor:"pointer", width:"40%", backgroundColor:"#0097a7"}}>CREATE</button>
                </form>
            </div>
        </div>
    )
}

export default Register
