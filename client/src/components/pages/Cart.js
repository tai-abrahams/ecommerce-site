import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar';
import Announcement from '../Announcement';
import Footer from "../Footer";
import Button from "../Button";
import CartProduct from "../CartProduct";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout"
import { userRequest } from '../../requestMethods';

const KEY = process.env.REACT_APP_STRIPE_KEY;

const Cart = () => {
    const cart = useSelector(state=>state.cart);
    const [ stripeToken, setStripeToken ] = useState(null);
    const history = useNavigate();
    const onToken = (token) =>{
        setStripeToken(token);
    };
    
    console.log(cart);
    
    useEffect(()=>{
        const makeRequest = async () =>{
            try{
                const res =  await userRequest.post('checkout/payment', {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100,
                });
                history.push("/success", { 
                    stripeData: res.data,
                    products: cart,
                });
            } catch {}
        };

        //only when stripe token exists on checking out should the makeRequest function be fired off
        stripeToken && makeRequest();

    }, [stripeToken, cart.total, history]);

    const round = (value, decimal)=>{
        let amount = value.toFixed(decimal)
        return parseFloat(amount)
    };

    console.log(cart)
    const orderAmount = round((cart.total+5.99), 2)

    return (
        <div className="container-fluid p-0 w-100">
            <Navbar />
            <Announcement />
            <div className="wrapper p-3">
                <h1 className="fw-light fs-3 text-center">
                    YOUR BAG.
                </h1>
                <div className="top d-flex align-items-center justify-content-between p-4">
                    <Button borderFill="none" name="CONTINUE SHOPPING" />
                    <div className="topTexts">
                        <span className="text-decoration-underline my-0 mx-3" style={{cursor:"pointer"}}>
                            Shopping Bag (2)
                        </span>
                        <span className="text-decoration-underline my-0 mx-3" style={{cursor:"pointer"}}>
                            Your Wishlist (0)
                        </span>
                    </div>
                    <Button borderFill="filled" name="CHECKOUT NOW" />
                </div>
                <div className="bottom d-flex justify-content-between">
                    <div className="info" style={{flex:3}}>
                        
                        {
                            cart.products.map((product) => (
                                <div>
                                <CartProduct
                                    img={product.img}
                                    productName={product.title}
                                    id={product._id}
                                    colors={product.color}
                                    size={product.size}
                                    price={product.price*product.quantity}
                                    quantity={product.quantity}
                                />
                                <hr style={{backgroundColor: "#333", border:"none", height:"1px"}}/>
                                </div>
                            ))
                            
                        }
                        {console.log(round(cart.total, 2))}
                </div>
                <div className="summary border rounded p-4" style={{flex:1, height: "50vh"}}>
                    <h1 className="summaryTitle">
                        ORDER SUMMARY
                    </h1>
                    <div className="summaryItem fw-lighter d-flex my-3 mx-0 justify-content-between">
                        <span className="summaryItemText">Subtotal</span>
                        <span className="summaryItemPrice">{round(cart.total, 2)}</span>
                    </div>
                    <div className="summaryItem fw-lighter d-flex my-3 mx-0 justify-content-between">
                        <span className="summaryItemText">Estimated Shipping: </span>
                        <span className="summaryItemPrice">£5.99</span>
                    </div>
                    <div className="summaryItem fw-lighter d-flex my-3 mx-0 justify-content-between">
                        <span className="summaryItemText">Shipping Discount:</span>
                        <span className="summaryItemPrice">-£5.99</span>
                    </div>
                    <hr style={{backgroundColor:"#333", border:"none", height:"1px"}}/>
                    <div className="summaryItem fw-light fs-3 d-flex my-3 mx-0 justify-content-between">
                        <span className="summaryItemText">Total:</span>
                        <span className="summaryItemPrice">{(round(orderAmount, 2) )}</span>
                    </div>
                    <StripeCheckout
                        name="ecommerce"
                        image="https://avatars.githubusercontent.com/u/1486366?v=4"
                        billingAddress
                        shippingAddress
                        description={`Your total is ${orderAmount}`}
                        amount={round(orderAmount*100, 2)}
                        token={onToken}
                        stripeKey={KEY}
                    >
                        <button className="btn btn-dark rounded-0 w-100 p-2 fw-bold border-0">CHECKOUT NOW</button> {/*button with loading transtion goes to specific color on hover, from one end to another (transition) */}  
                    </StripeCheckout>
                    
                </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Cart
