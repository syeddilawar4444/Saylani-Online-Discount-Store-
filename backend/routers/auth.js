const express = require("express")
const Users = require("../models/Users")
const router = express.Router()

router.get("/", async(req,res)=>{
    const data = await Users.find()
    res.send({data:data})
})


//register request fronted
router.post("/register", async(req,res)=>{
    // alert("data")
console.log("data is here===>",res.body)
    try{
        const data = req.body
        const user = new Users(data)
        //before save to call the pre function to make the models/Users.js
         const result = await user.save()
        res.send({message:"register success fully",users:result})
    }catch(error){
        return res.send(error)
    }
})


//user login request to frontend
router.post("/login", async(req,res)=>{
    const data = req.body
    //1) Is User Exists
    const userExists = await Users.findOne({email:data.email})
    if(!userExists){
    return res.send({message:"No Such User Exists"})
    }
    //2) Check password if it's correct
    const isPwdCorrect = userExists.comparePassword(data.password)
    if(!isPwdCorrect){
        return res.send({message:"Invalid email password"})
    }
    //3)Genreate Token
    const token = await userExists.generateToken()
    res.send({message:"Login Successfully",token:token})
})
module.exports = router