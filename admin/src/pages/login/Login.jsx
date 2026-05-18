import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";

const Login = ({admin}) => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    
    //const message = useSelector((state)=>state.loggedUser?.message);
    const dispatch = useDispatch();
    
    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
    };
    

   
    return (
        
        <div className="d-flex align-items-center justify-content-center vh-100 flex-column">
            <input
                className="p-2 m-2" 
                type="text"
                placeholder = "username"
                onChange={e=>setUsername(e.target.value)}
            />
            <input
                className="p-2 m-2"
                type="password"
                placeholder="password" 
                onChange={(e)=>setPassword(e.target.value)}
            />
            <button 
                type="button" 
                className="btn btn-light p-2 border rounded-3 border-1 link-secondary" 
                style={{width:"100px"}} 
                onClick={handleClick}
            >
                    submit
            </button>
        {
        //message && <span className="fs-6 text-danger">{message}</span>
        }

        </div>
    )
}

export default Login;