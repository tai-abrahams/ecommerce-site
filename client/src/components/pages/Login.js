import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, loginReset } from '../../redux/apiCalls';

const Login = () => {
    const dispatch = useDispatch();
    const [password, setPassword ] = useState("");
    const [ username, setUsername ] = useState("");
    const { isFetching, error, currentUser } = useSelector((state) => state.user)
    const handleClick = (e)=>{
        e.preventDefault();
        login(dispatch, {username, password});
    }

    useEffect(()=>{
        !currentUser && loginReset(dispatch)
    },[])

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center m-0 vh-100 vw-100" 
            style={{
                backgroundImage:
                `linear-gradient(
                    rgba(255, 255, 255, 0.5),
                    rgba(255, 255, 225, 0.5)
                ), url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto-compress&cs=tinysrgb&dpr=2&h=650&w=940")`,
                backgroundPosition:"center",
                backgroundSize:"cover"
            }}>
            <div className="wrapper w-25 bg-light p-3">
                <h3 className="fw-light">SIGN IN</h3>
                <form className="d-flex flex-column">
                    <input type="text" placeholder="username" className="my-2 mx-0 p-2" style={{flex:1, minWidth:"40%"}} onChange={(e)=>setUsername(e.target.value)} />
                    <input type="password" placeholder="password" className="my-2 mx-0 p-2" style={{flex:1, minWidth:"40%"}} onChange={(e)=>setPassword(e.target.value)} />
   
                    <button  disabled={isFetching} className="border-0 px-2 py-3 my-1" style={{ width:"40%", backgroundColor:"#0097a7", cursor: isFetching ? 'not-allowed' : "pointer" , color: isFetching ? "#0097a7" : "white" }}  onClick={handleClick}>LOGIN</button>
                    {
                        error &&  <span className="text-danger">Something went wrong!</span>
                    }
                    <Link to="" className="my-1 mx-0 text-decoration-underline link-secondary" style={{fontSize:"12px"}}>FORGOTTEN PASSWORD? CLICK HERE.</Link>
                    <Link to="" className="my-1 mx-0 text-decoration-underline link-secondary" style={{fontSize:"12px"}}>CREATE ACCOUNT</Link>
                </form>
            </div>
        </div>
    )
}

export default Login
