import {
  MailOutline,
  PermIdentity,
  Publish,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import "./user.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectUser, updateSelectUser } from "../../redux/apiCalls"



export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const selectUser = useSelector((state => state.selectUser.selectUser))
  const dispatch = useDispatch();
  const [editedUser, setEditedUser] = useState([])
  
  const capitalized = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  };

  useEffect(()=>{
    try{
      getSelectUser(dispatch, userId);
      //console.log(selectUser)
    } catch(e){
      console.error(e)
    }
   
  },[dispatch, userId]);

  const handleChange = (e)=>{
    setEditedUser({...editedUser, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e)=>{
    updateSelectUser(dispatch, editedUser);
  }

  
  console.log(editedUser)
  return (
    //create code where if the info is null then make the space editable or make it that there is a edit button to instantly edit
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
            {
                selectUser.fullname &&
                 <span className="userShowUsername">{capitalized(selectUser.fullname)}</span>
              }
             
              {/*<span className="userShowUserTitle">Software Engineer</span>*/}
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              {/*<span className="userShowInfoTitle">{capitalized(selectUser.username)}</span>*/}
            </div>
            {/*<div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>*/}
            <span className="userShowTitle">Contact Details</span>
            {/*<div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
          </div>*/}
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{(selectUser.email)}</span>
            </div>
            {/*<div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
        </div>*/}
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="username00"
                  className="userUpdateInput"
                  defaultValue={selectUser.username}
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  name="full name"
                  placeholder="Anna Becker"
                  className="userUpdateInput"
                  defaultValue={selectUser.fullname}
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="user@user.com"
                  className="userUpdateInput"
                  defaultValue={selectUser.email}
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Photo</label>
                <input
                  type="file"
                  name="display picture"
                  defaultValue=""
                  />
              </div>
              {/*<div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                />
      </div>*/}
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" onSubmit={handleSubmit}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
