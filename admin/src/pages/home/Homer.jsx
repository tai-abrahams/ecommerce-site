import { useMemo, useState, useEffect, useCallback } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { userRequest } from "../../requestMethods";
import {  useSelector } from 'react-redux'



//self scan myself for inferiority, things thatll stand out. i feel comfortable or confident when i stop scanning myself amd have all my focus on the outside world. Ive first got to somehow beleive im fine in order to take focus off my body, my walk, my speech, my words etc.


export default function Home() {
  //home.js get value aka localstorage obj
  //const LStorageValues = [JSON.parse(localStorage.getItem("persist:root"))];
  //const modifiedUsers = LStorageValues?.user

  //JSON.parse(localUser.currentUser).username = 'TD_Cakes'
  // const storageString = JSON.parse(storage)
  // const user = storageString.user ='papers';
  return (
    <div className="home">
     {/*console.log(modifiedUsers)*/}
     Power
    </div>
  );
}
