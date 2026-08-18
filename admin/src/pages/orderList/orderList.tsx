import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { userRequest } from "../../requestMethods";
import "./orderList.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function OrderList() {

    
   /* useEffect(() => {
  // declare the async data fetching function
  const fetchData = async () => {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    // waits for 1000ms
    await sleep(1000);
    return 'Hello World';
  };

  const result = fetchData()
    // make sure to catch any error
    .catch(console.error);;

  // what will be logged to the console?
  console.log(result);
}, []) */

useEffect(()=>{
    
    //const [ allOrders, setAllOrders] = useState({});
    const fetchAllOrders = async () => {//this possibly could be done in my reducer, fetchAllOrders should be an action so that we can do the error handling there not in our useEffect
            try{
                const res = await userRequest.get('/orders');
                console.log(res.data)
                return res.data;
            } catch(err){
                console.log("useEffect error:" + err.message);
            }
                 
        
    };

    fetchAllOrders();
    
    
    // const mapFetchedOrderId = fetchAllOrders.map(({_id:id, ...order})=>{
    //         return (
    //             setAllOrders({
    //             id,
    //             ...order
    //         }))
       //return mapFetchedOrderId();
    
    //};
    

},[])
    

    const column: GridColDef[] =[
        {
            
            field: "col1",
            headerName: "order no.:",
            width:150
        }, 
        {
            field:"col2",
            headerName:'Product', 
            width:150
        },
        {
            field:"col3",
            headerName:"Email",
            width: 250
        }
    ]

    const rows : GridRowsProp = [
        {
            id:1,
            col1:"00912345",
            col2:"Red Sneaker",
            col3:"taiwo.abrahams@icloud.com"
        },
        {
            id:2,
            col1:"00987654",
            col2:"pink t-shirt",
            col3:"dee.abrahams@icloud.com"
        }
]


    
    return(
        <div className="orderList">
            <DataGrid 
            rows={rows} 
            columns={column} 
            />
        </div>
    );
}