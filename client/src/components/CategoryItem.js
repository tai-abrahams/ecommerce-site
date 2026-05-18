import React from 'react'
import { Link } from 'react-router-dom'
const CategoryItem = ({item}) => {
    return (
        <div className="container-fluid d-flex p-0 m-1 border" style={{flex:'1', height:"80vh", position: "relative"}}>
            <Link to= {`/products/${item.cat}`}>
                <img src={item.image} alt="" className="h-100 w-100" style={{objectFit:"cover"}} />
            
            <div className="d-flex flex-column position-absolute align-items-center justify-content-center w-100 h-100" id="info"
                style={{
                    top: "0",
                    left: "0"
            }}>
                <h1 className="title text-white mb-3">{item.title}</h1>
                    <button className="border-0 p-2 bg-white text-secondary fw-bolder" style={{cursor:"pointer"}}>SHOP NOW</button>
            </div>
            </ Link>
        </div>
    )
}

export default CategoryItem
