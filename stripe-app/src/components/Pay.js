import React, { useState, useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios';

const KEY = process.env.REACT_APP_KEY;

const Pay = () => {
    const [ stripeToken, setStripeToken ] = useState(null);

    const onToken = (token) => {
        setStripeToken(token);
    }

    useEffect(()=>{

        const makeRequest = async () => {

            try{ 
                const res = await axios.post(
                    'http://localhost:8080/api/checkout/payment', 
                    {
                        tokenId: stripeToken.id,
                        amount: 2000,  
                    }
                );

                console.log(res.data);

            } catch(err){
                console.log(err);
            }
        };

        stripeToken && makeRequest()
        
    }, [stripeToken]);
    

  return (
      <StripeCheckout
        name="Tai's e-commerce"
        logo="https://avatars.githubusercontent.com/u/1486366?v=4"
        billingAddress
        shippingAddress
        description=""
        amount={2000}
        token={onToken}
        stripeKey={KEY}
      >
    <button 
        className="btn-dark
            button
            d-flex
            border
            border-dark
            rounded-3
            text-white
            align-items-center
            justify-content-center
            "
        style={{
            width:"120px", 
            height:"40px"
            }}
    >
        Pay Now { console.log(KEY)}
    </button>
    </ StripeCheckout>
  )
}

export default Pay;