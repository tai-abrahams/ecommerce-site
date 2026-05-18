import { useState, useEffect } from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { userRequest } from "../../requestMethods"


export default function FeaturedInfo() {
  const [ income, setIncome ] = useState([]);
  const [ perc, setPerc ] = useState(0);
  const [originalVal, setOriginalVal] = useState(0);
  const [newVal, setNewVal] = useState(0);
  function compareFn(a,b){
    return a._id - b._id;
}
  useEffect(()=>{
    
    const getIncome = async () => {
      try{
        
        const res = await userRequest.get("orders/income");
        res.data.sort(compareFn)
        console.log(res.data)
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
        // setOriginalVal( (res[0]?.total === undefined) ? 0 : res[0].total );
        // console.log(originalVal)
        // setNewVal( res.data[1]?.total === undefined ? 0 : res.data[1].total);

        // setPerc(((newVal - originalVal)/originalVal)*100);
        
      } catch(err){
        console.log(err);
      };
      
    }; 

    getIncome();
    console.log(income)
    
  },[]);
  //console.log(`the new value: ${newVal},\nthe original value: ${originalVal}` );
   console.log("income: ", income)
 
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total === undefined ? 0 : income[1].total}</span>
          <span className="featuredMoneyRate">
            {Math.floor(isNaN(perc) ? 0 : perc)}{" "}% 
            {
              perc < 0 ? (
                <ArrowDownward  className="featuredIcon negative"/>
                ) 
                : <ArrowUpward  className="featuredIcon positive"/>
            }
            
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
