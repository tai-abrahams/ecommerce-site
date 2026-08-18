import "./transactionsList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import { getAllTransactions } from "../../redux/apiCalls";
import { Avatar, AvatarGroup } from "@mui/material";



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
                width: "200px",
                renderCell:(params)=>{
                    console.log("Cell Row Data:", params.row);
                    console.log("Products Array:", params.row?.products);
                    const products = params.row?.products || [];

                    // if(!Array.isArray(products) || products.length === 0){
                    //     return <span>"no products"</span>;
                    // };
                        return (
                            //<AvatarGroup max={4} sx={{ display:'flex',alignItems:'center',height:"100%"}}>
                            <div style={{display:"flex",gap:4,alignItems:"center"}}>
                                { products.map((item,index)=>{
                                    // const imgUrl = item?.productId?.img;
                                    // const imgKey = item?._id;
                                    const product = item?.productId?.img || item?.img;
                                    return(
                                        <div key={index} style={{border:"1px solid black"}}>
                                            <Avatar 
                                                // key={imgKey || index} 
                                                // src={imgUrl}
                                                // alt={`Product ${index +1}`}
                                                src={product}
                                            >
                                                {index +1}
                                                </Avatar>
                                        </div>
                                    )
                                })}
                            </div>
                            //</AvatarGroup>
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
    
    
    console.log(transactions)

    const transactionsProducts = transactions?.map((transaction)=>{
        return transaction.products;
    });

    console.log(transactionsProducts)

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

