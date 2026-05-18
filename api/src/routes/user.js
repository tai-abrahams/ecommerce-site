const router = require('express').Router();
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("../middlewares");
const User = require("../models/User");

//UPDATE ? add password or accesstoken from login ? // login in with decrypted password, password needs encrypting before being stored, so update is required
router.put("/:id", verifyTokenAndAuthorization, async(req, res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SEC
            ).toString();
    } //test this all in postman and see in mongodb if the accessToken changes

    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }, {new:true}
        )
        res.status(200).json(updatedUser)
    } catch(err){
        res.status(500).json(err)
    }
} )

router.delete("/:id", verifyTokenAndAuthorization, async (req, res)=>{
    //check id in params matches id in database/req.user
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User Delete");
    } catch(err){
        res.status(500).json(err)
    }
});

//get user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res)=>{
    //check id in params matches id in database/req.user
    try{

        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;

        res.status(200).json(others);

    } catch(err){
        res.status(500).json(err)
    }
});

//get all users

router.get("/", verifyTokenAndAdmin, async (req, res)=>{
    const query = req.query.new;
    console.log(req.query)
    try{
        const users = 
            query
            ? await User.find().sort({_id: -1}).limit(5)
            : await User.find();
            
        res.status(200).json(users);
    } catch(err){
        res.status(500).json(err);
    }
});

//get stats

router.get("/stats", verifyTokenAndAdmin, async (req, res)=>{

    //user totals by month for year.. so far
    const date = new Date();
    const thisYear = new Date(date.getFullYear(), 0,1)
    //const lastYear = new Date(date.setFullYear(date.getFullYear()-1 ));
    console.log(thisYear)
    
    try{
        const data = await User.aggregate([
            {
              $match: { createdAt: { $gte: thisYear }}}, 
              {
                $project: {
                    month: { $month: "$createdAt"},
                },
               },
               { 
                    $group: {
                        _id: "$month",
                        total: { $sum: 1 },
                    },
                },
        ]);

        function compareFn(a,b){
            return a._id - b._id;
        }
        
        
        res.status(200).json(data);
        console.log(data)
    } catch (err){
        res.status(500).json(err);
    }
});

module.exports = router; 