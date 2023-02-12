const express = require("express")
const app = express()
const db = require("./config/db")
const cors = require("cors")

app.use(cors());

// test db connection
db.connection
.once('open', () => console.log("connected to db"))
.on("error", (err) => console.log("error connecting db -->", err))

const PORT = process.env.PORT || 4000;


app.listen(PORT,()=>{
    console.log(`server is running...${PORT}`)
})


app.use(express.json());
app.use("/",require("./routers/Router.js"))