const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const chatSchema = new Schema({
    userName: String,
    pickup:{lan:String,long:String},
    lastMessage: String


})

const Chats = mongoose.model("Chats",chatSchema)

module.exports = Chats