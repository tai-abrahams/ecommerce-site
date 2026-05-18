import React, {useEffect, useState } from 'react'
import { popularProducts } from './data'
import Product from './Product'
import axios from 'axios'

const Products = ({matches, cat, filters, sort}) => {

    const [ products, setProducts ] = useState([]);
    const [ filteredProducts, setFilteredProducts ] = useState([]);

     useEffect(()=>{
        const getProducts = async ()=>{
            try{
            //get request from api
                const res = await axios.get(cat ? `http://localhost:8080/api/products?category=${cat}` : "http://localhost:8080/api/products");
                setProducts(res.data);
                
            } catch(err){

            }
        };
        getProducts();
         
     },[cat]);
    console.log(filters)
     useEffect(()=>{
         //if cat, set filtered products
         cat && setFilteredProducts(
    //FIX TO DISPLAY NUMBER OF SIZES. UNAVAILABLE IF SIZE HAS ZERO MEDIUMS ETC
    //ADD OPTION TO REMOVE FILTER
             
             //filter individual existing products (item )from fetched api against filters state items
             products.filter((item)=>//entire products data which hold sizing and colours from api, to be filtered for matches against our filters state (filters holding requested user selected filters) e.g. M, white. If any product matches white will be shown
                Object.entries(filters).every(([key, value])=>
                    //check that each key/value pair of filters state is included in the existing products key/value pairs. If not it should be filtered out by the filter method
                    item[key].includes(value)
                    //console.log("KEY:" + key+ ". VALUE:" + value)

                )
             )

         );
     },[products, cat, filters])

     useEffect(()=>{
         if(sort === 'newest'){
             setFilteredProducts((prev)=>
                 [...prev].sort((a,b)=> a.createdAt - b.createdAt)
             );
         } else if(sort === 'asc'){
             setFilteredProducts((prev)=>
                 [...prev].sort((a,b)=> a.price - b.price)
             );   
         } else {
             setFilteredProducts((prev)=>
                 [...prev].sort((a,b)=> b.price - a.price)
             );
            }
     },[sort]);
     
    return (
        <div className="container-fluid d-flex my-4 p-2 flex-sm-row flex-column align-items-md-center justify-content-between justify-content-md-center">
            {!matches ? <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="w-25 ps-2 border-0">
                    <hr className="border-0 bg-dark" />
                </div>
                <h1 className="text-black-50"></h1>
                <div className="w-25 pe-2">
                    <hr className="border-0 bg-dark" />
                </div>
            </div> : null
            } 
            {/*console.log(filteredProducts)*/}
            { //filteredProducts && console.log("filtered: " + filteredProducts)
                cat 
                ? filteredProducts.map((item)=>(<Product item={item} key={item.id} />)) 
                : products.slice(0, 8).map((item)=>(<Product item={item} key={item.id} />)) 
            }
        </div>
    )
}

export default Products
