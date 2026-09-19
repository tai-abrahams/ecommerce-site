const router = require('express').Router();
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("../middlewares");
const Order = require("../models/Order");
const Product = require("../models/Product");


//CREATE
router.post("/", async (req, res)=>{
    //find productId against product schema
    //const orderReq = req.body;
    //console.log(req.body.productId);

    
    //use the found product data to populate the Order schema
    const newOrder = new Order(req.body);
    //console.log(product);
    try{
         const savedOrder = await newOrder.save();
         res.status(200).json(savedOrder);
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
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }, {new:true}
        );
        res.status(200).json(updatedOrder)
    } catch(err){
        res.status(500).json(err)
    }
} )

//DELETE Order
router.delete("/:_id", verifyTokenAndAdmin, async (req, res)=>{
    //check id in params matches id in database/req.user

    try{
        const deleteOrder = await Order.findOneAndDelete({_id:req.params._id});
        res.status(200).json({deleted:deleteOrder});  
    } catch(err){
            res.status(500).json({message:err});

    }
    
    
});


//get user Orders
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res)=>{
    //check id in params matches id in database/req.user
    console.log(req.params)

    try{

        const orders = await Order.find({userId:req.params.userId})
        .populate("userId")
        .populate("products.productId")
        .lean();
        res.status(200).json(orders);

    } catch(err){
        res.status(500).json(err)
    }
});

//get all orderss

router.get("/", verifyTokenAndAdmin, async (req, res)=>{
    try{
        const orders = await Order.find()
        .populate('userId')
        .populate('products.productId');
        
        
        // const formattedOrders = orders.map(({_id, ...others})=>({
        //     'id':_id,
        //     ...others
        // }));

        // console.log(formattedOrders);
        res.status(200).json(orders);
        
        //console.log(formattedOrders) //use mongoose virtuals instead + remove .lean()
    } catch(err){
        res.status(500).json(err);
        console.error("My API error: " + err.message)
    }
});

//GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res)=>{
    const productId = req.query.pid;
    console.log(req.query)
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() -1));
    const prevMonth = new Date(date.setMonth(lastMonth.getMonth() -1));
    
    //console.log(lastMonth , prevMonth);

    try{
        const income = await Order.aggregate([ 
                {
                    $match: {
                        $expr:{
                            $or:[
                                {
                                    $eq:[    
                                        {
                                            $dateFromParts:{
                                                'month': {$month:'$createdAt'},
                                                'year': {$year: '$createdAt'}
                                            }
                                        },
                                        {
                                            $dateFromParts:{
                                                'month': {$month:lastMonth},
                                                'year':{$year:lastMonth}
                                            }
                                        }
                                    ], 
                                },
                                {
                                    $eq:[    
                                        {
                                            $dateFromParts:{
                                                'month': {$month:'$createdAt'},
                                                'year': {$year: '$createdAt'}
                                            }
                                        },
                                        {
                                            $dateFromParts:{
                                                'month': {$month:prevMonth},
                                                'year':{$year:prevMonth}
                                            }
                                        }
                                    ]
                                }          
                            ]       
                        },
                        ...(productId && {products: {$elemMatch:{productId}}})
                    } 
                },
                {
                    $project:{
                        month: {$month:'$createdAt'},     
                        sales:'$amount'
                    }
                },
                {
                    $group: {
                        _id:'$month',
                        total: {$sum: '$sales'}
                    }
                }    
        ]);

        console.log(income);
        return res.status(200).json(income);
        

    } catch(err){
        return res.status(500).json()
    };
    
})

module.exports = router; 