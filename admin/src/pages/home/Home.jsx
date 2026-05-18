import { useMemo, useState, useEffect } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import {userRequest} from "../../requestMethods";


export default function Home() {

  const [ userStats, setUserStats ] = useState([]);
  const MONTHS = useMemo(
    ()=>[
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],[]
  );

  useEffect(()=>{
    
      console.log('post-render')
      const getStats = async ()=>{
               try{
                console.log(userRequest)
                const res = await userRequest.get("users/stats");
                res.data.map((item)=>
                  setUserStats((prevStats) =>[
                    ...prevStats,
                    { name: MONTHS[item._id - 1], "Active User": item.total },
                  ])
                );
              
               } catch (err){
                 console.log(err)
               }
          };
          getStats();
},[MONTHS])
console.log(userStats)
  
  
  return (
    <div className="home">
      {console.log('rendered first')}
      <FeaturedInfo />
      <Chart 
        data={userStats}
        title="User Analytics" 
        grid dataKey="Active User"
      />
      <div className="homeWidgets"> 
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
