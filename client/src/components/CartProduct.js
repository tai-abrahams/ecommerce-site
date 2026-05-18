import React from 'react'
import { Add, Remove } from "@material-ui/icons"

const CartProduct = ({colors, size, id, productName, img, price, quantity }) => {
    return (
        <div className="product d-flex justify-content-between">
            <div className="productDetail d-flex " style={{flex:2}}>
                <img 
                    src={img}
                    style={{width:"200px"}}
                />
                <div className="details p-4 d-flex flex-column justify-content-around">
                    <div className="productName">
                        <b>Product:</b> {productName}
                    </div>
                    <span className="productId"> 
                        <b>ID:</b> {id}
                    </span>
                    <span className="productColor" style={{width:"20px", height:"20px", borderRadius:"50%", backgroundColor:colors}}>
                    </span>
                    <span className="productSize">
                        <b>Size:</b> {size}
                    </span>
                </div>
            </div>
            <div className="priceDetail d-flex flex-column justify-content-center align-items-center" style={{flex:1}}>
                <div className="productAmountContainer d-flex align-items-center ">
                    <Add />
                    <div className="productAmount fs-3 m-1">{quantity}</div>
                    <Remove />
                </div>
                <div className="productPrice fw-lighter" style={{fontSize:"30px"}}>
                    £{price}
                </div>
            </div>  
        </div>
    )
}

export default CartProduct
