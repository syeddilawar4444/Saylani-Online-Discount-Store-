
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const serverSecret = require("../config/jwt")

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: {
        required: true,
        type: String,
    },
    fullName: String,
    phoneNumber: Number,
    tokens:[String]
})

UserSchema.pre("save", function (next) {
    console.log("pre this", this)
    const user = this // user.password = 123456
    if(user.isModified("password")){
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(user.password, salt);
        user.password = hash
    }
    next()
})

//compare Password FE input password to compair to data Base Encription password to call the auth.js
UserSchema.methods.comparePassword = function (password){
    const user = this
    //user.password //encrypted ///hash value fjlsjfowur02380-234i234$@#$23423
    //password // decrypted password from FE //123456
    return bcryptjs.compareSync(password,user.password)
}
UserSchema.methods.generateToken = async function(){
    const user = this
    const {_id} =user
    const token = jwt.sign({_id}, serverSecret);
    user.tokens.push(token)
    await user.save()
    return token
}

                    //    before first  ha
// $2a$10$aZxvdv5PXxFGPNwbQgArRuTCvqhJ8otorJZx9tO.j5bf3cxNm/G0q   
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2MxY2Y4MTA4YjgxN2FmNzdkYzQ2NGUiLCJpYXQiOjE2NzM2NDYwNDJ9.-gWWAxbS_-38TtbnlQM1NVp-BJR15X_qlVOmOnFLtYE
                        //   after last ha
//$2a$10$BRPn0iNj0GAC5CYHotSEpuwhYyor/41JkghoH4KScyq8ND31U8HuS
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2MxY2Y4MTA4YjgxN2FmNzdkYzQ2NGUiLCJpYXQiOjE2NzM2NDYwNDJ9.-gWWAxbS_-38TtbnlQM1NVp-BJR15X_qlVOmOnFLtYE

const Users = mongoose.model("Users", UserSchema)
module.exports = Users