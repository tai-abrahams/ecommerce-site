const router = require('express').Router();
const StripeKy = process.env.STRIPE_SEC_KEY;
const stripe = require("stripe")(StripeKy);
const myDomain = "https://localhost:3000/"

router.post("/create-product", async (req, res)=>{

    try{
        const { productName, desc, images} = req.body;
        const product = await stripe.products.create({
            name: productName,
            description: desc,
            images: images
        });

        const price = await stripe.prices.create({
            product: `${product.id}`,
            unit_amount: 2500,
            currency: "GBP"
        });
        
        res.status(200).json(product);
    } catch(err){
        console.error(err)
        res.status(500).json(err)
    }
    

    

});


// const price = await stripe.prices.create({
//     product: 'PRODUCT_ID',
//     unit_amount: 280,
//     currency : 'GBP'
// });


// router.post("/payment", (req, res)=>{

//     stripe.charges.create({
//         source: req.body.tokenId,
//         amount: req.body.amount,
//         currency: "GBP",
//     }, (stripeErr, stripeRes) => {
//         if(stripeErr){
//             res.status(500).json(stripeErr);
//         } else {
//             res.status(200).json(stripeRes);
//         }
//     }
//     );
// });

// router.post("/create-checkout-session", async (req, res)=>{
//     const session = await stripe.checkout.sessions.create({
//         line_items: [
//             {
//                 price: price_1UBvzQGwNfdBPd2uzgzVhUnS,
//                 quantity: 1
//             }
//         ],
//         mode:'payment',
//         success_url:`${myDoman}?success=true`,
//         integration_identifier: integration_id
//     });
//     console.log(session.url);
//     res.redirect(303, session.url);
// })

module.exports = router; 