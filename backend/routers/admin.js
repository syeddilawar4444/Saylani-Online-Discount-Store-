const express = require("express")
const router = express.Router()
const AdminModel = require("../models/AdminModel")
// const Chats = require("../models/Chats")

router.post("/login",  async(req,res)=>{
    const data = req.body
    //1) Is admin Exists
    const userExists = await AdminModel.findOne({email:data.email})
    if(!userExists){
    return res.send({message:"No such user exists"})
    }
    //2) Check password if it's correct
    const isPwdCorrect = userExists.comparePassword(data.password)
    if(!isPwdCorrect){
        // return res.send({message:"Invalid Password"})
    }
    //3)Genreate Token
    const token = await userExists.generateToken()
    res.send({message:"Login Successfully",token:token})
})





//get data to data base just link MongoDb
                // router.get("/getChat",  async(req,res)=>{
                //         const chats = await Chats.find({})
                //     res.send({message:"get Data",data:chats})
                // })

//Add Data to data Base just link Mongo Db
                // router.post("/addChat",async(req,res)=>{
                //         const chatData = req.body
                //         const chatAddData = new Chats(chatData)
                //         const data = await chatAddData.save()
                //         res.send({message:"Add Data to Mongo Data Base",data:data})
                // })

//update data base just link Mongo Db
                // router.put("/updateChat/:id",(req,res)=>{ 
                //     Chats.findByIdAndUpdate(req.params.id,req.body,(err,result)=>{
                //         if (!err) {
                //             res.send({ message: 'UPDATED' })
                //         } else {
                //             res.send({ message: err })
                //         }
                //     })
                // })
//delete Chat From Mongo Db
            // router.delete("/deleteChat/:id",(req,res)=>{
            // console.log("id ==>",req.params.id)
            // Chats.findByIdAndDelete(req.params.id,{},(err,result)=>{
            //     if (!err) {
            //         res.send({ message: 'Data deleted successfully' })
            //     } else {
            //         res.send({ message: err })
            //     }
            // })


            //     // res.send({wording:"delete to Data"})
            // })
module.exports = router