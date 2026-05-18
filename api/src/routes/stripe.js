const router = require('express').Router();
const StripeKy = process.env.STRIPE_SEC_KEY;
const Stripe = require("stripe")(StripeKy);

router.post("/payment", (req, res)=>{

    Stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "GBP",
    }, (stripeErr, stripeRes) => {
        if(stripeErr){
            res.status(500).json(stripeErr);
        } else {
            res.status(200).json(stripeRes);
        }
    }
    );
});

module.exports = router; 