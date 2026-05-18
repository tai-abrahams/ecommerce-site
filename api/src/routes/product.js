const router = require('express').Router();
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("../middlewares");
const Product = require("../models/Product");


//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res)=>{
    const newProduct = new Product(req.body);

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct); 
    } catch(err){
        res.status(500).json(err)
    }
})


//UPDATE ? add password or accesstoken from login ? // login in with decrypted password, password needs encrypting before being stored, so update is required
router.put("/:id", verifyTokenAndAdmin, async(req, res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SEC
            ).toString();
    } //test this all in postman and see in mongodb if the accessToken changes

    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }, {new:true}
        )
        res.status(200).json(updatedProduct)
    } catch(err){
        res.status(500).json(err)
    }
} )

//DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async (req, res)=>{
    //check id in params matches id in database/req.user
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product Deleted");
    } catch(err){
        res.status(500).json(err)
    }
});


//get product
router.get("/find/:id", async (req, res)=>{
    //check id in params matches id in database/req.user
    try{

        const product = await Product.findById(req.params.id);
        res.status(200).json(product);

    } catch(err){
        res.status(500).json(err)
    }
});

//get all products

router.get("/", async (req, res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category
    try{
        let products;
    //LEARN
        if(qNew){
            products = await Product.find().sort({createdAt:-1}).limit(5);
        } else if(qCategory){
            products = await Product.find({categories:{
                $in:[qCategory],
            },
          });
        }else{
            products = await Product.find()
        }
            
        res.status(200).json(products);
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router; 