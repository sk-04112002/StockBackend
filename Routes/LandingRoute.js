const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')

router.get("/",authMiddleware,(req,res) => {
    return res.json("Successfull")
})
module.exports = router