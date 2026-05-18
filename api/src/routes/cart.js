const router = require('express').Router();
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("../middlewares");
const Cart = require("../models/Cart");


//CREATE
router.post("/", async (req, res)=>{
    const newCart = new Cart(req.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart); 
    } catch(err){
        res.status(500).json(err)
    }
})


//UPDATE ? add password or accesstoken from login ? // login in with decrypted password, password needs encrypting before being stored, so update is required
router.put("/:id", verifyTokenAndAuthorization, async(req, res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SEC
            ).toString();
    } //test this all in postman and see in mongodb if the accessToken changes

    try{
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }, {new:true}
        )
        res.status(200).json(updatedCart)
    } catch(err){
        res.status(500).json(err)
    }
} )

//DELETE Cart
router.delete("/:id", verifyTokenAndAuthorization, async (req, res)=>{
    //check id in params matches id in database/req.user
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart Deleted");
    } catch(err){
        res.status(500).json(err)
    }
});


//get user cart
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res)=>{
    //check id in params matches id in database/req.user
    try{

        const cart = await Cart.findOne({userId:req.params.id});
        res.status(200).json(cart);

    } catch(err){
        res.status(500).json(err)
    }
});

//get all Carts

router.get("/", verifyTokenAndAdmin, async (req, res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router; 