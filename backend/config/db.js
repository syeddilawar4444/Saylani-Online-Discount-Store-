const mongoose = require("mongoose")


//URI LINK
// const mongoURI = "mongodb+srv://dilawar123:dilawar123@cluster0.pwcivbf.mongodb.net/chatsApp?retryWrites=true&w=majority"
const mongoURI = "mongodb+srv://final_hackathon:final_hackathon@cluster0.fcdtazn.mongodb.net/final_hackathon?retryWrites=true&w=majority"




// connect to mongodb
mongoose.connect(mongoURI, {useNewUrlParser: true})

module.exports = mongoose