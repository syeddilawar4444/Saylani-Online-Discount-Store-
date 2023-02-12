const express = require("express")
const router = express.Router()

router.use("/admin",require("./admin.js"))
router.use("/user",require("./auth.js"))


module.exports = router