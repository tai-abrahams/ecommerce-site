import "./transactionsList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import { getAllTransactions } from "../../redux/apiCalls";
import { Avatar, AvatarGroup, Badge } from "@mui/material";
import { border, display } from "@mui/system";



export default function TransactionsList() {
    
    //const transactions = useSelector((state)=> state.transactions);
    // console.log(transactions)

    const [ transactions, setTransactions ] = useState([])
    
    useEffect( ()=>{
        const controller = new AbortController();
        const getTransactions = async ()=>{
            try{
                const res = await userRequest.get("/orders/", {
                    signal:controller.signal
                });
                return setTransactions(res.data);
            } catch(err){
                //ignore abort error caused by unmounting of components
                if(err.name !== "CanceledError" && err.name !== "AbortError"){
                    return console.error(err);
                }
            }
        };
        getTransactions()
    
        return ()=>{
            controller.abort();
        }
    },[]);

    let columns =
        [
            {
                field: "createdAt",
                headerName:"Order Date"
            },
            {
                field:"products",
                headerName:"Products",
                width: 200,
                renderCell:(params)=>{
                    console.log("Cell Row Data:", params.row);
                    console.log("Products Array:", params.row?.products);
                    const products = params.row?.products || [];
                   

                    if(!Array.isArray(products) || products.length === 0){
                        return <span>"no products"</span>;
                    };
                        return (
                            <AvatarGroup 
                                max={1} 
                                sx={{ 
                                    display:'flex',
                                    alignItems:'center',
                                    height:"100%",
                                    "& .MuiAvatar-root":
                                        {
                                            marginLeft:"0px", 
                                            marginRight:"10px"
                                        }
                                    }}
                            >
                            
                                { products.map((item,index)=>{
                                    const imgUrl = item?.productId?.img;
                                    const imgKey = item?._id;
                                    //const product = item?.productId?.img || item?.img;
                                    return(
                                        <div key={index} className="transactionAvatar">
                                            <Badge 
                                                badgeContent={item.quantity} 
                                                sx={{
                                                    '& .MuiBadge-badge':
                                                        {
                                                            backgroundColor:"#00c3cb", 
                                                            color:"white",
                                                            right:"30%",
                                                            top:"70%"
                                                        }
                                                    }}
                                                >
                                                <Avatar 
                                                    key={imgKey || index} 
                                                    src={imgUrl}
                                                    alt={`Product ${index +1}`}
                                                    
                                                >
                                                    {index +1}
                                                </Avatar>
                                            </Badge>
                                        </div>
                                    )
                                })}
                            
                            </AvatarGroup>
                        )
                    
                }
                
            },
            {
                field:"productPriceOnPurchase"
            },
            {
                field:"total"
            },
            
            {field:"view"}
        ]
    
    return(
        <div className="transactionList">
            <DataGrid 
            columns ={columns}
            
            rows = {transactions}
            getRowId={(row)=>row._id}
            >
            </DataGrid>
            
        </ div>
    )
}

