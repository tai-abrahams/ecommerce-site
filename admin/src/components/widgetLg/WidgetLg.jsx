import "./widgetLg.css";
import { useEffect , useState } from "react";
import { userRequest } from "../../requestMethods"
import { format } from "timeago.js"

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const [ orders, setOrders ] = useState([]);

  useEffect(()=>{
        const getOrders = async () =>{
          
          try{
            const res = await userRequest.get("orders");
            setOrders(res.data);
          } catch(err){ console.error(err)};
           
        };
    

        getOrders();
  },[]);

  return (
    <div className="widgetLg">
      <h3 className="fw-bold fs-3">Latest transactions</h3>
      <table className="w-100" style={{borderSpacing:"20px"}}>
        <thead className="widgetLgTr">
          <tr>
            <th className="text-start fw-bolder fs-4">Customer</th>
            <th className="text-start fw-bolder fs-4">Date</th>
            <th className="text-start fw-bolder fs-4">Amount</th>
            <th className="text-start fw-bolder fs-4">Status</th>
          </tr>
        </thead>
        

        {
          orders.map((order)=>(
            <tbody key={order._id}>
              <tr className="widgetLgTr">
                <td className="display-flex align-items-center fw-bolder">
                  <span className="fw-semibold">{order.userId}</span>
                </td>
                <td className="widgetLgDate">{format(order.createdAt)}</td>
                <td className="widgetLgAmount">{order.amount}</td>
                <td className="widgetLgStatus fw-bold">
                  <Button type={order.status} />
                </td>
              </tr>
            </tbody>
            

          ))
        }

      </table>
    </div>
  );
}
