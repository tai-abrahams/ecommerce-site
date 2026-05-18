import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DeleteOutline, AccountCircle } from "@mui/icons-material";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../redux/apiCalls";
import { deepOrange } from "@mui/material/colors";




const PREFIX = 'UserList';

const classes = {
  root: `${PREFIX}-root`,
  styledAv: `${PREFIX}-styledAv`
};

const Root = styled('div')({
  [`& .${classes.root}`]: {
    marginRight:'300px'
  }
  
});

const AvatarComp = styled(Avatar)(({theme})=>({
  backgroundColor: theme.palette.info.main,
  marginRight: theme.spacing(2)
}))



export default function UserList() {
  const dispatch = useDispatch();
  useEffect(()=>{
    getUsers(dispatch);
  },[dispatch]);
  
  const [data, setData] = useState(userRows);
  const users = useSelector( state => state.users.users);
  
  console.log(users);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const capitalized = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }
  
  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <Root className="userListUser">
            <AvatarComp
              src={params.row.img}
            />
            {capitalized(params.row.username)}
          </Root>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    <AccountCircle/>
    </div>
  );
}
